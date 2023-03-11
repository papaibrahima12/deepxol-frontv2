import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private readonly _httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this._httpClient.post<any>(`${environment.apiUrl}/auth/login`, { username, password }).
    pipe(
      map(({token}) => {
        const user: { access_token: any; username: string } = {
          username: username,
          access_token: token,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(<User>user);
        return user;
      })
    );
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  public get userValue(): User {
    return this.currentUserSubject.value;
  }
  public getUsername(): string {
    return this.currentUserSubject.value.username;
  }
}
