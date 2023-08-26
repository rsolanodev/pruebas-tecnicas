<script setup>
import { computed } from 'vue'

const props = defineProps({
  bookImageUrl: {
    type: String,
    required: false,
  },
  bookPixelColor: {
    type: String,
    default: '#eee',
  },
  inReading: {
    type: Boolean,
    default: false,
  },
  hasRemoveIcon: {
    type: Boolean,
    default: false,
  },
})

const paperStyle = computed(() => {
  return {
    backgroundImage: `url(${props.bookImageUrl})`,
    backgroundColor: props.bookPixelColor,
  }
})

const borderColorStyle = computed(() => {
  return {
    backgroundColor: props.bookPixelColor,
  }
})

const bookClasses = computed(() => ({
  'opacity-50': props.inReading,
}))

defineEmits(['remove'])
</script>

<template>
  <div class="book" :class="bookClasses">
    <div v-if="hasRemoveIcon" class="remove" @click="$emit('remove')">X</div>
    <div class="side" :style="borderColorStyle"></div>
    <div class="paper" :style="paperStyle"></div>
    <div class="bottom" :style="borderColorStyle"></div>
    <div class="pages"></div>
  </div>
</template>

<style scoped>
.paper,
.bottom,
.pages {
  position: absolute;
  left: 1em;
  width: 9em;
}

.book {
  cursor: pointer;
  position: relative;
  height: 16em;
  width: 10em;
  transform: scale(0.75);
}

.side,
.side::before {
  width: 1em;
  position: absolute;
  left: 0;
}

.side {
  height: 14em;
  top: calc(1em - 1px);
}

.side::before {
  content: '';
  top: calc(-1em + 1px);
  height: calc(1em + 1px);
  border-top-left-radius: 100%;
}

.paper {
  background-size: cover;
  height: 14em;
  @apply rounded-tr-xl;
}

.bottom,
.bottom::after {
  position: absolute;
}

.bottom {
  height: 2em;
  bottom: 0;
  z-index: 100;
  @apply rounded-br-xl;
}

.bottom::after {
  content: '';
  border-radius: 100%;
  width: 2em;
  height: 2em;
  left: -1em;
}

.side::before,
.bottom::after {
  background-color: inherit;
}

.pages,
.pages::after {
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 60%,
    rgba(201, 201, 201, 1) 100%
  );
  position: absolute;
  z-index: 100;
}

.pages {
  height: 1em;
  bottom: 0.5em;
  border-bottom-right-radius: 3px;
}

.pages::after {
  content: '';
  border-radius: 100%;
  width: 1em;
  height: 1em;
  left: -0.5em;
}

.remove {
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 2px 6px;
  background-color: white;
  border: 1px solid black;
  z-index: 10;
}
</style>
