import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog.routing';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogComponent } from './blog.component';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';
import { BlogService } from './blog.service';
import { PostComponent } from './post/post.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ],
  declarations: [
    BlogComponent,
    BlogListComponent,
    BlogPreviewComponent,
    PostComponent,
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }
