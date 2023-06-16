import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';
import { KategoriDialogComponent } from '../../dialogs/kategori-dialog/kategori-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-admin-kategori',
  templateUrl: './admin-kategori.component.html',
  styleUrls: ['./admin-kategori.component.css']
})
export class AdminKategoriComponent implements OnInit {
kategoriler: Kategori[];
dataSource: any;
displayedColumns= ['KategoriAdi','KatIlanSay','detay',]
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
dialogRef:MatDialogRef <KategoriDialogComponent>
dialogRefConfirm:MatDialogRef <ConfirmDialogComponent>

  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.KategoriListe();
  }

    KategoriListe(){
      this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
        this.kategoriler= d;
        this.dataSource= new MatTableDataSource(d);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      })
    }

    Ekle(){
      var yeniKayit:Kategori=new Kategori();
      this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
        width:'400px',
        data:{
          kayit:yeniKayit,
          islem: 'ekle'
        } 

      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if(d){
          this.apiServis.KategoriEkle(d).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if(s.islem){
              this.KategoriListe();
            }
          })
        }
      });
    }

    Duzenle(kayit:Kategori){
   
      this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
        width:'400px',
        data:{
          kayit:kayit,
          islem: 'duzenle'
        } 

      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if(d){
          kayit.KategoriAdi=d.KategoriAdi;
          this.apiServis.KategoriDuzenle(kayit).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if(s.islem){
              this.KategoriListe();
            }
          });
        }
      });
 
    }

    Sil(kayit:Kategori){
      this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent,{
        width:'400px',
      });
      this.dialogRefConfirm.componentInstance.dialogMesaj=kayit.KategoriAdi+" Kategorisi Silinecektir Onaylıyor musunuz ?";

      this.dialogRefConfirm.afterClosed().subscribe(d=>{
        if(d){
          this.apiServis.KategoriSil(kayit.KategoriId).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if(s.islem){
              this.KategoriListe();
            }
          });
        }
      });
    }
}
