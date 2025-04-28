# 🚀 Full Stack Form Submission App

This project includes a **Vue 3 + Vite Frontend** and a simple **Express + JSON File Backend** for submitting form data (with file uploads), user login, authentication, and displaying submitted forms without reloading the page.

---
## 🛠️ How to Set Up

1. Clone the Repository

```bash
git clone https://github.com/aqueeb7/Houzeo.git
```

2. Change the directory
```bash
cd Houzeo
```
---

## 🏗 Folder Structure

```
/client        --> Vue 3 frontend
/server        --> Express backend
  /uploads     --> Uploaded files
  db.json      --> Stores form submissions and user data
```

---

## 🔧 Server Setup (Express)

1. Navigate to the server folder:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
node server.js
```

✅ Server runs by default on [http://localhost:3000](http://localhost:3000)

---

## 🖥️ Client Setup (Vue 3 + Vite)

1. Navigate to the client folder:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

✅ Client runs by default on [http://localhost:5173](http://localhost:5173)

---

## ⚙️ API Endpoints (Backend)

| Method | URL | Description |
|:------|:---|:-------------|
| POST | `/signup` | Signup with name, email and password | 
| POST | `/login` | Login with email and password, returns JWT token |
| POST | `/submit-form` | Submit a form with text data + file upload |
| GET | `/submissions` | Get all form submissions (protected route) |
| Static | `/uploads/:filename` | Serve uploaded files |

---

## 🔥 Full App Workflow

- **Login Screen:**
  - Users log in using email and password (hardcoded in db.json).
  - If login fails, a Bootstrap alert shows "Invalid email or password."

- **Form Submission Page (`/main`):**
  - After login, users can fill a form with:
    - Text fields (name, email, etc.)
    - Date of Birth, Gender
    - Languages (multi-select)
    - Cities (multi-select)
    - File Upload (like a resume PDF)
  - On form submit:
    - Data + file is sent to Express backend.
    - File gets uploaded into `/server/uploads/`
    - Form data + file path is saved in `db.json`.

- **Show Submitted Data Without Refreshing:**
  - After successful form submit, the form resets automatically.
  - New form submission immediately appears in a table below the form without reloading.

- **Access Uploaded Files:**
  - Uploaded files are accessible via `http://localhost:3000/uploads/<filename>`.

---

## 🛠 Important Notes

- Backend uses **multer** for handling file uploads.
- File uploads are saved in `/server/uploads/`.
- `db.json` acts like a fake database.
- Protected routes use a simple **JWT authentication** (verify token middleware).
- Frontend uses **pinia** store (`authStore`) for managing auth state.
- Frontend uses **Bootstrap 5** for styling.

---

## 📦 Useful Commands

| For Server (inside `/server`) | For Client (inside `/client`) |
|:------------------------------|:------------------------------|
| `npm install` | `npm install` |
| `node server.js` | `npm run dev` |

---

## 💬 Common Issues

- `ENOENT: no such file or directory`: Make sure `/uploads/` folder exists.
- `Cannot GET /uploads/<file>`: Check if Express is serving uploads as static.
- CORS Errors: If you deploy separately, allow CORS headers on backend.
- Vue reactive not updating: Ensure correct `.value` usage with `ref()`.

---

# 🌟 Conclusion

This project demonstrates:

- Full stack form submission
- File uploads
- JWT authentication
- Real-time table updates without page reload
- Vue 3, Express, Bootstrap — in a clean architecture.

---

> ✍️ Built with 💙 for learning and production-ready apps.

