/*
  Halflight Lighting Co: demo hub content.
  FICTIONAL. Every company, person, product, competitor, figure and quote here is invented.
  This file is the only place the demo's content lives. The hub engine (assets/hub.js) is reusable;
  for a real client, this file is rewritten from their own mapping, in their own words.
*/
window.HUB = {
  company: {
    name: "Halflight Lighting Co",
    short: "Halflight",
    oneLine: "A family-owned importer of indoor, outdoor and architectural lighting, based in Tauranga since 2009.",
    tagline: "Light, well specified.",
    fictionNote: "Fictional demo company. All names, people, figures and content are invented.",
    hubOwner: "sam",
    hubReviewed: "2026-10-01"
  },

  // Think Right area -> this company's own name for it ("their names, our areas")
  areas: [
    { id: "who", reviewed: "2026-09-12", tr: "Who We Are", name: "Our Story", icon: "home", line: "Where we came from, how we behave, and who's who.", owner: "nadia" },
    { id: "serve", reviewed: "2026-09-10", tr: "Who We Serve", name: "Who We Serve", icon: "users", line: "Everyone we sell to, and who's involved in each deal.", owner: "priya" },
    { id: "offer", reviewed: "2026-09-15", tr: "What We Offer and How We Compare", name: "Range and Rivals", icon: "bulb", line: "What we sell, why we win, who we're up against.", owner: "nadia" },
    { id: "work", reviewed: "2026-09-20", tr: "How We Work", name: "How We Work", icon: "flow", line: "The sales process and the order-to-site flow.", owner: "sam" },
    { id: "library", reviewed: "2026-09-28", tr: "Resource Library", name: "Toolbox", icon: "file", line: "Every template and checklist, stored once.", owner: "ellie" },
    { id: "toolkit", reviewed: "2026-09-10", tr: "Sales Toolkit", name: "Meeting Prep", icon: "card", line: "Build a battlecard for your next meeting.", owner: "priya" },
    { id: "people", reviewed: "2026-05-20", tr: "Growing Our People", name: "Growing Our Team", icon: "grow", line: "A path for someone new: the basics first, then your role.", owner: "sam" },
    { id: "goals", reviewed: "2026-10-01", tr: "Goals and Progress", name: "Scoreboard", icon: "chart", line: "This year's goals and how we're tracking.", owner: "sam" }
  ],

  // Our Story: pre-filled from the website (source/02-website/home-and-about.md), then confirmed by Nadia.
  // The founder quote, the values in practice and the milestone details are Claude's suggestions for Mariah to react to.
  story: {
    intro: "Indoor, outdoor and architectural lighting for New Zealand homes and projects. Tested in Tauranga, supported for life.",
    today: "Today we're a team of twelve in a warehouse near the port, still family owned, supplying architects, lighting designers, electricians, wholesalers and homeowners all over New Zealand.",
    founder: { by: "nadia", quote: "I brought in one pallet of pendants for friends who were building, and sold the leftovers out of my garage in Bethlehem. The friends told their architects, and the architects told their friends. We've never really stopped.", photo: "Photos of the garage to come. Hana is finding the old ones (kick-off, August 2026)." },
    // From the website's Milestones list. "who" lights up the people in the org chart who are part of that year.
    milestones: [
      { year: "2009", t: "The first pallet", line: "Nadia brings in a pallet of pendants for friends who are building, and sells the leftovers from her garage in Bethlehem.", art: "dome", who: ["nadia"] },
      { year: "2012", t: "Our first architect project", line: "A Mount Maunganui beach house, still lit with our Drift pendants. If a customer asks for \"the round one from the beach house photo\", that's a Drift.", art: "cluster", who: ["nadia"] },
      { year: "2015", t: "The warehouse near the port", line: "Out of the garage and into the warehouse we still work from. Tui joins.", art: "bulkhead", who: ["tui"] },
      { year: "2018", t: "Our own powder-coat booth", line: "Custom finishes in ten days, any colour, done here in Tauranga.", art: "finish", who: ["tui"] },
      { year: "2020", t: "The trade portal", line: "Electricians and wholesalers log in for trade pricing and live stock.", art: "downlight", who: ["jase"] },
      { year: "2022", t: "Free lighting plans", line: "Leo joins and free lighting plans begin. Send us the plans and get a layout back, usually within two days.", art: "plan", who: ["leo"] },
      { year: "2024", t: "Online shop and Auckland", line: "The online shop is relaunched, and Mere starts as our Auckland rep.", art: "track", who: ["hana", "mere"] },
      { year: "2026", t: "Twelve of us", line: "Twelve people, one warehouse, and a hub so the next new starter isn't learning it all from people's heads.", art: "linear", who: ["nadia", "sam", "priya", "leo", "jase", "mere", "hana", "ellie", "josh", "arjun", "tui", "kit"] }
    ],
    believe: "We only sell lighting we'd put in our own homes. We'd rather tell you a fitting is six weeks away than promise it Friday and let you down. And we think the electrician on site at 7am deserves as much help as the architect who drew the plans.",
    // The four values are the website's. "does" is what each one looks like here, from the staff's own questionnaire answers.
    values: [
      { name: "Own the outcome", line: "If we said it, we deliver it, even when the shipment's late.", does: [
        { t: "Customers hear about a delay from us, before the contractor tells them. Every import order gets an update.", by: "arjun" },
        { t: "If it's not on the test record, it didn't happen. Every fitting is tested before it leaves.", by: "tui" },
        { t: "A spec isn't won until the contractor's name is next to it, so we stay with it to site.", by: "priya" } ] },
      { name: "Make it easy", line: "For the electrician on site at 7am as much as for the architect.", does: [
        { t: "Answer the phone. Get to know the branch managers by name, and bring the samples.", by: "mere" },
        { t: "Text the site lead the day before a site delivery, so nobody's left waiting.", by: "tui" },
        { t: "Ask. Nobody minds. And put it in the CRM so the next person knows.", by: "sam" } ] },
      { name: "Straight up", line: "We're honest about stock, lead times and price.", does: [
        { t: "We'd rather say six weeks than promise Friday. Never promise a date you haven't checked.", by: "ellie" },
        { t: "We quote the specified fitting first. Cheaper options are labelled as alternates, never a quiet swap.", by: "priya" },
        { t: "We don't knock other brands. The sparkies use them too.", by: "jase" } ] },
      { name: "Design with care", line: "We only sell what we'd put in our own homes.", does: [
        { t: "We check colour temperature against the spec. Always.", by: "arjun" },
        { t: "Every lighting plan notes dimming and colour temperature, because 4000K in a living room is how most problems start.", by: "leo" },
        { t: "Every photo we use has permission. Every one.", by: "hana" } ] }
    ],
    adds: ["Custom finishes", "Local assembly", "Smart-dimming upgrades", "A compliance test on every fitting"],
    whereWePlay: "NZ residential and boutique commercial projects (hospitality, retail, small offices), Upper North Island first.",
    whereWeDont: "Large commercial tenders, cheap commodity LED, and Australia (for now).",
    playConfirm: "Not on the website yet. Nadia to confirm at the next review.",
    orgNote: "Jase and Mere report to Nadia on paper, but day to day they work with Priya on specs. Sam: \"Probably needs sorting.\"",
    orgExtra: "Plus our bookkeeper, in on Thursdays (a contractor, not on the hub)."
  },

  // The team, from Sam's org chart (source/01-kickoff/org-chart.md). "reports" draws the org chart; "day" is who they work with day to day.
  // "asks" is "Ask me about..." on the org chart, in their words where the questionnaires give them. "look" is their illustrated avatar.
  people: [
    { id: "nadia", name: "Nadia", role: "Managing Director", team: "Leadership", asks: ["Key architect relationships", "Big box accounts", "Where we're heading", "The garage days"], look: { bg: "#FBF0C9", skin: "#E8B896", hair: "bob", hc: "#6E6259", top: "#1F2A36", acc: "glasses" } },
    { id: "sam", name: "Sam", role: "GM and Finance", team: "Leadership", reports: "nadia", asks: ["Pricing approvals", "Payroll and leave", "IT, whether I like it or not", "This hub"], look: { bg: "#E3ECF4", skin: "#C68B65", hair: "short", hc: "#2B2523", top: "#4A5D70", acc: "glasses" } },
    { id: "priya", name: "Priya", role: "Specification Manager", team: "Specification", reports: "nadia", asks: ["Architect and designer projects", "The spec register", "Beam angle versus colour temperature"], look: { bg: "#ECE8F7", skin: "#B07A55", hair: "long", hc: "#1B1716", top: "#1F2A36", acc: "glasses" } },
    { id: "leo", name: "Leo", role: "Lighting Designer", team: "Specification", reports: "priya", asks: ["Lighting plans", "Colour temperature and CRI", "Dimming and controls"], look: { bg: "#E3ECF4", skin: "#D9A27C", hair: "curly", hc: "#2B2523", top: "#4A5D70", acc: "" } },
    { id: "jase", name: "Jase", role: "Trade Sales Rep (Bay of Plenty and Waikato)", team: "Trade Sales", reports: "nadia", day: "priya", asks: ["Electrician accounts", "Wholesaler branches", "Being useful on site"], look: { bg: "#F4E4DE", skin: "#F3D2B8", hair: "short", hc: "#B5763C", top: "#2E5D45", acc: "beard" } },
    { id: "mere", name: "Mere", role: "Trade Sales Rep (Auckland and Northland)", team: "Trade Sales", reports: "nadia", day: "priya", note: "Based in Auckland, home office", asks: ["Electrician accounts", "Wholesaler branch managers", "Samples"], look: { bg: "#FBF0C9", skin: "#7A4B32", hair: "curly", hc: "#1B1716", top: "#C9765B", acc: "earrings" } },
    { id: "ellie", name: "Ellie", role: "Customer Service Lead", team: "Customer Service", reports: "sam", asks: ["Quotes and orders", "Order updates", "Range names", "Toolbox templates"], look: { bg: "#F4E4DE", skin: "#F1C7A6", hair: "pony", hc: "#8A5A2B", top: "#C9765B", acc: "earrings" } },
    { id: "josh", name: "Josh", role: "Customer Service", team: "Customer Service", reports: "ellie", note: "Started March 2026", asks: ["Quotes and orders", "Returns"], look: { bg: "#E7F0E3", skin: "#A86F4C", hair: "short", hc: "#3A2A20", top: "#7FA88B", acc: "" } },
    { id: "arjun", name: "Arjun", role: "Purchasing and Import Logistics", team: "Operations", reports: "sam", asks: ["Supplier orders", "Shipping and ETAs", "Landed costs"], look: { bg: "#ECE8F7", skin: "#8D5A3B", hair: "side", hc: "#141110", top: "#2A3847", acc: "beard" } },
    { id: "tui", name: "Tui", role: "Warehouse and Assembly Lead", team: "Operations", reports: "sam", asks: ["Custom finishes", "Compliance testing", "Where things live in the warehouse"], look: { bg: "#E7F0E3", skin: "#9A6544", hair: "bun", hc: "#1B1716", top: "#2E5D45", acc: "hivis" } },
    { id: "kit", name: "Kit", role: "Warehouse and Assembly", team: "Operations", reports: "tui", asks: ["Picking and packing", "Courier bookings"], look: { bg: "#FBF0C9", skin: "#EFC09C", hair: "cap", hc: "#5A3A22", top: "#E9A23B", acc: "hivis" } },
    { id: "hana", name: "Hana", role: "Online and Marketing Coordinator", team: "Marketing", reports: "sam", note: "4 days a week", asks: ["Website and online orders", "Case studies and photos", "Social"], look: { bg: "#F0EAE0", skin: "#E8C3A0", hair: "long", hc: "#141110", top: "#8A6A12", acc: "earrings" } }
  ],

  // Roles and departments. Tasks and stages name a role, never a person, so staff changes are updated here only.
  roles: [
    { id: "md", name: "Managing Director", people: ["nadia"] },
    { id: "gm", name: "GM and Finance", people: ["sam"] },
    { id: "cs", name: "Customer Service", people: ["ellie", "josh"] },
    { id: "spec", name: "Specification", people: ["priya"] },
    { id: "design", name: "Lighting Design", people: ["leo"] },
    { id: "reps", name: "Trade Sales", people: ["jase", "mere"] },
    { id: "marketing", name: "Marketing", people: ["hana"] },
    { id: "purchasing", name: "Purchasing", people: ["arjun"] },
    { id: "warehouse", name: "Warehouse", people: ["tui", "kit"] }
  ],

  // Points of difference ("Why we win"), led by proof: the claim, the proof and where it comes from, then how to say it.
  // "line" and "proof" also go on the battlecard. "tags" are matched against what each person cares about to order them there.
  // "from" is the source of the proof. "check" flags proof that doesn't match another source yet (shown as "To confirm").
  pods: [
    { id: "spec", name: "Spec-to-site support", claim: "We stay with the spec until it's installed.", stat: "36 hrs", statLine: "average lighting plan turnaround last year, against a 48-hour promise",
      line: "A free lighting plan within 48 hours, and we follow every specified project through to the contractor so the spec isn't swapped.",
      proof: "Average lighting plan turnaround last year: 36 hours.", from: "Lighting Design's plan log (Leo's questionnaire)",
      say: "Send us the plans and you'll have a layout back inside two days. Then we stay with it right through to the electrician, so what you drew is what goes in.",
      tags: ["design", "spec-support", "protect-spec", "risk"] },
    { id: "local", name: "Local value add", claim: "Your colour, finished here, in ten working days.", stat: "10 days", statLine: "any powder-coat colour, batched every Monday and Thursday in our own booth",
      line: "Custom finishes and colour temperatures in 10 working days, against 12+ weeks to order from overseas.",
      proof: "Our own powder-coat booth in Tauranga since 2018. Colours batched twice a week.", from: "Website milestones and Warehouse's questionnaire (Tui)",
      say: "Pick any colour you like, even off a cushion. We coat it here in Tauranga and it's back with you in ten working days.",
      tags: ["design", "speed", "custom"] },
    { id: "stock", name: "Stock you can count on", claim: "On our shelf in Tauranga, not on a boat.", stat: "94%", statLine: "of orders delivered on time in September (target 95%)",
      line: "The core range is held in Tauranga, and trade customers see live stock online.",
      proof: "On-time delivery 94% in September. Live stock on the trade portal since 2020.", from: "Sam's KPI sheet, September 2026",
      say: "It's on our shelf in Tauranga. Check the trade portal and you'll see the live number before you price it.",
      tags: ["availability", "speed", "reliability"] },
    { id: "pricing", name: "Channel-clear pricing", claim: "We never undercut our own customers.", stat: "RRP", statLine: "online is always full retail, and big box never gets the Architectural range",
      line: "Big box carries its own core range and online is full retail, so we never undercut trade or specifier customers.",
      proof: "Written channel price rules: online never below RRP, no price matching, big box never gets Architectural.", from: "Channel price rules, April 2026 (Sam)",
      check: "The price rules were last updated in April and Sam says some of it has changed since.",
      say: "You'll never find us cheaper on our own website. Online is full retail, so we're never competing with you.",
      tags: ["margin", "price-trust"] },
    { id: "backup", name: "NZ warranty and after-sales", claim: "Tested here. Backed by people you can call.", stat: "Every", statLine: "fitting gets an electrical safety test in Tauranga, with a batch number and a test record",
      line: "Five-year warranty on architectural range, handled in Tauranga, with install support by phone.",
      proof: "Every fitting tested in Tauranga, batch number on the label. Google rating 4.8.", from: "Compliance test record and Sam's KPI sheet",
      say: "Every fitting's tested here before it leaves, and the batch number's on the label. If something's not right, you ring us in Tauranga.",
      tags: ["reliability", "risk", "warranty"] }
  ],

  // Who We Serve, two layers: the customer types (channels), then the people around the table in each one.
  // Each person follows Mike's profile format: nickname and role, one-line summary, job titles, responsibility,
  // goals and needs, pain points, decision drivers (with a quote in their voice) and the Halflight hook.
  // "cares" orders the points of difference on the battlecard. "line" is what the battlecard shows under "What they care about".
  // "seat" is their part in the deal. "look" draws their illustrated avatar (never a photo). "share" is % of revenue YTD (Sam's KPI sheet).
  // "alsoAt" are people from another channel who sit at this table too: "channel:role".
  channels: [
    {
      id: "specifiers", name: "Architects and lighting designers", short: "Specifiers", owner: "priya", share: 40,
      line: "They write the spec. They don't buy, but they decide what gets bought.",
      howTheyBuy: "Long cycle (6 to 18 months). Spec is written early, the contractor buys late, and that gap is where specs get swapped.",
      worth: "About 40% of revenue, highest margin.",
      askFirst: "Who buys the fittings?",
      alsoAt: [{ ref: "electricians:sitelead", why: "Buys the fittings on most specified jobs. Get to them before it prices." }],
      roles: [
        { id: "architect", name: "Project architect", seat: "Writes the spec", cares: ["design", "spec-support", "risk"],
          line: "Wants the design intent to survive to site and no surprises late in the job.",
          summary: "Draws the project and writes the fittings schedule. If we're not in their spec, we're not in the job.",
          titles: ["Project architect", "Associate", "Senior architect", "Director (smaller practices)"],
          resp: "Owns the design from concept to handover, including the fittings schedule the contractor prices from.",
          goals: ["The finished building looks like the drawings", "Data sheets and install guides they can trust, without chasing", "A supplier who calls them first when someone suggests a substitute"],
          pains: ["Specs swapped for a cheaper fitting at quote stage, often without being told", "Fittings landing 14 weeks late and holding up the programme", "Reps who bring a brochure when they asked for a data sheet"],
          drivers: ["Will it still be the fitting I drew when the client walks in?", "Can I get technical answers fast?", "Does the supplier have a track record on projects like this?"],
          quote: "I don't need another catalogue. I need to know that what I specify is what gets installed.",
          hook: "Lead with following the spec all the way to site. Show the spec-protection checklist and say we call the architect first, not the contractor.",
          look: { bg: "#E3ECF4", skin: "#C68B65", hair: "bob", hc: "#2B2523", top: "#1F2A36", acc: "glasses" } },
        { id: "lightdesigner", name: "Lighting designer", seat: "Shapes the spec", cares: ["design", "custom", "spec-support"],
          line: "Wants technical data, sample units and options other suppliers can't do.",
          summary: "Brought in on bigger or trickier jobs to design the light itself. Knows beam angles better than we do.",
          titles: ["Lighting designer", "Lighting consultant", "Electrical and lighting engineer"],
          resp: "Designs the lighting scheme and picks fittings by performance: beam, glare, colour temperature, dimming.",
          goals: ["Full photometric data, first time", "Sample units in hand before they commit", "Custom options (finish, colour temperature, length) without a 12-week wait"],
          pains: ["Suppliers who can't answer a technical question without 'getting back to you'", "No samples available, or nobody knows if there are any", "Fittings swapped for ones with the wrong beam or CRI"],
          drivers: ["Does the data hold up?", "Can I see and test a sample?", "Can they do the custom bit I need?"],
          quote: "Send me the IES file and a sample. If both are good, you're in.",
          hook: "Lead with custom finishes and colour temperature in 10 working days, and put them straight through to Lighting Design for the technical questions.",
          look: { bg: "#ECE8F7", skin: "#8D5A3B", hair: "curly", hc: "#1B1716", top: "#4A5D70", acc: "" } },
        { id: "interior", name: "Interior designer", seat: "Picks the look", cares: ["design", "custom", "speed"],
          line: "Wants finishes that match the scheme, and quick samples.",
          summary: "Owns how the space feels. Chooses the decorative pieces and makes sure every finish fits the scheme.",
          titles: ["Interior designer", "Interior architect", "Stylist (residential)"],
          resp: "Chooses the decorative fittings and finishes, and presents them to the homeowner or venue owner.",
          goals: ["Finishes matched to their colour scheme", "Samples fast enough for the client presentation", "Pieces that look like the photos"],
          pains: ["A colour that's 'close enough'", "Waiting weeks for a sample", "Feature lights that look great but nobody planned the rest of the room"],
          drivers: ["Will it match?", "Can I show my client by Friday?", "Will the whole room work, not just the pendant?"],
          quote: "My client picked a colour from a cushion. Can you match that?",
          hook: "Lead with any powder-coat colour, matched to their sample and finished here in Tauranga. Offer a lighting plan for the rest of the room.",
          look: { bg: "#F4E4DE", skin: "#F1C7A6", hair: "bun", hc: "#B5763C", top: "#C9765B", acc: "earrings" } }
      ],
      objections: [
        { q: "We always use a European spec house.", a: "Keep them for the hero pieces. Use us where lead time or finish is the risk; we can match a finish in 10 days." },
        { q: "The contractor will just swap it anyway.", a: "That's why we follow the spec to the contractor before quote. Show them the spec-protection checklist." }
      ]
    },
    {
      id: "electricians", name: "Electrical contractors", short: "Electricians", owner: "jase", share: 25,
      line: "They install and often choose the product on smaller jobs. Time on site is money.",
      howTheyBuy: "Short cycle, often same week. Buy through their wholesaler or direct on a trade account.",
      worth: "About 25% of revenue.",
      askFirst: "Who chose the fittings: the client, the architect or you?",
      alsoAt: [{ ref: "specifiers:architect", why: "On spec jobs the architect has already chosen. Ask who it is." }],
      roles: [
        { id: "owner", name: "Contractor business owner", seat: "Signs off the buy", cares: ["margin", "reliability", "availability"],
          line: "Wants fewer call-backs and a supplier who doesn't let them down.",
          summary: "Runs a crew of two to twenty. Every call-back and every wasted trip comes out of their margin.",
          titles: ["Director", "Owner", "Managing electrician", "Contracts manager"],
          resp: "Wins the work, prices the bigger jobs, opens trade accounts and decides who they buy from.",
          goals: ["Jobs that finish on time and stay finished", "Better-margin design jobs, not just price work", "A rep who answers the phone"],
          pains: ["Call-backs for faulty fittings", "Stock that isn't there on the day", "Finding out the client changed the fittings after it was priced"],
          drivers: ["Will it cost me a call-back?", "Is it on the shelf?", "Will this help me win better jobs?"],
          quote: "Cheap fittings aren't cheap if I'm going back three times.",
          hook: "Lead with tested in Tauranga and a warranty handled by people they can call. Then the lighting plan as a way to win the design jobs.",
          look: { bg: "#E7F0E3", skin: "#E0AC85", hair: "short", hc: "#6B4A33", top: "#2E5D45", acc: "beard" } },
        { id: "sitelead", name: "Site lead or estimator", seat: "Prices it and puts it in", cares: ["availability", "speed", "spec-support"],
          line: "Wants the right stock on site on the right day, and answers fast.",
          summary: "On site at 7am with the install guide in one hand. Prices the electrical package on spec jobs.",
          titles: ["Leading hand", "Site supervisor", "Estimator", "Electrician"],
          resp: "Prices the electrical package, orders the fittings and gets them installed and working.",
          goals: ["The right fittings delivered to site the day before", "An install guide that makes sense", "Someone to ring when a dimmer won't play nicely"],
          pains: ["Deliveries addressed to the architect, who isn't on site", "Trimless fittings with no guide", "Waiting on a callback while the crew stands around"],
          drivers: ["Is it in stock right now?", "Can I install it without a headache?", "Who do I call if it doesn't work?"],
          quote: "Just tell me it'll be on site Tuesday and that someone picks up the phone.",
          hook: "Lead with live stock on the trade portal and install help by phone from Lighting Design. Bring the install guide, not the brochure.",
          look: { bg: "#FBF0C9", skin: "#A86F4C", hair: "cap", hc: "#2A3847", top: "#E9A23B", acc: "hivis" } }
      ],
      objections: [
        { q: "It's dearer than what I get from the wholesaler's own brand.", a: "Price the call-backs too. Our fittings come tested in Tauranga, and warranty is handled locally." },
        { q: "I've never heard of you.", a: "Ask which architects they work with; there's a fair chance we're already on their specs." }
      ]
    },
    {
      id: "partners", name: "Wholesalers and big box retailers", short: "Retail partners", owner: "nadia", share: 25,
      line: "They carry our core range. Volume, range reviews and margin.",
      howTheyBuy: "Annual range reviews, then repeat orders. Big box negotiates hard on price and promotion.",
      worth: "About 25% of revenue, lowest margin.",
      askFirst: "What's moving, and what isn't?",
      alsoAt: [{ ref: "electricians:sitelead", why: "Buys over the counter at the branches." }],
      roles: [
        { id: "buyer", name: "Category buyer", seat: "Decides the range", cares: ["margin", "price-trust", "reliability"],
          line: "Wants margin, sell-through and a supplier who delivers on time.",
          summary: "Sits at head office and decides once a year which products every branch or store carries.",
          titles: ["Category buyer", "Category manager", "Merchandise manager"],
          resp: "Runs the annual range review, sets the net price and promotions, and holds suppliers to delivery.",
          goals: ["Margin and sell-through across the category", "A supplier who delivers in full, on time", "No price clash with the supplier's own channels"],
          pains: ["Suppliers who undercut them online", "Short shipments before a promotion", "Too many SKUs that don't move"],
          drivers: ["Will it sell, and at what margin?", "Will they deliver?", "Am I competing with them?"],
          quote: "Show me the sell-through, and promise me I won't see it cheaper on your website.",
          hook: "Lead with the channel price rules: online is full retail and big box carries its own core range, so we never undercut them.",
          look: { bg: "#E3ECF4", skin: "#F3D2B8", hair: "side", hc: "#8E8E8E", top: "#4A5D70", acc: "glasses" } },
        { id: "branch", name: "Branch manager", seat: "Keeps it on the shelf", cares: ["availability", "margin", "speed"],
          line: "Wants stock that moves and a rep who helps their counter staff.",
          summary: "Runs one wholesaler branch. Knows every sparky who walks in, and what they ask for.",
          titles: ["Branch manager", "Store manager", "Trade centre manager"],
          resp: "Keeps the right stock on the shelf, looks after the local electricians and trains the counter team.",
          goals: ["Stock that turns", "Counter staff who can answer questions without ringing someone", "Fast answers on pricing for a job"],
          pains: ["Counter staff come and go, so training never sticks", "Pricing requests that disappear into a phone call", "Displays nobody updates"],
          drivers: ["Does it move?", "Does the rep actually turn up and help?", "Can my counter sell it without me?"],
          quote: "If my counter can't explain it in thirty seconds, it sits on the shelf.",
          hook: "Lead with the counter one-pager and a 15-minute counter training. Then live stock on the trade portal.",
          look: { bg: "#F0EAE0", skin: "#6F4630", hair: "short", hc: "#141110", top: "#8A6A12", acc: "lanyard" } }
      ],
      objections: [
        { q: "You sell the same thing online cheaper.", a: "We don't. Online is full retail and big box has its own core range. Show the channel price sheet." },
        { q: "We need a bigger promotional discount.", a: "Offer support instead of margin: counter training, display stock and a lighting-plan referral line." }
      ]
    },
    {
      id: "online", name: "Online renovators", short: "Online", owner: "hana", share: 10,
      line: "Homeowners renovating, buying at full retail on our website.",
      howTheyBuy: "Research for weeks, buy in a day. Want help choosing and confidence it'll look right.",
      worth: "About 10% of revenue, growing.",
      askFirst: "Who's installing it?",
      alsoAt: [{ ref: "electricians:sitelead", why: "Their electrician installs it, and often has an opinion." }],
      roles: [
        { id: "homeowner", name: "Renovating homeowner", seat: "Chooses and pays", cares: ["design", "warranty", "spec-support"],
          line: "Wants it to look like the photos and to know their electrician can install it.",
          summary: "Renovating or building their own home. Has saved forty photos and is nervous about getting it wrong.",
          titles: ["Homeowner", "Owner-builder", "Renovator"],
          resp: "Chooses the fittings for their own home, pays for them, and passes them to their electrician.",
          goals: ["It looks like the photo in their head", "Confidence it'll work with their electrician", "Help choosing, without being sold to"],
          pains: ["Ordering 4000K for the living room and hating it", "Not knowing how many fittings a room needs", "Fittings that arrive and the electrician won't install"],
          drivers: ["Will it look right in my house?", "Can my electrician install it?", "What happens if something goes wrong?"],
          quote: "I just want someone to tell me if it'll look right before I spend the money.",
          hook: "Lead with the free lighting plan on orders over $1,500. Explain colour temperature in plain words, and that every fitting is tested here.",
          look: { bg: "#E7F0E3", skin: "#EFC09C", hair: "long", hc: "#5A3A22", top: "#7FA88B", acc: "" } }
      ],
      objections: [
        { q: "I can get something similar cheaper at a big box store.", a: "Similar look, different life. Explain the warranty, the tested fittings and the free lighting plan." }
      ]
    }
  ],

  // Shown on Who We Serve until Halflight decides (kick-off notes, "Things to watch")
  serveConfirm: "Nadia talks about \"the trade\" meaning electricians and wholesalers together; Priya keeps them separate. Shown separately here until they decide.",

  // Grouped the way Halflight already groups what it sells: the website menu and the price list (Nadia, kick-off).
  // Any number of groups, each with the website's own sub-groups. "sold" = which customer types buy it (links to Who We Serve).
  products: {
    note: "Not the full catalogue. The full range, prices and stock live on the Halflight website and trade portal; the hub links there.",
    source: "Same four groups as our website menu and price list.",
    shop: "halflight.example",
    categories: [
      // "art" picks the line drawing used for each product (see ART in hub.js)
      { name: "Indoor", line: "Pendants, wall lights and lamps for homes and hospitality.", range: "$190 to $1,450 retail", sold: ["specifiers", "online", "partners"], groups: [
        { name: "Pendants", items: [
          { n: "Drift pendant", art: "dome", d: "Spun aluminium dome. Five standard finishes or your own colour." },
          { n: "Shoal cluster pendant", art: "cluster", d: "Three to nine hand-blown glass globes on one canopy." },
          { n: "Linen drum pendant", art: "drum", d: "Large fabric drum, custom sizes." } ] },
        { name: "Wall lights", items: [ { n: "Moor wall light", art: "wall", d: "Adjustable arm, dimmable." } ] },
        { name: "Table and floor lamps", items: [ { n: "Cove table lamp", art: "table", d: "Linen shade, timber base." }, { n: "Ember floor lamp", art: "floor", d: "Arched reading lamp." } ] } ] },
      { name: "Outdoor", line: "Tested for NZ coastal conditions.", range: "$120 to $680 retail", sold: ["specifiers", "electricians", "online", "partners"], groups: [
        { name: "Bollards and path lights", items: [ { n: "Jetty bollard", art: "bollard", d: "Marine-grade, 650mm. Made for salt air." }, { n: "Reef path light", art: "path", d: "Soft downward glow." } ] },
        { name: "Wall lights", items: [ { n: "Groyne up-down wall light", art: "updown", d: "Twin beam facade light." }, { n: "Wharf bulkhead", art: "bulkhead", d: "Tough, coastal rated." } ] },
        { name: "Spike and step lights", items: [ { n: "Tide step light", art: "step", d: "Recessed, low glare." }, { n: "Dune spike spotlight", art: "spike", d: "For gardens and trees." } ] } ] },
      { name: "Architectural", line: "Specified systems for architects and lighting designers.", range: "$85 to $420 per unit, trade", sold: ["specifiers", "electricians"], notFor: "Big box never gets the Architectural range (channel price rules).", groups: [
        { name: "Downlights", items: [ { n: "Orbit 75 downlight", art: "downlight", d: "75mm cut-out with warm dimming. Our best seller to electricians." }, { n: "Arc trimless downlight", art: "trimless", d: "Plaster-in, no visible trim. Architects love it, installers need the guide." } ] },
        { name: "Linear and strip", items: [ { n: "Line 24 linear profile", art: "linear", d: "Continuous profile, cut to any length in our warehouse." }, { n: "Strata LED strip system", art: "strip", d: "Custom colour temperature." } ] },
        { name: "Track", items: [ { n: "Pivot track spot", art: "track", d: "Three beam angles." } ] },
        { name: "Wall washers", items: [ { n: "Slot wall washer", art: "washer", d: "Even light on feature walls." } ] } ] },
      { name: "What we add", tag: "Services", line: "The value we add here in Tauranga. Some people still call this group Services.", range: "Lighting plans free; finishes from $45 per fitting", sold: ["specifiers", "electricians", "online"], groups: [
        { name: "", items: [
          { n: "Free lighting plans", art: "plan", d: "A layout showing which fitting goes where, with dimming and colour temperature. Free on specified projects and online orders over $1,500.", by: "design" },
          { n: "Custom finishes in 10 working days", art: "finish", d: "Any powder-coat colour on most of the range, matched to your sample or a colour code. From $45 per fitting.", by: "warehouse" },
          { n: "Smart-dimming upgrades", art: "dimmer", d: "App and scene control on most dimmable fittings.", by: "warehouse" },
          { n: "Tested before it leaves us", art: "test", d: "An electrical safety test in Tauranga on every fitting, and a test record we keep on file. That record backs the warranty.", by: "warehouse" } ] } ] }
    ]
  },

  // Competitor cards use the same fixed fields for every company. The admin switches fields on or off ("on"),
  // "top" fields are the three points shown first, the rest fold away. An empty field shows "Not known", never a guess.
  rivalFields: [
    { k: "strong", label: "Where they're strong", on: true, top: true },
    { k: "stronger", label: "Where we're stronger", on: true, top: true },
    { k: "dontSay", label: "What not to say", on: true, top: true },
    { k: "pitch", label: "What they'll pitch", on: true },
    { k: "lose", label: "When we tend to lose", on: true },
    { k: "beatWith", label: "Lead with", on: true },
    { k: "questions", label: "Questions that bring out the difference", on: true },
    { k: "based", label: "Where they're based", on: true },
    { k: "price", label: "How they price", on: true },
    { k: "size", label: "How big they are", on: false }
  ],

  competitors: [
    {
      id: "vantelle", name: "Vantelle Lighting", tier: "Premium spec house", owner: "priya", reviewed: "2026-09-02",
      web: "vantelle.example", based: "Auckland, with a Wellington showroom", price: "Premium list price. Rarely discounts.", size: "",
      who: "Long-established Auckland importer of top European brands. We meet them on high-end residential and hospitality specs.",
      pitch: "Exclusive European brands, decades of supplier relationships, beautiful showrooms.",
      strong: "Brand prestige and exclusive ranges architects love.",
      stronger: "Lead time, custom finishes, and following the spec to site.",
      lose: "Hero pieces on high-budget jobs where the brand name is part of the design story.",
      beatWith: ["local", "spec", "backup"],
      questions: ["What happens to the programme if the fittings land 14 weeks late?", "Who protects the spec when the contractor prices it?"],
      proofPick: "spec",
      dontSay: "Never call them overpriced. Their product is excellent; talk about lead time and support."
    },
    {
      id: "corvane", name: "Corvane Specification", tier: "Offshore-owned spec consultants", owner: "priya", reviewed: "2026-08-20",
      web: "corvane.example", based: "Sydney head office, NZ offices in Auckland and Christchurch", price: "", size: "",
      who: "Australian-owned specification consultancy with two NZ offices. We meet them on boutique commercial projects.",
      pitch: "Specialist specification consultants and the scale of a trans-Tasman business.",
      strong: "Deep technical consulting and big project references.",
      stronger: "Decisions and stock in NZ, and a range for every channel.",
      lose: "Larger commercial projects with an Australian head contractor.",
      beatWith: ["stock", "spec", "local"],
      questions: ["Where is the stock held, and who decides on a substitution?", "How quickly can you get a sample in hand?"],
      proofPick: "stock",
      dontSay: "Don't make it about Australia versus NZ. Talk about speed and stock."
    },
    {
      id: "ardenwick", name: "Ardenwick Studio", tier: "Design-led decorative brand", owner: "hana", reviewed: "2026-09-15",
      web: "ardenwick.example", based: "", price: "Retail, with seasonal online sales.", size: "",
      who: "Online-first decorative lighting brand with a strong social following. We meet them with renovators and interior designers.",
      pitch: "Locally designed, beautiful pendants, great brand story.",
      strong: "Brand, styling and social media.",
      stronger: "Technical depth, outdoor and architectural range, and trade support.",
      lose: "Pure decorative choices driven by an Instagram look.",
      beatWith: ["spec", "backup", "local"],
      questions: ["Has the whole room been planned, or just the feature light?", "Who will the electrician call if something's not right?"],
      proofPick: "backup",
      dontSay: "Don't knock their design. Position us as the whole-home plan around the feature piece."
    },
    {
      id: "brightmarsh", name: "Brightmarsh Trade Lighting", tier: "Trade importer", owner: "jase", reviewed: "2026-07-30",
      web: "brightmarsh.example", based: "Auckland, with a South Island warehouse", price: "Trade price lists through their stockists.", size: "Hundreds of stockists nationwide",
      who: "Large NZ trade importer with hundreds of stockists. We meet them in every electrician conversation.",
      pitch: "Widest LED range, everywhere, every day.",
      strong: "Distribution reach and range depth on functional lighting.",
      stronger: "Design-led product, lighting plans and spec support.",
      lose: "Price-driven jobs where the client didn't choose the fittings.",
      beatWith: ["spec", "local", "stock"],
      questions: ["Did the client or the architect choose these fittings?", "Would a lighting plan help win the job?"],
      proofPick: "spec",
      dontSay: "Don't attack their quality. They're solid; we're different."
    },
    {
      id: "pennock", name: "Pennock Lighting", tier: "Value trade brand", owner: "mere", reviewed: "2026-06-12",
      web: "pennock.example", based: "Hamilton", price: "Low trade price, plus loyalty points for contractors.", size: "",
      who: "Trade importer selling through independent wholesalers, with a loyalty scheme for contractors.",
      pitch: "Quality at a good price, plus rewards for loyal contractors.",
      strong: "Price and the loyalty scheme.",
      stronger: "Design, local finishes and a lighting plan that helps contractors win better jobs.",
      lose: "Loyal contractors on volume, price-led work.",
      beatWith: ["spec", "backup", "pricing"],
      questions: ["What would a better-margin design job be worth to you this year?", "How do you handle call-backs today?"],
      proofPick: "backup",
      dontSay: "Never ask a contractor to drop their loyalty scheme. Win the design jobs alongside it."
    },
    {
      id: "brightbarn", name: "Brightbarn Lighting Warehouse", tier: "Big box chain", owner: "nadia", reviewed: "2026-08-05",
      web: "brightbarn.example", based: "Auckland", price: "Low shelf price, frequent promotions.", size: "",
      who: "National chain of lighting stores with low prices. We meet them with homeowners and sometimes on small builds.",
      pitch: "Low prices from buying direct, and lots of stores.",
      strong: "Price, convenience and a free home lighting review.",
      stronger: "Design-led range, tested fittings and spec-grade support.",
      lose: "Budget-first homeowners.",
      beatWith: ["backup", "spec", "local"],
      questions: ["How long do you want these fittings to last?", "Would a free lighting plan for the whole house help?"],
      proofPick: "backup",
      dontSay: "Don't call their product cheap. Talk about what you get, not what they lack."
    }
  ],

  // What buyers care about, scored 1 (weak) to 5 (strong). Our own scores included, honestly.
  compareGrid: {
    by: "The team's view (Nadia, Priya and Jase), not measured", reviewed: "2026-09-15",
    criteria: ["Design range", "Lead time", "Spec support", "Trade availability", "Price", "Local after-sales"],
    rows: [
      { id: "halflight", name: "Halflight", scores: [4, 5, 5, 4, 3, 5] },
      { id: "vantelle", scores: [5, 2, 4, 1, 1, 3] },
      { id: "corvane", scores: [4, 2, 5, 2, 2, 2] },
      { id: "ardenwick", scores: [4, 4, 1, 2, 3, 2] },
      { id: "brightmarsh", scores: [2, 4, 2, 5, 4, 3] },
      { id: "pennock", scores: [2, 4, 1, 4, 5, 3] },
      { id: "brightbarn", scores: [2, 5, 1, 1, 5, 2] }
    ]
  },

  stages: [
    { id: "s1", name: "Enquiry in", goal: "Respond within 2 working hours and log it.", questions: ["What's the project, and where is it at?", "Who else is involved (architect, builder, electrician)?"] },
    { id: "s2", name: "Discovery", goal: "Understand the project, the decision-makers and the budget.", questions: ["What should the space feel like?", "Who signs off the fittings, and who buys them?", "What's the timeline to install?"] },
    { id: "s3", name: "Lighting plan", goal: "Deliver a plan within 48 hours that makes the spec easy.", questions: ["Any fittings already chosen that we should design around?", "Dimming or smart controls wanted?"] },
    { id: "s4", name: "Specification", goal: "Get our fittings written into the spec, with the contractor known.", questions: ["Who is pricing the electrical package?", "Can we brief the contractor before it goes to quote?"] },
    { id: "s5", name: "Quote", goal: "Quote the spec as written, with alternates clearly labelled.", questions: ["Is there a budget gap we should help close?", "When is the decision being made?"] },
    { id: "s6", name: "Follow-up", goal: "Keep the spec alive until the order is placed.", questions: ["Has anything changed since the quote?", "Is anyone suggesting a substitute?"] }
  ],

  projectTypes: [
    { id: "res", name: "High-end residential", point: "Lead with the whole-home lighting plan and finishes matched to the scheme." },
    { id: "hosp", name: "Hospitality", point: "Lead with dimming scenes and fast replacement stock for busy venues." },
    { id: "retail", name: "Boutique retail", point: "Lead with track and display lighting that makes product look its best." },
    { id: "office", name: "Small office", point: "Lead with comfortable, efficient light and the five-year warranty." }
  ],

  // How We Work: a hub within the hub. The client's journey is the spine along the bottom; each team's lane sits above it.
  // Lanes and stages come from the department questionnaires (source/03-questionnaires), in staff words.
  // The journey stage names are Claude's reading of the source, for Mariah to react to.
  work: {
    journey: [
      { id: "find", name: "Finds us", line: "Sees our work, our website or a counter display." },
      { id: "ask", name: "Gets in touch", line: "Rings, emails, fills in the web form or asks at the counter." },
      { id: "plan", name: "Plans the lighting", line: "Works out what goes where, with our help." },
      { id: "decide", name: "Gets a price and decides", line: "Weighs up the quote, often against a cheaper swap." },
      { id: "order", name: "Orders and waits", line: "Wants a date they can trust, and to hear if it changes." },
      { id: "site", name: "Installs on site", line: "The right fittings, on site, on the day." },
      { id: "after", name: "Lives with it", line: "Back-up if something's wrong, and a project worth showing." }
    ],
    lanes: ["marketing", "sales", "ops", "accounts", "aftersales"],
    // Where one team hands work to another. Numbered on the map.
    handovers: [
      { from: "marketing:found", to: "sales:enquiry", t: "Website enquiries and lighting plan requests land in the shared inbox for Customer Service." },
      { from: "sales:won", to: "ops:supplier", t: "The order, with every line marked in stock, custom or import, on the order and in the ops channel." },
      { from: "ops:install", to: "aftersales:register", t: "Fittings installed: the warranty gets registered." },
      { from: "ops:install", to: "marketing:case", t: "A finished project, for a case study." }
    ],
    // Work that keeps the business running but isn't on the client's journey. Ones with a flow open like a lane.
    behind: [
      { id: "monthend", name: "Month-end and reporting", owner: "sam", line: "Closing the month and the leadership pack." },
      { id: "pricing", name: "Pricing", owner: "sam", line: "New product prices and the annual price review." },
      { id: "reorder", name: "Core range reorder", owner: "arjun", line: "Monthly, in the first week. Tui flags anything running low." },
      { id: "stocktake", name: "Stocktake", owner: "tui", line: "Quarterly." },
      { id: "rangereview", name: "Range reviews with retail partners", owner: "nadia", line: "Nadia does the head office side; Mere works with the branch managers." },
      { id: "payroll", name: "Payroll", owner: "sam", line: "Fortnightly." },
      { id: "starters", name: "New starters", owner: "sam", line: "Contracts, systems access and the first-week plan." }
    ]
  },

  // One flow per lane (and per mapped "behind the scenes" process). Each stage holds everything about it:
  // done when, time standard, handover, our promise, what to say, the battlecard stage ("card"), and its tasks.
  // Task: who, system, time, and its steps; "file" on a step is the resource for that exact step.
  // "ch" limits a task to some sales channels (no "ch" means every channel). "gap" points at an item in gaps below.
  flows: {
    marketing: {
      name: "Marketing", short: "Marketing", icon: "mega", owner: "hana", reviewed: "2026-09-12",
      line: "Getting found, keeping the website right, and turning finished jobs into proof.",
      stages: [
        { id: "found", name: "Getting found", j: "find", who: ["marketing", "md"], line: "Social, the newsletter and two big campaigns a year.",
          done: "Three posts a week, the newsletter out each month, campaigns on the calendar.", handover: "Bookings for CPD sessions from the newsletter go to Specification.",
          tasks: [
            { t: "Post on social", by: ["marketing"], sys: "Social", time: "3 a week", steps: [{ t: "Finished projects and new products first" }, { t: "Every photo needs permission" }] },
            { t: "Send the newsletter to architects and designers", by: ["marketing"], sys: "Email tool", time: "Monthly", steps: [{ t: "Send from the email tool; the list lives there" }, { t: "CPD bookings that come back go to Specification" }] },
            { t: "Run the campaigns", by: ["marketing"], sys: "Campaign calendar", time: "Twice a year", steps: [{ t: "\"Outdoor ready\" in September" }, { t: "The architect CPD push in February" }] }
          ] },
        { id: "web", name: "Website and shop", j: "find", who: ["marketing"], line: "Products, prices, stock flags and the downloads page, kept right.",
          done: "Every product has a page, a price, a data sheet and an install guide.", standard: "About 2 hours per new product.",
          tasks: [
            { t: "Add a new product", by: ["marketing"], sys: "Website and shop", time: "About 2 hours",
              steps: [{ t: "Get the supplier's data sheet from Purchasing and rewrite it" }, { t: "Photos" }, { t: "Get the price from the GM" }, { t: "Add it to the shop and the downloads page", file: "r-downloads" }] },
            { t: "Keep prices and stock flags up to date", by: ["marketing"], sys: "Website and shop", time: "As they change", gap: "webprice",
              steps: [{ t: "Price changes from the GM" }, { t: "Stock flags from the trade portal" }] }
          ] },
        { id: "case", name: "Case studies", j: "after", who: ["marketing"], line: "A finished project, written up as proof for the next spec.",
          done: "It's on the website, in the newsletter and on social, with photo permission signed.", standard: "Half a day to write, weeks to get photos.",
          say: { by: "hana", t: "Every photo needs permission. Every one." },
          tasks: [
            { t: "Write a case study", by: ["marketing"], sys: "Case study template", time: "Half a day", gap: "finished",
              steps: [{ t: "Lighting Design or Specification says the project's finished" }, { t: "Ask the client for photos, or book a photographer ($600 a shoot, the MD approves)" }, { t: "Photo permission form signed for every photo" }, { t: "Write it up: the brief, the fittings, one quote from the architect", file: "r-casestudy" }, { t: "Website, newsletter and social" }] }
          ] }
      ]
    },

    sales: {
      name: "Sales process", short: "Sales", icon: "chat", owner: "priya", reviewed: "2026-09-20",
      line: "From the first enquiry to a confirmed order, across all four channels.",
      stages: [
        { id: "enquiry", name: "Enquiry in", j: "ask", who: ["cs"], line: "Every enquiry answered, logged and passed to the right person.", card: "s1",
          done: "It's in the CRM with the channel, project, next step and who it's going to.", standard: "Answered within 2 working hours. Logged the same day.",
          handover: "Architects and designers to Specification. Electricians to the trade rep for their region. Homeowners stay with Customer Service, or go to Lighting Design for a plan.",
          promise: "\"We reply to every enquiry the same day.\" (website)",
          say: { by: "ellie", t: "The big one is who's buying the fittings." },
          tasks: [
            { t: "Answer the enquiry", by: ["cs"], sys: "Phone, shared inbox, web form", time: "Within 2 working hours", gap: "response",
              steps: [{ t: "Answer it by phone or from the shared inbox, never a personal one" }, { t: "Ask the starred questions in section A", file: "r-discovery" }, { t: "Find out who's buying the fittings. It changes everything that follows." }] },
            { t: "Log it in the CRM", by: ["cs"], sys: "CRM", time: "5 min, same day", gap: "counter",
              steps: [{ t: "Channel, project name and contacts" }, { t: "Next step and its date" }, { t: "Who it's going to" }] },
            { t: "Hand it to the right person", by: ["cs"], sys: "CRM", time: "2 min",
              steps: [{ t: "Architects and designers go to Specification" }, { t: "Electricians go to the trade rep for their region (Bay of Plenty, Waikato and Taupō, or Auckland and Northland)" }, { t: "Homeowners stay with Customer Service. Want a plan? Brief Lighting Design.", file: "r-planbrief" }] }
          ] },
        { id: "discovery", name: "Discovery", j: "ask", who: ["spec", "reps"], line: "Understand the project, who decides and who buys.", card: "s2",
          done: "We know the space, who decides, who buys the fittings, and when the electrical package prices.", standard: "30 to 60 minutes. In the CRM the same day.",
          handover: "Need a plan? Brief Lighting Design with the lighting plan brief.",
          say: { by: "priya", t: "Architects are busy. Never waste their time. Bring the data sheet, not the brochure." },
          tasks: [
            { t: "Run the discovery conversation", by: ["spec", "reps"], sys: "CRM", time: "30 to 60 min", ch: ["specifiers", "electricians"],
              steps: [{ t: "Work through the discovery question sheet", file: "r-discovery" }, { t: "Ask who buys the fittings, and when the electrical package prices" }, { t: "Log it in the CRM the same day" }] },
            { t: "Ask for a lighting plan", who: "Whoever owns the relationship", sys: "Lighting plan brief", time: "10 min", ch: ["specifiers", "online"], gap: "plantext",
              steps: [{ t: "Fill in the lighting plan brief", file: "r-planbrief" }, { t: "At the very least: plans, how it should feel, date needed" }] }
          ] },
        { id: "plan", name: "Lighting plan", j: "plan", who: ["design", "spec"], line: "A plan within 48 hours that makes the spec easy.", card: "s3",
          done: "The plan PDF is with whoever owns the relationship, ready to present.", standard: "48 hours. 36 on average last year; big houses take a full day.",
          handover: "Back to whoever asked. Lighting Design doesn't present.",
          promise: "Free lighting plans, usually within two days. Free on specified projects and online orders over $1,500. (website)",
          say: { by: "leo", t: "Most problems come from someone ordering 4000K for a living room." },
          tasks: [
            { t: "Design the lighting plan", by: ["design"], sys: "Lighting design software", time: "48 hours (36 on average)", ch: ["specifiers", "online"], gap: "leoonly",
              steps: [{ t: "Check the brief and the plans", file: "r-planbrief" }, { t: "Work out how the space should feel at night" }, { t: "Lay out every fitting with dimming and colour temperature" }, { t: "Export the PDF and send it to whoever owns the relationship" }] },
            { t: "Present the plan", by: ["spec"], sys: "Meeting or call", ch: ["specifiers", "online"],
              steps: [{ t: "Walk them through it" }, { t: "Note any changes and send them back to Lighting Design" }] }
          ] },
        { id: "spec", name: "Specification", j: "plan", who: ["spec", "reps"], line: "Our fittings written into the spec, with the contractor known.", card: "s4",
          done: "It's in the spec register with the contractor named. TBC means at risk.", standard: "About an hour per project, over a few weeks.",
          handover: "Trade Sales, to get to the contractor before it prices.",
          say: { by: "priya", t: "Learn the difference between beam angle and colour temperature before you meet anyone." },
          tasks: [
            { t: "Send the spec sheet pack", by: ["spec"], sys: "Website downloads", time: "10 min", ch: ["specifiers"],
              steps: [{ t: "Data sheets and install guides for every fitting", file: "r-downloads" }] },
            { t: "Check their fittings schedule", by: ["spec", "design"], sys: "Email", time: "20 min", ch: ["specifiers"],
              steps: [{ t: "Product codes match ours" }, { t: "Colour temperature on every line. 4000K in a living room is the classic mistake." }] },
            { t: "Add it to the spec register", by: ["spec"], sys: "Spec register", time: "15 min", ch: ["specifiers"], gap: "contractor",
              steps: [{ t: "Project, practice, fittings, expected order month", file: "r-specregister" }, { t: "Contractor if known. TBC means at risk." }, { t: "Risk of swap: low, medium or high" }] },
            { t: "Brief the rep", by: ["spec"], sys: "CRM", time: "10 min", ch: ["specifiers"],
              steps: [{ t: "Who the architect is, what's specified, when it prices" }, { t: "The rep then gets to the contractor before it prices", file: "r-protect" }] }
          ] },
        { id: "quote", name: "Quote", j: "decide", who: ["cs", "reps"], line: "Quote the spec as written, alternates labelled.", card: "s5",
          done: "The quote is sent from accounts, and the follow-up date is in the CRM.", standard: "20 to 40 minutes; big spec jobs half a day. Valid 30 days.",
          handover: "Whoever owns the relationship follows up.",
          promise: "Specified fittings quoted exactly as written. Alternates labelled, never swapped in quietly.",
          say: { by: "ellie", t: "Never promise a date you haven't checked." },
          tasks: [
            { t: "Write the quote", by: ["cs"], sys: "Accounts, trade portal", time: "20 to 40 min", ch: ["specifiers", "electricians", "partners"],
              steps: [{ t: "Start from quote template v7, not \"FINAL\"", file: "r-quote" }, { t: "Specified fittings first, exactly as written" }, { t: "Alternates in their own section, never swapped in quietly" }, { t: "Lead time on every line from the trade portal" }, { t: "Send from accounts, then put the follow-up date in the CRM" }] },
            { t: "Get to the contractor before it prices", by: ["reps"], sys: "CRM", time: "About an hour, plus driving", ch: ["specifiers"],
              steps: [{ t: "Find out who is pricing the electrical package" }, { t: "Show them the fittings, install guide and warranty", file: "r-downloads" }, { t: "Make sure they quote what's specified", file: "r-protect" }, { t: "Tell Specification how it went" }] }
          ] },
        { id: "follow", name: "Follow-up", j: "decide", who: ["spec", "reps"], line: "Keep the spec alive until the order is placed.", card: "s6",
          done: "The order is placed, or it's marked lost with a reason.", standard: "3 days, 10 days, and before the decision date.",
          handover: "Won: to Customer Service to turn into an order.",
          tasks: [
            { t: "Follow up at 3 days, 10 days and before the decision date", by: ["spec", "reps"], sys: "CRM reminders", time: "5 min each", ch: ["specifiers", "electricians"],
              steps: [{ t: "Work down the spec-protection checklist", file: "r-protect" }] },
            { t: "Someone suggests a substitute", by: ["spec"], sys: "Phone", time: "Same day", ch: ["specifiers"],
              steps: [{ t: "Call the architect first, not the contractor" }] },
            { t: "Mark it won or lost", by: ["spec"], sys: "Spec register, CRM", time: "5 min", ch: ["specifiers"],
              steps: [{ t: "Update the status in the spec register", file: "r-specregister" }, { t: "If it's lost, give the reason: price, swapped, project stopped or other" }] }
          ] },
        { id: "won", name: "Won", j: "order", who: ["cs", "marketing"], line: "Order confirmed and handed to operations.",
          done: "The order is in accounts, every line is marked, and the customer has their expected date.", standard: "15 minutes.",
          handover: "Imports to Purchasing, custom finishes to the Warehouse, on the order and in the ops channel.",
          tasks: [
            { t: "Turn the yes into an order", by: ["cs"], sys: "Accounts, ops channel", time: "15 min", ch: ["specifiers", "electricians", "partners"],
              steps: [{ t: "Get the confirmation in writing. Email is fine." }, { t: "Convert the quote to an order in accounts" }, { t: "Mark every line in stock, custom or import, and tell Purchasing and the Warehouse" }, { t: "Send the \"order placed\" email with the expected date", file: "r-updates" }] },
            { t: "Check an online order and pass it on", by: ["marketing"], sys: "Website shop", ch: ["online"],
              steps: [{ t: "Check the order" }, { t: "Pass it to Customer Service to process" }] }
          ] }
      ]
    },

    ops: {
      name: "Order to site", short: "Operations", icon: "truck", owner: "arjun", reviewed: "2026-09-28",
      line: "From a confirmed order to fittings on site: ordered right, finished, tested and delivered.",
      stages: [
        { id: "supplier", name: "Supplier order", j: "order", who: ["purchasing"], line: "Import lines ordered right first time, with an ETA for the customer.",
          done: "The supplier has confirmed, and Customer Service has the customer's expected date the same day.", standard: "Orders go on Tuesday unless urgent. About 30 minutes each.",
          handover: "The ETA to Customer Service for the \"order placed\" email.",
          say: { by: "arjun", t: "Always check colour temperature against the spec. Always." },
          tasks: [
            { t: "Run the supplier order checklist", by: ["purchasing"], sys: "Supplier order checklist", time: "5 min",
              steps: [{ t: "Finish matches the order, and the spec register if it's a spec job", file: "r-specregister" }, { t: "Colour temperature matches. Check twice.", file: "r-supplier" }, { t: "Big job (20+ fittings)? Add 5% spares" }, { t: "Driver and dimming type right for the job" }] },
            { t: "Choose the freight", by: ["purchasing"], sys: "Forwarder portal", time: "5 min",
              steps: [{ t: "Sea unless the job date says otherwise" }, { t: "Air is about 4 times the cost and needs the GM's OK" }] },
            { t: "Send the order", by: ["purchasing"], sys: "Supplier portals, email", time: "30 min",
              steps: [{ t: "Group orders by supplier. Tuesday cut-off; urgent? Tell the GM why." }, { t: "Send through the supplier portal (two suppliers still take email only)" }] },
            { t: "Give Customer Service the customer ETA", by: ["purchasing"], sys: "Ops channel", time: "Same day", gap: "eta",
              steps: [{ t: "Ship date + sea time + 5 working days" }, { t: "Customer Service sends the \"order placed\" email with the date", file: "r-updates" }] }
          ] },
        { id: "ship", name: "Shipping and landing", j: "order", who: ["purchasing", "cs"], line: "Track it, keep the customer posted, and know what it really cost.",
          done: "Goods are landed in Tauranga, the Warehouse has the arrival notice, and the landed cost is in accounts.", standard: "Customer told when it ships, the same day anything changes, and when it lands.",
          handover: "Arrival notice to the Warehouse. Landed costs to the GM.",
          promise: "\"We'd rather tell you a fitting is six weeks away than promise it Friday and let you down.\" (website)",
          tasks: [
            { t: "Book the freight", by: ["purchasing"], sys: "Forwarder portal", time: "10 min", steps: [{ t: "Book with the forwarder: sea unless the job's tight" }] },
            { t: "Watch the shipment", by: ["purchasing"], sys: "Forwarder portal", time: "Daily", gap: "delay",
              steps: [{ t: "Tell Customer Service when it ships, if anything changes, and when it lands" }] },
            { t: "Send the customer updates", by: ["cs"], sys: "Shared inbox", time: "5 min each",
              steps: [{ t: "\"Shipped\" when it leaves the supplier", file: "r-updates" }, { t: "Delay notice the same day Purchasing tells you, before the contractor hears it somewhere else", file: "r-updates" }, { t: "On a site programme? Tell the contractor too" }] },
            { t: "Check the customs entry", by: ["purchasing"], sys: "Forwarder portal", time: "10 min", steps: [{ t: "The forwarder does it; Purchasing checks it" }, { t: "Duty is on page 2" }] },
            { t: "Work out the landed cost", by: ["purchasing"], sys: "Landed cost calculator, accounts", time: "About 2 hours a shipment", gap: "landed",
              steps: [{ t: "New tab per shipment, named by the forwarder ref", file: "r-landed" }, { t: "Exchange rate from the day we paid, not the day it landed" }, { t: "Split freight and charges by value (Line 24 by metres)" }, { t: "Landed cost per unit into accounts, then tell the GM" }, { t: "Margin on any line under 40%? Flag it to the GM" }] }
          ] },
        { id: "receive", name: "Receiving", j: "order", who: ["warehouse"], line: "Checked in, counted and in the right place.",
          done: "Counted, damage photographed, put away or in the job bay, and Customer Service knows it's landed.", standard: "Half a day for a container, an hour for a pallet.",
          handover: "\"Landed\" to Customer Service, who sends the landed and ready email.",
          tasks: [
            { t: "Check in the shipment", by: ["warehouse"], sys: "Packing list", time: "1 hour a pallet",
              steps: [{ t: "Arrival notice from Purchasing" }, { t: "Check against the packing list" }, { t: "Count it and check for damage. Photo anything wrong." }, { t: "Put it away, or into the job bay for an order" }, { t: "Tell Customer Service it's landed", file: "r-updates" }] }
          ] },
        { id: "finish", name: "Finish, assemble and test", j: "order", who: ["warehouse"], line: "What we add here: custom finishes, assembly and a test on every fitting.",
          done: "Every fitting is tested, labelled with its batch number and on the test record.", standard: "Custom finishes up to 10 working days. Testing 5 to 10 minutes a fitting.",
          handover: "Ready to go: to Customer Service and dispatch.",
          promise: "\"Your finish, in ten days.\" (website)",
          say: { by: "tui", t: "If it's not on the test record it didn't happen." },
          tasks: [
            { t: "Custom finish", by: ["warehouse"], sys: "Job sheet", time: "Up to 10 working days",
              steps: [{ t: "Job sheet from Customer Service with the colour code" }, { t: "Colours are batched on Mondays and Thursdays" }, { t: "Mask, prep, coat, cure, reassemble" }, { t: "Safety first in the coating booth" }] },
            { t: "Assembly", by: ["warehouse"], sys: "Job sheet", time: "Varies",
              steps: [{ t: "Cut Line 24 to length" }, { t: "Fit drivers and smart-dimming upgrades" }] },
            { t: "Test every fitting", by: ["warehouse"], sys: "Test record (clipboard)", time: "5 to 10 min each", gap: "testrec",
              steps: [{ t: "Insulation and earth test, then a function test", file: "r-compliance" }, { t: "Fail: red tag, back to the bay, tell the Warehouse lead" }, { t: "Label with the batch number and test date" }, { t: "Fill in the test record. Every fitting, every time." }] }
          ] },
        { id: "dispatch", name: "Dispatch and delivery", j: "site", who: ["warehouse", "cs"], line: "On site on the agreed day, with the right person told.",
          done: "Proof of delivery is in the system.", standard: "The site lead is texted the day before.",
          handover: "Delivered: Customer Service chases proof of delivery if it's missing.",
          tasks: [
            { t: "Pick, pack and book the courier", by: ["warehouse"], sys: "Courier booking", time: "Varies", steps: [{ t: "Pick from the order" }, { t: "Pack it" }, { t: "Book the courier" }] },
            { t: "Text the site lead the day before", by: ["warehouse"], sys: "Phone", time: "2 min", gap: "sitecontact",
              steps: [{ t: "The contractor's site lead, not the architect" }, { t: "Their name comes back from the \"landed and ready\" email", file: "r-updates" }] },
            { t: "Get proof of delivery into the system", by: ["warehouse"], sys: "Accounts", time: "5 min", steps: [{ t: "Missing? Customer Service chases it" }] }
          ] },
        { id: "install", name: "Install day", j: "site", who: ["design", "spec"], line: "Help on the day, then close the job off properly.",
          done: "Dimming scenes are set up, and Marketing knows the project is finished.", standard: "1 to 3 hours, on the phone or on site.",
          handover: "Fittings installed: the warranty gets registered. Finished project to Marketing for a case study.",
          tasks: [
            { t: "Help on install day", by: ["design"], sys: "Phone", time: "1 to 3 hours",
              steps: [{ t: "Answer questions like \"will this dimmer work with this driver\"" }, { t: "On site to set up dimming scenes when it's needed" }] },
            { t: "Tell Marketing the project's finished", by: ["design", "spec"], sys: "Email or chat", time: "2 min", gap: "finished",
              steps: [{ t: "Project name and who the architect was" }] }
          ] }
      ]
    },

    accounts: {
      name: "Accounts", short: "Accounts", icon: "coin", owner: "sam", reviewed: "2026-09-01",
      line: "Trade accounts opened, and invoices paid.",
      stages: [
        { id: "trade", name: "New trade account", j: "decide", who: ["gm", "reps"], line: "A new electrician set up to buy on account.",
          done: "The account is open with a credit limit, and the rep has done a range run-through.", standard: "15 minutes to approve.",
          tasks: [
            { t: "Approve the credit", by: ["gm"], sys: "Trade portal", time: "15 min",
              steps: [{ t: "The form comes in from the trade portal" }, { t: "Credit check" }, { t: "Approve with a limit: $5k standard, more needs the MD" }, { t: "Tell the trade rep" }] },
            { t: "Run through the range with them", by: ["reps"], sys: "Trade portal", time: "30 min",
              steps: [{ t: "Show them trade pricing and live stock on the trade portal" }, { t: "The range run-through" }] }
          ] },
        { id: "paid", name: "Getting paid", j: "after", who: ["gm"], line: "Every overdue account gets its next step.",
          done: "Every overdue account has had its next step.", standard: "Statements on the 1st of the month.",
          tasks: [
            { t: "Chase overdue accounts", by: ["gm"], sys: "Accounts", time: "Monthly",
              steps: [{ t: "Statement run on the 1st" }, { t: "Reminder at 7 days overdue" }, { t: "Phone call at 14 days" }, { t: "Stop credit at 30 days (the MD decides on big accounts)" }] }
          ] }
      ]
    },

    aftersales: {
      name: "After-sales and warranty", short: "After-sales", icon: "shield", owner: "ellie", reviewed: "2026-08-01",
      line: "Warranty registered at handover, and claims sorted fast by people you can call.",
      stages: [
        { id: "register", name: "Warranty registration", j: "site", who: ["cs"], line: "Installed fittings registered, so a claim is easy later.",
          done: "The registration is in the warranty inbox.",
          promise: "Five-year warranty on our architectural range, handled by people you can call. (website)",
          tasks: [
            { t: "Register the warranty", who: "The installer or homeowner, online", sys: "halflight.example/warranty", time: "5 min",
              steps: [{ t: "Project or address, fittings and quantities, install date, installer", file: "r-warranty" }] }
          ] },
        { id: "claim", name: "Warranty claim", j: "after", who: ["cs", "warehouse"], line: "Sorted fast, backed by the test record.",
          done: "A replacement is sent, or the fitting is back and tested, and the customer knows the outcome.", standard: "Reply within 1 working day. Sorted in 4 working days on average last year.",
          handover: "The Warehouse's findings back to Customer Service.",
          say: { by: "ellie", t: "Photos to the warranty inbox, NOT your phone." },
          tasks: [
            { t: "Reply to the claim", by: ["cs"], sys: "Warranty inbox", time: "Within 1 working day", gap: "photos",
              steps: [{ t: "Photos of the fitting, the label and the problem, to the warranty inbox", file: "r-warranty" }, { t: "Check it was installed by a registered electrician" }] },
            { t: "Check the test record for that batch", by: ["cs"], sys: "Test records spreadsheet", time: "5 min",
              steps: [{ t: "Find the batch number from the label photo", file: "r-compliance" }] },
            { t: "Replace it, or get it back to test", by: ["cs"], sys: "Accounts", time: "Varies",
              steps: [{ t: "Most claims: send a replacement from stock" }, { t: "Some: ask for the fitting back so the Warehouse can test it" }] },
            { t: "Test the returned fitting", by: ["warehouse"], sys: "Test bay", time: "Varies", gap: "returnpaper",
              steps: [{ t: "Test it and say what's wrong" }, { t: "Findings back to Customer Service" }] }
          ] }
      ]
    },

    monthend: {
      name: "Month-end and reporting", short: "Month-end", icon: "cog", owner: "sam", reviewed: "2026-09-01", behind: true,
      line: "Closing the month and getting the leadership pack to Nadia.",
      stages: [
        { id: "close", name: "Close the month", who: ["gm"], line: "The numbers in, the Scoreboard updated, the pack to the MD.",
          done: "The pack is with the MD by the Monday before the leadership meeting (first Tuesday).", standard: "About a day, over the first week of the month.",
          tasks: [
            { t: "Close the month", by: ["gm"], sys: "Accounts, KPI sheet", time: "About a day",
              steps: [{ t: "Work down the month-end checklist", file: "r-monthend" }, { t: "Bookkeeper: bank recs and payables (Thursday after month end)" }, { t: "Landed costs in for every shipment that landed (chase Purchasing)" }, { t: "Stock adjustments from the Warehouse" }, { t: "Run the management report and the KPI sheet" }, { t: "Overdue accounts list" }, { t: "Update the Scoreboard" }, { t: "Pack to the MD" }] }
          ] }
      ]
    },

    pricing: {
      name: "Pricing", short: "Pricing", icon: "cog", owner: "sam", reviewed: "2026-04-01", behind: true,
      line: "New product prices, and the annual price review.",
      stages: [
        { id: "review", name: "Prices", who: ["gm"], line: "Prices set once, and the same story in every channel.",
          done: "New prices are in accounts, the trade portal and the website.", standard: "Annual review in March. New prices from 1 April.",
          tasks: [
            { t: "Price a new product", by: ["gm"], sys: "Accounts", time: "Varies",
              steps: [{ t: "Landed cost from Purchasing", file: "r-landed" }, { t: "Set the price for each channel", file: "r-pricesheet" }, { t: "Send it to Marketing for the website" }] },
            { t: "Run the annual price review", by: ["gm"], sys: "Accounts", time: "March", gap: "pricesheet",
              steps: [{ t: "Review the channel price rules", file: "r-pricesheet" }, { t: "New prices from 1 April" }] }
          ] }
      ]
    }
  },

  // Gaps found in the mapping: where the source material disagrees, or where things get stuck or depend on one person.
  // Assigning, changing status and adding a gap work on screen only; nothing is saved until the hub has a back end.
  gaps: [
    { id: "response", t: "Three different promises on response time", d: "Ellie says 2 working hours is what they manage. Nadia wants 1 hour. The website says \"same day\".", from: "Ellie's answers, kick-off notes, website", at: "sales:enquiry", owner: "nadia", status: "Open", raised: "2026-09-02" },
    { id: "counter", t: "Counter enquiries don't get logged", d: "Enquiries Mere rings through from wholesaler counters are usually a quick \"can you price this\", and often never reach the CRM.", from: "Mere's and Ellie's answers", at: "sales:enquiry", owner: "", status: "Open", raised: "2026-09-02" },
    { id: "plantext", t: "Plan requests skip the brief", d: "Most plan requests reach Leo by text, so half the information is missing and Priya doesn't know they exist. Leo would like them through one place.", from: "Leo's and Priya's answers", at: "sales:discovery", owner: "priya", status: "Open", raised: "2026-09-02" },
    { id: "leoonly", t: "Only Leo can do lighting plans", d: "Nobody else can use the design software. If Leo's away, there are no plans.", from: "Leo's answers", at: "sales:plan", owner: "", status: "Open", raised: "2026-09-02" },
    { id: "contractor", t: "The contractor column goes stale", d: "When a contractor changes, nobody tells Priya. 21 of 63 live specs had the contractor as TBC on 1 September.", from: "Priya's and Jase's answers, spec register", at: "sales:spec", owner: "priya", status: "In hand", next: "Make \"contractor named\" a required field for specs in the CRM, by 31 Oct 2026.", raised: "2026-09-02" },
    { id: "samples", t: "Nobody owns the sample units", d: "Architects want samples. Priya thinks Hana owns the sample cupboard; Hana thinks Priya does.", from: "Priya's and Hana's answers", at: "sales:spec", owner: "", status: "Open", raised: "2026-09-02" },
    { id: "eta", t: "The ETA sea times are only in Arjun's head", d: "Sea freight times by country are handwritten at the bottom of the checklist. The ETA cheat sheet doesn't exist yet.", from: "Arjun's answers, supplier order checklist", at: "ops:supplier", owner: "arjun", status: "Open", raised: "2026-09-04" },
    { id: "delay", t: "Customers hear about delays from the contractor first", d: "Arjun sees delays on the forwarder portal but doesn't always tell Ellie the same day, so the delay email goes late.", from: "Arjun's and Ellie's answers", at: "ops:ship", owner: "arjun", status: "Open", raised: "2026-09-04" },
    { id: "landed", t: "Only Arjun can do landed costs", d: "When Arjun took two weeks off in May, landed costs just waited.", from: "Arjun's and Sam's answers", at: "ops:ship", owner: "sam", status: "In hand", next: "Train a second person on landed costs, by 15 Dec 2026.", raised: "2026-09-04" },
    { id: "testrec", t: "Test records are typed up a week behind", d: "The test record is on paper, then Sam types it up, sometimes a week later. It's the record that backs the warranty.", from: "Tui's and Sam's answers", at: "ops:finish", owner: "", status: "Open", raised: "2026-09-04" },
    { id: "sitecontact", t: "Site deliveries get the architect's name", d: "Dispatch is given the architect's name, not the contractor's. The architect isn't on site at 7am.", from: "Tui's answers", at: "ops:dispatch", owner: "ellie", status: "Open", raised: "2026-09-04" },
    { id: "finished", t: "Nobody tells Hana when a project finishes", d: "Hana finds out from Instagram, so case studies get missed.", from: "Hana's answers", at: "ops:install", owner: "", status: "Open", raised: "2026-09-04" },
    { id: "photos", t: "Warranty photos end up on personal phones", d: "Customers text photos to whoever they know, often Jase, and they get forwarded when someone remembers.", from: "Ellie's and Jase's answers", at: "aftersales:claim", owner: "ellie", status: "Open", raised: "2026-09-04" },
    { id: "returnpaper", t: "Returned fittings arrive with no paperwork", d: "Tui doesn't know whose claim a returned fitting belongs to.", from: "Tui's answers", at: "aftersales:claim", owner: "", status: "Open", raised: "2026-09-04" },
    { id: "webprice", t: "Price changes reach the website late", d: "Price changes don't always reach the website the same day.", from: "Hana's answers", at: "marketing:web", owner: "hana", status: "Open", raised: "2026-09-04" },
    { id: "pricesheet", t: "The channel price rules are out of date", d: "Last updated in April, and some of it has changed since (two wholesale branches are now on 38%).", from: "Sam's answers, channel price rules", at: "pricing:review", owner: "sam", status: "Open", raised: "2026-09-01" },
    { id: "cutoff", t: "Supplier orders went out any day", d: "Orders went whenever they came in. A Tuesday cut-off started in September, and Arjun says it's helped a lot.", from: "Arjun's answers", at: "ops:supplier", owner: "arjun", status: "Resolved", raised: "2026-09-04" },
    { id: "delaymail", t: "No template for delay notices", d: "Ellie wrote the delay notice email, added to the shared inbox templates on 15 Sep 2026.", from: "Order update emails", at: "ops:ship", owner: "ellie", status: "Resolved", raised: "2026-09-04" }
  ],

  // Toolbox: the documents Halflight actually uses (source/04-documents), in their own wording. Fictional.
  // folder = where it sits on the shared drive (source/05-links.md). format = what it is (Word, Google Sheet, laminated sheet...).
  // paper = how the preview looks: doc, sheet, laminated, notes, clipboard, email, web.
  // changed / change / by = the last change and who made it (drives "Recently changed"). confirm = a change not in the document yet.
  // doc = the document itself, as blocks: ["h", text], ["p", text], ["meta", text], ["ul"|"ol"|"check", [...]], ["tbl", [head], [[row]]],
  //   ["fields", [...]], ["hand", text], ["sticky", text], ["mail", subject, body]. missing = listed by the company but not made yet.
  resources: [
    { id: "r-discovery", folder: "Spec", format: "Word", paper: "doc", version: "v3", where: "Shared drive > Spec > Discovery questions v3.docx", type: "Question sheet", title: "Discovery question sheet", when: "Every first proper conversation. Customer Service uses section A for new enquiries.", owner: "priya", reviewed: "2026-09-10",
      changed: "2026-09-10", by: "priya", change: "v3: section A marked for Customer Service's new enquiries, and the must-ask questions starred.",
      doc: [["meta", "Use for every first proper conversation. Ellie's team uses section A for new enquiries. You don't have to ask them in order. Do ask the starred ones."],
        ["h", "A. The project"], ["ol", ["What's the project and where is it? *", "Where's it at? (concept / developed design / consented / building)", "Who else is involved? Architect, interior designer, builder, electrician? *", "Who will buy the fittings? *"]],
        ["h", "B. The space"], ["ol", ["How should it feel at night?", "Anything already chosen that we should design around?", "Dimming? Smart control? Scenes?", "Any outdoor or coastal areas?"]],
        ["h", "C. The decision"], ["ol", ["Who signs off the fittings? *", "When is the electrical package going to price? *", "Budget range (ask once, don't push)", "When do they need to be installed?"]],
        ["h", "After the call"], ["ul", ["CRM: channel, project, contacts, next step, date. Same day.", "Need a plan? Lighting plan brief to Leo.", "Specified? Spec register."]]] },
    { id: "r-planbrief", folder: "Spec", format: "Word", paper: "doc", where: "Shared drive > Spec > Lighting plan brief.docx", type: "Form", title: "Lighting plan brief", when: "When asking Leo for a lighting plan.", owner: "leo", reviewed: "2026-08-22",
      changed: "2023-05-15", by: "priya", change: "First made by Priya in 2023. Not changed since.",
      doc: [["fields", ["Project name", "Requested by (who owns the relationship)", "Date needed by (48 hours from now unless agreed)"]],
        ["check", ["Floor plan", "Elevations", "Reflected ceiling plan", "Photo or sketch only"]],
        ["fields", ["Rooms or areas to cover", "How should it feel? (cosy / bright and clean / dramatic / \"like a hotel\")", "Already chosen: fittings we must design around"]],
        ["p", "Dimming: None / Standard / Smart or app / Scenes. Colour temperature: 2700K / 3000K / Mixed / Leo to advise."],
        ["fields", ["Budget guide", "Anything else Leo should know"]],
        ["hand", "If you only fill in three things: plans, feel, date. (Leo, on the back of the printed copy)"]] },
    { id: "r-specregister", folder: "Spec", format: "Google Sheet", paper: "sheet", where: "Shared drive > Spec > Spec register 2026 (Google Sheet)", type: "Register", title: "Spec register", when: "Every time our fittings are written into a spec. Reps update the contractor column.", owner: "priya", reviewed: "2026-09-20",
      changed: "2026-10-13", by: "priya", change: "Weekly update. 63 live projects; 21 still have the contractor as \"TBC\".",
      doc: [["tbl", ["Project", "Practice", "Specifier", "Fittings", "Colour temp", "Contractor", "Rep", "Expected order", "Risk of swap", "Status", "Lost reason"],
          [["Name and suburb", "Architecture or design practice", "Person who wrote us in", "Codes and quantities", "Per fitting", "\"TBC\" means at risk", "Jase or Mere", "Month", "Low / Medium / High", "Specified / Quoted / Ordered / Lost", "Price, swapped, project stopped, other"]]],
        ["meta", "Rows: 63 live projects at 1 September. 21 with contractor \"TBC\"."], ["hand", "Colour temp: check against the schedule!"]] },
    { id: "r-protect", folder: "Spec", format: "Google Sheet", paper: "sheet", where: "Spec register 2026, second tab", type: "Checklist", title: "Spec-protection checklist", when: "Between \"specified\" and \"ordered\". Tick in the sheet, not on paper.", owner: "priya", reviewed: "2026-09-20",
      changed: "2026-09-20", by: "priya", change: "Last line added: call the architect first if anyone suggests a substitute.",
      doc: [["check", ["Contractor named in the register (not TBC)", "Rep has briefed the contractor before it prices", "Contractor has the data sheets and install guide", "Quote sent with specified fittings first, alternates labelled", "Follow-up booked: 3 days, 10 days, before the decision date", "Architect told if anyone suggests a substitute (call them first)"]]] },
    { id: "r-quote", folder: "Customer Service", format: "Word", paper: "doc", version: "v7", where: "Shared drive > Customer Service > Templates > Quote template v7.docx (not \"Quote template FINAL\", that's v5)", type: "Template", title: "Quote template", when: "Every quote. Sent from the accounts system.", owner: "ellie", reviewed: "2026-07-14",
      changed: "2026-07-14", by: "ellie", change: "v7: alternates moved into their own table, with the \"check with your architect\" line.",
      doc: [["sticky", "Delete before sending. Lead time on EVERY line, check the trade portal. Never put an alternate in the main table. Follow-up date into the CRM before you close the quote. (Ellie)"],
        ["p", "Quote no: Q-____   Date: ____   Valid until: (30 days)"], ["fields", ["For: customer name, company", "Project: name and address", "Specified by: practice and person (spec jobs only)"]],
        ["h", "Specified fittings"], ["tbl", ["Code", "Description", "Finish", "Colour temp", "Qty", "Lead time", "Unit", "Total"], []],
        ["h", "Alternates (optional, only if asked or if budget is tight)"], ["meta", "These are not what was specified. Please check with your architect or designer before choosing an alternate."],
        ["tbl", ["Code", "Description", "Replaces", "Qty", "Lead time", "Unit", "Total"], []],
        ["ul", ["Lighting plan: included / not included", "Custom finishes: 10 working days from order", "Warranty: 5 years on Architectural range, 2 years on Indoor and Outdoor"]],
        ["p", "Freight ____  GST ____  Total incl GST ____. Questions? Call Ellie or Josh on 07 000 0000."]] },
    { id: "r-updates", folder: "Customer Service", format: "Email templates", paper: "email", where: "Shared inbox > Templates (copies in Shared drive > Customer Service > Templates)", type: "Email templates", title: "Customer order updates", when: "At each import milestone: placed, shipped, delayed, landed.", owner: "ellie", reviewed: "2026-09-28",
      changed: "2026-09-15", by: "ellie", change: "Delay notice added (an action from the mapping). Send it the same day Arjun tells us.",
      doc: [["mail", "Your Halflight order [order no] is placed", "Thanks for your order. The [fittings] are coming from our supplier and we expect them in Tauranga around [date]. Anything we already hold is ready now. We'll let you know when it ships and again when it lands."],
        ["mail", "Your order [order no] is on its way", "Good news, your fittings left the supplier on [date]. Still on track for around [date]."],
        ["mail", "Update on your order [order no]", "I'm sorry, your [fittings] are running late. The new expected date is [date] because [reason, one line]. [If on a site programme: I've also let [contractor] know.] If this causes a problem on site, call me and we'll look at options from stock."],
        ["hand", "Send the delay notice the same day Arjun tells us. Before the contractor hears it somewhere else."],
        ["mail", "Your order [order no] has arrived", "Your fittings are in Tauranga. [Custom finish: they're with Tui for finishing, ready by [date].] We'll book delivery for [day]. Who should we text on site?"]] },
    { id: "r-warranty", folder: "Website", format: "Web form and PDF", paper: "web", url: "halflight.example/warranty", where: "halflight.example/warranty (PDF copy in Shared drive > Customer Service > Templates)", type: "Form", title: "Warranty registration and claim form", when: "At handover, and when a claim comes in.", owner: "ellie", reviewed: "2026-08-01",
      changed: "2026-08-01", by: "ellie", change: "Reviewed. \"What happens next\" on the back of the PDF now gives last year's average: 4 working days.",
      doc: [["h", "Part 1: Register (at handover)"], ["fields", ["Project or home address", "Fittings installed (codes and quantities)", "Install date", "Installer (company and electrician's name)", "Contact for warranty questions"]],
        ["h", "Part 2: Make a claim"], ["fields", ["Which fitting, and where it's installed", "What's wrong? (not working / flickering / water inside / finish damaged / other)", "When did it start?", "Photos: the fitting, the label (batch number), and the problem", "Installed by a registered electrician? Yes / No"]],
        ["h", "What happens next"], ["ol", ["We reply within 1 working day.", "We check the test record for that batch.", "Most claims: we send a replacement from stock. Some: we ask for the fitting back to test it.", "Average time to sort it out last year: 4 working days."]],
        ["sticky", "Photos to the warranty inbox, NOT your phone. Jase!! (Ellie, inside the folder)"]] },
    { id: "r-pricesheet", folder: "Finance", format: "PDF", paper: "doc", where: "Shared drive > Finance > Pricing > Channel price rules April 2026.pdf", type: "Price rules", title: "Channel price rules", when: "When a customer asks why prices differ between channels.", owner: "sam", reviewed: "2026-04-01",
      changed: "2026-09-01", by: "sam", change: "Sam's note: the wholesale tier is now 38% for two branches on volume.", confirm: "Not in the PDF yet. The PDF still says 40% for every wholesaler (Sam: \"some of it's changed since\").",
      doc: [["tbl", ["Channel", "Price", "Why"], [["Online (homeowners)", "Full retail (RRP)", "We never undercut our trade or specifier customers online"], ["Electricians, trade account", "Trade price (RRP less 30 to 35%)", "Volume tiers on annual spend"], ["Wholesalers", "Wholesale (RRP less 40%)", "They hold stock and sell on"], ["Big box", "Their own core range only, net price agreed at range review", "Different products, so no price clash"], ["Specified projects", "Quoted to the contractor at trade", "The architect never sees price from us"]]],
        ["h", "Rules"], ["ol", ["Never discount online below RRP. Promos are free lighting plans or free finishes, not price.", "Big box never gets the Architectural range.", "Price matching: no. Explain the channel instead.", "Annual price review in March. New prices from 1 April."]],
        ["hand", "Changed since April, not in the PDF yet: wholesale tier now 38% for two branches on volume. (Sam)"]] },
    { id: "r-monthend", folder: "Finance", format: "Word", paper: "doc", where: "Shared drive > Finance > Month end.docx", type: "Checklist", title: "Month-end checklist", when: "The first week of every month.", owner: "sam", reviewed: "2026-09-01",
      changed: "2026-09-01", by: "sam", change: "Step 7 added: Scoreboard updated before the pack goes to Nadia.",
      doc: [["ol", ["Bookkeeper: bank recs, payables (Thursday after month end)", "Landed costs in for every shipment that landed (chase Arjun)", "Stock adjustments from Tui", "Run the management report", "KPI sheet: revenue YTD vs target, GP%, stock turns, on-time delivery, spec-to-order, Google rating", "Overdue accounts list", "Scoreboard updated", "Pack to Nadia by the Monday before the leadership meeting (first Tuesday)"]]] },
    { id: "r-supplier", folder: "Ops", format: "Laminated sheet", paper: "laminated", where: "On the wall above Arjun's desk. Photo in Shared drive > Ops > Checklists", type: "Checklist", title: "Supplier order checklist", when: "Before every supplier order.", owner: "arjun", reviewed: "2026-09-28",
      changed: "2026-09-30", by: "arjun", change: "Tuesday cut-off added (an action from the mapping). Urgent orders: tell Sam why.",
      doc: [["h", "Before you send any supplier order"], ["ol", ["Finish matches the order (and the spec register if it's a spec job)", "COLOUR TEMPERATURE matches. Check twice.", "Quantity right. Big job (20+ fittings)? Add 5% spares.", "Driver / dimming type right for the job", "Freight: sea unless the job date says otherwise. Air needs Sam's OK.", "Tuesday cut-off. Urgent? Tell Sam why.", "Supplier confirmed? Work out customer ETA (ship date + sea time + 5 working days)", "ETA to Ellie the same day"]],
        ["hand", "sea time: EU 6 wks, Asia 3 wks, AU 1 wk ish"]] },
    { id: "r-landed", folder: "Ops", format: "Excel and notes", paper: "notes", where: "Shared drive > Ops > Landed costs > LC calc 2026.xlsx (Arjun's notes saved beside it)", type: "Calculator", title: "Landed cost calculator", when: "When goods land, and when pricing new products. Only Arjun does it today.", owner: "arjun", reviewed: "2026-06-30",
      changed: "2026-06-30", by: "arjun", change: "Arjun's notes written \"for when I'm away\" and saved beside the calculator.",
      doc: [["hand", "how to do LC (for when I'm away!!)"],
        ["ul", ["open LC calc, new tab per shipment, name it by forwarder ref", "supplier invoice total in their currency, exchange rate from the bank on the day we PAID not the day it landed (Sam is very particular about this)", "freight from forwarder invoice", "duty: forwarder's customs entry, it's on page 2", "local charges (port, cartage, docs) also forwarder invoice, sometimes a second invoice a week later, wait for it", "split freight and charges across lines BY VALUE not by qty (except Line 24, split by metres, ask me)", "LC per unit comes out col H", "copy col H into accounts against each product", "tell Sam it's done"]],
        ["hand", "if margin on any line drops under 40% flag it to Sam"]] },
    { id: "r-compliance", folder: "Ops", format: "Clipboard and Excel", paper: "clipboard", where: "Clipboard in the test bay. Typed up weekly in Shared drive > Ops > Test records 2026.xlsx", type: "Record", title: "Compliance test record", when: "Every fitting before dispatch.", owner: "tui", reviewed: "2026-03-15",
      changed: "2026-03-15", by: "tui", change: "New sheet for 2026. Rules reprinted at the top of the clipboard.",
      doc: [["ol", ["Every fitting, every time. No batch sampling.", "Fail = red tag, back to the bay, tell Tui.", "Label shows batch no and test date.", "If it isn't on this sheet it didn't happen. (The warranty depends on it.)"]],
        ["tbl", ["Date", "Order / job", "Product code", "Batch no", "Qty", "Insulation", "Earth", "Function", "Label on", "Tested by"], [["", "", "", "", "", "Pass / Fail", "Pass / Fail / NA", "Pass / Fail", "✓", "initials"]]]] },
    { id: "r-eta", folder: "Ops", missing: true, format: "Not made yet", paper: "doc", where: "Listed in Shared drive > Ops, but it doesn't exist yet (Sam's systems list)", type: "Cheat sheet", title: "ETA cheat sheet", when: "Working out when a customer's order will land.", owner: "arjun", reviewed: "",
      changed: "", by: "", change: "",
      doc: [["meta", "Sam listed this in the Ops folder, then added: \"doesn't exist yet\". The closest thing today is the note at the bottom of Arjun's supplier order checklist."], ["hand", "sea time: EU 6 wks, Asia 3 wks, AU 1 wk ish"], ["p", "Customer ETA = ship date + sea time + 5 working days (supplier order checklist, step 7)."]] },
    { id: "r-counter", folder: "Trade", format: "Laminated PDF", paper: "laminated", where: "Shared drive > Trade > Counter one-pager.pdf. Laminated copies at each wholesaler branch", type: "One-pager", title: "Core range one-pager", when: "Left at wholesaler counters so their staff can answer the basics.", owner: "mere", reviewed: "2026-02-18",
      changed: "2026-02-18", by: "mere", change: "Reprinted and laminated for the branches.",
      doc: [["h", "Five things to know about Halflight"], ["ol", ["Orbit 75 is our best seller. Warm dim, 75mm cut-out, fits most old holes.", "Everything is tested in Tauranga before it leaves. Batch number on the label.", "Stock check: trade portal, live.", "Custom colours in 10 working days. Point them to us.", "Free lighting plans for bigger jobs. Give them Ellie's number: 07 000 0000."]]] },
    { id: "r-casestudy", folder: "Marketing", format: "Word", paper: "doc", where: "Shared drive > Marketing > Case study template.docx", type: "Template", title: "Case study template", when: "Writing up a finished project.", owner: "hana", reviewed: "2026-09-05",
      changed: "2026-09-05", by: "hana", change: "Permission check added to the first line, and \"credit the photographer\".",
      doc: [["fields", ["Project name and suburb (permission form signed? Y/N)", "The brief in one line, in the client's words if possible", "What we did: fittings, finishes, plan, anything custom", "One quote from the architect or owner (approved in writing)", "4 to 8 photos (permission, credit the photographer)", "Where it goes: website, newsletter, social"]]] },
    { id: "r-downloads", folder: "Website", format: "Web page", paper: "web", url: "halflight.example/downloads", where: "halflight.example/downloads", type: "Web page", title: "Data sheets and install guides", when: "When a specifier or contractor needs the technical detail.", owner: "hana", reviewed: "2026-09-05",
      changed: "2026-09-05", by: "hana", change: "Arc trimless plaster-in install guide added.",
      doc: [["p", "A data sheet for every product, and install guides. Kept up to date by Hana when a product changes."], ["ul", ["Data sheets: Indoor, Outdoor, Architectural", "Install guides, including the Arc trimless plaster-in guide (new)", "Warranty registration: halflight.example/warranty"]]] },
    { id: "r-newstarter", folder: "People", format: "Word", paper: "doc", where: "Shared drive > People > New starter checklist.docx", type: "Checklist", title: "New starter checklist", when: "Before day one, and through the first month of any new role.", owner: "sam", reviewed: "2026-05-20",
      changed: "2026-05-20", by: "sam", change: "Reviewed after Josh started. Half a day on the phones with Ellie added for every role.",
      doc: [["h", "Before day one (Sam)"], ["check", ["Contract signed, IRD and KiwiSaver forms in", "Email, CRM, accounts (if needed), shared drive, trade portal logins", "Desk, phone, keys (warehouse alarm code from Tui)"]],
        ["h", "Week one"], ["check", ["Welcome coffee with Nadia", "Walk through the warehouse with Tui (range names, where things live, the coating booth safety talk)", "Read \"Our Story\" and the range pages on the website", "Sit with Ellie on the phones for at least half a day, whatever your role", "Meet everyone. There are only twelve of us."]],
        ["h", "Weeks two to four"], ["check", ["Role-specific training (your manager has the list)", "Sales roles: ride-alongs with Jase or Mere, sit in on Priya's discovery calls, one plan walk-through with Leo", "Ops roles: a full receiving with Tui, a supplier order with Arjun"]],
        ["h", "End of month one"], ["check", ["Catch-up with your manager. What's clear, what isn't."]]] }
  ],

  // Growing Our Team: a learning path for someone new. A path to follow, not a tracker: nothing is ticked off or saved.
  // The first five stops are the same for everyone (Mariah's order); the last stop is your role.
  // "month" is Sam's new starter checklist (source/04-documents/new-starter-checklist.md). "tips" are the questionnaire answers to
  // "What would you want a new starter in your role to know in their first week?" Stage lists come from How We Work (flows), by role.
  pathway: {
    stops: [
      { id: "story", t: "Our story", line: "Where we came from and how we behave. Five minutes." },
      { id: "month", t: "Your first month", line: "What happens when, and who you'll meet." },
      { id: "words", t: "Our words", line: "The words and range names you'll hear on day one." },
      { id: "checklist", t: "The new starter checklist", line: "Sam's checklist, and the logins you'll get." },
      { id: "quiz", t: "Quick quiz", line: "Seven questions on our story and the company." },
      { id: "role", t: "Your role", line: "Who you'll learn from, your part in How We Work, and the tasks you'll do most." }
    ],
    month: [
      { when: "Before day one", by: "sam", items: ["Contract signed, IRD and KiwiSaver forms in", "Your logins: email, CRM, shared drive, trade portal (and accounts, if you need it)", "Desk, phone and keys. Tui gives you the warehouse alarm code."] },
      { when: "Week one", meet: ["nadia", "tui", "ellie"], items: ["Welcome coffee with Nadia", "Walk through the warehouse with Tui: range names, where things live, the coating booth safety talk", "Read Our Story and the range pages on the website", "Sit with Ellie on the phones for at least half a day, whatever your role", "Meet everyone. There are only twelve of us."] },
      { when: "Weeks two to four", items: ["Training for your role. Your manager has the list, and the last stop on this path shows what's written down so far."] },
      { when: "End of month one", items: ["Catch-up with your manager: what's clear, and what isn't."] }
    ],
    range: ["Drift pendant", "Orbit 75 downlight", "Arc trimless downlight", "Jetty bollard", "Line 24 linear profile", "Wharf bulkhead"],
    rangeTip: { by: "ellie", t: "Learn the range names. Customers say \"the round one from the beach house photo\" and you need to know that's a Drift." },
    checklist: "r-newstarter",
    // The systems you get logins for, from Sam's systems list (source/05-links.md), in what everyone calls them
    systems: [{ n: "The CRM", w: "Enquiries, contacts, projects and follow-ups. If it's not in the CRM, it didn't happen." }, { n: "Accounts", w: "Quotes, orders and invoices, if your role needs it. Sam does the logins." },
      { n: "The trade portal", w: "Trade pricing and live stock." }, { n: "Shared drive", w: "Every document and template, in team folders." }, { n: "Ops channel", w: "Quick messages about orders, in the team chat app." }],
    tracks: [
      { id: "sales", name: "Sales and specification", roles: ["spec", "design", "reps"], learn: ["priya", "leo", "jase", "mere"],
        weeks: ["Ride-alongs with Jase or Mere", "Sit in on Priya's discovery calls", "One plan walk-through with Leo"], tasks: ["meeting", "plan", "chase"],
        tips: [{ by: "priya", t: "Architects are busy. Never waste their time. Bring the data sheet, not the brochure. Learn the difference between beam angle and colour temperature before you meet anyone." },
          { by: "leo", t: "Colour temperature and CRI. Most problems come from someone ordering 4000K for a living room." },
          { by: "jase", t: "Learn the range, learn the sparkies' names, be useful on site. Don't knock other brands, they all use them." },
          { by: "mere", t: "Get to know the branch managers by name. Bring the samples. Answer the phone." }] },
      { id: "service", name: "Customer service", roles: ["cs"], learn: ["ellie", "josh"],
        weeks: ["Two days on the phones with Ellie"], tasks: ["enquiry", "quote", "order", "update"],
        confirm: "Ellie asks for two days on the phones. Sam's checklist says at least half a day for everyone. Which one is it for Customer Service?",
        tips: [{ by: "ellie", t: "Learn the range names. Sit with me on the phones for two days. Never promise a date you haven't checked." }] },
      { id: "ops", name: "Operations", roles: ["purchasing", "warehouse"], learn: ["arjun", "tui", "kit"],
        weeks: ["A full receiving with Tui", "A supplier order with Arjun"], tasks: ["supplier", "update", "warranty"],
        tips: [{ by: "arjun", t: "Always check colour temperature against the spec. Always. Ask before you choose air freight, it's 4 times the cost." },
          { by: "tui", t: "Safety first in the coating booth. Label everything. If it's not on the test record it didn't happen." }] },
      { id: "marketing", name: "Marketing", roles: ["marketing"], learn: ["hana"], weeks: [], tasks: [],
        tips: [{ by: "hana", t: "Every photo needs permission. Every one." }] },
      { id: "accounts", name: "Accounts", roles: ["gm"], learn: ["sam"], weeks: [], tasks: [],
        tips: [{ by: "sam", t: "Ask. Nobody minds. And put it in the CRM." }] }
    ]
  },

  // The quick quiz on Our Story and the company (Mariah's idea, agreed). One question at a time. Answers aren't saved.
  quiz: [
    { q: "Where did Halflight start?", a: ["A warehouse near the port", "Nadia's garage in Bethlehem", "A shop in Mount Maunganui"], c: 1, why: "In 2009 Nadia brought in a pallet of pendants for friends who were building, and sold the leftovers from her garage in Bethlehem.", from: "Our Story, milestones" },
    { q: "A customer asks for \"the round one from the beach house photo\". What do they want?", a: ["An Orbit 75 downlight", "A Jetty bollard", "A Drift pendant"], c: 2, why: "Our first architect project, in 2012, was a Mount Maunganui beach house. It's still lit with our Drift pendants.", from: "Our Story, milestones" },
    { q: "How long does a custom powder-coat finish take?", a: ["Two days", "Ten days", "Six weeks"], c: 1, why: "We've had our own powder-coat booth since 2018: any colour, finished here in Tauranga, in ten days.", from: "Our Story, milestones" },
    { q: "\"We'd rather tell you a fitting is six weeks away than promise it Friday.\" Which of our values is that?", a: ["Own the outcome", "Make it easy", "Straight up", "Design with care"], c: 2, why: "We're honest about stock, lead times and price, even when it's not what they want to hear.", from: "Our Story, values" },
    { q: "What's our theme for this year?", a: ["Protect the spec", "Grow the trade", "Faster finishes"], c: 0, why: "Protect the spec: turn more specified projects into delivered orders, from 45% to 65%.", from: "Scoreboard" },
    { q: "You need to know what a shipment will really cost once it lands. Who do you ask?", a: ["Sam", "Arjun", "Ellie"], c: 1, why: "Landed costs: ask Arjun. Right now he's the only one who knows how to do them, which is one of our gaps to sort.", from: "Our Story, our team" },
    { q: "What's the most common mistake on an order?", a: ["The wrong quantity", "The wrong courier", "The wrong colour temperature"], c: 2, why: "Arjun and Leo both say it: check colour temperature against the spec. Always.", from: "Growing Our Team, your role" }
  ],

  goals: {
    theme: "Protect the spec",
    themeLine: "Turn more specified projects into delivered orders.",
    period: "FY 2026/27 (April to March). Updated monthly by Sam before the leadership meeting.",
    owner: "sam", source: "Sam's plan for FY 2026/27, talked through at kick-off",
    updated: "2026-10-05",
    actions: [
      { name: "Add 'contractor named' as a required field for specs in the CRM", owner: "priya", due: "2026-10-31", status: "In progress" },
      { name: "Set up a Tuesday supplier order cut-off", owner: "arjun", due: "2026-09-30", status: "Done" },
      { name: "Write the delay notice email template", owner: "ellie", due: "2026-09-15", status: "Done" },
      { name: "Retrain wholesaler counter staff on the core range", owner: "mere", due: "2026-11-30", status: "Not started" },
      { name: "Second person trained on landed costs (Arjun is the only one)", owner: "sam", due: "2026-12-15", status: "Not started" }
    ]
  },

  // Scoreboard: Sam's monthly KPI sheet (source/06-reports/kpi-sheet-sep-2026.md), entered month by month. FY runs April to March.
  // goal: "path" = build from start to target by March (the plan's objectives); "flat" = one target all year; "ytd" = a plan per month, added up.
  // chart: "line" (line and target), "bars" (columns), "progress" (progress to target), "number" (big number and trend). The admin picks.
  // Owners of the four objectives come from Sam's plan; owners of the other measures are Claude's suggestion.
  scoreboard: {
    months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    year: "FY 2026/27",
    measures: [
      { id: "crm", group: "objective", name: "Specified projects tracked in the CRM, spec to site", short: "Specs tracked in the CRM", unit: "%", values: [20, 28, 39, 52, 63, 70], goal: "path", start: 20, target: 100, chart: "progress", owner: "priya", from: "Spec register and the CRM" },
      { id: "s2o", group: "objective", name: "Spec-to-order conversion", short: "Spec-to-order", unit: "%", values: [45, 46, 48, 49, 51, 52], goal: "path", start: 45, target: 65, chart: "line", owner: "priya", from: "Spec register, status column", note: "Sam: \"spec-to-order is from the spec register status column, so it's only as good as the register.\"" },
      { id: "contractor", group: "objective", name: "Contractor engaged before quote", short: "Contractor engaged first", unit: "%", values: [30, 34, 41, 47, 52, 58], goal: "path", start: 30, target: 90, chart: "bars", owner: "jase", from: "Spec register, contractor column" },
      { id: "proactive", group: "objective", name: "Import orders with a proactive customer update", short: "Proactive updates", unit: "%", values: [40, 48, 61, 70, 82, 85], goal: "path", start: 40, target: 100, chart: "line", owner: "arjun", from: "The CRM, order notes" },
      { id: "revenue", group: "measure", name: "Revenue year to date", short: "Revenue YTD", unit: "$k", values: [182, 371, 560, 752, 934, 1120], goal: "ytd", per: 195, chart: "bars", owner: "sam", from: "Accounts, management report", note: "Sam: \"don't put the full-year number on the wall, the YTD is fine.\"" },
      { id: "gp", group: "measure", name: "Gross profit", short: "Gross profit", unit: "%", dp: 1, values: [48.2, 48.6, 49.0, 48.8, 49.3, 49.1], goal: "flat", target: 50, chart: "number", owner: "sam", from: "Accounts, management report" },
      { id: "turns", group: "measure", name: "Stock turns (rolling 12 months)", short: "Stock turns", unit: "", dp: 1, values: [3.4, 3.4, 3.5, 3.5, 3.6, 3.6], goal: "flat", target: 4.0, chart: "number", owner: "arjun", from: "Accounts, stock values" },
      { id: "ontime", group: "measure", name: "On-time delivery", short: "On-time delivery", unit: "%", values: [91, 92, 93, 92, 94, 94], goal: "flat", target: 95, chart: "line", owner: "arjun", from: "Accounts, orders against the date we promised" },
      { id: "rating", group: "measure", name: "Google rating", short: "Google rating", unit: "", dp: 1, values: [4.7, 4.7, 4.8, 4.8, 4.8, 4.8], goal: "flat", target: 4.7, chart: "number", owner: "hana", from: "Our Google business listing" }
    ],
    // Past reports: one per month, attached when the month's figures went in (the Monday before the leadership meeting)
    reports: [
      { m: "Apr", on: "2026-05-04", by: "sam", files: [{ n: "KPI sheet Apr 2026.xlsx", s: "48 KB" }, { n: "Management report Apr 2026.pdf", s: "312 KB" }] },
      { m: "May", on: "2026-06-01", by: "sam", files: [{ n: "KPI sheet May 2026.xlsx", s: "49 KB" }, { n: "Management report May 2026.pdf", s: "305 KB" }] },
      { m: "Jun", on: "2026-07-06", by: "sam", files: [{ n: "KPI sheet Jun 2026.xlsx", s: "51 KB" }, { n: "Management report Jun 2026.pdf", s: "341 KB" }] },
      { m: "Jul", on: "2026-08-03", by: "sam", files: [{ n: "KPI sheet Jul 2026.xlsx", s: "50 KB" }, { n: "Management report Jul 2026.pdf", s: "322 KB" }] },
      { m: "Aug", on: "2026-08-31", by: "sam", files: [{ n: "KPI sheet Aug 2026.xlsx", s: "52 KB" }, { n: "Management report Aug 2026.pdf", s: "330 KB" }] },
      { m: "Sep", on: "2026-10-05", by: "sam", files: [{ n: "KPI sheet Sep 2026.xlsx", s: "53 KB" }, { n: "Management report Sep 2026.pdf", s: "347 KB" }] }
    ]
  },

  // Where each company sits: x = price (1 low, 5 high), y = design and spec support (1 low, 5 high)
  positioning: { x: "Price", y: "Design and spec support", by: "The team's view (Nadia, Priya and Jase), not measured", reviewed: "2026-09-15", points: [
    { id: "halflight", x: 3.2, y: 4.6 }, { id: "vantelle", x: 4.8, y: 4.4 }, { id: "corvane", x: 4.2, y: 4.1 },
    { id: "ardenwick", x: 3.0, y: 2.6 }, { id: "brightmarsh", x: 2.4, y: 1.9 }, { id: "pennock", x: 1.7, y: 1.5 }, { id: "brightbarn", x: 1.2, y: 1.1 } ] },

  // Dashboard role views. Nothing about any person is saved: the choice only changes what's shown.
  // "flow" is the How We Work lane the dashboard's stage line opens on for that view.
  roleViews: [
    { id: "all", name: "Everyone", flow: "sales" },
    { id: "sales", name: "Sales and specification", people: ["nadia", "priya", "leo", "jase", "mere", "hana"], flow: "sales" },
    { id: "service", name: "Customer service", people: ["ellie", "josh"], flow: "sales" },
    { id: "ops", name: "Operations", people: ["arjun", "tui", "kit", "sam"], flow: "ops" },
    { id: "new", name: "New starter" }
  ],

  // "I want to..." tasks, from the questionnaire answers to "the tasks you do most often", in their words.
  // A task holds no content of its own: it's an ordered path through what's already in the hub.
  //   task: "lane:stage:n" = that task from How We Work, shown exactly as it is there (steps, documents, gaps)
  //   pick: the meeting prep pickers (who, stage, rival) and the battlecard itself (card), shared with Meeting Prep
  //   outside: something that happens outside the hub. page: the tile opens that page instead (no steps).
  // home: shown on the dashboard for "Everyone". Nothing is ticked off or saved.
  tasks: [
    { id: "meeting", title: "Plan a sales meeting", line: "Who you're meeting, where the deal is at, who you're up against. Walk in with a battlecard.", art: "card", views: ["sales", "all"], home: true,
      path: [{ pick: "who" }, { pick: "stage" }, { pick: "rival" }, { pick: "card" },
        { outside: true, t: "After the meeting", x: "Update the CRM with what happened and the next step, the same day. The hub holds how we sell, never who we sold to." }] },
    { id: "enquiry", title: "Answer a new enquiry", line: "Phone, email or web form: answer it, log it, get it to the right person.", art: "downlight", views: ["service", "sales", "all"], home: true,
      path: [{ task: "sales:enquiry:0" }, { task: "sales:enquiry:1" }, { task: "sales:enquiry:2" }] },
    { id: "quote", title: "Write a quote", line: "Specified fittings first, exactly as written. Alternates in their own section.", art: "linear", views: ["service", "all"], home: true,
      path: [{ task: "sales:quote:0" }] },
    { id: "chase", title: "Chase a quote", line: "3 days, 10 days, and before the decision date, until it's ordered.", art: "track", views: ["sales", "all"],
      path: [{ task: "sales:follow:0" }, { task: "sales:follow:1" }, { task: "sales:follow:2" }] },
    { id: "order", title: "Turn a yes into an order", line: "Get it in writing, convert the quote, mark every line, tell the customer.", art: "finish", views: ["service", "all"],
      path: [{ task: "sales:won:0" }] },
    { id: "plan", title: "Get a lighting plan done", line: "Brief Lighting Design, then present the plan yourself.", art: "plan", views: ["sales", "all"],
      path: [{ task: "sales:discovery:1" }, { task: "sales:plan:1" }] },
    { id: "supplier", title: "Place a supplier order", line: "The checklist, the freight, the Tuesday cut-off, and an ETA for Customer Service.", art: "bulkhead", views: ["ops", "all"], home: true,
      path: [{ task: "ops:supplier:0" }, { task: "ops:supplier:1" }, { task: "ops:supplier:2" }, { task: "ops:supplier:3" }] },
    { id: "update", title: "Send a customer an order update", line: "Shipped, delayed or landed. Tell them before the contractor hears it somewhere else.", art: "strip", views: ["service", "ops", "all"],
      path: [{ task: "ops:ship:2" }] },
    { id: "warranty", title: "Sort a warranty claim", line: "Photos to the warranty inbox, check the test record, then replace or test.", art: "test", views: ["service", "ops", "all"], home: true,
      path: [{ task: "aftersales:claim:0" }, { task: "aftersales:claim:1" }, { task: "aftersales:claim:2" }, { task: "aftersales:claim:3" }] },
    { id: "new", title: "I'm new, get me started", line: "Our story, your first weeks, our words, then the parts of your role.", art: "table", views: ["new", "all"], home: true, page: "people" }
  ],

  // Monthly spec-to-order conversion, for the dashboard trend line

  glossary: [
    { term: "Spec", def: "Specification. The architect's or designer's list of exactly which fittings go in a project." },
    { term: "Spec swap", def: "When a contractor or builder replaces the specified fitting with a cheaper one at quote stage." },
    { term: "Landed stock", def: "Product that has arrived in NZ and is in our Tauranga warehouse." },
    { term: "Indent order", def: "A product ordered from the overseas supplier for a specific job, not held in stock." },
    { term: "Colour temperature", def: "How warm or cool the light looks, measured in kelvin (2700K is warm, 4000K is cool)." },
    { term: "Core range", def: "The products we always hold in stock and that retail partners carry." },
    { term: "Lighting plan", def: "Leo's drawing showing which fitting goes where, with dimming and colour temperature." },
    { term: "Range review", def: "A retail partner's annual decision on which of our products they'll carry." }
  ]
};
