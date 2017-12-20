import { Component } from '@angular/core';

@Component({
  selector: 'twd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twd';
  links = [
    {
      link: 'news',
      name: 'News',
    },
    {
      link: 'news',
      name: 'Klassenguides',
    },
    {
      link: 'news',
      name: 'Guides',
    },
    {
      link: 'news',
      name: 'Grundlagen',
    },
    {
      link: 'news',
      name: 'Datenbank',
    },
  ];

  public collapse = false;

  constructor() {

  }
}
