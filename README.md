# NASA React Application

This project is a React frontend application that utilizes various NASA APIs to display astronomy-related data. It includes features such as viewing Astronomy Picture of the Day (APOD), Mars Rover photos, Earth imagery, images and videos from NASA's library, EPIC imagery, DONKI data, and weather data from InSight: Mars Weather Service API. The application also includes user authentication and session management using JWT.

[View Live Demo](https://af-assignment02-frontend.onrender.com)
(username: root, password: root)

## Application Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/diaskalana/NASA-APIs.git
   ```

2. Navigate to the frontend project directory:

   ```bash
   cd nasa-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   REACT_APP_NASA_API_KEY=your_nasa_api_key
   REACT_APP_BACKEND_URL='http://localhost:3001'
   ```

5. Start the development server:

   ```bash
   npm start
   ```

6. Navigate to the backend project directory:

   ```bash
   cd backend-api
   ```

7. Install dependencies:

   ```bash
   npm install
   ```

8. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_uri
   ```

9. Start the development server:

   ```bash
   node index.js
   ```

10. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Upon launching the application, users can navigate through different sections using the navigation menu.
- Users can register or log in to access personalized features.
- Explore various NASA APIs by selecting different options from the menu.
- Enjoy viewing astronomy-related data, images, and videos from NASA's vast collection.

## Chosen NASA APIs

The chosen NASA APIs for this project include:

- Astronomy Picture of the Day (APOD)
- Mars Rover Photos
- Earth Imagery
- Image and Video Library
- EPIC (Earth Polychromatic Imaging Camera) Imagery
- DONKI (Space Weather Database Of Notifications, Knowledge, Information) API
- InSight: Mars Weather Service API

## Challenges Faced and Solutions

1.  **Accessing NASA APIs**: One challenge was integrating multiple NASA APIs into the application and handling their different data structures. This was resolved by creating separate service files for each API and organizing the code to manage API requests effectively.
2.  **User Authentication and Session Management**: Implementing user authentication and session management using JWT presented another challenge. This was addressed by creating backend API endpoints for user registration, login, and authentication, as well as frontend components for user interaction and state management.
3.  **Styling and UI Design**: Ensuring a visually appealing and user-friendly interface was crucial. Bootstrap framework was utilized for styling components, and additional CSS was applied to enhance the UI design and responsiveness.
4.  **Handling CORS Issues**: CORS issues arose when making requests to the backend API from the frontend. This was resolved by configuring CORS headers on the backend server to allow requests from the frontend domain.

Overall, by breaking down the project into smaller tasks, utilizing appropriate tools and libraries, and addressing challenges systematically, the application was successfully developed with comprehensive features and functionalities.
