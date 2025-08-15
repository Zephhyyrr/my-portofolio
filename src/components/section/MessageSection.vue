<template>
  <section id="comments" class="section-container pb-8" style="text-align: left;" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
      <v-card class="comment-card" elevation="0">
        <v-card-title class="comment-header">
          <v-icon class="me-2" color="primary">mdi-comment-multiple</v-icon>
          Comments ({{ comments.length }})
        </v-card-title>

        <v-card-text class="pa-6">
          <form @submit.prevent="submit">
            <div class="form-group mb-4">
              <label class="form-label">
                Name <span class="required-star">*</span>
              </label>
              <v-text-field
                v-model="name.value.value"
                :error-messages="name.errorMessage.value"
                placeholder="Enter your name"
                variant="solo"
                density="comfortable"
                class="custom-input"
                hide-details="auto"
                required
              />
            </div>

            <div class="form-group mb-4">
              <label class="form-label">
                Email <span class="required-star">*</span>
              </label>
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                placeholder="Enter your email"
                variant="solo"
                density="comfortable"
                class="custom-input"
                hide-details="auto"
                type="email"
                required
              />
            </div>

            <div class="form-group mb-4">
              <label class="form-label">
                Message <span class="required-star">*</span>
              </label>
              <v-textarea
                v-model="message.value.value"
                :error-messages="message.errorMessage.value"
                placeholder="Write your message here..."
                variant="solo"
                density="comfortable"
                rows="4"
                class="custom-textarea"
                hide-details="auto"
                required
              />
            </div>

            <v-btn
              type="submit"
              :loading="loading"
              :disabled="loading"
              class="post-comment-btn"
              size="large"
              block
            >
              <v-icon class="me-2">mdi-send</v-icon>
              Post Comment
            </v-btn>
          </form>

          <v-alert
            v-if="errorMessage"
            type="error"
            class="mt-4"
            :text="errorMessage"
            closable
            @click:close="errorMessage = ''"
          />

          <v-alert
            v-if="successMessage"
            type="success"
            class="mt-4"
            :text="successMessage"
            closable
            @click:close="successMessage = ''"
          />

          <div class="pinned-comment mt-6">
            <v-divider class="mb-4" />
            <div class="d-flex align-center">
              <v-icon class="me-2" color="primary">mdi-pin</v-icon>
              <span class="text-subtitle-2 text-primary">PINNED COMMENT</span>
            </div>
          </div>
        </v-card-text>
        <v-card-text v-if="comments.length > 0" class="pt-0">
          <v-divider class="mb-4" />
          <div class="comments-list">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="comment-item mb-4"
            >
              <div class="d-flex">
                <v-avatar
                  class="me-3"
                  size="40"
                  :color="getAvatarColor(comment.name)"
                >
                  <span class="text-white font-weight-bold">
                    {{ getInitials(comment.name) }}
                  </span>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="d-flex align-center mb-1">
                    <span class="font-weight-medium me-2 text-white">{{ comment.name }}</span>
                    <span class="text-caption text-grey">
                      {{ formatDate(comment.timestamp || comment.createdAt) }}
                    </span>
                  </div>
                  <p class="text-body-2 mb-0 text-grey-lighten-2">{{ comment.message }}</p>
                  <div v-if="comment.email" class="text-caption text-grey mt-1">
                    <v-icon size="12" class="me-1">mdi-email-outline</v-icon>
                    {{ comment.email }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-text v-else class="pt-0">
          <v-divider class="mb-4" />
          <div class="text-center py-8">
            <v-icon size="48" color="grey" class="mb-2">mdi-comment-outline</v-icon>
            <div class="text-body-1 text-grey">No comments yet. Be the first to comment!</div>
          </div>
        </v-card-text>
      </v-card>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useField, useForm } from 'vee-validate'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const validateConfig = (config) => {
  const required = ['apiKey', 'authDomain', 'projectId', 'messagingSenderId', 'appId']
  const missing = []
  for (const key of required) {
    if (!config[key] || config[key] === 'undefined') {
      missing.push(key)
    }
  }
  return missing.length === 0
}

let app, db
try {
  if (validateConfig(firebaseConfig)) {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
  }
} catch (error) {
  // diam agar aman
}

const comments = ref([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
let unsubscribe = null

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true
      return 'Name needs to be at least 2 characters.'
    },
    email(value) {
      if (!value) return true
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(value)) return true
      return 'Please enter a valid email address.'
    },
    message(value) {
      if (value?.length >= 1) return true
      return 'Message cannot be empty.'
    },
  },
})

const name = useField('name')
const email = useField('email')
const message = useField('message')

const getAvatarColor = (name) => {
  const colors = [
    '#a759cf', '#da62a0', '#667eea', '#764ba2',
    '#f093fb', '#f5576c', '#4facfe', '#00f2fe',
    '#43e97b', '#38f9d7', '#ffecd2', '#fcb69f'
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const submit = handleSubmit(async (values) => {
  if (!db) {
    errorMessage.value = 'Firebase not properly initialized. Please check your configuration.'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await addDoc(collection(db, 'comments'), {
      name: values.name.trim(),
      email: values.email ? values.email.trim() : null,
      message: values.message.trim(),
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ipAddress: null
    })

    handleReset()
    successMessage.value = 'Comment posted successfully!'
  } catch (error) {
    if (error.code === 'permission-denied') {
      errorMessage.value = 'Permission denied. Please check your Firestore security rules.'
    } else if (error.code === 'unauthenticated') {
      errorMessage.value = 'Authentication required. Please check your Firebase configuration.'
    } else if (error.code === 'invalid-argument') {
      errorMessage.value = 'Invalid data. Please check your input.'
    } else if (error.message.includes('network')) {
      errorMessage.value = 'Network error. Please check your internet connection.'
    } else {
      errorMessage.value = `Error: ${error.message}`
    }
  } finally {
    loading.value = false
  }
})

const formatDate = (timestamp) => {
  if (!timestamp) return 'Just now'

  let date
  if (timestamp.toDate) {
    date = timestamp.toDate()
  } else if (typeof timestamp === 'string') {
    date = new Date(timestamp)
  } else {
    date = new Date(timestamp)
  }

  const now = new Date()
  const diff = now - date

  if (diff < 60000) return 'Just now'
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  }

  return date.toLocaleDateString()
}

onMounted(() => {
  if (!db) {
    errorMessage.value = 'Firebase not properly initialized.'
    return
  }

  try {
    const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'))
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      comments.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    }, (error) => {
      if (error.code === 'permission-denied') {
        errorMessage.value = 'Cannot load comments: Permission denied. Please check Firestore security rules.'
      } else {
        errorMessage.value = `Cannot load comments: ${error.message}`
      }
    })
  } catch (error) {
    errorMessage.value = `Error setting up comments: ${error.message}`
  }
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})
</script>


<style scoped src="@/assets/styles/styles.css"></style>


<style scoped>

.full-width-section {
  width: 100% !important;
  max-width: 100% !important;
}

.v-container {
  margin-left: 0 !important;
  padding-left: 24px !important;
  padding-right: 24px !important;
  max-width: 100% !important;
  width: 100% !important;
}

.comment-card {
  background: #2a3441 !important;
  border-radius: 16px !important;
  width: 100% !important;
  max-width: 100% !important;
  margin-left: 0 !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.comment-header {
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-weight: 600;
}

/* Form Styling */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
}

.required-star {
  color: #ff6b6b;
}

.optional-text {
  color: #8b949e;
  font-weight: 400;
}

/* Custom Input Styling */
.custom-input :deep(.v-field) {
  background: #3d4b5c !important;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #ffffff !important;
}

.custom-input :deep(.v-field__input) {
  color: #ffffff !important;
  padding: 16px 20px;
}

.custom-input :deep(.v-field__input::placeholder) {
  color: #8b949e !important;
}

.custom-input :deep(.v-field--focused) {
  border-color: #a759cf !important;
  box-shadow: 0 0 0 2px rgba(167, 89, 207, 0.2);
}

/* Custom Textarea Styling */
.custom-textarea :deep(.v-field) {
  background: #3d4b5c !important;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #ffffff !important;
}

.custom-textarea :deep(.v-field__input) {
  color: #ffffff !important;
  padding: 16px 20px;
}

.custom-textarea :deep(.v-field__input::placeholder) {
  color: #8b949e !important;
}

.custom-textarea :deep(.v-field--focused) {
  border-color: #a759cf !important;
  box-shadow: 0 0 0 2px rgba(167, 89, 207, 0.2);
}

.post-comment-btn {
  background: linear-gradient(to right, #a759cf, #da62a0) !important;
  color: white !important;
  border-radius: 12px !important;
  text-transform: none !important;
  font-weight: 600;
  height: 48px !important;
}

.post-comment-btn:hover {
  background: linear-gradient(to right, #9649bd, #c8558e) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(167, 89, 207, 0.3) !important;
}

.pinned-comment {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
}

.comment-item {
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-left: 4px solid #a759cf;
}

.comments-list {
  max-height: 500px;
  overflow-y: auto;
}

/* Custom scrollbar */
.comments-list::-webkit-scrollbar {
  width: 6px;
}

.comments-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.comments-list::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #a759cf, #da62a0);
  border-radius: 3px;
}

.comments-list::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #9649bd, #c8558e);
}

/* Form field styling */
:deep(.v-field--variant-outlined .v-field__outline) {
  border-radius: 12px;
}

:deep(.v-field--focused .v-field__outline) {
  border-color: #a759cf;
  border-width: 2px;
}

:deep(.v-label--active) {
  color: #a759cf !important;
}

/* Responsive design untuk mobile */
@media (max-width: 768px) {
  .v-container {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .comment-card {
    border-radius: 12px !important;
  }
}
</style>


