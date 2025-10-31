// login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onLogin();
    }
  }

  onLogin(): void {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'يرجى إدخال اسم المستخدم وكلمة المرور';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;

      // 🔥 هنا نعمل يوزرين تجريبيين
      if (this.username === 'admin' && this.password === '1234') {
        localStorage.setItem('currentUser', JSON.stringify({ username: 'admin', role: 'admin' }));
        this.router.navigate(['/Home']);
      } 
      else if (this.username === 'user' && this.password === '0000') {
        localStorage.setItem('currentUser', JSON.stringify({ username: 'user', role: 'user' }));
        this.router.navigate(['/Home']);
      } 
      else {
        this.errorMessage = 'اسم المستخدم أو كلمة المرور غير صحيحة';
      }
    }, 1000);
  }
}
