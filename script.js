const scriptURL = 'https://script.google.com/macros/s/AKfycby9GvY_6o7W7S_V_P9G8C5f5R1S_P_X_E_G_M_P/exec'; 
const form = document.getElementById('proForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerText = "Processing...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            createDigitalCard();
            alert('Success! Your professional card is ready.');
            form.reset();
            btn.disabled = false;
            btn.innerText = "توليد البطاقة وحفظ البيانات";
        })
        .catch(error => {
            console.error('Error!', error.message);
            btn.disabled = false;
            btn.innerText = "Error! Try again";
        });
});

function createDigitalCard() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [100, 60]
    });

    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const specialty = document.getElementById('specialty').value;

    doc.setFillColor(0, 102, 204);
    doc.rect(0, 0, 100, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("Global Pro-Connect", 50, 10, { align: "center" });

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 10, 25);
    doc.text(`Role: ${role}`, 10, 35);
    doc.text(`Specialty: ${specialty}`, 10, 45);

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Verified Identity - Global Pro System", 10, 55);

    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = ""; 
    const qrcode = new QRCode(qrDiv, {
        text: window.location.href,
        width: 128,
        height: 128
    });

    setTimeout(() => {
        const qrImg = qrDiv.querySelector('img').src;
        doc.addImage(qrImg, 'PNG', 75, 20, 20, 20);
        doc.save(`Global_Pro_Card_${name}.pdf`);
    }, 500);
}
