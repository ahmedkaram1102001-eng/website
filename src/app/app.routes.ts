// import { RouterModule, Routes } from '@angular/router';
// import { Home } from './home/home';
// import { About } from './about/about';
// import { Products } from './products/products';
// import { NgModule } from '@angular/core';
// import { Login } from './login/login';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { AdminDashboard } from './admin-dashboard/admin-dashboard';


// export const routes: Routes = [
//      {path:'login',component: Login},
//     { path: 'Home', component: Home  },
//     { path: 'About', component: About },
//     { path: 'Products', component: Products },
//     { path: 'admin-dashboard', component: AdminDashboard },
//     { path: '', redirectTo: 'login', pathMatch: 'full' },
// ];
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }   

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// استدعاء الكمبوننتات
import { Home } from './home/home';
import { About } from './about/about';
import { Products } from './products/products';
import { Login } from './login/login';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'Home', component: Home },
  { path: 'About', component: About },
  { path: 'Products', component: Products },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  // ✅ استخدم HashLocationStrategy لتجنب 404 على GitHub Pages
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

