import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DataProtectionComponent } from './core/data-protection/data-protection.component';
import { ImpressumComponent } from './core/impressum/impressum.component';
import { LoginComponent } from './core/login/login.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { UserBarComponent } from './core/user-bar/user-bar.component';

const routes: Routes = [
  // { path: '', component: UserBarComponent, outlet: 'userbar'},
  { path: 'user', component: UserBarComponent, outlet: 'userbar'},
  { path: '', loadChildren: 'app/blog/blog.module#BlogModule' },
  { path: 'datenschutz', component: DataProtectionComponent },
  { path: 'impressum', component: ImpressumComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', component: PageNotFoundComponent},


  // { path: 'path/:routeParam', component: MyComponent },
  // { path: 'staticPath', component: ... },
  // { path: '**', component: ... },
  // { path: 'oldPath', redirectTo: '/staticPath' },
  // { path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
