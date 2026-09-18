/* ============================================================
   THE GARDEN HEIRLOOM — WEDDING CONFIGURATION
   ============================================================
   This is the ONLY file you need to edit to personalize your
   website. Every name, date, link, and photo on the site is
   pulled from this file automatically.

   HOW TO EDIT:
   1. Find the section you want to change (look for the ALL CAPS
      comments like "EDIT YOUR NAMES HERE").
   2. Replace the sample text between the quotes " " with your
      own information. Do not delete the quotes or commas.
   3. Save the file and refresh index.html in your browser.

   Need more help? See README.md and CUSTOMIZATION_GUIDE.md.
   ============================================================ */

const wedding = {

  // EDIT YOUR NAMES HERE
  couple: {
    partner1: "Olivia",
    partner2: "James",
    // Short monogram shown as decoration (e.g. initials). Keep it brief.
    monogram: "O & J"
  },

  // EDIT YOUR WEDDING DATE HERE
  date: {
    // Friendly display text used throughout the site.
    display: "Saturday, 12 June 2027",
    // Exact ISO date, time, AND timezone offset that powers the live
    // countdown. Format: "YYYY-MM-DDTHH:MM:SS+HH:MM" (or "-HH:MM").
    // This should match your ceremony start time IN YOUR VENUE'S OWN
    // TIMEZONE — the offset makes sure every guest sees an accurate
    // countdown no matter their own timezone, instead of the count
    // silently shifting for out-of-town guests. Common offsets:
    //   Pacific:  -07:00 (summer) / -08:00 (winter)
    //   Mountain: -06:00 / -07:00
    //   Central:  -05:00 / -06:00
    //   Eastern:  -04:00 / -05:00
    //   UTC/GMT:   +00:00
    // Not sure of your offset? Search "[your city] UTC offset".
    iso: "2027-06-12T16:00:00-07:00",
  },

  // EDIT YOUR VENUE HERE
  venue: {
    name: "The Willow Estate",
    addressLine1: "125 Garden Lane",
    addressLine2: "Meadowbrook",
    description: "A breathtaking historic estate surrounded by gardens. The Willow Estate is a romantic countryside venue with lush gardens, European charm, and unforgettable views — the perfect place to celebrate our love.",
    mapsUrl: "https://www.google.com/maps",
    image: "assets/images/venue.svg"
  },

  ceremony: {
    time: "4:00 PM",
    details: "The Willow Estate, Garden Pavilion",
    image: "assets/images/wedding-detail.svg"
  },

  reception: {
    time: "5:30 PM",
    details: "Dinner • Dancing • Celebration"
  },

  // Hero section background photo (replace with your own image).
  hero: {
    image: "assets/images/hero.svg",
    eyebrow: "We're Getting Married",
    // Short decorative phrase, set in a script font. Keep it brief — one line.
    tagline: "Love, laughter, and happily ever after"
  },

  // EDIT YOUR STORY HERE
  story: {
    heading: "Our Story",
    paragraph: "We met on a quiet spring afternoon and quickly discovered how easy it was to laugh together. From our first date to the proposal beneath the garden lights, every chapter has led us here — to the beginning of forever.",
    image: "assets/images/story.svg",
    // Add, remove, or edit as many timeline moments as you like.
    timeline: [
      { year: "2019", title: "The First Hello" },
      { year: "2022", title: "Our First Adventure" },
      { year: "2026", title: "The Proposal" },
      { year: "2027", title: "Our Forever Begins" }
    ]
  },

  // Decorative panel shown beside the day's schedule on wider screens.
  day: {
    image: "assets/images/day.svg"
  },

  // The order of events on your wedding day. Add or remove rows freely.
  daySchedule: [
    { time: "3:30 PM", title: "Guest Arrival" },
    { time: "4:00 PM", title: "Ceremony" },
    { time: "5:00 PM", title: "Cocktail Hour" },
    { time: "6:00 PM", title: "Dinner" },
    { time: "7:15 PM", title: "Speeches" },
    { time: "7:45 PM", title: "First Dance" },
    { time: "8:15 PM", title: "Cake Cutting" },
    { time: "8:30 PM", title: "Dancing & Celebration" }
  ],

  // Travel & accommodation information for out-of-town guests.
  travel: {
    image: "assets/images/travel-scenery.svg",
    airport: {
      name: "Meadowbrook International Airport",
      duration: "30 minutes by car",
      url: "https://www.google.com/maps"
    },
    // EDIT YOUR HOTEL HERE
    hotel: {
      name: "The Garden House Hotel",
      addressLine1: "20 Rose Avenue",
      addressLine2: "Meadowbrook",
      url: "https://www.booking.com"
    },
    // A short list of helpful notes for guests. Add, remove, or edit freely.
    tips: [
      "Book flights early for the best rates.",
      "Consider travel insurance.",
      "Pack for warm, sunny weather.",
      "Don't forget comfortable shoes!",
      "Extend your stay and explore Meadowbrook."
    ]
  },

  // EDIT YOUR WEDDING PARTY HERE — add, remove, or edit any entry.
  // EDIT YOUR PHOTOS HERE — point "image" at your own photo files.
  people: {
    bridesmaids: {
      heading: "Bridesmaids",
      members: [
        { name: "Emma Carter", role: "Maid of Honor", image: "assets/images/bridesmaid-1.svg" },
        { name: "Sophia Reed", role: "Bridesmaid", image: "assets/images/bridesmaid-2.svg" },
        { name: "Mia Bennett", role: "Bridesmaid", image: "assets/images/bridesmaid-3.svg" }
      ]
    },
    groomsmen: {
      heading: "Groomsmen",
      members: [
        { name: "Noah Brooks", role: "Best Man", image: "assets/images/groomsman-1.svg" },
        { name: "Liam Foster", role: "Groomsman", image: "assets/images/groomsman-2.svg" },
        { name: "Ethan Hayes", role: "Groomsman", image: "assets/images/groomsman-3.svg" }
      ]
    }
  },

  // EDIT YOUR PHOTOS HERE — the gallery uses eight images in an
  // editorial, asymmetric layout. Each entry's "size" controls its
  // shape in the grid: "large" (tall), "small" (square), "wide"
  // (full-width landscape), or "portrait" (medium tall).
  gallery: [
    { image: "assets/images/gallery-1.svg", alt: "The couple sharing a quiet moment", size: "large" },
    { image: "assets/images/gallery-2.svg", alt: "Detail from the proposal", size: "small" },
    { image: "assets/images/gallery-3.svg", alt: "Golden hour together", size: "small" },
    { image: "assets/images/gallery-4.svg", alt: "A candid moment of laughter", size: "wide" },
    { image: "assets/images/gallery-6.svg", alt: "A quiet walk through the garden", size: "portrait" },
    { image: "assets/images/gallery-7.svg", alt: "Details from the day", size: "portrait" },
    { image: "assets/images/gallery-5.svg", alt: "Walking hand in hand", size: "large" },
    { image: "assets/images/gallery-8.svg", alt: "The estate at sunset", size: "wide" }
  ],

  // EDIT YOUR REGISTRY LINKS HERE
  registry: [
    { name: "Amazon", url: "https://www.amazon.com/" },
    { name: "Target", url: "https://www.target.com/" },
    { name: "Zola", url: "https://www.zola.com/" },
    { name: "Honeyfund", url: "https://www.honeyfund.com/" }
  ],

  // EDIT YOUR RSVP LINK HERE — this should point to your Google
  // Form, Zola RSVP page, or other external RSVP service. This
  // website does not collect or store RSVP responses itself.
  rsvp: {
    deadline: "15 May 2027",
    url: "https://forms.google.com",
    message: "We can't wait to celebrate with you.",
    image: "assets/images/rsvp-bg.svg"
  },

  // Decorative panel shown beside the FAQ list on wider screens.
  faqImage: "assets/images/faq.svg",

  // Add, remove, or edit as many questions as you like.
  faq: [
    {
      question: "What should I wear?",
      answer: "We're asking guests for garden formal attire — think soft, elegant tones. Comfortable shoes are recommended as the ceremony and reception take place on natural grounds."
    },
    {
      question: "Are children invited?",
      answer: "We love your little ones, but our celebration will be an adults-only evening. We hope this gives everyone a wonderful night to relax and celebrate with us."
    },
    {
      question: "Can I bring a plus-one?",
      answer: "Plus-ones are welcome for guests whose invitation specifically includes one. Please check your invitation or reach out to us directly if you have any questions."
    },
    {
      question: "Where should I park?",
      answer: "Complimentary on-site parking is available at The Willow Estate. Signs will direct you from the main entrance to the guest parking area."
    },
    {
      question: "When should I arrive?",
      answer: "Please plan to arrive by 3:30 PM so you're comfortably seated before the ceremony begins promptly at 4:00 PM."
    },
    {
      question: "Where is the registry?",
      answer: "You can find links to our registries in the Registry section of this website. Your presence is truly the greatest gift."
    },
    {
      question: "Are there hotel recommendations?",
      answer: "Yes — see the Travel & Stay section above for our recommended hotel, along with airport and travel details for out-of-town guests."
    },
    {
      question: "Still have a question?",
      answer: "We're happy to help! Please reach out to us directly and we'll get back to you as soon as we can."
    }
  ],

  closing: {
    message: "Thank you for celebrating this beautiful beginning with us.",
    image: "assets/images/closing.svg"
  },

  // Site metadata used for the browser tab and social sharing.
  meta: {
    siteTitle: "Elegant Garden Wedding — Luxury Wedding Website Template",
    description: "Join Olivia & James as they celebrate their wedding at The Willow Estate on 12 June 2027.",
    themeColor: "#5B1F2A"
  }
};
