import Book from '../../../models/Book';
import dbConnect from '../../../utils/dbConnect';

export default async(req,res) => {
  const { method } = req;
  const { id } = req.query;
  
  // connect to database
  await dbConnect();

  // update book notes by id
  if (method === "PUT") {
    try {
      const result = await Book.findOneAndUpdate(
        { isbn: id }, 
        { notes: req.body.notes }
      );
      res.status(200).json({ data: result, message: "Book updated successfully"}); 
    } catch (error) {
      res.status(500).json({ message: "internal server error"});
      console.log(error);
    }
  }
}