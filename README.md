# 🦷 Shyam Dental Clinic — Web App

A modern, production-grade web application for a dental clinic, with an
online appointment booking flow and a **passcode-protected admin panel**.

Built as a sellable demo / sales model by **Loomix Studios**.

---

## ✨ Features

**Public website**
- Animated, fully responsive **Home page**
- **Services** page with expandable treatment cards, transparent price list & FAQ
- **Doctors** page — meet the specialists
- **Reviews** — read reviews + a working "write a review" form
- **Online Booking** — a 4-step appointment flow with live confirmation
- **Contact** page — working form, embedded map, WhatsApp link

**🔒 Admin panel** (`/admin`) — passcode protected
- **Overview** — KPIs, today's schedule, revenue trend, activity feed
- **Appointments** — manage all appointments, update status, delete
- **Patients** — searchable records, add new patients
- **Billing** — invoices, collected vs outstanding revenue
- **Analytics** — revenue by treatment, clinic health stats

**Under the hood**
- Real **Vite + React 18 + React Router** project — proper, deployable
- **Fully mobile-responsive** (tested down to 360px)
- Data **persists in your browser** (localStorage) — bookings survive refresh
- Live data flow: a new public booking instantly appears in the admin panel

---

## 🔑 Admin Passcode

The admin panel is locked. The demo passcode is:

```
shyam2026
```

**To change it:** open `src/data/clinicData.js` and edit the
`adminPasscode` value inside the `CLINIC` object.

> The login uses session storage — closing the browser tab logs the admin
> out automatically.

---

## 🚀 Run It Locally

You need **Node.js 18+** installed ([download here](https://nodejs.org)).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open the URL it prints (usually **http://localhost:5173**).

To make a production build:

```bash
npm run build      # output goes to /dist
npm run preview    # preview the production build
```

---

## ☁️ Deploy FREE on Vercel (with Git)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Shyam Dental Clinic web app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shyam-dental.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub (free).
2. Click **"Add New… → Project"**.
3. Import your **shyam-dental** repository.
4. Vercel auto-detects Vite — just click **Deploy**.
5. Done! You get a free live URL like `shyam-dental.vercel.app`.

Every time you `git push`, Vercel redeploys automatically. ✅

> The included `vercel.json` makes sure page refreshes work correctly
> on routes like `/admin` and `/booking` (SPA routing).

---

## 📁 Project Structure

```
shyam-dental/
├── index.html              ← Vite entry
├── package.json
├── vite.config.js
├── vercel.json             ← SPA routing config for Vercel
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            ← React entry
    ├── App.jsx             ← routes
    ├── styles/
    │   └── index.css       ← all styling (theme variables on top)
    ├── data/
    │   └── clinicData.js   ← ALL clinic content + admin passcode
    ├── context/
    │   ├── AppContext.jsx  ← shared state + localStorage
    │   └── ToastContext.jsx
    ├── components/
    │   ├── Navbar.jsx · Footer.jsx · Icon.jsx
    │   ├── Reveal.jsx · ScrollToTop.jsx
    └── pages/
        ├── Home.jsx · Services.jsx · Doctors.jsx
        ├── Reviews.jsx · Booking.jsx · Contact.jsx
        ├── Admin.jsx · AdminLogin.jsx · AdminDashboard.jsx
        └── NotFound.jsx
```

---

## 🎨 Re-skin It for Any Clinic

To turn this into a different clinic's site, you only touch **2 files**:

1. **`src/data/clinicData.js`** — clinic name, phone, address, doctors,
   services, prices, reviews, **and the admin passcode**.
2. **`src/styles/index.css`** — the colour theme is defined as CSS
   variables in the `:root {}` block at the very top. Change those to
   re-brand instantly.

That's it — a fresh, custom clinic site in minutes.

---

Designed & developed by **Loomix Studios** — Web Design & Marketing.
🌐 loomixstudios.in
