import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../service/employee.service';
import { EmpProjectByProjectId, projectChange } from '../../../model/Model';
import { DatePipe, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
declare var bootstrap: any;
@Component({
  selector: 'app-project-change',
  standalone: true,
  imports: [DatePipe, NgFor, ReactiveFormsModule],
  templateUrl: './project-change.component.html',
  styleUrl: './project-change.component.css'
})
export class ProjectChangeComponent {
  @Input() projectId: number = 0;
  projectChangeList: projectChange[] = [];
  empListByProjectId: EmpProjectByProjectId[] = [];
  projectChangeForm!: FormGroup;
  @ViewChild('projectChangeModal', { static: false }) projectChangeModal!: ElementRef;

  constructor(private toaster: ToastrService, private empSer: EmployeeService, private fb: FormBuilder) {

  };
  ngOnInit() {

    this.initForm();
    console.log("project Id From Project Change", this.projectId);
    this.getAllProjectChangeByProjectId();
    this.getEmployeeByProjectId();
  };

  initForm() {
    this.projectChangeForm = this.fb.group({
      projectChangeId: [0],
      projectId: [this.projectId],
      changeDetails: ['', Validators.required],
      changeDate: ['', Validators.required],
      approvedByEmpId: [null, Validators.required]
    });
  }

  getAllProjectChangeByProjectId() {
    this.empSer.getAllProjectChangeByProjectId(this.projectId).subscribe((res: any) => {
      this.projectChangeList = res.data;
    })
  };
  getEmployeeByProjectId() {
    this.empSer.getEmpByProjectId(this.projectId).subscribe((res: any) => {
      this.empListByProjectId = res.data;
    })
  };
  closeModal() {
    const modalElement = this.projectChangeModal?.nativeElement;
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  }
  onReset() {
    this.projectChangeForm.reset({
      projectChangeId: 0,
      projectId: this.projectId,
      changeDetails: '',
      changeDate: '',
      approvedByEmpId: null
    });
  };

  onSubmit() {
    if (this.projectChangeForm.invalid) return;

    const payload = this.projectChangeForm.value;

    if (payload.projectChangeId) {
      // Update logic
      this.empSer.addProjectChange(payload).subscribe(() => {
        this.getAllProjectChangeByProjectId();
        this.toaster.success('Project change updated successfully!');
        this.closeModal(); // Close modal
      });
    } else {
      // Add logic
      payload.projectId = this.projectId;
      this.empSer.addProjectChange(payload).subscribe(() => {
        this.getAllProjectChangeByProjectId();
        this.toaster.success('Project change added successfully!');
        this.closeModal(); // Close modal
      });
    }
  };

  onEdit(change: projectChange) {
    this.projectChangeForm.patchValue({
      projectChangeId: change.projectChangeId,
      projectId: this.projectId,
      changeDetails: change.changeDetails,
      changeDate: change.changeDate?.substring(0, 10), // format if needed
      approvedByEmpId: change.approvedByEmpId
    });

    // Open the modal
    const modalElement = this.projectChangeModal?.nativeElement;
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  };

  onDelete(id: any) {
    const isDelete = confirm("Are You Sure About Delete?");
    if (isDelete) {
      this.empSer.deleteProjectChange(id).subscribe((res: any) => {
        if (res.result) {
          this.toaster.success("Project Change Deleted Successfully")
        } else {
          this.toaster.error("Error To Delete Project Change");
        }
      })
    }
  }

}
