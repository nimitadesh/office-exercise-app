const express = require('express');
const multer = require('multer')
const upload = multer({ dest: "uploads/"})
const router = express.Router();
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const { GoogleAIFileManager } = require('@google/generative-ai/files')

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

async function uploadToGemini(path, mimeType){
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType: mimeType,
    displayName: path,
  })
  
  console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);
  return uploadResult;
}

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
  systemInstruction: " A fitness chatbot that provides encouraging responses in a concise and informative manner. ",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

router.post('/chat', upload.single('doc'), async (req, res) => {
  const { userMessage } = req.body;
  if (!userMessage) {
    return res.status(400).json({ error: 'User message is required' });
  }

  if (req.file) {
    const doc = req.file;
    const processedDoc = await uploadToGemini(doc.path, doc.mimetype);
    
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: processedDoc.file.mimeType,
          fileUri: processedDoc.file.uri
        }
      },
      { text: userMessage },
    ])
    res.json({ response: result.response.text() });
  } else {
    const result = await model.generateContent(userMessage);
    res.json({ response: result.response.text() });
  }
});

module.exports = router;
