import { Component } from '@angular/core';
import { cloneDeep } from 'lodash'; // Import the cloneDeep function from the 'lodash' library

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  formFields: any[] = [];

  // addField() {
  //   this.formFields.push({ title: '', type: 'input' });
  // }

  addField() {
    const lastField = this.formFields[this.formFields.length - 1];

    if (lastField && (!lastField.title || !lastField.type)) {
      // Check if the last field is incomplete before adding a new field
      alert('Please fill in the previous field before adding a new one.');
      return;
    }

    const clonedField = cloneDeep(lastField);
    this.formFields.push({ title: '', type: 'input' });
    Object.assign(lastField, clonedField);
  }
}
