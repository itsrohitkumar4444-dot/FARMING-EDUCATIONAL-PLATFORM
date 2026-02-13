// auth.js - GreenFarm Authentication System with Encryption
// Handles user registration, login, and session management using localStorage

// Simple encryption/decryption using Base64 and Caesar cipher
const ENCRYPTION_KEY = 'GreenFarm2026SecretKey';

// Encrypt password
function encryptPassword(password) {
    const base64 = btoa(password);
    let encrypted = '';
    const shift = 7;
    
    for (let i = 0; i < base64.length; i++) {
        let charCode = base64.charCodeAt(i);
        encrypted += String.fromCharCode(charCode + shift);
    }
    
    return encrypted;
}

// Decrypt password
function decryptPassword(encrypted) {
    try {
        let decrypted = '';
        const shift = 7;
        
        for (let i = 0; i < encrypted.length; i++) {
            let charCode = encrypted.charCodeAt(i);
            decrypted += String.fromCharCode(charCode - shift);
        }
        
        return atob(decrypted);
    } catch (e) {
        return null;
    }
}

// Hash password for comparison
function hashPassword(password) {
    let hash = 0;
    const str = password + ENCRYPTION_KEY;
    
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    return encryptPassword(hash.toString(16));
}

function getUsers() {
    const usersJSON = localStorage.getItem('greenfarm_users');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

function saveUsers(users) {
    localStorage.setItem('greenfarm_users', JSON.stringify(users));
}

function getCurrentUser() {
    const currentUserJSON = localStorage.getItem('greenfarm_current_user');
    return currentUserJSON ? JSON.parse(currentUserJSON) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('greenfarm_current_user', JSON.stringify(user));
}

function clearCurrentUser() {
    localStorage.removeItem('greenfarm_current_user');
}

// Register new user
function registerUser(fullName, email, password, isGoogleAuth = false, isGuest = false) {
    const users = getUsers();
    
    if (!isGuest && !isGoogleAuth) {
        if (!fullName || fullName.trim().length < 2) {
            return { success: false, message: 'Please enter a valid name (at least 2 characters)' };
        }
        
        if (!email || !validateEmail(email)) {
            return { success: false, message: 'Please enter a valid email address' };
        }
        
        if (!password || password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters long' };
        }
    }
    
    // For Google Auth, password is now required
    if (isGoogleAuth && (!password || password.length < 6)) {
        return { success: false, message: 'Password must be at least 6 characters long' };
    }
    
    if (!isGuest) {
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            return { success: false, message: 'An account with this email already exists' };
        }
    }
    
    const newUser = {
        id: generateUserId(),
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        passwordHash: hashPassword(password), // Now always hash the password, even for Google Auth
        encryptedPassword: encryptPassword(password), // Store encrypted version
        isGoogleAuth: isGoogleAuth,
        isGuest: isGuest,
        googleId: isGoogleAuth ? generateGoogleId() : null,
        role: isGuest ? 'Guest Farmer' : 'Organic Farmer',
        memberSince: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        stats: {
            totalScore: 0,
            badges: 0,
            quizzesCompleted: 0,
            globalRank: null,
            accuracyRate: 0,
            hoursLearned: 0,
            dayStreak: 0,
            postsShared: 0
        },
        badges: [],
        recentActivity: []
    };
    
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
    
    return { success: true, user: newUser };
}

// Login user
function loginUser(email, password) {
    const users = getUsers();
    
    if (!email || !password) {
        return { success: false, message: 'Please enter both email and password' };
    }
    
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    
    if (!user) {
        return { success: false, message: 'No account found with this email address' };
    }
    
    const passwordHash = hashPassword(password);
    if (user.passwordHash !== passwordHash) {
        return { success: false, message: 'Incorrect password. Please try again.' };
    }
    
    const userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex].lastLogin = new Date().toISOString();
    saveUsers(users);
    setCurrentUser(users[userIndex]);
    
    return { success: true, user: users[userIndex] };
}

// Google Sign-In with password
function googleSignIn(googleProfile, password) {
    const users = getUsers();
    
    const existingUser = users.find(u => 
        u.email.toLowerCase() === googleProfile.email.toLowerCase() || 
        (u.googleId && u.googleId === googleProfile.id)
    );
    
    if (existingUser) {
        // If user exists and tries to sign in with Google, verify password
        if (password) {
            const passwordHash = hashPassword(password);
            if (existingUser.passwordHash !== passwordHash) {
                return { success: false, message: 'Incorrect password' };
            }
        }
        
        const userIndex = users.findIndex(u => u.id === existingUser.id);
        users[userIndex].lastLogin = new Date().toISOString();
        
        if (!users[userIndex].googleId) {
            users[userIndex].googleId = googleProfile.id;
            users[userIndex].isGoogleAuth = true;
        }
        
        // Update encrypted password if provided
        if (password) {
            users[userIndex].encryptedPassword = encryptPassword(password);
        }
        
        saveUsers(users);
        setCurrentUser(users[userIndex]);
        
        return { success: true, user: users[userIndex], isNewUser: false };
    }
    
    // New user - password is required
    if (!password || password.length < 6) {
        return { success: false, message: 'Password is required for new accounts (minimum 6 characters)' };
    }
    
    return registerUser(googleProfile.name, googleProfile.email, password, true, false);
}

// Simulate Google OAuth with password
function initiateGoogleSignIn() {
    const email = prompt('🔐 Google Sign-In\n\nEnter your Google email address:');
    
    if (!email) {
        return { success: false, message: 'Sign-in cancelled' };
    }
    
    if (!validateEmail(email)) {
        return { success: false, message: 'Please enter a valid email address' };
    }
    
    const name = prompt(`Welcome!\n\nPlease confirm your name for ${email}:`);
    
    if (!name) {
        return { success: false, message: 'Sign-in cancelled' };
    }
    
    // Request password for encryption
    const password = prompt(`Security Step\n\nPlease create a password (minimum 6 characters).\nThis will be encrypted and stored securely:`);
    
    if (!password) {
        return { success: false, message: 'Sign-in cancelled' };
    }
    
    if (password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters long' };
    }
    
    const googleProfile = {
        id: 'google_' + Date.now(),
        email: email,
        name: name,
        picture: null
    };
    
    return googleSignIn(googleProfile, password);
}

function logoutUser() {
    clearCurrentUser();
    window.location.href = 'index2.html';
}

function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateGoogleId() {
    return 'google_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function updateUserStats(updates) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) return false;
    
    users[userIndex].stats = { ...users[userIndex].stats, ...updates };
    saveUsers(users);
    setCurrentUser(users[userIndex]);
    return true;
}

function addBadge(badge) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) return false;
    
    const badgeExists = users[userIndex].badges.some(b => b.name === badge.name);
    if (badgeExists) return false;
    
    users[userIndex].badges.push({ ...badge, earnedAt: new Date().toISOString() });
    users[userIndex].stats.badges = users[userIndex].badges.length;
    
    saveUsers(users);
    setCurrentUser(users[userIndex]);
    return true;
}

function addActivity(activity) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) return false;
    
    users[userIndex].recentActivity.unshift({ ...activity, timestamp: new Date().toISOString() });
    
    if (users[userIndex].recentActivity.length > 20) {
        users[userIndex].recentActivity = users[userIndex].recentActivity.slice(0, 20);
    }
    
    saveUsers(users);
    setCurrentUser(users[userIndex]);
    return true;
}

function isUserLoggedIn() {
    return getCurrentUser() !== null;
}

function requireAuth() {
    if (!isUserLoggedIn()) {
        sessionStorage.setItem('greenfarm_redirect', window.location.pathname);
        window.location.href = 'signin.html';
    }
}

function redirectAfterLogin() {
    const redirect = sessionStorage.getItem('greenfarm_redirect');
    sessionStorage.removeItem('greenfarm_redirect');
    
    if (redirect && redirect !== '/signin.html' && redirect !== '/signup.html') {
        window.location.href = redirect;
    } else {
        window.location.href = 'Dashboard.html';
    }
}

function getAllUsersForLeaderboard() {
    const users = getUsers();
    return users
        .filter(u => !u.isGuest)
        .map(u => ({
            id: u.id,
            fullName: u.fullName,
            email: u.email,
            totalScore: u.stats.totalScore || 0,
            badges: u.stats.badges || 0,
            quizzesCompleted: u.stats.quizzesCompleted || 0,
            accuracyRate: u.stats.accuracyRate || 0
        }))
        .sort((a, b) => {
            if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
            if (b.quizzesCompleted !== a.quizzesCompleted) return b.quizzesCompleted - a.quizzesCompleted;
            return b.accuracyRate - a.accuracyRate;
        });
}

function updateUserProfile(updates) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) return false;
    
    if (updates.fullName) users[userIndex].fullName = updates.fullName.trim();
    if (updates.role) users[userIndex].role = updates.role;
    
    saveUsers(users);
    setCurrentUser(users[userIndex]);
    return true;
}

function changePassword(oldPassword, newPassword) {
    const currentUser = getCurrentUser();
    if (!currentUser) return { success: false, message: 'No user logged in' };
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) return { success: false, message: 'User not found' };
    
    const oldPasswordHash = hashPassword(oldPassword);
    if (users[userIndex].passwordHash !== oldPasswordHash) {
        return { success: false, message: 'Current password is incorrect' };
    }
    
    if (!newPassword || newPassword.length < 6) {
        return { success: false, message: 'New password must be at least 6 characters long' };
    }
    
    users[userIndex].passwordHash = hashPassword(newPassword);
    users[userIndex].encryptedPassword = encryptPassword(newPassword);
    saveUsers(users);
    setCurrentUser(users[userIndex]);
    
    return { success: true, message: 'Password changed successfully' };
}

function initializeDemoUsers() {
    const users = getUsers();
    
    if (users.length === 0) {
        const demoPassword = 'demo123';
        
        const demoUser1 = {
            id: 'user_demo_001',
            fullName: 'Rajesh Kumar',
            email: 'demo@greenfarm.com',
            passwordHash: hashPassword(demoPassword),
            encryptedPassword: encryptPassword(demoPassword),
            isGoogleAuth: false,
            isGuest: false,
            googleId: null,
            role: 'Organic Farmer',
            memberSince: '2024-01-15T00:00:00.000Z',
            lastLogin: new Date().toISOString(),
            stats: {
                totalScore: 2450,
                badges: 6,
                quizzesCompleted: 18,
                globalRank: 1,
                accuracyRate: 89,
                hoursLearned: 156,
                dayStreak: 24,
                postsShared: 43
            },
            badges: [
                { name: 'First Steps', icon: '🌟', earnedAt: '2024-01-15T00:00:00.000Z' },
                { name: 'Quiz Master', icon: '🏆', earnedAt: '2024-01-28T00:00:00.000Z' },
                { name: 'Perfect Score', icon: '💯', earnedAt: '2024-02-12T00:00:00.000Z' }
            ],
            recentActivity: []
        };
        
        const demoUser2 = {
            id: 'user_demo_002',
            fullName: 'Priya Sharma',
            email: 'priya@greenfarm.com',
            passwordHash: hashPassword(demoPassword),
            encryptedPassword: encryptPassword(demoPassword),
            isGoogleAuth: false,
            isGuest: false,
            googleId: null,
            role: 'Sustainable Agriculture Student',
            memberSince: '2024-02-01T00:00:00.000Z',
            lastLogin: new Date().toISOString(),
            stats: {
                totalScore: 1890,
                badges: 4,
                quizzesCompleted: 14,
                globalRank: 2,
                accuracyRate: 85,
                hoursLearned: 98,
                dayStreak: 15,
                postsShared: 28
            },
            badges: [
                { name: 'First Steps', icon: '🌟', earnedAt: '2024-02-01T00:00:00.000Z' },
                { name: 'Quiz Enthusiast', icon: '📚', earnedAt: '2024-02-08T00:00:00.000Z' }
            ],
            recentActivity: []
        };
        
        users.push(demoUser1, demoUser2);
        saveUsers(users);
    }
}

// Export functions
if (typeof window !== 'undefined') {
    window.encryptPassword = encryptPassword;
    window.decryptPassword = decryptPassword;
    window.hashPassword = hashPassword;
    window.getUsers = getUsers;
    window.getCurrentUser = getCurrentUser;
    window.setCurrentUser = setCurrentUser;
    window.registerUser = registerUser;
    window.loginUser = loginUser;
    window.googleSignIn = googleSignIn;
    window.initiateGoogleSignIn = initiateGoogleSignIn;
    window.logoutUser = logoutUser;
    window.updateUserStats = updateUserStats;
    window.addBadge = addBadge;
    window.addActivity = addActivity;
    window.isUserLoggedIn = isUserLoggedIn;
    window.requireAuth = requireAuth;
    window.redirectAfterLogin = redirectAfterLogin;
    window.getAllUsersForLeaderboard = getAllUsersForLeaderboard;
    window.updateUserProfile = updateUserProfile;
    window.changePassword = changePassword;
    window.validateEmail = validateEmail;
    window.initializeDemoUsers = initializeDemoUsers;
}

initializeDemoUsers();