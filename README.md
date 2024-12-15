Contact Form with SignUp and Login
This project is a robust Contact Form built with Node.js and MongoDB. It offers essential functionalities such as user SignUp and Login while ensuring data security and seamless user experience.

🚀 Features
User SignUp:
Collects user details (First Name, Last Name, Email, and Password) and validates the inputs for accuracy.
Login Authentication:
Verifies user credentials against the database to ensure secure access.
MongoDB Integration:
Data is stored in a NoSQL MongoDB database, ensuring scalability and flexibility.
Custom Validation:
Implements input validation to prevent invalid data entry.
📂 Technologies Used
Backend Framework: Node.js and Express.js
Database: MongoDB with Mongoose ORM
Frontend Rendering: EJS Template Engine
💻 How to Set Up Locally
Clone the repository:

bash
Copy code
git clone <repository-url>
Install dependencies:

bash
Copy code
npm install
Configure MongoDB:

Update the MONGODB_URI variable with your database connection string.
Run the application:

bash
Copy code
npm start
Access the application at:
http://localhost:3000

🛡️ Security Recommendations
Hash Passwords: Use libraries like bcrypt to hash passwords before storing them.
Environment Variables: Keep sensitive credentials (like the MongoDB URI) in .env files and never push them to GitHub.
Feel free to fork this project, contribute, or open issues to suggest improvements! 😊