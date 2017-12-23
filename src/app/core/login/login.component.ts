import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'twd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username;
  password;
  save = false;
  wrongLogin = false;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('hello');
    this.auth.login(this.username, this.password, this.save)
      .subscribe(res => {
        if (!res) {
          this.wrongLogin = true;
        }
      });
  }

}
