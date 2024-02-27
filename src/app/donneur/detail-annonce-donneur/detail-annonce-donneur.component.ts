import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/service/annonce.service';
import { AuthServiceService } from 'src/service/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-annonce-donneur',
  templateUrl: './detail-annonce-donneur.component.html',
  styleUrls: ['./detail-annonce-donneur.component.css']
})
export class DetailAnnonceDonneurComponent implements OnInit {
  tabPromesse: any[] = [];
  tabPromesseConfirme: any[] = [];
  tabPromesseAttente: any[] = [];

  isPromesseConfirme: boolean = true;
  isPromesseAttente: boolean = false;

  constructor(private annonceService: AnnonceService, private authservice: AuthServiceService, private http: HttpClient, private route: Router) { }
  
  ngOnInit(): void {
    this.getPromesseUser();
  }

  showPromesseConfirme() {
    this.isPromesseConfirme = true;
    this.isPromesseAttente = false;
  }
  showPromesseAttente() {
    this.isPromesseConfirme = false;
    this.isPromesseAttente = true;
  }

  getPromesseUser() {
     this.annonceService.getPromesseParticipant().subscribe(
       (response) => {
        //  console.log("La reponnnseeeee");
        //  console.warn(response.donateurs);
         this.tabPromesse = response.donateurs;
         console.warn("Le tableau de tous les promesse: ", this.tabPromesse);
         
         //  Les promesses confirmées 
         this.tabPromesseConfirme = this.tabPromesse.filter((promesse: any) => promesse.statut == "confirmé")
         console.warn("Les promesses confirmées: ", this.tabPromesseConfirme);
         
         //  Les promesses en attente
         this.tabPromesseAttente = this.tabPromesse.filter((promesse: any) => promesse.statut == "en attente")
         console.warn("Les promesses en attentente: ", this.tabPromesseAttente);
      },
      (error) => {
       console.warn('Erreur de récupération des promesses', error);
      }
     );
  }

    confirmerPromesse(idPromesse: any) {
    this.annonceService.confirmer(idPromesse).subscribe((response) => {
      console.warn(response);
      this.getPromesseUser();
      Swal.fire({
        title: "👏",
        text: "Participation confirmée avec succès, Merci d'etre un Heros❤",
        icon: "success"
      })
    });
  }

   annonce: any[] = [];
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

 // Swal.fire({
        //   title: "",
        //   icon: "success",
        //   text: response.message,
        // })