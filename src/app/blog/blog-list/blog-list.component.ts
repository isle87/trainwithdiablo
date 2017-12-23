import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BlogPost } from '../../models/blog-post';
import { AuthService, PermissionValue } from '../../core/auth.service';

@Component({
  selector: 'twd-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  public blogList: BlogPost[];
  public logWrite: PermissionValue = new PermissionValue('blog-post-write', false);

  constructor(private blogService: BlogService, private auth: AuthService) { }

  ngOnInit() {
    this.init();

    this.auth.changeLogged$.subscribe(res => {
        this.auth.hasPermission(this.logWrite);

    });
  }

  private init() {
    this.blogService.getBlogPosts().subscribe(res => {
      this.blogList = res;
    });
  }

}
