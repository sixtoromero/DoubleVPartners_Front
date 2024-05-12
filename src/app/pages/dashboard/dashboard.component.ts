import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode  } from 'jwt-decode';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router) {
      if (this.isTokenExpired()) {
        this.router.navigateByUrl('/login');
      }
  }

  isTokenExpired(): boolean {
    debugger;
    const token = localStorage.getItem('AIRIStoken');
    if (!token) return true;

    try {
      const decodedToken: any = jwtDecode(token);
      const expirationTime = decodedToken.exp;
      const currentTime = Math.floor(Date.now() / 1000);

      return currentTime > expirationTime;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return true;
    }
  }

}
