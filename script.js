// رابط Google Apps Script الخاص بك
const scriptURL = 'https://script.google.com/macros/s/AKfycbxZdgRZU-Sw0mb4NAJa_RbKby4oPU2kftPPevakDLSTgl_KNUS5gGD_Ef3EJC3ghzhh/exec'; 

// كلمة السر الخاصة بك
const MY_SECRET_PASSWORD = "Hassan_Pro_2026"; 

// نظام الترجمة واللغات
let currentLang = 'ar';
const translations = {
    ar: { title: "Global Pro-Connect", name: "الاسم الكامل", email: "البريد الإلكتروني", role: "المسمى الوظيفي", spec: "التخصص الدقيق", color: "اختر لون البطاقة:", img: "اختر صورتك الشخصية:", btn: "توليد البطاقة وحفظ البيانات", loginT: "تسجيل الدخول", loginS: "النظام محمي، يرجى إدخال كلمة السر", loginB: "دخول للنظام" },
    en: { title: "Global Pro-Connect", name: "Full Name", email: "Email Address", role: "Job Title", spec: "Specialty", color: "Choose Card Color:", img: "Choose Profile Picture:", btn: "Generate Card & Save Data", loginT: "Secure Login", loginS: "System protected, please enter password", loginB: "Access System" }
};

// دالة التحقق من الدخول
function checkLogin() {
    const enteredPass = document.getElementById('passwordInput').value;
    if (enteredPass === MY_SECRET_PASSWORD) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    } else {
        alert(currentLang === 'ar' ? "عذراً، كلمة السر غير صحيحة!" : "Sorry, incorrect password!");
    }
}

// دالة تبديل اللغة
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const t = translations[currentLang];
    
    document.getElementById('title').innerText = t.title;
    document.getElementById('name').placeholder = t.name;
    document.getElementById('email').placeholder = t.email;
    document.getElementById('role').placeholder = t.role;
    document.getElementById('specialty').placeholder = t.spec;
    document.getElementById('color
