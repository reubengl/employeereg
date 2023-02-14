import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
designation:string[]=[
  'System Engineer Trainee',
  'Assistant System Engineer',
  'System Engineer',
  'IT Analyst',
  'Assistant Consultant',
  'Senior Consultant.',
]
role:string[]=[
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
]
constructor( private _fb: FormBuilder,
  private _empService: EmployeeService,
  private _dialogRef: MatDialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private _coreService: CoreService){
this.empForm=this._fb.group({
  firstName:"",
  middleName:"",
  lastName:"",
  dob:"",
  doj:"",
  dor:"",
  designation:"",
  role:"",
  email:"",
 

})
}
ngOnInit(): void {
  this.empForm.patchValue(this.data);
}

onFormSubmit() {
  if (this.empForm.valid) {
    if (this.data) {
      this._empService
        .updateEmployee(this.data.id, this.empForm.value)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    } else {
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
}