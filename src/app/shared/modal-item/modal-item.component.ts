// tslint:disable:no-inferrable-types
import { Component, OnInit, Input, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ItemService } from '../../core/item.service';
import { ConfigService } from '../../core/config.service';

declare var jQuery: any;

@Component({
  selector: 'twd-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss']
})
export class ModalItemComponent implements OnInit {

  /*   @Input() hidden: boolean = true;
    @Input() posX: number = 0;
    @Input() posY: number = 0;
    @Input() link: string = ''; */
  /*   @Input() mouseEnter: (event: any) => void;
    @Input() mouseLeave: (event: any) => void; */

  @Input() type: 'Legendary' | 'Set';
  hidden = true;
  posX: number = 0;
  posY: number = 0;
  link: string = '';
  public item: any;
  public img;
  private items: Map<string, any> = new Map();
  private mediaUrl;
  @ViewChild('card') card: ElementRef;
  public green = false;
  private timeout: any;

  constructor(public renderer: Renderer2, private itemService: ItemService, private config: ConfigService) { }

  ngOnInit() {
    this.mediaUrl = this.config.getConfig('mediaurl');
    this.addId();
  }

  // tslint:disable-next-line:no-unnecessary-initializer
  addId(event = undefined) {
    if (this.link && this.link !== '') {
      const ho = this.link.split('-');
      this.getItemData(ho[ho.length - 1], event);
    }
  }

  changeDimensions(event) {
    const dx = 250;
    const dy = jQuery(this.card.nativeElement).height() + 20;
    const offsetY = 50;
    const viewX = event.view.innerWidth;
    const viewY = event.view.innerHeight;
    if (event.x + dx > viewX) {
      this.posX = event.x - dx;
    } else {
      this.posX = event.x;
    }
    if (event.y + dy > viewY) {
      this.posY = event.pageY - dy;
    } else {
      this.posY = event.pageY + offsetY;
    }
    this.renderer.setStyle(this.card.nativeElement, 'top', `${this.posY}px`);
    this.renderer.setStyle(this.card.nativeElement, 'left', `${this.posX}px`);
    this.hidden = false;
    console.log(this.type, 'type');
  }

  public mouseEnter(event) {
    this.link = event.srcElement.href;
    this.addId(event);
  }

  mouseLeave(event) {
    clearTimeout(this.timeout);
    this.hidden = true;
  }

  getItemData(id: string, event) {

    if (this.items.has(id)) {
      this.item = this.items.get(id);
      this.img = this.mediaUrl + this.item.icon + '.png';
      this.timeout = setTimeout(() => this.changeDimensions(event), 100);
      return;
    }

    if (id) {
      console.warn('request to blizzard');
      this.itemService.getItemData(id).subscribe(res => {
        this.item = res;
        this.items.set(id, this.item);
        this.img = this.mediaUrl + res.icon + '.png';
        this.timeout = setTimeout(() => this.changeDimensions(event), 100);
        console.log(this.items);
      });
    }
  }

}
