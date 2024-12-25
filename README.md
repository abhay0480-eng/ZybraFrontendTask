# User Component

## Description
This project is a React component that fetches and displays a list of users from an API. It includes features such as sorting, filtering, and pagination.

## Instructions to Run the Project Locally

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Project**
   Start the development server:
   ```bash
   npm start
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000` in your web browser to view the application.

## Approach
- The component uses React hooks (`useState`, `useEffect`) to manage state and side effects.
- It utilizes the `@tanstack/react-query` library to handle data fetching and caching.
- The `@tanstack/react-table` library is used for rendering the table with sorting and filtering capabilities.

## Challenges Faced
- Implementing pagination and ensuring that the correct data is fetched based on the current page.
- Managing the state for sorting and filtering while keeping the UI responsive.
- Handling loading and error states gracefully to enhance user experience.

## License
This project is licensed under the MIT License.