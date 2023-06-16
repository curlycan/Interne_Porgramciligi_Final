import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { ilan } from 'src/app/models/ilan';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from '../../dialogs/kategori-dialog/kategori-dialog.component';
import { IlanDialogComponent } from '../../dialogs/ilan-dialog/ilan-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-ilan',
  templateUrl: './admin-ilan.component.html',
  styleUrls: ['./admin-ilan.component.css']
})
export class AdminIlanComponent implements OnInit {
  ilanlar: ilan[];
  kategoriler:Kategori[];
  secKat:Kategori;
  dataSource: any;
  katId:number;
  uyeId:number;

  displayedColumns= ['Baslik','Tarih','UyeKadi','Fiyat','Okunma','detay',]
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef:MatDialogRef <IlanDialogComponent>
  dialogRefConfirm:MatDialogRef <ConfirmDialogComponent>
  
    constructor(
      public apiServis: ApiService,
      public matDialog:MatDialog,
      public alert: AlertService,
      public route:ActivatedRoute
    ) { }
  
    ngOnInit() {
      this.KategoriListe();
      this.uyeId=parseInt(localStorage.getItem("uid"));
      this.route.params.subscribe(p=>{
        if(p['katId']){
          this.katId = p['katId'];

          this.KategoriById();
          
        }
        
      });
    }
    KategoriById(){
      this.apiServis.KategoriById(this.katId).subscribe((d:Kategori)=>{
        this.secKat=d;
        this.ilanListe();
      })
    }
  
      ilanListe(){
        this.apiServis.ilanListeByKatId(this.katId).subscribe((d:ilan[])=>{
          this.ilanlar= d;
          this.dataSource= new MatTableDataSource(d);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator=this.paginator;
        })
      }
      KategoriListe(){
        this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
          this.kategoriler= d;
          this.ilanListe();
       
        })
      }

      KategoriSec(kat:Kategori){
        this.katId= kat.KategoriId;
        this.ilanListe();
      }
  
      Ekle(){
        var yeniKayit:ilan=new ilan();
        this.dialogRef = this.matDialog.open(IlanDialogComponent,{
          width:'800px',
          data:{
            kayit:yeniKayit,
            islem: 'ekle'
          } 
  
        });
        this.dialogRef.afterClosed().subscribe(d=>{
          if(d){
            yeniKayit=d;
            yeniKayit.Foto="foto.jpg";
            yeniKayit.Tarih=new Date();
            yeniKayit.Okunma=0;
            yeniKayit.UyeId=this.uyeId;
            this.apiServis.ilanEkle(d).subscribe((s:Sonuc)=>{
              this.alert.AlertUygula(s);
              if(s.islem){
                this.ilanListe();
              }
            })
          }
        });
      }
  
      Duzenle(kayit:ilan){
     
        this.dialogRef=this.matDialog.open(IlanDialogComponent,{
          width:'800px',
          data:{
            kayit:kayit,
            islem: 'duzenle'
          } 
  
        });
        this.dialogRef.afterClosed().subscribe(d=>{
          if(d){
            
            this.apiServis.ilanDuzenle(kayit).subscribe((s:Sonuc)=>{
              this.alert.AlertUygula(s);
              if(s.islem){
                this.ilanListe();
              }
            });
          }
        });
   
      }

      Detay(kayit:ilan){
     
        this.dialogRef=this.matDialog.open(IlanDialogComponent,{
          width:'800px',
          data:{
            kayit:kayit,
            islem: 'detay'
          } 
        });
      }
  
      Sil(kayit:ilan){
        this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent,{
          width:'400px',
        });
        this.dialogRefConfirm.componentInstance.dialogMesaj=kayit.Baslik+" Başlıklı İlan  Silinecektir Onaylıyor musunuz ?";
  
        this.dialogRefConfirm.afterClosed().subscribe(d=>{
          if(d){
            this.apiServis.ilanSil(kayit.ilanId).subscribe((s:Sonuc)=>{
              this.alert.AlertUygula(s);
              if(s.islem){
                this.ilanListe();
              }
            });
          }
        });
      }
  }
  