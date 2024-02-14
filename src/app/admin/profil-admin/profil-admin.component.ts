import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
  
export class ProfilAdminComponent implements OnInit {

   name: string = '';
  prenom: string = '';
  role_id: string = '';
  email: string = '';
  telephone: string = '';
  ville: string = '';
  groupe_sanguin: string = '';
  image: string = '';

  ngOnInit(): void {
    const userString = JSON.parse(localStorage.getItem('userOnline')||'[]');
    console.log('le user',userString.user);
    if (userString) {
      const user = userString;
      this.name = userString.user.name;
      this.prenom = userString.user.prenom;
      this.role_id = userString.user.role_id;
      this.email = userString.user.email;
      this.  groupe_sanguin = userString.user. groupe_sanguin;
      this. telephone = userString.user.telephone;
      this. ville = userString.user.ville;
      this.image = userString.user.image;
    }
    console.log(this.name);
  }

 

 

}
