import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent,HeaderComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clientStrive';
   isLoggedIn: boolean = false;
constructor(private router: Router){
  
}
   ngOnInit() {
    const token = localStorage.getItem('token'); // Or your login logic
    this.isLoggedIn = !!token;
    
  }
   get showLayout(): boolean {
    const hiddenRoutes = ['/login', '/register']; // Add more routes to hide layout
    return !hiddenRoutes.includes(this.router.url);
  }
}
