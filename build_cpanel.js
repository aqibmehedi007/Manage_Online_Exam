const fs = require('fs');
const path = require('path');

try {
  // Wipe the old folder
  if (fs.existsSync('cpanel_deploy')) {
    fs.rmSync('cpanel_deploy', { recursive: true, force: true });
  }
  
  // Copy the core server built by Next.js Standalone
  fs.cpSync('.next/standalone', 'cpanel_deploy', { recursive: true });
  
  // Copy public and static assets exactly where they belong
  fs.cpSync('.next/static', 'cpanel_deploy/.next/static', { recursive: true });
  fs.cpSync('public', 'cpanel_deploy/public', { recursive: true });
  
  // Copy any hashed prisma client directories that turbopack may generate
  const nodeModulesNext = path.join('.next', 'standalone', 'node_modules');
  if (fs.existsSync(nodeModulesNext)) {
    const dirs = fs.readdirSync(path.join(nodeModulesNext, '@prisma')).filter(d => d.startsWith('client-'));
    dirs.forEach(d => {
      const src = path.join(nodeModulesNext, '@prisma', d);
      const dst = path.join('cpanel_deploy', 'node_modules', '@prisma', d);
      if (!fs.existsSync(dst)) {
        fs.cpSync(src, dst, { recursive: true });
      }
    });
  }

  // Also check .next/node_modules for prisma client hashes
  const nextNodeModules = path.join('.next', 'node_modules', '@prisma');
  if (fs.existsSync(nextNodeModules)) {
    const dirs = fs.readdirSync(nextNodeModules).filter(d => d.startsWith('client-'));
    dirs.forEach(d => {
      const src = path.join(nextNodeModules, d);
      const dst = path.join('cpanel_deploy', 'node_modules', '@prisma', d);
      if (!fs.existsSync(dst)) {
        fs.cpSync(src, dst, { recursive: true });
      }
    });
  }

  // Rename server.js to app.js to match the cPanel user configuration
  if (fs.existsSync('cpanel_deploy/server.js')) {
    fs.renameSync('cpanel_deploy/server.js', 'cpanel_deploy/app.js');
  }
  
  // Write .env file 
  const dbUrl = 'mysql://aqibmeh1_demo:LUh!%247%5BLtu6)-Www@localhost:3306/aqibmeh1_demo';
  fs.writeFileSync('cpanel_deploy/.env', `DATABASE_URL="${dbUrl}"`);

  // Inject DATABASE_URL into app.js since standalone doesn't read .env files
  const appJsPath = 'cpanel_deploy/app.js';
  let appJs = fs.readFileSync(appJsPath, 'utf8');
  const envHeader = `// --- cPanel Environment Injection ---\nif (!process.env.DATABASE_URL) {\n  process.env.DATABASE_URL = "${dbUrl}";\n}\n// --- End Injection ---\n\n`;
  fs.writeFileSync(appJsPath, envHeader + appJs);

  console.log("Successfully rebuilt cpanel_deploy directory.");
} catch(e) {
  console.error("Build failed: ", e);
}

