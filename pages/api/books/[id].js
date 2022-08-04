import Book from '../../../models/Book';
import dbConnect from '../../../utils/dbConnect';

export default async(req,res) => {
  const { method } = req;
  const { id } = req.query;
  
  // connect to database
  await dbConnect();

  // delete book by id
  if (method === "DELETE") {
    try {
      const data = await Book.deleteOne({ isbn: String(id) })
      res.status(200).json({ message: "Book deleted successfully"});
    } catch (error) {
      res.status(500).json({ message: "internal server error"});
      console.log(error);
    }
  }
}