import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'twd-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss']
})
export class UserBarComponent implements OnInit {
  public logedIn = false;

  constructor(private auth: AuthService, private router: Router) {
   }

  ngOnInit() {
    this.getData();
    this.auth.hasLoggedIn.subscribe(() => this.getData());
  }

  private getData() {
    if (!this.auth.isLogedin) {
      this.logedIn = false;
      return;
    }
    this.logedIn = true;
  }

}
