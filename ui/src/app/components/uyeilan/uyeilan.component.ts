import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kategori } from 'src/app/models/Kategori';
import { Uye } from 'src/app/models/Uye';
import { ilan } from 'src/app/models/ilan';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uyeilan',
  templateUrl: './uyeilan.component.html',
  styleUrls: ['./uyeilan.component.css']
})
export class UyeilanComponent implements OnInit {
  ilanlar:ilan[];
  uyeId:number;
  uye:Uye;
    constructor(
      public apiservis: ApiService,
      public route: ActivatedRoute,
    ) { }
  
    ngOnInit() {
      this.route.params.subscribe(p => {
        if (p['uyeId']) {
          this.uyeId = Number(p['uyeId']); // Kategori ID'sini number olarak alın
          this.UyeById();
  
          this.ilanListeByUyeId();
        }
      });
    }
    UyeById(){
      this.apiservis.UyeById(this.uyeId).subscribe((d:Uye)=>{
        this.uye=d;
      })
  
    }
    ilanListeByUyeId(){
      this.apiservis.ilanListeByUyeId(this.uyeId).subscribe((d:ilan[])=> {
  this.ilanlar=d;
      });
    }
   
  }