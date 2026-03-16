const scriptURL = 'https://script.google.com/macros/s/AKfycbxZdgRZU-Sw0mb4NAJa_RbKby4oPU2kftPPevakDLSTgl_KNUS5gGD_Ef3EJC3ghzhh/exec'; 
const MY_SECRET_PASSWORD = "Hassan_Pro_2026"; 

let currentLang = 'ar';
const translations = {
    ar: { title: "Global Pro-Connect", name: "الاسم الكامل", email: "البريد الإلكتروني", role: "المسمى الوظيفي", spec: "التخصص الدقيق", color: "اختر لون البطاقة:", img: "اختر صورتك الشخصية:", btn: "توليد البطاقة وحفظ البيانات", loginT: "تسجيل الدخول", loginS: "النظام محمي، يرجى إدخال كلمة السر", loginB: "دخول للنظام" },
    en: { title: "Global Pro-Connect", name: "Full Name", email: "Email Address", role: "Job Title", spec: "Specialty", color: "Choose Card Color:", img: "Choose Profile Picture:", btn: "Generate Card & Save Data", loginT: "Secure Login", loginS: "System protected, please enter password", loginB: "Access System" }
};

function checkLogin() {
    const enteredPass = document.getElementById('passwordInput').value;
    if (enteredPass === MY_SECRET_PASSWORD) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    } else {
        alert(currentLang === 'ar' ? "كلمة السر خاطئة!" : "Incorrect Password!");
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const t = translations[currentLang];
    
    document.getElementById('title').innerText = t.title;
    document.getElementById('name').placeholder = t.name;
    document.getElementById('email').placeholder = t.email;
    document.getElementById('role').placeholder = t.role;
    document.getElementById('specialty').placeholder = t.spec;
    document.getElementById('colorLabel').innerText = t.color;
    document.getElementById('imgLabel').innerText = t.img;
    document.getElementById('submitBtn').innerText = t.btn;
    document.getElementById('loginTitle').innerText = t.loginT;
    document.getElementById('loginSub').innerText = t.loginS;
    document.getElementById('loginBtn').innerText = t.loginB;
    
    document.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
}

const form = document.getElementById('proForm');
form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerText = currentLang === 'ar' ? "جاري المعالجة..." : "Processing...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(async response => {
            await createDigitalCard();
            alert(currentLang === 'ar' ? 'تم بنجاح!' : 'Success!');
            form.reset();
            btn.disabled = false;
            btn.innerText = translations[currentLang].btn;
        })
        .catch(error => {
            btn.disabled = false;
            btn.innerText = "Error!";
        });
});

async function createDigitalCard() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [100, 60] });

    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const specialty = document.getElementById('specialty').value;
    const selectedColor = document.getElementById('cardColor').value;
    const imageFile = document.getElementById('imageInput').files[0];

    // رأس البطاقة باللون المختار
    doc.setFillColor(selectedColor);
    doc.rect(0, 0, 100, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("Global Pro-Connect", 50, 10, { align: "center" });

    if (imageFile) {
        const imageData = await readFileAsDataURL(imageFile);
        doc.addImage(imageData, 'JPEG', 10, 20, 25, 25);
    }

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    const textX = imageFile ? 40 : 15;
    doc.text(`Name: ${name}`, textX, 25);
    doc.text(`Role: ${role}`, textX, 35);
    doc.text(`Specialty: ${specialty}`, textX, 45);

    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = ""; 
    new QRCode(qrDiv, { text: window.location.href, width: 128, height: 128 });

    return new Promise((resolve) => {
        setTimeout(() => {
            const qrImg = qrDiv.querySelector('img').src;
            doc.addImage(qrImg, 'PNG', 75, 35, 20, 20);
            doc.save(`Card_${name}.pdf`);
            resolve();
        }, 600);
    });
}

function readFileAsDataURL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}
