import { Injectable } from '@angular/core';
import { EnumStatus } from '../models/enum-status';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Observer } from 'rxjs/Observer';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


/** Contains the Permission levels */
const PermissionLevels: Map<string, EnumStatus> = new Map<string, EnumStatus>(
  [
    ['blog-post-delete', EnumStatus.admin],
    ['blog-post-write', EnumStatus.author],
    ['blog-post-edit', EnumStatus.authorown]
  ]
);

/** Object to handle permissions */
export class PermissionValue {
  constructor(
    /** The key from AutorisationStatus */
    public key: string,
    /** Permissions */
    public permission: boolean
  ) {}
}

@Injectable()
export class AuthService {
  /** Use it to emit that the user has logged in */
  private _hasLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /** Occurs if the user has logged in */
  public hasLoggedIn$ = this._hasLoggedIn.asObservable();
  /** Use it to emit that the user has logged out */
  private _hasLoggedOut: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /** Occurs if the user has logged out */
  public hasLoggedOut$ = this._hasLoggedOut.asObservable();

  private _changeLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLogedin);
  public changeLogged$ = this._changeLogged.asObservable();

  private User: User;
  public redirectUrl: string;

  private _isLogedin: boolean;
  public get isLogedin(): boolean {
    return this._isLogedin;
  }

  constructor(private router: Router) {
    this._isLogedin = false;
    this.checkSavedData();
  }

  public login(username: string, password: string, saveData: boolean = false): Observable<boolean> {
    if (username === 'tobi' && password === 'passwort') {

      this.User = {
        id: 2,
        name: 'tobi',
        password: 'passwort',
        status: EnumStatus.admin
      };
      this.onLogin();
      if (saveData) this.saveData();
      this.routeAfterLogin();
    }
    return Observable.create((ob: Observer<boolean>) => {
      ob.next(this.isLogedin);
      ob.complete();
    });
  }

  private onLogin() {
    this._isLogedin = true;
    this._hasLoggedIn.next(true);
    this._changeLogged.next(true);
  }

  routeAfterLogin() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = undefined;
    } else {
      this.router.navigate(['/news']);
    }
  }

  public hasPermission(perm: PermissionValue) {
    if (!this.isLogedin) {
      perm.permission = false;
      return;
    }
    if (!PermissionLevels.has(perm.key))
      throw new Error(`The PermissionValue ${perm.key} key doesn't exist on PermissionLevels.
        Maybe you should add it to it.`);
     perm.permission = this.User.status <= this.User.status;
  }

  public logOut() {
    this.User = undefined;
    this._isLogedin = false;
    this._hasLoggedOut.next(true);
    this._changeLogged.next(false);
    localStorage.clear();
    this.router.navigate(['/news']);
  }

  public getUsername() {
    if (!this.isLogedin)
      return;

    return this.User.name;
  }

  private saveData() {
    localStorage.setItem('Username', this.User.name);
    localStorage.setItem('Password', this.User.password);
  }

  private checkSavedData() {
    if (localStorage && localStorage.getItem('Username') && localStorage.getItem('Password')) {
      this.login(localStorage.getItem('Username'), localStorage.getItem('Password'));
    }
  }



}
