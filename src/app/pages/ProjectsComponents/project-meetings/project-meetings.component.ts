import { Component, Input } from '@angular/core';
import { EmpProjectByProjectId, projectMeetingList } from '../../../model/Model';
import { NgFor } from '@angular/common';
import { EmployeeService } from '../../../service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-meetings',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './project-meetings.component.html',
  styleUrl: './project-meetings.component.css'
})
export class ProjectMeetingsComponent {
  @Input() projectId: number = 0;
  meetingList: projectMeetingList[] = [];
  employeeProjectList: EmpProjectByProjectId[] = [];
  meetingForm: any;

  constructor(
    private empSer: EmployeeService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.meetingForm = this.fb.group({
      projectMeetingId: [0],
      projectId: [0, Validators.required],
      meetingLeadByEmpId: [0, Validators.required],
      meetingDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      meetingMedium: ['', Validators.required],
      isRecordingAvailable: [false],
      recordingUrl: [''],
      meetingNotes: [''],
      clientPersonNames: [''],
      meetingTitle: ['', Validators.required],
      meetingStatus: ['', Validators.required]
    });
    if (this.meetingForm) {
      this.meetingForm.get('projectId')?.setValue(this.projectId);
    }
    this.getMeetingByProjectId();
    this.getEmployeeByProjectId();
  }

  getMeetingByProjectId() {
    this.empSer.getMeetingByProjectId(this.projectId).subscribe((res: any) => {
      this.meetingList = res.data;
    });
  };
  getEmployeeByProjectId() {
    this.empSer.getEmpByProjectId(this.projectId).subscribe((res: any) => {
      this.employeeProjectList = res.data;
    })
  }

  editMeeting(meeting: any) {
    this.meetingForm.patchValue(meeting);
    const modalEl = document.getElementById('addMeetingModal');
    if (modalEl && (window as any).bootstrap) {
      new (window as any).bootstrap.Modal(modalEl).show();
    }
  }
onSubmitMeeting() {
  if (this.meetingForm.invalid) {
    this.toaster.warning('Please fill in all required fields');
    return;
  }

  const values = this.meetingForm.getRawValue(); // includes readonly fields
  console.log('🟡 Final form values:', values);

  this.empSer.addMeetings(values).subscribe(
    (res: any) => {
      if (res.result) {
        this.toaster.success("New Project Meeting Scheduled Successfully");
        this.getMeetingByProjectId();
      } else {
        this.toaster.error(res.message || "Error Creating New Project Meeting");
      }
    },
    (err) => {
      console.error('🔴 API Error:', err);
      this.toaster.error("Server Error");
    }
  );
}



  onDeleteMetting(id: any) {
    const isDelete = confirm("Are You Sure Abou Delete Meetings");
    if (isDelete) {
      this.empSer.deleteMeetingById(id).subscribe((res: any) => {
        if (res) {
          this.toaster.success("Meeting Deleted Successfully");
          this.getMeetingByProjectId();
        } else {
          this.toaster.error("Error To Delete Meeting")
        }
      })
    }
  }
};


function editMeeting(meeting: any, any: any) {
  throw new Error('Function not implemented.');
}

