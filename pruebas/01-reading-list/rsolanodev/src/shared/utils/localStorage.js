export const KEY_BOOKS_LIST = 'books'

export const setLocalStorageBooks = books => {
  localStorage.setItem(KEY_BOOKS_LIST, JSON.stringify(books))
}

export const getLocalStorageBooks = () => {
  const storedBooks = localStorage.getItem(KEY_BOOKS_LIST)
  return storedBooks ? JSON.parse(storedBooks) : []
}
