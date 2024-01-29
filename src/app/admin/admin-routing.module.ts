import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { DonneursAdminComponent } from './donneurs-admin/donneurs-admin.component';
import { InscritsAdminComponent } from './inscrits-admin/inscrits-admin.component';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { StructureDeSanteAdminComponent } from './structure-de-sante-admin/structure-de-sante-admin.component';
import { AnnonceAdminComponent } from './annonce-admin/annonce-admin.component';

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path:'accueil-admin', component: AccueilAdminComponent},
    {path:'annonce-admin', component: AnnonceAdminComponent},
    {path:'donneurs-admin', component: DonneursAdminComponent},
    {path:'inscrits-admin', component: InscritsAdminComponent},
    {path:'profil-admin', component: ProfilAdminComponent},
    { path: 'structure-de-sante-admin', component: StructureDeSanteAdminComponent },
    {path:'', redirectTo: 'accueil-admin', pathMatch: 'full'},
  ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
