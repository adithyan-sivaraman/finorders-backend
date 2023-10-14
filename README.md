# API Endpoint for FinOrders App

This project is an api endpoint for the Vite app which is designed to allow  users to create and manage orders

## Getting Started

1. Clone the repository to your local machine:

2. Navigate to the project directory:

3. Install the project dependencies using npm install

4. Clone front end Vite App from this [repository](https://github.com/adithyan-sivaraman/finorders-frontnend)

## Configuration

1. Set the MongoDB cloud url  in connection.js file

2.  Create .env file and set following environment variables 
  
     - for cloud mongo db
       - MONGO_USER
       - MONGO_PASSWORD
       - MONGO_CLUSTER
       - MONGO_DB

    - JWT Secret Key
      - SECRET_KEY

## Running the App

1. Once you have configured the backend endpoint, you can start the development server: npm run start or npm run dev

2. Run the Vite app by navigating project directory : npm run dev