// =========================================================
// SDR MEMORIAL PUBLIC HIGH SCHOOL, BASARI - CLOUD ENGINE v2
// =========================================================

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

// Register Service Worker for Android App / PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

let currentLang = "en";

const defaultSchoolData = {
  noticeEn: "📢 Admissions Open for Session 2026–27 (Nursery to Class 10th) • 🎓 Digital PDF Marksheets with Student Photo & QR Code now live • 🚌 Safe School Van available for Basari & nearby villages.",
  notice: "📢 सत्र 2026-27 के लिए प्रवेश प्रारंभ (नर्सरी से कक्षा 10वीं तक) • 🎓 छात्र फोटो एवं QR कोड वाली डिजिटल मार्कशीट अब ऑनलाइन उपलब्ध • 🚌 बसारी एवं आसपास के गाँवों के लिए सुरक्षित वैन सुविधा।",
  stats: {
    alumni: "2,450+",
    newAdmissions: "148",
    currentStudents: "520+",
    teachers: "22"
  },
  toppers: [
    { name: "Ananya Tiwari", className: "Class 10th", pct: "96.4%" },
    { name: "Aarav Singh", className: "Class 10th", pct: "94.8%" },
    { name: "Priya Chaurasiya", className: "Class 9th", pct: "93.2%" },
    { name: "Rohan Yadav", className: "Class 10th", pct: "91.6%" },
    { name: "Kavya Patel", className: "Class 9th", pct: "91.0%" }
  ],
  staff: [
    { name: "Mr. R.K. Sharma", role: "Principal (M.Sc., B.Ed.)", wing: "High School", qualification: "M.Sc. Mathematics, B.Ed.", since: "2012", bestSubject: "Mathematics", photo: "" },
    { name: "Mrs. Sunita Mishra", role: "Senior Science Teacher", wing: "High School", qualification: "M.Sc. Biology, B.Ed.", since: "2015", bestSubject: "Science", photo: "" },
    { name: "Mr. Arvind Tiwari", role: "English & Grammar", wing: "Middle", qualification: "M.A. English, D.El.Ed.", since: "2017", bestSubject: "English", photo: "" },
    { name: "Ms. Pooja Chaturvedi", role: "Primary Coordinator", wing: "Primary", qualification: "B.A., D.El.Ed.", since: "2019", bestSubject: "Hindi & EVS", photo: "" }
  ],
  holidays: [
    { date: "15 Aug 2026", day: "Saturday", name: "Independence Day (स्वतंत्रता दिवस)", type: "National" },
    { date: "02 Oct 2026", day: "Friday", name: "Gandhi Jayanti (गांधी जयंती)", type: "National" },
    { date: "08 Nov 2026", day: "Sunday", name: "Diwali Vacation (दीपावली अवकाश)", type: "Festival" },
    { date: "26 Jan 2027", day: "Tuesday", name: "Republic Day (गणतंत्र दिवस)", type: "National" }
  ],
  tcs: [
    { tcNo: "TC-2026-089", name: "Rohan Yadav", father: "Mr. Mahesh Yadav", classPassed: "Class 10th", issueDate: "15 May 2026", conduct: "Excellent" }
  ],
  results: []
};

let schoolData = JSON.parse(JSON.stringify(defaultSchoolData));
let cloudResults = [];
let cloudGallery = [];
async function syncFromCloud() {
  try {
    const doc = await db.collection("sdr_portal").doc("main_data").get();
    if (doc.exists) {
      schoolData = { ...defaultSchoolData, ...doc.data() };
    }
    const resSnap = await db.collection("sdr_results").get();
    cloudResults = resSnap.docs.map(d => d.data());

    const galSnap = await db.collection("sdr_gallery").get();
    cloudGallery = galSnap.docs.map(d => d.data());
  } catch (e) {
    console.warn("Using cached/default school data:", e);
  }
  refreshPublicUI();
}

function refreshPublicUI() {
  const ticker = document.getElementById("liveNoticeTicker");
  if (!ticker) return;

  ticker.setAttribute("data-en", schoolData.noticeEn || defaultSchoolData.noticeEn);
  ticker.setAttribute("data-hi", schoolData.notice || defaultSchoolData.notice);
  ticker.innerText = currentLang === "hi" ? ticker.getAttribute("data-hi") : ticker.getAttribute("data-en");

  document.getElementById("statAlumni").innerText = schoolData.stats.alumni;
  document.getElementById("statNewAdmissions").innerText = schoolData.stats.newAdmissions;
  document.getElementById("statCurrentStudents").innerText = schoolData.stats.currentStudents;
  document.getElementById("statTeachers").innerText = schoolData.stats.teachers;

  renderGallery();
  renderToppers();
  renderStaff("All");
  renderHolidays();
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "hi" : "en";
  document.getElementById("langBtnText").innerText = currentLang === "en" ? "हिंदी में देखें" : "View in English";

  document.querySelectorAll("[data-en]").forEach(el => {
    const val = currentLang === "hi" ? el.getAttribute("data-hi") : el.getAttribute("data-en");
    if (val) {
      if (val.includes("<")) el.innerHTML = val;
      else el.innerText = val;
    }
  });
}

function toggleMobileMenu() {
  document.getElementById("mobileMenu").classList.toggle("hidden");
}
function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.add("hidden");
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, { threshold: 0.1 });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".reveal-up").forEach(el => observer.observe(el));
  syncFromCloud();
});
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const fallbackGallery = [
    { title: "Morning Assembly & Prayer", tag: "Campus", url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=80" },
    { title: "Smart Classroom Learning", tag: "Academics", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80" },
    { title: "Computer & Digital Lab", tag: "Lab", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80" },
    { title: "Annual Sports & Cultural Day", tag: "Events", url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&q=80" }
  ];

  const items = cloudGallery.length ? cloudGallery : fallbackGallery;
  grid.innerHTML = items.map(g => `
    <div class="group relative rounded-2xl overflow-hidden shadow-sm border bg-slate-100 aspect-[4/3] hover-lift">
      <img src="${g.url || g.photo}" alt="${g.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#08152B]/90 via-transparent to-transparent flex flex-col justify-end p-3">
        <span class="text-[10px] font-bold bg-amber-400 text-[#08152B] px-2 py-0.5 rounded w-fit mb-1">${g.tag || "Campus"}</span>
        <p class="text-white font-bold text-xs leading-snug">${g.title}</p>
      </div>
    </div>
  `).join("");
}

function renderToppers() {
  const grid = document.getElementById("toppersGrid");
  if (!grid) return;
  grid.innerHTML = (schoolData.toppers || []).map((t, i) => `
    <div class="bg-gradient-to-b from-amber-50/60 to-white border border-amber-200 rounded-2xl p-4 text-center shadow-sm hover-lift relative">
      <span class="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-400 text-[#08152B] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow">Rank #${i + 1}</span>
      <div class="w-12 h-12 rounded-full bg-[#0F2952] text-amber-300 font-extrabold flex items-center justify-center mx-auto mt-2 text-lg border-2 border-amber-400">${t.name.charAt(0)}</div>
      <h4 class="font-extrabold text-[#0F2952] text-xs sm:text-sm mt-2 truncate">${t.name}</h4>
      <p class="text-[11px] text-slate-500">${t.className}</p>
      <span class="inline-block mt-1.5 bg-emerald-100 text-emerald-800 font-extrabold text-xs px-2.5 py-0.5 rounded-lg">${t.pct}</span>
    </div>
  `).join("");
}

function renderStaff(wing) {
  const grid = document.getElementById("staffGrid");
  if (!grid) return;
  const list = wing === "All" ? schoolData.staff : schoolData.staff.filter(s => s.wing === wing);
  grid.innerHTML = list.map(s => `
    <div class="bg-white border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover-lift">
      ${s.photo
        ? `<img src="${s.photo}" class="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shrink-0" />`
        : `<div class="w-16 h-16 rounded-2xl bg-[#0F2952] text-amber-300 font-extrabold text-xl flex items-center justify-center shrink-0 border-2 border-amber-400">${s.name.charAt(0)}</div>`}
      <div class="min-w-0">
        <span class="text-[10px] font-bold bg-blue-50 text-[#0F2952] px-2 py-0.5 rounded">${s.wing}</span>
        <h4 class="font-extrabold text-[#0F2952] text-sm mt-1 truncate">${s.name}</h4>
        <p class="text-xs font-semibold text-amber-700">${s.role}</p>
        <p class="text-[11px] text-slate-500 mt-0.5">${s.qualification} • Since ${s.since}</p>
      </div>
    </div>
  `).join("");
}

function filterStaff(wing, btn) {
  document.querySelectorAll(".staff-tab").forEach(b => {
    b.classList.remove("bg-[#0F2952]", "text-white");
    b.classList.add("bg-white");
  });
  btn.classList.add("bg-[#0F2952]", "text-white");
  renderStaff(wing);
}

function renderHolidays() {
  const body = document.getElementById("holidaysBody");
  if (!body) return;
  body.innerHTML = (schoolData.holidays || []).map(h => `
    <tr class="border-b hover:bg-slate-50">
      <td class="p-2.5 font-bold text-[#0F2952]">${h.date}</td>
      <td class="p-2.5 text-slate-500">${h.day}</td>
      <td class="p-2.5 font-semibold">${h.name}</td>
      <td class="p-2.5"><span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${h.type === 'National' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">${h.type}</span></td>
    </tr>
  `).join("");
}
function switchPortalTab(tab) {
  document.getElementById("portalErrorBox").classList.add("hidden");
  document.getElementById("marksheetOutput").classList.add("hidden");
  document.getElementById("tcOutput").classList.add("hidden");

  if (tab === "result") {
    document.getElementById("resultSearchForm").classList.remove("hidden");
    document.getElementById("tcSearchForm").classList.add("hidden");
    document.getElementById("tabResultBtn").className = "bg-[#0F2952] text-white font-bold text-xs px-4 py-2 rounded-xl";
    document.getElementById("tabTcBtn").className = "bg-slate-100 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl";
  } else {
    document.getElementById("resultSearchForm").classList.add("hidden");
    document.getElementById("tcSearchForm").classList.remove("hidden");
    document.getElementById("tabTcBtn").className = "bg-[#0F2952] text-white font-bold text-xs px-4 py-2 rounded-xl";
    document.getElementById("tabResultBtn").className = "bg-slate-100 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl";
  }
}

document.getElementById("resultSearchForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = document.getElementById("searchQueryInput").value.trim().toLowerCase();
  const dob = document.getElementById("searchDobInput").value;
  const errBox = document.getElementById("portalErrorBox");
  errBox.classList.add("hidden");

  const allRes = [...cloudResults, ...(schoolData.results || [])];
  const found = allRes.find(r =>
    (r.roll.toLowerCase() === q || r.name.toLowerCase().includes(q)) && (!dob || r.dob === dob)
  );

  if (!found) {
    errBox.innerText = "❌ Koi result nahi mila! Kripya sahi Roll Number ya Student Name daalein.";
    errBox.classList.remove("hidden");
    document.getElementById("marksheetOutput").classList.add("hidden");
    return;
  }

  document.getElementById("msExamTitle").innerText = found.examTitle || "ANNUAL PROGRESS REPORT 2026–27";
  document.getElementById("msRoll").innerText = found.roll;
  document.getElementById("msClass").innerText = found.className;
  document.getElementById("msDob").innerText = found.dob || "-";
  document.getElementById("msName").innerText = found.name;
  document.getElementById("msAttendance").innerText = found.attendance || "95%";
  document.getElementById("msFather").innerText = found.fatherName || "-";
  document.getElementById("msMother").innerText = found.motherName || "-";
  document.getElementById("msStudentPhoto").src = found.photo || "https://via.placeholder.com/80x95?text=Student";

  let totalMax = 0, totalObt = 0;
  document.getElementById("msSubjectsBody").innerHTML = found.subjects.map(sub => {
    const subTot = Number(sub.theory) + Number(sub.practical);
    totalMax += Number(sub.max);
    totalObt += subTot;
    const gr = subTot >= 90 ? "A+" : subTot >= 75 ? "A" : subTot >= 60 ? "B" : subTot >= 45 ? "C" : subTot >= 33 ? "D" : "F";
    return `<tr><td class="border p-2 font-bold">${sub.name}</td><td class="border p-2 text-center">${sub.max}</td><td class="border p-2 text-center">${sub.theory}</td><td class="border p-2 text-center">${sub.practical}</td><td class="border p-2 text-center font-bold">${subTot}</td><td class="border p-2 text-center font-bold text-[#0F2952]">${gr}</td></tr>`;
  }).join("");

  const pct = ((totalObt / totalMax) * 100).toFixed(2);
  document.getElementById("msGrandTotal").innerText = `${totalObt} / ${totalMax}`;
  document.getElementById("msPercentage").innerText = `${pct}%`;
  document.getElementById("msStatus").innerText = pct >= 33 ? "PASSED" : "SUPPLEMENTARY";
  document.getElementById("msQrImg").src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(`SDR-BASARI|Roll:${found.roll}|Name:${found.name}\vert{}Pct:${pct}%`)}`;

  document.getElementById("marksheetOutput").classList.remove("hidden");
  document.getElementById("marksheetOutput").scrollIntoView({ behavior: "smooth" });
});

function downloadMarksheetPDF() {
  const el = document.getElementById("printableMarksheet");
  const roll = document.getElementById("msRoll").innerText;
  html2pdf().set({ margin: 0.3, filename: `SDR_Marksheet_${roll}.pdf`, jsPDF: { unit: "in", format: "a4", orientation: "portrait" } }).from(el).save();
}

document.getElementById("tcSearchForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const tcNo = document.getElementById("tcNumberInput").value.trim().toUpperCase();
  const found = (schoolData.tcs || []).find(t => t.tcNo.toUpperCase() === tcNo);
  const errBox = document.getElementById("portalErrorBox");
  errBox.classList.add("hidden");

  if (!found) {
    
