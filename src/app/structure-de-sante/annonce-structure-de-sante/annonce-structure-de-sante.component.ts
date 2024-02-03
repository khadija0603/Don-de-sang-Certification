import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/service/annonce.service';


@Component({
  selector: 'app-annonce-structure-de-sante',
  templateUrl: './annonce-structure-de-sante.component.html',
  styleUrls: ['./annonce-structure-de-sante.component.css']
})
export class AnnonceStructureDeSanteComponent implements OnInit {
[x: string]: any;
  annonce: any[] =[];
  jour:string = "";
  heure:string="";
  lieu:string="";
  statut: string = '';
  id: any = [];
  annonceList:any[] = [];
  
 
  annonceData: any = {

  };
  updatedData: any;
   dtOptions: DataTables.Settings = {};
   

  constructor(private annonceService: AnnonceService,private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAnnonces();
    const script = document.createElement('script');
    script.src = '../../../assets/script/sidebar.js';
    document.body.appendChild(script);
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength:4,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
  }

loadAnnonces(): void {
  this.annonceService.getAnnonces().subscribe(
    (data) => {
      console.log(data);
      
      this.annonce = data.data.data;
      console.log('Les annoces à afficher', this.annonce);
      
    },
    (error: any) => {
      console.error('Erreur lors du chargement des annonces :', error);
    }
  );
}


  addAnnonce(): void {
    let annonce = {
      jour:this.jour,
       heure:this.heure,
      lieu:this.lieu,
      statut: this.statut,
    }

    this.annonceService.createAnnonce(this.annonce).subscribe(
      (response:any) => {
        console.log('Annonce ajoutée avec succès :', response);
        this.loadAnnonces(); // Rechargez la liste après l'ajout
      },
      (error:any) => {
        console.error('Erreur lors de l\'ajout de l\'annonce :', error);
      }
    );
  }

  updateAnnonce(): void {
    this.annonceService.updateAnnonce(this.id, this.updatedData).subscribe(
      (response:any) => {
        console.log('Annonce mise à jour avec succès :', response);
        this.loadAnnonces(); // Rechargez la liste après la mise à jour
      },
      (error:any) => {
        console.error('Erreur lors de la mise à jour de l\'annonce :', error);
      }
    );
  }

  deleteAnnonce(id: number): void {
    this.annonceService.deleteAnnonce(id).subscribe(
      (response:any) => {
        console.log('Annonce supprimée avec succès :', response);
        this.loadAnnonces(); // Rechargez la liste après la suppression
      },
      (error: any) => {
        console.error('Erreur lors de la suppression de l\'annonce :', error);
      }
    );
  }
}




