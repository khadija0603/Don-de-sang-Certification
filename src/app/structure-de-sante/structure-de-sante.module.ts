import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureDeSanteRoutingModule } from './structure-de-sante-routing.module';
import { ProfilStructureDeSanteComponent } from './profil-structure-de-sante/profil-structure-de-sante.component';
import { SidebareComponent } from './layout/sidebare/sidebare.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './main/main.component';
import { AnnonceStructureDeSanteComponent } from './annonce-structure-de-sante/annonce-structure-de-sante.component';
import { DetailAnnonceStructureSanteComponent } from './detail-annonce-structure-sante/detail-annonce-structure-sante.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ProfilStructureDeSanteComponent,
    SidebareComponent,
    HeaderComponent,
    MainComponent,
    AnnonceStructureDeSanteComponent,
    DetailAnnonceStructureSanteComponent
  ],
  imports: [
    CommonModule,
    StructureDeSanteRoutingModule,
    FormsModule,
     DataTablesModule,
  ]
})
export class StructureDeSanteModule { }
