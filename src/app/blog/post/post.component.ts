import { Component, OnInit, ViewChild, ElementRef, SecurityContext, HostListener, AfterViewInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { BlogService } from '../blog.service';
import { ViewChildren } from '@angular/core/src/metadata/di';
import { QueryList } from '@angular/core/src/linker/query_list';
import { ModalItemComponent } from '../../shared/modal-item/modal-item.component';
import { BlogPost } from '../../models/blog-post';
import { Comment } from '../../models/comment';
import { ConfigService } from '../../core/config.service';


@Component({
  selector: 'twd-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, AfterViewInit {
  public post$ = new Observable<BlogPost>();
  public elems: any; // HTMLCollectionOf<Element>;
  public tweet = 'https://twitter.com/intent/tweet?text=';
  @ViewChild('img') img: ElementRef;
  @ViewChild('set') set: ModalItemComponent;
  @ViewChild('leg') leg: ModalItemComponent;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private config: ConfigService,
    public dom: DomSanitizer,
    private blogService: BlogService) { }
    public id;
    public comments: Comment[];

  ngOnInit() {
    this.post$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.id = Number(params.get('id'));
        this.getComments();
        return this.blogService.getBlogPost(this.id);
      });

    this.post$.subscribe(res => {
      this.img.nativeElement.style.backgroundImage = `url(${res.PreviewImage})`;
      this.tweet += res.PreviewText.replace(/ /g, '%20');
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.set.type = 'Set';
      this.leg.type = 'Legendary';
      const legs: any = document.getElementsByClassName('leg');
      const sets: any = document.getElementsByClassName('set');
      for (let i = 0; i < sets.length; i++) {
        sets[i].onmouseenter = (event) => this.set.mouseEnter(event);
        sets[i].onmouseleave = (event) => this.set.mouseLeave(event);
      }
      console.log(this.elems);
      for (let i = 0; i < legs.length; i++) {
        legs[i].onmouseenter = (event) => this.leg.mouseEnter(event);
        legs[i].onmouseleave = (event) => this.leg.mouseLeave(event);
      }
    }, 100);
  }

  getComments() {
    this.blogService.getComments(this.id).subscribe(res => {
      this.comments = res;
    });
  }

  onComment(comment: Comment) {
    this.blogService.sendComment(comment).subscribe(() => {
      this.getComments();
    });
  }

}
