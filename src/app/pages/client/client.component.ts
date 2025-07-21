import { Component } from '@angular/core';
import { ProgressbarComponent } from '../../reusableComponent/progressbar/progressbar.component';
import { Client } from '../../model/Model';
import { EmployeeService } from '../../service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { TabsComponent } from '../../reusableComponent/tabs/tabs.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ProgressbarComponent,ReactiveFormsModule,NgFor,TabsComponent,NgSwitch,NgSwitchCase],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  clientList: Client[] = [];
  clientForm!: FormGroup;
  currentTab = 'Client';

  constructor(
    private empService: EmployeeService,
    private toaster: ToastrService,
    private fb: FormBuilder
  ) {}
handleTabChange(tab: string) {
    this.currentTab = tab;
  }
  ngOnInit() {
    this.clientForm = this.fb.group({
      clientId: [0],
      companyName: ['', Validators.required],
      contactPersonName: ['', Validators.required],
      address: [''],
      city: [''],
      state: [''],
      pincode: [''],
      contactNo: ['', Validators.required],
      gstNo: [''],
      regNo: [''],
      employeeStrength: [0]
    });
    this.getAllClients();
  }

  getAllClients() {
    this.empService.getClients().subscribe((res: any) => {
      this.clientList = res.data;
      this.toaster.success("All clients Fetch Sucessfully");
    });
  };

  onSubmitClient() {
  const data = this.clientForm.value;
  if (data.clientId && data.clientId > 0) {
    this.empService.addClient(data).subscribe((res:any) => {
      this.toaster.success("Client updated");
      this.getAllClients();
      this.onRefresh();
    });
  } else {
    this.empService.addClient(data).subscribe((res:any) => {
      this.toaster.success("Client added");
      this.getAllClients();
      this.onRefresh();
    });
  }
};

editClient(client: Client) {
  this.clientForm.patchValue({
    clientId: client.clientId,
    companyName: client.companyName,
    contactPersonName: client.contactPersonName,
    address: client.address,
    city: client.city,
    state: client.state,
    pincode: client.pincode,
    contactNo: client.contactNo,
    gstNo: client.gstNo,
    regNo: client.regNo,
    employeeStrength: client.employeeStrength
  });

  // Optional: Switch to the first tab if needed
  this.currentTab = 'Basic Info';
};

onRefresh(){
   this.clientForm.reset({ clientId: 0, employeeStrength: 0 })
};
onDeleteClient(id:any){
  try {
    const isDelete=confirm("Are You Sure About Delete?");
  if(isDelete){
    this.empService.deleteClient(id).subscribe((res:any)=>{
      if(res){
        this.toaster.success("Client Deleted Success");
        this.getAllClients();
      }else{
        this.toaster.error("! Error TO Delete Client ")
      }
    })
  }
  } catch (error) {
    console.error("Fetching Error",error)
  }
}



}
