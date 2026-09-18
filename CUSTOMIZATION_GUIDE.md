# Customization Guide

A section-by-section walkthrough of everything you can edit in `wedding-config.js`. Every example below shows the exact block to find and what to change inside it.

---

## Names

```js
couple: {
  partner1: "Olivia",
  partner2: "James",
  monogram: "O & J"
}
```
Replace `partner1` and `partner2` with your first names. `monogram` is the short initials shown in the top-left corner of the navigation bar (e.g. `"A & B"`).

---

## Date & Countdown

```js
date: {
  display: "Saturday, 12 June 2027",
  iso: "2027-06-12T16:00:00-07:00"
}
```
- `display` is the friendly text shown throughout the site.
- `iso` powers the **live countdown** — use the format `YYYY-MM-DDTHH:MM:SS±HH:MM` in 24-hour time, matching your ceremony start time **and your venue's UTC offset**. For example, 4:00 PM Pacific time in summer becomes `T16:00:00-07:00`. Including the offset means every guest sees an accurate countdown no matter their own timezone. Not sure of your offset? Search "[your city] UTC offset" — common ones are listed as comments right above this field in the file.

---

## Hero Tagline

```js
hero: {
  image: "assets/images/hero.svg",
  eyebrow: "We're Getting Married",
  tagline: "Love, laughter, and happily ever after"
}
```
`tagline` is a short decorative line shown in a script font beneath your venue name in the hero. Keep it to one short phrase — it's meant to be a flourish, not another headline.

---

## Venue

```js
venue: {
  name: "The Willow Estate",
  addressLine1: "125 Garden Lane",
  addressLine2: "Meadowbrook",
  description: "A breathtaking historic estate surrounded by gardens...",
  mapsUrl: "https://www.google.com/maps",
  image: "assets/images/venue.svg"
}
```
Update the name, address, `description` (a short couple of sentences shown in the Venue section), and `mapsUrl` (open Google Maps, search your venue, click "Share," and copy the link). This powers the "View Location" and "View Map" buttons.

---

## Ceremony & Reception

```js
ceremony: { time: "4:00 PM", details: "The Willow Estate, Garden Pavilion", image: "assets/images/wedding-detail.svg" },
reception: { time: "5:30 PM", details: "Dinner • Dancing • Celebration" }
```
Edit the times and short details shown in "The Wedding" section. `ceremony.image` is the wide banner photo at the top of the section — a detail shot (rings, decor) works well here.

---

## Story

```js
story: {
  heading: "Our Story",
  paragraph: "We met on a quiet spring afternoon...",
  image: "assets/images/story.svg",
  timeline: [
    { year: "2019", title: "The First Hello" },
    { year: "2022", title: "Our First Adventure" },
    { year: "2026", title: "The Proposal" },
    { year: "2027", title: "Our Forever Begins" }
  ]
}
```
Rewrite `paragraph` with your own story. Add, remove, or rename `timeline` entries — each needs a `year` and a `title`.

---

## The Day (Order of Events)

```js
day: {
  image: "assets/images/day.svg"
},
daySchedule: [
  { time: "3:30 PM", title: "Guest Arrival" },
  { time: "4:00 PM", title: "Ceremony" },
  ...
]
```
`day.image` is a decorative panel shown beside the schedule on wider screens (it's hidden and the timeline stacks full-width on phones and tablets, so you don't need to worry about it there). Add or remove schedule rows freely — copy an existing line, change the `time` and `title`, and keep the commas between entries.

---

## Travel & Stay

```js
travel: {
  image: "assets/images/travel-scenery.svg",
  airport: {
    name: "Meadowbrook International Airport",
    duration: "30 minutes by car",
    url: "https://www.google.com/maps"
  },
  hotel: {
    name: "The Garden House Hotel",
    addressLine1: "20 Rose Avenue",
    addressLine2: "Meadowbrook",
    url: "https://www.booking.com"
  },
  tips: [
    "Book flights early for the best rates.",
    "Consider travel insurance.",
    "Pack for warm, sunny weather."
  ]
}
```
`image` is the wide scenery banner at the top of the section. Update the airport name/directions link, and your recommended hotel's name, address, and booking link. Add, remove, or edit as many `tips` as you like — each is a short sentence shown as a bullet in the "Travel Tips" column.

---

## Wedding Party (People)

```js
people: {
  bridesmaids: {
    heading: "Bridesmaids",
    members: [
      { name: "Emma Carter", role: "Maid of Honor", image: "assets/images/bridesmaid-1.svg" },
      ...
    ]
  },
  groomsmen: {
    heading: "Groomsmen",
    members: [ ... ]
  }
}
```
Add or remove people by copying an existing `{ name, role, image }` entry. Point `image` at a square photo of that person in `assets/images/`.

---

## Gallery

```js
gallery: [
  { image: "assets/images/gallery-1.svg", alt: "The couple sharing a quiet moment", size: "large" },
  { image: "assets/images/gallery-2.svg", alt: "Detail from the proposal", size: "small" },
  { image: "assets/images/gallery-3.svg", alt: "Golden hour together", size: "small" },
  { image: "assets/images/gallery-4.svg", alt: "A candid moment of laughter", size: "wide" },
  { image: "assets/images/gallery-6.svg", alt: "A quiet walk through the garden", size: "portrait" },
  { image: "assets/images/gallery-7.svg", alt: "Details from the day", size: "portrait" },
  { image: "assets/images/gallery-5.svg", alt: "Walking hand in hand", size: "large" },
  { image: "assets/images/gallery-8.svg", alt: "The estate at sunset", size: "wide" }
]
```
This section uses exactly **eight images** in a fixed editorial mosaic (large / small / small / wide / portrait / portrait / large / wide). Replace the `image` paths with your own photos and update the `alt` text to describe each photo (important for accessibility). Keep the `size` values, and their order, as-is unless you also adjust the gallery CSS in `style.css`. Clicking any gallery photo opens it larger in a lightbox (closes with the × button, a click outside the photo, or the Escape key) — no setup needed, this works automatically.

---

## Registry

```js
registry: [
  { name: "Amazon", url: "https://www.amazon.com/" },
  { name: "Target", url: "https://www.target.com/" },
  { name: "Zola", url: "https://www.zola.com/" },
  { name: "Honeyfund", url: "https://www.honeyfund.com/" }
]
```
Add, remove, or edit registry entries — each needs a `name` and a `url`.

---

## RSVP

```js
rsvp: {
  deadline: "15 May 2027",
  url: "https://forms.google.com",
  message: "We can't wait to celebrate with you.",
  image: "assets/images/rsvp-bg.svg"
}
```
Set your RSVP deadline and paste the link to your external RSVP form (Google Forms, Zola, Typeform, etc.). `image` is a soft background photo shown behind the RSVP card (veiled under a light overlay, so keep the RSVP text as the focal point rather than a busy photo).

**About the RSVP form on the page:** guests see a real form (name, attending yes/no, guest count, notes) so they can think through their answer — but since this is a simple website with no server or database, it genuinely cannot receive or store that data. Clicking "Submit RSVP" opens your `url` above in a new tab so the guest completes their actual RSVP there. This is intentional and disclosed to guests in the small note under the button — please don't remove that note, since it's what keeps the form honest about what it does.

---

## FAQ

```js
faqImage: "assets/images/faq.svg",
faq: [
  { question: "What should I wear?", answer: "..." },
  ...
]
```
`faqImage` is a slim decorative panel shown beside the question list on desktop screens only (it's hidden on phones and tablets to keep the accordion compact there). Add, remove, or edit any number of question/answer pairs in `faq` — each needs a `question` and an `answer`.

---

## Closing Section

```js
closing: {
  message: "Thank you for celebrating this beautiful beginning with us.",
  image: "assets/images/closing.svg"
}
```
Edit the closing message and swap in a final photo or botanical image.

---

## Floral Decorations

The soft rose-and-eucalyptus accents around the hero, story photo, countdown heading, venue photo, wedding party, gallery, RSVP card, and closing section come from reusable SVG files in `assets/florals/`:

| File | Used for |
|---|---|
| `corner-rose-burgundy.svg` / `corner-rose-blush.svg` | Corner accents on the hero, story photo, venue photo, and closing section |
| `corner-rose-small.svg` | The small accents on the RSVP card |
| `divider-sprig.svg` / `divider-sprig-flip.svg` | The sprigs beside the countdown heading and above the gallery |
| `accent-sprig.svg` | The small single sprig near "The Wedding" and "Our People" headings |

These are decorative and optional — you don't need to touch them to customize your site. If you'd like to remove one, delete its `<img class="floral ...">` tag from `index.html`; if you'd like to reuse one elsewhere, copy an existing `<img class="floral floral--tl ...">` tag and change which corner class (`floral--tl`, `floral--tr`, `floral--bl`, `floral--br`) it uses.

---

## Site Title & Description

```js
meta: {
  siteTitle: "Elegant Garden Wedding — Luxury Wedding Website Template",
  description: "Join Olivia & James as they celebrate their wedding at The Willow Estate on 12 June 2027.",
  themeColor: "#5B1F2A"
}
```
`siteTitle` appears in the browser tab and when the link is shared. `description` appears in search results and link previews.

---

## Changing Colors or Fonts (Optional, more advanced)

If you'd like to adjust the color palette, open `style.css` and edit the values at the very top of the file, inside `:root { ... }`:

```css
:root {
  --ivory: #FBF3EC;
  --burgundy: #5B1F2A;
  --olive: #6D7659;
  --champagne: #D8BFA3;
  --blush: #F2C6B4;
  --brown: #3F3936;
}
```
Every element on the site references these variables, so changing a color here updates it everywhere automatically.

---

Need the quick version? See **README.md** for the fast start guide.
