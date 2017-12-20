import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { POSTS } from './posts.mock';
import { BlogPost } from '../models/blog-post';

@Injectable()
export class BlogService {

  constructor() { }

  public getBlogPosts(): Observable<BlogPost[]> {
    return Observable.create((ob: Observer<BlogPost[]>) => {
      ob.next(POSTS);
      ob.complete();
    });
  }

  public getBlogPost(id: number): Observable<BlogPost> {
    return Observable.create((ob: Observer<BlogPost>) => {
      ob.next(POSTS.find(ele => ele.id === id));
    });
  }
}
