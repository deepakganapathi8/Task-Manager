import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)', height: 0, overflow: 'hidden' }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)', height: '*' }))
      ]),
      transition(':leave', [
        animate('400ms cubic-bezier(0.4, 0, 1, 1)', style({ opacity: 0, transform: 'translateY(-5px)', height: 0, overflow: 'hidden' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  isLoginMode = true;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  // Form fields
  email = '';
  password = '';
  displayName = '';
  confirmPassword = '';

  ngOnInit() {
    // Redirect to tasks if user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tasks']);
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.clearForm();
  }

  async onSubmit() {
    this.errorMessage = '';

    // Validation
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (!this.isLoginMode) {
      if (!this.displayName) {
        this.errorMessage = 'Please enter your name.';
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }
      if (this.password.length < 6) {
        this.errorMessage = 'Password must be at least 6 characters.';
        return;
      }
    }

    this.isLoading = true;

    try {
      if (this.isLoginMode) {
        // Sign in
        await this.authService.signIn(this.email, this.password);

        // Update user profile in Firestore
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          const user = this.authService.convertToUser(currentUser);
          await this.userService.createOrUpdateUserProfile(user);
        }

        this.router.navigate(['/home']);
      } else {
        // Register
        await this.authService.register(this.email, this.password, this.displayName);

        // Create user profile in Firestore
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          const user = this.authService.convertToUser(currentUser);
          await this.userService.createOrUpdateUserProfile(user);
        }

        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  async onForgotPassword() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email address.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.resetPassword(this.email);
      alert('Password reset email sent! Please check your inbox.');
    } catch (error: any) {
      this.errorMessage = error.message || 'Failed to send reset email.';
    } finally {
      this.isLoading = false;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  private clearForm() {
    this.email = '';
    this.password = '';
    this.displayName = '';
    this.confirmPassword = '';
  }
}
