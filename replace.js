const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'public', 'design');

const replacements = [
  { regex: /aryashah325@gmail\.com/g, replacement: 'divyanshupatel5633@gmail.com' },
  { regex: /arya-shah22/g, replacement: 'Divyanshu1121' },
  { regex: /aryashah22/g, replacement: 'divyanshu-patel-99450426b' },
  { regex: /Arya Shah/g, replacement: 'Divyanshu M. Patel' },
  { regex: /AryaOS/g, replacement: 'DivyanshuOS' },
  { regex: /arya-shah-resume\.pdf/g, replacement: 'divyanshu-patel-resume.pdf' },
  { regex: /Arya-Shah-Resume\.pdf/g, replacement: 'Divyanshu-Patel-Resume.pdf' },
  { regex: /Arya/g, replacement: 'Divyanshu' },
  { regex: /arya/g, replacement: 'divyanshu' },
];

function processDirectory(directory) {
  if (!fs.existsSync(directory)) return;
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.js') || fullPath.endsWith('.html') || fullPath.endsWith('.css') || fullPath.endsWith('.json'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(directoryPath);
console.log("Replacement script completed for public/design.");
