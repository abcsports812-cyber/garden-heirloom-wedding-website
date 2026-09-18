# The Garden Heirloom
### Luxury Editable Wedding Website Template

Thank you for choosing **The Garden Heirloom** — a premium, mobile-first wedding website template built with plain HTML, CSS, and JavaScript. No coding experience, no build tools, and no subscriptions required.

This guide will walk you through personalizing and publishing your website, step by step.

---

## 1. What's Included

```
the-garden-heirloom/
├── index.html               ← the website itself (don't need to edit much)
├── style.css                ← all design/styling
├── script.js                ← all interactive behavior
├── wedding-config.js         ← ⭐ THE ONLY FILE YOU NEED TO EDIT
├── README.md                 ← this file
├── CUSTOMIZATION_GUIDE.md    ← detailed section-by-section editing guide
└── assets/
    ├── images/                ← your photos go here
    ├── florals/                ← reusable decorative botanical accents (optional to edit)
    └── icons/                 ← the browser tab icon
```

---

## 2. Quick Start

1. **Download** the full template folder to your computer.
2. **Open `wedding-config.js`** in any plain-text editor (Notepad, TextEdit, VS Code, Sublime Text — anything that edits plain text, not Microsoft Word).
3. **Replace the sample information** — your names, date, venue, wedding party, links, and so on. Every editable field is marked with a comment like `// EDIT YOUR NAMES HERE`.
4. **Replace the placeholder images** in `assets/images/` with your own photos, keeping the same file names (or update the file names inside `wedding-config.js` if you rename them).
5. **Update your links** — RSVP form, Google Maps, hotel, and registry URLs.
6. **Save the file.**
7. **Open `index.html`** in your web browser (double-click it) to preview your site.
8. **Test everything** — see the checklist in Section 5 below.
9. **Publish** using one of the hosting options in Section 6.

You do not need to touch `index.html`, `style.css`, or `script.js` unless you want to make structural or design changes.

---

## 3. Editing `wedding-config.js`

Open the file and you'll see a single JavaScript object called `wedding`, organized into clearly labeled sections:

| Section | What it controls |
|---|---|
| `couple` | Your names and monogram |
| `date` | Wedding date (display text + exact date/time for the live countdown) |
| `venue` | Ceremony/reception venue name, address, and Google Maps link |
| `ceremony` / `reception` | Times and details shown in "The Wedding" section |
| `hero` | Hero background photo and top eyebrow text |
| `story` | Your love story paragraph, photo, and relationship timeline |
| `daySchedule` | The order-of-events timeline for your wedding day |
| `travel` | Airport and hotel information for guests |
| `people` | Bridesmaids and groomsmen — names, roles, and photos |
| `gallery` | Five gallery photos |
| `registry` | Registry names and links |
| `rsvp` | RSVP deadline, external RSVP link, and message |
| `faq` | Your FAQ questions and answers |
| `closing` | Closing section message and photo |
| `meta` | Browser tab title and description |

Every value is plain text inside quotation marks `" "`. To edit:

- Replace the text **between** the quotes.
- Never delete the quotes, commas, or curly braces `{ }`.
- Save the file when you're done — the website updates automatically the next time you open or refresh `index.html`.

For a detailed, section-by-section walkthrough, see **CUSTOMIZATION_GUIDE.md**.

---

## 4. Replacing Photos

The template ships with elegant placeholder artwork (soft botanical line-art) so you can preview the full design immediately. Before publishing, replace these with your own photography:

1. Add your photo files to `assets/images/`.
2. Use clear file names (e.g. `hero.jpg`, `story.jpg`, `venue.jpg`).
3. In `wedding-config.js`, update the matching `image:` value to point at your new file name, for example:
   ```js
   hero: {
     image: "assets/images/hero.jpg",
     ...
   }
   ```
4. For best performance, compress your photos before uploading (aim for under ~400KB each). Free tools like Squoosh (squoosh.app) or TinyPNG (tinypng.com) work well.
5. Recommended photo orientations:
   - Hero, story, closing: portrait or tall images
   - Venue: wide/landscape images
   - Gallery: a mix of portrait, square, and wide images (see the gallery section in the guide)
   - Wedding party: square, close-cropped portraits

---

## 5. Testing Before You Publish

Open `index.html` in your browser and check:

- [ ] Names, date, and venue appear correctly in the hero section
- [ ] The navigation menu scrolls to each section (desktop and the mobile hamburger menu)
- [ ] The countdown timer is counting down live and matches your date
- [ ] The "View Location" and "View Map" buttons open Google Maps correctly
- [ ] The hotel and airport links work
- [ ] Registry buttons open the correct websites
- [ ] The RSVP button opens your external RSVP form
- [ ] FAQ questions expand and collapse when clicked
- [ ] "Back to Top" returns you to the hero section
- [ ] The site looks correct on your phone (or by resizing your browser window)
- [ ] No broken image icons appear anywhere
- [ ] The browser tab shows your title and icon

Resize your browser window from narrow (mobile) to wide (desktop) to confirm the layout adapts smoothly, or open the site on your actual phone.

---

## 6. Publishing Your Website

Once you're happy with your site, you can publish it for free (or nearly free) using any of these beginner-friendly options:

**Netlify Drop** (easiest)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire `the-garden-heirloom` folder into the browser window
3. Netlify gives you a live link instantly — share it with your guests

**GitHub Pages**
1. Create a free GitHub account and a new repository
2. Upload all the template files
3. Enable "GitHub Pages" in the repository settings
4. Your site will be live at `https://yourusername.github.io/your-repo-name`

**Your own hosting**
Upload the entire folder via FTP to any standard web host — the site is plain HTML/CSS/JS and works anywhere.

Once live, you can connect a custom domain (e.g. `oliviaandjames.com`) through most of these hosts if you'd like.

---

## 7. Support

This template does not include analytics, tracking, or a backend — it's a lightweight, static website that's easy to host anywhere and easy to maintain. RSVP responses are collected by whatever external form/service you link to in `wedding-config.js` (Google Forms, Zola, etc.) — this website does not store any guest data itself.

Enjoy your wedding planning, and congratulations!
