# 📅 Calendar App

A modern monthly calendar app built with React, Vite, and Tailwind CSS.  
It supports month navigation, date-range selection, month-specific hero images, and month-wise notes saved in localStorage.

---

## 🚀 Why This Implementation

This project is designed with a focus on performance, scalability, and developer experience:

- **Component-based architecture (React):**  
  The application is structured into reusable components, ensuring clear separation of concerns between calendar logic, day rendering, and notes management. This makes the codebase easier to maintain and extend.

- **Fast development with Vite:**  
  Leveraging Vite enables lightning-fast startup times and instant hot module replacement, allowing for a smoother and more efficient development workflow.

- **Modern styling with Tailwind CSS:**  
  A utility-first approach ensures a clean, consistent, and responsive UI while reducing the need for writing custom CSS.

- **Efficient date handling with date-fns:**  
  Simplifies complex date operations such as formatting, navigation, and calculations, avoiding error-prone manual implementations.

- **Persistent storage using localStorage:**  
  Notes are stored using month-specific keys, ensuring that user data persists across sessions without requiring a backend.

---

## 🚀 Features

- Previous, Next, and Today month controls.
- Selectable date range with visual feedback.
- Clear Selection action to reset selected dates.
- Dynamic hero image based on selected month.
- Notes panel with:
	- Save note to month-specific list
	- Delete individual saved note
	- Persistent storage in browser localStorage

---

## Notes

- Notes are stored in browser localStorage, so they stay on the same browser/profile.
- Clearing browser storage will remove saved notes.

---

## 📁 Folder Structure

```bash
src/
│
├── components/
│   ├── calendar/        # Calendar page, grid layout, and day cell UI
│   └── notes/           # Notes panel and saved notes list
│
├── hooks/               # Reusable hooks (date range, localStorage, etc.)
│
└── hero/                # Month images used in hero section
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/sumitchhablani21/calendar-app.git
cd calendar-app
```

2.  **Setup**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

---

## 📬 Contact

Feel free to reach out to me for collaboration or questions!  

- 📧 Email: [sumitchhablani20@gmail.com](mailto:sumitchhablani20@gmail.com)
- 💼 LinkedIn: [Click Here](https://www.linkedin.com/in/sumit-chhablani)
- 🐙 GitHub: [Click Here](https://github.com/sumitchhablani21)

---

## Hosted Application Link
https://calendar-app-sumit.vercel.app/