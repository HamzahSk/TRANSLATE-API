
🌍 TRANSLATE-API

API sederhana buat translate teks pakai Google Translate.

«⚠️ Note: Ini bukan official API Google, jadi kemungkinan ada limit / error kalau dipake berlebihan.»

---

🚀 Features

- Translate ke berbagai bahasa
- Auto detect bahasa asal
- Support POST request
- Bisa ambil list kode bahasa
- Simple & ringan (tanpa Express)

---

📦 Installation

Clone repo:

git clone https://github.com/username/translate-api.git
cd translate-api

Install dependencies:

npm install

---

⚙️ Deploy ke Vercel

1. Push project ke GitHub
2. Import ke Vercel
3. Deploy

Selesai, API langsung bisa dipakai 🎉

---

📡 Endpoint

🔹 Translate

POST "/api/translate"

Body:

{
  "text": "halo dunia",
  "to": "en"
}

Response:

{
  "status": true,
  "data": {
    "from": "id",
    "to": "en",
    "original": "halo dunia",
    "translated": "hello world"
  }
}

---

🔹 List Bahasa

POST "/api/translate"

Body:

{
  "showLang": true
}

---

🌍 Kode Bahasa (Contoh)

Code| Language
id| Indonesia
en| English
ja| Jepang
ko| Korea
zh-cn| China (Simplified)
ar| Arab
fr| Prancis
de| Jerman
es| Spanyol

---

🛠️ Tech Stack

- Node.js
- Vercel Serverless Function
- @vitalets/google-translate-api

---

⚠️ Disclaimer

API ini menggunakan reverse-engineered Google Translate, jadi:

- Tidak 100% stabil
- Bisa kena rate limit
- Tidak untuk penggunaan berat / production skala besar

---

👨‍💻 Author

Made with ❤️ by you 😏

---

⭐ Support

Kalau project ini ngebantu, jangan lupa kasih ⭐ di repo ya!