const express = require('express');
const multer = require('multer')
const upload = multer({ dest: "uploads/"})
const router = express.Router();
const { VertexAI } = require('@google-cloud/vertexai')
const { Storage } = require('@google-cloud/storage')

const storage = new Storage();

async function uploadFile(fileName, filePath){
  const options = {
    destination: fileName,
  };

  try {
    await storage.bucket(process.env.BUCKET_NAME).upload(filePath, options)
    console.log(`${filePath} uploaded`);
    return `gs://${process.env.BUCKET_NAME}/${options.destination}`
  } catch (error) {
    console.log(error)
  }
}

const vertex_ai = new VertexAI({project: process.env.PROJECT_ID, location: process.env.LOCATION})
const generativeModel = vertex_ai.getGenerativeModel({
  model: 'gemini-1.5-flash-001',
  generationConfig: {
    'maxOutputTokens': 8192,
    'temperature': 1,
    'topP': 0.95,
  },
  safetySettings: [
    {
        'category': 'HARM_CATEGORY_HATE_SPEECH',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_HARASSMENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ],
  systemInstruction: {
    parts: [{"text": `A fitness chatbot that provides encouraging responses in a concise and informative manner.`}]
  },
});

router.post('/chat', upload.single('doc'), async (req, res) => {
  const { userMessage } = req.body;
  if (!userMessage) {
    return res.status(400).json({ error: 'User message is required' });
  }

  if (req.file) {
    const doc = req.file;
    const gcpUri = await uploadFile(doc.originalname, doc.path);

    const filePart = {
      fileData: {
        fileUri: gcpUri,
        mimeType: doc.mimetype,
      },
    };

    const textPart = {
      text: userMessage,
    }

    const request = {
      contents: [{role: 'user', parts: [filePart, textPart]}],
    };

    const result = await generativeModel.generateContent(request);
    const aggregatedResult = await result.response;
    res.json({ response: aggregatedResult.candidates[0].content.parts[0].text });
  } else {
    const result = await generativeModel.generateContent(userMessage);
    const aggregatedResult = await result.response;
    res.json({ response: aggregatedResult.candidates[0].content.parts[0].text });
  }
});

module.exports = router;

