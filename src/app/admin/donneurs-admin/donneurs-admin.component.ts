import { Component } from '@angular/core';

@Component({
  selector: 'app-donneurs-admin',
  templateUrl: './donneurs-admin.component.html',
  styleUrls: ['./donneurs-admin.component.css']
})
export class DonneursAdminComponent {
dtOptions: DataTables.Settings = {};
   ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/script/sidebar.js';
    document.body.appendChild(script);
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength:5,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
 }
}
