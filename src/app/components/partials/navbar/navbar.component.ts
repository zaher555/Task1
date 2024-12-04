import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { authService } from '../../../services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
}) 
export class NavbarComponent implements OnInit{
  constructor(private authService:authService,private router:Router){}
  loginButton:boolean=true
  bar:boolean=false
  private checkUser:boolean=false
  private _snackBar = inject(MatSnackBar);
  _snackBarRef = inject(MatSnackBar);
  durationInSeconds = 2;
  user: any; // This will hold the parsed user object
  email: string = ''; // This is the email you want to assign

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    // Check if user exists and has an email
    if (this.user && this.user.email) {
      this.email = this.user.email; // Assign the email from the user object
      this.loginButton=false
      console.log(this.email)
    } else {
      console.error('User or email not found in localStorage');
    }  }
  logout()
  {
    this.authService.logout().subscribe({
      next:(data:any)=>{
        localStorage.removeItem('token');
        console.log('logged out successfully');
        this.bar!=this.bar
        this._snackBar.open('Logout Successful!', 'Close', {
          duration: this.durationInSeconds * 1000,
        });
        this.router.navigate(['login']);
        localStorage.removeItem('user');
      },
      error:(err:any)=>
      {
        this._snackBar.open('Logout Failed. Please try again.', 'Close', {
          duration: this.durationInSeconds * 1000,
        });      
        localStorage.removeItem('user');
      }
    })
  }
}
