// Storage Manager for Chat Application
// Handles all localStorage operations

class ChatStorage {
    constructor() {
        this.STORAGE_KEYS = {
            MESSAGES: 'chatApp_messages',
            USERNAME: 'chatApp_username',
            PROFILE_PIC: 'chatApp_profilePic',
            PROFILE_PIC_SRC: 'chatApp_profilePicSrc'
        };
    }

    // Message Storage
    saveMessages(messages) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
            return true;
        } catch (error) {
            console.warn('Could not save messages to localStorage:', error);
            return false;
        }
    }

    loadMessages() {
        try {
            const savedMessages = localStorage.getItem(this.STORAGE_KEYS.MESSAGES);
            if (savedMessages) {
                return JSON.parse(savedMessages);
            }
        } catch (error) {
            console.warn('Could not load messages from localStorage:', error);
        }
        return null;
    }

    // Username Storage
    saveUsername(username) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.USERNAME, username);
            return true;
        } catch (error) {
            console.warn('Could not save username to localStorage:', error);
            return false;
        }
    }

    loadUsername() {
        try {
            const savedUsername = localStorage.getItem(this.STORAGE_KEYS.USERNAME);
            return savedUsername || null;
        } catch (error) {
            console.warn('Could not load username from localStorage:', error);
            return null;
        }
    }

    // Profile Picture Storage
    saveProfilePic(profilePicIndex) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.PROFILE_PIC, profilePicIndex.toString());
            return true;
        } catch (error) {
            console.warn('Could not save profile picture to localStorage:', error);
            return false;
        }
    }

    loadProfilePic() {
        try {
            const savedProfilePic = localStorage.getItem(this.STORAGE_KEYS.PROFILE_PIC);
            return savedProfilePic ? parseInt(savedProfilePic) : null;
        } catch (error) {
            console.warn('Could not load profile picture from localStorage:', error);
            return null;
        }
    }

    // Profile Picture Source Storage
    saveProfilePicSrc(profilePicSrc) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.PROFILE_PIC_SRC, profilePicSrc);
            return true;
        } catch (error) {
            console.warn('Could not save profile picture source to localStorage:', error);
            return false;
        }
    }

    loadProfilePicSrc() {
        try {
            const savedProfilePicSrc = localStorage.getItem(this.STORAGE_KEYS.PROFILE_PIC_SRC);
            return savedProfilePicSrc || null;
        } catch (error) {
            console.warn('Could not load profile picture source from localStorage:', error);
            return null;
        }
    }

    // Clear All Data
    clearAllData() {
        try {
            localStorage.removeItem(this.STORAGE_KEYS.MESSAGES);
            localStorage.removeItem(this.STORAGE_KEYS.USERNAME);
            localStorage.removeItem(this.STORAGE_KEYS.PROFILE_PIC);
            localStorage.removeItem(this.STORAGE_KEYS.PROFILE_PIC_SRC);
            return true;
        } catch (error) {
            console.warn('Could not clear data from localStorage:', error);
            return false;
        }
    }

    // Check if localStorage is available
    isStorageAvailable() {
        try {
            const test = 'storage_test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }

    // Get storage usage info (for debugging)
    getStorageInfo() {
        if (!this.isStorageAvailable()) {
            return { available: false };
        }

        try {
            const messages = localStorage.getItem(this.STORAGE_KEYS.MESSAGES);
            const username = localStorage.getItem(this.STORAGE_KEYS.USERNAME);
            const profilePic = localStorage.getItem(this.STORAGE_KEYS.PROFILE_PIC);
            const profilePicSrc = localStorage.getItem(this.STORAGE_KEYS.PROFILE_PIC_SRC);

            return {
                available: true,
                messagesSize: messages ? messages.length : 0,
                hasUsername: !!username,
                hasProfilePic: !!profilePic,
                hasProfilePicSrc: !!profilePicSrc,
                profilePicIndex: profilePic,
                profilePicSrc: profilePicSrc,
                totalKeys: Object.keys(localStorage).filter(key => 
                    key.startsWith('chatApp_')).length
            };
        } catch (error) {
            return { available: true, error: error.message };
        }
    }
}

// Create a global instance
const chatStorage = new ChatStorage();

// Export for use in other files
window.ChatStorage = chatStorage;