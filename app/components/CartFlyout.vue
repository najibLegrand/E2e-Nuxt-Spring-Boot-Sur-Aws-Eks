<script setup lang="ts">
import { useCart } from '~/stores/cart'
const cart = useCart()
const fmt = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)

async function checkout() {
  const res = await $fetch('/api/checkout', { method: 'POST', body: { items: cart.items } })
  alert(`Commande ${res.orderId} validée (démo)`)
  cart.clear()
}
</script>

<template>
  <DialogRoot>
    <DialogTrigger class="inline-flex items-center gap-2 rounded-xl border px-3 py-2">
      <span class="i-tabler:shopping-cart w-5 h-5" />
      <span>Panier</span>
      <span v-if="cart.count" class="ml-1 rounded-full px-2 py-0.5 text-sm bg-black text-white">{{ cart.count }}</span>
    </DialogTrigger>

    <DialogContent class="bg-white rounded-2xl p-5 shadow-xl w-[480px] max-w-[90vw]">
      <DialogTitle class="font-600 text-lg mb-3">Votre panier</DialogTitle>

      <div v-if="!cart.items.length" class="text-gray-500">Aucun article.</div>
      <div v-else class="space-y-3">
        <div v-for="it in cart.items" :key="it.id" class="flex items-center justify-between">
          <div>
            <div class="font-600">{{ it.title }}</div>
            <div class="text-sm text-gray-500">{{ fmt(it.price) }} ×
              <input type="number" min="1" class="w-14 border rounded px-2 py-0.5 ml-1"
                     :value="it.qty" @input="cart.setQty(it.id, Number(($event.target as HTMLInputElement).value))" />
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="font-600">{{ fmt(it.price * it.qty) }}</div>
            <button class="text-sm text-red-600" @click="cart.remove(it.id)">Retirer</button>
          </div>
        </div>

        <div class="border-t pt-3 flex items-center justify-between">
          <div class="text-gray-600">Sous-total</div>
          <div class="font-700">{{ fmt(cart.subtotal) }}</div>
        </div>

        <div class="flex justify-end gap-2">
          <DialogClose class="border rounded-xl px-3 py-2">Continuer</DialogClose>
          <button class="rounded-xl px-4 py-2 bg-black text-white" @click="checkout" :disabled="!cart.items.length">
            Payer (démo)
          </button>
        </div>
      </div>
    </DialogContent>
  </DialogRoot>
</template>
