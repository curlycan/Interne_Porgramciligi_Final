import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { Yorum } from 'src/app/models/Yorum';
import { ilan } from 'src/app/models/ilan';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ilan',
  templateUrl: './ilan.component.html',
  styleUrls: ['./ilan.component.css']
})
export class IlanComponent implements OnInit {
ilanId:number;
ilan:ilan;
yorumlar:Yorum[];
  constructor(
    public apiservis: ApiService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p['ilanId']){
        this.ilanId=Number(p['ilanId']);
        this.ilanById();
        this.ilanYorumListe();

      }
    });
  }

  ilanById(){
this.apiservis.ilanById(this.ilanId).subscribe((d:ilan)=>{
  this.ilan=d;
  this.ilanOkunduYap();
});
  }
  ilanOkunduYap(){
    this.ilan.Okunma+=1;
    this.apiservis.ilanDuzenle(this.ilan).subscribe;
  }

  ilanYorumListe(){
    this.apiservis.YorumListeByilanId(this.ilanId).subscribe((d:Yorum[])=>{
      this.yorumlar=d;

    });
  }

  YorumEkle(yorumMetni:string){
    var yorum: Yorum= new Yorum();
    var uyeId:number=parseInt(localStorage.getItem("uid"));
    yorum.ilanId=this.ilanId;
    yorum.UyeId=uyeId;
    yorum.YorumIcerik=yorumMetni;
    yorum.Tarih=new Date();

    this.apiservis.YorumEkle(yorum).subscribe((d:Sonuc)=>{
      if(d.islem){
        this.ilanYorumListe();
      }

    })
    

  }
}
