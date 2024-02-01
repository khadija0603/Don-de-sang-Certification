import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from 'src/service/auth-service.service';
import { Observable, of } from 'rxjs';
import { url } from 'src/app/models/apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
  
export class AuthentificationComponent implements OnInit{
onChangeFile() {
throw new Error('Method not implemented.');
}
passwordCon: any;
emailCon: any;
passwordConf: any;
nom: any;
authDonateur: any;
 
  constructor(private authservice: AuthServiceService, private route: Router,private http:HttpClient) { }
  //variable
  email:string = "";
  password:string="";
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

  ngOnInit(): void {

  }

    login() {
    let user = {
      "email": this.email,
      "password": this.password
    };

    if (this.email === 'khadijambengue96@gmail.com' && this.password === 'password') {
      // Connexion en tant qu'admin
      // alert('Ok');
      this.authservice.login(user).subscribe(
        (response:any) => {
          console.log(response.token);

          this.authservice.isAuthenticated = true;

          localStorage.setItem('userOnline', JSON.stringify(response));
          localStorage.setItem('token', JSON.stringify(response.token));
          this.route.navigate(['/admin']);
        },
        (err:any) => {
          let message = err.error.error;
          console.warn(err);
          // this.alertMessage("error", "Oops...", message);
        }
      );
    } else {
      if(this.email===user.email && this.password===user.password){
        // Connexion en tant que structure de sante
      // alert('Ok');
      this.authservice.loginStructureDeSante(user).subscribe(
        (response:any) => {
          console.log(response);

          this.authservice.isAuthenticated = true;

          localStorage.setItem('userOnline', JSON.stringify(response));
          this.route.navigate(['/structure-de-sante']);
        },
        (err:any) => {
          let message = err.error.error;
          console.warn(err);
          // this.alertMessage("error", "Oops...", message);
        }
      );
      }
      else {
        
         this.authservice.loginDonateur({ email:user.email,password:user.password}).subscribe(
        (response: any) => {
          console.log(response);
          // this.authservice.isAuthenticated = true;
          
           this.route.navigate(['/donneur/annonce-donneur']);
          // localStorage.setItem('userOnline', JSON.stringify(response));
          // if (response.original.statusCode == 200) {
          // } else {
          //   console.log(response.orignal.statusCode);
          // }
        },
      
      );

      }
    }
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
    // let user = {
    //   name:this.nom,
    //   prenom:this.prenom,
    //   telephone: this.telephone,
    //   adresse: this.adresse,
    //   email: this.email,
    //   password: this.password,
    //   cni: this.cni,
    //   groupe_sanguin: this.groupe_sanguin,
    //   sexe: this.sexe,
    //   image:this.image ,
    // };
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
