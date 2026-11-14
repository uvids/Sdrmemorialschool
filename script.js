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

let currentLang = "hi";

let portalData = {
  noticeEn: "📢 Admissions Open for Session 2026–27 (Nursery to Class 10th) • 🎓 Digital PDF Marksheets & Live Application Tracking now available • 🚌 Safe School Van facility for Basari & nearby villages.",
  noticeHi: "📢 सत्र 2026-27 के लिए प्रवेश प्रारंभ (नर्सरी से कक्षा 10वीं तक) • 🎓 डिजिटल PDF मार्कशीट एवं एडमिशन स्टेटस ट्रैकिंग अब ऑनलाइन उपलब्ध • 🚌 बसारी एवं आसपास के गाँवों के लिए सुरक्षित वैन सुविधा।",
  stats: { alumni: "2,450+", admissions: "148", students: "520+", teachers: "22" },
  homework: [
    { className: "Class 10th", subject: "गणित (Mathematics)", work: "अध्याय 4.2 द्विघात समीकरण (प्रश्न 1 से 6) फेयर कॉपी में हल करें।", teacher: "Mr. R.K. Sharma", date: "आज" },
    { className: "Class 8th", subject: "विज्ञान (Science)", work: "पादप कोशिका एवं जंतु कोशिका का नामांकित चित्र बनाएं और 5 अंतर याद करें।", teacher: "Ms. Priya Tiwari", date: "आज" },
    { className: "Class 5th", subject: "अंग्रेजी (English)", work: "'My School' पर 10 लाइन निबंध लिखें और अध्याय 3 के शब्दार्थ याद करें।", teacher: "Mrs. Sunita Verma", date: "आज" }
  ],
  vanRoutes: [
    { vanNo: "वैन 01 (MP-16-T-4412)", route: "बसारी मुख्य बाज़ार → राजनगर तिराहा → विद्यालय परिसर", timing: "7:30 AM", driver: "रमेश यादव", phone: "9988110081" },
    { vanNo: "वैन 02 (MP-16-T-5820)", route: "खजुराहो रोड → बमीठा मोड़ → विद्यालय परिसर", timing: "7:20 AM", driver: "सुरेश कुशवाहा", phone: "9988110082" },
    { vanNo: "वैन 03 (MP-16-T-6190)", route: "चंद्रनगर → बेनीगंज → बसारी → विद्यालय परिसर", timing: "7:15 AM", driver: "महेश पटेल", phone: "9988110083" }
  ],
  gallery: [
    { title: "वार्षिक उत्सव एवं सांस्कृतिक कार्यक्रम", category: "Events", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800" },
    { title: "स्मार्ट क्लासरूम एवं डिजिटल शिक्षा", category: "Campus", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800" },
    { title: "स्वतंत्रता दिवस समारोह एवं परेड", category: "Events", url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800" }
  ],
  toppers: [
    { name: "अनन्या चतुर्वेदी", className: "कक्षा 10वीं (एमपी बोर्ड)", percent: "96.4%", rank: "प्रथम स्थान • जिला मेरिट" },
    { name: "रोहन सिंह बुंदेला", className: "कक्षा 10वीं (एमपी बोर्ड)", percent: "94.8%", rank: "द्वितीय स्थान • स्कूल टॉपर" },
    { name: "काव्या तिवारी", className: "कक्षा 8वीं", percent: "95.2%", rank: "प्रथम स्थान • कक्षा टॉपर" },
    { name: "देवांश पटेल", className: "कक्षा 5वीं", percent: "97.0%", rank: "प्रथम स्थान • जूनियर विंग" }
  ],
  teachers: [
    { name: "Mr. R.K. Sharma", role: "प्राचार्य • M.Sc., B.Ed.", exp: "16 वर्षों का अनुभव" },
    { name: "Mrs. Sunita Verma", role: "वरिष्ठ अंग्रेजी एवं सामाजिक विज्ञान • M.A., B.Ed.", exp: "11 वर्षों का अनुभव" },
    { name: "Ms. Priya Tiwari", role: "विज्ञान एवं कंप्यूटर शिक्षिका • B.Sc., D.El.Ed.", exp: "7 वर्षों का अनुभव" },
    { name: "Mr. Amit Dubey", role: "हिंदी एवं संस्कृत वरिष्ठ शिक्षक • M.A., B.Ed.", exp: "10 वर्षों का अनुभव" }
  ],
  holidays: [
    { date: "15 अगस्त 2026", day: "शनिवार", name: "स्वतंत्रता दिवस समारोह", type: "राष्ट्रीय" },
    { date: "02 अक्टूबर 2026", day: "शुक्रवार", name: "गांधी जयंती", type: "राष्ट्रीय" },
    { date: "07–12 नवम्बर 2026", day: "शनि–गुरु", name: "दीपावली अवकाश", type: "त्योहार" },
    { date: "26 जनवरी 2027", day: "मंगलवार", name: "गणतंत्र दिवस समारोह", type: "राष्ट्रीय" }
  ],
  results: [
    {
      roll: "101", dob: "2012-05-14", name: "Aarav Singh", fatherName: "Rajesh Singh", motherName: "Sunita Devi",
      className: "Class 8th", examTitle: "Annual Examination 2026", attendance: "94%",
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
// 1. LANGUAGE TOGGLE (DEFAULT HINDI + ENGLISH SWITCH)
function applyLanguage(lang) {
  currentLang = lang;
  const btnText = document.getElementById("langBtnText");
  if (btnText) btnText.textContent = currentLang === "hi" ? "English" : "हिंदी";

  document.querySelectorAll("[data-en]").forEach((el) => {
    const val = el.getAttribute(currentLang === "hi" ? "data-hi" : "data-en");
    if (val) el.textContent = val;
  });

  document.querySelectorAll("[data-ph-en]").forEach((el) => {
    const ph = el.getAttribute(currentLang === "hi" ? "data-ph-hi" : "data-ph-en");
    if (ph) el.setAttribute("placeholder", ph);
  });

  const ticker = document.getElementById("liveNoticeTicker");
  if (ticker) {
    ticker.textContent = currentLang === "hi" ? (portalData.noticeHi || portalData.noticeEn) : portalData.noticeEn;
  }
}

function toggleLanguage() {
  applyLanguage(currentLang === "hi" ? "en" : "hi");
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

  renderDailyShubhVichar();
  renderPublicHomework();
  renderPublicVanRoutes();
  renderPublicGallery("All");
  renderPublicToppers();
  renderPublicTeachers();
  renderPublicHolidays();
  applyLanguage(currentLang);
}

function renderPublicHomework() {
  const grid = document.getElementById("publicHomeworkGrid");
  if (!grid) return;
  const filter = document.getElementById("publicHomeworkClassFilter")?.value || "All";
  const list = (portalData.homework || []).filter(h => filter === "All" || h.className === filter);

  if (!list.length) {
    grid.innerHTML = `<div class="col-span-full bg-white/10 rounded-2xl p-4 text-center text-amber-200">आज इस कक्षा का कोई होमवर्क अपलोड नहीं हुआ है।</div>`;
    return;
  }

  grid.innerHTML = list.map(h => `
    <div class="bg-white/10 border border-white/15 rounded-2xl p-4 space-y-2 hover-lift">
      <div class="flex justify-between items-center">
        <span class="bg-amber-400 text-[#08152B] font-extrabold px-2.5 py-0.5 rounded-lg text-[11px]">${h.className}</span>
        <span class="text-amber-300 font-bold text-[11px]">${h.subject}</span>
      </div>
      <p class="text-slate-100 leading-relaxed">${h.work}</p>
      <p class="text-[11px] text-slate-300 pt-1 border-t border-white/10">👨‍🏫 ${h.teacher || "कक्षा शिक्षक"} • ${h.date || "आज"}</p>
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
        <span class="font-bold text-slate-700">ड्राइवर: ${v.driver}</span>
        <a href="tel:+91${v.phone}" class="text-emerald-700 font-extrabold hover:underline">📞 कॉल करें</a>
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
// 4. MARKSHEET PDF SEARCH & DOWNLOAD
async function searchMarksheet() {
  const roll = document.getElementById("resRollInput").value.trim();
  const dob = document.getElementById("resDobInput").value.trim();
  if (!roll || !dob) return alert("कृपया रोल नंबर और जन्म तिथि दोनों दर्ज करें!");

  let found = (portalData.results || []).find(r => String(r.roll).trim() === roll && String(r.dob).trim() === dob);

  if (!found) {
    try {
      const doc = await db.collection("sdr_results").doc(roll).get();
      if (doc.exists && doc.data().dob === dob) found = doc.data();
    } catch (e) {}
  }

  if (!found) return alert("रोल नंबर " + roll + " के लिए कोई मार्कशीट नहीं मिली।");

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
  if (!tcNo) return alert("कृपया TC नंबर दर्ज करें!");
  const match = (portalData.tcs || []).find(t => String(t.tcNo).toUpperCase() === tcNo);
  if (!match) {
    out.innerHTML = `<div class="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-bold">❌ TC नंबर <b>${tcNo}</b> का कोई रिकॉर्ड नहीं मिला। विद्यालय कार्यालय में संपर्क करें।</div>`;
    return;
  }
  out.innerHTML = `
    <div class="bg-emerald-50 border-2 border-emerald-400 p-4 rounded-2xl text-xs space-y-1.5">
      <p class="text-emerald-800 font-extrabold text-sm">✅ प्रमाणित ट्रांसफर सर्टिफिकेट (TC VERIFIED)</p>
      <p><b>TC नंबर:</b> ${match.tcNo}</p>
      <p><b>छात्र का नाम:</b> ${match.studentName} (पिता: ${match.fatherName})</p>
      <p><b>उत्तीर्ण कक्षा:</b> ${match.classLeft} • <b>जारी दिनांक:</b> ${match.issueDate}</p>
    </div>
  `;
}
// 6. ONLINE ADMISSION & LIVE STATUS TRACKER
function openAdmissionModal() {
  document.getElementById("admissionForm").classList.remove("hidden");
  document.getElementById("admissionSuccessBox").classList.add("hidden");
  document.getElementById("admissionModal").classList.remove("hidden");
}
function closeAdmissionModal() { document.getElementById("admissionModal").classList.add("hidden"); }

async function submitOnlineAdmission(e) {
  e.preventDefault();
  const btn = document.getElementById("admSubmitBtn");
  btn.disabled = true; btn.textContent = "⏳ आवेदन जमा हो रहा है...";
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
    const waMsg = encodeURIComponent(`नमस्ते SDR मेमोरियल स्कूल बसारी, मैंने ऑनलाइन प्रवेश आवेदन किया है।\nApplication ID: ${appId}\nछात्र: ${payload.studentName}\nकक्षा: ${payload.className}\nपिता: ${payload.fatherName}`);
    box.innerHTML = `
      <div class="w-14 h-14 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center text-2xl">⏳</div>
      <h4 class="text-lg font-extrabold text-[#0F2952]">आवेदन सफलतापूर्वक जमा हो गया!</h4>
      <div class="bg-slate-100 p-3 rounded-xl font-extrabold text-sm text-[#0F2952]">Application ID: ${appId}</div>
      <a href="https://wa.me/919988110080?text=${waMsg}" target="_blank" class="inline-block w-full bg-emerald-600 text-white font-extrabold py-2.5 rounded-xl text-xs">📲 व्हाट्सएप पर स्कूल को सूचित करें</a>
    `;
    e.target.reset();
  } catch (err) { alert("त्रुटि: " + err.message); }
  finally { btn.disabled = false; btn.textContent = "✅ आवेदन जमा करें (Submit)"; }
}

function openStatusModal() {
  document.getElementById("trackResultBox").innerHTML = "";
  document.getElementById("statusModal").classList.remove("hidden");
}
function closeStatusModal() { document.getElementById("statusModal").classList.add("hidden"); }

async function checkAdmissionStatus() {
  const q = document.getElementById("trackInput").value.trim();
  const out = document.getElementById("trackResultBox");
  if (!q) return alert("कृपया Application ID या मोबाइल नंबर दर्ज करें!");
  out.innerHTML = `<p class="text-slate-500">खोजा जा रहा है...</p>`;
  try {
    let found = null;
    const byId = await db.collection("sdr_admissions").doc(q.toUpperCase()).get();
    if (byId.exists) found = byId.data();
    if (!found) {
      const snap = await db.collection("sdr_admissions").where("phone", "==", q).limit(1).get();
      if (!snap.empty) found = snap.docs[0].data();
    }
    if (!found) return out.innerHTML = `<div class="bg-rose-50 text-rose-700 p-3 rounded-xl font-bold">❌ कोई आवेदन नहीं मिला।</div>`;
    const badgeColor = found.status === "Approved" ? "bg-emerald-100 text-emerald-800" : found.status === "Rejected" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800";
    out.innerHTML = `
      <div class="bg-slate-50 border rounded-2xl p-3.5 space-y-1.5">
        <div class="flex justify-between items-center">
          <span class="font-extrabold text-[#0F2952]">${found.appId}</span>
          <span class="${badgeColor} font-extrabold px-2.5 py-0.5 rounded-full text-[11px]">${found.status}</span>
        </div>
        <p><b>छात्र:</b> ${found.studentName} (${found.className})</p>
        <p><b>पिता:</b> ${found.fatherName}</p>
      </div>
    `;
  } catch (err) { out.innerHTML = `<p class="text-rose-600">Error: ${err.message}</p>`; }
}

// 7. DAILY SHUBH VICHAR & SPECIAL DAY ENGINE
const specialDaysDB = {
  "11-14": {
    badge: "🎉 आज का विशेष दिवस • बाल दिवस (Children's Day)",
    title: "बाल दिवस: बच्चों के सपनों और संस्कारों को संवारने का दिन",
    article: "आज 14 नवंबर को भारत के प्रथम प्रधानमंत्री पं. जवाहरलाल नेहरू की जयंती पर 'बाल दिवस' मनाया जाता है। बच्चे देश का भविष्य हैं—उन्हें सही शिक्षा, प्रेम, अनुशासन और आत्मविश्वास देकर ही हम सशक्त भारत बना सकते हैं। एसडीआर मेमोरियल पब्लिक हाई स्कूल, बसारी परिवार की ओर से सभी प्यारे बच्चों को बाल दिवस की हार्दिक शुभकामनाएं!",
    quote: "“आज के बच्चे ही कल के भारत का निर्माण करेंगे।” — पं. जवाहरलाल नेहरू"
  },
  "01-26": { badge: "🇮🇳 गणतंत्र दिवस", title: "भारतीय संविधान और लोकतंत्र का गौरवशाली उत्सव", article: "26 जनवरी 1950 को हमारे देश का संविधान लागू हुआ था। यह दिन हमें कर्तव्य और देशप्रेम की याद दिलाता है।", quote: "“सत्यमेव जयते।”" },
  "08-15": { badge: "🇮🇳 स्वतंत्रता दिवस", title: "आज़ादी का अमृत महोत्सव और वीर शहीदों को नमन", article: "15 अगस्त वीर स्वतंत्रता सेनानियों के बलिदान को स्मरण करने का दिन है।", quote: "“स्वराज्य हमारा जन्मसिद्ध अधिकार है।”" },
  "09-05": { badge: "🙏 शिक्षक दिवस", title: "गुरु बिना ज्ञान नहीं: शिक्षकों के सम्मान का पावन दिवस", article: "शिक्षक विद्यार्थी के चरित्र और भविष्य की नींव रखते हैं। सभी गुरुजनों को सादर नमन।", quote: "“शिक्षक समाज का सच्चा निर्माता होता है।”" },
  "10-02": { badge: "🕊️ गांधी एवं शास्त्री जयंती", title: "सत्य, अहिंसा और स्वच्छता का संदेश", article: "गांधी जी और शास्त्री जी के सिद्धांत हर विद्यार्थी का मार्गदर्शन करते हैं।", quote: "“स्वच्छता ही सेवा है।”" }
};

const dailyThoughtsPool = [
  { badge: "✨ आज का शुभ विचार", title: "कठिन परिश्रम और नियमित अभ्यास ही सफलता की असली कुंजी है", article: "जो छात्र रोज़ थोड़ा-थोड़ा अभ्यास करते हैं, वे कठिन से कठिन परीक्षा में भी आसानी से सफलता प्राप्त करते हैं।", quote: "“शिक्षा
    
