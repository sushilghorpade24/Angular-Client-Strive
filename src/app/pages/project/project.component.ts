import { Component } from '@angular/core';
import { Clientproject } from '../../model/Model';
import { EmployeeService } from '../../service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { TabsComponent } from '../../reusableComponent/tabs/tabs.component';
import { NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { ProgressbarComponent } from '../../reusableComponent/progressbar/progressbar.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [TabsComponent, RouterLink, ProgressbarComponent, NgSwitch, NgSwitchCase, NgFor, ReactiveFormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectList: Clientproject[] = [];

  constructor(
    private empService: EmployeeService,
    private toaster: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  clientProjectForm: any;
  employeeList: any[] = [];
  clientList: any[] = [];

  ngOnInit() {
    this.clientProjectForm = this.fb.group({
      clientProjectId: [0],
      projectName: ['', Validators.required],
      startDate: [new Date().toISOString().substring(0, 16), Validators.required],
      expectedEndDate: ['', Validators.required],
      leadByEmpId: [0, Validators.required],
      completedDate: [''],
      contactPerson: ['', Validators.required],
      contactPersonContactNo: ['', Validators.required],
      totalEmpWorking: [0, Validators.required],
      projectCost: [0, Validators.required],
      projectDetails: [''],
      contactPersonEmailId: ['', [Validators.required, Validators.email]],
      clientId: [0, Validators.required]
    });
    this.getAllClientProject();
    this.getAllEmployee();
    this.getAllClient();
  }

  // currentTab = 'Basic Project';
  // handleTabChange(tab: string) {
  //     this.currentTab = tab;
  //   }


  editProject(project: any) {
    this.clientProjectForm.patchValue({
      clientProjectId: project.clientProjectId,
      projectName: project.projectName,
      startDate: project.startDate?.substring(0, 16), // Format for datetime-local
      expectedEndDate: project.expectedEndDate?.substring(0, 16),
      leadByEmpId: project.leadByEmpId,
      completedDate: project.completedDate?.substring(0, 16),
      contactPerson: project.contactPerson,
      contactPersonContactNo: project.contactPersonContactNo,
      totalEmpWorking: project.totalEmpWorking,
      projectCost: project.projectCost,
      projectDetails: project.projectDetails,
      contactPersonEmailId: project.contactPersonEmailId,
      clientId: project.clientId
    });

    // Optional: Scroll to form or switch tab if needed

  }

  getAllClientProject() {
    this.empService.getClientProject().subscribe((res: any) => {
      this.projectList = res.data;
    })
  };

  getProjectDetails(projectId: number) {
    this.router.navigateByUrl('layout/projectDetails/' + projectId)
  };
  getAllEmployee() {
    this.empService.getAllEmp().subscribe((res: any) => {
      this.employeeList = res.data;
    })
  };
  getAllClient() {
    this.empService.getClients().subscribe((res: any) => {
      this.clientList = res.data;
    })
  }

  onSubmit() {
    const values = this.clientProjectForm.value;
    this.empService.addClientProject(values).subscribe((res: any) => {
      if (res) {
        this.toaster.success("Client Project Added Successfully")
      } else {
        this.toaster.error("Error to Add Client Project")
      }
    })
  };

  deleteClientProject(id: any) {
    const isDelete = confirm("Are You Sure About Delete Employee Project");
    if (isDelete) {
      this.empService.deleteClientProject(id).subscribe((res: any) => {
        if (res) {
          this.toaster.success("Client Project Deleted Success");
        } else {
          this.toaster.error("Error To Delete Client Project")
        }
      })
    }
  }
}
