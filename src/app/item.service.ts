import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {
  private apiurl: string;
  private key: string;
  private locale: string;

  constructor(private config: ConfigService, private http: HttpClient) {
    this.init();
  }

  private init() {
    this.apiurl = this.config.getConfig('apiurl');
    this.key = this.config.getConfig('key');
    this.locale = this.config.getConfig('locale');
  }

  private buildUrl(id: string) {
    // https://eu.api.battle.net/d3/data/item/P61_Unique_Ring_01?locale=en_GB&apikey=65eszuafqxp33g7rtrnn2kjh8bgp4rsh

    return this.apiurl + id + '?locale=' + this.locale + '&apikey=' + this.key;
  }

  getItemData(id: string): Observable<any> {
    const url = this.buildUrl(id);
    return this.http.get(url);
  }

}
