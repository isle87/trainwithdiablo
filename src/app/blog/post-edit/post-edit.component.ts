import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BlogPost } from '../../models/blog-post';
import 'rxjs/add/operator/switchMap';
import { BlogService } from '../blog.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'twd-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  @ViewChild('editor') editor: ElementRef;
  public post: BlogPost;
  public id: number;
  test= 'Super!';

  constructor(private route: ActivatedRoute,
    private auth: AuthService,
    private blogService: BlogService,
    private router: Router) { }

  ngOnInit() {
    this.getPost();
  }

  private getPost() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.id = Number(params.get('id'));
        if (this.id === 0) { // It's a new post. We need a post object
        return Observable.create((ob: Observer<BlogPost>) => {
          const ho: BlogPost = {
            author: this.auth.getUsername(),
            id: 0,
            previewImage: '',
            previewText: '',
            pubDate: '',
            text: '',
            title: '',
            topic: ''
          };
          ob.next(ho);
          ob.complete();
        });
        }
        return this.blogService.getBlogPost(this.id);
      })
      .subscribe((res: any) => this.post = res);
  }

  save() {
    if (this.id) {
      console.log('saved');
      this.blogService.updatePost(this.post)
        .subscribe(res => {
          this.router.navigate(['/news']);
        });
    }
    else {
      this.blogService.setPost(this.post)
        .subscribe(res => {
          this.router.navigate(['/news']);
        });
    }
  }
}
