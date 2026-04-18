// Initialize EmailJS
// ======================================
// SETUP INSTRUCTIONS:
// 1. Go to https://dashboard.emailjs.com/
// 2. Sign up or log in
// 3. Create a new service (Gmail recommended)
// 4. Create an email template
// 5. Copy your Service ID, Template ID, and Public Key
// 6. Replace the values below with your actual credentials
// ======================================

const EMAILJS_SERVICE_ID = 'service_xxxxx'; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxx'; // Replace with your template ID
const EMAILJS_PUBLIC_KEY = 'xxxxxxx'; // Replace with your public key

// Check if credentials are set up
const isSetupComplete = EMAILJS_SERVICE_ID !== 'service_xxxxx' && 
                       EMAILJS_TEMPLATE_ID !== 'template_xxxxx' && 
                       EMAILJS_PUBLIC_KEY !== 'xxxxxxx';

// Initialize emailjs with better error handling
try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log("[v0] EmailJS initialized successfully");
} catch (error) {
    console.error("[v0] EmailJS initialization failed:", error);
}

// Get form elements
const form = document.getElementById('hijama-form');
const submitBtn = document.getElementById('submitBtn');

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    console.log("[v0] Form submission started");
    
    // Check if EmailJS is properly configured
    if (!isSetupComplete) {
        Swal.fire({
            title: 'لم يتم التكوين',
            html: `
                <div style="text-align: right; direction: rtl;">
                    <p>يرجى إعداد بيانات اعتماد EmailJS أولاً:</p>
                    <ol style="text-align: right; display: inline-block;">
                        <li>انتقل إلى <a href="https://dashboard.emailjs.com/" target="_blank">EmailJS Dashboard</a></li>
                        <li>أنشئ حساباً أو سجل الدخول</li>
                        <li>أنشئ خدمة جديدة (Gmail موصى به)</li>
                        <li>أنشئ قالب بريد إلكتروني</li>
                        <li>انسخ Service ID و Template ID و Public Key</li>
                        <li>استبدل القيم في ملف app.js</li>
                    </ol>
                </div>
            `,
            icon: 'warning',
            confirmButtonText: 'حسناً'
        });
        return;
    }
    
    // Show loading state
    const spinner = submitBtn.querySelector('.spinner');
    const spanText = submitBtn.querySelector('span');
    spinner.style.display = 'block';
    spanText.style.display = 'none';
    submitBtn.disabled = true;
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Collect checkbox arrays
        const medicalHistory = form.querySelectorAll('input[name="medicalHistory[]"]:checked');
        const contraindications = form.querySelectorAll('input[name="contraindications[]"]:checked');
        
        data.medicalHistory = Array.from(medicalHistory).map(el => el.value).join(', ');
        data.contraindications = Array.from(contraindications).map(el => el.value).join(', ');
        
        console.log("[v0] Collected form data:", data);
        
        // Validate required fields
        if (!data.fullName || !data.age || !data.gender || !data.phone || !data.signatureName || !data.signatureDate) {
            throw new Error('يرجى ملء جميع الحقول المطلوبة');
        }
        
        console.log("[v0] Validation passed, sending email");
        
        // Send email via EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                fullName: data.fullName,
                age: data.age,
                gender: data.gender,
                phone: data.phone,
                address: data.address,
                medicalHistory: data.medicalHistory,
                otherDiseases: data.otherDiseases,
                otherProblems: data.otherProblems,
                takingMeds: data.takingMeds,
                medsList: data.medsList,
                bloodThinners: data.bloodThinners,
                contraindications: data.contraindications,
                otherContraindications: data.otherContraindications,
                recentBloodTest: data.recentBloodTest,
                bloodTestIssues: data.bloodTestIssues,
                painLocation: data.painLocation,
                previousCupping: data.previousCupping,
                temperature: data.temperature,
                bloodPressure: data.bloodPressure,
                painLevel: data.painLevel,
                physicalExamCheck: data.physicalExamCheck,
                signatureName: data.signatureName,
                signatureDate: data.signatureDate
            }
        );
        
        console.log("[v0] Email sent successfully:", response);
        
        // Show success message
        Swal.fire({
            title: 'تم الإرسال بنجاح!',
            text: 'شكراً لك على ملء النموذج. سيتم التواصل معك قريباً.',
            icon: 'success',
            confirmButtonText: 'حسناً'
        }).then(() => {
            // Generate PDF
            generatePDF();
            // Reset form
            form.reset();
        });
        
    } catch (error) {
        console.error("[v0] Error sending form:", error);
        
        // Show error message
        Swal.fire({
            title: 'حدث خطأ',
            text: error.message || 'لم نتمكن من إرسال النموذج، يرجى التأكد من مفاتيح EmailJS أو المحاولة مرة أخرى.',
            icon: 'error',
            confirmButtonText: 'حسناً'
        });
    } finally {
        // Restore button state
        spinner.style.display = 'none';
        spanText.style.display = 'inline';
        submitBtn.disabled = false;
    }
});

// Generate PDF function
function generatePDF() {
    const element = document.getElementById('capture-area');
    const opt = {
        margin: 10,
        filename: 'نموذج_الحجامة.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    
    html2pdf().set(opt).from(element).save();
}

// Toggle medication list visibility
const takingMedsRadios = document.querySelectorAll('input[name="takingMeds"]');
takingMedsRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        const medsWrapper = document.getElementById('medsListWrapper');
        if (document.querySelector('input[name="takingMeds"]:checked').value === 'نعم') {
            medsWrapper.style.display = 'block';
        } else {
            medsWrapper.style.display = 'none';
        }
    });
});

// Initialize with correct display state
const medsWrapper = document.getElementById('medsListWrapper');
if (document.querySelector('input[name="takingMeds"]:checked').value === 'لا') {
    medsWrapper.style.display = 'none';
}

console.log("[v0] Form script loaded successfully");
