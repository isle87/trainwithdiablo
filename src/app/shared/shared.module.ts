import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ModalItemComponent } from './modal-item/modal-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [SanitizeHtmlPipe, ModalItemComponent],
  exports: [
    SanitizeHtmlPipe,
    ModalItemComponent,
    FormsModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
