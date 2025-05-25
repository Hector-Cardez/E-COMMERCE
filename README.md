# E-Commerce Project - SportLab

## Overview

SportLab is an e-commerce application designed for purchasing sports-related items. The application provides users with the ability to browse products, add them to a cart, and complete purchases. This README will guide you through implementation, and usage of the SportLab application.

## Table of Contents

- [Usage](#usage)
- [Frontend Implementation](#frontend-implementation)
- [Backend Implementation](#backend-implementation)
- [Stretch Goals](#stretch-goals)

## Usage

You can perform the following actions:

- **View Items**: Browse all available sports items.
- **Filter Items**: Filter items by category, company, body location, and price range.
- **Manage Cart**: Add items to your cart, view them, and make adjustments before purchasing.
- **Purchase Items**: Complete the purchase process by filling out the submission form.

## Frontend Implementation

### Overview

The frontend of SportLab is built with **React** and **styled-components** for dynamic styling. The frontend is responsible for rendering the UI, handling user interactions, and communicating with the backend to fetch and update data.

### Key Components

- **Home Page (Home.js)**: Displays a welcome message and the SportLab logo.
- **About Page (About.js)**: Provides information about SportLab with an embedded video.
- **Contacts Page (Contacts.js)**: Displays contact information with an embedded Google map.
- **Items Page (Items.js)**: Lists all items available for purchase, with filters for easy searching.
- **Cart Page (Cart.js)**: Shows the items the user has added to their cart.
- **Submission Page (SubmissionPage.js)**: Allows users to submit their order by filling out a form.

### Styling

- **Global Styles (GlobalStyles.js)**: Sets global styles for the application, ensuring a consistent look and feel across all components.
- **Styled Components**: Used extensively for individual component styling, ensuring modular and reusable styles.

### Interactivity

- **State Management**: React's `useState` and `useEffect` hooks are used for managing component states, such as the items list, filters, and cart status.
- **Filtering**: The `FilterSelect` component is used to dynamically filter items based on user input.
- **Pagination**: Items are paginated to enhance performance and user experience.

## Backend Implementation

### Overview

The backend is implemented using **Node.js** and **Express.js**, following RESTful principles. **MongoDB** is used as the database to store and manage the application data.

### Core Functionalities

- **GET /items**: Fetches all items from the database.
- **GET /items/id/:id**: Fetches an item based on its ID from the database.
- **GET /items/id/:id/stock**: Fetches an item's number in stock property from the database.
- **GET /body-locations**: Fetches all items with the same "body-location" from the database.
- **GET /categories**: Fetches all items with the same category from the database.
- **GET /companies**: Fetches all companies from the database.
- **GET /companies/id/:id**: Fetches a specific company based on the company ID in the database.
- **GET /companies/name/:name**: Fetches a specific company by its name from the database.
- **GET /cart**: Fetches the user's cart from the database.
- **POST /cart**: Adds an item to the user's cart.
- **PUT /cart/manage**: Removes an item from the user's cart.
- **POST /order**: Submits the user's order and updates the database accordingly.
- **DELETE /delete-order/:order**: Deletes the user's order based on the unique order ID and updates the database accordingly.

## Stretch Goals

The following additional features were implemented:

- **Responsiveness**: The application is fully responsive and adapts to different screen sizes.
- **Google Maps Integration**: Embedded a Google Map on the Contacts page to display SportLab's location.
- **Video Integration**: The About page includes an embedded YouTube video.
- **Animations**: Added subtle animations to enhance the user experience.
