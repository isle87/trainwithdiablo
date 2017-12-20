import { Component, OnInit, Input, ContentChild, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { BlogPost } from '../../models/blog-post';

@Component({
  selector: 'twd-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.scss'],
  animations: [
    trigger('hover', [
        state('normal', style({
            transform: 'scale(1)',
        })),
        state('large', style({
            transform: 'scale(1.01)',
        })),
        transition('small => large', animate('100ms ease-in')),
    ]),
  ]
})
export class BlogPreviewComponent implements OnInit {
  @Input() post: BlogPost;
  @ViewChild('img') img: ElementRef;
  state= 'normal';

  constructor() { }

  ngOnInit() {
    this.img.nativeElement.style.backgroundImage = `url(${this.post.PreviewImage})`;
  }

  changeState() {
    if (this.state === 'normal') {
      this.state = 'large';
    } else {
      this.state = 'normal';
    }
  }

}
