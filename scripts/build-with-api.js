const fs = require('fs');
const path = require('path');

// 从环境变量读取 API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('错误: 请设置 GEMINI_API_KEY 环境变量');
    console.log('在 Vercel 中设置环境变量：');
    console.log('1. 进入项目设置');
    console.log('2. Environment Variables');
    console.log('3. 添加 GEMINI_API_KEY');
    process.exit(1);
}

// 读取 HTML 文件（从 static 目录，Hugo 构建后会复制到 public）
const htmlPath = path.join(__dirname, '../public/zh/projects/aivideo.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 替换 API key 占位符
htmlContent = htmlContent.replace('PLACEHOLDER_API_KEY', apiKey);

// 写回文件
fs.writeFileSync(htmlPath, htmlContent);

console.log('✅ API key 已成功注入到 HTML 文件中');
console.log(`✅ 使用的 API key: ${apiKey.substring(0, 10)}...`);