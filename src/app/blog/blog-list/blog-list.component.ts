import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BlogPost } from '../../models/blog-post';

@Component({
  selector: 'twd-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  public blogList: BlogPost[];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.blogService.getBlogPosts().subscribe(res => {
      console.log(res);
      this.blogList = res;
    });
  }

}