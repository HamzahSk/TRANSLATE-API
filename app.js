import { translate } from '@vitalets/google-translate-api'

export default async function handler(req, res) {
  // allow CORS (biar bisa dipake dari mana aja)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      status: false,
      message: 'Method not allowed, use POST'
    })
  }

  try {
    const { text, to = 'id', showLang = false } = req.body || {}

    // 🔹 list bahasa
    if (showLang) {
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
      })
    }

    if (!text) {
      return res.status(400).json({
        status: false,
        message: 'Text is required'
      })
    }

    const result = await translate(text, { to }).catch(() => null)

    if (!result) {
      return res.status(400).json({
        status: false,
        message: `Language "${to}" not supported`
      })
    }

    return res.status(200).json({
      status: true,
      data: {
        from: result.raw?.src || 'auto',
        to,
        original: text,
        translated: result.text
      }
    })

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
      error: err.message
    })
  }
}