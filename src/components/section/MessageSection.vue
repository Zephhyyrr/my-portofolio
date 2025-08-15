<template>
  <section id="comments" class="section-container pb-8"  data-aos="zoom-in-up" data-aos-delay="120" data-aos-duration="1000">
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
<style scoped src="@/assets/styles/message.css""></style>


