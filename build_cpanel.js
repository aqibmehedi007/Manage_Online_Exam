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
  
  // Rename server.js to app.js to match the cPanel user configuration
  if (fs.existsSync('cpanel_deploy/server.js')) {
    fs.renameSync('cpanel_deploy/server.js', 'cpanel_deploy/app.js');
  }
  
  // Write .env file (backup)
  const dbUrl = 'mysql://aqibmeh1_demo:LUh!%247%5BLtu6)-Www@localhost:3306/aqibmeh1_demo';
  fs.writeFileSync('cpanel_deploy/.env', `DATABASE_URL="${dbUrl}"`);

  // CRITICAL: Next.js standalone server.js does NOT auto-load .env files at runtime.
  // Unlike your zTeslaWizards project which has 'dotenv' as a dependency,
  // this project doesn't. So we must inject the env var directly into app.js
  // so Prisma can find DATABASE_URL when it boots.
  const appJsPath = 'cpanel_deploy/app.js';
  let appJs = fs.readFileSync(appJsPath, 'utf8');
  const envHeader = `// --- cPanel Environment Injection ---\nif (!process.env.DATABASE_URL) {\n  process.env.DATABASE_URL = "${dbUrl}";\n}\n// --- End Injection ---\n\n`;
  fs.writeFileSync(appJsPath, envHeader + appJs);

  console.log("Successfully rebuilt cpanel_deploy directory.");
} catch(e) {
  console.error("Build failed: ", e);
}
