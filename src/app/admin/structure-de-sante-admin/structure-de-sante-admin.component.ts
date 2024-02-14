import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureSante } from 'src/service/modeles/models/structureSante.model';
import { StructureSanteService } from 'src/service/structure-sante.service';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { structureSante } from 'src/app/models/structure-sante';

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

onChangeFile() {
}
  // Attributs:
  name: string = "";
  email:string = "";
  telephone: string = '';
  adresse:string="";
  image!: File;
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
      this.getStructure()
  
    }
  
    getStructure(): void {
    this.structureService.listerstructures().subscribe((data :any)=>{
        this.structureList = data.data;
        console.log("les structures sont là :", this.structureList);
    });
    }
  getFile(event: any) {
  console.warn(event.target.files[0]);
  this.image= event.target.files[0] as File ;
}

  ajoutStructureSante(){
     if( this.name=='' || this.email=='' || this.telephone=='' || this.image || this.adresse=='' ){
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
        console.log(response);
      });
    
    
   }


  // annonceObejt: any;
  structureSelectionner:any;
  chargerInfosTest(structureSante: any) {
    this.structureSelectionner = structureSante.id;
    console.log('esxrcdftygu', this.structureSelectionner);
    this.name = structureSante.name;
    this.adresse = structureSante.adresse;
    this.telephone = structureSante.telephone;
    this.email = structureSante.email;
  }
  // fonction pour modifier
  modifierAnnonce() {
    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('image', this.image);
    formData.append('password', this.password);
    formData.append('adresse', this.adresse);
    formData.append('telephone', this.telephone);
    formData.append('email', this.email);
    console.log(FormData);
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière après cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#017D03',
      cancelButtonColor: '#FF9C00',
      confirmButtonText: 'Oui, modifie!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.structureService
          .updateStructure(this.structureSelectionner, formData).subscribe((response:any) => {
            console.log('je suis response', response);
            this.structureService.verifierChamp(
              '!!!!',
              response.status_message,
              'success'
            );
              if (response.status_code == 200) {
                this.viderChamp();
                this.getAllStructure();
                this.ngOnInit();
                // const modalElement: HTMLElement | null =
                //   document.getElementById('modifie');
                // modalElement!.style.display = 'none';
              } else {
                this.structureService.verifierChamp(
                  '!!!!',
                  response.status_message,
                  'success'
                );
              }
              // this.getAllAnnonce();
            });
            this.ngOnInit();
            // window.location.reload();
      }
      console.log('je suis data', formData);
    });


  }
  getAllStructure() {}
  viderChamp() { }
  bloquerStructure(id: number): void{
    this.structureService.bloquerStructure(id).subscribe((respons) => {
      console.log("bloquer  naa", respons);
    })
  }


    
 }
  
  
  

