import express from 'express';
import { translate } from '@vitalets/google-translate-api';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Languages list endpoint
app.get('/api/languages', (req, res) => {
  return res.status(200).json({
    status: true,
    languages: {
      id: "Indonesia",
      en: "English",
      ja: "Jepang",
      ko: "Korea",
      zh_cn: "China (Simplified)",
      zh_tw: "China (Traditional)",
      ar: "Arab",
      ru: "Rusia",
      fr: "Prancis",
      de: "Jerman",
      es: "Spanyol",
      pt: "Portugis",
      hi: "Hindi",
      tr: "Turki",
      th: "Thailand",
      vi: "Vietnam",
      ms: "Melayu",
      it: "Italia",
      nl: "Belanda",
      pl: "Polandia"
    }
  });
});

// Translate endpoint
app.post('/api/translate', async (req, res) => {
  try {
    const { text, to = 'id' } = req.body || {};

    if (!text) {
      return res.status(400).json({
        status: false,
        message: 'Text is required'
      });
    }

    const result = await translate(text, { to }).catch(() => null);

    if (!result) {
      return res.status(400).json({
        status: false,
        message: `Language "${to}" not supported`
      });
    }

    return res.status(200).json({
      status: true,
      data: {
        from: result.raw?.src || 'auto',
        to,
        original: text,
        translated: result.text
      }
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
      error: err.message
    });
  }
});

// Root endpoint (optional)
app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Translate API is running',
    endpoints: {
      translate: 'POST /api/translate',
      languages: 'GET /api/languages'
    }
  });
});

// Export for Vercel
export default app;