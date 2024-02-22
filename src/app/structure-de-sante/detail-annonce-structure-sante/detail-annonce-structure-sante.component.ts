import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/service/annonce.service';

@Component({
  selector: 'app-detail-annonce-structure-sante',
  templateUrl: './detail-annonce-structure-sante.component.html',
  styleUrls: ['./detail-annonce-structure-sante.component.css']
})
export class DetailAnnonceStructureSanteComponent implements OnInit {
  constructor(private annonceService:AnnonceService) {
    
  }
 ngOnInit(): void {
   
 }

 participer(annonce: any): void {
    // Appeler votre service pour ajouter l'utilisateur à la liste des participants
    this.annonceService.participerAnnonce().subscribe(
      (response: any) => {
        console.log('Participation réussie :', response);

        // Ajouter l'utilisateur à la liste locale des participants (si nécessaire)
        annonce.participants.push(response.data);
        alert('Vous avez participé avec succès à cette annonce!');
      },
      (error: any) => {
        console.error('Erreur lors de la participation à l\'annonce :', error);
        alert('Erreur lors de la participation à l\'annonce.');
      }
    );
  }


}
