<p align="center">
  <img src="https://raw.githubusercontent.com/mardev60/newsvoice/refs/heads/main/frontend/src/assets/logo_1.png" alt="SummerEase Logo" width="200"/>
</p>

# 🎧 SummerEase

**SummerEase** is a modern web application that delivers personalized news content in audio format directly to users via Telegram. Built with **Angular** for the frontend and **NestJS** for the backend, it provides a seamless experience for users to subscribe to their preferred news topics and receive daily audio updates.

---

## ✨ Features

- 🔥 **Topic Selection**: Choose from a wide range of news categories.
- 🤖 **Telegram Integration**: Receive daily news updates via Telegram bot.
- 📱 **Responsive Design**: Beautiful and intuitive user interface.
- ⚡ **Easy Subscription**: Simple 2-step subscription process.
- ❌ **Unsubscribe Anytime**: Easily unsubscribe via Telegram.

---

## 🛠️ Tech Stack

### Frontend
- 🚀 Angular 19
- 🎨 Tailwind CSS
- 🔄 RxJS
- 📝 Angular Forms

### Backend
- 🏗️ NestJS
- 🌍 Node.js
- 🤖 Telegram Bot API
- 📊 Airtable Integration

---

## 🚀 Getting Started

### 📌 Prerequisites

Ensure you have the following installed:
- **Node.js** (v18+)
- **Angular CLI**
- **NestJS CLI**
- **Telegram Bot Token**
- **Airtable API Key**

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mardev60/newsvoice.git
   cd newsvoice
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the `server` directory and add:
   ```env
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   AIRTABLE_API_KEY=your_airtable_api_key
   AIRTABLE_BASE_ID=your_airtable_base_id
   ```

### ▶️ Running the Application

1. **Start the backend**
   ```bash
   cd server
   npm run start:dev
   ```

2. **Start the frontend**
   ```bash
   cd ../frontend
   npm start
   ```

3. **Access the application**
   Open your browser and navigate to **[http://localhost:4200](http://localhost:4200)**

---

## 🚀 Deployment

The application is currently deployed on **Render**: [SummerEase](https://summerease-client-latest.onrender.com/)

---

## 🤝 Contributing

We welcome contributions! To contribute, follow these steps:

1. **Fork the repository**
2. **Create a new branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📄 Video demo

[![Watch the video](https://img.youtube.com/vi/deRo3f3wlDg/maxresdefault.jpg)](https://www.youtube.com/watch?v=deRo3f3wlDg)


---

## 📧 Contact

For any inquiries, please contact **[makil.uspn@gmail.com](mailto:makil.uspn@gmail.com)**

---

<p align="center">🚀 Built with ❤️ by the SummerEase team 🚀</p>
