# Rayappan — Portfolio Website

A production-quality personal portfolio built with React JS, Framer Motion, and Recharts.

---

## 🚀 Tech Stack
- **React JS** + **React Router DOM** (routing)
- **Framer Motion** (animations)
- **Recharts** (Job Tracker analytics)
- **React Type Animation** (typewriter effect)
- **React CountUp** (animated counters)
- **React Icons** (icon library)
- **localStorage** (Job Tracker persistence)

---

## 📁 Project Structure
```
rayappan-portfolio/
├── public/
│   ├── index.html
│   ├── profile.jpg          ← Your photo
│   └── resume.pdf           ← Your resume (for download)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .css
│   │   ├── Hero.jsx / .css
│   │   ├── About.jsx / .css
│   │   ├── Skills.jsx / .css
│   │   ├── Projects.jsx / .css
│   │   ├── Internship.jsx / .css
│   │   ├── Certifications.jsx / .css
│   │   ├── JobTracker.jsx / .css
│   │   ├── Contact.jsx / .css
│   │   └── Footer.jsx / .css
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── JobTrackerPage.jsx
│   ├── data/
│   │   └── projectsData.js
│   ├── hooks/
│   │   └── useScrollProgress.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── index.js
├── .gitignore               ← node_modules excluded ✅
├── vercel.json              ← SPA routing for Vercel ✅
└── package.json
```

---

## ⚡ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start

# App runs at http://localhost:3000
```

---

## 🐙 Push to GitHub

```bash
# 1. Initialize git (if not done)
git init

# 2. Add all files (node_modules is excluded via .gitignore)
git add .

# 3. Commit
git commit -m "Initial commit: Rayappan portfolio"

# 4. Create a new repo on GitHub (github.com → New Repository)
#    Name it: rayappan-portfolio
#    Keep it Public, don't add README

# 5. Link and push
git remote add origin https://github.com/YOUR_USERNAME/rayappan-portfolio.git
git branch -M main
git push -u origin main
```

---

## ▲ Deploy on Vercel

### Option A — Via Vercel Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your **rayappan-portfolio** repository
4. Vercel auto-detects Create React App — click **Deploy**
5. Your site is live at `https://rayappan-portfolio.vercel.app` 🎉

### Option B — Via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts → select project → deploy
```

### ✅ Why it works on Vercel
- `node_modules/` is in `.gitignore` — never pushed to GitHub
- `vercel.json` handles SPA routing (all paths → `index.html`)
- `public/profile.jpg` and `public/resume.pdf` are included in the build
- No `.env` secrets — everything is client-side only

---

## 🔧 Customization
| File | What to edit |
|------|-------------|
| `src/data/projectsData.js` | Add/edit projects |
| `src/components/Contact.jsx` | Update email, phone, LinkedIn |
| `src/components/About.jsx` | Update bio, skills |
| `src/components/Certifications.jsx` | Add more certificates |
| `public/profile.jpg` | Replace with your photo |
| `public/resume.pdf` | Replace with your latest resume |

---

## 📄 License
MIT — free to use and modify.
