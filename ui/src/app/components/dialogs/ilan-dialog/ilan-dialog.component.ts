import { Kategori } from 'src/app/models/Kategori';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ilan } from 'src/app/models/ilan';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ilan-dialog',
  templateUrl: './ilan-dialog.component.html',
  styleUrls: ['./ilan-dialog.component.css']
})
export class IlanDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:ilan;
  islem:string;
  frm:FormGroup;
  kategoriler:Kategori[];
  Jconfig= {};

  constructor(
    public dialogRef:MatDialogRef<IlanDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public apiServis: ApiService
  ) { 
    this.islem=data.islem;

    if(this.islem=="ekle"){
      this.dialogBaslik="İlan Ekle"
      this.yeniKayit=new ilan();
    }
    if(this.islem=="duzenle"){
      this.dialogBaslik="İlan Düzenle"
      this.yeniKayit=data.kayit;
    }
    if(this.islem=="detay"){
      this.dialogBaslik="İlan Detay"
      this.yeniKayit=data.kayit;
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
    this.KategoriListe();
  }

  FormOlustur(){
    return this.frmBuild.group({
      Baslik: [this.yeniKayit.Baslik],
      KategoriId: [this.yeniKayit.KategoriId]

    })
  }

  KategoriListe(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler= d;
      
   
    })
  }
}
