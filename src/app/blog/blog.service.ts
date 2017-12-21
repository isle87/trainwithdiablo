import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { POSTS } from './posts.mock';
import { BlogPost } from '../models/blog-post';
import { Comment } from '../models/comment';
import { COMMENTS } from './comment.mock';

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
      ob.complete();
    });
  }

  public sendComment(comment: Comment): Observable<boolean> {
    const comres = Object.assign({}, comment);
    console.log(comres);
    return Observable.create((ob: Observer<boolean>) => {
      comres.id = COMMENTS.length;
      COMMENTS.push(comres);
      ob.next(true);
      ob.complete();
    });
  }

  public getComments(postId: number): Observable<Comment[]> {
    const filtered = COMMENTS.filter(ele => ele.postId && ele.postId === postId )
      .sort((a, b) => Date.parse(b.PubDate) - Date.parse(a.PubDate));
    return Observable.create((ob: Observer<Comment[]> ) => {
      ob.next(filtered);
      ob.complete();
    });
  }
}
