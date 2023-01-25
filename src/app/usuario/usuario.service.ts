import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {usuarioCreacionDTO,usuarioDTO} from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  private apiURL = environment.apiURL + 'usuarios';

  public crear(usuario: usuarioCreacionDTO)
  {
    return this.http.post(this.apiURL+'/crear',usuario)
  }

  public getAll(): Observable<any>{
    return this.http.get<usuarioDTO[]>(environment.apiURL+"usuarios",{observe: 'response'})
  }
}
