﻿using EmlakFinal.Models;
using EmlakFinal.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmlakFinal.Auth
{
    public class UyeService
    {
        DB01Entities db = new DB01Entities();
        public UyeModel UyeOturumAc(string kadi, string parola)
        {
            UyeModel uye = db.Uye.Where(s => s.KullaniciAdi == kadi && s.Sifre == parola).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                AdSoyad = x.AdSoyad,
                Email = x.Email,
                KullaniciAdi = x.KullaniciAdi,
                Foto = x.Foto,
                Sifre = x.Sifre,
                UyeAdmin = x.UyeAdmin
            }).SingleOrDefault();
            return uye;

        }
    }
}

