/* ============================================================
   SHYAM DENTAL CLINIC — Demo Data
   Everything a clinic would customise lives here.
   ============================================================ */

export const CLINIC = {
  name: "Shyam Dental Clinic",
  tagline: "Smile Brighter, Live Better",
  phone: "+91 98470 12345",
  whatsapp: "919847012345",
  email: "care@shyamdental.in",
  address: "2nd Floor, Sreepathi Arcade, MG Road, Kollam, Kerala 691001",
  hours: "Mon–Sat: 9:00 AM – 8:00 PM • Sun: 10:00 AM – 2:00 PM",
  established: 2009,
  mapCoords: { lat: 8.8932, lng: 76.6141 },
  // Admin panel passcode — clinic can change this
  adminPasscode: "shyam2026",
}

export const STATS = [
  { value: "17+", num: 17, suffix: "+", decimals: 0, label: "Years of Care" },
  { value: "25,000+", num: 25000, suffix: "+", decimals: 0, label: "Happy Smiles" },
  { value: "4.9★", num: 4.9, suffix: "★", decimals: 1, label: "Google Rating" },
  { value: "6", num: 6, suffix: "", decimals: 0, label: "Expert Doctors" },
]

export const SERVICES = [
  {
    id: "checkup",
    name: "Dental Check-up & Cleaning",
    icon: "tooth",
    desc: "Complete oral examination, professional scaling and polishing to keep your smile fresh.",
    price: "₹500",
    unit: "/ visit",
    tag: "Popular",
    long: "Our routine check-up includes a full oral cancer screening, gum-health assessment, digital X-rays when needed, and ultrasonic scaling to remove plaque and tartar build-up.",
    duration: "30 min",
  },
  {
    id: "rct",
    name: "Root Canal Treatment",
    icon: "shield",
    desc: "Painless, single-sitting root canals using modern rotary endodontics.",
    price: "₹3,500",
    unit: "onwards",
    tag: null,
    long: "Save your natural tooth with our advanced rotary RCT. Most cases finished in a single comfortable sitting with digital apex location for pinpoint precision.",
    duration: "60 min",
  },
  {
    id: "braces",
    name: "Braces & Aligners",
    icon: "smile",
    desc: "Metal, ceramic and clear aligner options for perfectly straight teeth.",
    price: "₹25,000",
    unit: "onwards",
    tag: "EMI Available",
    long: "From classic braces to invisible aligners, we craft a custom orthodontic plan for your smile. Free 3D smile preview before you start your journey.",
    duration: "45 min",
  },
  {
    id: "implant",
    name: "Dental Implants",
    icon: "anchor",
    desc: "Permanent, natural-looking replacement for missing teeth.",
    price: "₹22,000",
    unit: "/ implant",
    tag: null,
    long: "Titanium implants that fuse with your jawbone for a lifetime solution. Includes 3D CBCT planning, surgery and a 10-year warranty.",
    duration: "90 min",
  },
  {
    id: "whitening",
    name: "Teeth Whitening",
    icon: "sparkle",
    desc: "Brighten your smile by up to 8 shades in a single appointment.",
    price: "₹6,000",
    unit: "/ session",
    tag: "Trending",
    long: "Professional in-clinic laser whitening that's completely safe on enamel. Walk in dull, walk out dazzling — visible results the very same day.",
    duration: "60 min",
  },
  {
    id: "kids",
    name: "Kids' Dentistry",
    icon: "heart",
    desc: "Gentle, fear-free dental care designed especially for children.",
    price: "₹400",
    unit: "/ visit",
    tag: null,
    long: "A colourful, friendly environment with paediatric specialists. Fluoride treatments, sealants and habit counselling for happy little smiles.",
    duration: "30 min",
  },
  {
    id: "cosmetic",
    name: "Smile Makeover",
    icon: "star",
    desc: "Complete cosmetic transformation with veneers and contouring.",
    price: "₹12,000",
    unit: "onwards",
    tag: "Premium",
    long: "A fully customised cosmetic plan combining veneers, whitening and gum contouring to design the smile you've always dreamed of.",
    duration: "75 min",
  },
  {
    id: "gum",
    name: "Gum Treatment",
    icon: "shieldcheck",
    desc: "Advanced periodontal care for healthy gums and fresh breath.",
    price: "₹2,000",
    unit: "onwards",
    tag: null,
    long: "Deep cleaning, laser gum therapy and maintenance plans to treat and prevent gum disease — the leading cause of tooth loss.",
    duration: "45 min",
  },
]

export const DOCTORS = [
  {
    id: "d1",
    name: "Dr. Shyam Krishnan",
    short: "Dr. Shyam",
    spec: "Chief Dental Surgeon • Implantologist",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
    bio: "Founder of the clinic with 18+ years of experience and over 4,000 successful implant cases across Kerala.",
    exp: "18 yrs",
    patients: "12,000+",
    rating: "4.9",
    qualifications: "BDS, MDS (Oral Implantology)",
  },
  {
    id: "d2",
    name: "Dr. Anjali Menon",
    short: "Dr. Anjali",
    spec: "Orthodontist • Smile Designer",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
    bio: "Specialist in clear aligners and cosmetic smile makeovers. Gold medalist in Orthodontics.",
    exp: "11 yrs",
    patients: "5,800+",
    rating: "5.0",
    qualifications: "BDS, MDS (Orthodontics)",
  },
  {
    id: "d3",
    name: "Dr. Rahul Varghese",
    short: "Dr. Rahul",
    spec: "Endodontist • Root Canal Expert",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
    bio: "Painless single-sitting root canal specialist trusted by thousands of nervous patients.",
    exp: "9 yrs",
    patients: "7,200+",
    rating: "4.8",
    qualifications: "BDS, MDS (Endodontics)",
  },
  {
    id: "d4",
    name: "Dr. Meera Nair",
    short: "Dr. Meera",
    spec: "Paediatric Dentist • Kids' Specialist",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    bio: "Makes every child's dental visit fun and fear-free. Beloved by little patients and parents alike.",
    exp: "7 yrs",
    patients: "4,100+",
    rating: "5.0",
    qualifications: "BDS, MDS (Paedodontics)",
  },
]

export const REVIEWS = [
  { id: "r1", name: "Priya Nair", role: "Teacher, Kollam", rating: 5, date: "2 weeks ago",
    text: "I was terrified of dentists my whole life. Dr. Shyam and the team made my root canal completely painless. The online booking was so easy too!" },
  { id: "r2", name: "Arun Kumar", role: "Software Engineer", rating: 5, date: "1 month ago",
    text: "Got my aligners here and the 3D smile preview blew me away. Six months later my smile is perfect. Worth every rupee." },
  { id: "r3", name: "Fathima Rashid", role: "Homemaker", rating: 5, date: "3 weeks ago",
    text: "Took my 6-year-old here and she actually ASKED to come back. The kids' section is wonderful. Highly recommend Dr. Meera." },
  { id: "r4", name: "Joseph Thomas", role: "Businessman", rating: 5, date: "1 week ago",
    text: "Two implants done with zero discomfort. The clinic is spotless and modern. The WhatsApp reminders meant I never missed an appointment." },
  { id: "r5", name: "Lakshmi Pillai", role: "Retired Banker", rating: 4, date: "2 months ago",
    text: "Excellent whitening results — 8 shades brighter in one sitting. Friendly staff and very transparent pricing." },
  { id: "r6", name: "Vishnu Prasad", role: "College Student", rating: 5, date: "5 days ago",
    text: "Booked online at midnight, got a confirmation instantly. Clean, professional and genuinely caring doctors. 10/10." },
]

export const FEATURES = [
  { icon: "calendar", title: "24/7 Online Booking", desc: "Reserve your slot anytime, from any device — no phone calls needed." },
  { icon: "bell", title: "Smart Reminders", desc: "Automatic WhatsApp & SMS reminders so you never miss a visit." },
  { icon: "folder", title: "Digital Records", desc: "Your full treatment history, X-rays and prescriptions in one place." },
  { icon: "card", title: "Easy Online Payments", desc: "Pay securely with UPI or card and get instant digital invoices." },
]

export const FAQS = [
  { q: "Do I need an appointment or can I walk in?",
    a: "We welcome walk-ins, but booking online guarantees your preferred time and means zero waiting. It takes under a minute." },
  { q: "Are dental treatments painful?",
    a: "Not at our clinic. We use modern painless techniques and sedation options. Most patients are surprised how comfortable it is." },
  { q: "Do you offer EMI or instalment options?",
    a: "Yes — treatments above ₹15,000 are eligible for easy no-cost EMI plans. Ask our front desk for details." },
  { q: "Is the clinic safe and hygienic?",
    a: "Absolutely. Every instrument is autoclave-sterilised, and we follow strict hospital-grade infection-control protocols." },
  { q: "Do you treat children?",
    a: "Yes! We have a dedicated paediatric dentist and a colourful kids' area designed to make visits fun and fear-free." },
]

/* ---------------- ADMIN / DASHBOARD DEMO DATA ---------------- */

export const PATIENTS = [
  { id: "P-1042", name: "Priya Nair", age: 34, gender: "Female", phone: "98470 11234", email: "priya.n@email.com", last: "12 May 2026", treatment: "Root Canal", status: "Active", balance: 0 },
  { id: "P-1043", name: "Arun Kumar", age: 28, gender: "Male", phone: "98470 22345", email: "arun.k@email.com", last: "08 May 2026", treatment: "Aligners", status: "Active", balance: 18000 },
  { id: "P-1044", name: "Fathima Rashid", age: 41, gender: "Female", phone: "98470 33456", email: "fathima.r@email.com", last: "21 May 2026", treatment: "Cleaning", status: "Active", balance: 0 },
  { id: "P-1045", name: "Joseph Thomas", age: 52, gender: "Male", phone: "98470 44567", email: "joseph.t@email.com", last: "02 May 2026", treatment: "Implant", status: "Follow-up", balance: 11000 },
  { id: "P-1046", name: "Lakshmi Pillai", age: 60, gender: "Female", phone: "98470 55678", email: "lakshmi.p@email.com", last: "19 May 2026", treatment: "Whitening", status: "Active", balance: 0 },
  { id: "P-1047", name: "Vishnu Prasad", age: 21, gender: "Male", phone: "98470 66789", email: "vishnu.p@email.com", last: "23 May 2026", treatment: "Check-up", status: "Active", balance: 0 },
  { id: "P-1048", name: "Meera Suresh", age: 9, gender: "Female", phone: "98470 77890", email: "meera.s@email.com", last: "15 May 2026", treatment: "Kids' Fluoride", status: "Active", balance: 0 },
  { id: "P-1049", name: "Rahul Pillai", age: 37, gender: "Male", phone: "98470 88901", email: "rahul.p@email.com", last: "10 May 2026", treatment: "Gum Treatment", status: "Active", balance: 2000 },
]

export const APPOINTMENTS = [
  { id: "A-501", patient: "Priya Nair", doctor: "Dr. Rahul Varghese", date: "Today", time: "10:30 AM", service: "Root Canal", status: "confirmed" },
  { id: "A-502", patient: "Vishnu Prasad", doctor: "Dr. Shyam Krishnan", date: "Today", time: "11:15 AM", service: "Check-up", status: "confirmed" },
  { id: "A-503", patient: "Meera Suresh", doctor: "Dr. Meera Nair", date: "Today", time: "12:00 PM", service: "Kids' Fluoride", status: "pending" },
  { id: "A-504", patient: "Joseph Thomas", doctor: "Dr. Shyam Krishnan", date: "Today", time: "03:30 PM", service: "Implant Review", status: "confirmed" },
  { id: "A-505", patient: "Lakshmi Pillai", doctor: "Dr. Anjali Menon", date: "Tomorrow", time: "10:00 AM", service: "Whitening", status: "pending" },
  { id: "A-506", patient: "Arun Kumar", doctor: "Dr. Anjali Menon", date: "Tomorrow", time: "04:00 PM", service: "Aligner Fitting", status: "confirmed" },
  { id: "A-507", patient: "Fathima Rashid", doctor: "Dr. Shyam Krishnan", date: "26 May", time: "09:30 AM", service: "Cleaning", status: "done" },
  { id: "A-508", patient: "Rahul Pillai", doctor: "Dr. Rahul Varghese", date: "27 May", time: "02:30 PM", service: "Gum Treatment", status: "confirmed" },
]

export const INVOICES = [
  { id: "INV-2041", patient: "Priya Nair", date: "12 May 2026", service: "Root Canal Treatment", amount: 3500, status: "paid" },
  { id: "INV-2042", patient: "Lakshmi Pillai", date: "19 May 2026", service: "Laser Teeth Whitening", amount: 6000, status: "paid" },
  { id: "INV-2043", patient: "Arun Kumar", date: "08 May 2026", service: "Clear Aligners (Instalment 1)", amount: 18000, status: "pending" },
  { id: "INV-2044", patient: "Joseph Thomas", date: "02 May 2026", service: "Dental Implant", amount: 22000, status: "partial" },
  { id: "INV-2045", patient: "Vishnu Prasad", date: "23 May 2026", service: "Check-up & Cleaning", amount: 500, status: "paid" },
  { id: "INV-2046", patient: "Rahul Pillai", date: "10 May 2026", service: "Gum Treatment", amount: 2000, status: "pending" },
]

export const REVENUE_BARS = [
  { label: "Dec", value: 58 }, { label: "Jan", value: 64 }, { label: "Feb", value: 71 },
  { label: "Mar", value: 60 }, { label: "Apr", value: 86 }, { label: "May", value: 95 },
]

export const REVENUE_BY_TREATMENT = [
  { name: "Dental Implants", patients: 28, revenue: 616000, share: 34 },
  { name: "Braces & Aligners", patients: 19, revenue: 475000, share: 26 },
  { name: "Teeth Whitening", patients: 44, revenue: 264000, share: 15 },
  { name: "Root Canal", patients: 62, revenue: 217000, share: 12 },
  { name: "Check-up & Cleaning", patients: 218, revenue: 109000, share: 6 },
  { name: "Other Treatments", patients: 35, revenue: 131000, share: 7 },
]

export const TIME_SLOTS = [
  { t: "09:00 AM", taken: false }, { t: "09:45 AM", taken: true },
  { t: "10:30 AM", taken: false }, { t: "11:15 AM", taken: false },
  { t: "12:00 PM", taken: true }, { t: "02:30 PM", taken: false },
  { t: "03:30 PM", taken: false }, { t: "04:15 PM", taken: false },
  { t: "05:00 PM", taken: true }, { t: "05:45 PM", taken: false },
  { t: "06:30 PM", taken: false }, { t: "07:15 PM", taken: false },
]

export const ACTIVITY_FEED = [
  { icon: "calendar", text: "New appointment booked by Vishnu Prasad", time: "5 min ago", color: "#0f7268" },
  { icon: "card", text: "Payment of ₹6,000 received from Lakshmi Pillai", time: "1 hr ago", color: "#5b46c9" },
  { icon: "star", text: "New 5-star review from Joseph Thomas", time: "2 hrs ago", color: "#e2a93b" },
  { icon: "users", text: "New patient registered — Rahul Pillai", time: "4 hrs ago", color: "#16a394" },
  { icon: "check", text: "Treatment completed for Fathima Rashid", time: "Yesterday", color: "#0f7268" },
]
