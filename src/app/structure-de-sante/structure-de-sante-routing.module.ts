import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProfilStructureDeSanteComponent } from './profil-structure-de-sante/profil-structure-de-sante.component';
import { AnnonceStructureDeSanteComponent } from './annonce-structure-de-sante/annonce-structure-de-sante.component';

const routes: Routes = [

   {path: '', component: MainComponent, children: [
    {path:'annonce-structure-de-sante', component: AnnonceStructureDeSanteComponent},
    { path: 'profil-structure-de-sante', component: ProfilStructureDeSanteComponent },
    {path:'', redirectTo: 'annonce-structure-de-sante', pathMatch: 'full'},
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructureDeSanteRoutingModule {

}
