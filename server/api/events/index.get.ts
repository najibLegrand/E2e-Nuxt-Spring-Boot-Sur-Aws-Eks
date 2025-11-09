// server/api/events/index.get.ts
import { EVENTS } from '../../data/events'   // ← ../../ depuis /api/events/

export default defineEventHandler((event) => {
    const q = getQuery(event)
    const search = String(q.q || '').toLowerCase()
    const category = q.category ? String(q.category) : ''
    const city = q.city ? String(q.city).toLowerCase() : ''

    let list = EVENTS.filter(e =>
        (!search || e.title.toLowerCase().includes(search)) &&
        (!category || e.category === category) &&
        (!city || e.venue.city.toLowerCase().includes(city))
    )

    const page = Number(q.page || 1), pageSize = Number(q.pageSize || 12)
    const total = list.length, start = (page - 1) * pageSize
    list = list.slice(start, start + pageSize)

    return { items: list, page, pageSize, total }
})
