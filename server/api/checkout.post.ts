export default defineEventHandler(async (event) => {
    const body = await readBody<{ items: { id: string; title: string; price: number; qty: number }[] }>(event)
    // Ici tu “crées” la commande; pour la démo on renvoie juste un id
    return { ok: true, orderId: 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase(), items: body?.items || [] }
})
