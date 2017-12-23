import { Component, OnInit } from '@angular/core';
declare var Quill: any;

@Component({
  selector: 'twd-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  test = 'Hallo';
  constructor() { }

  ngOnInit() {
    const quill = new Quill('#editor', {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    });
    quill.insertEmbed(0, 'text', '<h1>Hello World</h1>');
/*     quill.on('text-cahnge', () => {

    }) */
    console.log(quill);
  }

}
