import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { LOCALE_ID } from '@angular/core';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { QuillModule } from 'ngx-quill';

// the second parameter 'fr' is optional
registerLocaleData(localeDe, 'de');


@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [
    DeleteDialogComponent,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
