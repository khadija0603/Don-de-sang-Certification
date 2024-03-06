import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import 'owl.carousel';
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

  // Déclarations des attributs
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  message: string = '';

  // Méthode pour afficher un sweetalert2 apres vérification
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: false,
    });
    // Ferme le pop-up après 2 secondes
    setTimeout(() => {
      Swal.close();
    }, 1500);
  }

  // Variables pour faire la vérifications
  verifNom: String = '';
  verifPrenom: String = '';
  verifEmail: String = '';
  verifTelephone: String = '';
  verifMessage: String = '';

  // Variables si les champs sont exacts
  exactNom: boolean = false;
  exactPrenom: boolean = false;
  exactEmail: boolean = false;
  exactTelephone: boolean = false;
  exactMessage: boolean = false;

  ngOnInit(): void {
    this.tabListesContact = JSON.parse(localStorage.getItem('contact') || '[]');
    console.log('contact', this.tabListesContact);

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

  // Verification du nom
  verifNomFonction() {
    if (this.nom == '') {
      this.verifNom = '';
    }
    // Vérifie si le nom contient uniquement des espaces
    else if (/^\s+$/.test(this.nom)) {
      this.verifNom = 'Veuillez renseigner votre nom';
    } else {
      if (this.nom.length < 2) {
        this.exactNom = false;
        this.verifNom = 'Le nom est trop court';
      } else if (!/^[a-zA-Z\s]+$/.test(this.nom)) {
        // Utilisation de l'expression régulière
        this.exactNom = false;
        this.verifNom = 'Veuillez renseigner un nom correct';
      } else {
        this.exactNom = true;
        this.verifNom = ' Correct';
      }
    }
    // this.viderChamps();
  }

  // Verification du prenom
  verifPrenomFonction() {
    if (this.prenom == '') {
      this.verifPrenom = '';
    }
    // Vérifie si le prenom contient uniquement des espaces
    else if (/^\s+$/.test(this.prenom)) {
      this.verifPrenom = 'Veuillez renseigner votre prenom';
    } else {
      if (this.prenom.length < 3) {
        this.exactPrenom = false;
        this.verifPrenom = 'Le prenom est trop court';
      } else if (!/^[a-zA-Z\s]+$/.test(this.prenom)) {
        // Utilisation de l'expression régulière
        this.exactPrenom = false;
        this.verifPrenom = 'Veuillez renseigner un prenom correct';
      } else {
        this.exactPrenom = true;
        this.verifPrenom = ' Correct';
      }
    }
    // this.viderChamps();
  }

  // Verification de  l'email

  verifEmailFonction() {
    if (this.email == '') {
      this.verifEmail = '';
    } else {
      if (this.validateEmail(this.email) == true) {
        console.log('true');
        this.exactEmail = true;
        this.verifEmail = 'le format du mail est valide';
        console.log(this.verifEmail);
      }

      if (this.validateEmail(this.email) == false) {
        console.log('false');
        this.exactEmail = false;
        this.verifEmail = 'le format du mail est invalide';
        console.log(this.verifEmail);
      }
    }
    // this.viderChamps();
  }

  // Fonction de Verification de l'email pour la fonctionnalité connexion
  validateEmail(email: string): boolean {
    const emailRegex =
      /^[A-Za-z]+[A-Za-z0-9\._%+-]+@[A-Za-z][A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;
    // const endsWithCom = /com$/;

    // return emailRegex.test(email) && endsWithCom.test(email);
    return emailRegex.test(email);
  }
  // Verification du message
  verifMessageFonction() {
    if (this.message == '') {
      this.verifMessage = '';
    }
    // Vérifie si le message contient uniquement des espaces
    else if (/^\s+$/.test(this.message)) {
      this.verifMessage = 'Veuillez renseigner votre message';
    } else {
      if (this.message.length < 5) {
        this.exactMessage = false;
        this.verifMessage = 'Le message est trop court';
      } else if (!/^[a-zA-Z\s]+$/.test(this.message)) {
        // Utilisation de l'expression régulière
        this.exactMessage = false;
        this.verifMessage = 'Veuillez renseigner un message correct';
      } else {
        this.exactMessage = true;
        this.verifMessage = ' Correct';
      }
    }
    // this.viderChamps();
  }

  // Verification du telephone
  verifTelephoneFonction() {
    if (this.telephone == '') {
      this.verifTelephone = '';
    }
    // Vérifie si le numéro de téléphone commence par 77, 78, 76 ou 70
    else if (!/^(77|78|76|70)\d{7}$/.test(this.telephone)) {
      this.exactTelephone = false;
      // this.verifTelephone = 'Le numéro doit commencer par 77, 78, 76 ou 70 ';
      this.verifTelephone = 'Le numéro doit contenir 9 chiffres';
    }
    // Vérifie si le numéro de téléphone contient exactement 9 chiffres
    else if (!/^\d{9}$/.test(this.telephone)) {
      this.exactTelephone = false;
      this.verifTelephone = 'Le numéro doit contenir 9 chiffres';
    } else if (this.telephone.length < 9) {
      this.exactTelephone = false;
      this.verifTelephone = 'Le numero est trop court';
    } else {
      this.exactTelephone = true;
      this.verifTelephone = ' Correct';
    }
  }

  tabListesContact: any[] = [];
  idLastContact: number = 0;

  // Fonction pour ajouter un contact
  addConntact() {
    this.verifNomFonction();
    this.verifPrenomFonction();
    this.verifEmailFonction();
    this.verifTelephoneFonction();
    this.verifMessageFonction();

    if (this.tabListesContact.length) {
      this.idLastContact =
        this.tabListesContact[this.tabListesContact.length - 1].id;
    }
    let contactData = {
      id: this.idLastContact + 1,
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      telephone: this.telephone,
      message: this.message,
    };

    // let existContact;

    if (
      this.exactNom &&
      this.exactPrenom &&
      this.exactEmail &&
      this.exactTelephone &&
      this.exactMessage == true
    )
    {

        this.tabListesContact.push(contactData);
        localStorage.setItem('contact', JSON.stringify(this.tabListesContact));
        this.verifierChamps(
          'Felicitation!',
          'Compte créé avec succes',
          'success'
        );
        this.viderChamps();
    
    }
    else {
      this.verifierChamps(
        'Erreur!',
        'Tous les champs sont obligatoires',
        'error'
      );
    }
  }

  viderChamps() {
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.telephone = '';
    this.message = '';
    // ------------
    this.verifNom = '';
    this.verifPrenom = '';
    this.verifEmail = '';
    this.verifTelephone = '';
    this.verifMessage = '';
    // ----------
    this.exactNom = false;
    this.exactPrenom = false;
    this.exactEmail = false;
    this.exactTelephone = false;
    this.exactMessage = false;
  }


    tabUsers:any;
   userConnect:any;

  // Les attributs qui récupère les valeurs des champs pour ajouter un Accueil
  pseudo:String = "";
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


  // Methode de recherche automatique 
  onSearch(){
    // Recherche se fait selon le pseudo ou le prepseudo 
    this.filteredElement = this.tabAccueilsUser.filter(
      (elt:any) => (elt?.pseudoAccueil.toLowerCase().includes(this.filterValue.toLowerCase())) || elt?.groupeSanguinAccueil.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }


  // Méthode pour afficher un sweetalert2 apres vérification 
  verifierChamp(title:any, text:any, icon:any) {
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


  


