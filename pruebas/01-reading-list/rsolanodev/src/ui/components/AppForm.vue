<script setup>
defineEmits(['search', 'changeGenre'])

const genres = ['Fantasía', 'Ciencia ficción', 'Zombies', 'Terror']
</script>

<template>
  <form>
    <div class="flex mt-4">
      <select
        name="pets"
        id="pet-select"
        class="border border-black rounded-l px-2 bg-gray-100"
        @change="$emit('changeGenre', $event.target.value)"
      >
        <option value="">Todos los géneros</option>
        <option :value="genre" v-for="genre in genres">{{ genre }}</option>
      </select>

      <div class="relative w-full">
        <input
          type="search"
          data-testid="search-book"
          @input="$emit('search', $event.target.value)"
          class="border-y border-r rounded-r border-black p-2.5 w-full z-20 text-sm"
          placeholder="Buscar libros..."
        />
      </div>
    </div>
  </form>
</template>
