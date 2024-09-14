const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai'); 
const path = require('path');

const app = express();
const upload = multer();


app.use(require('cors')());


app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/generateResume', upload.single('pdfFile'), async (req, res) => {
  try {
    if (!req.file || !req.body.apiKey) {
      return res.status(400).json({ success: false, message: 'Missing file or API key.' });
    }

    const pdfBuffer = req.file.buffer;
    const apiKey = req.body.apiKey;

    const pdfData = await pdfParse(pdfBuffer);
    const extractedText = pdfData.text;

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const prompt = `
      Extract the key information from the following text and must format the in sections like name, contact, work experience, education, skills, projects, certifications, etc. and generate a professional HTML resume the format must be in resume format and well structured:
      ${extractedText}.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      seed: 8822,
    });

    const htmlContent = response.choices[0].message.content;

    return res.json({ success: true, htmlContent: htmlContent });
  } catch (error) {
    console.error('Error generating resume:', error.message);
    return res.status(500).json({ success: false, message: 'Server error occurred: ' + error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
