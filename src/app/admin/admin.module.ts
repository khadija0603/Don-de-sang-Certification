import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebareComponent } from './layout/sidebare/sidebare.component';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { DataTablesModule } from 'angular-datatables';
import { DetailAnnonceAdminComponent } from './detail-annonce-admin/detail-annonce-admin.component';
// import { AnnonceAdminComponent } from './annonce-admin/annonce-admin.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SidebareComponent,
    AccueilAdminComponent,
    DetailAnnonceAdminComponent,
    // AnnonceAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule

  ]
})
export class AdminModule { }
