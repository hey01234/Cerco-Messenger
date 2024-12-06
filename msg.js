// DOM Elements
const menuIcon = document.getElementById('menu-icon');
const menu = document.getElementById('menu');
const closeMenu = document.getElementById('close-menu');
const chatList = document.getElementById('chat-list');
const chatBox = document.getElementById('chat-box');
const backToChats = document.getElementById('back-to-chats');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendMessage = document.getElementById('send-message');
const chatTitle = document.getElementById('chat-title');
const unreadCount = document.getElementById('unread-count');
const toggleTheme = document.getElementById('toggle-theme');

let unreadMessages = 0;

// Toggle Menu
menuIcon.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

closeMenu.addEventListener('click', () => {
  menu.classList.add('hidden');
});

// Open Chat
chatList.addEventListener('click', (event) => {
  if (event.target.closest('.chat-item')) {
    const chatName = event.target.closest('.chat-item').getAttribute('data-chat');
    chatTitle.textContent = chatName;
    chatBox.classList.remove('hidden');
    chatList.classList.add('hidden');
    unreadCount.classList.add('hidden');
    unreadMessages = 0;
  }
});

// Back to Chat List
backToChats.addEventListener('click', () => {
  chatBox.classList.add('hidden');
  chatList.classList.remove('hidden');
});

// Send Message
sendMessage.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    // User's message
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = message;
    messages.appendChild(userMessage);

    // Auto-reply "ok"
    setTimeout(() => {
      const botMessage = document.createElement('div');
      botMessage.classList.add('message', 'bot-message');
      botMessage.textContent = 'ok';
      messages.appendChild(botMessage);

      // Update unread counter if chat is not open
      if (chatBox.classList.contains('hidden')) {
        unreadMessages++;
        unreadCount.textContent = unreadMessages;
        unreadCount.classList.remove('hidden');
      }

      // Scroll to the bottom
      messages.scrollTop = messages.scrollHeight;
    }, 1000);

    messageInput.value = '';
    messages.scrollTop = messages.scrollHeight;
  }
});

// Toggle Theme
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});
