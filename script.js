// =========================================================
// SDR MEMORIAL PUBLIC HIGH SCHOOL, BASARI - PUBLIC SCRIPT.JS
// =========================================================

const firebaseConfig = {
  apiKey: "AIzaSyAKIF5CrQYNErK6Qefj7vAm2jNTwKbpVvE",
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

let currentLang = "en";

let portalData = {
  noticeEn: "📢 Admissions Open for Session 2026–27 (Nursery to Class 10th) • 🎓 Digital PDF Marksheets & Live Application Tracking now available • 🚌 Safe School Van facility for Basari & nearby villages.",
  noticeHi: "📢 सत्र 2026-27 के लिए प्रवेश प्रारंभ (नर्सरी से कक्षा 10वीं तक) • 🎓 डिजिटल PDF मार्कशीट एवं एडमिशन स्टेटस ट्रैकिंग अब ऑनलाइन उपलब्ध • 🚌 बसारी एवं आसपास के गाँवों के लिए सुरक्षित वैन सुविधा।",
  stats: { alumni: "2,450+", admissions: "148", students: "520+", teachers: "22" },
  homework: [
    { className: "Class 10th", subject: "Mathematics", work: "Solve Exercise 4.2 Quadratic Equations (Q1 to Q6) in fair notebook.", teacher: "Mr. R.K. Sharma", date: "Today" },
    { className: "Class 8th", subject: "Science", work: "Draw neat labeled diagram of Plant Cell & Animal Cell and learn 5 differences.", teacher: "Ms. Priya Tiwari", date: "Today" },
    { className: "Class 5th", subject: "English", work: "Write 10 lines essay on 'My School' and learn Chapter 3 word meanings.", teacher: "Mrs. Sunita Verma", date: "Today" }
  ],
  vanRoutes: [
    { vanNo: "Van 01 (MP-16-T-4412)", route: "Basari Main Market → Rajnagar Tiraha → School Campus", timing: "7:30 AM", driver: "Ramesh Yadav", phone: "9988110081" },
    { vanNo: "Van 02 (MP-16-T-5820)", route: "Khajuraho Road → Bamitha Mod → School Campus", timing: "7:20 AM", driver: "Suresh Kushwaha", phone: "9988110082" },
    { vanNo: "Van 03 (MP-16-T-6190)", route: "Chandranagar → Beniganj → Basari → School Campus", timing: "7:15 AM", driver: "Mahesh Patel", phone: "9988110083" }
  ],
  gallery: [
    { title: "Annual Function & Cultural Fest", category: "Events", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800" },
    { title: "Smart Classroom & Digital Learning", category: "Campus", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800" },
    { title: "Independence Day Parade & Celebration", category: "Events", url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800" }
  ],
  toppers: [
    { name: "Ananya Chaturvedi", className: "Class 10th (MP Board)", percent: "96.4%", rank: "1st Rank • District Merit" },
    { name: "Rohan Singh Bundela", className: "Class 10th (MP Board)", percent: "94.8%", rank: "2nd Rank • School Topper" },
    { name: "Kavya Tiwari", className: "Class 8th", percent: "95.2%", rank: "1st Rank • Class Topper" },
    { name: "Devansh Patel", className: "Class 5th", percent: "97.0%", rank: "1st Rank • Junior Wing" }
  ],
  teachers: [
    { name: "Mr. R.K. Sharma", role: "Principal • M.Sc., B.Ed.", exp: "16 Years Exp." },
    { name: "Mrs. Sunita Verma", role: "Senior English & Social Science • M.A., B.Ed.", exp: "11 Years Exp." },
    { name: "Ms. Priya Tiwari", role: "Science & Computer Faculty • B.Sc., D.El.Ed.", exp: "7 Years Exp." },
    { name: "Mr. Amit Dubey", role: "Hindi & Sanskrit Senior Teacher • M.A., B.Ed.", exp: "10 Years Exp." }
  ],
  holidays: [
    { date: "15 Aug 2026", day: "Saturday", name: "Independence Day Celebration", type: "National" },
    { date: "02 Oct 2026", day: "Friday", name: "Gandhi Jayanti", type: "National" },
    { date: "07–12 Nov 2026", day: "Sat–Thu", name: "Diwali Vacation", type: "Festival" },
    { date: "26 Jan 2027", day: "Tuesday", name: "Republic Day Celebration", type: "National" }
  ],
  results: [
    {
      roll: "101",
      dob: "2012-05-14",
      name: "Aarav Singh",
      fatherName: "Rajesh Singh",
      motherName: "Sunita Devi",
      className: "Class 8th",
      examTitle: "Annual Examination 2026",
      attendance: "94%",
      subjects: [
        { name: "Hindi", max: 100, theory: 68, practical: 18 },
        { name: "English", max: 100, theory: 64, practical: 19 },
        { name: "Mathematics", max: 100, theory: 72, practical: 20 },
        { name: "Science", max: 100, theory: 66, practical: 19 },
        { name: "Social Science", max: 100, theory: 70, practical: 18 }
      ]
    }
  ],
  tcs: [
    { tcNo: "SDR/TC/2026/089", studentName: "Mohit Kushwaha", fatherName: "Harishankar Kushwaha", classLeft: "Class 8th Passed", issueDate: "12 July 2026", status: "Verified & Genuine" }
  ]
};
// 1. LANGUAGE TOGGLE (HINDI / ENGLISH)
function toggleLanguage() {
  currentLang = currentLang === "en" ? "hi" : "en";
  const btnText = document.getElementById("langBtnText");
  if (btnText) btnText.textContent = currentLang === "en" ? "हिंदी" : "English";

  document.querySelectorAll("[data-en]").forEach((el) => {
    const val = el.getAttribute(currentLang === "hi" ? "data-hi" : "data-en");
    if (val) el.textContent = val;
  });

  const ticker = document.getElementById("liveNoticeTicker");
  if (ticker) {
    ticker.textContent = currentLang === "hi" ? (portalData.noticeHi || portalData.noticeEn) : portalData.noticeEn;
  }
}

// 2. MOBILE MENU
function toggleMobileMenu() {
  const m = document.getElementById("mobileMenu");
  if (m) m.classList.toggle("hidden");
}
function closeMobileMenu() {
  const m = document.getElementById("mobileMenu");
  if (m) m.classList.add("hidden");
}

// 3. RENDER ALL PUBLIC SECTIONS
function renderAllPublicSections() {
  if (portalData.stats) {
    const setTxt = (id, v) => { const el = document.getElementById(id); if (el && v) el.textContent = v; };
    setTxt("statAlumni", portalData.stats.alumni);
    setTxt("statNewAdmissions", portalData.stats.admissions);
    setTxt("statCurrentStudents", portalData.stats.students);
    setTxt("statTeachers", portalData.stats.teachers);
  }

  const ticker = document.getElementById("liveNoticeTicker");
  if (ticker && portalData.noticeEn) {
    ticker.textContent = currentLang === "hi" ? (portalData.noticeHi || portalData.noticeEn) : portalData.noticeEn;
  }

  renderPublicHomework();
  renderPublicVanRoutes();
  renderPublicGallery("All");
  renderPublicToppers();
  renderPublicTeachers();
  renderPublicHolidays();
}

function renderPublicHomework() {
  const grid = document.getElementById("publicHomeworkGrid");
  if (!grid) return;
  const filter = document.getElementById("publicHomeworkClassFilter")?.value || "All";
  const list = (portalData.homework || []).filter(h => filter === "All" || h.className === filter);

  if (!list.length) {
    grid.innerHTML = `<div class="col-span-full bg-white/10 rounded-2xl p-4 text-center text-amber-200">No homework uploaded for ${filter} today.</div>`;
    return;
  }

  grid.innerHTML = list.map(h => `
    <div class="bg-white/10 border border-white/15 rounded-2xl p-4 space-y-2 hover-lift">
      <div class="flex justify-between items-center">
        <span class="bg-amber-400 text-[#08152B] font-extrabold px-2.5 py-0.5 rounded-lg text-[11px]">${h.className}</span>
        <span class="text-amber-300 font-bold text-[11px]">${h.subject}</span>
      </div>
      <p class="text-slate-100 leading-relaxed">${h.work}</p>
      <p class="text-[11px] text-slate-300 pt-1 border-t border-white/10">👨‍🏫 ${h.teacher || "Class Teacher"} • ${h.date || "Today"}</p>
    </div>
  `).join("");
}

function renderPublicVanRoutes() {
  const grid = document.getElementById("publicVanRoutesGrid");
  if (!grid) return;
  grid.innerHTML = (portalData.vanRoutes || []).map(v => `
    <div class="bg-slate-50 border rounded-2xl p-4 space-y-1.5 hover-lift">
      <div class="flex justify-between items-center">
        <span class="font-extrabold text-[#0F2952]">🚌 ${v.vanNo}</span>
        <span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">⏰ ${v.timing}</span>
      </div>
      <p class="text-slate-600 font-medium">${v.route}</p>
      <div class="pt-1 flex justify-between items-center text-[11px]">
        <span class="font-bold text-slate-700">Driver: ${v.driver}</span>
        <a href="tel:+91${v.phone}" class="text-emerald-700 font-extrabold hover:underline">📞 Call</a>
      </div>
    </div>
  `).join("");
}
function renderPublicGallery(cat) {
  const grid = document.getElementById("publicGalleryGrid");
  if (!grid) return;
  const list = (portalData.gallery || []).filter(g => cat === "All" || g.category === cat);
  grid.innerHTML = list.map(g => `
    <div class="bg-white rounded-2xl overflow-hidden border shadow-sm hover-lift group">
      <div class="h-48 overflow-hidden bg-slate-200">
        <img src="${g.url}" alt="${g.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      </div>
      <div class="p-3.5 flex justify-between items-center">
        <h4 class="font-extrabold text-[#0F2952] text-xs">${g.title}</h4>
        <span class="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">${g.category}</span>
      </div>
    </div>
  `).join("");
}
function filterGallery(cat) { renderPublicGallery(cat); }

function renderPublicToppers() {
  const grid = document.getElementById("publicToppersGrid");
  if (!grid) return;
  grid.innerHTML = (portalData.toppers || []).map(t => `
    <div class="bg-white rounded-2xl p-4 border shadow-sm text-center space-y-2 hover-lift">
      <div class="w-14 h-14 rounded-full bg-amber-100 text-amber-700 font-extrabold text-lg mx-auto flex items-center justify-center border-2 border-amber-400">🏆</div>
      <h4 class="font-extrabold text-[#0F2952] text-sm">${t.name}</h4>
      <p class="text-xs text-slate-500 font-semibold">${t.className}</p>
      <p class="text-xl font-extrabold text-emerald-700">${t.percent}</p>
      <span class="inline-block bg-[#0F2952] text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">${t.rank}</span>
    </div>
  `).join("");
}

function renderPublicTeachers() {
  const grid = document.getElementById("publicTeachersGrid");
  if (!grid) return;
  grid.innerHTML = (portalData.teachers || []).map(t => `
    <div class="bg-white rounded-2xl p-4 border shadow-sm flex items-center gap-3 hover-lift">
      <div class="w-12 h-12 rounded-2xl bg-[#0F2952] text-amber-300 font-extrabold flex items-center justify-center text-base shrink-0">
        ${t.name.replace(/Mr\.|Mrs\.|Ms\./g, "").trim().charAt(0)}
      </div>
      <div class="min-w-0">
        <h4 class="font-extrabold text-[#0F2952] text-xs truncate">${t.name}</h4>
        <p class="text-[11px] text-slate-600 line-clamp-2">${t.role}</p>
        <span class="text-[10px] font-bold text-amber-700">${t.exp || ""}</span>
      </div>
    </div>
  `).join("");
}

function renderPublicHolidays() {
  const grid = document.getElementById("publicHolidaysGrid");
  if (!grid) return;
  grid.innerHTML = (portalData.holidays || []).map(h => `
    <div class="bg-slate-50 border rounded-2xl p-3.5 space-y-1">
      <div class="flex justify-between items-center">
        <span class="font-extrabold text-[#0F2952]">${h.date}</span>
        <span class="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">${h.type}</span>
      </div>
      <p class="font-bold text-slate-700">${h.name}</p>
      <p class="text-[11px] text-slate-500">${h.day}</p>
    </div>
  `).join("");
}

// 4. PORTAL TABS & MARKSHEET PDF
function switchPortalTab(tab) {
  const resBox = document.getElementById("portalResultBox");
  const tcBox = document.getElementById("portalTcBox");
  const btnRes = document.getElementById("btnTabResult");
  const btnTc = document.getElementById("btnTabTC");
  if (tab === "result") {
    resBox.classList.remove("hidden");
    tcBox.classList.add("hidden");
    btnRes.className = "px-3.5 py-2 rounded-xl bg-[#0F2952] text-white cursor-pointer";
    btnTc.className = "px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 cursor-pointer";
  } else {
    tcBox.classList.remove("hidden");
    resBox.classList.add("hidden");
    btnTc.className = "px-3.5 py-2 rounded-xl bg-[#0F2952] text-white cursor-pointer";
    btnRes.className = "px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 cursor-pointer";
  }
}

async function searchMarksheet() {
  const roll = document.getElementById("resRollInput").value.trim();
  const dob = document.getElementById("resDobInput").value.trim();
  if (!roll || !dob) return alert("Please enter both Roll Number and Date of Birth!");

  let found = (portalData.results || []).find(r => String(r.roll).trim() === roll && String(r.dob).trim() === dob);

  if (!found) {
    try {
      const doc = await db.collection("sdr_results").doc(roll).get();
      if (doc.exists && doc.data().dob === dob) found = doc.data();
    } catch (e) {}
  }

  if (!found) return alert("No marksheet found for Roll No: " + roll + " with this DOB.");

  let grandMax = 0, grandObt = 0;
  const rowsHtml = (found.subjects || []).map((s, idx) => {
    const tot = Number(s.theory || 0) + Number(s.practical || 0);
    const max = Number(s.max || 100);
    grandMax += max;
    grandObt += tot;
    return `
      <tr class="border-b">
        <td class="p-2 font-bold">${idx + 1}</td>
        <td class="p-2 font-bold text-[#0F2952]">${s.name}</td>
        <td class="p-2 text-center">${max}</td>
        <td class="p-2 text-center">${s.theory}</td>
        <td class="p-2 text-center">${s.practical}</td>
        <td class="p-2 text-center font-extrabold text-emerald-700">${tot}</td>
      </tr>
    `;
  }).join("");

  const percent = grandMax ? ((grandObt / grandMax) * 100).toFixed(2) : "0.00";
  const grade = percent >= 85 ? "A+ (Distinction)" : percent >= 70 ? "A (First Division)" : percent >= 50 ? "B (Second Division)" : "C (Pass)";

  document.getElementById("msQrBox").innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent("SDR-VERIFIED:" + found.roll + "-" + found.name + "-" + percent + "%")}" alt="QR" class="w-full h-full object-contain" />`;

  document.getElementById("msBodyContent").innerHTML = `
    <div class="text-center bg-[#0F2952] text-amber-300 font-extrabold py-1.5 rounded-lg uppercase tracking-wider">
      ${found.examTitle || "ANNUAL EXAMINATION MARKSHEET"}
    </div>
    <div class="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border text-xs">
      <p><b>Student Name:</b> ${found.name}</p>
      <p><b>Roll Number:</b> ${found.roll}</p>
      <p><b>Father's Name:</b> ${found.fatherName}</p>
      <p><b>Class:</b> ${found.className}</p>
      <p><b>Mother's Name:</b> ${found.motherName || "-"}</p>
      <p><b>Date of Birth:</b> ${found.dob}</p>
    </div>
    <table class="w-full border text-xs">
      <thead class="bg-slate-100 font-extrabold text-[#0F2952]">
        <tr>
          <th class="p-2 text-left">#</th>
          <th class="p-2 text-left">Subject</th>
          <th class="p-2 text-center">Max</th>
          <th class="p-2 text-center">Theory</th>
          <th class="p-2 text-center">Prac/Proj</th>
          <th class="p-2 text-center">Total</th>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
      <tfoot class="bg-amber-50 font-extrabold text-[#0F2952]">
        <tr>
          <td colspan="2" class="p-2">GRAND TOTAL</td>
          <td class="p-2 text-center">${grandMax}</td>
          <td colspan="2" class="p-2 text-center">Percentage: ${percent}%</td>
          <td class="p-2 text-center text-emerald-700">${grandObt}</td>
        </tr>
      </tfoot>
    </table>
    <div class="flex justify-between items-center pt-2 text-xs font-bold">
      <p>Result Status: <span class="text-emerald-700 font-extrabold">PASSED (${grade})</span></p>
      <p>Attendance: ${found.attendance || "92%"}</p>
    </div>
    <div class="flex justify-between items-end pt-8 text-[11px] font-bold text-slate-600">
      <span>Class Teacher Sign</span>
      <span>Parent Sign</span>
      <span class="text-[#0F2952] font-extrabold">Principal Seal & Sign</span>
    </div>
  `;

  document.getElementById("marksheetOutputWrap").classList.remove("hidden");
}
function downloadMarksheetPDF() {
  const el = document.getElementById("printableMarksheet");
  const roll = document.getElementById("resRollInput").value.trim() || "Student";
  html2pdf().set({
    margin: 8,
    filename: `SDR_Marksheet_Roll_${roll}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  }).from(el).save();
}

// 5. TC VERIFICATION
function verifyTcNumber() {
  const tcNo = document.getElementById("tcNumberInput").value.trim().toUpperCase();
  const out = document.getElementById("tcResultOutput");
  if (!tcNo) return alert("Enter TC Number first!");
  const match = (portalData.tcs || []).find(t => String(t.tcNo).toUpperCase() === tcNo);
  if (!match) {
    out.innerHTML = `<div class="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-bold">❌ No Transfer Certificate found with number <b>${tcNo}</b>. Contact School Office.</div>`;
    return;
  }
  out.innerHTML = `
    <div class="bg-emerald-50 border-2 border-emerald-400 p-4 rounded-2xl text-xs space-y-1.5">
      <p class="text-emerald-800 font-extrabold text-sm">✅ GENUINE TRANSFER CERTIFICATE VERIFIED</p>
      <p><b>TC Number:</b> ${match.tcNo}</p>
      <p><b>Student Name:</b> ${match.studentName} (S/o ${match.fatherName})</p>
      <p><b>Class Left:</b> ${match.classLeft} • <b>Issue Date:</b> ${match.issueDate}</p>
    </div>
  `;
}

// 6. ONLINE ADMISSION MODAL (PENDING-TO-APPROVE)
function openAdmissionModal() {
  document.getElementById("admissionForm").classList.remove("hidden");
  document.getElementById("admissionSuccessBox").classList.add("hidden");
  document.getElementById("admissionModal").classList.remove("hidden");
}
function closeAdmissionModal() {
  document.getElementById("admissionModal").classList.add("hidden");
}

async function submitOnlineAdmission(e) {
  e.preventDefault();
  const btn = document.getElementById("admSubmitBtn");
  btn.disabled = true;
  btn.textContent = "⏳ Submitting Application...";

  const appId = "SDR-2026-" + Math.floor(1000 + Math.random() * 9000);
  const payload = {
    appId,
    studentName: document.getElementById("admStudentName").value.trim(),
    fatherName: document.getElementById("admFatherName").value.trim(),
    className: document.getElementById("admClass").value,
    dob: document.getElementById("admDob").value,
    phone: document.getElementById("admPhone").value.trim(),
    medium: document.getElementById("admMedium").value,
    address: document.getElementById("admAddress").value.trim(),
    status: "Pending Verification",
    submittedAt: new Date().toLocaleDateString("en-IN")
  };

  try {
    await db.collection("sdr_admissions").doc(appId).set(payload);
    document.getElementById("admissionForm").classList.add("hidden");
    const box = document.getElementById("admissionSuccessBox");
    box.classList.remove("hidden");
    const waMsg = encodeURIComponent(`Hello SDR Memorial School Basari, I have applied for Online Admission.\nApplication ID: ${appId}\nStudent: ${payload.studentName}\nClass: ${payload.className}\nFather: ${payload.fatherName}`);
    box.innerHTML = `
      <div class="w-14 h-14 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center text-2xl">⏳</div>
      <h4 class="text-lg font-extrabold text-[#0F2952]">Application Submitted!</h4>
      <p class="text-xs text-slate-600">Status: <span class="bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded">Pending Admin Verification</span></p>
      <div class="bg-slate-100 p-3 rounded-xl font-extrabold text-sm text-[#0F2952]">Application ID: ${appId}</div>
      <p class="text-[11px] text-slate-500">Save this ID to track approval status anytime on our website.</p>
      <a href="https://wa.me/919988110080?text=${waMsg}" target="_blank" class="inline-block w-full bg-emerald-600 text-white font-extrabold py-2.5 rounded-xl text-xs">📲 Notify School Office on WhatsApp</a>
    `;
    e.target.reset();
  } catch (err) {
    alert("Error submitting form: " + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "✅ Submit Application (Pending Approval)";
  }
}

// 7. LIVE ADMISSION STATUS TRACKER
function openStatusModal() {
  document.getElementById("trackResultBox").innerHTML = "";
  document.getElementById("statusModal").classList.remove("hidden");
}
function closeStatusModal() {
  document.getElementById("statusModal").classList.add("hidden");
}

async function checkAdmissionStatus() {
  const q = document.getElementById("trackInput").value.trim();
  const out = document.getElementById("trackResultBox");
  if (!q) return alert("Enter Application ID or Mobile Number!");
  out.innerHTML = `<p class="text-slate-500">Checking live database...</p>`;

  try {
    let found = null;
    const byId = await db.collection("sdr_admissions").doc(q.toUpperCase()).get();
    if (byId.exists) found = byId.data();
    if (!found) {
      const snap = await db.collection("sdr_admissions").where("phone", "==", q).limit(1).get();
      if (!snap.empty) found = snap.docs[0].data();
    }

    if (!found) {
      out.innerHTML = `<div class="bg-rose-50 text-rose-700 p-3 rounded-xl font-bold">❌ No application found for "${q}".</div>`;
      return;
    }

    const badgeColor = found.status === "Approved" ? "bg-emerald-100 text-emerald-800" : found.status === "Rejected" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800";
    out.innerHTML = `
      <div class="bg-slate-50 border rounded-2xl p-3.5 space-y-1.5">
        <div class="flex justify-between items-center">
          <span class="font-extrabold text-[#0F2952]">${found.appId}</span>
          <span class="${badgeColor} font-extrabold px-2.5 py-0.5 rounded-full text-[11px]">${found.status}</span>
        </div>
        <p><b>Student:</b> ${found.studentName} (${found.className})</p>
        <p><b>Father:</b> ${found.fatherName}</p>
        <p class="text-[11px] text-slate-500">${found.status === "Approved" ? "🎉 Admission Approved! Visit school with documents." : "⏳ Under review by School Admin."}</p>
      </div>
    `;
  } catch (err) {
    out.innerHTML = `<p class="text-rose-600">Error: ${err.message}</p>`;
  }
}

// 8. REAL-TIME FIREBASE SYNC ON LOAD
document.addEventListener("DOMContentLoaded", () => {
  renderAllPublicSections();

  db.collection("sdr_portal").doc("main_data").onSnapshot((doc) => {
    if (doc.exists) {
      portalData = { ...portalData, ...doc.data() };
      renderAllPublicSections();
    }
  }, (err) => {
    console.log("Using default portal data:", err.message);
  });
});
