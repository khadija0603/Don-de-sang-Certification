import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { AccueilComponent } from './Components/accueil/accueil.component';
import { ProfilComponent } from './Components/profil/profil.component';
import { ConditionComponent } from './Components/condition/condition.component';
import { PolitiqueComponent } from './Components/politique/politique.component';
import { AnnoncesComponent } from './Components/annonces/annonces.component';
import { DetailProfilUserComponent } from './Components/detail-profil-user/detail-profil-user.component';
import { DetailAnnonceComponent } from './Components/detail-annonce/detail-annonce.component';
import { DonneurComponent } from './Components/donneur/donneur.component';
import { MaintenanceComponent } from './Components/maintenance/maintenance.component';
import { AdminGuard, DonateurGuard, StructureGuard } from './guard/auth.guard';
// import { AuthGuard } from './guard/auth.guard';
// import {AuthGuard} from './guard/auth.guard';
// import { DonnateurGuard, StructureGuard, authGuard } from './guard/auth.guard';


const routes: Routes = [
  {path:'auth', component:AuthentificationComponent},
  {path:'accueil', component:AccueilComponent},
  { path: 'profil', component: ProfilComponent },
  { path: 'condition', component: ConditionComponent },
  { path: 'politique', component: PolitiqueComponent },
  { path: 'annonces', component: AnnoncesComponent },
  { path: 'donneur', component: DonneurComponent },
  { path: 'detail-profil-user', component: DetailProfilUserComponent },
  { path: 'detail-annonce', component: DetailAnnonceComponent },
    {path:'', redirectTo: 'accueil', pathMatch: 'full'},
  { path: 'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule), canActivate:[AdminGuard]},
  { path: 'donneur',loadChildren:()=>import('./donneur/donneur.module').then(m=>m.DonneurModule), canActivate:[DonateurGuard]},
  { path: 'structure-de-sante',loadChildren:()=>import('./structure-de-sante/structure-de-sante.module').then(m=>m.StructureDeSanteModule), canActivate:[StructureGuard]},
  { path: '**', component: MaintenanceComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
  
export class AppRoutingModule { }
