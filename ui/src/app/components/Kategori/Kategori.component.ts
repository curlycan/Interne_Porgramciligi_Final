import { Kategori } from './../../models/Kategori';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ilan } from 'src/app/models/ilan';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-Kategori',
  templateUrl: './Kategori.component.html',
  styleUrls: ['./Kategori.component.css']
})
export class KategoriComponent implements OnInit {
ilanlar:ilan[];
katId:number;
kat:Kategori;
  constructor(
    public apiservis: ApiService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p['kategoriId']) {
        this.katId = Number(p['kategoriId']); // Kategori ID'sini number olarak alın
        this.KategoriById();

        this.ilanListeByKatId();
      }
    });
  }
  KategoriById(){
    this.apiservis.KategoriById(this.katId).subscribe((d:Kategori)=>{
      this.kat=d;
    })

  }
  ilanListeByKatId(){
    this.apiservis.ilanListeByKatId(this.katId).subscribe((d:ilan[])=> {
this.ilanlar=d;
    });
  }
 
}