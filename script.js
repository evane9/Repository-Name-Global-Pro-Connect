const scriptURL = 'https://script.google.com/macros/s/AKfycby9GvY_6o7W7S_V_P9G8C5f5R1S_P_X_E_G_M_P/exec'; 
const form = document.getElementById('proForm');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerText = "جاري المعالجة...";

    // إرسال البيانات لجوجل شيت
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(async response => {
            await createDigitalCard();
            alert('تم بنجاح! تم توليد بطاقتك وحفظ بياناتك.');
            form.reset();
            btn.disabled = false;
            btn.innerText = "توليد البطاقة وحفظ البيانات";
        })
        .catch(error => {
            console.error('Error!', error.message);
            btn.disabled = false;
            btn.innerText = "خطأ! حاول مجدداً";
        });
});

async function createDigitalCard() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [100, 60]
    });

    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const specialty = document.getElementById('specialty').value;
    const imageFile = document.getElementById('imageInput').files[0];

    // تصميم رأس البطاقة
    doc.setFillColor(0, 102, 204);
    doc.rect(0, 0, 100, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("Global Pro-Connect", 50, 10, { align: "center" });

    // معالجة وإضافة الصورة الشخصية
    if (imageFile) {
        const imageData = await readFileAsDataURL(imageFile);
        // إضافة إطار للصورة
        doc.setDrawColor(200, 200, 200);
        doc.rect(9, 19, 27, 27); 
        doc.addImage(imageData, 'JPEG', 10, 20, 25, 25);
    }

    // إضافة النصوص المهنية
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    const textX = imageFile ? 40 : 15; // إزاحة النص إذا وجدت صورة
    doc.text(`Name: ${name}`, textX, 25);
    doc.text(`Role: ${role}`, textX, 35);
    doc.text(`Specialty: ${specialty}`, textX, 45);

    // إضافة الـ QR Code في الزاوية
    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = ""; 
    const qrcode = new QRCode(qrDiv, {
        text: window.location.href,
        width: 128,
        height: 128
    });

    return new Promise((resolve) => {
        setTimeout(() => {
            const qrImg = qrDiv.querySelector('img').src;
            doc.addImage(qrImg, 'PNG', 75, 35, 20, 20);
            doc.save(`Pro_Card_${name}.pdf`);
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
