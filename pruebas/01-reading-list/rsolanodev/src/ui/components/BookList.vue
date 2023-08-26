<script setup>
import { computed, watch, ref, onMounted } from 'vue'
import { useBook } from '@/ui/composables'
import AppBook from '@/ui/components/AppBook.vue'
import AppForm from '@/ui/components/AppForm.vue'

const { books, toggleInReading, readingBooks } = useBook()

const searchedBooks = ref([])
const lastQuery = ref('')
const currentGenre = ref('')

const addToReading = book => {
  if (!book.inReading) toggleInReading(book.isbn)
}

const searchBooks = query => {
  lastQuery.value = query
  if (!query.trim() && !currentGenre.value) {
    searchedBooks.value = books.value
    return
  }
  const keywords = query.toLowerCase().split(/\s+/)

  searchedBooks.value = books.value.filter(book => {
    const matchesKeyword = keywords.some(
      keyword =>
        book.title.toLowerCase().includes(keyword) ||
        (book.author && book.author.name.toLowerCase().includes(keyword)),
    )
    const matchesGenre = currentGenre.value ? book.genre === currentGenre.value : true
    return matchesKeyword && matchesGenre
  })
}

const updateGenre = genre => {
  currentGenre.value = genre
  if (genre && !currentGenre.value) {
    searchedBooks.value = books.value.filter(book => book.genre === genre)
    return
  }
  searchBooks(lastQuery.value)
}

const availableBooksLength = computed(() => {
  return searchedBooks.value.filter(book => !book.inReading).length
})

watch(books, () => {
  searchBooks(lastQuery.value)
})

onMounted(() => {
  searchedBooks.value = books.value
})
</script>

<template>
  <div class="px-8">
    <div class="text-3xl font-bold" data-testid="books-available">
      {{ availableBooksLength }} Libros Disponibles
    </div>
    <div class="text-xl font-light" data-testid="books-reading">
      {{ readingBooks.length }} en la lista de lectura
    </div>
    <AppForm @search="searchBooks" @changeGenre="updateGenre" />
  </div>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 px-4">
    <div v-for="book in searchedBooks" :key="book.isbn" class="flex items-center justify-center">
      <AppBook
        :book-image-url="book.cover"
        :book-pixel-color="book.pixelColor"
        :in-reading="book.inReading"
        :data-title="book.title"
        @click="addToReading(book)"
      />
    </div>
  </div>
  <div class="text-center w-full px-8 mt-2 text-gray-500" v-if="!searchedBooks.length">
    No se han encontrado libros
  </div>
</template>
