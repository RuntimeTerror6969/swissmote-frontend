Below is an improved README that explains the project, tech stack, installation, configuration, usage, and more in a clear and professional way:

---

# Event Planner Application

A simple web application that allows users to create and manage events in real-time. This project features a user-friendly interface for adding, editing, and deleting events, along with real-time updates via Socket.IO.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Features

- **User Authentication:**  
  Users can register, log in, and remain authenticated via JWT stored in local storage.
  
- **Event Management:**  
  Create, edit, and delete events through an intuitive interface.

- **Real-Time Communication:**  
  Real-time updates for event participation using Socket.IO.

- **Event Filtering:**  
  Filter events based on category and date range.

- **Responsive Design:**  
  Custom CSS (no external styling libraries) ensures a clean and responsive layout.

---

## Tech Stack

**Frontend:**
- React with Vite
- React Router for client-side routing
- Redux Toolkit for state management
- Axios for API requests
- Socket.IO-client for real-time communication
- React Toastify for notifications
- Custom CSS for styling

**Backend:**
- Express.js for the API
- MongoDB (or your chosen database) for data storage
- JWT for authentication
- Socket.IO for real-time events

---

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above) and npm installed.
- A MongoDB instance (local or hosted).

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/RuntimeTerror6969/swissmote-frontend
   cd swissmote-frontend
   ```

2. **Install Dependencies:**

   In the project root directory, run:

   ```bash
   npm install
   ```

3. **Start the Development Server:**

   For the frontend, run:

   ```bash
   npm run dev
   ```

   For the backend (if run separately), use:

   ```bash
   npm start
   ```
   
   *Note:* The backend server typically runs on `http://localhost:9000` and the frontend on a port defined by Vite (e.g., `http://localhost:3000`). Adjust the base URLs as described below.

4. **Production Build:**

   To build the production version, run:

   ```bash
   npm run build
   ```

5. **Access the Application:**

   Open your web browser and navigate to the frontend URL (e.g., `http://localhost:3000`). The backend API will be accessed via the configured base URLs.

---

## Configuration

### Frontend Configuration

- **Axios Base URL:**

  In your axios configuration files (located in `client/src/features`), update the base URL to point to your local backend:

  ```js
  axios.defaults.baseURL = "http://localhost:9000";
  ```

- **Socket.IO Base URL:**

  Update the Socket.IO client base URL to:

  ```js
  const socket = io("http://localhost:9000");
  ```

### Environment Variables

Create a `.env` file in the backend root directory with the following (customize as needed):

```env
PORT=9000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
```

---

## Usage

1. **User Registration and Login:**

   - Navigate to the registration page to create a new account.
   - Alternatively, use the provided admin credentials:
     - **Email:** `admin@gmail.com`
     - **Password:** `admin123`
     
2. **Creating Events:**

   - Once logged in, use the "Create Event" form to add a new event by providing a title, description, date/time, location, and category.
   
3. **Managing Events:**

   - On the homepage, the right-hand panel displays your upcoming events.
   - Edit or delete events as needed.
   - Only the last three events are shown on the homepage for brevity; view all events on the Dashboard.
   
4. **Dashboard:**

   - The Dashboard displays all events, each with a "Join" button and real-time participant counts.
   - Use the filter options to narrow down events by category and date range.
   
5. **Persistent Login:**

   - The JWT token is stored in local storage. If the page is refreshed, you will remain logged in.

---

## Deployment on Vercel

For SPAs deployed on Vercel, add a `vercel.json` file in the frontend root directory to ensure client-side routes are handled correctly:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration ensures that any request not matching a static file is rewritten to `index.html`, allowing React Router to manage the routes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- Special thanks to the developers and maintainers of React, Vite, Redux Toolkit, Socket.IO, and React Toastify.
- Thanks to all open-source contributors who make projects like this possible.

---

Happy coding!

---

You can now use this README in your repository for a clear, professional overview and instructions for setting up and using the Event Planner Application.
