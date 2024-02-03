import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureSante } from 'src/service/modeles/models/structureSante.model';
import { StructureSanteService } from 'src/service/structure-sante.service';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // Autres en-têtes nécessaires pour votre application
  })
};


@Component({
  selector: 'app-structure-de-sante-admin',
  templateUrl: './structure-de-sante-admin.component.html',
  styleUrls: ['./structure-de-sante-admin.component.css']
})
export class StructureDeSanteAdminComponent implements OnInit{

getFile($event: Event) {
}
onChangeFile() {
}
  // Attributs:
  name: string = "";
  email:string = "";
  telephone: string = '';
  adresse:string="";
  image: string = "";
  password: any;

  constructor(private structureService : StructureSanteService, private route: Router,private http:HttpClient) { }
   dtOptions: DataTables.Settings = {};
   structureList:any [] =[]
  item: any;
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
      
    //   // liste annonce
    //   this.structureService.listerStructure().subscribe(
    //     (structureSante:any) => {
       // Afficher la liste des donateur
        console.log(StructureSante);
       this.structureList = StructureSante.data;

    //     console.log(this.structureList);
    //   },

    //  (error) => {
    //     // Traiter l'erreur de liste
    //   }
    // );
  }
  ajoutStructureSante(){
     if( this.name=='' || this.email=='' || this.telephone=='' || this.image=='' || this.adresse=='' ){
    ("Veuillez renseigner tous les champs");
    }else{
      const structureSante={
        name:this.name,
        email:this.email,
        telephone:this.telephone,
      adresse:this.adresse,
       image:this.image,
       password:this.password,
      }
    } 
      let formData = new FormData();
      formData.append('name', this.name);
      formData.append('adresse', this.adresse);
      formData.append('telephone', this.telephone);
      formData.append('email', this.email);
      formData.append("image", this.image);
      formData.append("password", this.password);
      console.log(formData);
      this.structureService.ajoutStructureSante(formData).subscribe((response:any) => {
        // console.log(response);
      });
    
    
   }

    
 }
  
  
  

