
const crypto = require('crypto');


class AuthenticationService {
    constructor() {
        this.users = new Map();
    }

    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    generateToken() {
        return crypto.randomBytes(16).toString('hex');
    }

    registerUser(username, password) {
        if (this.hasUser(username)) {
            console.log(`User ${username} already exists.`);
            return false;
        }
        const hashedPassword = this.hashPassword(password);
        const token = this.generateToken();
        this.users.set(username, { password: hashedPassword, token });
        return true;
    }

    hasUser(username) {
        return this.users.has(username);
    }

    loginUser(username, password) {
        if (!this.hasUser(username)) {
            console.log(`User ${username} does not exist.`);
            return null;
        }
        const user = this.users.get(username);
        if (user.password === this.hashPassword(password)) {
            return user.token;
        }
        console.log(`Invalid password for user ${username}.`);
        return null;
    }

    logoutUser(username) {
        if (!this.hasUser(username)) {
            console.log(`User ${username} does not exist.`);
            return false;
        }
        this.users.get(username).token = null;
        return true;
    }

    isAuthenticated(username, token) {
        if (!this.hasUser(username)) {
            console.log(`User ${username} does not exist.`);
            return false;
        }
        const user = this.users.get(username);
        return user.token === token;    
    }
}

const authService = new AuthenticationService();
// Example usage:
authService.registerUser('user1', 'password123');
const token = authService.loginUser('user1', 'password123');
if (token) {
    console.log(`User logged in successfully. Token: ${token}`);
}   

const isAuthenticated = authService.isAuthenticated('user1', token);
if (isAuthenticated) {
    console.log('User is authenticated.');  
}

const invalidToken = authService.loginUser('user1', 'wrongpassword');
if (!invalidToken) {
    console.log('Login failed due to invalid password.');
}

const logoutSuccess = authService.logoutUser('user1');
if (logoutSuccess) {
    console.log('User logged out successfully.');
}
