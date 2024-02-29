# Crypto portfolio

## Overview
Crypto Portfolio is a Node.js web application designed for tracking and managing cryptocurrency investments. It leverages Express for the server framework, Axios for making HTTP requests to the CoinGecko API, and implements rate limiting to protect against abuse. The project uses Nodemon during development for automatic server restarts upon file changes, enhancing the development process.

## Features
- Real-time cryptocurrency price tracking using the CoinGecko API.
- Portfolio management to add, view, and delete investments.
- Support for multiple currencies for portfolio valuation.
- Rate limiting to prevent abuse of the API endpoints.
- Responsive design for desktop and mobile devices.

## Technologies Used
- Backend Framework: Express
- HTTP Client: Axios
- Rate Limiting: express-rate-limit
- Development Tool: Nodemon
- Templating Engine: EJS for server-side rendering
- CSS Framework: Bootstrap

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
Before you begin, ensure you have the following installed:

Node.js - The runtime server environment. https://nodejs.org/en
npm (Node Package Manager) - Comes with Node.js.
You will also need nodemon for development to automatically restart your server when files change. If you haven't installed nodemon globally on your machine, you can do so by running:

bash
Copy code:
"npm install -g nodemon" ("" not included in bash script)

## Installation

Clone the repository:
bash Copy code:
"git clone https://github.com/LauwisBlauw/crypto_portfolio.git"

Navigate to the project directory, bash Copy code:
"cd crypto_portfolio"
Install dependencies

bash Copy code:
"npm install express axios express-rate-limit"
This will install express, axios, express-rate-limit, and other necessary packages listed in your package.json file.

Configure Nodemon for Development
Add the following scripts to your package.json:

json Copy code:
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
} 

## Running the Application
To run the application in development mode with nodemon, ensuring the server automatically restarts upon any code changes, execute:

bash Copy code:
"nodemon index.js"
This command starts the server and watches for changes, leveraging nodemon to streamline your development process. Open your web browser and navigate to http://localhost:3000 to view the application.

## Usage
Viewing Your Portfolio: Access the main page to see your current cryptocurrency investments and their total value in your selected currency.
Adding a Cryptocurrency: Use the form to add a new cryptocurrency to your portfolio by selecting it from the dropdown and entering the amount.
Removing an Investment: Click the delete button next to any cryptocurrency to remove it from your portfolio.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please feel free to fork the repository, make your changes, and submit a pull request for review.

## License
This project is open-source and available under the MIT License.

## Acknowledgments
CoinGecko API for providing the price data. 
