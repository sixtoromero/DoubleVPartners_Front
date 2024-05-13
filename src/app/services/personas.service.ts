import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response.model';
import { Observable, tap } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { PersonaModel } from '../models/personas.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Contend-Type': 'multipart/form-data',
        'Accept': 'application/json'
    })
};
  
@Injectable({
    providedIn: 'root'
})
export class PersonasService {

    endPoint = `${environment.base_url}/Personas`;

    constructor(
        private _http: HttpClient,
        private router: Router) { }
        
    insert(formData: PersonaModel): Observable<ResponseModel<boolean>> {    
        return this._http.post<ResponseModel<boolean>>(`${this.endPoint}/InsertAsync`, formData, httpOptions);
    }

    update(formData: PersonaModel): Observable<ResponseModel<boolean>> {    
        return this._http.put<ResponseModel<boolean>>(`${this.endPoint}/UpdateAsync`, formData, httpOptions);
    }

    getAll(){  
        return this._http.get<ResponseModel<PersonaModel[]>>(`${this.endPoint}/GetAllAsync`, httpOptions);        
    }

    get(id: number){  
        return this._http.get<ResponseModel<PersonaModel>>(`${this.endPoint}/GetAsync`, httpOptions);
    }
    
    delete(id: number){  
        return this._http.delete<ResponseModel<boolean>>(`${this.endPoint}/DelAsync?Id=${id}`, httpOptions);
    }
}