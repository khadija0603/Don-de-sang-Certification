import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/service/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donneurs-admin',
  templateUrl: './donneurs-admin.component.html',
  styleUrls: ['./donneurs-admin.component.css']
})
export class DonneursAdminComponent implements OnInit {
// bloquerUser(arg0: any) {}
// debloquerUser(arg0: any) {}
  dtOptions: DataTables.Settings = {};
   donateurList:any [] =[]
  item: any;
  user: any;
  structureList:any [] =[]
annonce: any;
  structureService: any;
constructor(private authservice: AuthServiceService, private route: Router,private http:HttpClient){}
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
   }
  listDonateur() {
     
     // liste annonce
    this.authservice.listerdonateur().subscribe(
      (donateur) => {
        // Afficher la liste des donateur
        console.log(donateur);
        this.donateurList = donateur.data;

        console.log(this.donateurList);
      },

      (error) => {
        // Traiter l'erreur de liste
      }
    );
  }

  bloquerStructure(id: number): void {  this.authservice.bloquerDonneur(id).subscribe(
    (response: any) => {
      console.warn("bloquer naa", response);
      // Mettez à jour la propriété isBlocked de la structure
      const structureToUpdate = this.donateurList.find(item => item.id === id);
      console.log(structureToUpdate)
      if (structureToUpdate) {
        structureToUpdate.isBlocked = !structureToUpdate.isBlocked; // Inverser l'état de blocage
      }

      // Afficher un message de succès
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Bloqué avec succès.',
      });
    },
    (error: any) => {
      // Gérer les erreurs du service ici
      console.error('Erreur lors du blocage', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors du blocage',
      });
    }
  );
     this.listDonateur();
  }
  debloquerStructure(id: number): void {  this.authservice.debloqueDonneur(id).subscribe(
    (response: any) => {
      console.warn("débloquer naa", response);
      // Mettez à jour la propriété isBlocked de la structure
      const structureToUpdate = this.donateurList.find(item => item.id === id);
      console.log(structureToUpdate)
      if (structureToUpdate) {
        structureToUpdate.isBlocked = structureToUpdate.isBlocked; // Inverser l'état de blocage
      }

      // Afficher un message de succès
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Débloqué avec succès.',
      });
    },
    (error: any) => {
      // Gérer les erreurs du service ici
      console.error('Erreur lors du blocage', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors du blocage',
      });
    }
  );
     this.listDonateur();
  }
  
 
 

  
//  bloquerDonneur(id: number): void{
//     this.authservice.bloquerDonneur(id).subscribe((respons) => {
//       console.log("bloquer  naa", respons);
//     })
//   }

  // bloqueUser(id: number) {
  //   this.authservice.bloque(id).subscribe(
  //     (data) => {
  //       console.log(data);
        
  //     }
  //   )
  //   this.listDonateur();
  // }
  // debloqueUser(id: number) {
  //   this.authservice.debloque(id).subscribe(
  //     (data) => {
  //       console.log(data);
        
  //     }
  //   )
  //   this.listDonateur();
  // }
    
}
