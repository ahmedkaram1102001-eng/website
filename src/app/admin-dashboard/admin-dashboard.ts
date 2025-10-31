import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface JobApplication {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
  cv: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface JobForm {
  title: string;
  description: string;
  image: File | null;
}

interface CongratForm {
  title: string;
  message: string;
  image: File | null;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  
  // البيانات الأساسية
  applications: JobApplication[] = [];
  stats: Stats = { total: 0, pending: 0, approved: 0, rejected: 0 };
  
  // حالة النوافذ المنبثقة
  showJobModal = false;
  showCongratModal = false;
  showApplicationDetails = false;
  selectedApplication: JobApplication | null = null;
  
  // نماذج الإدخال
  jobForm: JobForm = { title: '', description: '', image: null };
  congratForm: CongratForm = { title: '', message: '', image: null };
  
  // ملفات محددة
  jobImagePreview: string | null = null;
  congratImagePreview: string | null = null;

  ngOnInit() {
    this.loadApplications();
  }

  // ✅ تحميل البيانات
  loadApplications() {
    const saved = localStorage.getItem('jobApplications');
    this.applications = saved ? JSON.parse(saved) : this.generateSampleData();
    this.updateStats();
  }

  // ✅ تحديث الإحصائيات
  updateStats() {
    this.stats = {
      total: this.applications.length,
      pending: this.applications.filter(a => a.status === 'pending').length,
      approved: this.applications.filter(a => a.status === 'approved').length,
      rejected: this.applications.filter(a => a.status === 'rejected').length
    };
  }

  // ✅ بيانات تجريبية
  generateSampleData(): JobApplication[] {
    return [
      
      {
        id: 1,
        firstName: 'أحمد',
        lastName: 'محمود',
        position: 'مهندس برمجيات',
        phone: '+201234567890',
        email: 'ahmed@example.com',
        cv: 'ahmed_cv.pdf',
        status: 'pending',
        date: new Date().toISOString()
      },
      {
        id: 2,
        firstName: 'فاطمة',
        lastName: 'علي',
        position: 'مصممة جرافيك',
        phone: '+201098765432',
        email: 'fatma@example.com',
        cv: 'fatma_cv.pdf',
        status: 'pending',
        date: new Date().toISOString()
      },
      {
        id: 3,
        firstName: 'محمد',
        lastName: 'حسن',
        position: 'مدير مبيعات',
        phone: '+201555666777',
        email: 'mohamed@example.com',
        cv: 'mohamed_cv.pdf',
        status: 'approved',
        date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 4,
        firstName: 'نور',
        lastName: 'خالد',
        position: 'محاسب',
        phone: '+201444333222',
        email: 'nour@example.com',
        cv: 'nour_cv.pdf',
        status: 'rejected',
        date: new Date(Date.now() - 172800000).toISOString()
      }
    ];
  }

  // ✅ تغيير حالة الطلب
  handleStatusChange(id: number, newStatus: 'pending' | 'approved' | 'rejected') {
    this.applications = this.applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    localStorage.setItem('jobApplications', JSON.stringify(this.applications));
    this.updateStats();
    
    const statusText = newStatus === 'approved' ? 'قُبل' : 'رُفض';
    alert(`✅ تم ${statusText} الطلب بنجاح!`);
  }

  // ✅ حذف طلب
  deleteApplication(id: number) {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      this.applications = this.applications.filter(app => app.id !== id);
      localStorage.setItem('jobApplications', JSON.stringify(this.applications));
      this.updateStats();
      alert('🗑️ تم حذف الطلب بنجاح!');
    }
  }

  // ✅ إضافة وظيفة
  handleAddJob() {
    if (!this.jobForm.title || !this.jobForm.description) {
      alert('⚠️ من فضلك املأ جميع الحقول المطلوبة');
      return;
    }

    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    
    if (this.jobForm.image) {
      const reader = new FileReader();
      reader.onload = () => {
        jobs.push({
          id: Date.now(),
          title: this.jobForm.title,
          description: this.jobForm.description,
          image: reader.result as string,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('jobs', JSON.stringify(jobs));
        this.resetJobForm();
        alert('✅ تمت إضافة الوظيفة بنجاح!');
      };
      reader.readAsDataURL(this.jobForm.image);
    } else {
      jobs.push({
        id: Date.now(),
        title: this.jobForm.title,
        description: this.jobForm.description,
        image: '',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('jobs', JSON.stringify(jobs));
      this.resetJobForm();
      alert('✅ تمت إضافة الوظيفة بنجاح!');
    }
  }

  // ✅ إضافة تهنئة
  handleAddCongratulation() {
    if (!this.congratForm.title || !this.congratForm.message) {
      alert('⚠️ من فضلك املأ جميع الحقول المطلوبة');
      return;
    }

    const congrats = JSON.parse(localStorage.getItem('congratulations') || '[]');
    
    if (this.congratForm.image) {
      const reader = new FileReader();
      reader.onload = () => {
        congrats.push({
          id: Date.now(),
          title: this.congratForm.title,
          message: this.congratForm.message,
          image: reader.result as string,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('congratulations', JSON.stringify(congrats));
        this.resetCongratForm();
        alert('✅ تمت إضافة التهنئة بنجاح!');
      };
      reader.readAsDataURL(this.congratForm.image);
    } else {
      congrats.push({
        id: Date.now(),
        title: this.congratForm.title,
        message: this.congratForm.message,
        image: '',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('congratulations', JSON.stringify(congrats));
      this.resetCongratForm();
      alert('✅ تمت إضافة التهنئة بنجاح!');
    }
  }

  // ✅ اختيار صورة للوظيفة
  onJobImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('⚠️ من فضلك اختر صورة فقط');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('⚠️ حجم الصورة يجب أن يكون أقل من 10MB');
        return;
      }
      this.jobForm.image = file;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.jobImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // ✅ اختيار صورة للتهنئة
  onCongratImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('⚠️ من فضلك اختر صورة فقط');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('⚠️ حجم الصورة يجب أن يكون أقل من 10MB');
        return;
      }
      this.congratForm.image = file;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.congratImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // ✅ عرض تفاصيل الطلب
  viewApplicationDetails(app: JobApplication) {
    this.selectedApplication = app;
    this.showApplicationDetails = true;
  }

  // ✅ إعادة تعيين النماذج
  resetJobForm() {
    this.jobForm = { title: '', description: '', image: null };
    this.jobImagePreview = null;
    this.showJobModal = false;
  }

  resetCongratForm() {
    this.congratForm = { title: '', message: '', image: null };
    this.congratImagePreview = null;
    this.showCongratModal = false;
  }

  // ✅ إغلاق النوافذ
  closeJobModal() {
    this.resetJobForm();
  }

  closeCongratModal() {
    this.resetCongratForm();
  }

  closeApplicationDetails() {
    this.showApplicationDetails = false;
    this.selectedApplication = null;
  }

  // ✅ دوال مساعدة
  getStatusColor(status: string): string {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'pending': return '⏳ قيد المراجعة';
      case 'approved': return '✅ مقبول';
      case 'rejected': return '❌ مرفوض';
      default: return status;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}