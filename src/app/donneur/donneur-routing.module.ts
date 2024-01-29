import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AnnonceDonneurComponent } from '../donneur/annonce-donneur/annonce-donneur.component';
import { ProfilDonneurComponent } from './profil-donneur/profil-donneur.component';

const routes: Routes = [
  
  {path: '', component: MainComponent, children: [
    {path:'annonce-donneur', component: AnnonceDonneurComponent},
    { path: 'profil-donneur', component: ProfilDonneurComponent },
    {path:'', redirectTo: 'annonce-donneur', pathMatch: 'full'},
  ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonneurRoutingModule { }
