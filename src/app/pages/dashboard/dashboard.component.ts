import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode  } from 'jwt-decode';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  token = localStorage.getItem('doublevpartnerstoken');

  constructor(private router: Router) {
      if (this.isTokenExpired()) {
        this.router.navigateByUrl('/login');
      }
  }

  isTokenExpired(): boolean {    
    if (!this.token) return true;

    try {
      const decodedToken: any = jwtDecode(this.token);
      const expirationTime = decodedToken.exp;
      const currentTime = Math.floor(Date.now() / 1000);

      return currentTime > expirationTime;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return true;
    }
  }

}
