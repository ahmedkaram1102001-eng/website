import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  menuOpen = false;
  currentLanguage = 'العربية';
  dropdownOpen = false;
  showContactModal = false;

  isAdmin = false;
  currentUser: any = null;

  constructor(private router: Router, private scroller: ViewportScroller) {}

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.isAdmin = this.currentUser.role === 'admin';
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  setLanguage(lang: string, event: Event) {
    event.stopPropagation();
    this.currentLanguage = lang;
    this.dropdownOpen = false;
  }

  openContactModal() {
    this.showContactModal = true;
  }

  closeContactModal() {
    this.showContactModal = false;
  }

  goToCompanies() {
    if (this.router.url === '/Home') {
      this.scroller.scrollToAnchor('companies');
    } else {
      this.router.navigate(['/Home']).then(() => {
        setTimeout(() => this.scroller.scrollToAnchor('companies'), 300);
      });
    }
  }

  reloadHome() {
    if (this.router.url === '/Home') {
      window.location.reload();
    } else {
      this.router.navigate(['/Home']);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.dropdownOpen = false;
  }
}
