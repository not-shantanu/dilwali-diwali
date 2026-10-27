export const invite = {
  title: 'Dilwali Diwali',
  subtitle: 'Thodi Roshni, Thodi Masti, Dher Saari Yaade',
  date: 'Saturday, 31 October 2026',
  day: 'Saturday',
  time: '7:30 PM onwards',
  venueName: 'Our humble abode',
  venueTitle: 'Scene of the sparkle',
  address: '42 Lotus Grove, Bandra West\nMumbai, Maharashtra 400050',
  addressOneLine:
    '42 Lotus Grove, Bandra West, Mumbai, Maharashtra 400050',
  mapsUrl: 'https://maps.app.goo.gl/vLkqQXEzKU11TvTd9',
} as const

export type RsvpResponse = 'pakka' | 'plate' | 'confused'

export interface RsvpEntry {
  response: RsvpResponse
  submittedAt: string
}

export const RSVP_STORAGE_KEY = 'diwali-party-rsvp'