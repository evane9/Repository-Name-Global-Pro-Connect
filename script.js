// الرابط الجديد الذي قمت بإنشائه
const scriptURL = 'https://script.google.com/macros/s/AKfycbxZdgRZU-Sw0mb4NAJa_RbKby4oPU2kftPPevakDLSTgl_KNUS5gGD_Ef3EJC3ghzhh/exec'; 

// كلمة السر الخاصة بك
const MY_SECRET_PASSWORD = "Hassan_Pro_2026"; 

// دالة التحقق من الدخول
function checkLogin() {
    const enteredPass = document.getElementById('passwordInput').value;
    if (enteredPass === MY_SECRET_PASSWORD) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    } else {
        alert("عذراً، كلمة السر غير صحيحة!");
    }
}

const form = document.getElementById('proForm');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerText = "جاري الحفظ والإرسال...";

    // إرسال البيانات إلى جوجل شيت والبريد الإلكتروني
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(async response => {
            await createDigitalCard();
            alert('تم بنجاح! تم حفظ بياناتك وتوليد بطاقتك.');
            form.reset();
            btn.disabled = false;
            btn.innerText = "توليد البطاقة وحفظ البيانات";
        })
        .catch(error => {
            console.error('Error!', error.message);
            btn.disabled = false;
            btn.innerText = "خطأ في الاتصال";
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

    // تصميم البطاقة
    doc.setFillColor(0, 102, 204);
    doc.rect(0, 0, 100, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("Global Pro-Connect", 50, 10, { align: "center" });

    // معالجة الصورة الشخصية
    if (imageFile) {
        const imageData = await readFileAsDataURL(imageFile);
        doc.addImage(imageData, 'JPEG', 10, 20, 25, 25);
    }

    // إضافة النصوص
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    const textX = imageFile ? 40 : 15;
    doc.text(`Name: ${name}`, textX, 25);
    doc.text(`Role: ${role}`, textX, 35);
    doc.text(`Specialty: ${specialty}`, textX, 45);

    // إضافة الـ QR Code
    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = ""; 
    new QRCode(qrDiv, { text: window.location.href, width: 128, height: 128 });

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
