import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  currentLanguage = 'العربية';
  dropdownOpen = false;
  showContactModal = false;

  isAdmin = false;
  currentUser: any = null;

  // ❌ حذفنا متغيرات modal إضافة وظيفة
  // showAddJobModal = false;
  // selectedFile: File | null = null;
  // newJob = { ... };

  constructor(private router: Router, private scroller: ViewportScroller) {}

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.isAdmin = this.currentUser.role === 'admin';
    }
  }

  // ❌ حذفنا دوال modal إضافة وظيفة
  // openAddJobModal() { ... }
  // closeAddJobModal() { ... }
  // onFileSelected(event: any) { ... }
  // addJob() { ... }
  // resetForm() { ... }

  // ✅ دوال الـ Dropdown
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  setLanguage(lang: string, event: Event) {
    event.stopPropagation();
    this.currentLanguage = lang;
    this.dropdownOpen = false;
  }

  // ✅ دوال modal تواصل معنا (بقت كما هي)
  openContactModal() {
    this.showContactModal = true;
  }

  closeContactModal() {
    this.showContactModal = false;
  }

  // ✅ الذهاب لصفحة الشركات
  goToCompanies() {
    if (this.router.url === '/Home') {
      this.scroller.scrollToAnchor('companies');
    } else {
      this.router.navigate(['/Home']).then(() => {
        setTimeout(() => this.scroller.scrollToAnchor('companies'), 300);
      });
    }
  }

  // ✅ إغلاق Dropdown عند الضغط خارجه
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.dropdownOpen = false;
  }
}