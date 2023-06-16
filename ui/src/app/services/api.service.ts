import { Yorum } from './../models/Yorum';
import { Uye } from './../models/Uye';
import { ilan } from '../models/ilan';
import { Kategori } from './../models/Kategori';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sonuc } from '../models/Sonuc';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:63192/api";

  constructor(
    public http: HttpClient
  ) { }

  /*   Oturum İşlemleri Başla  */
  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler: any[]) {
    var sonuc: boolean = false;
    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYekileri"));
  
    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
        }
      });
    }
  
    return sonuc;
  }
  

  /*   Oturum İşlemleri Bitiş  */


  /*  API  */

  KategoriListe() {
    return this.http.get<Kategori[]>(this.apiUrl + "/kategoriliste");
  }
  KategoriById(katId: number) {
    return this.http.get<Kategori>(this.apiUrl + "/kategoribyid/" + katId);
  }
  KategoriEkle(kat: Kategori) {
    return this.http.post<Sonuc>(this.apiUrl + "/kategoriekle", kat);
  }
  
  KategoriDuzenle(kat: Kategori) {
    return this.http.put<Sonuc>(this.apiUrl + "/kategoriduzenle", kat);
  }
  
  KategoriSil(katId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "/kategorisil/" + katId);
  }

  ilanListe() {
    return this.http.get<ilan[]>(this.apiUrl + "/ilanliste/");
  }
  ilanListeSonEklenenler(s: number) {
    return this.http.get<ilan[]>(this.apiUrl + "/ilanlistesoneklenenler/" + s);
  }
  ilanListeByKatId(katId: number) {
    return this.http.get<ilan[]>(this.apiUrl + "/ilanlistebykatid/" + katId);
  }
  ilanListeByUyeId(uyeId: number) {
    return this.http.get<ilan[]>(this.apiUrl + "/ilanlistebyuyeid/" + uyeId);
  }
  ilanById(ilanId: number) {
    return this.http.get<ilan>(this.apiUrl + "/ilanbyid/" + ilanId);
  }
  ilanEkle(ilan: ilan) {
    return this.http.post<Sonuc>(this.apiUrl + "/ilanekle", ilan);
  }
  ilanDuzenle(ilan: ilan) {
    return this.http.put<Sonuc>(this.apiUrl + "/ilanduzenle", ilan);
  }
  ilanSil(ilanId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "/ilansil/" + ilanId);
  }

  UyeListe() {
    return this.http.get(this.apiUrl + "/uyeliste");
  }
  UyeById(uyeId: number) {
    return this.http.get<Uye>(this.apiUrl + "/uyebyid/" + uyeId);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "/uyeekle", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "/uyeduzenle", uye);
  }
  UyeSil(uyeId: number) {
    return this.http.delete(this.apiUrl + "/uyesil/" + uyeId);
  }

  YorumListe() {
    return this.http.get(this.apiUrl + "/yorumliste");
  }
  YorumListeByUyeId(uyeId: number) {
    return this.http.get(this.apiUrl + "/yorumlistebyuyeid/" + uyeId);
  }
  YorumListeByilanId(ilanId: number) {
    return this.http.get<Yorum[]>(this.apiUrl + "/yorumlistesoneklenenler/" + ilanId);
  }
  YorumListeSonEklenenler(s: number) {
    return this.http.get(this.apiUrl + "/yorumliste/" + s);
  }
  YorumById(yorumId: number) {
    return this.http.get(this.apiUrl + "/yorumbyid/" + yorumId);
  }
  YorumEkle(yorum: Yorum) {
    return this.http.post<Sonuc>(this.apiUrl + "/yorumekle", yorum);
  }
  YorumDuzenle(yorum: Yorum) {
    return this.http.put(this.apiUrl + "/yorumduzenle", yorum);
  }
  YorumSil(yorumId: number) {
    return this.http.delete(this.apiUrl + "/yorumsil/" + yorumId);
  }
}
