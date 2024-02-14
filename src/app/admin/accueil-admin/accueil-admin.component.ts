import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/service/auth-service.service';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css']
})
export class AccueilAdminComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  donateurList:any [] =[]
  item: any;
annonce: any;
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
     
     // liste donateur
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
}
