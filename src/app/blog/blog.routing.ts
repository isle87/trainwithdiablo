import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {path: '', component: BlogComponent, children: [
    {path: '', redirectTo: 'news', pathMatch: 'full'},
    {path: 'news', component: BlogListComponent},
    {path: 'news/:id', component: PostComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
