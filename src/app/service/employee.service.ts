import { Inject, Injectable } from '@angular/core';
import { ApiCommonUrl, GETALLEMPLOYEES } from '../constant/constant';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client, Clientproject, Designation, EmpProjectByProjectId, projectChange, projectMeetingList, projectPayment, Role } from '../model/Model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  commonApiUrl: string = "https://freeapi.miniprojectideas.com/api/ClientStrive/"
  getAllEmp() {
    return this.http.get(this.commonApiUrl + "GetAllEmployee");
  }

  addEmployee(obj: any) {
    return this.http.post(this.commonApiUrl + "CreateNewEmployee", obj);
  };
  updateEmployee(obj: any) {
    return this.http.put(this.commonApiUrl + "UpdateEmployee", obj)
  };
  deleteEmp(id: any) {
    return this.http.delete(this.commonApiUrl + "DeleteEmployeeByEmpId?empId=" + id)
  }
  getAllRole(): Observable<Designation[]> {
    return this.http.get<Designation[]>(this.commonApiUrl + "GetAllRoles");
  };
  getAllDesignation(): Observable<Role[]> {
    return this.http.get<Role[]>(this.commonApiUrl + "GetAllDesignation")
  };
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.commonApiUrl + "GetAllClients");
  };
  addClient(obj: any) {
    return this.http.post(this.commonApiUrl + "AddUpdateClient", obj)
  };
  deleteClient(id: any) {
    return this.http.delete(this.commonApiUrl + "DeleteClientByClientId?clientId=" + id)
  };

  getClientProject(): Observable<Clientproject[]> {
    return this.http.get<Clientproject[]>(this.commonApiUrl + "GetAllClientProjects");
  };
  addClientProject(obj: any) {
    return this.http.post(this.commonApiUrl + "AddUpdateClientProject", obj)

  };
  deleteClientProject(id: any) {
    return this.http.delete(this.commonApiUrl + "DeleteProjectByProjectId?projectId=" + id)
  };
  //employee project
  getEmpByProjectId(id: any): Observable<EmpProjectByProjectId[]> {
    return this.http.get<EmpProjectByProjectId[]>(this.commonApiUrl + "GetEmployeesByProjectId?projectid=" + id)
  };
  assignEmpProject(obj: any) {
    return this.http.post(this.commonApiUrl + "AddEmployeeToProject", obj)
  };
  deleteempfromProject(id: any) {
    return this.http.delete(this.commonApiUrl + "DeleteEmployeeFromProject?projectEmpId=" + id);
  };
  //meetings
  getMeetingByProjectId(id: any): Observable<projectMeetingList[]> {
    return this.http.get<projectMeetingList[]>(this.commonApiUrl + "GetAllMeetingsByProjectId?projectId=" + id)
  }

  addMeetings(obj: any) {
    // return this.http.post(this.commonApiUrl+"AddUpdateProjectMeeting",obj);
    return this.http.post("https://freeapi.miniprojectideas.com/api/ClientStrive/AddUpdateProjectMeeting", obj)
  };

  deleteMeetingById(id: any) {
    return this.http.delete(this.commonApiUrl + "DeleteMeetingByMeetingId?meetingId=" + id)
  };
  //Project change

  getAllProjectChangeByProjectId(id: any): Observable<projectChange[]> {
    return this.http.get<projectChange[]>(this.commonApiUrl + "GetAllProjectChangeByProjectId?projectId=" + id)
  };
  addProjectChange(obj: any) {
    return this.http.post(this.commonApiUrl + "AddUpdateProjectChange", obj);
  }
  deleteProjectChange(id: any) {
    return this.http.delete(this.commonApiUrl + "DeleteChangeByChangeId?changeId=" + id)
  };

  //projectPayment
  getAllPaymentByPeojectId(id: any): Observable<projectPayment[]> {
    return this.http.get<projectPayment[]>(this.commonApiUrl + "GetAllPaymentsByProjectId?projectId=" + id)
  };

  addNewPayment(obj: any) {
    return this.http.post(this.commonApiUrl + "AddUpdatePayment", obj);
  };

  deleteProjectPaymentByProjectId(id:any){
    return this.http.delete(this.commonApiUrl+"DeletePaymentByPaymentId?paymentId="+id)
  }
//dashbord
getAllMeetings(){
  return this.http.get(this.commonApiUrl+"GetAllMeetings")
}

}
