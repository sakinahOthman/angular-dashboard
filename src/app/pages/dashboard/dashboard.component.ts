import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from 'src/app/components/sidebar/sidebar.component';
import { Topbar } from 'src/app/components/topbar/topbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [FormsModule, Sidebar, Topbar]
})
export class DashboardComponent {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  login() {

    
  }

}