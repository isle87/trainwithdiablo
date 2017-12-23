import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'twd-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss']
})
export class UserBarComponent implements OnInit {
  public loggedIn = false;
  public name;

  constructor(private auth: AuthService, private router: Router) {
   }

  ngOnInit() {
    // this.getData();
    console.log(this.loggedIn);
    this.auth.changeLogged$.subscribe((res) => {
      console.log('logout');
        this.loggedIn = res;
        if (res) {
          this.name = this.auth.getUsername();
        }
    });
  }

  public logout() {
    this.auth.logOut();
  }

}
