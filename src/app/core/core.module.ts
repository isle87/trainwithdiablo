import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { ItemService } from './item.service';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { UserBarComponent } from './user-bar/user-bar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    AuthService,
    ConfigService,
    ItemService
  ],
  declarations: [DataProtectionComponent, ImpressumComponent, LoginComponent, PageNotFoundComponent, UserBarComponent],
  exports: [DataProtectionComponent, ImpressumComponent, LoginComponent, PageNotFoundComponent, UserBarComponent]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
 }
