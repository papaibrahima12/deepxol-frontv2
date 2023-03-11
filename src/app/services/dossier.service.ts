import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {Dossier} from "../models/dossier";

@Injectable({
  providedIn: 'root'
})

export class DossierService {

  private _fetchedDossiers: BehaviorSubject<Dossier[] | null> = new BehaviorSubject(null)
  private _fetchedStatistics: BehaviorSubject<any | null> = new BehaviorSubject(null)


  constructor(
    private _httpClient: HttpClient
  ) { }

  get fetchedNodes$(): Observable<Dossier[]> {
    return this._fetchedDossiers.asObservable()
  }

  get fetchedStatistics$(): Observable<any> {
    return this._fetchedStatistics.asObservable()
  }

  createDossier(data) {
    console.log(data)
    return this._httpClient.post(`${environment.apiUrl}/api/dossier`, data)
  }

  updateDossier(id: string, dossier: FormData) {
    console.log(dossier)
    return this._httpClient.put<Dossier>(`${environment.apiUrl}/api/dossier/${id}`, dossier)
  }

  getAllDossier(): Observable<Dossier[]> {
    return this._httpClient.get<Dossier[]>(`${environment.apiUrl}/api/dossier`)
      .pipe(
        tap(nodes => this._fetchedDossiers.next(nodes)),
      )
  }

  getStatistic(): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiUrl}/api/dossier/statistics`)
      .pipe(
        tap(payload => this._fetchedStatistics.next(payload)),
      )
  }
  // search(number: string): Observable<any> {
  //   return this._httpClient.get(`${environment.apiUrl}/api/dossier/number/${number}`)
  //     .pipe(map(
  //       (r: Response) => r.json())
  //     );
  // }
}
