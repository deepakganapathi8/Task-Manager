import { Injectable, inject } from '@angular/core';
import {
    Auth,
    authState,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    User as FirebaseUser
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth: Auth = inject(Auth);
    public authState$: Observable<FirebaseUser | null> = authState(this.auth);

    constructor() { }

    // Get current user
    getCurrentUser(): FirebaseUser | null {
        return this.auth.currentUser;
    }

    // Check if user is authenticated
    isAuthenticated(): boolean {
        return this.auth.currentUser !== null;
    }

    // Register new user with email and password
    async register(email: string, password: string, displayName: string): Promise<void> {
        try {
            const credential = await createUserWithEmailAndPassword(this.auth, email, password);

            // Update user profile with display name
            if (credential.user) {
                await updateProfile(credential.user, { displayName });
            }
        } catch (error: any) {
            throw this.handleAuthError(error);
        }
    }

    // Sign in with email and password
    async signIn(email: string, password: string): Promise<void> {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
        } catch (error: any) {
            throw this.handleAuthError(error);
        }
    }

    // Sign out
    async signOutUser(): Promise<void> {
        try {
            await signOut(this.auth);
        } catch (error: any) {
            throw this.handleAuthError(error);
        }
    }

    // Send password reset email
    async resetPassword(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(this.auth, email);
        } catch (error: any) {
            throw this.handleAuthError(error);
        }
    }

    // Convert Firebase User to our User model
    convertToUser(firebaseUser: FirebaseUser): User {
        return {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'User',
            photoURL: firebaseUser.photoURL || undefined,
            createdAt: firebaseUser.metadata.creationTime
                ? new Date(firebaseUser.metadata.creationTime)
                : new Date(),
            lastLogin: firebaseUser.metadata.lastSignInTime
                ? new Date(firebaseUser.metadata.lastSignInTime)
                : new Date()
        };
    }

    // Handle authentication errors with user-friendly messages
    private handleAuthError(error: any): Error {
        let message = 'An error occurred during authentication.';

        switch (error.code) {
            case 'auth/email-already-in-use':
                message = 'This email is already registered. Please sign in instead.';
                break;
            case 'auth/invalid-email':
                message = 'Invalid email address.';
                break;
            case 'auth/operation-not-allowed':
                message = 'Email/password accounts are not enabled.';
                break;
            case 'auth/weak-password':
                message = 'Password is too weak. Please use at least 6 characters.';
                break;
            case 'auth/user-disabled':
                message = 'This account has been disabled.';
                break;
            case 'auth/user-not-found':
                message = 'No account found with this email.';
                break;
            case 'auth/wrong-password':
                message = 'Incorrect password.';
                break;
            case 'auth/invalid-credential':
                message = 'Invalid email or password.';
                break;
            case 'auth/network-request-failed':
                message = 'Network error. Please check your connection.';
                break;
            case 'auth/too-many-requests':
                message = 'Too many failed attempts. Please try again later.';
                break;
            default:
                message = error.message || 'Authentication failed.';
        }

        return new Error(message);
    }
}
