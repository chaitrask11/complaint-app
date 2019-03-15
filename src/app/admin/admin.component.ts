import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

import { CustomerService } from '../shared/customer.service';

@Component({ selector: 'app-admin',templateUrl: 'admin.component.html'})
export class AdminComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService, private customerService: CustomerService) {}

  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.customerService.form.controls;

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }


    onSubmit() {
        this.submitted = true;
        if (this.customerService.form.valid) {
          if (this.customerService.form.get('$key').value == null){
          //  this.customerService.insertCustomer(this.customerService.form.value);
          alert("please click on Update status button");
          return true;
          }
          else{
          this.customerService.updateCustomer(this.customerService.form.value);
          this.showSuccessMessage = true;
          setTimeout(() => this.showSuccessMessage = false, 3000);
          this.submitted = false;
          this.customerService.form.reset();
          }
          //this is to be done for proper reset operation
          this.customerService.form.setValue({
            $key: null,
            selectedStatus:'',
            replay: ''
          });
        }
      }


      status = 'Not_Started In_Progress Completed'.split(' ');
      selectedStatus = '';
      role = "admin";
     
}