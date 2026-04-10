const fs = require('fs');
const path = require('path');

/**
 * Optimized cPanel Build Script v3.1 (Anti-Bloat Edition)
 * Fixed: Drastically reduced build size by PRUNING unnecessary Prisma engines 
 * from the standalone node_modules folder.
 */

try {
  console.log("Starting optimized low-bloat cPanel packaging...");

  // 1. Wipe and recreate the deployment folder
  if (fs.existsSync('cpanel_deploy')) {
    fs.rmSync('cpanel_deploy', { recursive: true, force: true });
  }
  fs.mkdirSync('cpanel_deploy');
  
  // 2. Copy the standalone build (this usually brings in a lot of bloat)
  if (!fs.existsSync('.next/standalone')) {
    throw new Error(".next/standalone not found. Run 'npm run build' first.");
  }
  fs.cpSync('.next/standalone', 'cpanel_deploy', { recursive: true });
  
  // 3. Copy static and public assets
  fs.cpSync('.next/static', 'cpanel_deploy/.next/static', { recursive: true });
  fs.cpSync('public', 'cpanel_deploy/public', { recursive: true });
  
  // 4. PRUNE PRISMA BLOAT
  // We navigate into the deployment's prisma client folder and delete Windows/RHEL engines
  const prismaDest = path.join('cpanel_deploy', 'node_modules', '.prisma', 'client');
  const prismaSrc = path.join('node_modules', '.prisma', 'client');
  
  if (fs.existsSync(prismaDest)) {
    console.log("Pruning heavy Prisma engines from deployment...");
    
    const files = fs.readdirSync(prismaDest);
    files.forEach(file => {
      const filePath = path.join(prismaDest, file);
      
      const isEssential = file.endsWith('.js') || file === 'schema.prisma' || file === 'package.json';
      const isDebianEngine = file.startsWith('libquery_engine-debian-openssl') && file.endsWith('.so.node');
      
      // If it's NOT essential and NOT a Debian engine, DELETE IT
      if (!isEssential && !isDebianEngine) {
        fs.unlinkSync(filePath);
      }
    });
  }

  // 5. EXTRACT PRISMA HASHES FROM NFT TRACES
  const prismaHashes = new Set();
  const nftDir = path.join('.next', 'server', 'app');
  
  function scanForHashes(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanForHashes(fullPath);
      } else if (entry.name.endsWith('.nft.json')) {
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        if (content.files) {
          content.files.forEach(f => {
            if (f.includes('@prisma/client-')) {
              const match = f.match(/@prisma\/client-([a-f0-9]+)/);
              if (match) prismaHashes.add(match[1]);
            }
          });
        }
      }
    }
  }
  scanForHashes(nftDir);

  // 6. Rename server.js to app.js (cPanel standard)
  if (fs.existsSync('cpanel_deploy/server.js')) {
    fs.renameSync('cpanel_deploy/server.js', 'cpanel_deploy/app.js');
  }
  
  // 7. Inject Environment & Module Aliasing
  const dbUrl = 'mysql://aqibmeh1_demo:LUh!%247%5BLtu6)-Www@localhost:3306/aqibmeh1_demo';
  
  const appJsPath = 'cpanel_deploy/app.js';
  if (fs.existsSync(appJsPath)) {
    let appJs = fs.readFileSync(appJsPath, 'utf8');
    
    let aliasLogic = "";
    if (prismaHashes.size > 0) {
      console.log(`Aliasing Prisma hashes: ${Array.from(prismaHashes).join(', ')}`);
      aliasLogic = `
// Redirect hashed Prisma client modules to the standard client
const Module = require('module');
const originalRequire = Module.prototype.require;
const prismaHashes = ${JSON.stringify(Array.from(prismaHashes))};

Module.prototype.require = function() {
  const arg = arguments[0];
  if (typeof arg === 'string' && arg.includes('@prisma/client-')) {
    const matchedHash = prismaHashes.find(h => arg.includes(h));
    if (matchedHash) {
      return originalRequire.apply(this, ['@prisma/client']);
    }
  }
  return originalRequire.apply(this, arguments);
};
`;
    }

    const envHeader = `
// --- cPanel Optimized Injection ---
${aliasLogic}
process.env.DATABASE_URL = "${dbUrl}";
process.env.NODE_ENV = "production";
process.env.PRISMA_CLI_QUERY_ENGINE_TYPE = "library";
// --- End Injection ---

`;
    fs.writeFileSync(appJsPath, envHeader + appJs);
  }

  console.log("\x1b[32m%s\x1b[0m", "✓ Successfully built OPTIMIZED cpanel_deploy directory.");
  console.log("Size reduced by deleting Windows/RHEL engines from the standalone bundle.");

} catch(e) {
  console.error("\x1b[31m%s\x1b[0m", "Build failed: ", e.stack);
}
