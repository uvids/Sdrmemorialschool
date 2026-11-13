// ==================== DEFAULT SCHOOL DATA (FALLBACK & DEMO) ====================
const defaultSchoolData = {
  notice: "📢 सत्र 2026-27 के लिए प्रवेश प्रारंभ (नर्सरी से कक्षा 10वीं तक) • 🎓 अर्द्धवार्षिक एवं टेस्ट परीक्षा परिणाम अब ऑनलाइन उपलब्ध हैं • 🚌 बसरी एवं आसपास के गाँवों के लिए सुरक्षित वाहन सुविधा उपलब्ध।",
  stats: {
    alumni: "2,450+",
    newAdmissions: "148",
    currentStudents: "520+",
    teachers: "22"
  },
  toppers: [
    { rank: 1, name: "Ananya Tiwari", className: "Class 10th", percent: "96.4%", photo: "" },
    { rank: 2, name: "Aarav Singh", className: "Class 10th", percent: "94.8%", photo: "" },
    { rank: 3, name: "Priya Chaurasiya", className: "Class 9th", percent: "93.2%", photo: "" },
    { rank: 4, name: "Rohan Yadav", className: "Class 10th", percent: "91.6%", photo: "" },
    { rank: 5, name: "Kavya Patel", className: "Class 8th", percent: "91.0%", photo: "" },
    { rank: 6, name: "Aditya Sharma", className: "Class 9th", percent: "89.8%", photo: "" },
    { rank: 7, name: "Sneha Kushwaha", className: "Class 10th", percent: "88.5%", photo: "" },
    { rank: 8, name: "Harshvardhan Singh", className: "Class 8th", percent: "87.4%", photo: "" },
    { rank: 9, name: "Nandini Sahu", className: "Class 7th", percent: "86.9%", photo: "" },
    { rank: 10, name: "Devansh Dubey", className: "Class 9th", percent: "86.2%", photo: "" }
  ],
  staff: [
    {
      name: "Mr. R.K. Sharma",
      role: "Principal & Senior Mathematics",
      wing: "High School",
      qualification: "M.Sc. (Maths), B.Ed.",
      since: "2014 (12+ Yrs Exp.)",
      bestSubject: "Class 10th Mathematics • 100% Board Result",
      photo: ""
    },
    {
      name: "Mrs. Sunita Mishra",
      role: "Senior English & Social Science",
      wing: "High School",
      qualification: "M.A. (English), B.Ed.",
      since: "2016 (10+ Yrs Exp.)",
      bestSubject: "English Grammar & Spoken English Specialist",
      photo: ""
    },
    {
      name: "Mr. Arvind Tiwari",
      role: "Science & Lab In-Charge",
      wing: "Middle",
      qualification: "M.Sc. (Physics), B.Ed.",
      since: "2018 (8+ Yrs Exp.)",
      bestSubject: "Science & Practical Experiments (6th–10th)",
      photo: ""
    },
    {
      name: "Ms. Pooja Chaturvedi",
      role: "Hindi & Sanskrit Educator",
      wing: "Middle",
      qualification: "M.A. (Hindi), D.El.Ed.",
      since: "2019 (7+ Yrs Exp.)",
      bestSubject: "Hindi Literature & Cultural Activities",
      photo: ""
    },
    {
      name: "Mr. Deepak Sahu",
      role: "Computer & IT Instructor",
      wing: "Middle",
      qualification: "BCA, PGDCA",
      since: "2020 (6+ Yrs Exp.)",
      bestSubject: "Computer Science & Digital Smart Class",
      photo: ""
    },
    {
      name: "Mrs. Neha Rajput",
      role: "Pre-Primary & Primary Coordinator",
      wing: "Primary",
      qualification: "B.A., D.El.Ed. (Montessori Trained)",
      since: "2017 (9+ Yrs Exp.)",
      bestSubject: "Foundational Literacy & Activity Learning (Nur–5th)",
      photo: ""
    }
  ],
  results: [
    {
      roll: "101",
      dob: "2012-05-15",
      name: "Aarav Singh",
      fatherName: "Rajesh Singh",
      motherName: "Sunita Devi",
      className: "Class 8th",
      examTitle: "ANNUAL EXAMINATION PROGRESS REPORT 2026–27",
      attendance: "196 / 205 Days (95%)",
      subjects: [
        { name: "Hindi (Special)", max: 100, theory: 68, practical: 19 },
        { name: "English (General)", max: 100, theory: 64, practical: 18 },
        { name: "Mathematics", max: 100, theory: 73, practical: 19 },
        { name: "Science", max: 100, theory: 69, practical: 19 },
        { name: "Social Science", max: 100, theory: 66, practical: 18 }
      ]
    },
    {
      roll: "102",
      dob: "2011-08-22",
      name: "Ananya Tiwari",
      fatherName: "Manoj Tiwari",
      motherName: "Rekha Tiwari",
      className: "Class 10th",
      examTitle: "PRE-BOARD EXAMINATION REPORT 2026–27",
      attendance: "200 / 205 Days (97%)",
      subjects: [
        { name: "Hindi", max: 100, theory: 76, practical: 20 },
        { name: "English", max: 100, theory: 75, practical: 19 },
        { name: "Mathematics", max: 100, theory: 78, practical: 20 },
        { name: "Science", max: 100, theory: 75, practical: 20 },
        { name: "Social Science", max: 100, theory: 74, practical: 19 }
      ]
    }
  ],
  tcRecords: [
    {
      tcNo: "TC-2026-01",
      studentName: "Vikram Singh",
      fatherName: "Mahendra Singh",
      lastClass: "Class 8th Passed",
      issueDate: "15-04-2026",
      status: "VERIFIED & GENUINE"
    }
  ]
};
// Load Saved Data from Admin Dashboard (localStorage) or fallback to Default
function getSchoolData() {
  const saved = localStorage.getItem("sdr_school_portal_data");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return defaultSchoolData;
    }
  }
  return defaultSchoolData;
}

const schoolData = getSchoolData();
let currentLang = localStorage.getItem("sdr_lang") || "en";
let latestAdmissionText = "";

// ==================== INITIALIZE PAGE ON LOAD ====================
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById("mobileMenuBtn");
  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
      document.getElementById("mobileMenu").classList.toggle("hidden");
    });
  }

  // Load Dynamic Notice & Stats
  document.getElementById("liveNoticeTicker").innerText = schoolData.notice;
  document.getElementById("statAlumni").innerText = schoolData.stats.alumni;
  document.getElementById("statNewAdmissions").innerText = schoolData.stats.newAdmissions;
  document.getElementById("statCurrentStudents").innerText = schoolData.stats.currentStudents;
  document.getElementById("statTeachers").innerText = schoolData.stats.teachers;

  // Render Toppers & Staff
  renderToppers();
  renderStaff("All");

  // Apply Saved Language
  if (currentLang === "hi") {
    applyLanguage("hi");
  }
});

// ==================== HINDI / ENGLISH LANGUAGE SWITCHER ====================
function toggleLanguage() {
  currentLang = currentLang === "en" ? "hi" : "en";
  localStorage.setItem("sdr_lang", currentLang);
  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  const btnText = document.getElementById("langBtnText");
  btnText.innerText = lang === "en" ? "हिंदी में देखें" : "Switch to English";

  document.querySelectorAll("[data-en]").forEach((el) => {
    el.innerText = lang === "en" ? el.getAttribute("data-en") : el.getAttribute("data-hi");
  });
}

// ==================== RENDER TOP 10 TOPPERS (WALL OF FAME) ====================
function renderToppers() {
  const grid = document.getElementById("toppersGrid");
  if (!grid) return;

  grid.innerHTML = schoolData.toppers
    .map((t) => {
      const isTop3 = t.rank <= 3;
      const badgeColor =
        t.rank === 1
          ? "bg-amber-400 text-[#0F2A4A]"
          : t.rank === 2
          ? "bg-slate-300 text-slate-900"
          : t.rank === 3
          ? "bg-amber-700 text-white"
          : "bg-[#0F2A4A] text-amber-400";

      const avatarHTML = t.photo
        ? `<img src="${t.photo}" alt="${t.name}" class="w-16 h-16 rounded-full object-cover mx-auto border-2 border-amber-400" />`
        : `<div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#0F2A4A] to-[#1E3A8A] text-amber-400 flex items-center justify-center font-extrabold text-xl mx-auto border-2 border-amber-400">
             ${t.name.charAt(0)}
           </div>`;

      return `
        <div class="hover-lift relative bg-white rounded-2xl p-4 text-center border ${
          isTop3 ? "border-amber-400 shadow-md" : "border-slate-200"
        }">
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 ${badgeColor} text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow">
            Rank #${t.rank}
          </span>
          <div class="mt-2 mb-3">${avatarHTML}</div>
          <h4 class="font-bold text-sm text-[#0F2A4A] leading-snug">${t.name}</h4>
          <p class="text-[11px] text-slate-500 font-medium">${t.className}</p>
          <div class="mt-2 inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
            ${t.percent}
          </div>
        </div>
      `;
    })
    .join("");
}

// ==================== RENDER & FILTER STAFF PORTFOLIO ====================
function renderStaff(wingFilter) {
  const grid = document.getElementById("staffGrid");
  if (!grid) return;

  const filtered =
    wingFilter === "All"
      ? schoolData.staff
      : schoolData.staff.filter((s) => s.wing === wingFilter);

  grid.innerHTML = filtered
    .map((s) => {
      const photoHTML = s.photo
        ? `<img src="${s.photo}" alt="${s.name}" class="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shrink-0" />`
        : `<div class="w-16 h-16 rounded-2xl bg-[#0F2A4A] text-amber-400 flex items-center justify-center text-2xl font-extrabold border-2 border-amber-400 shrink-0">
             ${s.name.replace(/Mr\.|Mrs\.|Ms\./g, "").trim().charAt(0)}
           </div>`;

      return `
        <div class="hover-lift bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div class="flex items-center gap-4">
            ${photoHTML}
            <div>
              <span class="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">${s.wing} Wing</span>
              <h4 class="font-extrabold text-base text-[#0F2A4A] mt-1">${s.name}</h4>
              <p class="text-xs font-semibold text-slate-600">${s.role}</p>
            </div>
          </div>
          <div class="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
            <div><i class="fa-solid fa-graduation-cap text-[#0F2A4A] w-4"></i> <strong>Qualification:</strong> ${s.qualification}</div>
            <div><i class="fa-solid fa-briefcase text-amber-600 w-4"></i> <strong>Teaching Since:</strong> ${s.since}</div>
            <div class="bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-200 mt-2 font-medium">
              <i class="fa-solid fa-award text-emerald-600 mr-1"></i> ${s.bestSubject}
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

function filterStaff(wing) {
  document.querySelectorAll(".staff-filter-btn").forEach((btn) => {
    if (btn.innerText.includes(wing) || (wing === "All" && btn.innerText.includes("All"))) {
      btn.classList.add("bg-[#0F2A4A]", "text-white");
      btn.classList.remove("bg-white", "text-slate-700");
    } else {
      btn.classList.remove("bg-[#0F2A4A]", "text-white");
      btn.classList.add("bg-white", "text-slate-700");
    }
  });
  renderStaff(wing);
}
// ==================== RESULT & TC TABS SWITCHER ====================
function switchSearchTab(mode) {
  const forms = {
    roll: document.getElementById("rollSearchForm"),
    name: document.getElementById("nameSearchForm"),
    tc: document.getElementById("tcSearchForm")
  };
  const tabs = {
    roll: document.getElementById("tabRollBtn"),
    name: document.getElementById("tabNameBtn"),
    tc: document.getElementById("tabTcBtn")
  };

  document.getElementById("resultError").classList.add("hidden");
  document.getElementById("tcResultBox").classList.add("hidden");

  Object.keys(forms).forEach((key) => {
    if (key === mode) {
      forms[key].classList.remove("hidden");
      tabs[key].classList.add("border-[#0F2A4A]", "text-[#0F2A4A]", "font-bold");
      tabs[key].classList.remove("border-transparent", "text-slate-500");
    } else {
      forms[key].classList.add("hidden");
      tabs[key].classList.remove("border-[#0F2A4A]", "text-[#0F2A4A]", "font-bold");
      tabs[key].classList.add("border-transparent", "text-slate-500");
    }
  });
}

function fillDemoResult() {
  switchSearchTab("roll");
  document.getElementById("rollInput").value = "101";
  document.getElementById("dobInput").value = "2012-05-15";
}

// Search by Roll + DOB
function searchResultByRoll(e) {
  e.preventDefault();
  const roll = document.getElementById("rollInput").value.trim();
  const dob = document.getElementById("dobInput").value.trim();

  const student = schoolData.results.find((s) => s.roll === roll && s.dob === dob);
  renderMarksheet(student);
}

// Search by Student Name + Father Name
function searchResultByName(e) {
  e.preventDefault();
  const sName = document.getElementById("studentNameInput").value.trim().toLowerCase();
  const fName = document.getElementById("fatherNameInput").value.trim().toLowerCase();

  const student = schoolData.results.find(
    (s) => s.name.toLowerCase() === sName && s.fatherName.toLowerCase() === fName
  );
  renderMarksheet(student);
}

// Verify TC
function verifyTC(e) {
  e.preventDefault();
  const tcNo = document.getElementById("tcInput").value.trim().toUpperCase();
  const errorBox = document.getElementById("resultError");
  const tcBox = document.getElementById("tcResultBox");

  const record = schoolData.tcRecords.find((t) => t.tcNo.toUpperCase() === tcNo);

  if (!record) {
    tcBox.classList.add("hidden");
    errorBox.innerHTML = `<i class="fa-solid fa-circle-exclamation mr-1"></i> TC Number <strong>${tcNo}</strong> record mein nahi mila. Office se sampark karein.`;
    errorBox.classList.remove("hidden");
    return;
  }

  errorBox.classList.add("hidden");
  tcBox.innerHTML = `
    <div class="flex items-center gap-2 font-extrabold text-emerald-800 text-base mb-1">
      <i class="fa-solid fa-circle-check text-emerald-600 text-xl"></i> ${record.status}
    </div>
    <p class="text-xs sm:text-sm"><strong>TC No:</strong> ${record.tcNo} | <strong>Student:</strong> ${record.studentName} (S/O ${record.fatherName})</p>
    <p class="text-xs sm:text-sm"><strong>Last Class:</strong> ${record.lastClass} | <strong>Issue Date:</strong> ${record.issueDate}</p>
  `;
  tcBox.classList.remove("hidden");
}

// ==================== GRADE & MARKSHEET RENDERER ====================
function getGrade(percent) {
  if (percent >= 90) return "A+";
  if (percent >= 80) return "A";
  if (percent >= 70) return "B+";
  if (percent >= 60) return "B";
  if (percent >= 45) return "C";
  if (percent >= 33) return "D";
  return "F";
}

function renderMarksheet(student) {
  const errorBox = document.getElementById("resultError");
  const wrapper = document.getElementById("marksheetWrapper");

  if (!student) {
    wrapper.classList.add("hidden");
    errorBox.innerHTML = `<i class="fa-solid fa-circle-exclamation mr-1"></i> Record nahi mila! Kripya sahi Roll Number/DOB ya Student & Father Name check karein.`;
    errorBox.classList.remove("hidden");
    return;
  }

  errorBox.classList.add("hidden");

  document.getElementById("msExamTitle").innerText = student.examTitle;
  document.getElementById("msName").innerText = student.name;
  document.getElementById("msRoll").innerText = student.roll;
  document.getElementById("msClass").innerText = student.className;
  document.getElementById("msFather").innerText = student.fatherName;
  document.getElementById("msMother").innerText = student.motherName;
  document.getElementById("msDob").innerText = student.dob;
  document.getElementById("msAttendance").innerText = student.attendance;

  // Dynamic Verification QR Code
  const verifyUrl = encodeURIComponent(window.location.href + "?roll=" + student.roll);
  document.getElementById("msQrCode").src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${verifyUrl}`;

  let maxTotal = 0;
  let obtainedTotal = 0;
  let isPass = true;

  const tbody = document.getElementById("msSubjectsBody");
  tbody.innerHTML = "";

  student.subjects.forEach((sub) => {
    const theory = Number(sub.theory || 0);
    const practical = Number(sub.practical || 0);
    const subTotal = theory + practical;
    maxTotal += sub.max;
    obtainedTotal += subTotal;
    if (subTotal < 33) isPass = false;

    const subPercent = (subTotal / sub.max) * 100;
    tbody.innerHTML += `
      <tr>
        <td class="border border-slate-400 px-3 py-2 font-medium">${sub.name}</td>
        <td class="border border-slate-400 px-2 py-2 text-center">${sub.max}</td>
        <td class="border border-slate-400 px-2 py-2 text-center">${theory}</td>
        <td class="border border-slate-400 px-2 py-2 text-center">${practical}</td>
        <td class="border border-slate-400 px-2 py-2 text-center font-bold">${subTotal}</td>
        <td class="border border-slate-400 px-2 py-2 text-center font-semibold">${getGrade(subPercent)}</td>
      </tr>
    `;
  });

  const overallPercent = ((obtainedTotal / maxTotal) * 100).toFixed(2);

  document.getElementById("msMaxTotal").innerText = maxTotal;
  document.getElementById("msObtainedTotal").innerText = obtainedTotal;
  document.getElementById("msPercentage").innerText = overallPercent + "%";
  document.getElementById("msOverallGrade").innerText = getGrade(overallPercent);
  document.getElementById("msStatus").innerText = isPass ? "PASSED" : "SUPPLEMENTARY";

  wrapper.classList.remove("hidden");
  wrapper.scrollIntoView({ behavior: "smooth" });
}

function closeMarksheet() {
  document.getElementById("marksheetWrapper").classList.add("hidden");
}

// ==================== DIRECT 1-CLICK PDF DOWNLOAD ====================
function downloadDirectPDF() {
  const element = document.getElementById("printableMarksheet");
  const studentName = document.getElementById("msName").innerText.replace(/\s+/g, "_");
  const rollNo = document.getElementById("msRoll").innerText;
  const btn = document.getElementById("pdfDownloadBtn");

  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...`;

  const opt = {
    margin: 0.3,
    filename: `SDR_Marksheet_${studentName}_Roll_${rollNo}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      btn.innerHTML = `<i class="fa-solid fa-file-pdf"></i> Download Marksheet PDF`;
    });
}

// ==================== ONLINE ADMISSION FORM & RECEIPT ====================
function submitFullAdmission(e) {
  e.preventDefault();

  const appId = "SDR-2026-" + Math.floor(100 + Math.random() * 900);
  const entry = {
    appId,
    date: new Date().toLocaleDateString("en-IN"),
    name: document.getElementById("admName").value.trim(),
    className: document.getElementById("admClass").value,
    medium: document.getElementById("admMedium").value,
    dob: document.getElementById("admDob").value,
    gender: document.getElementById("admGender").value,
    samagra: document.getElementById("admSamagra").value.trim() || "N/A",
    father: document.getElementById("admFather").value.trim(),
    mother: document.getElementById("admMother").value.trim(),
    mobile: document.getElementById("admMobile").value.trim(),
    prevSchool: document.getElementById("admPrevSchool").value.trim() || "First Admission",
    address: document.getElementById("admAddress").value.trim(),
    transport: document.getElementById("admTransport").value
  };

  // Save in localStorage so Clerk can view it inside Admin Dashboard
  const existingAdmissions = JSON.parse(localStorage.getItem("sdr_admission_inquiries") || "[]");
  existingAdmissions.unshift(entry);
  localStorage.setItem("sdr_admission_inquiries", JSON.stringify(existingAdmissions));

  // Show Confirmation Slip
  document.getElementById("recAppId").innerText = appId;
  document.getElementById("recSummaryText").innerHTML = `
    <strong>Student:</strong> ${entry.name} (${entry.className} - ${entry.medium}) •
    <strong>Father:</strong> ${entry.father} • <strong>Mobile:</strong> ${entry.mobile} •
    <strong>Address:</strong> ${entry.address} • <strong>Transport:</strong> ${entry.transport}
  `;

  latestAdmissionText =
    `*New Online Admission Form - SDR Memorial Public High School, Basari*%0A%0A` +
    `*Application ID:* ${appId}%0A` +
    `*Student Name:* ${encodeURIComponent(entry.name)}%0A` +
    `*Class & Medium:* ${encodeURIComponent(entry.className + " (" + entry.medium + ")")}%0A` +
    `*DOB & Gender:* ${entry.dob} | ${entry.gender}%0A` +
    `*Samagra ID:* ${encodeURIComponent(entry.samagra)}%0A` +
    `*Father's Name:* ${encodeURIComponent(entry.father)}%0A` +
    `*Mother's Name:* ${encodeURIComponent(entry.mother)}%0A` +
    `*Parent Mobile:* ${encodeURIComponent(entry.mobile)}%0A` +
    `*Address:* ${encodeURIComponent(entry.address)}%0A` +
    `*Transport:* ${encodeURIComponent(entry.transport)}`;

  const receiptBox = document.getElementById("admissionReceiptBox");
  receiptBox.classList.remove("hidden");
  receiptBox.scrollIntoView({ behavior: "smooth" });
}

function sendAdmissionWhatsApp() {
  const schoolWhatsAppNumber = "919876543210"; // School office WhatsApp number
  window.open(`https://wa.me/${schoolWhatsAppNumber}?text=${latestAdmissionText}`, "_blank");
}

