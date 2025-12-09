import { Component, inject, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User as FirebaseUser } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  currentUser$: Observable<FirebaseUser | null> = this.authService.authState$;
  isAuthenticated$: Observable<boolean> = this.currentUser$.pipe(
    map(user => !!user)
  );

  showUserMenu = false;
  isEditMode = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  // Form fields
  editDisplayName = '';
  editEmail = '';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    if (!this.showUserMenu) {
      this.cancelEdit();
    }
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.showUserMenu) {
      this.showUserMenu = false;
      this.cancelEdit();
    }
  }

  editProfile(user: FirebaseUser) {
    this.isEditMode = true;
    this.editDisplayName = user.displayName || '';
    this.editEmail = user.email || '';
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.clearMessages();
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editDisplayName = '';
    this.editEmail = '';
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.clearMessages();
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  async saveProfile(user: FirebaseUser) {
    this.clearMessages();
    this.isLoading = true;

    try {
      let hasChanges = false;

      // Validate password fields if user wants to change password
      if (this.newPassword || this.confirmPassword || this.currentPassword) {
        if (!this.currentPassword) {
          this.errorMessage = 'Current password is required to change password.';
          this.isLoading = false;
          return;
        }
        if (!this.newPassword) {
          this.errorMessage = 'New password is required.';
          this.isLoading = false;
          return;
        }
        if (this.newPassword !== this.confirmPassword) {
          this.errorMessage = 'New passwords do not match.';
          this.isLoading = false;
          return;
        }
        if (this.newPassword.length < 6) {
          this.errorMessage = 'Password must be at least 6 characters.';
          this.isLoading = false;
          return;
        }
      }

      // Update display name
      if (this.editDisplayName && this.editDisplayName !== user.displayName) {
        await this.authService.updateUserProfile(this.editDisplayName);
        await this.userService.updateDisplayName(user.uid, this.editDisplayName);
        hasChanges = true;
      }

      // Update email
      if (this.editEmail && this.editEmail !== user.email) {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.editEmail)) {
          this.errorMessage = 'Invalid email format.';
          this.isLoading = false;
          return;
        }
        await this.authService.updateUserEmail(this.editEmail);
        await this.userService.updateUserEmail(user.uid, this.editEmail);
        hasChanges = true;

        // Sign out after email change (Firebase requirement)
        this.successMessage = 'Email updated! Please sign in with your new email.';
        setTimeout(async () => {
          await this.signOut();
        }, 2000);
        this.isLoading = false;
        return;
      }

      // Update password
      if (this.newPassword) {
        await this.authService.updateUserPassword(this.currentPassword, this.newPassword);
        hasChanges = true;
      }

      if (hasChanges) {
        this.successMessage = 'Profile updated successfully!';
        setTimeout(() => {
          this.cancelEdit();
        }, 1500);
      } else {
        this.errorMessage = 'No changes detected.';
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Failed to update profile.';
    } finally {
      this.isLoading = false;
    }
  }

  async signOut() {
    try {
      await this.authService.signOutUser();
      this.showUserMenu = false;
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
