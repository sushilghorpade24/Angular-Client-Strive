import { Component, OnInit } from '@angular/core';
import { Designation, EmpList, Role } from '../../model/Model';
import { EmployeeService } from '../../service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TabsComponent } from "../../reusableComponent/tabs/tabs.component";


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, TabsComponent,TabsComponent,NgSwitch,NgSwitchCase],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'] // ✅ fixed
})
export class EmployeeListComponent implements OnInit {
  EmpList: any[] = [];
  employeeForm!: FormGroup;
  designationList: Designation[] = [];
  roleList: Role[] = [];
 
   currentTab = 'Basic Info';
  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private toaster: ToastrService,
    private http: HttpClient

  ) { }

   handleTabChange(tab: string) {
    this.currentTab = tab;
  }
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      roleId: [0],
      userName: [''],
      empCode: [''],
      empId: [0],
      empName: [''],
      empEmailId: ['', [Validators.email]],
      empDesignationId: [0],
      empContactNo: [''],
      empAltContactNo: [''],
      empPersonalEmailId: ['', [Validators.email]],
      empExpTotalYear: [0],
      empExpTotalMonth: [0],
      empCity: [''],
      empState: [''],
      empPinCode: [''],
      empAddress: [''],
      empPerCity: [''],
      empPerState: [''],
      empPerPinCode: [''],
      empPerAddress: [''],
      password: [''],

      // FormArrays
      ErpEmployeeSkills: this.fb.array([
        this.createSkillGroup()
      ]),
      ErmEmpExperiences: this.fb.array([
        this.createExperienceGroup()
      ])
    });
    this.getAllEmployees();
    this.getAllDesignation();
    this.getAllRoles();
  };
  // 🔁 Skill Group
  createSkillGroup(): FormGroup {
    return this.fb.group({
      empSkillId: [0],
      empId: [0],
      skill: [''],
      totalYearExp: [0],
      lastVersionUsed: ['']
    });
  }

  // 🔁 Experience Group
  createExperienceGroup(): FormGroup {
    return this.fb.group({
      empExpId: [0],
      empId: [0],
      companyName: [''],
      startDate: [new Date()],
      endDate: [new Date()],
      designation: [''],
      projectsWorkedOn: ['']
    });
  }

  // 🔁 Getters
  get skills(): FormArray {
    return this.employeeForm.get('ErpEmployeeSkills') as FormArray;
  }

  get experiences(): FormArray {
    return this.employeeForm.get('ErmEmpExperiences') as FormArray;
  }

  // ➕➖ Dynamic Skills
  addSkill(): void {
    this.skills.push(this.createSkillGroup());
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  // ➕➖ Dynamic Experiences
  addExperience(): void {
    this.experiences.push(this.createExperienceGroup());
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  // ✅ Submit
  // onSubmit(): void {
  //   const values = this.employeeForm.value
  //   if (this.employeeForm.valid) {
  //     this.empService.addEmployee(values).subscribe((res: any) => {
  //       if (res) {
  //         this.toaster.success("New Employee Created Sucess")
  //       } else {
  //         this.toaster.error("Error To Create New Employee")
  //       }
  //     })

  //     // Send this.employeeForm.value to API
  //   } else {
  //     this.employeeForm.markAllAsTouched();
  //   }
  // }
  onSubmit(): void {
    const formData = this.employeeForm.value;
    if (this.employeeForm.valid) {
      if (formData.empId && formData.empId > 0) {
        this.empService.updateEmployee(formData).subscribe((res: any) => {
          this.toaster.success("Employee updated successfully");
          this.getAllEmployees();
        });
      } else {
        this.empService.addEmployee(formData).subscribe((res: any) => {
          this.toaster.success("Employee created successfully");
          this.getAllEmployees();
        });
      }
    } else {
      this.employeeForm.markAllAsTouched();
    }
  };



  getAllEmployees() {
    this.empService.getAllEmp().subscribe({
      next: (res: any) => {
        if (res.result) {
          this.EmpList = res.data;
          console.log(res.data)
          this.toaster.success('Employee list fetched successfully');
        } else {
          this.toaster.warning('Failed to fetch employee list');
        }
      },
      error: (err: any) => {
        this.toaster.error('Error fetching employee list');
        console.error(err); // optional for debugging
      }
    });
  };
  getAllRoles() {
    this.empService.getAllRole().subscribe((res: any) => {
      this.roleList = res.data;
    })
  };
  getAllDesignation() {
    this.empService.getAllDesignation().subscribe((res: any) => {
      this.designationList = res.data;
    })
  };


  onEdit(emp: any): void {
    this.employeeForm.patchValue({
      roleId: emp.roleId || 0,
      userName: emp.userName || '',
      empCode: emp.empCode || '',
      empId: emp.empId || 0,
      empName: emp.empName || '',
      empEmailId: emp.empEmailId || '',
      empDesignationId: emp.empDesignationId || 0,
      empContactNo: emp.empContactNo || '',
      empAltContactNo: emp.empAltContactNo || '',
      empPersonalEmailId: emp.empPersonalEmailId || '',
      empExpTotalYear: emp.empExpTotalYear || 0,
      empExpTotalMonth: emp.empExpTotalMonth || 0,
      empCity: emp.empCity || '',
      empState: emp.empState || '',
      empPinCode: emp.empPinCode || '',
      empAddress: emp.empAddress || '',
      empPerCity: emp.empPerCity || '',
      empPerState: emp.empPerState || '',
      empPerPinCode: emp.empPerPinCode || '',
      empPerAddress: emp.empPerAddress || '',
      password: emp.password || ''
    });

    // 🔁 Skills
    this.skills.clear();
    if (emp.erpEmployeeSkills && emp.erpEmployeeSkills.length) {
      emp.erpEmployeeSkills.forEach((skill: any) => {
        this.skills.push(this.fb.group({
          empSkillId: skill.empSkillId || 0,
          empId: skill.empId || 0,
          skill: skill.skill || '',
          totalYearExp: skill.totalYearExp || 0,
          lastVersionUsed: skill.lastVersionUsed || ''
        }));
      });
    } else {
      this.addSkill();
    }

    // 🔁 Experiences
    this.experiences.clear();
    if (emp.ermEmpExperiences && emp.ermEmpExperiences.length) {
      emp.ermEmpExperiences.forEach((exp: any) => {
        this.experiences.push(this.fb.group({
          empExpId: exp.empExpId || 0,
          empId: exp.empId || 0,
          companyName: exp.companyName || '',
          startDate: exp.startDate ? new Date(exp.startDate) : new Date(),
          endDate: exp.endDate ? new Date(exp.endDate) : new Date(),
          designation: exp.designation || '',
          projectsWorkedOn: exp.projectsWorkedOn || ''
        }));
      });
    } else {
      this.addExperience();
    }
  };

  deleteEmployee(id: any) {
    const isDelete = confirm("Are you Sure About Delete");
    if (isDelete) {
      this.empService.deleteEmp(id).subscribe((res: any) => {
        if (res) {
          this.toaster.success("Employee Deleted Success")
        } else {
          this.toaster.error("Error To Delete Employee")
        }
      })
    }
  }

}
