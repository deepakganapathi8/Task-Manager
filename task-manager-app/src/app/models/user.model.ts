export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    createdAt: Date;
    lastLogin: Date;
    settings?: UserSettings;
}

export interface UserSettings {
    theme: 'light' | 'dark';
    defaultPriority: 'low' | 'medium' | 'high';
    sortBy: 'createdAt' | 'priority' | 'title';
}
