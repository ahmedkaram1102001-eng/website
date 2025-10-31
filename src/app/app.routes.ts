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

import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Products } from './products/products';
import { NgModule } from '@angular/core';
import { Login } from './login/login';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
// ✅ الاسم الصحيح
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'Home', component: Home },
    { path: 'About', component: About },
    { path: 'Products', component: Products },
    // ✅ استخدام الاسم الصحيح
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

