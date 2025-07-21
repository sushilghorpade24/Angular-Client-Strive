import { DatePipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EmpProjectByProjectId } from '../../../model/Model';
import { EmployeeService } from '../../../service/employee.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { subscribe } from 'diagnostics_channel';


@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [NgFor, DatePipe, ReactiveFormsModule],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css'
})
// at the top of your .ts file

export class ProjectEmployeeComponent {

  isEditMode = false;
  @Input() projectId: number = 0;
  empProjectList: EmpProjectByProjectId[] = [];
  employeeList: any[] = [];

  constructor(private empSer: EmployeeService, private fb: FormBuilder, private toaster: ToastrService) {

  }

  projectAssignForm: any;

  ngOnInit() {
    this.projectAssignForm = this.fb.group({
      projectEmpId: [0],
      employeeId: ['', Validators.required],
      projectId: ['', Validators.required],
      addedDate: [new Date().toISOString().substring(0, 16), Validators.required] // ISO format for datetime-local
    });
    this.getAllEmployeeByProjectId();
    this.getAllEmployee();
    this.projectAssignForm.patchValue({ projectId: this.projectId });
  };

  getAllEmployeeByProjectId() {
    this.empSer.getEmpByProjectId(this.projectId).subscribe((res: any) => {
      this.empProjectList = res.data;
    })
  };
  getAllEmployee() {
    this.empSer.getAllEmp().subscribe((res: any) => {
      this.employeeList = res.data
    })
  }

  onClearProjectAssignForm() {
    this.projectAssignForm.reset({
      projectEmpId: 0,
      employeeId: '',
      projectId: '',
      addedDate: new Date().toISOString().substring(0, 16)
    });
  };
  onSubmitProjectAssign() {
    const values = this.projectAssignForm.value;
    this.empSer.assignEmpProject(values).subscribe((res: any) => {
      if (res) {
        this.toaster.success("Employee Assign To project Success")
      } else {
        this.toaster.error("Error To Assign Employee To Project");
      }
    })
  };
  onEdit(empProject: any) {
    this.projectAssignForm.patchValue({
      projectEmpId: empProject.projectEmpId,
      employeeId: empProject.empId,
      projectId: empProject.projectId,
      addedDate: new Date(empProject.addedDate).toISOString().substring(0, 16)
    });
    this.isEditMode = true;

    // 🪟 Optional: open modal if you're using modal for the form
    const modalElement = document.getElementById('assignProjectModal');
    if (modalElement) {
      // If using Bootstrap 5 modal
      // @ts-ignore
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  deleteEmpFromProject(id: any) {
    const isDelete = confirm("Are You Sure About Delete Emp From Project");
    if (isDelete) {
      this.empSer.deleteempfromProject(id).subscribe((res: any) => {
        if (res) {
          this.toaster.success("Employee Removed From Project")
        } else {
          this.toaster.error("Error To Delete Employee From Project")
        }
      })
    }
  }

}
