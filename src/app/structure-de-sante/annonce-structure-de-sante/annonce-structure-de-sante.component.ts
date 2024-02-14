import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/service/annonce.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-annonce-structure-de-sante',
  templateUrl: './annonce-structure-de-sante.component.html',
  styleUrls: ['./annonce-structure-de-sante.component.css']
})
export class AnnonceStructureDeSanteComponent implements OnInit {
  constructor(private annonceService: AnnonceService,private http: HttpClient, private route:Router) {}
[x: string]: any;
  annonce: any[] =[];
 date:string="";
  lieu:string="";
  statut: string = '';
  newAnnonce : any = {
    date: "",
    lieu: "",
    stat : ""
  }
  selectedAnnonce: any = [];
  annonceList:any[] = [];
  annonceData: any = {
  };
  updatedData: any;
   dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.loadAnnonces();
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
    this.userConnect = this.tabUsers.find((element:any) => element.idUser == this['idUserConnect']);
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
    this.lieu = "",
    this.statut = ""
  }

  // Methode ajout annonce
  ajouterAnnonce(){
    const heurePattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    // Premiere vérification avec sweetalert 
    if(this.date == "" ||  this.lieu == "" || this.statut == "" ){
      this.verifierChamps("Erreur!", "Vueillez renseigner les champs", "error");
    }

    else if (!this['heure'].match(heurePattern)) {
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

      // On ajoute l'objet dans la liste des contacts
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

  // Methode supprimer contact 
  supprimerAnnonce(id:number){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer le contact",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je supprime!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.annonceService.deleteAnnonce(id).subscribe((response) => {
          console.log(response);
          
        })
        // paramAnnonce.etatAnnonce = 0;
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("Users", JSON.stringify(this.tabUsers));
        this.verifierChamps("Annonce supprimer!", "", "success");     
        
      }
    });
    
  }

  // Methode pour restaure le contact 
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

  // Methode pour supprimer définitivement un contact 
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
    this['currentAnnonce'].dateAnnonce = this.date;
    this['currentAnnonce'].lieuAnnonce = this.lieu;
    this['currentAnnonce'].statutAnnonce = this.statut;
    // this.currentAnnonce.imageAnnonce = this.imageUrl;
    
    
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
  // lister annonces
loadAnnonces(): void {
  this.annonceService.getAnnonces().subscribe(
    (data) => {
      console.log(data);
      
      this.annonce = data.data.data;
      console.log('Les annonces à afficher', this.annonce);
      
    },
    (error: any) => {
      console.error('Erreur lors du chargement des annonces :', error);
    }
  );
}


  addAnnonce(): void {
    this.newAnnonce ={
      lieu: this.lieu,
      statut: this.statut,
      date : this.date

   }

    this.annonceService.createAnnonce(this.newAnnonce).subscribe((response:any) => {
        console.log('Annonce ajoutée avec succès :', response);
        this.loadAnnonces(); // Rechargez la liste après l'ajout
      },
      (error:any) => {
        console.error('Erreur lors de l\'ajout de l\'annonce :', error);
      }
    );
  
  }


   

  updateAnnonce() {
    if (this.selectedAnnonce) {
      this.annonceService.updateAnnonce(this.selectedAnnonce,{
        date: this.date,
        lieu: this.lieu,
        statut : this.statut
      }).subscribe((respons)=>{
        console.log("modifionnss reussi", respons);
      })
   }
  }

  chargerInfosAnnonce(annonce: any) {
    // console.log(annonce);
    this.selectedAnnonce = annonce.id;
    // console.warn('lid de vv', this.id);
    this.date = annonce.date;
    this.lieu = annonce.lieu;
    this.statut = annonce.statut;
    console.log('changer', this.date, this.lieu, this.statut);
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




