import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  SecurityContext,
  HostListener,
  AfterViewInit,
  Input,
  Renderer2,
  SimpleChanges
} from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { Observer } from 'rxjs/Observer';
import { AuthService, PermissionValue } from '../../core/auth.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'twd-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, AfterViewInit, OnChanges {

  /** For preview */
  @Input() postPreview: BlogPost;

  // login stuff
  public logDelete: PermissionValue = new PermissionValue('blog-post-delete', false);
  public logEdit: PermissionValue = new PermissionValue('blog-post-edit', false);

  public post: BlogPost;
  public elems: any; // HTMLCollectionOf<Element>;
  public tweet = 'https://twitter.com/intent/tweet?text=';

  @ViewChild('img') img: ElementRef;
  @ViewChild('set') set: ModalItemComponent;
  @ViewChild('leg') leg: ModalItemComponent;

  constructor(private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private config: ConfigService,
    private renderer: Renderer2,
    public dom: DomSanitizer,
    private dialog: MatDialog,
    private blogService: BlogService) { }
  public id;
  public comments: Comment[];

  ngOnInit() {
    this.decideReadOrPreview();
    this.auth.changeLogged$.subscribe(res => {
      if (res) {
        this.auth.hasPermission(this.logDelete);
        this.auth.hasPermission(this.logEdit);
      }
    });
  }

  ngAfterViewInit() {
    this.setUpHoverItemModal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('onchanges', changes);
  }

  /**
   * Decide if this component is used as preview or as public post.
   * The key is the @Input() post.
   */
  private decideReadOrPreview() {
    console.log('post', this.postPreview);
    if (!this.postPreview) { // read
      this.getPostfromServer();
    } else { // preview
      this.logDelete.permission = false; // no delete needed in preview mode
      this.logEdit.permission = false; // edit as well
      this.post = this.postPreview;
    }
    this.setupImage();
  }

  private getPostfromServer() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.id = Number(params.get('id'));
        this.getComments();
        return this.blogService.getBlogPost(this.id);
      }).subscribe(res => {
        this.post = res;
      });
  }

  private setupImage() {
    this.img.nativeElement.style.backgroundImage = `url(${this.post.PreviewImage})`;
    this.tweet += this.post.PreviewText.replace(/ /g, '%20');
  }

  private setUpHoverItemModal() {
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

  private getComments() {
    this.blogService.getComments(this.id).subscribe(res => {
      this.comments = res;
    });
  }

  public onComment(comment: Comment) {
    this.blogService.sendComment(comment).subscribe(() => {
      this.getComments();
    });
  }

  public delete() {
    this.openDialog().subscribe(res => {
      if (!res)
        return;
      this.blogService.deletePost(this.post.id)
        .subscribe((resp) => {
          if (resp) this.router.navigate(['/news']);
        });
    });
  }

  private openDialog() {
    const dia = this.dialog.open(DeleteDialogComponent, {
      width: '200px;',
    });
    return <Observable<boolean>>dia.afterClosed();
  }
}
