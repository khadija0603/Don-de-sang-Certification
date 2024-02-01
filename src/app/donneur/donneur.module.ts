import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonneurRoutingModule } from './donneur-routing.module';
import { ProfilDonneurComponent } from './profil-donneur/profil-donneur.component';
import { AnnonceDonneurComponent } from './annonce-donneur/annonce-donneur.component';
import { SidebareComponent } from './layout/sidebare/sidebare.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './main/main.component';
import { DetailAnnonceDonneurComponent } from './detail-annonce-donneur/detail-annonce-donneur.component';


@NgModule({
  declarations: [
    ProfilDonneurComponent,
    AnnonceDonneurComponent,
    SidebareComponent,
    HeaderComponent,
    MainComponent,
    DetailAnnonceDonneurComponent
  ],
  imports: [
    CommonModule,
    DonneurRoutingModule
  ]
})
export class DonneurModule { }
