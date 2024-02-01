import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureSante } from 'src/service/modeles/models/structureSante.model';
import { StructureSanteService } from 'src/service/structure-sante.service';

@Component({
  selector: 'app-structure-de-sante-admin',
  templateUrl: './structure-de-sante-admin.component.html',
  styleUrls: ['./structure-de-sante-admin.component.css']
})
export class StructureDeSanteAdminComponent implements OnInit{

getFile($event: Event) {
throw new Error('Method not implemented.');
}
onChangeFile() {
throw new Error('Method not implemented.');
}
  // Attributs:
  name: string = "";
  email:string = "";
  telephone: string = '';
  adresse:string="";
  image: string = "";
  password: any;

  constructor(private structureService : StructureSanteService, private route: Router,private http:HttpClient) { }
  

    ngOnInit(): void {
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
        console.log(response);
      });
        }

  }

