import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/service/annonce.service';
import { AuthServiceService } from 'src/service/auth-service.service';
import { StructureSanteService } from 'src/service/structure-sante.service';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css']
})
export class AccueilAdminComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  donateurList:any [] =[]
  structureList:any [] =[]
  item: any;
annonce: any;
constructor(private authservice: AuthServiceService, private route: Router,private http:HttpClient,private annonceService: AnnonceService,private structureService : StructureSanteService){}
   ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/script/sidebar.js';
    document.body.appendChild(script);
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength:5,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
     
     this.listDonateur();
     this.listeAnnonce();
     this.getStructure();
    }
     
  
  
  
  listDonateur() {
     // liste annonce
    this.authservice.listerdonateur().subscribe(
      (donateur) => {
        // Afficher la liste des donateur
        console.log(donateur);
        this.donateurList = donateur.data;

        console.log('je usi tab',this.donateurList);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }

  listeAnnonce(){
    this.annonceService.getAnnonces().subscribe(
      (response) => {
        console.log('la réponse est :', response);
        // Vérifiez si response.data est un tableau
        // if (Array.isArray(response.data.data)) {
          this.annonce = response.data;
          console.log('la liste des annonces', this.annonce);
        // } else {
        // }
      },
      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }

  getStructure(): void {
    this.structureService.listerstructures().subscribe((data :any)=>{
        this.structureList = data.data;
        console.log("les structures sont là :", this.structureList);
    });
    }
}

