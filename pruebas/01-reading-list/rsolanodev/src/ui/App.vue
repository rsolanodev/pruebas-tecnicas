<script setup>
import { onMounted } from 'vue'
import { useBook } from '@/ui/composables'
import BookList from '@/ui/components/BookList.vue'
import ReadingList from '@/ui/components/ReadingList.vue'

const { listBooks } = useBook()

const author = 'Rubén Solano'
const linkedin = 'https://www.linkedin.com/in/rsolanoweb/'
const title = 'Reading List'

onMounted(() => listBooks())
</script>

<template>
  <div class="container mx-auto">
    <div class="font-bold border-b border-b-black py-4">
      <a :href="linkedin" target="_blank">{{ author }}</a>
    </div>
    <div class="font-alfa text-5xl text-center pt-8 pb-16">{{ title }}</div>
    <div class="flex flex-col lg:flex-row lg:divide-x divide-black justify-between">
      <div class="flex-1">
        <BookList />
      </div>
      <div class="w-full lg:max-w-[353px] pt-4 lg:pt-0">
        <ReadingList />
      </div>
    </div>
  </div>
</template>
