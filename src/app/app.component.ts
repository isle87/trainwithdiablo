import { Component } from '@angular/core';

@Component({
  selector: 'twd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '4fansites';
  links = [
    {
      link: 'news',
      name: 'News',
    },
    {
      link: 'x',
      name: 'Klassenguides',
    },
    {
      link: 'x',
      name: 'Guides',
    },
    {
      link: 'x',
      name: 'Grundlagen',
    },
    {
      link: 'x',
      name: 'Datenbank',
    },
  ];

  public collapse = false;

  constructor() {

  }
}
