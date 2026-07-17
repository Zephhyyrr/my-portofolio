<template>
  <div class="chat-container">
    <div class="chat-header">
      <v-avatar size="40" class="me-3">
        <v-img src="https://images.unsplash.com/photo-1577563908411-50cb98976fea?q=80&w=200&auto=format&fit=crop" alt="Group Avatar"></v-img>
      </v-avatar>
      <div class="header-info">
        <h3 class="group-name">Global Chat</h3>
        <span class="group-status">
          {{ participantsCount }} participants
        </span>
      </div>
    </div>

    <div class="chat-messages" ref="messagesContainer">
      <div 
        v-for="msg in messages" 
        :key="msg.id" 
        class="message-wrapper"
        :class="{ 'message-own': isOwnMessage(msg) }"
      >
        <div v-if="!isOwnMessage(msg)" class="message-sender">
          {{ msg.name || 'Anonymous' }}
        </div>
        <div class="message-bubble" :class="{ 'bubble-own': isOwnMessage(msg), 'bubble-other': !isOwnMessage(msg) }">
          <span class="message-text">{{ msg.message }}</span>
          <span class="message-time">{{ formatTime(msg.timestamp || msg.createdAt) }}</span>
        </div>
      </div>
    </div>

    <div class="chat-input-area">
      <v-form @submit.prevent="sendMessage" class="d-flex w-100 align-center">
        <!-- Input for name if not set -->
        <v-text-field
          v-if="!hasNameSet"
          v-model="userName"
          placeholder="Enter your name to chat..."
          variant="solo"
          density="compact"
          hide-details
          class="me-2 name-input"
          @keyup.enter="confirmName"
        ></v-text-field>
        
        <v-btn v-if="!hasNameSet" icon="mdi-check" color="success" size="small" @click="confirmName"></v-btn>

        <!-- Message input if name is set -->
        <v-text-field
          v-if="hasNameSet"
          v-model="newMessage"
          placeholder="Type a message..."
          variant="solo"
          density="compact"
          hide-details
          class="me-2 message-input"
          autocomplete="off"
        ></v-text-field>

        <v-btn 
          v-if="hasNameSet"
          icon="mdi-send" 
          color="#128C7E" 
          class="send-btn text-white" 
          type="submit" 
          :disabled="!newMessage.trim()"
          elevation="0"
        ></v-btn>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  limit
} from 'firebase/firestore';

const props = defineProps({
  windowData: {
    type: Object,
    required: true
  }
});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const validateConfig = (config) => {
  const required = ['apiKey', 'authDomain', 'projectId', 'messagingSenderId', 'appId'];
  return required.every(key => config[key] && config[key] !== 'undefined');
};

let app, db;
try {
  if (validateConfig(firebaseConfig)) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

const messages = ref([]);
const messagesContainer = ref(null);
const newMessage = ref('');
const userName = ref('');
const hasNameSet = ref(false);
const currentUserId = ref('');
let unsubscribe = null;

const participantsCount = computed(() => {
  const uniqueNames = new Set(messages.value.map(m => m.name));
  return Math.max(uniqueNames.size, 1);
});

onMounted(() => {
  // Try to load user data from local storage
  const savedName = localStorage.getItem('chat_username');
  let savedId = localStorage.getItem('chat_userid');
  
  if (!savedId) {
    savedId = 'user_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('chat_userid', savedId);
  }
  currentUserId.value = savedId;

  if (savedName) {
    userName.value = savedName;
    hasNameSet.value = true;
  }

  if (db) {
    const q = query(
      collection(db, 'comments'), 
      orderBy('timestamp', 'asc'),
      limit(100)
    );
    
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      messages.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      scrollToBottom();
    }, (error) => {
      console.error("Error loading chat messages:", error);
    });
  }
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

const confirmName = () => {
  if (userName.value.trim().length >= 2) {
    hasNameSet.value = true;
    localStorage.setItem('chat_username', userName.value.trim());
  }
};

const isOwnMessage = (msg) => {
  return msg.userId === currentUserId.value;
};

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  
  let date;
  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else {
    date = new Date(timestamp);
  }
  
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const sendMessage = async () => {
  if (!newMessage.value.trim() || !hasNameSet.value || !db) return;
  
  const msgText = newMessage.value.trim();
  newMessage.value = ''; // clear input immediately for better UX
  
  try {
    await addDoc(collection(db, 'comments'), {
      name: userName.value.trim(),
      userId: currentUserId.value,
      message: msgText,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    });
    scrollToBottom();
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #efeae2;
  font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  overflow: hidden;
}

/* Header */
.chat-header {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: #008069;
  color: white;
  z-index: 2;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.header-info {
  display: flex;
  flex-direction: column;
}

.group-name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
}

.group-status {
  font-size: 13px;
  opacity: 0.8;
}

/* Messages Area */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px 5%;
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  background-repeat: repeat;
  background-color: #efeae2;
  background-blend-mode: multiply;
  display: flex;
  flex-direction: column;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  max-width: 85%;
  align-self: flex-start;
}

.message-own {
  align-self: flex-end;
}

.message-sender {
  font-size: 12.5px;
  font-weight: 500;
  color: #128C7E;
  margin-bottom: 2px;
  margin-left: 8px;
}

.message-bubble {
  position: relative;
  padding: 6px 7px 8px 9px;
  border-radius: 7.5px;
  box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.13);
  display: flex;
  flex-direction: column;
  min-width: 80px;
}

.bubble-other {
  background-color: #ffffff;
  border-top-left-radius: 0;
}

.bubble-own {
  background-color: #d9fdd3;
  border-top-right-radius: 0;
}

/* Small tails for bubbles */
.bubble-other::before {
  content: '';
  position: absolute;
  top: 0;
  left: -8px;
  width: 0;
  height: 0;
  border-top: 8px solid #ffffff;
  border-left: 8px solid transparent;
}

.bubble-own::before {
  content: '';
  position: absolute;
  top: 0;
  right: -8px;
  width: 0;
  height: 0;
  border-top: 8px solid #d9fdd3;
  border-right: 8px solid transparent;
}

.message-text {
  font-size: 14.2px;
  line-height: 19px;
  color: #111b21;
  word-wrap: break-word;
  padding-right: 40px; /* Space for time */
}

.message-time {
  font-size: 11px;
  color: #667781;
  position: absolute;
  bottom: 4px;
  right: 7px;
}

/* Input Area */
.chat-input-area {
  padding: 10px;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
}

.name-input :deep(.v-field__input),
.message-input :deep(.v-field__input) {
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: white !important;
  border-radius: 8px;
}

.name-input :deep(.v-field__outline),
.message-input :deep(.v-field__outline) {
  display: none;
}

.send-btn {
  border-radius: 50% !important;
  width: 40px !important;
  height: 40px !important;
  background-color: #00a884 !important;
}

/* Dark Theme Support */
:global(body.dark-theme) .chat-container {
  background-color: #0b141a;
}
:global(body.dark-theme) .chat-header {
  background-color: #202c33;
}
:global(body.dark-theme) .chat-messages {
  background-color: #0b141a;
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  opacity: 0.9;
}
:global(body.dark-theme) .bubble-other {
  background-color: #202c33;
}
:global(body.dark-theme) .bubble-other::before {
  border-top-color: #202c33;
}
:global(body.dark-theme) .bubble-own {
  background-color: #005c4b;
}
:global(body.dark-theme) .bubble-own::before {
  border-top-color: #005c4b;
}
:global(body.dark-theme) .message-text {
  color: #e9edef;
}
:global(body.dark-theme) .message-time {
  color: #8696a0;
}
:global(body.dark-theme) .message-sender {
  color: #53bdeb;
}
:global(body.dark-theme) .chat-input-area {
  background-color: #202c33;
}
:global(body.dark-theme) .name-input :deep(.v-field__input),
:global(body.dark-theme) .message-input :deep(.v-field__input) {
  background-color: #2a3942 !important;
  color: #d1d7db !important;
}
</style>
