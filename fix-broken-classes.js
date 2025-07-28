const fs = require('fs');
const path = require('path');

// 需要修复的文件和对应的修复规则
const fixes = [
  {
    pattern: /:text-\s/g,
    replacement: ''
  },
  {
    pattern: /:bg-\s/g,
    replacement: ''
  },
  {
    pattern: /:border-\s/g,
    replacement: ''
  },
  {
    pattern: /\s+:text-/g,
    replacement: ''
  },
  {
    pattern: /\s+:bg-/g,
    replacement: ''
  },
  {
    pattern: /\s+:border-/g,
    replacement: ''
  },
  {
    pattern: /class="([^"]*?)\s+"/g,
    replacement: (match, classes) => {
      const cleanClasses = classes.trim().replace(/\s+/g, ' ');
      return cleanClasses ? `class="${cleanClasses}"` : '';
    }
  }
];

// 递归遍历目录
function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', 'public'].includes(file)) {
        walkDir(filePath, callback);
      }
    } else {
      callback(filePath);
    }
  });
}

// 修复文件
function fixFile(filePath) {
  const ext = path.extname(filePath);
  
  if (!['.html', '.css', '.js'].includes(ext)) {
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    const originalContent = content;
    
    // 应用所有修复规则
    fixes.forEach(fix => {
      if (typeof fix.replacement === 'function') {
        content = content.replace(fix.pattern, fix.replacement);
      } else {
        content = content.replace(fix.pattern, fix.replacement);
      }
    });
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
      modified = true;
    }
    
    return modified;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// 开始修复
console.log('Starting broken classes fix...');
walkDir('.', fixFile);
console.log('Broken classes fix completed!');