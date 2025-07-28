const fs = require('fs');
const path = require('path');

// 需要清理的暗色模式类的正则表达式
const darkModePatterns = [
  /dark:[a-zA-Z0-9_-]+/g,
  /dark\\:[a-zA-Z0-9_-]+/g,
  /darkmode-[a-zA-Z0-9_-]+/g
];

// 需要处理的文件扩展名
const fileExtensions = ['.html', '.css', '.js'];

// 递归遍历目录
function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // 跳过某些目录
      if (!['node_modules', '.git', 'public'].includes(file)) {
        walkDir(filePath, callback);
      }
    } else {
      callback(filePath);
    }
  });
}

// 清理文件中的暗色模式类
function cleanDarkModeClasses(filePath) {
  const ext = path.extname(filePath);
  
  if (!fileExtensions.includes(ext)) {
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // 应用所有的暗色模式清理模式
    darkModePatterns.forEach(pattern => {
      const originalContent = content;
      content = content.replace(pattern, '');
      if (content !== originalContent) {
        modified = true;
      }
    });
    
    // 清理多余的空格和类属性
    content = content.replace(/class="([^"]*?)"/g, (match, classes) => {
      const cleanClasses = classes
        .split(/\s+/)
        .filter(cls => cls.trim() && !cls.includes('dark:') && !cls.includes('darkmode-'))
        .join(' ');
      return cleanClasses ? `class="${cleanClasses}"` : '';
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Cleaned: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// 开始清理
console.log('Starting dark mode cleanup...');
walkDir('.', cleanDarkModeClasses);
console.log('Dark mode cleanup completed!');