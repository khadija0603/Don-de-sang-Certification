import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from 'src/service/auth-service.service';
import { Observable, of } from 'rxjs';
import { url } from 'src/app/models/apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/service/token.service';
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
  
export class AuthentificationComponent implements OnInit{
   ngOnInit(): void {
  }
onChangeFile() {
}
passwordCon: any;
emailCon: any;
passwordConf: any;
nom: any;
authDonateur: any;

email!: any;
password!: any;
  
  constructor(private authservice: AuthServiceService, private route: Router, private http: HttpClient,
  private tS: TokenService) { }
  //variable
  name:string="";
  telephone: string = '';
  prenom:string="";
  adresse:string="";
  cni:string="";
  groupe_sanguin:string="";
  sexe:string="";
  image: File | undefined;

 //méthodes
  afficherBloc1: boolean = true;

  basculerBlocs() {
    this.afficherBloc1 = !this.afficherBloc1;
  }
 
login() {
  let user = {
    email: this.email,
    password: this.password
  };

  if (this.email === 'khadijambengue96@gmail.com' && this.password === 'password') {
    this.authservice.login(user).subscribe(
      (response: any) => {
        console.log(response.token);
        this.authservice.isAuthenticated = true;
        localStorage.setItem('userOnline', JSON.stringify(response));
        // localStorage.setItem('token', response.token);
        this.tS.saveToken(response.token);
        this.route.navigate(['/admin']);
      },
      (err: any) => {
        console.warn(err);
      }
    );
  } else {
    if (this.email === 'structureS@gmail.com' && this.password === user.password) {
      this.authservice.loginStructureDeSante(user).subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem('userOnline', JSON.stringify(response));
          this.route.navigate(['/structure-de-sante']);
        },
        (err: any) => {
          console.warn(err);
        }
      );
    } else if (this.email === user.email && this.password === user.password) { // Utilisez "else if" ici
      this.authservice.loginDonateur(user).subscribe(
        (response: any) => {
          console.log(response);
          this.authservice.isAuthenticated = true;
          localStorage.setItem('userOnline', JSON.stringify(response));
          this.route.navigate(['/donneur/annonce-donneur']);
        },
        (err: any) => {
          console.warn(err);
        }
      );
    }
  }
}


//   login(){
//   const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

//   if (this.email == "" || this.password == "") {
//     this.verifierChamps("Desole", "Veuillez remplir tous les champs", "error");
//   } else if (!this.email.match(emailPattern)) {
//     this.verifierChamps("desole", "l'email n'est pas valide", "error");
//   } else if (this.password.length < 5) {
//     this.verifierChamps("desole", "Le mot de passe doit être supérieur ou égal à 5", "error");
//   } else {
//     // console.log(this.email),
//     //   console.log(this.password);
 
//     const user = new FormData();
//     user.append('email', this.email);
//     user.append('password', this.password);

//     this.authservice.login(user).subscribe(
//       (response:any) => {
//         // Stockez le token dans un service ou dans le stockage local (localStorage).
//         console.log("la reponse est ",response)
//         console.log("user est ",response.user)
//         console.log("ma reponse", response);
//         console.log(response.user.role_id)
//         localStorage.setItem('token', response.token)
//         localStorage.setItem('userOnline', JSON.stringify(response.user));
//         if(response.token){
          
//           this.verifierChamps("success", "", `${response.message}`);
          
//           if (response.user.role_id ==1) {
            
//             this.route.navigate(['/admin']);
            
//           }else if(this.email === 'structure-sante@gmail.com' ){
//             this.route.navigate(['/structure-de-sante'])
//           }
//           else if (response.user.role_id==2) {
//                this.route.navigate(['/donneur/annonce-donneur']);
//             }
//           else{
//             this.verifierChamps('error','Oops', 'Ce compte n\'existe pas')
//           }
//           }
//         // this.route.navigate(['/accueil'])
//       },
     
//     );
//   }
// }
  
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
  // INSCRIPTION
  register() {
    console.log(this.groupe_sanguin)
  console.log( this.prenom, this.name, this.telephone,   this.email, this.password, this.adresse, this.groupe_sanguin, this.cni, this.sexe, this.image );
  if ( this.name == '' ||  this.prenom== '' || this.telephone== '' ||  this.email == '' || this.password == '' || this.adresse=='' ||this.groupe_sanguin=='' || this.sexe=='' || this.cni=='' ) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '',
      text: 'Veillez remplir les champs',
      showConfirmButton: true,
    });
  } else if (this.email.endsWith('@') || !this.email.includes('.')) {
    // Vérifie si l'email se termine juste par @
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '',
      text: 'Veuillez saissir un email valide',
      showConfirmButton: true,
    });
  } else {
   const formData = new FormData();

formData.append("image", this.image as unknown as Blob);
formData.append("name", this.name);
formData.append("prenom", this.prenom);
formData.append("adresse", this.adresse);
formData.append("telephone", this.telephone);
formData.append("email", this.email);
formData.append("password", this.password);
formData.append("groupe_sanguin", this.groupe_sanguin);
formData.append("sexe", this.sexe);
    formData.append("cni", this.cni);

    console.log(formData);
this.authservice.register(formData).subscribe(
  (rep: any) => {
    console.log(rep);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '',
      text: 'Félicitations',
      showConfirmButton: true,
    });
    this.route.navigate(['/auth']); // Redirection vers l'auth concerné
  },
  (error: any) => {
    console.log(error);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '',
      text: 'Les informations sont incorrectes',
      showConfirmButton: true,
    });
  }
  );
  // alertMessage(icon: any, title: any, text: any) {
  //   Swal.fire({
  //     icon: icon,
  //     title: title,
  //     text: text,
  //   });
  }
  }
 getFile(event: any) {
  console.warn(event.target.files[0]);
  this.image = event.target.files[0] as File;
 }
}

class Login {
  constructor(
    email: any, password: any
  ) {}
}