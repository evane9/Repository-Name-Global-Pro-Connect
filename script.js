let currentLang = 'ar';
const translations = {
    ar: { title: "Global Pro-Connect", name: "الاسم الكامل", role: "المسمى الوظيفي", spec: "التخصص الدقيق", color: "اختر لون البطاقة:", img: "اختر صورتك الشخصية:", btn: "توليد وتحميل البطاقة فوراً" },
    en: { title: "Global Pro-Connect", name: "Full Name", role: "Job Title", spec: "Specialty", color: "Choose Card Color:", img: "Choose Profile Picture:", btn: "Generate & Download Card" }
};

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const t = translations[currentLang];
    document.getElementById('title').innerText = t.title;
    document.getElementById('name').placeholder = t.name;
    document.getElementById('role').placeholder = t.role;
    document.getElementById('specialty').placeholder = t.spec;
    document.getElementById('colorLabel').innerText = t.color;
    document.getElementById('imgLabel').innerText = t.img;
    document.getElementById('submitBtn').innerText = t.btn;
    document.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
}

document.getElementById('proForm').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerText = currentLang === 'ar' ? "جاري التوليد..." : "Generating...";

    // توليد البطاقة فوراً دون إرسال بيانات لأي مكان
    await createDigitalCard();
    
    btn.disabled = false;
    btn.innerText = translations[currentLang].btn;
});

async function createDigitalCard() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [100, 60] });

    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const specialty = document.getElementById('specialty').value;
    const selectedColor = document.getElementById('cardColor').value;
    const imageFile = document.getElementById('imageInput').files[0];

    // تصميم البطاقة
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

    // الـ QR Code يعمل محلياً أيضاً
    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = ""; 
    new QRCode(qrDiv, { text: window.location.href, width: 128, height: 128 });

    return new Promise((resolve) => {
        setTimeout(() => {
            const qrImg = qrDiv.querySelector('img').src;
            doc.addImage(qrImg, 'PNG', 75, 35, 20, 20);
            doc.save(`Card_${name}.pdf`);
            resolve();
        }, 500);
    });
}

function readFileAsDataURL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}
