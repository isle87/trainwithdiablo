import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Comment } from '../../models/comment';
import { Output } from '@angular/core';

@Component({
  selector: 'twd-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.scss']
})
export class WriteCommentComponent {
  @Input() postId: number;
  @Output() onComment: EventEmitter<Comment> = new EventEmitter();
  public comment: Comment = new Comment('');


  onSubmit() {
    this.comment.userId = 1;
    this.comment.username = 'Gast';
    this.comment.postId = this.postId;
    this.comment.pubDate = new Date(Date.now()).toISOString();
    console.log(this.comment);
    this.onComment.emit(this.comment);
    this.comment = new Comment('');
  }
}
