// 这是一个 Node.js/Express 后端代理示例
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // 从环境变量读取

app.post('/api/gemini', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        // 添加请求验证和限制
        if (!prompt || prompt.length > 1000) {
            return res.status(400).json({ error: '无效的提示词' });
        }
        
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: prompt }] }]
                })
            }
        );
        
        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: '服务暂时不可用' });
    }
});

app.listen(3000, () => {
    console.log('Gemini 代理服务运行在端口 3000');
});