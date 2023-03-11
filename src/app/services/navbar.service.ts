import { Injectable } from '@angular/core';
import {Dossier} from "../models/dossier";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  searchOption=[]
  public dossierData: Dossier[]
  dossiersUrl : string = `${environment.apiUrl}/api/dossier`;
  constructor(private http: HttpClient) { }
  getDossiers(): Observable<Dossier[]>{
    return this.http.get<Dossier[]>(this.dossiersUrl);
  }
}
