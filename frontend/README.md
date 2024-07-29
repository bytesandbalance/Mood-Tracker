# Monthly Insights React Application

## Overview

This React application provides insights into monthly mood, energy levels, diet, activities, physical symptoms and sleep duration. It visualizes data through various charts, including bar charts, line charts, and pie charts, using D3.js.

## Features

- **Mood Chart**: Displays weighted average mood values.
- **Energy Level Chart**: Line chart showing energy levels over the month.
- **Diet Chart**: Pie chart showing distribution of different diets.
- **Activity Chart**: Pie chart showing distribution of activities.
- **Physical Symptoms Chart**: Pie chart showing distribution of physical symptoms.
- **Sleep Duration Chart**: Bar chart of sleep duration.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Download and install Node.js from [Node.js official website](https://nodejs.org/).
- **npm**: Node.js installation includes npm (Node Package Manager).

## Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/pflashgary/react-early-STEM-mood-tracker.git
    ```

2. **Navigate to the project directory**:

    ```sh
    cd frontend
    ```

3. **Install dependencies**:

    ```sh
    npm install
    ```

## Configuration

1. **Backend API**:
   Ensure the backend API is running and accessible. The React app makes API requests to `http://localhost:5000/get_monthly_data`.

   ```sh
   cd backend
   python3 app.pys
   ```

## Running the Application

1. **Start the development server**:

    ```sh
    npm start
    ```

2. Open your browser and navigate to:

    ```sh
    http://localhost:3000
    ```

## Usage

1. **Navigate to Monthly Insight Page**:
   - Use the navigation menu to go to the Monthly Insight page.
   - The URL format is `http://localhost:3000/month/:month` where `:month` is in the format `YYYY-MM` (e.g., `2023-07`).

2. **Interact with the Charts**:
   - The page will display various charts based on the data for the selected month.
   - Hover over the charts to see more details.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:

    ```sh
    git checkout -b feature/YourFeature
    ```

3. **Commit your changes**:

    ```sh
    git commit -m 'Add some feature'
    ```

4. **Push to the branch**:

    ```sh
    git push origin feature/YourFeature
    ```

5. **Create a pull request**.

## Contact

If you have any questions or feedback, please contact:

- **Pegah Flashgary**
    - **Email**: pflashgary@gmail.com
    - **GitHub**: [pflashgary](https://github.com/pflashgary/)
