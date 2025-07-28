const fs = require('fs');
const path = require('path');

// 需要处理的CSS文件
const cssFiles = [
  'themes/hugoplate/assets/css/utilities.css',
  'themes/hugoplate/assets/css/safe.css',
  'themes/hugoplate/assets/css/components.css',
  'themes/hugoplate/assets/css/buttons.css',
  'themes/hugoplate/assets/css/navigation.css',
  'themes/hugoplate/assets/css/base.css'
];

// 清理CSS文件中的暗色模式类
function cleanCSSFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // 移除@apply规则中的暗色模式类
    content = content.replace(/@apply\s+([^;]*?)\s*;/g, (match, classes) => {
      const cleanClasses = classes
        .split(/\s+/)
        .filter(cls => !cls.includes('dark:') && !cls.includes('darkmode-'))
        .join(' ');
      return cleanClasses ? `@apply ${cleanClasses};` : '';
    });
    
    // 移除空的@apply规则
    content = content.replace(/@apply\s*;/g, '');
    
    // 清理多余的空行
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Cleaned: ${filePath}`);
    }
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// 开始清理
console.log('Starting CSS-only cleanup...');
cssFiles.forEach(cleanCSSFile);
console.log('CSS-only cleanup completed!');