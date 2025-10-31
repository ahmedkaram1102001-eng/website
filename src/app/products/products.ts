import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {

  @Input() currentLanguage: string = 'العربية';

  // 📦 الوظائف
  jobs: any[] = [];
  isAdmin = false;

  // 📄 فورم التقديم
  applicationForm!: FormGroup;
  uploadedFile: File | null = null;
  isDragging = false;
  isSubmitting = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';

  showButton = false;
  private apiUrl = 'https://your-api-endpoint.com/api/applications';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.initForm();

    // 🧱 تحميل الوظائف من localStorage
    const savedJobs = localStorage.getItem('jobs');
    this.jobs = savedJobs ? JSON.parse(savedJobs) : [];

    // 🧑‍💼 تحديد هل المستخدم أدمن
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.isAdmin = user.role === 'admin';
    }
  }

  // 🔹 تهيئة النموذج
  initForm() {
    this.applicationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]],
      location: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cv: ['', Validators.required]
    });
  }

  // 🔹 فحص الحقول
  isFieldInvalid(fieldName: string): boolean {
    const field = this.applicationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // 🔹 رفع الملفات
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.handleFile(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) this.handleFile(files[0]);
  }

  handleFile(file: File) {
    const allowedTypes = [
      'image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg',
      'application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/gif'
    ];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      this.showErrorMessage('نوع الملف غير مدعوم');
      return;
    }

    if (file.size > maxSize) {
      this.showErrorMessage('حجم الملف كبير جداً (الحد الأقصى 5MB)');
      return;
    }

    this.uploadedFile = file;
    this.applicationForm.patchValue({ cv: file.name });
    this.applicationForm.get('cv')?.markAsTouched();
  }

  removeFile(event: Event) {
    event.stopPropagation();
    this.uploadedFile = null;
    this.applicationForm.patchValue({ cv: '' });
  }

  // 🔹 عند الإرسال
  onSubmit() {
    if (this.applicationForm.valid && this.uploadedFile) {
      this.isSubmitting = true;
      this.showSuccess = false;
      this.showError = false;

      const formData = new FormData();
      formData.append('firstName', this.applicationForm.get('firstName')?.value);
      formData.append('lastName', this.applicationForm.get('lastName')?.value);
      formData.append('phone', this.applicationForm.get('phone')?.value);
      formData.append('location', this.applicationForm.get('location')?.value);
      formData.append('email', this.applicationForm.get('email')?.value);
      formData.append('cv', this.uploadedFile);
      formData.append('language', this.currentLanguage);
      formData.append('submittedAt', new Date().toISOString());

      this.http.post(this.apiUrl, formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.showSuccess = true;
          this.resetForm();
          setTimeout(() => (this.showSuccess = false), 5000);
        },
        error: () => {
          this.isSubmitting = false;
          this.showErrorMessage('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
        }
      });
    } else {
      Object.keys(this.applicationForm.controls).forEach(key => {
        this.applicationForm.get(key)?.markAsTouched();
      });
      this.showErrorMessage('يرجى ملء جميع الحقول المطلوبة');
    }
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    this.showError = true;
    setTimeout(() => (this.showError = false), 5000);
  }

  resetForm() {
    this.applicationForm.reset();
    this.uploadedFile = null;
  }

  // 📜 تعديل وظيفة
  editJob(job: any) {
    const newTitle = prompt('📝 تعديل العنوان:', job.title);
    const newDesc  = prompt('💬 تعديل الوصف:', job.description);
    if (newTitle !== null && newDesc !== null) {
      job.title = newTitle;
      job.description = newDesc;
      localStorage.setItem('jobs', JSON.stringify(this.jobs));
    }
  }

  // 🗑️ حذف وظيفة
  deleteJob(id: number) {
    if (!confirm('هل تريد حذف هذه الوظيفة؟')) return;
    this.jobs = this.jobs.filter(j => j.id !== id);
    localStorage.setItem('jobs', JSON.stringify(this.jobs));
  }

  // 🗓️ تنسيق التاريخ
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // زر الصعود للأعلى
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 400;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
