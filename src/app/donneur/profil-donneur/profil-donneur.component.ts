import { Component, OnInit } from '@angular/core';
import { ProfilService } from 'src/service/profil.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profil-donneur',
  templateUrl: './profil-donneur.component.html',
  styleUrls: ['./profil-donneur.component.css']
})
export class ProfilDonneurComponent implements OnInit{
  name: string = '';
  email: string = '';
  telephone: string = '';
  image: string = '';
  adresse: string = '';
  prenom: string = '';
  cni: string = '';
  groupe_sanguin: string = '';
  sexe: string = '';
  ngOnInit(): void {
    const userString = JSON.parse(localStorage.getItem('userOnline')||'[]');
    console.log('le user',userString.donateur);
    if (userString) {
      const user = userString;
      this.name = userString.donateur.name;
      this.email = userString.donateur.email;
      this. telephone = userString.donateur.telephone;
      // this. image = userString.donateur.image;
      this. adresse = userString.donateur.adresse;
      this. cni = userString.donateur.cni;
      this. prenom = userString.donateur.prenom;
      this. groupe_sanguin = userString.donateur.groupe_sanguin;
      this. sexe = userString.donateur.sexe;
    }
    console.log(this.name);
  }
}




