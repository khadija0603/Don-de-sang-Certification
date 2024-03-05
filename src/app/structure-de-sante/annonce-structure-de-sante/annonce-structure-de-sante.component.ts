import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/service/annonce.service';
import { AuthServiceService } from 'src/service/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annonce-structure-de-sante',
  templateUrl: './annonce-structure-de-sante.component.html',
  styleUrls: ['./annonce-structure-de-sante.component.css']
})
export class AnnonceStructureDeSanteComponent implements OnInit {
  donateurList: any=[];
  item: any;
  constructor(private annonceService: AnnonceService, private authservice: AuthServiceService, private http: HttpClient, private route: Router) { }
  [x: string]: any;
   tabPromesseAnnuler: any[] = []
  annonce: any[] = [];
  date: string = "";
  lieu: string = ""; 
  statut: string = '';
  image: string = '';
  newAnnonce: any = {
    date: "",
    lieu: "",
    stat: ""
  }
  annonceChoisi: any;
  selectedAnnonce: any ;
  annonceList: any[] = [];
  annonceData: any = {
  };
  updatedData: any;
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.loadAnnonces();
   
    
  }

  // Attribut qui stock le tableau de notre localstorage
  tabUsers: any;

  // Attribut qui stock l'utilisateur qui s'est connecté 
  userConnect: any;
  
  // Identifiant du dernier element du tableau contact 
  idLastAnnonce: number = 0;
  // Le tableau qui contient la liste des contacts de l'utiliateur qui s'est connecté 
  tabAnnoncesUser: any;

  //valeur du filter qui correspond a celui du champs recherche
  filterValue: string = '';
  //les element trouver
  filteredElement: any;
  // Methode de recherche automatique 
  onSearch() {
    // Recherche se fait selon le date ou le jour 
    this.filteredElement = this.tabAnnoncesUser.filter(
      (elt: any) => (elt?.dateAnnonce.toLowerCase().includes(this.filterValue.toLowerCase())) || elt?.jourAnnonce.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }
  // Méthode pour afficher un sweetalert2 apres vérification 
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }
  // Methode pour vider les champs 
  viderChapmsAnnonce() {
    this.date = "",
      this.lieu = "",
      this.statut = ""
  }
  // Methode ajout annonce
  ajouterAnnonce() {
    const heurePattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    // Premiere vérification avec sweetalert 
    if (this.date == "" || this.lieu == "" || this.statut == "") {
      this.verifierChamps("Erreur!", "Vueillez renseigner les champs", "error");
    }

    else if (!this['heure'].match(heurePattern)) {
      // Vérifie si le format de l'heure est correct 
      this.verifierChamps("Erreur!", "Email invalide", "error");
    }
    else {
      // On vérifie si le tableau n'est pas vide 
      if (this.tabAnnoncesUser.length) {
        console.warn("taille du tab");
        this.idLastAnnonce = this.tabAnnoncesUser[this.tabAnnoncesUser.length - 1].idAnnonce;
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

  // lister annonces
  // variable pour stocker annonce actif
  annonceValid: any;
  loadAnnonces(): void {
       this.annonceService.getAnnonces().subscribe(
      (response) => {
        console.warn('la réponse est :', response);
        // Vérifiez si response.data est un tableau
        // if (Array.isArray(response.data.data)) {
        this.annonce = response.data;
           console.warn('la liste des annonces', this.annonce);
           this.annonceValid = this.annonce.filter((element: { is_deleted: number }) =>
             element.is_deleted == 0
             
           )
        // } else {
        // }
      },
      (error) => {
        // Traiter l'erreur de liste
        console.warn('horreurrrr')
      }
    );
  }

  // methode pour cloture annonce
  cloturerAnnone(id : any): void{
    this.annonceService.closeAnnonce(id).subscribe((Response) => {
       console.warn("voir cloture", Response);
     })
   }
  
  addAnnonce(): void {
    this.newAnnonce = {
      lieu: this.lieu,
      statut: this.statut,
      date: this.date

    }
    console.warn(this.newAnnonce)

    this.annonceService.createAnnonce(this.newAnnonce).subscribe((response: any) => {
      console.warn('Annonce ajoutée avec succès :', response);
      this.loadAnnonces(); // Rechargez la liste après l'ajout
      Swal.fire({
              title: "",
              // icon: "",
              text: response.message,
            })
    },
      
      (error: any) => {
        console.error('Erreur lors de l\'ajout de l\'annonce :', error);
        Swal.fire({
              title: "",
              // icon: "",
              text: error.message,
            })
      }
      
    );
  }

  updateAnnonce() {
    if (this.selectedAnnonce) {
      this.annonceService.updateAnnonce(this.selectedAnnonce, {
        date: this.date,
        lieu: this.lieu,
        statut: this.statut
      }).subscribe((response) => {
        console.log("modifionnss reussi", response);
        this.loadAnnonces();
      })
    }
  }

  chargerInfosAnnonce(annonce: any) {
    // console.log(annonce);
    this.selectedAnnonce = annonce.id;
    // console.warn('lid de vv', this.id);
    this.date = annonce.date;
    this.image = annonce.image;
    this.lieu = annonce.lieu;
    this.statut = annonce.statut;
    console.log('changer', this.date,this.image, this.lieu, this.statut);
    console.warn(this.selectedAnnonce)
  }



  deleteAnnonce(id: any): void {
    this.annonceService.deleteAnnonce(id).subscribe(
      (response: any) => {
        console.log('Annonce supprimée avec succès :', response);
        this.loadAnnonces(); 
        Swal.fire({
          title: 'Suppression réussie!',
          text: 'Annonce supprimée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      (error: any) => {
        console.error('Erreur lors de la suppression de l\'annonce :', error);
        Swal.fire({
          title: 'Erreur de suppression!',
          text: 'Une erreur s\'est produite lors de la suppression de l\'annonce.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  // Nouvelle méthode pour récupérer les participants
  getParticipants(annonce: any) {
    this.annonceChoisi = annonce.id;
    console.warn( 'xol annonce', this.selectedAnnonce)
     this.annonceService.getParticipants(this.annonceChoisi).subscribe(
       (response) => {
         console.warn("La rep du back");
         console.warn(response);
         console.warn('Liste des participants :', response);
         this.donateurList = response;
         console.warn("participants vvvvvvvv", this.donateurList);
      },
      (error) => {
       console.warn('Erreur de récupération des promesses', error);
      }
     );
  }

  // Attribut pour la pagination
  annonceParPage = 3; // Nombre d'annonce par page
  pageActuelle = 1; // Page actuelle
  // Méthode pour déterminer les articles à afficher sur la page actuelle
    getArticlesPage(): any[] {
      const indexDebut = (this.pageActuelle - 1) * this.annonceParPage;
      const indexFin = indexDebut + this.annonceParPage;
      return this.annonceValid.slice(indexDebut, indexFin);
    }
  
// Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.annonceValid.length / this.  annonceParPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.annonceValid.length / this.  annonceParPage);
  }

}




