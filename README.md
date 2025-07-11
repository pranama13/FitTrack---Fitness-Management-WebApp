# FitFlow - Full-Stack Workout & Diet Planner

<p align="center">
  A comprehensive, full-stack web application designed to help users meticulously plan their daily fitness journey. Track workouts, schedule meals, and stay on top of your goals with a clean, modern, and responsive interface.
</p>

<p align="center">
  <a href="https://fit-track-fitness-management-web-ap.vercel.app/"><strong>View Live Demo »</strong></a>
</p>



### About The Project

FitFlow was built to solve a common problem for fitness enthusiasts: the need to use multiple apps to track workouts and diet plans. This application provides a single, unified dashboard to manage both. Users can create detailed daily workout schedules—including specific exercises, sets, and reps—and plan their meals, all while tracking their completion status.

The project is architected as a modern, full-stack application with a decoupled frontend and backend, deployed as separate services to ensure scalability and maintainability.

### Key Features

* **User Authentication**: Secure user registration and login system.
* **Two-Factor Authentication (2FA)**: Enhanced account security using an authenticator app.
* **Daily Task Management**: View, create, edit, and delete workout and meal plans for any selected date.
* **Detailed Workout Creation**: Add multiple exercises to a single workout plan, specifying sets, reps, and notes.
* **Interactive Checklists**: Mark individual exercises or entire plans as complete.
* **Filtering & Sorting**: Easily filter tasks by status (Completed/Pending) and sort by time or name.
* **BMI Calculator**: A handy tool to quickly calculate Body Mass Index.
* **Fully Responsive Design**: A seamless experience on desktop, tablet, and mobile devices.

### Built With

This project leverages a modern and powerful tech stack:

* **Frontend**:
    * [React.js](https://reactjs.org/) (with Vite)
    * [Tailwind CSS](https://tailwindcss.com/)
    * [Axios](https://axios-http.com/)
* **Backend**:
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
    * [Mongoose](https://mongoosejs.com/)
* **Database**:
    * [MongoDB](https://www.mongodb.com/) (managed on MongoDB Atlas)
* **Authentication**:
    * JSON Web Tokens (JWT)
    * Speakeasy (for 2FA)
* **Deployment**:
    * **Frontend**: [Vercel](https://vercel.com/)
    * **Backend**: [Render](https://render.com/)
    * **Containerization**: [Docker](https://www.docker.com/)

---

### Getting Started

To get a local copy up and running, follow these simple steps.

#### Prerequisites

* Node.js (v18 or later)
* npm (Node Package Manager)
* A free MongoDB Atlas account for the database.

#### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Set up the Backend:**
    * Navigate to the `server` directory:
        ```sh
        cd server
        ```
    * Install NPM packages:
        ```sh
        npm install
        ```
    * Create a `.env` file in the `server` directory and add your variables:
        ```env
        MONGO_URI=your_mongodb_atlas_connection_string
        JWT_SECRET=your_super_long_random_jwt_secret
        PORT=5000
        ```

3.  **Set up the Frontend:**
    * Navigate to the `frontend` directory:
        ```sh
        cd ../frontend
        ```
    * Install NPM packages:
        ```sh
        npm install
        ```
    * Create a `.env` file in the `frontend` directory and add your backend API URL:
        ```env
        VITE_API_BASE_URL=http://localhost:5000/api
        ```

4.  **Run the Application:**
    * Open two separate terminal windows.
    * In the first terminal, start the backend server:
        ```sh
        # (inside the server directory)
        npm run dev
        ```
    * In the second terminal, start the frontend development server:
        ```sh
        # (inside the frontend directory)
        npm run dev
        ```
    * Open [http://localhost:5173](http://localhost:5173) in your browser to see the result.

---


