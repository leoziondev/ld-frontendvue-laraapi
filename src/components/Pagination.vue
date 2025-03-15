<template>
  <div class="flex items-center justify-center space-x-2">
    <!-- Botão "Previous" -->
    <button
      v-if="prevLink"
      @click="paginate(prevLink)"
      class="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-700 disabled:bg-gray-300"
      :disabled="!prevLink"
    >
      Previous
    </button>

    <!-- Botões de página -->
    <button
      v-for="link in links"
      :key="link.label"
      @click="paginate(link)"
      class="px-4 py-2 border rounded-md hover:bg-blue-500 hover:text-white"
      :class="{ 'bg-blue-500 text-white': link.active, 'bg-white text-blue-500': !link.active }"
    >
      {{ link.label }}
    </button>

    <!-- Botão "Next" -->
    <button
      v-if="nextLink"
      @click="paginate(nextLink)"
      class="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-700 disabled:bg-gray-300"
      :disabled="!nextLink"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  links: Array,
});

const emit = defineEmits(['paginate']);

// Identificando os links de navegação para "Previous" e "Next"
const prevLink = computed(() => props.links.find(link => link.label === 'Previous'));
const nextLink = computed(() => props.links.find(link => link.label === 'Next'));

// Função de navegação para mudar a página
const paginate = (link) => {
  const page = new URL(link.url).searchParams.get('page');
  emit('paginate', page);
};
</script>
