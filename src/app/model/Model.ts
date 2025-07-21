export interface EmpList {
  empName: string
  empId: number
  empCode: string
  empEmailId: string
  empDesignation: string
  role: string
}
export interface Designation {
  designationId: number;
  designation: string;
};
export interface Role {
  roleId: number
  role: string
};

export interface Client {
  clientId: number
  contactPersonName: string
  companyName: string
  address: string
  city: string
  pincode: string
  state: string
  employeeStrength: number
  gstNo: string
  contactNo: string
  regNo: string
}
export class ClientModel {
  clientId: number = 0;
  contactPersonName: string = '';
  companyName: string = '';
  address: string = '';
  city: string = '';
  pincode: string = '';
  state: string = '';
  employeeStrength: number = 0;
  gstNo: string = '';
  contactNo: string = '';
  regNo: string = '';

  constructor(init?: Partial<ClientModel>) {
    Object.assign(this, init);
  }
}

export interface Clientproject{
  empName: string
  empId: number
  empCode: string
  empEmailId: string
  empDesignation: string
  projectName: string
  startDate: string
  expectedEndDate: string
  clientName: string
  clientProjectId: number
}
//forproject employee
export interface EmpProjectByProjectId {
  empName: string
  empId: number
  empCode: string
  empEmailId: string
  empDesignation: string
  projectName: string
  startDate: string
  expectedEndDate: string
  clientName: string
  clientProjectId: number
  addedDate: string
  projectEmpId: number
};

export interface projectMeetingList {
  meetingDate: string
  meetingTitle: string
  meetingMedium: string
  projectMeetingId: number
  startTime: string
  endTime: string
  projectName: string
  companyName: string
  clientId: number
  clientPersonNames: string
  leadByEmployeName: string
  meetingStatus: string
}
export interface projectChange {
  approvedByEmpId: any
  changeDate: string
  changeDetails: string
  projectChangeId: number
  projectName: string
  companyName: string
  changeApprovedBy: string
};

export interface projectPayment {
  amount: number
  paymentDate: string
  paymentMode: string
  projectPaymentId: number
  naration: string
  projectName: string
  companyName: string
  clientId: number
}