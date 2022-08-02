// this file rpresents the schema for a database submission

class Book {
  constructor(id, title, author, pages, rating, desc, troupes) {
    this.id = id;
    this.title = title || "Not Provided";
    this.author = author || "Not Provided";
    this.pages = pages || "N/A";
    this.rating = rating;
    this.desc = desc;
    this.troupes = troupes;
  }
}
