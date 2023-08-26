import Author from './author'

class Book {
  constructor({ title, pages, genre, cover, synopsis, year, ISBN, author }) {
    this.title = title
    this.pages = pages
    this.genre = genre
    this.cover = cover
    this.synopsis = synopsis
    this.year = year
    this.isbn = ISBN
    this.author = new Author(author)
    this.inReading = false
    this.pixelColor = null
  }

  toggleInReading() {
    this.inReading = !this.inReading
  }
}

export default Book
