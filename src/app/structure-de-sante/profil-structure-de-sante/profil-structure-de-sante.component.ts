import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StructureSanteService } from 'src/service/structure-sante.service';

@Component({
  selector: 'app-profil-structure-de-sante',
  templateUrl: './profil-structure-de-sante.component.html',
  styleUrls: ['./profil-structure-de-sante.component.css']
})
export class ProfilStructureDeSanteComponent implements OnInit {

  name: string = '';
  email: string = '';
  telephone: string = '';
  image: string = '';
  selectedStructure: any;
  structure: any[] = [];
  userString: any;
telephoneS: any;
emailS: any;
nameS: any;
  ajoutStructureSante() { };
  

   constructor(private structureService : StructureSanteService, private route: Router,private http:HttpClient) { }
  ngOnInit(): void {
    
    this.userString = JSON.parse(localStorage.getItem('userOnline')||'[]');
    console.warn('le user', this.userString.structure);
    if (this.userString) {
      const user = this.userString;
      this.name = this.userString.structure.name;
      this.email = this.userString.structure.email;
      this. telephone = this.userString.structure.telephone;
    }
    console.log(this.name)    
  }

  updateStructure() {
    const structure =  {
        name: this.name,
        email: this.email,
        telephone: this.telephone
      }

      this.structureService.updateStructure(this.userString.structure.id, structure).subscribe((response:any) => {
        console.warn("modifionnss reussi", response);
        this.ajoutStructureSante();
      })
    
  }

  chargerInfoStructure() {
    this.nameS=this.userString.structure.name
    this.emailS=this.userString.structure.email
    this.telephoneS=this.userString.structure.telephone
   
     console.log('changer', this.name, this.email, this.telephone);
    console.warn(this.selectedStructure)
  }

}



