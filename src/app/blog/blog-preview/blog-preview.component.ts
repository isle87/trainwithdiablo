import { Component, OnInit, Input, ContentChild, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { BlogPost } from '../../models/blog-post';
import { BlogService } from '../blog.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { Observable } from 'rxjs/Observable';
import { PermissionValue, AuthService } from '../../core/auth.service';


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
  state = 'normal';
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  public logDelete: PermissionValue = new PermissionValue('blog-post-delete', false);
  public logEdit: PermissionValue = new PermissionValue('blog-post-edit', false);

  constructor(private blogService: BlogService, private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit() {
    this.img.nativeElement.style.backgroundImage = `url(${this.post.previewImage})`;
    this.auth.changeLogged$.subscribe(res => {
      this.auth.hasPermission(this.logDelete);
      this.auth.hasPermission(this.logEdit);
    })
  }

  private openDialog() {
    const dia = this.dialog.open(DeleteDialogComponent, {
      width: '200px;',
    });
    return <Observable<boolean>>dia.afterClosed();
  }

  public changeState() {
    if (this.state === 'normal') {
      this.state = 'large';
    } else {
      this.state = 'normal';
    }
  }

  public delete() {
    this.openDialog().subscribe(res => {
      if (!res)
        return;
      this.blogService.deletePost(this.post.id)
        .subscribe((resp) => {
          if (resp) this.change.emit(this);
        });
    });
  }
}
