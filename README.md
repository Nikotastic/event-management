
# Event Platform - SPA with Vanilla JavaScript and JSON Server

This web application is an event platform built with Vanilla JavaScript, HTML, and CSS, using `json-server` as the mock backend. Two main roles are supported: **administrator** and **visitor**.

---

## 🌐 Technologies Used

- Vanilla JavaScript
- HTML5 / CSS3
- json-server
- LocalStorage

---

## Project structure

```
EVENT-MANAGEMENT/
├── node_modules/
├── public/
│   └── db.json      
│   
├── src/
│   ├── components/
│   │   ├── createEvents.js             
│   │   ├── renderAvailableEvents.js             
│   │   ├── renderEvents.js             
│   │   └──  renderMyEvents.js             
│   │              
│   ├── css/
│   │   ├── admin.css      
│   │   ├── dashcboard.css        
│   │   ├── error.css        
│   │   ├── login.css        
│   │   ├── register.css 
│   │   └── visitors.css  
│   ├── js/
│   │   ├── auth/       
│   │   |     ├── guardian.js   
│   │   │     └── public.js   
│   │   ├── main.js       
│   │   └── router.js        
|   |
│   └── views/
│       ├── dashadmin.js        
│       ├── dashboard.js      
│       ├── dashvisitors.js     
│       ├── login.js     
│       ├── notFound.js  
│       └── register.js

├── .gitignore                
├── index.html               
├── package.json             
├── package-lock.json
└── README.md
```

## 👥 Roles

### Admin

- Can **create**, **edit**, and **delete** courses.
- Can **view all courses**.
- Can give the course capacity.

### Visitor

- Can **view available courses**.
- Can **enroll** in a course if there is space.
- Can view the "My Courses" section.

---

## ⚖️ Protected Routes

- The `/admin` and `/visitors` routes are protected based on the user's role using `guardian.js`.
- If a user attempts to log in without a session or with the wrong role, they are redirected to `/not-found`.
- If the user is already logged in, access to `/login` and `/register` is prevented using `publicOnly.js`.

---

## 🎓 Main Modules

### `router.js`

- Controls SPA routing using `location.hash`.
- Calls views and applies role-based protection.

### `guardian.js`

- Validates that the user is logged in and that their role matches the required one.

### `publicOnly.js`

- Redirects to /admin or /visitors if the user is already logged in.

### `dashadmin.js`

- Admin panel view.
- Buttons to create and view courses.

### `dashvisitors.js`

- Student View.
- Access "My Courses" and "Available Courses."

---

## 🔐Login and Registration

- In `register.js`, the following is verified:

- That the email address does not already exist.
- That the passwords match.
- `rolId` is assigned to the default `visitor` role.

- In `login.js`, the following is verified:

- That the email address is registered.
- That the password matches.
- The user's role is obtained for redirection.

---

## 🔍 Mock Data (`db.json` suggested)

```json
{
  "users": [],
  "roles": [
    { "id": "r001", "role": "admin" },
    { "id": "r002", "role": "student" }
  ],
  "events": []
}
```

---

## ⚡ Execution

1. Clone the repository.

```bash
git clone https://github.com/Nikotastic/event-management.git

```

2. Install the instances:

```bash
npm install
```

3. Install json-server:

```bash
npm install json-server
```

4. Run the backend:

```bash
json-server public/database.json
```

5. Run the frontend

```bash
npm run dev
```

---


## 👩‍💻 Coder Information

- **Name:** Nikol Velasquez  
- **Clan:** Sierra  
- **Email:** velasqueznikol10@gmail.com
