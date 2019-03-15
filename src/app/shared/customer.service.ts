import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase: AngularFireDatabase) { }
  customerList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl(''),
    date: new FormControl(''),
    comment: new FormControl(''),
    /****admin object***/
    selectedStatus:new FormControl(''),
    replay: new FormControl('')
    
  });


  getCustomers() {
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }


  insertCustomer(customer) {
    this.customerList.push({
      title: customer.title,
      date: customer.date,
      comment: customer.comment,
     selectedStatus:customer.selectedStatus,
      replay:customer.replay
    });
  }

  populateForm(customer) {
    this.form.setValue(customer);
  }

  updateCustomer(customer) {
    this.customerList.update(customer.$key,
      {
        title: customer.title,
        date: customer.date,
        comment: customer.comment,
        selectedStatus:customer.selectedStatus,
        replay:customer.replay
      });
  }

  deleteCustomer($key: string) {
    this.customerList.remove($key);
  }

}
