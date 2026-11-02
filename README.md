# Karavinan Tantra Peedam - Website Documentation & Handover Guide

Official website for **Sri Karavinan Tantra Peedam, Sokkanur**.
Built with standard HTML5, CSS3 (receipt-extracted luxury design system), and vanilla modern JavaScript.

---

## 📁 Project Structure

```
tantra website/
├── index.html            # Main website markup & semantic structure
├── styles.css            # Sacred receipt-extracted styling, tokens & responsive design
├── app.js                # Core JS logic: i18n English/Tamil, Numerology calculator, JSON loader
├── schedule.json         # Homam events database (upcoming & past ceremonies)
├── assets/
│   ├── images/
│   │   ├── ka-crest.svg  # High-resolution royal KA lion crest vector emblem
│   │   └── organiser.jpg # Organiser photo (or ceremony images)
│   └── data/
└── README.md             # This guide
```

---

## 🎨 Design System Tokens (Extracted from Sacred Receipt)

| Token Name | Hex Value / Gradient | Usage |
| :--- | :--- | :--- |
| **Deep Obsidian Black** | `#0A0A0A` | Primary background |
| **Rich Brown-Black** | `#140D05` & `#1A1208` | Secondary surfaces & card depth |
| **Receipt Red Plate** | `#B3141B` → `#7A0A10` | "RECEIPT" badge plates & date markers |
| **Sacred Gold Gradient** | `#8A6A1F` → `#F6D77A` → `#C9992B` | Headings, buttons, borders & flourishes |
| **Auspicious Cream** | `#FFF6DC` | Readable high-contrast panels & text |

### Typography
- **Headings**: `'Cinzel', 'Playfair Display', serif`
- **Subheadings & Mantras**: `'Cormorant Garamond', serif`
- **Body Text**: `'Outfit', sans-serif`
- **Tamil Typography**: `'Noto Serif Tamil', serif`

---

## 📅 How to Update Homam Schedule (`schedule.json`)

You never need to edit HTML code to add or modify homams. Simply open `schedule.json`:

```json
{
  "upcoming": [
    {
      "id": "homam-05",
      "name": "Maha Chandi Yagnam",
      "name_ta": "மகா சண்டி யாகம்",
      "deity": "Sri Maha Chandi Devi",
      "date": "2027-01-10",
      "display_date": "Sunday, 10 January 2027",
      "display_date_ta": "ஞாயிறு, 10 ஜனவரி 2027",
      "time": "6:00 AM - 1:00 PM IST",
      "venue": "Sokkanur Maha Peedam Sanctum, Kinathukadavu",
      "venue_ta": "சொக்கனூர் மகா பீடம், கிணத்துக்கடவு",
      "summary": "Supreme 700 Saptashati sloka invocation for total destruction of obstacles.",
      "summary_ta": "சகல காரிய தடைகளையும் தகர்க்கும் 700 சப்தசதீ சுலோக மகா சண்டி யாகம்.",
      "benefits": [
        "Total Negative Energy Clearance",
        "Universal Mother Grace",
        "Family Prosperity"
      ],
      "sankalpam_available": true
    }
  ]
}
```

- When a ceremony concludes, move its entry from `"upcoming"` to `"past"`.
- Devotees can click **"Enquire via WhatsApp"**, which automatically pre-fills a polite message mentioning the specific homam name and date!

---

## 📞 How to Update Phone Number & WhatsApp Links

Open `app.js` and locate the `CONFIG` object near line 25:

```javascript
const CONFIG = {
  phone: '+919876543210',
  phoneDisplay: '+91 98765 43210',
  whatsappNumber: '919876543210', // Digits only with country code (91 for India)
  sanctumLocation: 'Sokkanur, Kinathukadavu, Tamil Nadu',
  googleMapsUrl: 'https://maps.google.com/?q=Sokkanur,+Kinathukadavu,+Tamil+Nadu'
};
```
Change `whatsappNumber` and `phone` to the organiser's actual numbers. All WhatsApp buttons and phone dials will automatically update!

---

## 🔢 Numerology Engine Features (Phase 5)

1. **Dual System Support**:
   - **Chaldean System**: Ancient Indian / Cheiro tantric standard (numbers 1-8).
   - **Pythagorean System**: Western 1-9 letter correspondence.
2. **Master Numbers**:
   - Option to preserve **11** and **22** vibrations with specialized interpretations.
3. **Mobile Number Vibration**:
   - Reduces 10-digit mobile numbers down to a root vibration (1 to 9).
4. **Privacy Guaranteed**:
   - 100% computed client-side in browser memory. No data is sent or recorded.
5. **Spiritual Disclaimer**:
   - Prominently displays: *"Results are for spiritual and informational purposes only."*

---

## 🌐 Launch & Free Hosting Options

### 1. GitHub Pages (Free)
1. Push this folder to a GitHub repository named `karavinan-tantra`.
2. Go to **Settings > Pages**.
3. Choose branch `main` and folder `/ (root)`. Click **Save**.
4. Your site will be live at `https://your-username.github.io/karavinan-tantra`.

### 2. Netlify / Vercel (Free)
1. Drag and drop the `tantra website` folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. Live in under 30 seconds with automatic HTTPS and free SSL!
