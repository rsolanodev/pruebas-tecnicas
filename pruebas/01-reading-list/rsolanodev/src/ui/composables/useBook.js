import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  setLocalStorageBooks,
  getLocalStorageBooks,
  KEY_BOOKS_LIST,
} from '@/shared/utils/localStorage'

import { getBooksList } from '@/application/books'

const books = ref([])

export function useBook() {
  const listBooks = async () => {
    let booksList = getLocalStorageBooks()
    if (!booksList.length) {
      booksList = await getBooksList()
    }
    books.value = booksList
    setLocalStorageBooks(booksList)
  }

  const toggleInReading = isbn => {
    const index = books.value.findIndex(b => b.isbn === isbn)

    if (index !== -1) {
      const updatedBook = {
        ...books.value[index],
        inReading: !books.value[index].inReading,
      }
      const updatedBooksList = [...books.value]
      updatedBooksList[index] = updatedBook
      books.value = updatedBooksList
      setLocalStorageBooks(updatedBooksList)
    }
  }

  const readingBooks = computed(() => {
    return books.value.filter(book => book.inReading)
  })

  const availableBooksLength = computed(() => {
    return books.value.filter(book => !book.inReading).length
  })

  const updateBooksFromLocalStorage = event => {
    if (event.key === KEY_BOOKS_LIST) {
      books.value = JSON.parse(event.newValue)
    }
  }

  onMounted(() => {
    window.addEventListener('storage', updateBooksFromLocalStorage)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('storage', updateBooksFromLocalStorage)
  })

  return {
    books,
    listBooks,
    toggleInReading,
    readingBooks,
    availableBooksLength,
  }
}
