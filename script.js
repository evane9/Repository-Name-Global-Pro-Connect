<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Global Pro-Connect | Final Version</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
</head>
<body>

    <div id="login-screen" class="container">
        <h2 id="loginTitle">تسجيل الدخول</h2>
        <p id="loginSub">النظام محمي، يرجى إدخال كلمة السر</p>
        <input type="password" id="passwordInput" placeholder="كلمة السر">
        <button onclick="checkLogin()" id="loginBtn">دخول للنظام</button>
    </div>

    <div id="main-content" class="container" style="display:none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 id="title" style="margin:0;">Global Pro-Connect</h2>
            <button onclick="toggleLanguage()" id="langBtn" style="width: auto; padding: 5px 15px; font-size: 14px; background: #333;">EN / عربي</button>
        </div>
        
        <form id="proForm">
            <input type="text" id="name" name="name" placeholder="الاسم الكامل" required>
            <input type="email" id="email" name="email" placeholder="البريد الإلكتروني" required>
            <input type="text" id="role" name="role" placeholder="المسمى الوظيفي" required>
            <input type="text" id="specialty" name="specialty" placeholder="التخصص الدقيق" required>
            
            <div style="margin: 15px 0; text-align: right; background: #fdfdfd; padding: 12px; border-radius: 12px; border: 1px solid #eee;">
                <label id="colorLabel" style="display:block; margin-bottom:8px; font-weight:bold;">اختر لون البطاقة:</label>
                <input type="color" id="cardColor" value="#0066cc" style="width: 100%; height: 40px; border:none; cursor:pointer;">
            </div>

            <div class="image-upload-wrapper">
                <label id="imgLabel">اختر صورتك الشخصية:</label>
                <input type="file" id="imageInput" accept="image/*">
            </div>

            <button type="submit" id="submitBtn">توليد البطاقة وحفظ البيانات</button>
        </form>
        <div id="qrcode" style="display:none;"></div>
    </div>

<script src="script.js"></script>
</body>
</html>
