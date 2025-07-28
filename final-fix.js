const fs = require('fs');
const path = require('path');

// 需要修复的文件和对应的修复规则
const fixes = [
  // 修复空的类名
  {
    pattern: /class="([^"]*?)\s*"/g,
    replacement: (match, classes) => {
      const cleanClasses = classes
        .split(/\s+/)
        .filter(cls => cls.trim() && !cls.includes(':') && cls.length > 0)
        .join(' ');
      return cleanClasses ? `class="${cleanClasses}"` : '';
    }
  },
  // 移除空的class属性
  {
    pattern: /class=""\s*/g,
    replacement: ''
  },
  // 修复多余的空格
  {
    pattern: /\s+/g,
    replacement: ' '
  },
  // 修复CSS中的问题
  {
    pattern: /@apply\s+([^;]*?)\s*;/g,
    replacement: (match, classes) => {
      const cleanClasses = classes
        .split(/\s+/)
        .filter(cls => cls.trim() && !cls.includes(':') && cls.length > 0)
        .join(' ');
      return cleanClasses ? `@apply ${cleanClasses};` : '';
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
  
  if (!['.html', '.css'].includes(ext)) {
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // 应用所有修复规则
    fixes.forEach(fix => {
      content = content.replace(fix.pattern, fix.replacement);
    });
    
    // 特殊处理CSS文件
    if (ext === '.css') {
      // 移除空的@apply规则
      content = content.replace(/@apply\s*;/g, '');
      // 移除多余的空行
      content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
    }
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// 开始修复
console.log('Starting final fix...');
walkDir('.', fixFile);
console.log('Final fix completed!');