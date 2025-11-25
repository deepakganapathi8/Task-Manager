import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  isLoginMode = true;
  isLoading = false;
  errorMessage = '';

  // Form fields
  email = '';
  password = '';
  displayName = '';
  confirmPassword = '';

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

        this.router.navigate(['/tasks']);
      } else {
        // Register
        await this.authService.register(this.email, this.password, this.displayName);

        // Create user profile in Firestore
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          const user = this.authService.convertToUser(currentUser);
          await this.userService.createOrUpdateUserProfile(user);
        }

        this.router.navigate(['/tasks']);
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

  private clearForm() {
    this.email = '';
    this.password = '';
    this.displayName = '';
    this.confirmPassword = '';
  }
}
