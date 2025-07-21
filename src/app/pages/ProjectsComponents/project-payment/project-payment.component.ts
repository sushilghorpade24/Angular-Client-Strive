import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { projectPayment } from '../../../model/Model';
import { DatePipe, NgFor } from '@angular/common';
declare var bootstrap: any;
@Component({
  selector: 'app-project-payment',
  standalone: true,
  imports: [NgFor, DatePipe, ReactiveFormsModule],
  templateUrl: './project-payment.component.html',
  styleUrl: './project-payment.component.css'
})
export class ProjectPaymentComponent {
  @Input() projectId: number = 0;
  paymentList: projectPayment[] = [];
  paymentForm!: FormGroup;
  @ViewChild('paymentModal') paymentModal!: ElementRef;
  constructor(private empSer: EmployeeService, private toaster: ToastrService, private fb: FormBuilder) {

  }
  ngOnInit() {
    this.initForm();
    this.getAllProjectPayment();
  }
  initForm() {
    // console.log("xyz",this.projectId)
    this.paymentForm = this.fb.group({
      projectPaymentId: [0],
      projectId: [this.projectId, Validators.required],
      paymentDate: [new Date().toISOString().substring(0, 10), Validators.required],
      paymentMode: ['cash', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      naration: ['']
    });
  };

  openEditPaymentModal(payment: any) {
    this.paymentForm.patchValue(payment);

    const modal = new bootstrap.Modal(this.paymentModal.nativeElement);
    modal.show();
  }
  openAddPaymentModal() {
   this.paymentForm.reset({
    projectPaymentId: 0,
    projectId: this.projectId, // ✅ Required
    paymentDate: new Date().toISOString().substring(0, 10),
    paymentMode: 'cash',
    amount: null,
    naration: ''});

    const modal = new bootstrap.Modal(this.paymentModal.nativeElement);
    modal.show();
  }
  closeModel() {
    const modal = new bootstrap.Modal(this.paymentModal.nativeElement);
    modal.hide();
  }
  getAllProjectPayment() {
    this.empSer.getAllPaymentByPeojectId(this.projectId).subscribe((res: any) => {
      this.paymentList = res.data;
    })
  };
 resetForm() {
  this.paymentForm.reset({
    projectPaymentId: 0,
    projectId: this.projectId, // ✅ Set to input value
    paymentDate: new Date().toISOString().substring(0, 10),
    paymentMode: 'cash',
    amount: null,
    naration: ''
  });
};

  onSubmit() {
  const values = this.paymentForm.value;

  this.empSer.addNewPayment(values).subscribe({
    next: (res: any) => {
      if (res.result) {
        this.toaster.success("New Project Payment Added Successfully");
        this.getAllProjectPayment();
        this.resetForm();
        bootstrap.Modal.getInstance(this.paymentModal.nativeElement)?.hide(); // optional
      } else {
        this.toaster.error("Error: Failed to add project payment.");
      }
    },
    error: (err) => {
      console.error("API Error:", err);
      this.toaster.error("Something went wrong. Please try again later.");
    }
  });
};

onDelete(id:any){
  const isDelete=confirm("Are You Sure About Delete Payment?");
  try {
    if(isDelete){
      this.empSer.deleteProjectPaymentByProjectId(id).subscribe((res:any)=>{
        if(res.result){
          this.toaster.success("Project Payment Deleted Success")
        }else{
          this.toaster.error("Error To Delete Project Payment")
        }
      })
    }
  } catch (err) {
    console.error("API Error:", err);
      this.toaster.error("Something went wrong. Please try again later.");
  }
}



}
