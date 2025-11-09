// app/stores/cart.ts
import { defineStore } from 'pinia'

export type CartItem = { id: string; title: string; price: number; qty: number }

export const useCart = defineStore('cart', {
    state: () => ({ items: [] as CartItem[] }),
    getters: {
        count: (s) => s.items.reduce((n, it) => n + it.qty, 0),
        subtotal: (s) => s.items.reduce((n, it) => n + it.qty * it.price, 0),
    },
    actions: {
        add(item: Omit<CartItem, 'qty'>, qty = 1) {
            const existing = this.items.find(x => x.id === item.id)
            if (existing) existing.qty += qty
            else this.items.push({ ...item, qty })
        },
        remove(id: string) {
            this.items = this.items.filter(i => i.id !== id)
        },
        setQty(id: string, qty: number) {
            const it = this.items.find(i => i.id === id)
            if (it) it.qty = Math.max(1, qty)
        },
        clear() { this.items = [] }
    }
})
