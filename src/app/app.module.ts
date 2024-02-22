import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './Components/accueil/accueil.component';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ProfilComponent } from './Components/profil/profil.component';
import { DataTablesModule } from 'angular-datatables';
import { ConditionComponent } from './Components/condition/condition.component';
import { PolitiqueComponent } from './Components/politique/politique.component';
import { DonneurComponent } from './Components/donneur/donneur.component';
import { DetailProfilUserComponent } from './Components/detail-profil-user/detail-profil-user.component';
import { DetailAnnonceComponent } from './Components/detail-annonce/detail-annonce.component';
import { ProfilAdminComponent } from './admin/profil-admin/profil-admin.component';
import { StructureDeSanteAdminComponent } from './admin/structure-de-sante-admin/structure-de-sante-admin.component';
import { InscritsAdminComponent } from './admin/inscrits-admin/inscrits-admin.component';
import { DonneursAdminComponent } from './admin/donneurs-admin/donneurs-admin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from 'src/service/auth-service.service';
import { AuthInterceptor } from './interceptors/interceptors';
// import { AuthInterceptor } from './interceptors/interceptors';
import { ProfilService } from 'src/service/profil.service';
// import { TokenInterceptorProvider } from 'src/service/token.interceptor';
import { MaintenanceComponent } from './Components/maintenance/maintenance.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AuthentificationComponent,
    HeaderComponent,
    FooterComponent,
    ProfilComponent,
    ConditionComponent,
    PolitiqueComponent,
    DonneurComponent,
    DetailProfilUserComponent,
    DetailAnnonceComponent,
    ProfilAdminComponent,
    StructureDeSanteAdminComponent,
    InscritsAdminComponent,
    DonneursAdminComponent,
    MaintenanceComponent,
  ],
  imports: [FormsModule,
    BrowserModule,
    AppRoutingModule,
    
    DataTablesModule,
    HttpClientModule
  ],
  providers: [
    AuthServiceService,
    // TokenInterceptorProvider
    // ProfilService,
    // {
      
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
