import { Component, OnInit } from '@angular/core';
import { ProfilService } from 'src/service/profil.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profil-donneur',
  templateUrl: './profil-donneur.component.html',
  styleUrls: ['./profil-donneur.component.css']
})
export class ProfilDonneurComponent implements OnInit{
  userProfile: any;
  constructor(private profilService: ProfilService, private http: HttpClient) {}

  ngOnInit(): void {
    this.userProfile = this.profilService.getUserProfile();
  }
}




