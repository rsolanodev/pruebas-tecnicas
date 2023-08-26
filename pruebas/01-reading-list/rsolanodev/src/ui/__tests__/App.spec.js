import { render } from '@testing-library/vue'
import BookList from '@/ui/components/BookList.vue'
import App from '@/ui/App.vue'
import { describe, it, vi } from 'vitest'

describe('App', () => {
  vi.mock('@/application/books', () => {
    return {
      getBooksList: vi.fn().mockResolvedValue([
        {
          isbn: '1',
          title: 'Juego de Tronos',
          cover: 'https://example.com/book1.jpg',
          author: { name: 'Author 1' },
          inReading: false,
        },
        {
          isbn: '2',
          title: 'Juego de Sillas',
          cover: 'https://example.com/book2.jpg',
          author: { name: 'Author 2' },
          inReading: false,
        },
        {
          isbn: '3',
          title: 'El Señor de los Anillos',
          cover: 'https://example.com/book3.jpg',
          author: { name: 'Author 3' },
          inReading: true,
        },
      ]),
    }
  })

  it('should be render', () => {
    render(App)
  })

  it('show available and in reading books', async () => {
    const { getByTestId } = render(BookList)

    const booksAvailable = await getByTestId('books-available')
    const booksReading = await getByTestId('books-reading')

    expect(booksAvailable.innerHTML.trim()).toBe('2 Libros Disponibles')
    expect(booksReading.innerHTML.trim()).toBe('1 en la lista de lectura')
  })
})
