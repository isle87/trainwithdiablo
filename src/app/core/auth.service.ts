import { Injectable } from '@angular/core';
import { EnumStatus } from '../models/enum-status';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Observer } from 'rxjs/Observer';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



const AutorisationStatus: Map<string, EnumStatus> = new Map<string, EnumStatus>(
  [
    ['blog-post-delete', EnumStatus.admin],
    ['blog-post-write', EnumStatus.author],
    ['blog-post-edit', EnumStatus.authorown]
  ]
);

@Injectable()
export class AuthService {
  private _hasLoggedIn: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  public hasLoggedIn = this._hasLoggedIn.asObservable();
  private User: User;

  private _isLogedin: boolean;
  public get isLogedin(): boolean {
    return this._isLogedin;
  }

  constructor(private router: Router) {
    this._isLogedin = false;
  }

  public login(username: string, password: string): Observable<boolean> {
    if (username === 'tobi' && password === 'passwort') {
      this._isLogedin = true;
      this.User = {
        Id: 2,
        Name: 'tobi',
        Password: 'passwort',
        Status: EnumStatus.admin
      };
      this._hasLoggedIn.next(null);
    }
    return Observable.create((ob: Observer<boolean>) => {
      ob.next(this.isLogedin);
      console.log(this.User);
      ob.complete();
    });
  }


  public hasPermission(action: string) {
    if (!AutorisationStatus.has(action))
      return false;
    return AutorisationStatus.get(action) <= this.User.Status;
  }

 /** Occures if the user have Logged in */
/*   public loggedIn(): Observable<void> {
    return Observable.create((ob: Observer<void>) => {
      ob.next()
    })
  }  */

}
