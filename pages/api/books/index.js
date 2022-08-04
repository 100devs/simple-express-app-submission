import Book from '../../../models/Book';
import dbConnect from '../../../utils/dbConnect';
import axios from 'axios';

export default async(req,res) => {
  const { method } = req;
  
  // connect to database
  await dbConnect();

  // create book
  if (method === "POST") {
    try {
      const newBook = await new Book(req.body).save();
      res.status(201)
        .json({ data: newBook, message: "Book added successfully!"});
    } catch (error) {
      res.status(500).json({ message: "internal server error"});
      console.log(error);
    }
  }

  if (method === "GET") {
    try {
      const url = `https://api.nytimes.com/svc/books/v3/lists//hardcover-fiction?api-key=${process.env.NYT_API}`
      const booksData = await axios.get(url)
      const books = booksData.data.results.books
      // process results w/ the DB
      for(let i=0; i<books.length; i++) {
        const book = books[i];
        const inDB = await Book.find( 
          { isbn: String(book['primary_isbn13'])});
        if (inDB.length > 0) {
          book.added = true;
        }
      }
      res.status(200).json({ data: books })
    } catch (error) {
      res.status(500).json({ message: "internal server error"});
      console.log(error);
    }
  }
}
