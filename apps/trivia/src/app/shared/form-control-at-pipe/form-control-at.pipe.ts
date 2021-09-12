import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Pipe({
	name: 'formControlAt'
})
export class FormControlAtPipe implements PipeTransform {

	transform(value: FormArray, index: number) {
		return value.at(index) as FormControl;
	}

}
