<script setup lang="ts">
import { useCart } from '~/stores/cart'
const cart = useCart()
const { params } = useRoute()
const { data, status, error } = await useAsyncData(() => $fetch(`/api/events/${params.slug}`))

useHead({
  title: () => data.value ? `${data.value.title} – NuxtTickets` : 'Événement',
  meta: () => data.value ? [
    { name: 'description', content: `${data.value.title} à ${data.value.venue.city}` },
    { property: 'og:image', content: data.value.image }
  ] : []
})

function addToCart() {
  if (!data.value) return
  cart.add({ id: data.value.id, title: data.value.title, price: data.value.priceMin }, 1)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <div v-if="status==='pending'">Chargement…</div>
      <div v-else-if="error">Introuvable.</div>
      <div v-else>
        <NuxtImg :src="data!.image" class="w-full h-72 object-cover rounded-2xl mb-6" />
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-700 mb-1">{{ data!.title }}</h1>
            <p class="text-gray-600">{{ data!.venue.city }}, {{ data!.venue.country }}</p>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-500">À partir de</div>
            <div class="text-xl font-700">{{ data!.priceMin }} €</div>
          </div>
        </div>

        <button class="mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-black text-white"
                @click="addToCart">
          <span class="i-tabler:shopping-cart-plus w-5 h-5"></span> Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>
