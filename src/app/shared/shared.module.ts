import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ModalItemComponent } from './modal-item/modal-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WriteCommentComponent } from './write-comment/write-comment.component';
import { CommentsComponent } from './comments/comments.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    QuillModule,
  ],
  declarations: [
    SanitizeHtmlPipe,
    ModalItemComponent,
    WriteCommentComponent,
    CommentsComponent,
    DeleteDialogComponent,
    TextEditorComponent,
  ],
  exports: [
    SanitizeHtmlPipe,
    ModalItemComponent,
    FormsModule,
    HttpClientModule,
    WriteCommentComponent,
    CommentsComponent,
    MatDialogModule,
    DeleteDialogComponent,
    TextEditorComponent,
    QuillModule
  ],
  providers: [
  ]
})
export class SharedModule { }
