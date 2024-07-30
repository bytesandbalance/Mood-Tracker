# Mood Tracker Project

This project is designed to help you learn full-stack development by building a mood tracking application. The project is divided into frontend and backend components, with a basic setup provided to help you get started.

## Project Structure

### Frontend

The frontend is built with React. The main branches are:

- **`main`**: Contains the final product with all features implemented.
- **`dev`**: Contains a basic setup with minimal components. You will branch off from this branch to work on your individual features.

#### Basic Components in the `dev` Branch

1. **`App.js`**: The root component that sets up routing between different pages.
2. **`CalendarPage.js`**: Displays a calendar and provides a button to navigate to the Monthly Insight page.
3. **`MonthlyInsightPage.jsx`**: A placeholder component for displaying monthly insights.
4. **`MoodTrackerPage.jsx`**: A placeholder component for tracking mood entries.

### Backend

The backend is built with Flask and SQLite. The main branches are:

- **`main`**: Contains the final implementation with all endpoints and functionality.
- **`dev`**: Contains a basic setup with essential components and endpoints. You will branch off from this branch to implement and test new features.

#### Basic Components in the `dev` Branch

1. **`app.py`**: Provides a basic API with a single endpoint for retrieving mood entries by date.
2. **`database.py`**: Sets up the SQLite database and creates the necessary table.
3. **`mood_generator.py`**: Generates sample data for populating the database (not required for your contributions).

## How to Contribute

1. **Clone the Repository**: Clone to your local machine:
    ```bash
    git clone https://github.com/your-username/mood-tracker.git
    ```
2. **Create a New Branch**: Create a new branch for your feature or fix. Start your branch name with your name followed by a description of the feature:
    ```bash
    git checkout -b your-name/feature-description
    ```
    For example, if your name is Alice and you are adding a new mood chart component, you might name your branch `alice/mood-chart-component`.
3. **Implement Your Changes**: Make your changes or add new features to the code.
4. **Commit Your Changes**: Commit your changes with a descriptive message:
    ```bash
    git add .
    git commit -m "Add feature: description of the feature"
    ```
5. **Push to Your Fork**: Push your changes to your fork on GitHub:
    ```bash
    git push origin your-name/feature-description
    ```
6. **Submit a Pull Request**: Go to the original repository and create a pull request from your branch. Provide a clear description of the changes you’ve made.

## Getting Started

### Setting Up the Frontend

1. **Navigate to the Frontend Directory**:
    ```bash
    cd frontend
    ```
2. **Install Dependencies**:
    ```bash
    npm install
    ```
3. **Run the Development Server**:
    ```bash
    npm start
    ```

### Setting Up the Backend

1. **Navigate to the Backend Directory**:
    ```bash
    cd backend
    ```
2. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
3. **Set Up the Database**:
    ```bash
    python database.py
    ```
4. **Run the Flask Application**:
    ```bash
    python app.py
    ```

## Tips for Development

- **Branch Off `dev`**: Always branch off the `dev` branch for new features or bug fixes to ensure you start with the most current basic setup.
- **Follow Code Standards**: Adhere to the coding standards and style guidelines provided in the project.
- **Test Your Changes**: Test your features thoroughly before submitting a pull request.

Feel free to reach out if you have any questions or need help with any part of the project.