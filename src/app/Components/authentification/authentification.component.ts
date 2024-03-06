import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from 'src/service/auth-service.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { url } from 'src/app/models/apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/service/token.service';
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
  
export class AuthentificationComponent implements OnInit{

   constructor(private authservice: AuthServiceService, private route: Router, private http: HttpClient,
  private tS: TokenService, ) { }
  ngOnInit(): void {
     
    
    if (!localStorage.getItem("isAdmin")) {
      localStorage.setItem("isAdmin", JSON.stringify(false))
    }

    if (!localStorage.getItem("isStructure")) {
      localStorage.setItem("isStructure", JSON.stringify(false))
    }

    if (!localStorage.getItem("isDonateur")) {
      localStorage.setItem("isDonateur", JSON.stringify(false))
    }

    if (!localStorage.getItem("userOnline")) {
      localStorage.setItem("userOnline", JSON.stringify(""))
    }
  }
onChangeFile() {
}
  
  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
setAuthenticationStatus(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
    // console.log('tesrr',this.setAuthenticationStatus)
  }
passwordCon: any;
emailCon: any;
passwordConf: any;
nom: any;
authDonateur: any;

email!: any;
  password!: any;
  
    verifEmailFonction(){
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    this.exactEmail = false;
    
    if(this.email == ""){
      this.verifEmail = "";
    }
    else if (!this.email.match(emailPattern) || this.email.endsWith("@") || !this.email.includes('.')){
      this.verifEmail = "Veuillez donner un email valide";
    }
    else {
      this.verifEmail = "";
      this.exactEmail = true;
    }
    }
  
    verifAllEmailFonction(email:any, verifEmail:any, exactEmail:any){
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    exactEmail = false;
    
    if(email == ""){
      verifEmail = "";
    }
    else if (!email.match(emailPattern) ){
      verifEmail = "Veuillez donner un email valide";
    }
    else {
      verifEmail = "";
      exactEmail = true;
    }
    }
  
   // Verification du nom
  verifNomFonction() {
    this.exactNom = false;
    if(this.nom == ""){
      this.verifNom = "";
    }
    else if (this.nom.length < 5 ){
      this.verifNom = "Le nom est trop court";
    }
    else {
      this.verifNom = "";
      this.exactNom = true;
    }
  }
    // Verification du prenom 
  verifPrenomFonction() {
    this.exactPrenom = false;
    if(this.prenom == ""){
      this.verifPrenom = "";
    }
    else if (this.prenom.length < 3 ){
      this.verifPrenom = "Le prenom est trop court";
      
    }
    else{
      this.verifPrenom = "";
      this.exactPrenom = true;
    }
  }


  // Verification du mot de passe 
  verifPasswordFonction(){
    this.exactPassword = false;
    if(this.password == ""){
      this.verifPassword = "";
    }
    else if (this.password.length < 5 ){
      this.verifPassword = "Mot de passe doit être supérieur ou égal à 5";
    }
    else{
      this.verifPassword = "";
      this.exactPassword = true;
    }
  }
  // Verification de l'adresse 
  verifAdresseFonction(){
    this.exactAdresse = false;
    if(this.adresse == ""){
      this.verifAdresse = "";
    }
    else if (this.password.length < 4 ){
      this.verifAdresse = "";
    }
    else{
      this.verifAdresse = "";
      this.exactAdresse = true;
    }
  }
  // Verification de votre cni 
  verifCniFonction(){
    this.exactCni = false;
    if(this.cni == ""){
      this.verifCni = "";
    }
    else if (this.cni.length < 12 ){
      this.verifCni = "le numero cni doit être supérieur ou égal à 13";
    }
    else{
      this.verifCni = "";
      this.exactCni = true;
    }
  }
  // Verification de votre cni 
  verifTelephoneFonction(){
    this.exactTelephone = false;
    if(this.telephone == ""){
      this.verifTelephone = "";
    }
    else if (this.telephone.length < 8 ){
      this.verifTelephone = "le numero cni doit être supérieur ou égal à 9";
    }
    else{
      this.verifTelephone = "";
      this.exactTelephone = true;
    }
  }
  
 
  //variable
  name:string="";
  telephone: string = '';
  prenom:string="";
  adresse:string="";
  cni:string="";
  groupe_sanguin:string="";
  sexe:string="";
  image: File | undefined;

   // Variables pour faire la vérifications
  verifNom : String  =  "";
  verifPrenom : String = "";
  verifEmail : String = "";
  verifPassword : String = "";
  verifPasswordConf: String = "";
  verifAdresse : String = "";
  verifCni : String = "";
  verifTelephone : String = "";

  // Variables si les champs sont exacts
  exactNom : boolean = false;
  exactPrenom : boolean = false;
  exactEmail : boolean = false;
  exactPassword : boolean = false;
  exactAdresse : boolean = false;
  exactCni : boolean = false;
  exactTelephone : boolean = false;
  exactPasswordConf: boolean = false;
  
  // Pour vérifier les champs pour la connexion 
  verifEmailCon : String = "";
  verifPasswordCon: String = "";

 //méthodes
  afficherBloc1: boolean = true;

  basculerBlocs() {
    this.afficherBloc1 = !this.afficherBloc1;
  }
login() {
  let user = {
    email: this.email,
    password: this.password
  };

  if (this.email === 'khadijambengue96@gmail.com' && this.password === 'password') {
    this.authservice.login(user).subscribe(
      (response: any) => {
        console.log(response);
        this.authservice.isAuthenticated = true;
        console.warn("dddd auth",this.isAuthenticated$);
        localStorage.setItem('userOnline', JSON.stringify(response));
        localStorage.setItem("isAdmin", JSON.stringify(true))
        localStorage.setItem("isStructure", JSON.stringify(false))
        localStorage.setItem("isDonateur", JSON.stringify(false))
        
        
        // localStorage.setItem('token', response.token);
        this.tS.saveToken(response.token);

        this.route.navigate(['/admin']);
      },
      (err: any) => {
        console.warn(err);
      }
    );
  } else {
    if (this.email === 'structureS@gmail.com' && this.password === user.password) {
      this.authservice.loginStructureDeSante(user).subscribe(
        (response) => {
          console.log(response);
          this.authservice.isAuthenticated = true;
          localStorage.setItem('userOnline', JSON.stringify(response));
          this.tS.saveToken(response.token);
          localStorage.setItem("isAdmin", JSON.stringify(false))
        localStorage.setItem("isStructure", JSON.stringify(true))
        localStorage.setItem("isDonateur", JSON.stringify(false))
          this.route.navigate(['/structure-de-sante']);
        },
        (err: any) => {
          console.warn(err);
        }
      );
    } else if (this.email === user.email && this.password === user.password) { // Utilisez "else if" ici
      this.authservice.loginDonateur(user).subscribe(
        (response: any) => {
          console.log(response);
          this.authservice.isAuthenticated = true;
          localStorage.setItem('userOnline', JSON.stringify(response));
          this.tS.saveToken(response.token);
          localStorage.setItem("isAdmin", JSON.stringify(false))
        localStorage.setItem("isStructure", JSON.stringify(false))
        localStorage.setItem("isDonateur", JSON.stringify(true))
          this.route.navigate(['/donneur/annonce-donneur']);
        },
        (err: any) => {
          console.warn(err);
        }
      );
    }
  }
}

  
  verifierChamps(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
  // INSCRIPTION
  register() {
    console.log(this.groupe_sanguin)
  console.log( this.prenom, this.name, this.telephone,   this.email, this.password, this.adresse, this.groupe_sanguin, this.cni, this.sexe, this.image );
  if ( this.name == '' ||  this.prenom== '' || this.telephone== '' ||  this.email == '' || this.password == '' || this.adresse=='' ||this.groupe_sanguin=='' || this.sexe=='' || this.cni=='' ) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '',
      text: 'Veillez remplir les champs',
      showConfirmButton: true,
    });
  } else if (this.email.endsWith('@') || !this.email.includes('.')) {
    // Vérifie si l'email se termine juste par @
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '',
      text: 'Veuillez saissir un email valide',
      showConfirmButton: true,
    });
  } else {
   const formData = new FormData();

formData.append("image", this.image as unknown as Blob);
formData.append("name", this.name);
formData.append("prenom", this.prenom);
formData.append("adresse", this.adresse);
formData.append("telephone", this.telephone);
formData.append("email", this.email);
formData.append("password", this.password);
formData.append("groupe_sanguin", this.groupe_sanguin);
formData.append("sexe", this.sexe);
    formData.append("cni", this.cni);

    console.log(formData);
this.authservice.register(formData).subscribe(
  (rep: any) => {
    console.log(rep);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '',
      text: 'Félicitations',
      showConfirmButton: true,
    });
    this.route.navigate(['/auth']); // Redirection vers l'auth concerné
  },
  (error: any) => {
    console.log(error);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '',
      text: 'Les informations sont incorrectes',
      showConfirmButton: true,
    });
  }
  );
 
  }
  }
 getFile(event: any) {
  console.warn(event.target.files[0]);
  this.image = event.target.files[0] as File;
 }
  
    Envoyeremail(email: string) {
    this.authservice.Envoyeremail(email).subscribe(
      (response:any) => {
        console.log("Email envoyé avec succès!", response);

        Swal.fire({
          icon: 'success',
          title: 'Email Envoyé!',
          text: 'Un e-mail de récupération de mot de passe a été envoyé à votre adresse e-mail.',
        });
      },
      (error:any) => {
        console.error("Une erreur s'est produite lors de l'envoi de l'e-mail de récupération", error);

      
      }
    );
  }

}
