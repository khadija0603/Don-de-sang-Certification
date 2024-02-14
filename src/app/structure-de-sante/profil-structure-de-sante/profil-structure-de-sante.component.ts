import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil-structure-de-sante',
  templateUrl: './profil-structure-de-sante.component.html',
  styleUrls: ['./profil-structure-de-sante.component.css']
})
export class ProfilStructureDeSanteComponent implements OnInit {

   name: string = '';
  role_id: string = '';
  email: string = '';
  telephone: string = '';
  image: string = '';
  ngOnInit(): void {
    const userString = JSON.parse(localStorage.getItem('userOnline')||'[]');
    console.log('le user',userString.user);
    if (userString) {
      const user = userString;
      this.name = userString.user.name;
      this.role_id = userString.user.role_id;
      this.email = userString.user.email;
      this. telephone = userString.user.telephone;
      this.image = userString.user.image;
    }
    console.log(this.name);
  }

}



