import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from 'src/service/auth-service.service';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
  
export class AuthentificationComponent implements OnInit{
passwordCon: any;
emailCon: any;
passwordConf: any;
nom: any;
 
  constructor(
    private authservice: AuthServiceService, 
    private route: Router
  ){}
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
  image: string = "";
  

 //méthodes
  afficherBloc1: boolean = true;

  basculerBlocs() {
    this.afficherBloc1 = !this.afficherBloc1;
  }

  ngOnInit(): void {

   
  }
//fonction conection
   login() {
      console.log(this.email, this.password);
      if (this.email == '' || this.password == '') {
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
          text: 'Veillez saissir un email valide',
          showConfirmButton: true,
        });
      } else {
        let user = {
          email: this.email,
          password: this.password,
        };
  
        let response: any;
        this.authservice.register(user).subscribe(
          (rep) => {
            response = rep;
            console.log(response);
            if (response) {
              // console.log ("C'est bon");
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '',
                text: response.message,
                showConfirmButton: true,
              });
  
              this.route.navigate(['/accueil']); 
  
              // this.iscorrectValues = true; //Les données fournies sont correctes
            } else {
            
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: '',
                text: 'Veillez saissir un email valide',
                showConfirmButton: true,
              });
            }
          },
          (error) => {
            // this.iscorrectValues = false;
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
      }
    }

  register() {
    console.log(this.groupe_sanguin)
  console.log( this.prenom, this.nom, this.telephone,   this.email, this.password, this.adresse, this.groupe_sanguin, this.cni, this.sexe, this.image );
  if ( this.nom == '' ||  this.prenom== '' || this.telephone== '' ||  this.email == '' || this.password == '' || this.adresse=='' ||this.groupe_sanguin=='' || this.sexe=='' || this.cni=='' ||  this.image=='' ) {
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
      text: 'Veillez saissir un email valide',
      showConfirmButton: true,
    });
  } else {
    let user = {
      name:this.nom,
      prenom:this.prenom,
      telephone: this.telephone,
      adresse: this.adresse,
      email: this.email,
      password: this.password,
      cni: this.cni,
      groupe_sanguin: this.groupe_sanguin,
      sexe: this.sexe,
      image: this.image,
    };

    
    this.authservice.register(user).subscribe(
      (rep) => {
        
        console.log(rep);
        
          // console.log ("C'est bon");
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '',
            text:'felicitation',
            showConfirmButton: true,
          });

          this.route.navigate(['/auth']); // Redirection vers l'auth concerné
        
      },
      (error) => {
        // this.iscorrectValues = false;
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
  }
}
}






  
  






