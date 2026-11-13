// ==================== FIREBASE CLOUD CONFIGURATION ====================
const firebaseConfig = {
  apiKey: "AIzaSyAXIF5CrQVNErK6Qefj7vAm2jNTwKbpVvE",
  authDomain: "sdrmemorialschool.firebaseapp.com",
  projectId: "sdrmemorialschool",
  storageBucket: "sdrmemorialschool.firebasestorage.app",
  messagingSenderId: "200886478103",
  appId: "1:200886478103:web:bf8596fdc1c3793d100352"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// ==================== DEFAULT SCHOOL DATA ====================
const defaultSchoolData = {
  notice: "📢 सत्र 2026-27 के लिए प्रवेश प्रारंभ (नर्सरी से कक्षा 10वीं तक) • 🎓 अर्द्धवार्षिक एवं वार्षिक परीक्षा परिणाम अब ऑनलाइन उपलब्ध हैं • 🚌 बसारी एवं आसपास के गाँवों के लिए सुरक्षित वाहन सुविधा।",
  stats: { alumni: "2,450+", newAdmissions: "148", currentStudents: "520+", teachers: "22" },
  toppers: [
    { rank: 1, name: "Ananya Tiwari", className: "Class 10th", percent: "96.4%" },
    { rank: 2, name: "Aarav Singh", className: "Class 10th", percent: "94.8%" },
    { rank: 3, name: "Priya Chaurasiya", className: "Class 9th", percent: "93.2%" },
    { rank: 4, name: "Rohan Yadav", className: "Class 10th", percent: "91.6%" },
    { rank: 5, name: "Kavya Patel", className: "Class 8th", percent: "91.0%" },
    { rank: 6, name: "Aditya Sharma", className: "Class 9th", percent: "89.8%" },
    { rank: 7, name: "Sneha Kushwaha", className: "Class 10th", percent: "88.5%" },
    { rank: 8, name: "Harshvardhan Singh", className: "Class 8th", percent: "87.4%" },
    { rank: 9, name: "Nandini Sahu", className: "Class 7th", percent: "86.9%" },
    { rank: 10, name: "Devansh Dubey", className: "Class 9th", percent: "86.2%" }
  ],
  staff: [
    { name: "Mr. R.K. Sharma", role: "Principal & Senior Maths", wing: "High School", qualification: "M.Sc. (Maths), B.Ed.", since: "2014 (12+ Yrs)", bestSubject: "Class 10th Mathematics • 100% Board Result", photo: "" },
    { name: "Mrs. Sunita Mishra", role: "Senior English Teacher", wing: "High School", qualification: "M.A. (English), B.Ed.", since: "2016 (10+ Yrs)", bestSubject: "English Grammar & Spoken English", photo: "" },
    { name: "Mr. Arvind Tiwari", role: "Science & Lab In-Charge", wing: "Middle", qualification: "M.Sc. (Physics), B.Ed.", since: "2018 (8+ Yrs)", bestSubject: "Science & Practical Experiments", photo: "" },
    { name: "Ms. Pooja Chaturvedi", role: "Hindi & Sanskrit", wing: "Middle", qualification: "M.A. (Hindi), D.El.Ed.", since: "2019 (7+ Yrs)", bestSubject: "Hindi Literature & Cultural Activities", photo: "" },
    { name: "Mr. Deepak Sahu", role: "Computer & IT", wing: "Middle", qualification: "BCA, PGDCA", since: "2020 (6+ Yrs)", bestSubject: "Computer Science & Smart Class", photo: "" },
    { name: "Mrs. Neha Rajput", role: "Primary Coordinator", wing: "Primary", qualification: "B.A., D.El.Ed.", since: "2017 (9+ Yrs)", bestSubject: "Foundational Learning (Nur–5th)", photo: "" }
  ],
  holidays: [
    { date: "15 Aug 2026", day: "Saturday", name: "Independence Day (स्वतंत्रता दिवस)", type: "National" },
    { date: "02 Oct 2026", day: "Friday", name: "Gandhi Jayanti (गांधी जयंती)", type: "National" },
    { date: "19–22 Oct 2026", day: "Mon–Thu", name: "Dussehra Vacation (दशहरा अवकाश)", type: "Festival" },
    { date: "07–12 Nov 2026", day: "Sat–Thu", name: "Diwali Vacation (दीपावली अवकाश)", type: "Festival" },
    { date: "25–31 Dec 2026", day: "Fri–Thu", name: "Winter Vacation (शीतकालीन अवकाश)", type: "Vacation" },
    { date: "26 Jan 2027", day: "Tuesday", name: "Republic Day (गणतंत्र दिवस)", type: "National" },
    { date: "23 Mar 2027", day: "Tuesday", name: "Holi Festival (होली अवकाश)", type: "Festival" }
  ],
  results: [
    {
      roll: "101", dob: "2012-05-15", name: "Aarav Singh", fatherName: "Rajesh Singh", motherName: "Sunita Devi",
      className: "Class 8th", examTitle: "ANNUAL PROGRESS REPORT 2026–27", attendance: "196 / 205 Days (95%)", photo: "",
      subjects: [
        { name: "Hindi", max: 100, theory: 68, practical: 19 },
        { name: "English", max: 100, theory: 64, practical: 18 },
        { name: "Mathematics", max: 100, theory: 73, practical: 19 },
        { name: "Science", max: 100, theory: 69, practical: 19 },
        { name: "Social Science", max: 100, theory: 66, practical: 18 }
      ]
    }
  ],
  tcRecords: [
    { tcNo: "TC-2026-01", studentName: "Vikram Singh", fatherName: "Mahendra Singh", lastClass: "Class 8th Passed", issueDate: "15-04-2026", status: "VERIFIED & GENUINE" }
  ]
};

let schoolData = JSON.parse(localStorage.getItem("sdr_school_portal_data") || "null") || defaultSchoolData;
let currentLang = localStorage.getItem("sdr_lang") || "en";
let latestAdmissionText = "";
// ==================== CLOUD REAL-TIME SYNC ====================
async function syncFromCloud() {
  try {
    const doc = await db.collection("sdr_portal").doc("main_data").get();
    if (doc.exists) {
      schoolData = { ...defaultSchoolData, ...doc.data() };
      localStorage.setItem("sdr_school_portal_data", JSON.stringify(schoolData));
      refreshPublicUI();
    } else {
      await db.collection("sdr_portal").doc("main_data").set(schoolData);
    }
  } catch (e) {
    console.log("Offline/Local mode active");
  }
}

function refreshPublicUI() {
  if (document.getElementById("liveNoticeTicker")) {
    document.getElementById("liveNoticeTicker").innerText = schoolData.notice;
    document.getElementById("statAlumni").innerText = schoolData.stats.alumni;
    document.getElementById("statNewAdmissions").innerText = schoolData.stats.newAdmissions;
    document.getElementById("statCurrentStudents").innerText = schoolData.stats.currentStudents;
    document.getElementById("statTeachers").innerText = schoolData.stats.teachers;
    renderToppers();
    renderStaff("All");
    renderHolidays();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  refreshPublicUI();
  syncFromCloud();
  initScrollReveal();
  if (currentLang === "hi") applyLanguage("hi");
});

function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal-up");
  const check = () => reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 40) el.classList.add("active");
  });
  window.addEventListener("scroll", check);
  check();
}

function toggleMobileMenu() {
  const m = document.getElementById("mobileMenu");
  const i = document.getElementById("menuIcon");
  m.classList.toggle("hidden");
  i.className = m.classList.contains("hidden") ? "fa-solid fa-bars" : "fa-solid fa-xmark";
}
function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.add("hidden");
  document.getElementById("menuIcon").className = "fa-solid fa-bars";
}
function openAdmissionModal() { document.getElementById("admissionModal").classList.remove("hidden"); }
function closeAdmissionModal() { document.getElementById("admissionModal").classList.add("hidden"); }

function toggleLanguage() {
  currentLang = currentLang === "en" ? "hi" : "en";
  localStorage.setItem("sdr_lang", currentLang);
  applyLanguage(currentLang);
}
function applyLanguage(lang) {
  const b = document.getElementById("langBtnText");
  if (b) b.innerText = lang === "en" ? "हिंदी में देखें" : "Switch to English";
  document.querySelectorAll("[data-en]").forEach((el) => {
    el.innerText = lang === "en" ? el.getAttribute("data-en") : el.getAttribute("data-hi");
  });
}
function renderToppers() {
  const grid = document.getElementById("toppersGrid");
  if (!grid) return;
  grid.innerHTML = schoolData.toppers.map((t) => {
    const badge = t.rank === 1 ? "bg-amber-400 text-[#0F2A4A]" : t.rank === 2 ? "bg-slate-300 text-slate-900" : t.rank === 3 ? "bg-amber-700 text-white" : "bg-[#0F2A4A] text-amber-400";
    return `<div class="hover-lift relative bg-white rounded-2xl p-4 text-center border ${t.rank <= 3 ? "border-amber-400 shadow" : "border-slate-200"}">
      <span class="absolute -top-3 left-1/2 -translate-x-1/2 ${badge} text-[11px] font-extrabold px-3 py-0.5 rounded-full">Rank #${t.rank}</span>
      <div class="w-14 h-14 rounded-full bg-[#0F2A4A] text-amber-400 flex items-center justify-center font-extrabold text-lg mx-auto mt-2 mb-2 border-2 border-amber-400">${t.name.charAt(0)}</div>
      <h4 class="font-bold text-sm text-[#0F2A4A]">${t.name}</h4>
      <p class="text-[11px] text-slate-500">${t.className}</p>
      <span class="mt-2 inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-xs px-2.5 py-0.5 rounded-full">${t.percent}</span>
    </div>`;
  }).join("");
}

function renderStaff(wing) {
  const grid = document.getElementById("staffGrid");
  if (!grid) return;
  const list = wing === "All" ? schoolData.staff : schoolData.staff.filter((s) => s.wing === wing);
  grid.innerHTML = list.map((s) => `
    <div class="hover-lift bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
      <div class="flex items-center gap-3">
        ${s.photo ? `<img src="${s.photo}" class="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shrink-0" />` : `<div class="w-14 h-14 rounded-2xl bg-[#0F2A4A] text-amber-400 flex items-center justify-center text-xl font-extrabold border-2 border-amber-400 shrink-0">${s.name.replace(/Mr\.|Mrs\.|Ms\./g, "").trim().charAt(0)}</div>`}
        <div>
          <span class="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">${s.wing} Wing</span>
          <h4 class="font-extrabold text-base text-[#0F2A4A] mt-0.5">${s.name}</h4>
          <p class="text-xs font-semibold text-slate-600">${s.role}</p>
        </div>
      </div>
      <div class="text-xs text-slate-600 border-t pt-2.5 space-y-1">
        <div><strong>Qualification:</strong> ${s.qualification}</div>
        <div><strong>Experience:</strong> ${s.since}</div>
        <div class="bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-200 font-medium">${s.bestSubject}</div>
      </div>
    </div>`).join("");
}

function filterStaff(wing) {
  document.querySelectorAll(".staff-filter-btn").forEach((b) => {
    const active = b.innerText.includes(wing) || (wing === "All" && b.innerText.includes("All"));
    b.className = active ? "staff-filter-btn bg-[#0F2A4A] text-white text-xs font-bold px-4 py-2 rounded-full" : "staff-filter-btn bg-white text-slate-700 text-xs font-bold px-4 py-2 rounded-full border";
  });
  renderStaff(wing);
}

function renderHolidays() {
  const tbody = document.getElementById("holidaysTableBody");
  if (!tbody || !schoolData.holidays) return;
  tbody.innerHTML = schoolData.holidays.map((h) => {
    const badge = h.type === "National" ? "bg-amber-100 text-amber-800" : h.type === "Vacation" ? "bg-sky-100 text-sky-800" : "bg-emerald-100 text-emerald-800";
    return `<tr class="hover:bg-slate-50"><td class="px-4 py-3 font-bold text-[#0F2A4A]">${h.date}</td><td class="px-4 py-3 text-slate-600">${h.day}</td><td class="px-4 py-3 font-semibold">${h.name}</td><td class="px-4 py-3 text-center"><span class="${badge} text-[11px] font-bold px-2.5 py-0.5 rounded-full">${h.type}</span></td></tr>`;
  }).join("");
}
function switchSearchTab(mode) {
  ["roll", "name", "tc"].forEach((k) => {
    document.getElementById(k + "SearchForm").classList.toggle("hidden", k !== mode);
    const tab = document.getElementById("tab" + k.charAt(0).toUpperCase() + k.slice(1) + "Btn");
    tab.className = k === mode ? "px-3 py-2 text-xs sm:text-sm font-bold border-b-2 border-[#0F2A4A] text-[#0F2A4A]" : "px-3 py-2 text-xs sm:text-sm font-semibold border-b-2 border-transparent text-slate-500";
  });
  document.getElementById("resultError").classList.add("hidden");
  document.getElementById("tcResultBox").classList.add("hidden");
}

function fillDemoResult() {
  switchSearchTab("roll");
  document.getElementById("rollInput").value = "101";
  document.getElementById("dobInput").value = "2012-05-15";
}

function searchResultByRoll(e) {
  e.preventDefault();
  const r = document.getElementById("rollInput").value.trim();
  const d = document.getElementById("dobInput").value.trim();
  renderMarksheet(schoolData.results.find((s) => s.roll === r && s.dob === d));
}

function searchResultByName(e) {
  e.preventDefault();
  const sn = document.getElementById("studentNameInput").value.trim().toLowerCase();
  const fn = document.getElementById("fatherNameInput").value.trim().toLowerCase();
  renderMarksheet(schoolData.results.find((s) => s.name.toLowerCase().includes(sn) && s.fatherName.toLowerCase().includes(fn)));
}

function verifyTC(e) {
  e.preventDefault();
  const tc = document.getElementById("tcInput").value.trim().toUpperCase();
  const rec = schoolData.tcRecords.find((t) => t.tcNo.toUpperCase() === tc);
  const err = document.getElementById("resultError");
  const box = document.getElementById("tcResultBox");
  if (!rec) { box.classList.add("hidden"); err.innerText = "TC Number not found!"; err.classList.remove("hidden"); return; }
  err.classList.add("hidden");
  box.innerHTML = `<strong>✅ ${rec.status}</strong><br>TC: ${rec.tcNo} | Student: ${rec.studentName} (S/O ${rec.fatherName}) | ${rec.lastClass}`;
  box.classList.remove("hidden");
}

function getGrade(p) { return p >= 90 ? "A+" : p >= 80 ? "A" : p >= 70 ? "B+" : p >= 60 ? "B" : p >= 45 ? "C" : p >= 33 ? "D" : "F"; }

function renderMarksheet(st) {
  const err = document.getElementById("resultError");
  const wrap = document.getElementById("marksheetWrapper");
  if (!st) { wrap.classList.add("hidden"); err.innerText = "❌ Record nahi mila! Sahi Roll No/DOB ya Name check karein."; err.classList.remove("hidden"); return; }
  err.classList.add("hidden");
  document.getElementById("msExamTitle").innerText = st.examTitle;
  document.getElementById("msName").innerText = st.name;
  document.getElementById("msRoll").innerText = st.roll;
  document.getElementById("msClass").innerText = st.className;
  document.getElementById("msFather").innerText = st.fatherName;
  document.getElementById("msMother").innerText = st.motherName;
  document.getElementById("msDob").innerText = st.dob;
  document.getElementById("msAttendance").innerText = st.attendance;

  const msPhoto = document.getElementById("msStudentPhoto");
  const msIcon = document.getElementById("msDefaultIcon");
  if (st.photo) {
    msPhoto.src = st.photo;
    msPhoto.classList.remove("hidden");
    msIcon.classList.add("hidden");
  } else {
    msPhoto.classList.add("hidden");
    msIcon.classList.remove("hidden");
  }

  document.getElementById("msQrCode").src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(window.location.href)}`;
  let maxT = 0, obtT = 0, pass = true;
  document.getElementById("msSubjectsBody").innerHTML = st.subjects.map((sub) => {
    const tot = Number(sub.theory) + Number(sub.practical);
    maxT += sub.max; obtT += tot; if (tot < 33) pass = false;
    return `<tr><td class="border p-2">${sub.name}</td><td class="border p-1.5 text-center">${sub.max}</td><td class="border p-1.5 text-center">${sub.theory}</td><td class="border p-1.5 text-center">${sub.practical}</td><td class="border p-1.5 text-center font-bold">${tot}</td><td class="border p-1.5 text-center">${getGrade((tot / sub.max) * 100)}</td></tr>`;
  }).join("");
  const per = ((obtT / maxT) * 100).toFixed(2);
  document.getElementById("msMaxTotal").innerText = maxT;
  document.getElementById("msObtainedTotal").innerText = obtT;
  document.getElementById("msPercentage").innerText = per + "%";
  document.getElementById("msOverallGrade").innerText = getGrade(per);
  document.getElementById("msStatus").innerText = pass ? "PASSED" : "SUPPLEMENTARY";
  wrap.classList.remove("hidden");
  wrap.scrollIntoView({ behavior: "smooth" });
}

function closeMarksheet() { document.getElementById("marksheetWrapper").classList.add("hidden"); }

function downloadDirectPDF() {
  html2pdf().set({ margin: 0.3, filename: "SDR_Marksheet.pdf", html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: "in", format: "a4" } }).from(document.getElementById("printableMarksheet")).save();
}

async function submitFullAdmission(e) {
  e.preventDefault();
  const appId = "SDR-2026-" + Math.floor(100 + Math.random() * 900);
  const entry = {
    appId, date: new Date().toLocaleDateString("en-IN"),
    name: document.getElementById("admName").value, className: document.getElementById("admClass").value,
    medium: document.getElementById("admMedium").value, father: document.getElementById("admFather").value,
    mobile: document.getElementById("admMobile").value, address: document.getElementById("admAddress").value
  };
  try {
    await db.collection("sdr_admissions").doc(appId).set(entry);
  } catch (err) {
    const list = JSON.parse(localStorage.getItem("sdr_admission_inquiries") || "[]");
    list.unshift(entry);
    localStorage.setItem("sdr_admission_inquiries", JSON.stringify(list));
  }
  document.getElementById("recAppId").innerText = appId;
  document.getElementById("recSummaryText").innerText = `${entry.name} (${entry.className}) | Father: ${entry.father} | Mobile: ${entry.mobile}`;
  latestAdmissionText = `*New Admission - SDR School Basari*%0AApp ID: ${appId}%0AName: ${entry.name}%0AClass: ${entry.className}%0AFather: ${entry.father}%0AMobile: ${entry.mobile}`;
  document.getElementById("admissionReceiptBox").classList.remove("hidden");
}

function sendAdmissionWhatsApp() {
  window.open(`https://wa.me/919876543210?text=${latestAdmissionText}`, "_blank");
}
