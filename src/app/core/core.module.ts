import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { ItemService } from './item.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    ConfigService,
    ItemService
  ],
  declarations: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
 }
