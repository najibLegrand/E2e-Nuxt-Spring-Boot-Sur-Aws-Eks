<script setup lang="ts">
const q = ref(''); const category = ref(''); const city = ref('');
const { data, status } = await useAsyncData('events', () =>
        $fetch('/api/events', { query: { q: q.value, category: category.value, city: city.value } }),
    { watch: [q, category, city] }
)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <header class="max-w-6xl mx-auto flex flex-wrap gap-3 items-end mb-6">
      <input v-model="q" placeholder="Chercher un événement..." class="border rounded-xl px-4 py-2 w-64" />
      <select v-model="category" class="border rounded-xl px-3 py-2">
        <option value="">Toutes</option>
        <option value="sports">Sports</option>
        <option value="concert">Concert</option>
        <option value="theatre">Théâtre</option>
      </select>
      <input v-model="city" placeholder="Ville" class="border rounded-xl px-4 py-2 w-48" />
    </header>

    <main class="max-w-6xl mx-auto">
      <div v-if="status === 'pending'">Chargement…</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="e in data?.items" :key="e.id" class="bg-white rounded-2xl shadow-sm p-3 hover:shadow-md transition">
          <NuxtLink :to="`/event/${e.slug}`" class="block">
            <NuxtImg :src="e.image" format="webp" class="w-full h-44 object-cover rounded-xl" />
            <div class="mt-3">
              <h3 class="font-600 text-lg">{{ e.title }}</h3>
              <p class="text-gray-500 text-sm">{{ e.venue.city }}, {{ e.venue.country }}</p>
              <p class="mt-1 text-sm">dès {{ e.priceMin }} €</p>
            </div>
          </NuxtLink>
        </article>
      </div>
    </main>
  </div>
</template>
