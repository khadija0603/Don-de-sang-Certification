import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    name: string = '';
  prenom: string = '';
  
  ngOnInit(): void {
    const userString = JSON.parse(localStorage.getItem('userOnline')||'[]');
    console.log('le user',userString.donateur);
    if (userString) {
      const user = userString;
      this.name = userString.donateur.name;
      this. prenom = userString.donateur.prenom;
    }
    console.log(this.name);
  }

}
