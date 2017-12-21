import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/comment';

@Component({
  selector: 'twd-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments: Comment[];
  constructor() { }

  ngOnInit() {
  }

}
