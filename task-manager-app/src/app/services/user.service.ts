import { Injectable, inject } from '@angular/core';
import {
    Firestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp
} from '@angular/fire/firestore';
import { User, UserSettings } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private firestore: Firestore = inject(Firestore);
    private authService = inject(AuthService);

    constructor() { }

    // Create or update user profile in Firestore
    async createOrUpdateUserProfile(user: User): Promise<void> {
        try {
            const userRef = doc(this.firestore, `users/${user.uid}`);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                // Create new user profile
                await setDoc(userRef, {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL || null,
                    createdAt: serverTimestamp(),
                    lastLogin: serverTimestamp(),
                    settings: {
                        theme: 'light',
                        defaultPriority: 'medium',
                        sortBy: 'createdAt'
                    }
                });
            } else {
                // Update last login
                await updateDoc(userRef, {
                    lastLogin: serverTimestamp()
                });
            }
        } catch (error) {
            console.error('Error creating/updating user profile:', error);
            throw error;
        }
    }

    // Get user profile from Firestore
    async getUserProfile(uid: string): Promise<User | null> {
        try {
            const userRef = doc(this.firestore, `users/${uid}`);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const data = userDoc.data();
                return {
                    uid,
                    email: data['email'],
                    displayName: data['displayName'],
                    photoURL: data['photoURL'],
                    createdAt: data['createdAt']?.toDate() || new Date(),
                    lastLogin: data['lastLogin']?.toDate() || new Date(),
                    settings: data['settings']
                };
            }
            return null;
        } catch (error) {
            console.error('Error getting user profile:', error);
            throw error;
        }
    }

    // Update user settings
    async updateUserSettings(uid: string, settings: Partial<UserSettings>): Promise<void> {
        try {
            const userRef = doc(this.firestore, `users/${uid}`);
            await updateDoc(userRef, {
                [`settings.${Object.keys(settings)[0]}`]: Object.values(settings)[0]
            });
        } catch (error) {
            console.error('Error updating user settings:', error);
            throw error;
        }
    }

    // Update user display name
    async updateDisplayName(uid: string, displayName: string): Promise<void> {
        try {
            const userRef = doc(this.firestore, `users/${uid}`);
            await updateDoc(userRef, { displayName });
        } catch (error) {
            console.error('Error updating display name:', error);
            throw error;
        }
    }

    // Update user email in Firestore
    async updateUserEmail(uid: string, email: string): Promise<void> {
        try {
            const userRef = doc(this.firestore, `users/${uid}`);
            await updateDoc(userRef, { email });
        } catch (error) {
            console.error('Error updating email:', error);
            throw error;
        }
    }
}
