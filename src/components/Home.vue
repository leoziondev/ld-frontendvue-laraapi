<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
    <div class="space-y-2" v-for="product in products.data" :key="product.id">
      <a href="#">
        <img src="http://placehold.co/250x250" :alt="product.name" />
      </a>
      <a class="text-slate-500 text-xl font-semibold hover:underline">
        {{ product.name }}
      </a>
      <p>${{ product.price }}</p>
      <p class="prose-slate">{{ product.description }}</p>
    </div>
  </div> 
  
  <!-- Componente de Paginação -->
  <Pagination
    :currentPage="currentPage"
    :totalPages="totalPages"
    :links="links"
    @paginate="goToPage"
  />
</template>

<script setup>
import api from '../services/axios';
import { onMounted, ref } from 'vue';
import Pagination from './Pagination.vue';

const categories = ref([]);
const products = ref({});
const currentPage = ref(1);  // Página atual
const totalPages = ref(1);   // Total de páginas
const links = ref([]);       // Links para a paginação

// Função para obter categorias
const getCategories = async () => {
  await api('/categories')
    .then(response => {
      categories.value = response.data.data;
    })
    .catch((error) => console.log(error));
}

// Função para obter produtos com paginação
const getProducts = async (page = 1) => {
  await api(`/products?page=${page}`)
    .then(response => {
      products.value = response.data;           // Dados dos produtos
      currentPage.value = response.data.meta.current_page;
      totalPages.value = response.data.meta.last_page;
      links.value = response.data.meta.links;
    })
    .catch((error) => console.log(error));
}

// Função de navegação para alterar a página
const goToPage = (page) => {
  getProducts(page);  // Chama a função para buscar os produtos da nova página
};

// Obtém as categorias e produtos na montagem do componente
onMounted(() => {
  getCategories();
  getProducts();
});
</script>
