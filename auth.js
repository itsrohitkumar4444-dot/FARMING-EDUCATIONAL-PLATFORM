// auth.js - GreenFarm Authentication System
// Handles user registration, login, and session management using localStorage

// Initialize users array from localStorage or create empty array
function getUsers() {
    const usersJSON = localStorage.getItem('greenfarm_users');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

// Save users array to localStorage
function saveUsers(users) {
    localStorage.setItem('greenfarm_users', JSON.stringify(users));
}

// Get current logged-in user
function getCurrentUser() {
    const currentUserJSON = localStorage.getItem('greenfarm_current_user');
    return currentUserJSON ? JSON.parse(currentUserJSON) : null;
}

// Set current logged-in user
function setCurrentUser(user) {
    localStorage.setItem('greenfarm_current_user', JSON.stringify(user));
}

// Clear current user (logout)
function clearCurrentUser() {
    localStorage.removeItem('greenfarm_current_user');
}

// Register new user
function registerUser(fullName, email, password, isGoogleAuth = false, isGuest = false) {
    const users = getUsers();
    
    // For guest users, always create new account
    if (!isGuest) {
        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return {
                success: false,
                message: 'An account with this email already exists'
            };
        }
    }
    
    // Create new user object
    const newUser = {
        id: generateUserId(),
        fullName: fullName,
        email: email,
        password: password, // In production, this should be hashed
        isGoogleAuth: isGoogleAuth,
        isGuest: isGuest,
        role: isGuest ? 'Guest Farmer' : 'Organic Farmer',
        memberSince: new Date().toISOString(),
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
    
    // Add user to array
    users.push(newUser);
    saveUsers(users);
    
    // Set as current user
    setCurrentUser(newUser);
    
    return {
        success: true,
        user: newUser
    };
}

// Login user
function loginUser(email, password) {
    const users = getUsers();
    
    // Find user
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return {
            success: false,
            message: 'No account found with this email'
        };
    }
    
    // Check password (for non-Google users)
    if (!user.isGoogleAuth && user.password !== password) {
        return {
            success: false,
            message: 'Incorrect password'
        };
    }
    
    // Set as current user
    setCurrentUser(user);
    
    return {
        success: true,
        user: user
    };
}

// Logout user
function logoutUser() {
    clearCurrentUser();
    window.location.href = 'signin.html';
}

// Generate unique user ID
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Update user stats
function updateUserStats(updates) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) return false;
    
    // Update stats
    users[userIndex].stats = { ...users[userIndex].stats, ...updates };
    
    // Save to localStorage
    saveUsers(users);
    
    // Update current user
    setCurrentUser(users[userIndex]);
    
    return true;
}

// Add badge to user
function addBadge(badge) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) return false;
    
    // Add badge
    users[userIndex].badges.push({
        ...badge,
        earnedAt: new Date().toISOString()
    });
    
    // Update badge count
    users[userIndex].stats.badges = users[userIndex].badges.length;
    
    // Save to localStorage
    saveUsers(users);
    
    // Update current user
    setCurrentUser(users[userIndex]);
    
    return true;
}

// Add activity to user
function addActivity(activity) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) return false;
    
    // Add activity to the beginning of array
    users[userIndex].recentActivity.unshift({
        ...activity,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 20 activities
    if (users[userIndex].recentActivity.length > 20) {
        users[userIndex].recentActivity = users[userIndex].recentActivity.slice(0, 20);
    }
    
    // Save to localStorage
    saveUsers(users);
    
    // Update current user
    setCurrentUser(users[userIndex]);
    
    return true;
}

// Check if user is logged in
function isUserLoggedIn() {
    return getCurrentUser() !== null;
}

// Protect pages that require authentication
function requireAuth() {
    if (!isUserLoggedIn()) {
        window.location.href = 'signin.html';
    }
}

// Get all users for leaderboard
function getAllUsersForLeaderboard() {
    const users = getUsers();
    return users
        .map(u => ({
            fullName: u.fullName,
            email: u.email,
            totalScore: u.stats.totalScore,
            badges: u.stats.badges,
            quizzesCompleted: u.stats.quizzesCompleted
        }))
        .sort((a, b) => b.totalScore - a.totalScore);
}

// Update user profile
function updateUserProfile(updates) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) return false;
    
    // Update allowed fields
    if (updates.fullName) users[userIndex].fullName = updates.fullName;
    if (updates.role) users[userIndex].role = updates.role;
    
    // Save to localStorage
    saveUsers(users);
    
    // Update current user
    setCurrentUser(users[userIndex]);
    
    return true;
}

// Initialize demo users (for testing)
function initializeDemoUsers() {
    const users = getUsers();
    
    if (users.length === 0) {
        // Create a demo user
        const demoUser = {
            id: 'user_demo_001',
            fullName: 'Rajesh Kumar',
            email: 'demo@greenfarm.com',
            password: 'demo123',
            isGoogleAuth: false,
            role: 'Organic Farmer',
            memberSince: '2024-01-15T00:00:00.000Z',
            stats: {
                totalScore: 2450,
                badges: 12,
                quizzesCompleted: 37,
                globalRank: 48,
                accuracyRate: 89,
                hoursLearned: 156,
                dayStreak: 24,
                postsShared: 43
            },
            badges: [
                { name: 'First Steps', icon: '🌟', earnedAt: '2024-01-15T00:00:00.000Z' },
                { name: 'Quiz Master', icon: '🏆', earnedAt: '2024-01-28T00:00:00.000Z' },
                { name: 'Green Thumb', icon: '🌱', earnedAt: '2024-02-05T00:00:00.000Z' },
                { name: 'Water Wise', icon: '💧', earnedAt: '2024-02-08T00:00:00.000Z' },
                { name: 'Soil Scientist', icon: '🔬', earnedAt: '2024-02-10T00:00:00.000Z' },
                { name: 'Speed Demon', icon: '⚡', earnedAt: '2024-02-12T00:00:00.000Z' }
            ],
            recentActivity: [
                {
                    type: 'quiz_completed',
                    title: 'Completed "Organic Certification" Quiz',
                    description: 'Scored 95% and earned 200 points',
                    icon: '✅',
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
                },
                {
                    type: 'badge_earned',
                    title: 'New Badge Earned: "Soil Scientist"',
                    description: 'Completed all soil-related quizzes',
                    icon: '🏅',
                    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
                }
            ]
        };
        
        users.push(demoUser);
        saveUsers(users);
    }
}

// Export functions for global use
if (typeof window !== 'undefined') {
    window.getUsers = getUsers;
    window.getCurrentUser = getCurrentUser;
    window.setCurrentUser = setCurrentUser;
    window.registerUser = registerUser;
    window.loginUser = loginUser;
    window.logoutUser = logoutUser;
    window.updateUserStats = updateUserStats;
    window.addBadge = addBadge;
    window.addActivity = addActivity;
    window.isUserLoggedIn = isUserLoggedIn;
    window.requireAuth = requireAuth;
    window.getAllUsersForLeaderboard = getAllUsersForLeaderboard;
    window.updateUserProfile = updateUserProfile;
    window.initializeDemoUsers = initializeDemoUsers;
}

// Initialize demo users on load
initializeDemoUsers();