import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class ConfigService {

  config =
  {
    'key': '65eszuafqxp33g7rtrnn2kjh8bgp4rsh',
    'secret': 'SnmmZPuZnnwuAnpjaTMkHVTDYSm9NeG7',
    'apiurl': 'https://eu.api.battle.net/d3/data/item/',
    'mediaurl': 'http://media.blizzard.com/d3/icons/items/large/',
    'locale': 'de_DE',
  };

  constructor() { }

  public getConfig(key: string) {
    return this.config[key];
  }
}
