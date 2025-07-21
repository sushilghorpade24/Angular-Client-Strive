import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsComponent } from '../../reusableComponent/tabs/tabs.component';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { ProjectFormComponent } from '../ProjectsComponents/project-form/project-form.component';
import { ProjectChangeComponent } from '../ProjectsComponents/project-change/project-change.component';
import { ProjectEmployeeComponent } from '../ProjectsComponents/project-employee/project-employee.component';
import { ProjectMeetingsComponent } from '../ProjectsComponents/project-meetings/project-meetings.component';
import { ProjectPaymentComponent } from '../ProjectsComponents/project-payment/project-payment.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [TabsComponent, NgSwitch, NgSwitchCase, ProjectFormComponent, ProjectChangeComponent, ProjectEmployeeComponent, ProjectMeetingsComponent, ProjectPaymentComponent],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  projectId!: number;
  currentTab = 'Employees ';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('ProjectId');
      if (id) {
        this.projectId = +id; // convert to number if needed
        this.getProjectDetailsById(this.projectId);
      }
    });
  }

  getProjectDetailsById(id: number): void {
    console.log('Fetching project details for ID:', id);
    // Make API call or fetch logic here
  };


  handleTabChange(tab: string) {
    this.currentTab = tab;
  }
}
