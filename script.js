// Chat Application JavaScript

// DOM Elements
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');
const navButtons = document.querySelectorAll('.nav-btn');
const profileButtons = document.querySelectorAll('.profile-btn');
const profileAvatar = document.getElementById('profileAvatar');
const editUsernameIcon = document.getElementById('editUsernameIcon');
const usernameElement = document.getElementById('username');
const imageButton = document.getElementById('imageButton');
const profilePicModal = document.getElementById('profilePicModal');
const usernameModal = document.getElementById('usernameModal');
const imageModal = document.getElementById('imageModal');
const closePfpModal = document.getElementById('closePfpModal');
const closeUsernameModal = document.getElementById('closeUsernameModal');
const closeImageModal = document.getElementById('closeImageModal');
const newUsernameInput = document.getElementById('newUsernameInput');
const saveUsernameBtn = document.getElementById('saveUsernameBtn');
const cancelUsernameBtn = document.getElementById('cancelUsernameBtn');
const scrollToBottomBtn = document.getElementById('scrollToBottomBtn');

// Chat state
let currentSection = 'global';
let messages = [];
let currentUsername = 'USERNAME';
let selectedProfilePic = null;

// Initialize the application
function init() {
    // Load saved data first
    loadSavedData();
    
    // Add event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', handleKeyPress);
    
    // Navigation button listeners
    navButtons.forEach(btn => {
        btn.addEventListener('click', handleNavigation);
    });
    
    // Profile button listeners
    profileButtons.forEach(btn => {
        btn.addEventListener('click', handleProfileAction);
    });
    
    // Profile avatar click listener
    profileAvatar.addEventListener('click', openProfilePicModal);
    
    // Username edit listeners
    editUsernameIcon.addEventListener('click', openUsernameModal);
    saveUsernameBtn.addEventListener('click', saveUsername);
    cancelUsernameBtn.addEventListener('click', closeUsernameModalHandler);
    
    // Image button listener
    imageButton.addEventListener('click', openImageModal);
    
    // Scroll to bottom button listener
    scrollToBottomBtn.addEventListener('click', scrollToBottom);
    
    // Modal close listeners
    closePfpModal.addEventListener('click', closeProfilePicModal);
    closeUsernameModal.addEventListener('click', closeUsernameModalHandler);
    closeImageModal.addEventListener('click', closeImageModalHandler);
    
    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === profilePicModal) {
            closeProfilePicModal();
        }
        if (event.target === usernameModal) {
            closeUsernameModalHandler();
        }
        if (event.target === imageModal) {
            closeImageModalHandler();
        }
    });
    
    // Enter key for username input
    newUsernameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            saveUsername();
        }
    });
    
    // Generate profile picture options
    generateProfilePicOptions();
    
    // Generate image options for chat
    generateImageOptions();
    
    // Set up scroll monitoring for the scroll-to-bottom button
    setupScrollMonitoring();
    
    // If no messages were loaded, add sample messages
    if (!messagesLoaded) {
        addSampleMessages();
    } else {
        // Display messages for current section
        loadMessagesForSection(currentSection);
    }
    
    // Add some sample messages (only if no messages exist)
    // addSampleMessages(); // This is now handled in loadSavedData()
}

// Handle sending messages
function sendMessage() {
    const messageText = messageInput.value.trim();
    
    if (messageText === '') {
        return;
    }
    
    // Create message object
    const message = {
        id: Date.now(),
        user: currentUsername,
        text: messageText,
        timestamp: new Date(),
        section: currentSection
    };
    
    // Add message to array and display
    messages.push(message);
    displayMessage(message);
    
    // Save messages to storage
    chatStorage.saveMessages(messages);
    
    // Clear input
    messageInput.value = '';
    
    // Scroll to bottom
    scrollToBottom();
    
    // Simulate a response (optional)
    setTimeout(() => {
        simulateResponse(messageText);
    }, 1000 + Math.random() * 2000);
}

// Handle key press in input
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Handle navigation between sections
function handleNavigation(event) {
    const section = event.target.dataset.section;
    
    // Update active state
    navButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update current section
    currentSection = section;
    
    // Clear and reload messages for this section
    loadMessagesForSection(section);
    
    // Update chat header
    updateChatHeader(section);
}

// Handle profile actions
function handleProfileAction(event) {
    const action = event.target.textContent;
    
    // Add visual feedback
    event.target.style.backgroundColor = '#7db46c';
    setTimeout(() => {
        event.target.style.backgroundColor = '';
    }, 200);
    
    // Handle different actions
    switch(action) {
        case 'set favorite song':
            showNotification('Opening favorite song settings...');
            break;
        case 'friends':
            showNotification('Loading friends list...');
            break;
        case 'profile settings':
            showNotification('Opening profile settings...');
            break;
        case 'contact us':
            showNotification('Opening contact form...');
            break;
    }
}

// Display a message in the chat
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    
    if (message.isImage) {
        messageElement.innerHTML = `
            <div class="message-user">${message.user}</div>
            <img src="${message.imageSrc}" alt="Shared image" class="message-image">
        `;
    } else {
        messageElement.innerHTML = `
            <div class="message-user">${message.user}</div>
            <div class="message-text">${message.text}</div>
        `;
    }
    
    chatMessages.appendChild(messageElement);
}

// Load messages for a specific section
function loadMessagesForSection(section) {
    chatMessages.innerHTML = '';
    
    const sectionMessages = messages.filter(msg => msg.section === section);
    sectionMessages.forEach(message => {
        displayMessage(message);
    });
    
    // If no messages, show a welcome message
    if (sectionMessages.length === 0) {
        const welcomeMessage = {
            user: 'System',
            text: `Welcome to the ${section} chat! Start a conversation.`,
            section: section
        };
        displayMessage(welcomeMessage);
    }
}

// Update chat header based on section
function updateChatHeader(section) {
    const header = document.querySelector('.chat-header h1');
    header.textContent = `${section.toUpperCase()} CHAT AREA`;
}

// Simulate bot/system responses
function simulateResponse(originalMessage) {
    const responses = [
        "That's interesting!",
        "I see what you mean.",
        "Thanks for sharing!",
        "Great point!",
        "Tell me more about that.",
        "I agree!",
        "That's cool!",
        "Nice observation."
    ];
    
    const botUsers = ['ChatBot', 'User123', 'Helper', 'Moderator'];
    
    const response = {
        id: Date.now(),
        user: botUsers[Math.floor(Math.random() * botUsers.length)],
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        section: currentSection
    };
    
    messages.push(response);
    
    // Save messages to storage
    chatStorage.saveMessages(messages);
    
    // Only display if we're still in the same section
    if (currentSection === response.section) {
        displayMessage(response);
        scrollToBottom();
    }
}

// Scroll chat to bottom
function scrollToBottom() {
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #7db46c;
        color: #1e3a2b;
        padding: 12px 20px;
        border-radius: 6px;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Add sample messages for demonstration
function addSampleMessages() {
    const sampleMessages = [
        { user: 'Welcome Bot', text: 'Welcome to the global chat room!', section: 'global' },
        { user: 'User123', text: 'Hello everyone!', section: 'global' },
        { user: 'RegionalMod', text: 'Welcome to your regional chat area.', section: 'regional' },
        { user: 'GroupAdmin', text: 'This is the groups section.', section: 'groups' },
        { user: 'System', text: 'Private messages appear here.', section: 'private' }
    ];
    
    sampleMessages.forEach(msg => {
        messages.push({
            ...msg,
            id: Date.now() + Math.random(),
            timestamp: new Date()
        });
    });
    
    // Display messages for current section
    loadMessagesForSection(currentSection);
    
    // Scroll to bottom after switching sections
    setTimeout(() => {
        scrollToBottom();
    }, 50);
}

// Add some interactive features
function addInteractiveFeatures() {
    // Add hover effects to messages
    chatMessages.addEventListener('mouseover', (e) => {
        if (e.target.closest('.message')) {
            e.target.closest('.message').style.backgroundColor = 'rgba(125, 180, 108, 0.2)';
        }
    });
    
    chatMessages.addEventListener('mouseout', (e) => {
        if (e.target.closest('.message')) {
            e.target.closest('.message').style.backgroundColor = '';
        }
    });
    
    // Add typing indicator simulation
    messageInput.addEventListener('input', () => {
        // Could add typing indicator logic here
    });
    
    // Initial scroll to bottom after everything loads
    setTimeout(() => {
        forceScrollToBottom();
    }, 200);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    addInteractiveFeatures();
});

// Export functions for potential external use
window.ChatApp = {
    sendMessage,
    loadMessagesForSection,
    showNotification,
    clearAllData,
    getStorageInfo: () => chatStorage.getStorageInfo()  // Added for debugging
};

// Profile Picture Modal Functions
function openProfilePicModal() {
    profilePicModal.style.display = 'block';
}

function closeProfilePicModal() {
    profilePicModal.style.display = 'none';
}

function generateProfilePicOptions() {
    const grid = document.querySelector('.profile-pic-grid');
    
    for (let i = 1; i <= 20; i++) {
        const option = document.createElement('div');
        option.className = 'profile-pic-option';
        option.innerHTML = `<img src="placeholder.png" alt="Profile ${i}">`;
        option.addEventListener('click', () => selectProfilePic(option, i));
        grid.appendChild(option);
    }
}

function selectProfilePic(element, index) {
    // Remove previous selection
    document.querySelectorAll('.profile-pic-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selection to clicked option
    element.classList.add('selected');
    selectedProfilePic = index;
    
    // Update profile avatar
    setTimeout(() => {
        profileAvatar.innerHTML = `<img src="placeholder.png" alt="Profile Picture">`;
        selectedProfilePic = index;
        closeProfilePicModal();
        showNotification('Profile picture updated!');
        
        // Save profile picture selection to storage
        chatStorage.saveProfilePic(selectedProfilePic);
    }, 300);
}

// Username Modal Functions
function openUsernameModal() {
    newUsernameInput.value = currentUsername;
    usernameModal.style.display = 'block';
    newUsernameInput.focus();
}

function closeUsernameModalHandler() {
    usernameModal.style.display = 'none';
    newUsernameInput.value = '';
}

function saveUsername() {
    const newUsername = newUsernameInput.value.trim();
    
    if (newUsername === '') {
        showNotification('Username cannot be empty!');
        return;
    }
    
    if (newUsername.length > 20) {
        showNotification('Username must be 20 characters or less!');
        return;
    }
    
    currentUsername = newUsername;
    usernameElement.textContent = newUsername;
    closeUsernameModalHandler();
    showNotification('Username updated successfully!');
    
    // Save username to storage
    chatStorage.saveUsername(currentUsername);
}

// Image Modal Functions
function openImageModal() {
    imageModal.style.display = 'block';
}

function closeImageModalHandler() {
    imageModal.style.display = 'none';
}

function generateImageOptions() {
    const grid = document.querySelector('.image-grid');
    
    // Array of your 20 different image sources
    const imageSources = [
        'stickerImages/Sticker1.png',      // Replace with your actual image filenames
        'image2.jpg',
        'image3.png',
        'image4.gif',
        'image5.png',
        'image6.jpg',
        'image7.png',
        'image8.jpg',
        'image9.png',
        'image10.gif',
        'image11.png',
        'image12.jpg',
        'image13.png',
        'image14.jpg',
        'image15.png',
        'image16.gif',
        'image17.png',
        'image18.jpg',
        'image19.png',
        'image20.jpg'
    ];
    
    for (let i = 0; i < imageSources.length; i++) {
        const option = document.createElement('div');
        option.className = 'image-option';
        option.innerHTML = `<img src="${imageSources[i]}" alt="Image ${i + 1}">`;
        option.addEventListener('click', () => sendImageMessage(imageSources[i]));
        grid.appendChild(option);
    }
}

function sendImageMessage(imageSrc) {
    const imageMessage = {
        id: Date.now(),
        user: currentUsername,
        imageSrc: imageSrc,
        timestamp: new Date(),
        section: currentSection,
        isImage: true
    };
    
    // Add message to array and display
    messages.push(imageMessage);
    displayMessage(imageMessage);
    
    // Save messages to storage
    chatStorage.saveMessages(messages);
    
    // Scroll to bottom
    scrollToBottom();
    
    // Close modal
    closeImageModalHandler();
    
    // Show notification
    showNotification('Image sent!');
    
    // Simulate a response (optional)
    setTimeout(() => {
        simulateResponse('Nice image!');
    }, 1000 + Math.random() * 2000);
}

// Data Loading Functions
function loadSavedData() {
    // Load username
    const savedUsername = chatStorage.loadUsername();
    if (savedUsername) {
        currentUsername = savedUsername;
        usernameElement.textContent = savedUsername;
    }
    
    // Load profile picture
    const savedProfilePic = chatStorage.loadProfilePic();
    if (savedProfilePic) {
        selectedProfilePic = savedProfilePic;
        profileAvatar.innerHTML = `<img src="placeholder.png" alt="Profile Picture">`;
    }
    
    // Load messages
    const savedMessages = chatStorage.loadMessages();
    if (savedMessages && savedMessages.length > 0) {
        messages = savedMessages;
        loadMessagesForSection(currentSection);
    } else {
        // If no messages were loaded, add sample messages
        addSampleMessages();
    }
    
    // Scroll to bottom after loading messages
    setTimeout(() => {
        scrollToBottom();
    }, 100);
}

function clearAllData() {
    if (chatStorage.clearAllData()) {
        showNotification('All data cleared!');
        setTimeout(() => {
            location.reload(); // Refresh the page
        }, 1000);
    } else {
        showNotification('Error clearing data!');
    }
}

// Scroll Monitoring Functions
function setupScrollMonitoring() {
    chatMessages.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = chatMessages;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    
    // Show/hide scroll to bottom button
    if (isNearBottom) {
        scrollToBottomBtn.classList.remove('show');
    } else {
        scrollToBottomBtn.classList.add('show');
    }
}

// Force scroll to bottom (instant, no animation)
function forceScrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}