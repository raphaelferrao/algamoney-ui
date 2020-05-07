import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
<!--
    <div class="ui-messages ui-messages-error" *ngIf="temErro()">
      {{text}}
    </div>
-->
    <p-message severity="error" [text]="text" *ngIf="temErro()" ></p-message>
  `,
  styles: []
})
export class MessageComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  temErro = (): boolean => {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
