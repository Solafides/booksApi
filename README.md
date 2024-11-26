# booksApi
This is a simple RESTful API for managing a collection of books, built with Node.js, Express, and PostgreSQL using Sequelize as the ORM. 
 ## Prerequisites 
 - Node.js (v12.x or higher)
   - PostgreSQL
    - npm (Node Package Manager)
      - Git 
 ## Installation 
 1. Clone the repository: git clone 
 2. Install depedencies: npm install
 3. setup environment variable: .env
DB_USERNAME=your_postgres_username
 DB_PASSWORD=your_postgres_password
 DB_DATABASE=books_db
 DB_HOST=127.0.0.1
 PORT=5000
## Running the Application
Start the development server:
npm run dev

## API END POINTS
### Books

### GET /books
Fetch all books.
Response:
### POST /books
Add a new book.
Request body:
### PUT /books/:id
Update a book by ID.
Request body:
### DELETE /books/:id
Remove a book by ID.
### GET /books/recommendations
Get a random book recommendation.
### PATCH /books/favorite/:id
Mark a book as favorite.
