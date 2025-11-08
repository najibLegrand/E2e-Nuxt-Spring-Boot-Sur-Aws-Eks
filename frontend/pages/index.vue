<template>
  <main>
    <h1>Catalogue</h1>
    <form @submit.prevent="add">
      <input v-model="name" placeholder="Nom" />
      <input v-model.number="price" placeholder="Prix" type="number" step="0.01" />
      <button>Ajouter</button>
    </form>
    <ul>
      <li v-for="p in products" :key="p.id">{{ p.name }} – {{ p.price.toFixed(2) }} €</li>
    </ul>
  </main>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();
const products = ref<{id:number;name:string;price:number}[]>([]);
const name = ref("");
const price = ref(0);
async function load(){ products.value = await $fetch(`${config.public.apiBase}/products`); }
async function add(){
  await $fetch(`${config.public.apiBase}/products`, { method:'POST', body:{name:name.value, price:price.value} });
  name.value=""; price.value=0; await load();
}
await load();
</script>
<style>main{max-width:640px;margin:40px auto;font-family:system-ui}</style>
