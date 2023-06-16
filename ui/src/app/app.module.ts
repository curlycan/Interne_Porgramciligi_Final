import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AdminIlanComponent } from './components/admin/admin-ilan/admin-ilan.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { IlanDialogComponent } from './components/dialogs/ilan-dialog/ilan-dialog.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { SafeHTMLPipe } from './pipes/safeHtml-pipe.pipe';
import { AlertService } from './services/alert.service';
import { ApiService } from './services/api.service';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AuthGuard';
import { IlanComponent } from './components/ilan/ilan.component';
import { KategoriComponent } from './components/Kategori/Kategori.component';
import { UyeilanComponent } from './components/uyeilan/uyeilan.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    IlanComponent,
    KategoriComponent,
    UyeilanComponent,

    //admin
    AdminComponent,
    AdminIlanComponent,
    AdminKategoriComponent,
    AdminUyeComponent,

    //dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    IlanDialogComponent,
    SafeHTMLPipe


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    IlanDialogComponent


  ],
  providers: [AlertService,ApiService,SafeHTMLPipe,AuthGuard,
  { provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
