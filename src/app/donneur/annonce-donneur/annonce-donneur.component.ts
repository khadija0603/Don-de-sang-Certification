import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/service/annonce.service';

@Component({
  selector: 'app-annonce-donneur',
  templateUrl: './annonce-donneur.component.html',
  styleUrls: ['./annonce-donneur.component.css']
})
export class AnnonceDonneurComponent implements OnInit{
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

}
function getAnnoncePage() {

}
