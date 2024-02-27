import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  name: string = '';
  
   ngOnInit(): void {
    const userString = JSON.parse(localStorage.getItem('userOnline')||'[]');
    console.log('le user',userString.structure);
    if (userString) {
      const user = userString;
      this.name = userString.structure.name;
    }
    console.log(this.name);
  }

}
