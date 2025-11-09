import { EVENTS } from '../../data/events'
export default defineEventHandler((event) => {
    const { slug } = getRouterParams(event)
    const item = EVENTS.find(e => e.slug === slug)
    if (!item) { setResponseStatus(event, 404); return { message: 'Not found' } }
    return item
})
