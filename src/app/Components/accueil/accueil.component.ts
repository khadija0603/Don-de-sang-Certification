import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import 'owl.carousel';
// import 'owl.carousel/dist/types';
import * as $ from 'jquery';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, AfterViewInit{
chargerInfosAlerte: any;
ajouterAlerte: any;
supprimerAlerte(_t148: any) {
}
viderChapmsAlerte() {
}
modifierAlerte() {
}

// telephone:String="+221 33 900 11 22";
//   email: String = "dondesang@gmail.com";
//   ville: String = "";


    tabUsers:any;
   userConnect:any;

  // Les attributs qui récupère les valeurs des champs pour ajouter un Accueil
  pseudo:String = "";
  telephone:String="";
  email:String="";
  groupeSanguin:String="";
  ville:String="";

  // Identifiant du dernier element du tableau Accueil 
  idLastAccueil: number = 0;

  // Le tableau qui contient la liste des Accueils de l'utiliateur qui s'est connecté 
  tabAccueilsUser:any;

  //valeur du filter qui correspond a celui du champs recherche
  filterValue = '';

  //les element trouver
  filteredElement:any;

  // Définition du constructeur 
  constructor (private route: ActivatedRoute){}
  // Attribut qui permet de récupérer l'identifiant de celui qui s'est connecté 
  idUserConnect = this.route.snapshot.params['id'];

  

  // Declaration des méthodes 
  // Redifinition de la methode ngoninit

  ngAfterViewInit() {
    // Initialiser Owl Carousel dans la méthode ngAfterViewInit
    const owl = $('.reviews-carousel') as any;
    owl.owlCarousel({
        items: 1,
        loop: true,
        // Ajoutez d'autres options au besoin
    });

    // Vous pouvez également supprimer la ligne suivante, car la méthode owlCarousel est déjà appelée ci-dessus
    // (owl as any).owlCarousel();
}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/script/script.js'; // Ajustez le chemin en conséquence
    document.body.appendChild(script);
    // On récupère le tableau d'objets dans le localstorage
    this.tabUsers = JSON.parse(localStorage.getItem("Users") || "[]");

    // On récupère l'objet qui s'est connecté 
    this.userConnect = this.tabUsers.find((element:any) => element.idUser == this.idUserConnect);
    console.log(this.userConnect);

    // On stock la liste des Accueils dans le tableau 
    this.tabAccueilsUser = this.userConnect.Accueils;
    this.filteredElement = this.tabAccueilsUser;
    
  }

  // Methode de recherche automatique 
  onSearch(){
    // Recherche se fait selon le pseudo ou le prepseudo 
    this.filteredElement = this.tabAccueilsUser.filter(
      (elt:any) => (elt?.pseudoAccueil.toLowerCase().includes(this.filterValue.toLowerCase())) || elt?.groupeSanguinAccueil.toLowerCase().includes(this.filterValue.toLowerCase())
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
  viderChapmsAccueil(){
    this.pseudo = "",
    this.telephone = "",
    this.email = "",
    this.groupeSanguin = "",
    this.ville = ""
  }

  // Methode ajout Accueil
  ajouterAccueil(){
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    // Premiere vérification avec sweetalert 
    if(this.pseudo == "" || this.telephone == "" || this.email == ""  || this.groupeSanguin == "" || this.ville==""){
      this.verifierChamps("Erreur!", "Vueillez renseigner les champs", "error");
    }

    else if (!this.email.match(emailPattern)) {
      // Vérifie si le format de l'email est correct 
      this.verifierChamps("Erreur!", "Email invalide", "error");
    }
    else{
      // On vérifie si le tableau n'est pas vide 
      if(this.tabAccueilsUser.length){
        console.warn("taille du tab");
        this.idLastAccueil = this.tabAccueilsUser[this.tabAccueilsUser.length -1].idAccueil;
        console.log(this.idLastAccueil)
      }
      else {
        this.idLastAccueil = 0;
        console.warn("idLastUser = 0")
      }
      // Création de l'objet Accueil 
      let Accueil = {
        idAccueil: this.idLastAccueil + 1,
        pseudoAccueil: this.pseudo,
        telephoneAccueil: this.telephone,
        emailAccueil: this.email,
        groupeSanguinAccueil: this.groupeSanguin,
        villeAccueil: this.ville,
        etatAccueil: 1,
        createAt: new Date(),
        createBy: this.userConnect.email,
        updateAt: "",
        updateBy: "",        
      }

      // On ajoute l'objet dans la liste des Accueils
      console.log(this.idLastAccueil);
      this.tabAccueilsUser.push(Accueil);

      // Ferme le popup si on click sur Ok 
      Swal.fire({
        title: "Felicitation!",
        text: "Alerte créé avec succes",
        icon: "success",
      });
      // On vide les champs 
      this.viderChapmsAccueil();
      // On met à jour le tableau qui est stocké dans le localStorage 
      localStorage.setItem("Users", JSON.stringify(this.tabUsers));

      console.log(this.tabAccueilsUser);
      console.log(this.userConnect);
      console.log(this.tabUsers);
    }
  }

  // Methode supprimer Accueil 
  supprimerAccueil(paramAccueil:any){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer l'alerte",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je supprime!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramAccueil.etatAccueil = 0;
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("Users", JSON.stringify(this.tabUsers));
        this.verifierChamps("Alerte supprimer!", "", "success");     
        
      }
    });
    // alert(paramAccueil.etatAccueil);
    
  }

  // Methode pour restaure le Accueil 
  restaurerAccueil(paramAccueil:any){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez restaurer l'alerte",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je restaure!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramAccueil.etatAccueil = 1;
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("Users", JSON.stringify(this.tabUsers));
        this.verifierChamps("Alerte restauré!", "", "success");     
        
      }
    });
  }

  // Methode pour supprimer définitivement un Accueil 
  supprimerAccueilDefinitif(paramAccueil:any){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer définitivement Accueil",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je supprime!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramAccueil.etatAccueil = -1;
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("Users", JSON.stringify(this.tabUsers));
        this.verifierChamps("Alerte restauré!", "", "success");     
        
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
        this.tabAccueilsUser.forEach((element:any) => {
          if(element.etatAccueil == 0){
            element.etatAccueil = -1;
            // On met à jour le tableau qui est stocké dans le localStorage 
            localStorage.setItem("Users", JSON.stringify(this.tabUsers));
            this.verifierChamps("Alerte restauré!", "", "success");     
          }
        });
        // paramAccueil.etatAccueil = -1;
        
        
      }
    });

    
  }

  // Variable qui stockera le Accueil cliqué
  currentAccueil: any;
  // Methode pour charger les informations à modifier 
  chargerInfosAccueil(paramAccueil:any){
    this.currentAccueil = paramAccueil;
    this.pseudo = paramAccueil.pseudoAccueil;
    this.telephone = paramAccueil.telephoneAccueil;
    this.email = paramAccueil.emailAccueil;
    this.groupeSanguin = paramAccueil.groupeSanguinAccueil;
    this.ville = paramAccueil.villeAccueil;
  }

  // Methode pour modifier le Accueil
  modifierAccueil(){
    this.currentAccueil.pseudoAccueil = this.pseudo;
    this.currentAccueil.emailAccueil = this.email;
    this.currentAccueil.telephoneAccueil = this.telephone;
    this.currentAccueil.groupeSanguinAccueil = this.groupeSanguin;
    this.currentAccueil.villeAccueil = this.ville;
    
    // La date de derniere modification
    this.currentAccueil.updateAt = new Date();
    // La personne qui a modifier le Accueil
    this.currentAccueil.updateBy = this.userConnect.email; 
    
    // On met à jour le tableau qui est stocké dans le localStorage 
    localStorage.setItem("Users", JSON.stringify(this.tabUsers));
    this.verifierChamps("Mofication réussie!", "", "success"); 
    this.viderChapmsAccueil();
  } 
 

  // On affiche soit la liste des Accueils soit les Alertes de la corbeille 
  listChoice : boolean = true;

  listeChoiceFunction(){
    this.listChoice = !this.listChoice;
  }


  

  
}


  


