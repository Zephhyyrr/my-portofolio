# Vue.js + Vuetify + Firebase Comments

A portfolio project showcasing a **comment system** built with Vue.js, Vuetify, and Firebase. This project demonstrates frontend design using Vuetify components and backend integration with Firebase for real-time comments.

---

## 🚀 Features

- 🔥 Firebase integration for real-time database
- 💬 Add, list, and display comments
- 🎨 Beautiful UI built with Vuetify
- 📱 Responsive design

---

## 🛠️ Tech Stack

- [Vue.js 3](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Firebase](https://firebase.google.com/)

---

## 📂 Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/vue-vuetify-firebase-comments.git
cd vue-vuetify-firebase-comments
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase

1. Create a project on [Firebase Console](https://console.firebase.google.com/)
2. Enable **Firestore Database**
3. Copy your Firebase configuration
4. Create `.env` file in project root:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run Project

```bash
npm run dev
```

## 📖 Usage

- Add a new comment through the input field
- View comments in real-time
- Scroll through comment history
