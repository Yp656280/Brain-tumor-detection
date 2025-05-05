import { Client, Account, ID } from "appwrite";

class AuthService {
  static instance;
  client;
  account;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance; // Return existing instance
    }

    console.log("AuthService initialized"); // Debugging

    this.client = new Client()
      .setEndpoint(process.env.NEXT_APPWRITE_URL) // Your API Endpoint
      .setProject(process.env.NEXT_APPWRITE_PROJECT_ID); // Your project ID

    this.account = new Account(this.client);
    AuthService.instance = this; // Save instance
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return userAccount ? this.login({ email, password }) : userAccount;
    } catch (error) {
      console.error("Error creating account:", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error in login:", error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Error in logout:", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }
}

// Export a single instance
const authService = new AuthService();
export default authService;
