import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // ✅ Corrected from styleUrl ➝ styleUrls
})
export class LoginComponent {

  // ✅ Reactive property binding
  userLogin = {
    username: '',
    password: ''
  };

  // ✅ Flags for form behavior
  flipped = false;
  showPassword = false;

  // ✅ Dependencies via constructor
  private router = inject(Router);

  constructor(
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  // ✅ Toggle card flip for login/signup
  toggleForm(): void {
    this.flipped = !this.flipped;
  }

  // ✅ Toggle show/hide password
  togglePassword(input: HTMLInputElement): void {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  // ✅ Handle login
  onLogin(): void {
    this.http.post("https://freeapi.miniprojectideas.com/api/ClientStrive/Login", this.userLogin).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.toastr.success('Login Successful!', 'Success');
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('leaveUser', JSON.stringify(res.data));
          console.log('Login successful:', res);
          this.router.navigateByUrl('/layout/dashboard');
        } else {
          this.toastr.error('Invalid credentials!', 'Login Failed');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.toastr.error('Something went wrong. Try again.', 'Error');
      }
    });
  }
}
