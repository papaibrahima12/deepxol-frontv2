import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {DossierService} from "./dossier.service";
import {Dossier} from "../models/dossier";

@Injectable({
  providedIn: 'root'
})
export class DossierListResolver implements Resolve<any> {

  /**
   * Constructor
   */
  constructor(private dossierService: DossierService) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dossier[]> {
    return this.dossierService.getAllDossier()
  }
}
