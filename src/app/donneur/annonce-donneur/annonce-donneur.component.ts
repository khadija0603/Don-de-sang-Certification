import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/service/annonce.service';

@Component({
  selector: 'app-annonce-donneur',
  templateUrl: './annonce-donneur.component.html',
  styleUrls: ['./annonce-donneur.component.css']
})
export class AnnonceDonneurComponent implements OnInit{
listChoice: any;
supprimerAnnonceDefinitif(arg0: any[]) {
throw new Error('Method not implemented.');
}
restaurerAnnonce(arg0: any[]) {
throw new Error('Method not implemented.');
}
  pages: any;
totalPages: any;
  listeAnnonces: any;
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

  constructor(
    private annonceService: AnnonceService, private http: HttpClient) { }


  ngOnInit() {
  
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


      annonceParPage = 8; // Nombre d'articles par page
     pageActuelle = 1; // Page actuelle

  
  // / pagination
  
  getAnnoncePage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.annonceParPage;
    const indexFin = indexDebut + this.annonceParPage;
    return this.listeAnnonces.slice(indexDebut, indexFin);
  }
     // Méthode pour générer la liste des pages
     getPages(): number[] {
      const totalPages = Math.ceil(this. listeAnnonces.length / this.annonceParPage);
      return Array(totalPages).fill(0).map((_, index) => index + 1);
    }
  
    // Méthode pour obtenir le nombre total de pages
    getTotalPages(): number {
      return Math.ceil(this. listeAnnonces.length / this.annonceParPage);
    }


}
function getAnnoncePage() {

}
