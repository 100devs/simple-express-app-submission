import Book from '../../../models/Book';
import dbConnect from '../../../utils/dbConnect';

export default async (req, res) => {
  const { method } = req;
  
  // connect to database
  await dbConnect();

  // create book
  if (method === "GET") {
    try {
      const books = await Book.find()
      res.status(200).json({ data: books })
    } catch (error) {
      res.status(500).json({ message: "internal server error"});
      console.log(error);
    }
  }
}