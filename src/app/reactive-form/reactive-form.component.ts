import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SingletonService } from 'src/services/singleton.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  user: FormGroup;

  get getUserFullNameArray() {
    return this.user.get('fullName') as FormArray;
  }

  constructor(private fb: FormBuilder, private ss: SingletonService) {}
  ngOnInit(): void {
    this.user = this.fb.group({
      name: [''],
      address: this.fb.group({
        city: [''],
        pincode: [''],
        street: [''],
      }),
      fullName: this.fb.array([]),
    });
  }

  onSubmit() {}

  onAddNewEmailField() {
    this.getUserFullNameArray.push(
      this.fb.group({
        firstName: [''],
        lastName: [''],
      })
    );
  }

  onRemoveControl(i: number) {
    this.getUserFullNameArray.removeAt(i);
  }
}
