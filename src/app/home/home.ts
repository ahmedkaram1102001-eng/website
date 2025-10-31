import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  showButton = false;
  congratulations: any[] = [];
  isAdmin = false; // 🔐 الحالة الافتراضية
item: any;

  ngOnInit() {
    // ✅ جلب بيانات المستخدم الحالي من localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.isAdmin = user.role === 'admin';
    }

    // 📦 تحميل التهاني المخزنة إن وجدت
    const saved = localStorage.getItem('congratulations');
    if (saved) {
      this.congratulations = JSON.parse(saved);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 400;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ✏️ تعديل تهنئة
  editCongratulation(item: any) {
    const newTitle = prompt('📝 تعديل العنوان:', item.title);
    const newMessage = prompt('💬 تعديل النص:', item.message);

    if (newTitle && newMessage) {
      item.title = newTitle;
      item.message = newMessage;
      localStorage.setItem('congratulations', JSON.stringify(this.congratulations));
    }
  }

  // 🗑️ حذف تهنئة
  deleteCongratulation(id: number) {
    if (confirm('هل تريد حذف هذه التهنئة؟')) {
      this.congratulations = this.congratulations.filter(c => c.id !== id);
      localStorage.setItem('congratulations', JSON.stringify(this.congratulations));
    }
  }

  // 📅 تنسيق التاريخ
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // 🏢 بيانات الشركات
  companies = [
    { logo: 'assets/images.jpg.png', name: 'شركة الأمير للأغذية', description: 'رائدة في إنتاج وتوزيع المنتجات الغذائية عالية الجودة.' },
    { logo: 'assets/images.jpg.png', name: 'شركة الوجد', description: 'نقدم أفضل أنواع الأرز والحبوب بدقة وجودة مميزة.' },
    { logo: 'assets/images.jpg.png', name: 'شركة كرافت', description: 'خبراء في مجال الزيوت النباتية ومنتجات الطهي.' },
    { logo: 'assets/images.jpg.png', name: 'شركة ويسما', description: 'نفتخر بشراكتنا مع العلامات التجارية الكبرى في المنظفات.' },
    { logo: 'assets/images.jpg.png', name: 'شركة كيلوجز', description: 'تخصصنا في الأغذية المجمدة بأعلى معايير الجودة والسلامة.' }
  ];
}
