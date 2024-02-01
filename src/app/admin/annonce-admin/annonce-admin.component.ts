import { Component } from '@angular/core';
import { AnnonceService } from 'src/service/annonce.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-annonce-admin',
  templateUrl: './annonce-admin.component.html',
  styleUrls: ['./annonce-admin.component.css']
})
export class AnnonceAdminComponent {

//  constructor(
//     private annonceService : AnnonceService
//   ) {}
//   annonce :Annonce = new Annonce;


//   //declaration des tableaux
//   tabAnnonce: Annonce [] = [];


//   ngOnInit() {
//     this.afficherAnnonce();
//   }


//   verifierChamps(title: any, text: any, icon: any) {
//     Swal.fire({
//       title: title,
//       text: text,
//       icon: icon
//     });
//   }



//   //afficher annonce

//   afficherAnnonce(){
//     this.annonceService.getAlls().subscribe(data =>{
//       console.log(data);
//       this.tabAnnonce = data;
//       console.log(this.tabAnnonce);
//     })
//   }


//   /**Methode pour soumettre un projet */
//   ajouterAnnonce(){
//     // On vérifie s les informations ne sont pas vides

//   if(!this.annonce.titre){
//       this.verifierChamps("Impossible!", "Donnez une déscription", "Erreur")
//     }
//     else if(!this.annonce.image){
//       this.verifierChamps("Impossible!", "Le titre est obligatoire", "Erreur")
//     }
//     else if(!this.annonce.description){
//       this.verifierChamps("Impossible!", "Donnez une déscription", "Erreur")
//     }

//     else {
//       let objetAnnonce:Annonce = new Annonce;
//        // @ts-ignore
//         objetAnnonce.titre = this.annonce.titre;
//         objetAnnonce.description= this.annonce.description;
//         objetAnnonce.image= this.annonce.image;
//         objetAnnonce.etat= true;
//         objetAnnonce.idUser= 1;
//           objetAnnonce.createdAt= new Date();
//         objetAnnonce.createdBy= "gdgdggd";
//         objetAnnonce.updatedAt= new Date();
//         objetAnnonce.updatedBy= "gdgdgdg";


//       this.annonceService.add(objetAnnonce).subscribe(data =>{
//         // @ts-ignore
//         document.getElementById("close-btn").click();
//         console.log(data);
//         console.log("Ajouter")
//         this.verifierChamps("Felicitation!", "Projet ajouté avec success", "success")
//       })
//     }

//     this.afficherAnnonce();

//   }



}
