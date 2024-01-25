import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './Components/accueil/accueil.component';
import { AProposComponent } from './Components/a-propos/a-propos.component';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ProfilComponent } from './Components/profil/profil.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AnnoncesComponent } from './Components/annonces/annonces.component';
import { DataTablesModule } from 'angular-datatables';
import { ConditionComponent } from './Components/condition/condition.component';
import { PolitiqueComponent } from './Components/politique/politique.component';
import { DonneurComponent } from './Components/donneur/donneur.component';
import { DetailProfilUserComponent } from './Components/detail-profil-user/detail-profil-user.component';
import { DetailAnnonceComponent } from './Components/detail-annonce/detail-annonce.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AProposComponent,
    AuthentificationComponent,
    HeaderComponent,
    FooterComponent,
    ProfilComponent,
    AdminComponent,
    AnnoncesComponent,
    ConditionComponent,
    PolitiqueComponent,
    DonneurComponent,
    DetailProfilUserComponent,
    DetailAnnonceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
