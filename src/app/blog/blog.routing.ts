import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { PostComponent } from './post/post.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { AuthEditPostGuard } from './auth-edit-post.guard';
import { AuthWritePostGuard } from './auth-write-post.guard';

const routes: Routes = [
  {path: '', component: BlogComponent, children: [
    {path: '', redirectTo: 'news', pathMatch: 'full'},
    {path: 'news', component: BlogListComponent},
    {path: 'news/edit/:id', component: PostEditComponent, canActivate: [AuthEditPostGuard]}, // TODO: AuthGuard
    {path: 'news/new', component: PostEditComponent, canActivate: [AuthWritePostGuard]}, // TODO: AuthGuard
    {path: 'news/:id', component: PostComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
