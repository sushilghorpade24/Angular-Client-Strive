import { Component, ViewChild, ElementRef } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass, NgFor, NgIf } from '@angular/common';
import Chart from 'chart.js/auto';
import { RouterLink } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, RouterLink, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @ViewChild('barChartCanvas') chartCanvas!: ElementRef;

  roleList: any[] = [];
  desiganationList: any[] = [];
  employeeList: any[] = [];
  clientList: any[] = [];
  meetingList: any[] = [];
  currentTime: string = '';
  currentDate: string = '';

  constructor(private empSer: EmployeeService, private toaster: ToastrService) { }

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);

    // Sequential loading to ensure data for chart
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.getAllRoles(() => {
      this.getAllDesiganation(() => {
        this.getAllEmployee(() => {
          this.getAllClient(() => {
            this.getAllMeetings(() => {
              this.initChart(); // Only initialize chart after all data loaded
            });
          });
        });
      });
    });
  }

  getAllRoles(callback: () => void) {
    this.empSer.getAllRole().subscribe((res: any) => {
      this.roleList = res.data;
      callback();
    });
  }

  getAllDesiganation(callback: () => void) {
    this.empSer.getAllDesignation().subscribe((res: any) => {
      this.desiganationList = res.data;
      callback();
    });
  }

  getAllEmployee(callback: () => void) {
    this.empSer.getAllEmp().subscribe((res: any) => {
      this.employeeList = res.data;
      callback();
    });
  }

  getAllClient(callback: () => void) {
    this.empSer.getClients().subscribe((res: any) => {
      this.clientList = res.data;
      callback();
    });
  }

  getAllMeetings(callback: () => void) {
    this.empSer.getAllMeetings().subscribe((res: any) => {
      this.meetingList = res.data;
      callback();
    });
  }

  updateTime() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    this.currentTime = now.toLocaleTimeString('en-IN');
  }
  quickActions = [
    { label: 'Add Employee', icon: 'bi bi-person-plus', color: 'bg-primary', link: '/layout/employeeList' },
    { label: 'Schedule Meeting', icon: 'bi bi-calendar-plus', color: 'bg-success', link: '/layout/meeting' },
    { label: 'Add Client', icon: 'bi bi-building-add', color: 'bg-info', link: '/layout/client' },
    { label: 'Generate Report', icon: 'bi bi-file-earmark-bar-graph', color: 'bg-dark', link: '/reports' }
  ];

  initChart() {
    new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Roles', 'Designations', 'Employees', 'Clients', 'Meetings'],
        datasets: [{
          label: 'Counts',
          data: [
            this.roleList.length,
            this.desiganationList.length,
            this.employeeList.length,
            this.clientList.length,
            this.meetingList.length
          ],
          backgroundColor: ['#007bff', '#6f42c1', '#fd7e14', '#20c997', '#343a40'],
          borderRadius: 5,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } }
        }
      }
    });
  };
  barChartData = {
    labels: ['Roles', 'Designations', 'Employees', 'Clients', 'Meetings'],
    datasets: [{ label: 'Count', data: [5, 8, 20, 10, 3], backgroundColor: ['#0d6efd', '#6f42c1', '#fd7e14', '#20c997', '#343a40'] }]
  };

  barChartOptions = {
    responsive: true,
    plugins: { legend: { display: false } }
  };

}
