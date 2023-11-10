# Melody Frontend

## Overview

Melody is a React application designed to allow users to reserve tickets for music festival events. Additionally, it provides functionality to generate tickets in either pkpass (for Apple users) or png (for Google users) format.

## Getting Started

To get started with the Melody frontend, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/IsmailCharfi/melody-front-end.git
```

2. Install dependencies:

```bash
cd melody-front-end
npm install
```

3. Start the development server:

```bash
npm start
```

The application will now be accessible at `http://localhost:3000`.

## Notes

1. The api.ts file is responsible for detecting whether the application is in dev or production mode, and it provides the app with the appropriate API path (port and domain).

## Usage

1. **Events browsing**:
![Events browsing](/public/screenshots/eventsBrowsing.png)
2. **Account creation**:
![Account creation](/public/screenshots/accountCreation.png)
3. **Logging in**:
![Logging in](/public/screenshots/loggingIn.png)
4. **Checking event details and booking a ticket**:
![Checking event details and booking a ticket](/public/screenshots/checkingEventAndBooking.png)
5. **Browsing tickets**:
![Browsing tickets](/public/screenshots/browsingTickets.png)
6. **generating a .pkpass file or png file**:
![generating a .pkpass file or png file](/public/screenshots/generatingPkPassOrPng.png)
![png file](/public/screenshots/event1-ismail.png)
