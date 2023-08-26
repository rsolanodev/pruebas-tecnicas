<script setup>
import { useBook } from '@/ui/composables'
import AppBook from '@/ui/components/AppBook.vue'

const { toggleInReading, readingBooks } = useBook()
</script>

<template>
  <div class="font-semibold text-3xl lg:text-center px-8">Lista de Lectura</div>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 px-4">
    <div v-for="book in readingBooks" :key="book.title" class="flex items-center justify-center">
      <AppBook
        :book-image-url="book.cover"
        :book-pixel-color="book.pixelColor"
        has-remove-icon
        @remove="toggleInReading(book.isbn)"
      />
    </div>
  </div>
  <div class="text-center w-full px-8 mt-2 text-gray-500" v-if="!readingBooks.length">
    Todavía no has añadido ningún libro a tu lista de lectura, selecciona entre los libros
    disponibles
  </div>
</template>
