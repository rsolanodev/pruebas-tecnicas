import Book from '@/domain/book'
import fetchColor from '@/shared/utils/fetchColor'

const getBooksList = async () => {
  const response = await fetch('books.json')
  const data = await response.json()
  const books = data.library.map(entry => new Book(entry.book))

  const colorPromises = books.map(async book => {
    book.pixelColor = book.cover ? await fetchColor(book.cover) : '#462c29'
  })
  await Promise.all(colorPromises)
  return books
}

export { getBooksList }
