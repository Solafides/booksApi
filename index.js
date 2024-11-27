import express from 'express'
import pg from 'pg'
import bodyParser from 'body-parser'
import { Sequelize,DataTypes } from 'sequelize';
import 'dotenv/config'
// import { removeTicks } from 'sequelize/lib/utils';

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())

const sequelize= new Sequelize(process.env.Db_name,process.env.Db_username,process.env.Db_password,{
    host: process.env.Db_host,
    dialect:'postgres'
})
const Books = sequelize.define('Book', 
    { title: { type: DataTypes.STRING, allowNull: false }, 
    author: { type: DataTypes.STRING, allowNull: false }, 
    isbn: { type: DataTypes.STRING, allowNull: false, unique: true }, 
    publishedYear: { type: DataTypes.INTEGER, allowNull: false }, 
    favorite: { type: DataTypes.BOOLEAN, defaultValue: false } });

sequelize.sync({alter: true}) .then(async () => { console.log('Database & tables created!'); 

    const bookchecker = await Books.count();
    if(bookchecker === 0){
    
    await Books.bulkCreate([ 
        { title: 'Fiker Eske Mekabir', author: 'Hadis Alemayehu', isbn: '9708743273565', publishedYear: 1925 }, 
        { title: 'Atomi Habit', author: 'James Clear', isbn: '9780061120084', publishedYear: 2018 }, 
        { title: 'Rich Dad Poor Dad', author: 'Robert kiyasoki', isbn: '9780451524935', publishedYear: 2002 } ]); 
    }
    app.listen(process.env.port, () => 
        console.log(`Server running on port ${process.env.port}`)); 
})
 .catch((error)=> 
    { console.log("error while creating the table",error)}
);

app.get('/', (req,res)=>{
    res.send("<h1>Hello friends,</h1> Welcome to my library I will guide to every step you want please use postman to check the library database check <a href='https://booksapi-ujro.onrender.com/books'>books</a>, <a href='https://booksapi-ujro.onrender.com/books/recommendations'>recommendations</a> these routes for other crud operations please use postman")
})

app.get("/books",async (req,res)=>{
    try{
        const books = await Books.findAll();
        res.status(200).json(books);
       
    }
    catch(error){
        res.status(500).send("error while fetching the data") 
    }
})
app.post("/books",async (req,res)=>{
    const {title,author,isbn,publishedYear}= req.body;
    if(!title || !author || !isbn || !publishedYear){
      return  res.status(404).send("please enter all the required information");
    }
    try{
      const result = await  Books.create({title,author,isbn,publishedYear})
      res.status(200).json(result);
    }
    catch(e){
     
          res.status(500).send("error please try again");
    }
})
app.put('/books/:id', async (req, res) => { 
    const { title, author, isbn, publishedYear, favorite } = req.body; 
if (!title || !author || !isbn || !publishedYear) 
    {
         return res.status(400).json({ error: 'please include all fields' });
 }
  try {
     const book = await Books.findByPk(req.params.id); 

    if (!book)
         { 
            return res.status(404).json({ error: 'Book not found.' }); 
}
 book.title = title; book.author = author; 
 book.isbn = isbn; book.publishedYear = publishedYear; 
 book.favorite = favorite; 
 
 await book.save(); 
 res.status(200).json(book);
 } 
 catch (error) 
 {
     res.status(500).json({ error: 'An error occurred while updating the book.' });
 } 
}); 
 app.delete('/books/:id', async (req, res) => { 
    try { 
        const book = await Books.findByPk(req.params.id); 
    
        if (!book)
         { 
            return res.status(404).json({ error: 'The Book is not found.' });
 } 

 await book.destroy(); 
    res.status(200).json({ message: 'you have deleted the book successfully.' }); 
}
 catch (error)
  { res.status(500).json({ error: 'error occurred while deleting the book.' }); 
} 
}); 
 app.get('/books/recommendations', async (req, res) => { 
    try { 
        const books = await Books.findAll(); 
        const randomBook = books[Math.floor(Math.random() * books.length)]; 
        res.status(200).json(randomBook); 
    } 
    catch (error) 
    {
         res.status(500).json({ error: 'An error occurred while fetching recommendations.' }); 
}
 }); 
 
 app.patch('/books/favorite/:id', async (req, res) => { 
    try { 
        const book = await Books.findByPk(req.params.id); 
        if (!book) 
            { 
                return res.status(404).json({ error: 'Book not found.' });
     }
      book.favorite = true; 

      await book.save(); res.status(200).json(book); 
    } 
    catch (error)
     { 
        res.status(500).json({error: "error due to making the book favourite"})
    }})



