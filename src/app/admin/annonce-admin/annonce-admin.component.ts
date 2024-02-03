import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/service/annonce.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-annonce-admin',
  templateUrl: './annonce-admin.component.html',
  styleUrls: ['./annonce-admin.component.css']
})
export class AnnonceAdminComponent implements OnInit {
pages: any;
totalPages: any;
  listeAnnonces: any;
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
  dtOptions: DataTables.Settings = {};
  updatedData: any;

  constructor(
    private annonceService: AnnonceService, private http: HttpClient) { }


  ngOnInit() {
  
    this.updateAnnonce();
    const script = document.createElement('script');
    script.src = '../../../assets/script/sidebar.js';
    document.body.appendChild(script);
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 4,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
  

    // liste annonce
    // this.annonceService.getAnnonces().subscribe(
    //   (annonce) => {
    // Afficher la liste des annonce
    //   console.log(annonce);
    //   this.annonce = annonce.data;

    //   console.log('la liste des annonces', this.annonce);
    // },

    // (error) => {
    // Traiter l'erreur de liste
    //     }
    //   );
    //  }
    
    this.annonceService.getAnnonces().subscribe(
      (response) => {
        console.log('la réponse est :', response);
        // Vérifiez si response.data est un tableau
        if (Array.isArray(response.data.data)) {
          this.annonce = response.data.data;
          console.log('la liste des annonces', this.annonce);
        } else {
          console.error('Erreur: response.data n\'est pas un tableau');
        }
      },
      (error) => {
        // Traiter l'erreur de liste
      }
    );

  }


      annoncesParPage = 8; // Nombre d'articles par page
     pageActuelle = 1; // Page actuelle

  
  // / pagination
  
  getAnnoncesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.annoncesParPage;
    const indexFin = indexDebut + this.annoncesParPage;
    return this.listeAnnonces.slice(indexDebut, indexFin);
  }
     // Méthode pour générer la liste des pages
     getPages(): number[] {
      const totalPages = Math.ceil(this. listeAnnonces.length / this.annoncesParPage);
      return Array(totalPages).fill(0).map((_, index) => index + 1);
    }
  
    // Méthode pour obtenir le nombre total de pages
    getTotalPages(): number {
      return Math.ceil(this. listeAnnonces.length / this.annoncesParPage);
    }


}
function getArticlesPage() {
  throw new Error('Function not implemented.');
}

