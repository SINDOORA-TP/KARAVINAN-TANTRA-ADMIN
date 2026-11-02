# Sri Karavinan Tantra Peedam - Sanctum Admin Portal

Official administration portal for **Sri Karavinan Tantra Peedam, Sokkanur**.  
Manage the Google Drive Tantra Gallery, Homam Schedules, Daily Mantras, and Devotee Feedback without editing source code.

- **Main Website Repository**: [https://github.com/SINDOORA-TP/KRAVINAN-TANTRA](https://github.com/SINDOORA-TP/KRAVINAN-TANTRA)
- **Admin Portal Repository**: [https://github.com/SINDOORA-TP/KARAVINAN-TANTRA-ADMIN](https://github.com/SINDOORA-TP/KARAVINAN-TANTRA-ADMIN)

---

## 🔒 Security & Login

- **Default Security Passcode**: `karavinan2026`
- Passcode can be updated at any time inside the portal under **Sanctum Settings**.
- Sessions are maintained in secure browser storage.

---

## 🚀 Key Admin Capabilities

### 1. Tantra Gallery (Google Drive Sync)
- **Folder Link / ID**: Paste your Google Drive shared folder link (`Anyone with the link can View`).
- **Read-Only API Key**: Restricted to Google Drive API v3.
- **Open Drive Folder**: Quick button to open Drive in a new tab for photo uploads.
- **Live Preview Stream**: Directly renders thumbnails via `https://lh3.googleusercontent.com/d/{fileId}`.
- **Per-Image Overrides**:
  - **Hide on website**: Exclude any image without deleting it from Drive.
  - **Title Override**: Customize titles if you don't want the Drive file name.
  - **Caption Override**: Customize captions if you don't want the Drive description.
- **Auto-Sync**: Public site refreshes and displays new photos with 10-minute caching.

### 2. Homam Schedule Manager
- Edit upcoming yagnas, dates, times, venues, and deities.
- Toggle **Virtual Sankalpam Available** for online devotees.
- Saves directly to `schedule.json`.

### 3. Daily Thoughts & Mantras
- Add or edit rotating Sanskrit mantras, themes, and spiritual meanings.
- Saves directly to `thoughts.json`.

### 4. Devotee Testimonials
- Curate blessed experiences, locations, and 5-star ratings.
- Saves directly to `feedback.json`.

---

## 🛠️ How to Run Locally

1. Open terminal in the project directory:
   ```powershell
   node server.js
   ```
2. Open **[http://localhost:8080/](http://localhost:8080/)** in your browser.
3. Enter passcode `karavinan2026` to enter the portal.

---

## 📁 Repository Structure

```
KARAVINAN-TANTRA-ADMIN/
├── index.html            # Main Admin Portal interface
├── admin.html            # Admin Portal alias
├── admin/index.html      # Direct /admin/ path routing
├── site.html             # Public website preview
├── admin.css             # Luxury dark-and-gold admin styling
├── admin.js              # Drive API streaming, preview, overrides, auth gate
├── styles.css            # Core design system tokens & utilities
├── gallery_config.json   # Google Drive folder ID, API key, and overrides
├── schedule.json         # Homam schedules database
├── thoughts.json         # Rotating daily mantras database
├── feedback.json         # Devotee reviews database
├── numerology.json       # Chaldean numerology readings database
├── server.js             # Local dev server with REST API file saving
└── assets/               # Crest vector images and ceremonial photos
```
