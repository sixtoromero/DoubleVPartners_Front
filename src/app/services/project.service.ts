import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Project, RespProject } from '../interfaces/project.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {



  constructor(
    private http: HttpClient,
    private router: Router) { }

    getProjects(): Observable<RespProject> {
      const token = localStorage.getItem('AIRIStoken');

      if (!token) {
        this.router.navigateByUrl('/login');
        return throwError(() => new Error('Authentication token not found'));
      }

      const headers = new HttpHeaders({
        'x-token': token
      });

      return this.http.get<RespProject>(`${base_url}/projects`, {headers: headers});
    }

    postProject(formData: Project){

      const token = localStorage.getItem('AIRIStoken');

      if (!token) {
        this.router.navigateByUrl('/login');
        return throwError(() => new Error('Authentication token not found'));
      }

      const headers = new HttpHeaders({
        'x-token': token
      });

      return this.http.post(`${base_url}/projects`, formData, {headers: headers});
    }
}
