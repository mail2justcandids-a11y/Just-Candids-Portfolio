import { PhotoItem, DesignProject } from '../types';

export const PHOTOGRAPHY_WORKS: PhotoItem[] = [
  {
    id: 'siva-frame-01',
    title: 'Royal Vermilion Bridal Elegance',
    category: 'portrait',
    imageUrl: '/works/siva-work-01-bridal-red.jpg',
    description: 'Regal bridal portraiture featuring intricate golden zardozi embroidery, bespoke antique temple jewelry, and warm ambient studio rim lighting.',
    camera: 'Canon EOS R10',
    lens: 'Canon EF 50mm f/1.8 STM',
    settings: {
      aperture: 'f/3.2',
      shutter: '1/500s',
      iso: '2000',
      focalLength: '50mm',
    },
    year: '2025',
    aspectRatio: 'portrait',
    focalPoint: 'center 28%',
  },
  {
    id: 'siva-frame-02',
    title: 'Mint & Ruby Ceremonial Grace',
    category: 'portrait',
    imageUrl: '/works/siva-work-02-bridal-mint.jpg',
    description: 'Graceful bridal pose draped in shimmering mint pastel silk with ruby accents against a deep crimson backdrop, captured with shallow depth-of-field.',
    camera: 'Canon EOS R10',
    lens: 'Canon EF 50mm f/1.8 STM',
    settings: {
      aperture: 'f/2.8',
      shutter: '1/400s',
      iso: '2500',
      focalLength: '50mm',
    },
    year: '2025',
    aspectRatio: 'portrait',
    focalPoint: 'center 32%',
  },
  {
    id: 'siva-frame-03',
    title: 'Henna & Heritage',
    category: 'portrait',
    imageUrl: '/works/siva-work-03-bridal-mehendi.jpg',
    description: 'Luminous bridal portrait highlighting intricate floral henna patterns, polki diamond choker, and radiant candid smile.',
    camera: 'Canon EOS R10',
    lens: 'Canon EF 50mm f/1.8 STM',
    settings: {
      aperture: 'f/1.8',
      shutter: '1/250s',
      iso: '640',
      focalLength: '50mm',
    },
    year: '2026',
    aspectRatio: 'portrait',
    focalPoint: 'center 25%',
  },
  {
    id: 'siva-frame-04',
    title: 'Innocence & Wonder',
    category: 'portrait',
    imageUrl: '/works/siva-work-04-baby-candid.jpg',
    description: 'Pure, unposed childhood wonder captured mid-ceremony as little eyes gaze upward toward family celebrations.',
    camera: 'Canon EOS R10',
    lens: 'Canon EF 50mm f/1.8 STM',
    settings: {
      aperture: 'f/1.8',
      shutter: '1/250s',
      iso: '500',
      focalLength: '50mm',
    },
    year: '2026',
    aspectRatio: 'portrait',
    focalPoint: 'center 50%',
  },
  {
    id: 'siva-frame-05',
    title: 'Concert Spotlight Cadence',
    category: 'event',
    imageUrl: '/works/siva-work-05-live-concert.jpg',
    description: 'Dynamic live stage performance captured under intense starburst stage lighting, freezing raw musical energy mid-lyric.',
    camera: 'Canon EOS R10',
    lens: 'Canon EF 50mm f/1.8 STM',
    settings: {
      aperture: 'f/4.5',
      shutter: '1/250s',
      iso: '800',
      focalLength: '50mm',
    },
    year: '2025',
    aspectRatio: 'portrait',
    focalPoint: 'center 25%',
  },
  {
    id: 'siva-frame-06',
    title: 'Rhythm in Monochrome',
    category: 'event',
    imageUrl: '/works/siva-work-06-hiphop-stage.jpg',
    description: 'High-contrast monochrome stage photography freezing an explosive hip-hop performance gesture under theatrical spotlights.',
    camera: 'Canon EOS R10',
    lens: 'Canon EF 50mm f/1.8 STM',
    settings: {
      aperture: 'f/2.0',
      shutter: '1/800s',
      iso: '1600',
      focalLength: '50mm',
    },
    year: '2025',
    aspectRatio: 'portrait',
    focalPoint: 'center 35%',
  },
  {
    id: 'siva-frame-07',
    title: 'The Creative Connection (BTS)',
    category: 'low-light',
    imageUrl: '/works/siva-work-07-behind-the-scenes.jpg',
    description: 'Intimate candid moment between photographer Siva and the muse reviewing frames on camera, capturing the collaborative essence of Just Candids.',
    camera: 'Canon EOS R10',
    lens: 'Canon EF 50mm f/1.8 STM',
    settings: {
      aperture: 'f/2.8',
      shutter: '1/160s',
      iso: '1250',
      focalLength: '50mm',
    },
    year: '2025',
    aspectRatio: 'portrait',
    focalPoint: 'center 40%',
  },
  {
    id: 'siva-frame-08',
    title: 'Morning Market Rhythm',
    category: 'street',
    imageUrl: '/works/siva-work-08-street-market.jpg',
    description: 'Atmospheric candid documentary of bustling market aisles under translucent canopy light, highlighting natural textures and daily hustle.',
    camera: 'Canon EOS R10',
    lens: 'Canon RF-S 18-45mm IS STM',
    settings: {
      aperture: 'f/4.5',
      shutter: '1/125s',
      iso: '400',
      focalLength: '24mm',
    },
    year: '2024',
    aspectRatio: 'portrait',
    focalPoint: 'center 50%',
  },
  {
    id: 'siva-frame-10',
    title: 'Fleeting Gaze Through Glass',
    category: 'street',
    imageUrl: '/works/siva-work-10-street-bokeh.jpg',
    description: 'Unstaged street portrait framed through layered glass and jewelry store bokeh, capturing a contemplative pause.',
    camera: 'Canon EOS R10',
    lens: 'Canon EF 50mm f/1.8 STM',
    settings: {
      aperture: 'f/3.2',
      shutter: '1/640s',
      iso: '800',
      focalLength: '50mm',
    },
    year: '2025',
    aspectRatio: 'portrait',
    focalPoint: 'center 40%',
  },
  {
    id: 'siva-frame-11',
    title: 'Timeless Monochrome Bride',
    category: 'low-light',
    imageUrl: '/works/siva-work-11-monochrome-muse.jpg',
    description: 'Fine-art monochrome bridal portrait balancing deep velvet shadows with glistening catchlights in the earrings and eyes.',
    camera: 'Canon EOS R10',
    lens: 'Canon EF 50mm f/1.8 STM',
    settings: {
      aperture: 'f/1.8',
      shutter: '1/250s',
      iso: '640',
      focalLength: '50mm',
    },
    year: '2026',
    aspectRatio: 'portrait',
    focalPoint: 'center 25%',
  },
  {
    id: 'siva-frame-13',
    title: 'Classical Resonance (Solo Violin)',
    category: 'event',
    imageUrl: '/works/siva-work-13-ceremony.jpg',
    description: 'Captivating stage performance freezing a young violinist in deep concentration under warm dramatic spotlighting with cinematic background visuals.',
    camera: 'Canon EOS R10',
    lens: 'Canon RF 24-70mm F2.8 L IS USM',
    settings: {
      aperture: 'f/2.8',
      shutter: '1/1600s',
      iso: '4000',
      focalLength: '70mm',
    },
    year: '2026',
    aspectRatio: 'portrait',
    focalPoint: 'center 45%',
  },
  {
    id: 'siva-frame-14',
    title: 'Laughter & Camaraderie',
    category: 'portrait',
    imageUrl: '/works/siva-work-14-portrait.jpg',
    description: 'Unposed, heartwarming camaraderie among five close friends sharing spontaneous laughter on a sun-dappled park bench under palm canopies.',
    camera: 'Canon EOS R10',
    lens: 'Canon RF 24-70mm F2.8 L IS USM',
    settings: {
      aperture: 'f/2.8',
      shutter: '1/80s',
      iso: '640',
      focalLength: '46mm',
    },
    year: '2026',
    aspectRatio: 'portrait',
    focalPoint: 'center 35%',
  },
  {
    id: 'siva-frame-16',
    title: 'Urban Charisma & Bokeh',
    category: 'portrait',
    imageUrl: '/works/siva-work-18-urban-portrait.jpg',
    description: 'Luminous contemporary portraiture shot wide open at f/1.4, capturing warm authentic expression and relaxed elegance against textured golden drape bokeh.',
    camera: 'Sony Alpha 7 IV',
    lens: 'Sigma 35mm F1.4 DG DN Art',
    settings: {
      aperture: 'f/1.4',
      shutter: '1/100s',
      iso: '400',
      focalLength: '35mm',
    },
    year: '2026',
    aspectRatio: 'portrait',
    focalPoint: 'center 24%',
  },
  {
    id: 'siva-frame-17',
    title: 'Stage Cadence & Flow',
    category: 'event',
    imageUrl: '/works/siva-work-17-traditional.jpg',
    description: 'High-energy black-and-white concert photography capturing an emotive hip-hop performance gesture through blinding stage starbursts.',
    camera: 'Canon EOS R10',
    lens: 'Canon EF 50mm f/1.8 STM',
    settings: {
      aperture: 'f/2.2',
      shutter: '1/500s',
      iso: '1250',
      focalLength: '50mm',
    },
    year: '2025',
    aspectRatio: 'portrait',
    focalPoint: 'center 40%',
  },
  {
    id: 'siva-frame-12',
    title: 'Introspective Chiaroscuro',
    category: 'low-light',
    imageUrl: '/photos/photo9.jpg',
    description: 'Cinematic low-key black-and-white portrait capturing a contemplative profile enveloped in deep velvet shadows and delicate silver rim lighting.',
    camera: 'Canon EOS R10',
    lens: 'Canon EF 50mm f/1.8 STM',
    settings: {
      aperture: 'f/2.8',
      shutter: '1/500s',
      iso: '1600',
      focalLength: '50mm',
    },
    year: '2025',
    aspectRatio: 'portrait',
    focalPoint: 'center 38%',
  },
  {
    id: 'siva-frame-09',
    title: 'Misty Valley Solitude',
    category: 'street',
    imageUrl: '/works/siva-work-09-misty-hills.jpg',
    description: 'Atmospheric dusk landscape of nestled mountain villages cloaked in blue mist and rolling mountain ridges.',
    camera: 'Canon EOS R10',
    lens: 'Canon RF-S 18-45mm F4.5-6.3 IS STM',
    settings: {
      aperture: 'f/7.1',
      shutter: '1/50s',
      iso: '125',
      focalLength: '45mm',
    },
    year: '2025',
    aspectRatio: 'landscape',
    focalPoint: 'center 45%',
  },
  {
    id: 'siva-frame-15',
    title: 'Rotary Youth Leadership Gala',
    category: 'event',
    imageUrl: '/works/siva-work-15-landscape.jpg',
    description: 'Grand celebratory stage portrait of the District Rotaract Council and youth leaders gathered under vibrant conference lighting.',
    camera: 'Canon EOS R10',
    lens: 'Canon RF 24-70mm F2.8 L IS USM',
    settings: {
      aperture: 'f/4.5',
      shutter: '1/60s',
      iso: '800',
      focalLength: '24mm',
    },
    year: '2026',
    aspectRatio: 'landscape',
    focalPoint: 'center 45%',
  },
];

export const GRAPHIC_DESIGN_WORKS: DesignProject[] = [
  {
    "id": "up-ryla-dress-code",
    "title": "UP RYLA Official Dress Code & Identity Guide",
    "client": "District Rotaract Council \u2022 Rotary International District 3234",
    "category": "print",
    "imageUrl": "/designs/up-ryla-dress-code.png",
    "description": "Multi-day identity and wardrobe guideline poster for the Rotary Youth Leadership Awards (UP RYLA), featuring old-money themes, business formals, smart casuals, and official Ponneri Gymkhana Club event scheduling.",
    "tools": [
      "Adobe Illustrator",
      "Photoshop",
      "Typography Layout"
    ],
    "deliverables": [
      "300 DPI Event Guidelines Poster",
      "Digital Delegate Kit",
      "Schedule Infographics"
    ],
    "year": "2026",
    "colorPalette": [
      "#111319",
      "#d48f45",
      "#d9cfbe",
      "#ffffff"
    ]
  },
  {
    "id": "one-day-one-meal",
    "title": "Project One Meal Community Outreach",
    "client": "Rotaract Club of Dhanalakshmi College of Engineering",
    "category": "social-media",
    "imageUrl": "/designs/one-day-one-meal.jpg",
    "description": "High-impact community outreach poster highlighting humanitarian meal distribution with bold typographic repetition, high-contrast crimson accents, and project leadership credentials.",
    "tools": [
      "Adobe Photoshop",
      "Social Media Layout",
      "Visual Hierarchy"
    ],
    "deliverables": [
      "Instagram Feed & Story Creative",
      "Community Campaign Banner",
      "Donor Recognition Asset"
    ],
    "year": "2025",
    "colorPalette": [
      "#200f0e",
      "#dd0700",
      "#7a7165",
      "#feffff"
    ]
  },
  {
    "id": "galatta-culturals-chief-guest",
    "title": "The Original Galatta 2026 Culturals Announcement",
    "client": "Rotaract Clubs of East Coast Chennai & MGR University",
    "category": "social-media",
    "imageUrl": "/designs/galatta-culturals-chief-guest.jpg",
    "description": "Festive sports and cultural announcement visual featuring official dignitary guest of honour Rtn. PHF. Dr. Aatral Devakumar, gold foil text styling, and multi-institutional committee credits.",
    "tools": [
      "Adobe Photoshop",
      "Color Grading",
      "Event Branding"
    ],
    "deliverables": [
      "Event Announcement Poster",
      "Dignitary Recognition Banner",
      "Multi-College Distribution Creative"
    ],
    "year": "2026",
    "colorPalette": [
      "#191410",
      "#6a4a37",
      "#ad7337",
      "#ffffff"
    ]
  },
  {
    "id": "up-ryla-dos-and-donts",
    "title": "UP RYLA Delegate Guidelines (Do's & Don'ts)",
    "client": "District Rotaract Council \u2022 Rotary International District 3234",
    "category": "print",
    "imageUrl": "/designs/up-ryla-dos-and-donts.png",
    "description": "Official instructional convention infographic outlining things to carry versus prohibited items for the 3-day leadership conclave, engineered with clean contrast iconography and district heraldry.",
    "tools": [
      "Adobe Illustrator",
      "Infographic Design",
      "Vector Iconography"
    ],
    "deliverables": [
      "High-Resolution Print Infographic",
      "Delegate Handout PDF",
      "Social Advisory Creative"
    ],
    "year": "2026",
    "colorPalette": [
      "#111b11",
      "#546685",
      "#a4b7d3",
      "#ffffff"
    ]
  },
  {
    "id": "elysian-2k26-countdown",
    "title": "Elysian 2K26 AI & Data Science Symposium Launch",
    "client": "Dhanalakshmi College of Engineering \u2022 Dept of AI & DS",
    "category": "social-media",
    "imageUrl": "/designs/elysian-2k26-countdown.png",
    "description": "Futuristic college symposium registration poster featuring glowing neon typography, dynamic circuit board vectors, QR registration terminal, and department identity.",
    "tools": [
      "Adobe Photoshop",
      "Illustrator",
      "Cyberpunk Neon FX"
    ],
    "deliverables": [
      "Symposium Launch Poster",
      "Registration QR Creative",
      "Campus Digital Billboard"
    ],
    "year": "2026",
    "colorPalette": [
      "#161823",
      "#199fcf",
      "#b8c65f",
      "#ffffff"
    ]
  },
  {
    "id": "krishna-janmashtami-poster",
    "title": "Krishna Janmashtami Celebration Poster",
    "client": "Rotaract Club of Dhanalakshmi College of Engineering",
    "category": "social-media",
    "imageUrl": "/designs/krishna-janmashtami-poster.png",
    "description": "Artistic cultural celebration creative combining festive spiritual typography, glowing peacock feather motifs, and official Rotary club leadership greetings.",
    "tools": [
      "Adobe Photoshop",
      "Digital Composite",
      "Cultural Storytelling"
    ],
    "deliverables": [
      "Festive Social Greeting",
      "Club Instagram Announcement",
      "Digital Community Poster"
    ],
    "year": "2025",
    "colorPalette": [
      "#20120b",
      "#5b83cb",
      "#71afd3",
      "#ffffff"
    ]
  },
  {
    "id": "elysian-2k26-invitation",
    "title": "Elysian 2K26 Senior Invitation & Department Connect",
    "client": "Department of Artificial Intelligence and Data Science",
    "category": "social-media",
    "imageUrl": "/designs/elysian-2k26-invitation.png",
    "description": "Formal department invitation letter and visual tribute welcoming alumni and graduating seniors back to the annual technical symposium with refined editorial typography.",
    "tools": [
      "Adobe InDesign",
      "Photoshop",
      "Editorial Typography"
    ],
    "deliverables": [
      "Alumni Digital Invitation Card",
      "Symposium Social Announcement",
      "High-Res Presentation Asset"
    ],
    "year": "2026",
    "colorPalette": [
      "#00102d",
      "#2a2f35",
      "#fcfdfc",
      "#ffffff"
    ]
  },
  {
    "id": "graduation-day-banner",
    "title": "21st Graduation Day Dignitary Stage Banner",
    "client": "Dhanalakshmi College of Engineering (Autonomous)",
    "category": "branding",
    "imageUrl": "/designs/graduation-day-banner.png",
    "description": "Official panoramic stage backdrop and dignitary podium banner honoring Chief Guest Mr. Nandakumar IRS (Commissioner of Income Tax) and Guest of Honour Mr. Mohanbabu Balachandran (VP Rocket India).",
    "tools": [
      "Adobe Illustrator",
      "Large-Format Print Design",
      "Institutional Heraldry"
    ],
    "deliverables": [
      "Large-Format Stage Backdrop (1600x400)",
      "300 DPI Official Print Banner",
      "Dignitary Podium Visuals"
    ],
    "year": "2026",
    "colorPalette": [
      "#141415",
      "#630058",
      "#770187",
      "#ffffff"
    ]
  },
  {
    "id": "project-one-meal-campaign",
    "title": "One 5.0 Community Service Campaign Banner",
    "client": "Rotaract Club of Dhanalakshmi College of Engineering",
    "category": "social-media",
    "imageUrl": "/designs/project-one-meal-campaign.png",
    "description": "Community service milestone visual celebrating 6,867 beneficiaries under the Project One initiative, styled with social UI elements, metrics counter, and club credentials.",
    "tools": [
      "Adobe Photoshop",
      "Social UI Integration",
      "Data Visualization"
    ],
    "deliverables": [
      "Milestone Celebration Post",
      "Social Metrics Summary",
      "Club Archive Visual"
    ],
    "year": "2025",
    "colorPalette": [
      "#152206",
      "#549ace",
      "#bbcdd6",
      "#ffffff"
    ]
  },
  {
    "id": "raja-iyer-kitchen-vinayagar",
    "title": "Raja Iyer Kitchen Festive Campaign",
    "client": "Raja Iyer Kitchen Catering",
    "category": "social-media",
    "imageUrl": "/designs/raja-iyer-kitchen-vinayagar.png",
    "description": "Commercial catering promotional poster celebrating Vinayagar Chaturthi, combining traditional Indian gastronomy photography, metallic gold serif typography, and service listings.",
    "tools": [
      "Adobe Photoshop",
      "Commercial Layout",
      "Typography"
    ],
    "deliverables": [
      "Commercial Ad Creative",
      "WhatsApp & Social Marketing Poster",
      "Menu Service Listing"
    ],
    "year": "2025",
    "colorPalette": [
      "#0f230b",
      "#806353",
      "#deb686",
      "#ffffff"
    ]
  },
  {
    "id": "rotacode-terminal-poster",
    "title": "Rota-Code Cyber Puzzle Challenge",
    "client": "Rotaract Club of Coastal Legacy \u2022 Rotary District 3234",
    "category": "social-media",
    "imageUrl": "/designs/rotacode-terminal-poster.png",
    "description": "Terminal-inspired cyberpunk coding challenge visual designed with binary matrix rain, command-line syntax styling, neon monospace typography, and interactive QR registration.",
    "tools": [
      "Adobe Illustrator",
      "Photoshop",
      "Cyberpunk UI"
    ],
    "deliverables": [
      "Coding Competition Poster",
      "Terminal UI Social Post",
      "QR Entry Verification Asset"
    ],
    "year": "2026",
    "colorPalette": [
      "#231802",
      "#181818",
      "#393939",
      "#ffffff"
    ]
  },
  {
    "id": "up-ryla-sponsor-gratitude",
    "title": "UP RYLA Official Sponsor Appreciation Poster",
    "client": "District Rotaract Council \u2022 Rotary District 3234",
    "category": "print",
    "imageUrl": "/designs/up-ryla-sponsor-gratitude.png",
    "description": "Official commemorative sponsor gratitude visual honoring corporate and rotary club contributors for the Rotary Youth Leadership Awards with premium heraldic framing.",
    "tools": [
      "Adobe Illustrator",
      "Photoshop",
      "Heraldic Framing"
    ],
    "deliverables": [
      "Sponsor Appreciation Board",
      "300 DPI Official Print Creative",
      "District Digital Press Release"
    ],
    "year": "2026",
    "colorPalette": [
      "#111319",
      "#9b9398",
      "#cbe4fa",
      "#ffffff"
    ]
  }
];
