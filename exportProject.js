npm install react@19.2.3const fs = require('fs');
const path = require('path');

const projectRoot = 'd:/Enquiry_Application/EnquiryApplication';
const outputFile = path.join(projectRoot, 'Detailed_Project_Export.md');

let md = '# Project Export\n\n';

// 1. Project Overview
md += '## 1. Project Overview\n';
md += 'This is an Enterprise HR and Attendance Management Application built with React Native and Expo. It includes attendance tracking, leave management, team approvals, company feeds, and organization directory.\n\n';

// 2. Packages and Dependencies
md += '## 2. Packages and Dependencies\n';
try {
  const pkg = require(path.join(projectRoot, 'package.json'));
  md += '```json\n' + JSON.stringify({ dependencies: pkg.dependencies, devDependencies: pkg.devDependencies }, null, 2) + '\n```\n\n';
} catch (e) {
  md += 'Could not read package.json\n\n';
}

// 3. Complete Folder Structure
md += '## 3. Complete Folder Structure\n';
md += '```text\n';
function getTree(dir, prefix = '') {
  try {
    const files = fs.readdirSync(dir);
    files.forEach((file, index) => {
      if (file === 'node_modules' || file === '.git' || file === '.expo' || file === 'assets' || file.startsWith('.')) return;
      const isLast = index === files.length - 1;
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      md += prefix + (isLast ? '└── ' : '├── ') + file + '\n';
      if (stats.isDirectory()) {
        getTree(filePath, prefix + (isLast ? '    ' : '│   '));
      }
    });
  } catch (e) {}
}
getTree(projectRoot);
md += '```\n\n';

// 4. All Features Explained
md += '## 4. All Features Explained\n';
md += '- **Attendance Management:** Check-in/out with a live timer, regularization for missed punches.\n';
md += '- **Leave Management:** View leave balances, upcoming company holidays, and apply for leave.\n';
md += '- **Team Approvals:** Managers can approve/reject regularization requests and view team hierarchy.\n';
md += '- **Internal Feeds:** View announcements, birthdays, and work anniversaries.\n';
md += '- **Organization Directory:** Search and filter all employees.\n';
md += '- **Real-time Notifications:** Local push notifications for check-ins, check-outs, and manager approvals.\n\n';

// 5. All APIs and Services
md += '## 5. All APIs and Services\n';
const apiDir = path.join(projectRoot, 'src', 'api');
if (fs.existsSync(apiDir)) {
  const apiFiles = fs.readdirSync(apiDir).filter(f => f.endsWith('.ts'));
  apiFiles.forEach(file => {
    md += '### ' + file + '\n';
    md += '```typescript\n' + fs.readFileSync(path.join(apiDir, file), 'utf8') + '\n```\n\n';
  });
}

// 6. Navigation and Screen Flow
md += '## 6. Navigation and Screen Flow\n';
md += '- **Auth Stack:** Login Screen -> Main App\n';
md += '- **Main Stack (HomeScreen):** Contains Top Tabs (My Space, Team, Org), Secondary Tabs (Activities, Dashboard, Feeds, Profile), and Bottom Nav (Home, Directory, Payslip, Menu).\n';
md += '- **Side Drawer:** Hamburger menu with options for My Regularizations, Team Approvals, Profile, Settings, Logout.\n\n';

// 7. Every file with its full code
md += '## 7. Every File With Its Full Code\n';
function appendFiles(dir) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (file === 'node_modules' || file === '.git' || file === '.expo' || file === 'assets' || file.startsWith('.')) return;
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        appendFiles(filePath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.json')) {
        if (file === 'package-lock.json') return;
        md += '### ' + path.relative(projectRoot, filePath) + '\n';
        const ext = file.split('.').pop();
        try {
          md += '```' + ext + '\n' + fs.readFileSync(filePath, 'utf8') + '\n```\n\n';
        } catch (e) {
          md += 'Could not read file.\n\n';
        }
      }
    });
  } catch(e) {}
}

md += '### App.tsx\n';
try {
  md += '```tsx\n' + fs.readFileSync(path.join(projectRoot, 'App.tsx'), 'utf8') + '\n```\n\n';
} catch(e) {}

appendFiles(path.join(projectRoot, 'src'));

fs.writeFileSync(outputFile, md);
console.log('Export Complete: ' + outputFile);
