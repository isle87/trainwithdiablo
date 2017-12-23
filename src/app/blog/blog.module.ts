import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog.routing';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogComponent } from './blog.component';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';
import { BlogService } from './blog.service';
import { PostComponent } from './post/post.component';
import { SharedModule } from '../shared/shared.module';
import { PostEditComponent } from './post-edit/post-edit.component';
import { AuthEditPostGuard } from './auth-edit-post.guard';
import { AuthWritePostGuard } from './auth-write-post.guard';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
  ],
  declarations: [
    BlogComponent,
    BlogListComponent,
    BlogPreviewComponent,
    PostComponent,
    PostEditComponent,
  ],
  providers: [
    BlogService,
    AuthEditPostGuard,
    AuthWritePostGuard
  ]
})
export class BlogModule { }
