import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminIlanComponent } from './components/admin/admin-ilan/admin-ilan.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/AuthGuard';
import { IlanComponent } from './components/ilan/ilan.component';
import { KategoriComponent } from './components/Kategori/Kategori.component';
import { UyeilanComponent } from './components/uyeilan/uyeilan.component';

const routes: Routes = [
  {
    path: '',
     component: HomeComponent
     
  },
  {
    path: 'login',
     component: LoginComponent
  },
  {
    path: 'ilan/:ilanId',
     component: IlanComponent
  },
  {
    path: 'kategori/:kategoriId',
     component: KategoriComponent
  },
  {
    path: 'uyeilan/:uyeId',
     component: UyeilanComponent
  },
  {
    path: 'admin',
     component: AdminComponent,
     canActivate: [AuthGuard],
     data : {
      yetkiler: ['Admin'],
      gerigit:'/login'
     }
  },
  {
    path: 'admin/kategori',
     component: AdminKategoriComponent,
     canActivate: [AuthGuard],
     data : {
      yetkiler: ['Admin'],
      gerigit:'/login'
     }
  },
  {
    path: 'admin/ilan', 
    component: AdminIlanComponent,
    canActivate: [AuthGuard],
    data : {
     yetkiler: ['Admin'],
     gerigit:'/login'
    }
  },
  {
    path: 'admin/ilan/:katId', 
    component: AdminIlanComponent,
    canActivate: [AuthGuard],
    data : {
     yetkiler: ['Admin'],
     gerigit:'/login'
    }
  },
  
  {
    path: 'admin/uye',
     component: AdminUyeComponent,
     canActivate: [AuthGuard],
     data : {
      yetkiler: ['Admin'],
      gerigit:'/login'
     }
     
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
