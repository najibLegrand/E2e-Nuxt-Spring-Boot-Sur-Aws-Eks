export type EventItem = {
    id: string; slug: string; title: string;
    category: 'sports' | 'concert' | 'theatre';
    date: string; venue: { city: string; country: string };
    priceMin: number; image: string;
}
export const EVENTS: EventItem[] = [
    { id:'1', slug:'finale-coupe-2025', title:'Finale Coupe 2025',
        category:'sports', date:'2025-12-20T19:00:00Z',
        venue:{ city:'Paris', country:'FR' }, priceMin:79,
        image:'https://picsum.photos/id/103/1200/800' },
    { id:'2', slug:'rock-legends-tour', title:'Rock Legends Tour',
        category:'concert', date:'2026-01-10T20:00:00Z',
        venue:{ city:'London', country:'UK' }, priceMin:59,
        image:'https://images.unsplash.com/photo-1518972559570-7cc1309f3229' },
];
