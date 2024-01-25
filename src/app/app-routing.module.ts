import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { AccueilComponent } from './Components/accueil/accueil.component';
import { AProposComponent } from './Components/a-propos/a-propos.component';
import { ProfilComponent } from './Components/profil/profil.component';
import { AdminComponent } from './Components/admin/admin.component';
import { ConditionComponent } from './Components/condition/condition.component';
import { PolitiqueComponent } from './Components/politique/politique.component';
import { AnnoncesComponent } from './Components/annonces/annonces.component';
import { DetailProfilUserComponent } from './Components/detail-profil-user/detail-profil-user.component';
import { DetailAnnonceComponent } from './Components/detail-annonce/detail-annonce.component';

const routes: Routes = [
  {path:'auth', component:AuthentificationComponent},
  {path:'accueil', component:AccueilComponent},
  {path:'a-propos', component:AProposComponent},
  { path: 'profil', component: ProfilComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'condition', component: ConditionComponent },
  { path: 'politique', component: PolitiqueComponent },
  { path: 'annonces', component: AnnoncesComponent },
  { path: 'detail-profil-user', component: DetailProfilUserComponent },
  { path: 'detail-annonce', component: DetailAnnonceComponent },
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
