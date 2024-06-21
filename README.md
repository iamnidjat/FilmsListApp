# FilmsList App

## Overview
FilmsList App is a comprehensive application that allows users to manage their personal film lists. Users can register, log in securely, and enjoy various features such as adding films to a watchlist, moving films to an unwatchlist, and downloading their film lists. The app supports multiple languages (English, Russian, Azerbaijani) and includes features for password management, feedback, and detailed film information.

Note: The UI is currently in the development stage, and users might experience changes and improvements as the app evolves.

## Features
- **User Authentication**
  - Secure user registration and login with hashed passwords
  - "Remember Me" feature for persistent login sessions
  - Forgot password functionality
  - Random login generator for users who can't think of a username

- **Film Management**
  - Add films to a watchlist with details such as name, genre, year, comments, and rating (1-10)
  - Move films between watchlist and unwatchlist sections
  - Edit film details
  - Delete films from the list

- **Export and Download**
  - Download film lists locally in `.txt`, `.docx`, and `.json` formats

- **Localization**
  - Internalization support with languages: English (en), Russian (ru), Azerbaijani (az)
  - Users can switch languages within the app

- **Account Management**
  - Change password
  - Delete account
  - Send feedback

- **Additional Features**
  - View detailed film information in a new window

## Tech Stack
- **Backend**: ASP.NET Core Web API
- **ORM**: Entity Framework Core
- **Frontend**: React

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/FilmsListApp.git
    cd FilmsListApp
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the database:
    - Ensure your database is running and configured properly.
    - Run database migrations and seed the initial data if necessary.

4. Start the application:
    ```sh
    npm start
    ```

## Usage
- **Register**: Create a new user account.
- **Login**: Access your account with your credentials.
- **Add Films**: Use the interface to add films to your watchlist.
- **Manage Films**: Edit, delete, or move films between lists.
- **Download Lists**: Export your film lists in the desired format.
- **Change Language**: Switch between English, Russian, and Azerbaijani.
- **Feedback**: Send feedback to the app developers.


