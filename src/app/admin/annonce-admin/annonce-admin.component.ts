import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from 'src/service/annonce.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-annonce-admin',
  templateUrl: './annonce-admin.component.html',
  styleUrls: ['./annonce-admin.component.css']
})
export class AnnonceAdminComponent implements OnInit {
  currentAnnonce: any;
chargerInfosAnnonce(arg0: any[]) {
}

  listeAnnonces: any;
  updateAnnonce() {
  }
    [x: string]: any;
  annonceChoisi: any;
  selectedAnnonce: any ;
  annonceData: any = {
  };
  // annonce: any;
  donateurList: any=[];
  item: any;
  annonce: any[] = [];
  date: string = "";
  jour: string = "";
  heure: string = "";
  lieu: string = "";
  statut: string = '';
  id: any = [];
  annonceList: any[] = [];
  dtOptions: DataTables.Settings = {};
  updatedData: any;

  constructor(private route: ActivatedRoute,
    private annonceService: AnnonceService, private http: HttpClient) { }

  ngOnInit() {
    this.updateAnnonce();
    const script = document.createElement('script');
    script.src = '../../../assets/script/sidebar.js';
    document.body.appendChild(script);
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 4,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
  
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
  // On récupère le tableau d'objets dans le localstorage
    this.tabUsers = JSON.parse(localStorage.getItem("Users") || "[]");

    // On récupère l'objet qui s'est connecté 
    this.userConnect = this.tabUsers.find((element:any) => element.idUser == this.idUserConnect);
    console.log(this.userConnect);
    // On stock la liste des contacts dans le tableau 
    this.tabAnnoncesUser = this.userConnect.contacts;
    this.filteredElement = this.tabAnnoncesUser;
  }
 // Attribut qui stock le tableau de notre localstorage
  tabUsers:any;

  // Attribut qui stock l'utilisateur qui s'est connecté 
  userConnect:any;

  // Identifiant du dernier element du tableau contact 
  idLastAnnonce: number = 0;

  // Le tableau qui contient la liste des contacts de l'utiliateur qui s'est connecté 
  tabAnnoncesUser:any;

  //valeur du filter qui correspond a celui du champs recherche
  filterValue:string = '';

  //les element trouver
  filteredElement:any;

  // Attribut qui permet de récupérer l'identifiant de celui qui s'est connecté 
  idUserConnect = this.route.snapshot.params['id'];

  

  // Declaration des méthodes 
  // Redifinition de la methode ngoninit 

  // Methode de recherche automatique 
  onSearch(){
    // Recherche se fait selon le date ou le jour 
    this.filteredElement = this.tabAnnoncesUser.filter(
      (elt:any) => (elt?.dateAnnonce.toLowerCase().includes(this.filterValue.toLowerCase())) || elt?.jourAnnonce.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }


  // Méthode pour afficher un sweetalert2 apres vérification 
  verifierChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  // Methode pour vider les champs 
  viderChapmsAnnonce(){
    this.date = "",
    this.jour = "",
    this.heure = "",
    this.lieu = "",
    this.statut = ""
  }

  // Methode ajout contact
  ajouterAnnonce(){
    const heurePattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    // Premiere vérification avec sweetalert 
    if(this.date == "" || this.jour == "" || this.heure == "" || this.lieu == "" || this.statut == "" ){
      this.verifierChamps("Erreur!", "Vueillez renseigner les champs", "error");
    }

    else if (!this.heure.match(heurePattern)) {
      // Vérifie si le format de l'heure est correct 
      this.verifierChamps("Erreur!", "Email invalide", "error");
    }
    else{
      // On vérifie si le tableau n'est pas vide 
      if(this.tabAnnoncesUser.length){
        console.warn("taille du tab");
        this.idLastAnnonce = this.tabAnnoncesUser[this.tabAnnoncesUser.length -1].idAnnonce;
        console.log(this.idLastAnnonce)
      }
      else {
        this.idLastAnnonce = 0;
        console.warn("idLastUser = 0")
      }
      // Création de l'objet contact 
      let contact = {
        idAnnonce: this.idLastAnnonce + 1,
        dateAnnonce: this.date,
        lieuAnnonce: this.lieu,
        statutAnnonce: this.statut,
        // imageAnnonce: this.imageUrl,
        etatAnnonce: 1,
        createAt: new Date(),
        createBy: this.userConnect.heure,
        updateAt: "",
        updateBy: "",        
      }

      // On ajoute l'objet dans la liste des annonces
      console.log(this.idLastAnnonce);
      this.tabAnnoncesUser.push(contact);

      // Ferme le popup si on click sur Ok 
      Swal.fire({
        title: "Felicitation!",
        text: "Annonce créé avec succes",
        icon: "success",
      });
      // On vide les champs 
      this.viderChapmsAnnonce();
      // On met à jour le tableau qui est stocké dans le localStorage 
      localStorage.setItem("Users", JSON.stringify(this.tabUsers));

      console.log(this.tabAnnoncesUser);
      console.log(this.userConnect);
      console.log(this.tabUsers);
    }
  }

  // Methode supprimer  
  // supprimerAnnonce(id:number){
  //   Swal.fire({
  //     title: "Etes-vous sur???",
  //     text: "Vous allez supprimer le contact",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Oui, je supprime!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.annonceService.deleteAnnonce(id).subscribe((response) => {
  //         console.log(response);
          
  //       })
  //       // paramAnnonce.etatAnnonce = 0;
  //       // On met à jour le tableau qui est stocké dans le localStorage 
  //       localStorage.setItem("Users", JSON.stringify(this.tabUsers));
  //       this.verifierChamps("Annonce supprimer!", "", "success");     
        
  //     }
  //   });
    
  // }

  // Methode pour restaure
  restaurerAnnonce(paramAnnonce:any){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez restaurer le contact",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je restaure!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramAnnonce.etatAnnonce = 1;
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("Users", JSON.stringify(this.tabUsers));
        this.verifierChamps("Annonce restauré!", "", "success");     
        
      }
    });
  }

  // Methode pour supprimer définitivement 
  supprimerAnnonceDefinitif(paramAnnonce:any){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer définitivement l'annonce",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je supprime!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramAnnonce.etatAnnonce = -1;
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("Users", JSON.stringify(this.tabUsers));
        this.verifierChamps("Annonce restauré!", "", "success");     
        
      }
    });
  }

  // Methode pour supprimer vider la corbeille
  viderCorbeille(){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez vider la corbeille",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je vide!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.tabAnnoncesUser.forEach((element:any) => {
          if(element.etatAnnonce == 0){
            element.etatAnnonce = -1;
            // On met à jour le tableau qui est stocké dans le localStorage 
            localStorage.setItem("Users", JSON.stringify(this.tabUsers));
            this.verifierChamps("Annonce restauré!", "", "success");     
          }
        });
        // paramAnnonce.etatAnnonce = -1;
        
        
      }
    });

    
  }

  // Variable qui stockera le contact cliqué
  currentAnonce: any;

  // Methode pour modifier le contact
  modifierAnnonce(){
  
    
    // La date de derniere modification
    this.currentAnnonce.updateAt = new Date();
    // La personne qui a modifier le contact
    this.currentAnnonce.updateBy = this.userConnect.heure; 
    
    // On met à jour le tableau qui est stocké dans le localStorage 
    localStorage.setItem("Users", JSON.stringify(this.tabUsers));
    this.verifierChamps("Mofication réussie!", "", "success"); 
    this.viderChapmsAnnonce();
  } 
 

  // On affiche soit la liste des contacts soit les contacts de la corbeille 
  listChoice : boolean = true;

  listeChoiceFunction(){
    this.listChoice = !this.listChoice;
  }
  
    // Attribut pour la pagination
   annonceParPage = 3; // Nombre d'annonce par page
  pageActuelle = 1; // Page actuelle
  
  // Méthode pour déterminer les articles à afficher sur la page actuelle
    getArticlesPage(): any[] {
      const indexDebut = (this.pageActuelle - 1) * this.annonceParPage;
      const indexFin = indexDebut + this.annonceParPage;
      return this.annonce.slice(indexDebut, indexFin);
    }
// Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.annonce.length / this.  annonceParPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.annonce.length / this.  annonceParPage);
  }

   getParticipants(annonce: any) {
    this.annonceChoisi = annonce.id;
    console.warn( 'hdv', this.selectedAnnonce)
     this.annonceService.getParticipants(this.annonceChoisi).subscribe(
       (response) => {
         console.warn('Liste des participants :', response);
         this.donateurList = response;
         console.warn("participants vvvvvvvv", this.donateurList);
      },
      (error) => {
       console.warn('Erreur de récupération des promesses', error);
      }
     );
  }
}





  



