import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/service/annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annonce-donneur',
  templateUrl: './annonce-donneur.component.html',
  styleUrls: ['./annonce-donneur.component.css']
})
export class AnnonceDonneurComponent implements OnInit{
 constructor(
    private annonceService: AnnonceService, private http: HttpClient) { }
  


  ngOnInit() {
    this.annonceService.getAnnonces().subscribe(
      (response) => {
        console.log('la réponse est :', response);
        this.annonce = response.data;
        console.log('la liste des annonces', this.annonce);
      }
    );
  }
  
listChoice: any;

  listeAnnonces: any;
  listeParticipants: any;
filteredElement: any;
  updateAnnonce() {
  }
  // annonce: any;
  annonce: any[] = [];
  jour: string = "";
  heure: string = "";
  lieu: string = "";
  statut: string = '';
  id: any = [];
  annonceList: any[] = [];
 
  // Methode pour faire un don :
  faireDon(idDon: any) {
    console.warn(idDon);
    
    this.annonceService.participerAnnonce(idDon).subscribe(
      (response: any) => {
        console.warn(response);
        console.warn(response.details.promesse_don.id); //L'identifiant de la promesse qui a ete enregistré
        // Swal.fire({
        //   title: "",
        //   icon: "success",
        //   text: response.message,
        // })
        Swal.fire({
          title: "Merci de vous etes enregistré pour faire ce don",
          text: "Veuillez confirmer votre promesse de don",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Annuler",
          confirmButtonText: "Confirmer"
        }).then((result) => {
          if (result.isConfirmed) {
            let idDonAConf = response.details.promesse_don.id; 
            this.annonceService.confirmer(idDonAConf).subscribe((response) => {
              console.warn(response);
              Swal.fire({
                title: "👏",
                text: "Participation confirmée avec succès, Merci d'etre un Heros❤",
                icon: "success"
              })
            });
          }
        });
      },
      (erreur: any) => {
        console.warn("L'erreur reçue");
        console.warn(erreur);
        Swal.fire({
          title: "Impossible",
          icon: "error",
          text: erreur.error.message,
        }

        )
        
      }
    )
  }


 

  // Nouvelle méthode pour récupérer les participants
  getParticipants() {
    this.annonceService.getParticipants(this.selectedAnnonce).subscribe(
      (response) => {
        console.log('Liste des participants :', response);
        // Mettez à jour votre variable de participants ici
        this.listeParticipants = response.data;
      },
      (error) => {
        // Traiter l'erreur
      }
    );
  }
  selectedAnnonce(selectedAnnonce: any) {
  }
  

  

    // Attribut pour la pagination
   annonceParPage = 3; // Nombre d'annonce par page
  pageActuelle = 1; // Page actuelle
  
  // Méthode pour déterminer les articles à afficher sur la page actuelle
    getArticlesPage(): any[] {
      const indexDebut = (this.pageActuelle - 1) * this.annonceParPage;
      const indexFin = indexDebut + this.annonceParPage;
      return this.annonce.slice(indexDebut, indexFin);
    }
// Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.annonce.length / this.  annonceParPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.annonce.length / this.  annonceParPage);
  }
        
}

