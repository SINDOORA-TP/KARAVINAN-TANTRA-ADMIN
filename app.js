/**
 * Karavinan Tantra Peedam - Core Application Logic
 * Features:
 *  - Multilingual Engine (English & Tamil)
 *  - JSON-driven Homam Schedule Loader
 *  - Sacred Numerology Engine (Chaldean & Pythagorean + Mobile reduction)
 *  - Ambient Gold Particle Canvas
 *  - WhatsApp Enquiries & Form Handlers
 *  - Scroll Animations & Sticky Nav
 */

// Global State
const state = {
  lang: 'en',
  activeHomamTab: 'upcoming',
  homamData: null,
  numerologySystem: 'chaldean',
  keepMasterNumbers: true
};

// Configuration & Contacts (Easily customizable)
const CONFIG = {
  phone: '+919876543210',
  phoneDisplay: '+91 98765 43210',
  whatsappNumber: '919876543210',
  sanctumLocation: 'Sokkanur, Kinathukadavu, Tamil Nadu',
  googleMapsUrl: 'https://maps.google.com/?q=Sokkanur,+Kinathukadavu,+Tamil+Nadu'
};

/* ==========================================================================
   TRANSLATIONS DICTIONARY (EN & TA)
   ========================================================================== */
const TRANSLATIONS = {
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_homam: 'Homam Schedule',
    nav_astrology: 'Astrology',
    nav_numerology: 'Numerology',
    nav_contact: 'Contact',
    nav_sankalpam_btn: 'Book Sankalpam',

    hero_badge: 'Sri Karavinan Tantra Peedam',
    hero_title: 'Ancient Tantric Wisdom, Sacred Homams & Cosmic Destiny',
    hero_subtitle: 'Awakening divine harmony, supreme protection, and spiritual prosperity through authentic Agamic Vidhi and sacred fire rituals at Sokkanur Sanctum.',
    hero_cta1_title: 'Homam Schedule',
    hero_cta1_desc: 'Upcoming Yagnas & Dates',
    hero_cta2_title: 'Astrology',
    hero_cta2_desc: 'Horoscope & Parikarams',
    hero_cta3_title: 'Numerology',
    hero_cta3_desc: 'Instant Name & Mobile Check',
    hero_cta4_title: 'WhatsApp Guru',
    hero_cta4_desc: 'Direct Spiritual Guidance',
    trust_years: '15+ Years Sadhana',
    trust_sankalpam: '5,000+ Sacred Sankalpams',
    trust_sanctum: 'Sokkanur, Tamil Nadu',
    trust_privacy: 'Confidential Spiritual Guidance',

    about_plate: 'The Organiser & Peedam',
    about_title: 'Sri Karavinan Swamigal',
    about_subtitle: 'Tantrik Sadhaka & Vedic Astrologer',
    about_years: 'Years',
    about_exp_label: 'Sadhana & Vidhi',
    about_bio_1: 'Initiated into traditional South Indian Tantric Kaula and Agamic traditions, Sri Karavinan Swamigal has dedicated over 15 years to guiding devotees across Tamil Nadu and abroad through the profound mysteries of authentic mantra, yantra, and homam rituals.',
    about_bio_2: 'Headquartered in the tranquil, spiritually charged environs of Sokkanur (near Kinathukadavu / Pollachi), the Peedam conducts both direct sanctum yagnas and remote Sankalpams for international devotees seeking relief from chronic karmic afflictions, evil eye, and planetary doshas.',
    pillar1_title: 'Shastraic Authenticity',
    pillar1_desc: 'Every homam strictly adheres to ancient Vedic and Agamic procedures with unadulterated aahutis.',
    pillar2_title: 'Sankalpam with Care',
    pillar2_desc: 'Individual names, nakshatras, and gotras recited with focused tantric dhyana.',
    pillar3_title: 'Complete Confidentiality',
    pillar3_desc: 'Every horoscope consultation and personal affliction is kept in strictest spiritual confidence.',
    pillar4_title: 'Prasadam Worldwide',
    pillar4_desc: 'Blessed sacred ash (bhasmam), kumkum, and energized yantras dispatched across the globe.',

    homam_plate: 'Sacred Homam Calendar',
    homam_title: 'Upcoming Yagnas & Maha Parikarams',
    homam_subtitle: 'Participate in person at Sokkanur Sanctum or enroll for remote Virtual Sankalpam with home-delivered energized Prasadam.',
    tab_upcoming: 'Upcoming Homams',
    tab_past: 'Past Ceremonies Archive',
    btn_enquire_wa: 'Enquire via WhatsApp',
    virtual_available: '✓ Virtual Sankalpam & Global Courier',

    astro_plate: 'Vedic Astrology & Parikaram',
    astro_title: 'Cosmic Diagnosis & Divine Remedies',
    astro_subtitle: 'Unravel planetary influences, understand karmic blueprints, and attain peace through precise shastraic remedies.',
    astro_btn_book: 'Book Consultation',

    num_plate: 'Sacred Numerology Calculator',
    num_title: 'Discover Your Vibrational Blueprint',
    num_subtitle: 'Calculate your sacred Name Number and Mobile Number vibration using ancient Chaldean and Pythagorean wisdom.',
    num_tab_name: 'Name Number Vibration',
    num_tab_mobile: 'Mobile Number Harmony',
    num_calc_btn: 'Reveal Sacred Vibration',
    num_privacy: '100% Client-Side Privacy: All calculations happen securely inside your browser. No phone numbers or names are stored or uploaded.',
    num_disclaimer: 'Results are for spiritual and informational purposes only.',

    contact_plate: 'Sanctum & Direct Connect',
    contact_title: 'Seek Divine Guidance at Sokkanur',
    contact_subtitle: 'We invite you to reach out for appointments, homam participation, or personal spiritual counsel.',
    contact_phone_title: 'Direct Helpline',
    contact_wa_title: 'WhatsApp Sanctuary',
    contact_sanctum_title: 'Peedam Sanctum Address',
    contact_hours_title: 'Sanctum Timings',
    contact_hours_desc: 'Daily 8:00 AM – 1:00 PM & 4:30 PM – 8:30 PM (Prior Appointment Advised)',

    form_title: 'Request a Sankalpam / Consultation',
    form_name: 'Your Full Name',
    form_phone: 'WhatsApp / Mobile Number',
    form_service: 'Select Service / Homam',
    form_date: 'Preferred Date',
    form_message: 'Your Prayer Request / Question',
    form_submit_wa: 'Submit & Open WhatsApp',
    form_success: 'May the Divine Grace bless you. Redirecting to WhatsApp with your details...',

    footer_desc: 'Sri Karavinan Tantra Peedam, Sokkanur. Preserving ancient Agamic rituals, sacred fire homams, and compassionate astrological counsel.',
    footer_quick_links: 'Quick Links',
    footer_services: 'Sacred Services',
    footer_sanctum_info: 'Sanctum Details',
    footer_rights: 'All rights reserved. Dedicated to Divine Mother & Guru Parampara.'
  },

  ta: {
    nav_home: 'முகப்பு',
    nav_about: 'குருநாதர்',
    nav_homam: 'ஹோம அட்டவணை',
    nav_astrology: 'ஜோதிடம்',
    nav_numerology: 'எண் கணிதம்',
    nav_contact: 'தொடர்பு',
    nav_sankalpam_btn: 'சங்கல்பம் பதிவு',

    hero_badge: 'ஸ்ரீ கரவினன் தந்திர பீடம்',
    hero_title: 'பவித்ர தந்திர விதிகளும், சக்தி வாய்ந்த ஹோமங்களும், தெய்வீக ஜோதிடமும்',
    hero_subtitle: 'சொக்கனூர் திருத்தலத்தில் 15 ஆண்டுகளுக்கும் மேலாக ஆகம தந்திர நெறிகள், கிரக தோஷ நிவர்த்தி மற்றும் சங்கல்ப யாகங்கள் மூலம் அருள் வழிகாட்டுகிறோம்.',
    hero_cta1_title: 'ஹோம அட்டவணை',
    hero_cta1_desc: 'வரவிருக்கும் யாகங்கள்',
    hero_cta2_title: 'ஜோதிட ஆலோசனை',
    hero_cta2_desc: 'ஜாதகம் & பரிகாரங்கள்',
    hero_cta3_title: 'எண் கணிதம்',
    hero_cta3_desc: 'பெயர் & மொபைல் எண் ஆய்வு',
    hero_cta4_title: 'வாட்ஸ்அப் குரு',
    hero_cta4_desc: 'நேரடி ஆன்மீக வழிகாட்டல்',
    trust_years: '15+ ஆண்டுகள் சாதனா',
    trust_sankalpam: '5,000+ பவித்ர சங்கல்பங்கள்',
    trust_sanctum: 'சொக்கனூர், தமிழ்நாடு',
    trust_privacy: 'முழுமையான ரகசிய காப்பு',

    about_plate: 'குருநாதர் அறிமுகம்',
    about_title: 'ஸ்ரீ கரவினன் சுவாமிகள்',
    about_subtitle: 'தந்திர சாதகர் & வேத ஜோதிடர்',
    about_years: 'ஆண்டுகள்',
    about_exp_label: 'அனுபவம் & சாதனா',
    about_bio_1: 'பாரம்பரிய தந்திர ஆகம நெறிகளில் தீட்சை பெற்ற ஸ்ரீ கரவினன் சுவாமிகள், கடந்த 15 ஆண்டுகளுக்கும் மேலாக மந்திர, யந்திர மற்றும் ஹோம விதிகளின் மூலமாக பல்லாயிரக்கணக்கான பக்தர்களின் வாழ்விற்கு நல்வழி காட்டி வருகிறார்.',
    about_bio_2: 'பொள்ளாச்சி - கிணத்துக்கடவு அருகே உள்ள சொக்கனூர் இயற்கை எழில்சூழ் திருத்தலத்தில் பீடம் அமைந்துள்ளது. நேரடி வருகை மற்றும் வெளிநாடு வாழ் பக்தர்களுக்கு ஆன்லைன் சங்கல்பம் மூலம் ஹோம பிரசாதம் அனுப்பி வைக்கப்படுகிறது.',
    pillar1_title: 'சாஸ்திர சுத்தி',
    pillar1_desc: 'பழமையான ஆகம மற்றும் வேத விதிமுறைகளின்படி தூய்மையான ஹோம திரவியங்களுடன் யாகம்.',
    pillar2_title: 'கவனமான சங்கல்பம்',
    pillar2_desc: 'ஒவ்வொரு பக்தரின் பெயர், நட்சத்திரம், கோத்திரம் கூறி தனிப்பட்ட தியானத்துடன் சங்கல்பம்.',
    pillar3_title: 'முழு ரகசியம்',
    pillar3_desc: 'ஜாதக மற்றும் தனிப்பட்ட குடும்பப் பிரச்சனைகள் யாவும் மிக ரகசியமாகப் பாதுகாக்கப்படும்.',
    pillar4_title: 'உலகெங்கும் பிரசாதம்',
    pillar4_desc: 'ஹோம பஸ்மம், குங்குமம் மற்றும் உருவேற்றப்பட்ட யந்திரங்கள் தபால் மூலம் அனுப்பி வைக்கப்படும்.',

    homam_plate: 'பவித்ர ஹோம அட்டவணை',
    homam_title: 'வரவிருக்கும் யாகங்கள் & மகா பரிகாரங்கள்',
    homam_subtitle: 'சொக்கனூர் பீடத்தில் நேரில் கலந்துகொள்ளலாம் அல்லது வெளிநாட்டில் உள்ளோர் ஆன்லைன் சங்கல்பம் மூலமும் பதிவு செய்யலாம்.',
    tab_upcoming: 'வரவிருக்கும் ஹோமங்கள்',
    tab_past: 'நிறைவுபெற்ற யாகங்கள்',
    btn_enquire_wa: 'வாட்ஸ்அப்பில் பதிவு செய்க',
    virtual_available: '✓ ஆன்லைன் சங்கல்பம் & உலகளாவிய பிரசாதம்',

    astro_plate: 'வேத ஜோதிடம் & பரிகாரம்',
    astro_title: 'கிரக நிலைகளும் தெய்வீக நிவர்த்திகளும்',
    astro_subtitle: 'உங்கள் ஜனன கால ஜாதகத்தை நுணுக்கமாக ஆராய்ந்து, வாழ்வின் தடைகளை நீக்கும் துல்லியமான பரிகாரங்கள்.',
    astro_btn_book: 'ஆலோசனைக்கு முன்பதிவு',

    num_plate: 'எண் கணித வழிகாட்டி',
    num_title: 'உங்கள் பெயரின் தெய்வீக அதிர்வு',
    num_subtitle: 'சால்டியன் மற்றும் பித்தகோரியன் சாஸ்திர நெறிமுறைகளின்படி உங்கள் பெயர் மற்றும் மொபைல் எண்களைக் கணக்கிடுங்கள்.',
    num_tab_name: 'பெயர் எண் அதிர்வு',
    num_tab_mobile: 'மொபைல் எண் பொருத்தம்',
    num_calc_btn: 'அதிர்வை கணக்கிடுக',
    num_privacy: '🔒 100% பிரைவசி: உங்கள் பெயர் அல்லது தொலைபேசி எண்கள் எங்கும் சேமிக்கப்படாது, உங்கள் உலாவியிலேயே கணக்கிடப்படுகிறது.',
    num_disclaimer: 'முடிவுகள் ஆன்மீக மற்றும் தகவல் விழிப்புணர்வு நோக்கத்திற்காக மட்டுமே.',

    contact_plate: 'தொடர்பு & திருத்தலம்',
    contact_title: 'சொக்கனூர் பீடத்தை அணுகவும்',
    contact_subtitle: 'ஹோம சங்கல்பம், ஜோதிட ஆலோசனை மற்றும் நேரில் தரிசனத்திற்கான தொடர்பு விவரங்கள்.',
    contact_phone_title: 'தொலைபேசி உதவி',
    contact_wa_title: 'வாட்ஸ்அப் தொடர்பு',
    contact_sanctum_title: 'சொக்கனூர் பீட முகவரி',
    contact_hours_title: 'தரிசன நேரம்',
    contact_hours_desc: 'தினசரி காலை 8:00 – மதியம் 1:00 & மாலை 4:30 – இரவு 8:30 (முன் அனுமதி நலம்)',

    form_title: 'சங்கல்பம் / ஆலோசனை முன்பதிவு',
    form_name: 'தங்கள் முழு பெயர்',
    form_phone: 'வாட்ஸ்அப் / கைபேசி எண்',
    form_service: 'சேவை அல்லது ஹோமம் தேர்வு',
    form_date: 'விருப்பமான நாள்',
    form_message: 'உங்கள் பிரார்த்தனை / விவரம்',
    form_submit_wa: 'விவரங்களை வாட்ஸ்அப்பில் அனுப்புக',
    form_success: 'அருள் நிறைக! உங்கள் விவரங்களுடன் வாட்ஸ்அப் திறக்கப்படுகிறது...',

    footer_desc: 'ஸ்ரீ கரவினன் தந்திர பீடம், சொக்கனூர். பண்டைய ஆகம வழிபாடுகள், சக்தி வாய்ந்த ஹோமங்கள் மற்றும் தெய்வீக வழிகாட்டுதல்.',
    footer_quick_links: 'முக்கிய இணைப்புகள்',
    footer_services: 'பவித்ர சேவைகள்',
    footer_sanctum_info: 'திருத்தல விவரம்',
    footer_rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. குரு பரம்பரை சரணம்.'
  }
};

/* ==========================================================================
   NUMEROLOGY ALGORITHMS (Chaldean & Pythagorean)
   ========================================================================== */
const NUMEROLOGY_MAPS = {
  chaldean: {
    A: 1, I: 1, J: 1, Q: 1, Y: 1,
    B: 2, K: 2, R: 2,
    C: 3, G: 3, L: 3, S: 3,
    D: 4, M: 4, T: 4,
    E: 5, H: 5, N: 5, X: 5,
    U: 6, V: 6, W: 6,
    O: 7, Z: 7,
    F: 8, P: 8
  },
  pythagorean: {
    A: 1, J: 1, S: 1,
    B: 2, K: 2, T: 2,
    C: 3, L: 3, U: 3,
    D: 4, M: 4, V: 4,
    E: 5, N: 5, W: 5,
    F: 6, O: 6, X: 6,
    G: 7, P: 7, Y: 7,
    H: 8, Q: 8, Z: 8,
    I: 9, R: 9
  }
};

const NUMBER_MEANINGS = {
  1: {
    title: 'The Sovereign (Sun / Surya)',
    title_ta: 'சூரிய ஆதிக்கம் (தலைமை & வெற்றி)',
    planet: 'Sun (Surya Bhagavan)',
    planet_ta: 'சூரிய பகவான்',
    summary: 'A powerful vibration of leadership, independence, vitality, and pioneering initiative. Commands respect and paves new paths.',
    summary_ta: 'சூரியனின் ஆதிக்கம் கொண்ட அதிர்வு. தன்னம்பிக்கை, கம்பீர தலைமை, அதிகார ஆற்றல் மற்றும் அரசு வழியிலான மேன்மைகளைக் குறிக்கும்.',
    lucky_day: 'Sunday',
    lucky_color: 'Gold, Ruby Red, Amber',
    direction: 'East',
    mantra: 'Om Hram Hreem Hroum Sah Suryaya Namaha'
  },
  2: {
    title: 'The Diplomat (Moon / Chandra)',
    title_ta: 'சந்திர ஆதிக்கம் (மனசாந்தி & கலை)',
    planet: 'Moon (Chandra Bhagavan)',
    planet_ta: 'சந்திர பகவான்',
    summary: 'Gentle, intuitive, harmonizing, and deeply empathetic. Excels in partnerships, creative pursuits, and spiritual devotion.',
    summary_ta: 'சந்திரனின் அமைதி மற்றும் உள்ளுணர்வு கொண்ட அதிர்வு. மென்மை, கற்பனை வளம், கலை ஆர்வம் மற்றும் குடும்ப நல்லிணக்கத்தைத் தரும்.',
    lucky_day: 'Monday',
    lucky_color: 'Silver, Pearl White, Cream',
    direction: 'North-West',
    mantra: 'Om Shram Shreem Shroum Sah Chandraya Namaha'
  },
  3: {
    title: 'The Sage (Jupiter / Guru)',
    title_ta: 'குரு ஆதிக்கம் (ஞானம் & வளர்ச்சி)',
    planet: 'Jupiter (Brihaspati / Guru)',
    planet_ta: 'குரு பகவான் (பிரகஸ்பதி)',
    summary: 'Vibration of supreme wisdom, benevolence, expansion, and spiritual teachership. Brings auspicious luck and intellectual mastery.',
    summary_ta: 'குருவின் பூரண அருள் கொண்ட சுப அதிர்வு. உயர் கல்வி, ஆன்மீக ஞானம், தன சேர்க்கை மற்றும் மங்களகரமான நிகழ்வுகளை அருளும்.',
    lucky_day: 'Thursday',
    lucky_color: 'Golden Yellow, Saffron',
    direction: 'North-East (Ishanya)',
    mantra: 'Om Gram Greem Groum Sah Gurave Namaha'
  },
  4: {
    title: 'The Architect (Rahu)',
    title_ta: 'ராகு ஆதிக்கம் (நவீன புத்தி & வியூகம்)',
    planet: 'Rahu (North Node)',
    planet_ta: 'ராகு பகவான்',
    summary: 'Disciplined, pragmatic, revolutionary, and unconventional. Possesses relentless determination to transform chaotic circumstances into lasting foundations.',
    summary_ta: 'அசாதாரண புத்திக்கூர்மை, திடீர் திருப்புமுனை மற்றும் புதிய உத்திகள் மூலம் சாதனை புரியும் வல்லமை தரும் அதிர்வு.',
    lucky_day: 'Saturday / Sunday',
    lucky_color: 'Electric Blue, Smoky Grey',
    direction: 'South-West',
    mantra: 'Om Bhram Bhreem Bhroum Sah Rahave Namaha'
  },
  5: {
    title: 'The Communicator (Mercury / Budha)',
    title_ta: 'புதன் ஆதிக்கம் (வாணிபம் & பேச்சு)',
    planet: 'Mercury (Budha Bhagavan)',
    planet_ta: 'புதன் பகவான்',
    summary: 'Quick-witted, versatile, commercial genius, and adaptable. Governs trade, negotiation, intellect, and youthful vitality.',
    summary_ta: 'வியாபார யோகம், நாவன்மை, அறிவாற்றல் மற்றும் கணக்கீட்டுத் திறமைகளை அள்ளித் தரும் சுறுசுறுப்பான புதன் அதிர்வு.',
    lucky_day: 'Wednesday',
    lucky_color: 'Emerald Green, Mint',
    direction: 'North',
    mantra: 'Om Bram Breem Broum Sah Budhaya Namaha'
  },
  6: {
    title: 'The Harmonizer (Venus / Shukra)',
    title_ta: 'சுக்கிர ஆதிக்கம் (செல்வம் & கவர்ச்சி)',
    planet: 'Venus (Shukra Bhagavan)',
    planet_ta: 'சுக்கிர பகவான்',
    summary: 'Beauty, luxury, domestic bliss, artistic charisma, and abundant material comforts. Radiates magnetism and protective care.',
    summary_ta: 'ஆடம்பரம், வசீகர ஆளுமை, குடும்ப மகிழ்ச்சி, கலை மற்றும் தனதான்ய விருத்தியைத் தரும் அதிர்ஷ்ட சுக்கிர அதிர்வு.',
    lucky_day: 'Friday',
    lucky_color: 'Silk White, Pastel Blue, Pink',
    direction: 'South-East',
    mantra: 'Om Shram Shreem Shroum Sah Shukraya Namaha'
  },
  7: {
    title: 'The Mystic (Ketu)',
    title_ta: 'கேது ஆதிக்கம் (ஞானம் & முக்தி)',
    planet: 'Ketu (South Node)',
    planet_ta: 'கேது பகவான் (ஞானகாரகன்)',
    summary: 'Deeply philosophical, intuitive, introspective, and spiritually elevated. Penetrates superficial illusions to perceive hidden cosmic truths.',
    summary_ta: 'ஆழ்ந்த ஆன்மீக ஈடுபாடு, உள்ளுணர்வு, யோக சாதனை மற்றும் மறைபொருள் தத்துவங்களை உணர்த்தும் ஞான அதிர்வு.',
    lucky_day: 'Tuesday / Thursday',
    lucky_color: 'Smoky Amber, Brown, Ochre',
    direction: 'North-East',
    mantra: 'Om Stram Streem Stroum Sah Ketave Namaha'
  },
  8: {
    title: 'The Master of Karma (Saturn / Shani)',
    title_ta: 'சனி ஆதிக்கம் (உழைப்பு & நிரந்தர வெற்றி)',
    planet: 'Saturn (Shani Bhagavan)',
    planet_ta: 'சனி பகவான் (கர்மகாரகன்)',
    summary: 'Endurance, profound authority, steadfast justice, and monumental long-term triumphs earned through authentic righteousness.',
    summary_ta: 'விடாமுயற்சி, நீதி தவறாமை, ஆழமான ஒழுக்கம் மற்றும் தாமதமானாலும் அசைக்க முடியாத நிரந்தர வெற்றியைத் தரும் சனி அதிர்வு.',
    lucky_day: 'Saturday',
    lucky_color: 'Deep Indigo, Royal Navy, Black',
    direction: 'West',
    mantra: 'Om Pram Preem Proum Sah Shanaischaraya Namaha'
  },
  9: {
    title: 'The Spiritual Warrior (Mars / Mangal)',
    title_ta: 'செவ்வாய் ஆதிக்கம் (தைரியம் & வீரம்)',
    planet: 'Mars (Mangal / Angaraka)',
    planet_ta: 'செவ்வாய் பகவான் (அங்காரகன்)',
    summary: 'Dynamic courage, fiery stamina, protective warrior spirit, and universal humanitarian vision. Overcomes obstacles with fearless determination.',
    summary_ta: 'வீரம், வேகம், பூமி யோகம், எதிரிகளை முறியடிக்கும் ஆற்றல் மற்றும் சவால்களை வெல்லும் செவ்வாய் பகவானின் மகா சக்தி.',
    lucky_day: 'Tuesday',
    lucky_color: 'Crimson Red, Scarlet, Coral',
    direction: 'South',
    mantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namaha'
  },
  11: {
    title: 'Master Number 11: The Divine Illuminator',
    title_ta: 'மகா எண் 11: தெய்வீக ஒளி & தீவிர உள்ளுணர்வு',
    planet: 'Higher Octave of Moon & Neptune',
    planet_ta: 'உயர்ந்த உள்ளுணர்வு & ஞான பிரகாசம்',
    summary: 'A rare master vibration carrying high spiritual illumination, prophetic visions, and psychic sensitivity. Acts as a bridge between the cosmic realm and humanity.',
    summary_ta: 'அதிதீவிர உள்ளுணர்வு மற்றும் ஆன்மீக ஒளி பொருந்திய மாஸ்டர் எண். ஆன்ம விழிப்புணர்வை ஏற்படுத்தும் மகா ஆற்றல்.',
    lucky_day: 'Monday & Thursday',
    lucky_color: 'Iridescent Silver, Pure White',
    direction: 'North-East',
    mantra: 'Om Namo Bhagavate Vasudevaya'
  },
  22: {
    title: 'Master Number 22: The Master Builder',
    title_ta: 'மகா எண் 22: பிரம்மாண்ட சாதனைகளின் சிற்பி',
    planet: 'Higher Octave of Rahu & Jupiter',
    planet_ta: 'அசைக்க முடியாத சாதனை அதிர்வு',
    summary: 'The most capable of all numbers, able to ground grand visionary dreams into enduring physical reality. Fosters large-scale philanthropic and global institutions.',
    summary_ta: 'கனவுகளை நிஜமாக்கும் மாபெரும் அமைப்பு பலம். உலகளாவிய அளவிலான சாதனைகள் மற்றும் ஸ்தாபனங்களை அமைக்கும் ஆற்றல்.',
    lucky_day: 'Saturday & Sunday',
    lucky_color: 'Deep Gold & Coral',
    direction: 'Center / Universal',
    mantra: 'Om Gam Ganapataye Namaha'
  }
};

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initStickyHeader();
  initMobileMenu();
  initGoldParticles();
  initScrollAnimations();
  loadHomamSchedule();
  initHomamTabs();
  initNumerology();
  initContactForm();
});

/* ==========================================================================
   LANGUAGE ENGINE
   ========================================================================== */
function initLanguage() {
  const toggleBtn = document.getElementById('langToggleBtn');
  if (!toggleBtn) return;

  // Restore preferred language or default to 'en'
  const savedLang = localStorage.getItem('karavinan_lang') || 'en';
  setLanguage(savedLang);

  toggleBtn.addEventListener('click', () => {
    const nextLang = state.lang === 'en' ? 'ta' : 'en';
    setLanguage(nextLang);
  });
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem('karavinan_lang', lang);
  document.documentElement.lang = lang;

  if (lang === 'ta') {
    document.body.classList.add('lang-ta');
  } else {
    document.body.classList.remove('lang-ta');
  }

  // Update pills
  const enPill = document.getElementById('langPillEn');
  const taPill = document.getElementById('langPillTa');
  if (enPill && taPill) {
    enPill.classList.toggle('active', lang === 'en');
    taPill.classList.toggle('active', lang === 'ta');
  }

  // Update all [data-i18n] elements
  const dict = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Re-render homam cards with localized text if data is loaded
  if (state.homamData) {
    renderHomamCards();
  }

  // Update active numerology result if visible
  const resultCard = document.getElementById('numResultCard');
  if (resultCard && resultCard.classList.contains('active')) {
    updateActiveNumerologyMeaning();
  }
}

/* ==========================================================================
   STICKY HEADER & NAVIGATION
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Smooth scroll and active link highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggleBtn');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    toggleBtn.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', false);
    });
  });
}

/* ==========================================================================
   HOMAM SCHEDULE (Loaded from schedule.json)
   ========================================================================== */
async function loadHomamSchedule() {
  const grid = document.getElementById('homamCardsGrid');
  if (!grid) return;

  try {
    const res = await fetch('schedule.json');
    if (!res.ok) throw new Error('Failed to fetch schedule.json');
    state.homamData = await res.json();
    renderHomamCards();
  } catch (err) {
    console.warn('Could not load schedule.json, falling back to embedded dataset', err);
    // Fallback embedded dataset for resilient offline / local file viewing
    state.homamData = {
      upcoming: [
        {
          id: "homam-01",
          name: "Maha Pratyangira Devi Shatru Samhara Homam",
          name_ta: "மகா பிரத்யங்கிரா தேவி சத்ரு சம்ஹார ஹோமம்",
          deity: "Sri Maha Pratyangira Devi",
          date: "2026-11-15",
          display_date: "Sunday, 15 November 2026",
          display_date_ta: "ஞாயிறு, 15 நவம்பர் 2026",
          time: "5:30 PM - 9:00 PM IST",
          venue: "Sokkanur Maha Peedam Sanctum, Kinathukadavu",
          venue_ta: "சொக்கனூர் மகா பீடம், கிணத்துக்கடவு",
          summary: "Supreme tantric fire invocation for absolute protection against negative energies, evil eye (dhrishti), occult afflictions, and court litigations.",
          summary_ta: "எதிரிகள் தொல்லை, கண்திருஷ்டி, பில்லி சூனியம் நீங்கி சகல காரிய வெற்றி தரும் அதிதீவிர உக்கிர பிரத்யங்கிரா தேவி ஹோமம்.",
          benefits: ["Elimination of Drishti", "Legal Victory", "Spiritual Shielding"],
          sankalpam_available: true
        },
        {
          id: "homam-02",
          name: "Sri Maha Sudarshana & Narasimha Raksha Homam",
          name_ta: "ஸ்ரீ மகா சுதர்சன & நரசிம்ம ரக்ஷா ஹோமம்",
          deity: "Bhagavan Sudarshana & Sri Narasimha",
          date: "2026-11-28",
          display_date: "Saturday, 28 November 2026",
          display_date_ta: "சனி, 28 நவம்பர் 2026",
          time: "7:00 AM - 11:30 AM IST",
          venue: "Sokkanur Maha Peedam Sanctum, Kinathukadavu",
          venue_ta: "சொக்கனூர் மகா பீடம், கிணத்துக்கடவு",
          summary: "Sacred 108 moolamantra aahutis of the Divine Discus to eradicate chronic illnesses, planetary afflictions (Rahu-Ketu), and mental anxieties.",
          summary_ta: "தீராத வியாதிகள், ராகு-கேது தோஷங்கள் மற்றும் மன சஞ்சலங்களை அடியோடு போக்கும் திவ்ய சுதர்சன சக்கர ஹோமம்.",
          benefits: ["Aarogya Healing", "Rahu-Ketu Relief", "Vitality & Peace"],
          sankalpam_available: true
        },
        {
          id: "homam-03",
          name: "Ashta Lakshmi & Kubera Dhanakarshana Homam",
          name_ta: "அஷ்ட லக்ஷ்மி & குபேர தனாகர்ஷண ஹோமம்",
          deity: "Maha Lakshmi & Lord Kubera",
          date: "2026-12-12",
          display_date: "Saturday, 12 December 2026",
          display_date_ta: "சனி, 12 டிசம்பர் 2026",
          time: "6:00 PM - 9:30 PM IST",
          venue: "Sokkanur Maha Peedam Sanctum, Kinathukadavu",
          venue_ta: "சொக்கனூர் மகா பீடம், கிணத்துக்கடவு",
          summary: "Rare tantric prosperity ritual using lotus seeds, pure cow ghee, and bilva leaves to attract steady wealth, business growth, and resolve debt burdens.",
          summary_ta: "வியாபார பெருக்கம், கடன் சுமை நிவர்த்தி மற்றும் நிரந்தர தனலாபம் தரும் அரிய தாமரை மலர் அஷ்டலக்ஷ்மி யாகம்.",
          benefits: ["Business Multiplier", "Debt Alleviation", "Akshaya Wealth"],
          sankalpam_available: true
        }
      ],
      past: [
        {
          id: "homam-p01",
          name: "Sarva Karya Siddhi Vinayagar Mahayagnam",
          name_ta: "சர்வ காரிய சித்தி விநாயகர் மகாயாகம்",
          deity: "Maha Ganapati",
          display_date: "7 September 2026",
          display_date_ta: "7 செப்டம்பர் 2026",
          time: "Concluded with Maha Poornahuti",
          venue: "Sokkanur Sanctum",
          venue_ta: "சொக்கனூர் பீடம்",
          summary: "Massive 1008 modaka and sugarcane offerings for smooth commencement of new enterprises and removal of obstacles.",
          summary_ta: "தொழில் மற்றும் சுப காரிய தடைகள் விலக 1008 கொழுக்கட்டை சமர்ப்பிக்கப்பட்ட திவ்ய மகா கணபதி யாகம்.",
          benefits: ["Obstacle Removal", "350+ Devotee Sankalpams"],
          sankalpam_available: false
        }
      ]
    };
    renderHomamCards();
  }
}

function initHomamTabs() {
  const tabs = document.querySelectorAll('.tab-btn[data-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeHomamTab = tab.getAttribute('data-tab');
      renderHomamCards();
    });
  });
}

function renderHomamCards() {
  const grid = document.getElementById('homamCardsGrid');
  if (!grid || !state.homamData) return;

  const isTamil = state.lang === 'ta';
  const list = state.homamData[state.activeHomamTab] || [];

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem;" class="gold-framed-card">
        <p style="color: var(--text-muted);">${isTamil ? 'தற்போது இப்பிரிவில் பதிவுகள் இல்லை.' : 'No homams recorded in this archive category yet.'}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(item => {
    const title = (isTamil && item.name_ta) ? item.name_ta : item.name;
    const dateStr = (isTamil && item.display_date_ta) ? item.display_date_ta : item.display_date;
    const venueStr = (isTamil && item.venue_ta) ? item.venue_ta : item.venue;
    const descStr = (isTamil && item.summary_ta) ? item.summary_ta : item.summary;

    // Prefilled WhatsApp enquiry message
    const waText = encodeURIComponent(
      `Namaste Sri Karavinan Swamigal,\n\nI would like to enquire about the sacred "${item.name}" scheduled for ${item.display_date} at Sokkanur Sanctum.\nPlease share registration and Sankalpam details.`
    );
    const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${waText}`;

    return `
      <div class="gold-framed-card homam-card fade-up">
        <!-- Corner Flourishes -->
        <svg class="corner-flourish corner-tl" viewBox="0 0 20 20" fill="none"><path d="M0 0 H18 V4 H4 V18 H0 Z" fill="url(#goldGrad1)"/></svg>
        <svg class="corner-flourish corner-tr" viewBox="0 0 20 20" fill="none"><path d="M0 0 H18 V4 H4 V18 H0 Z" fill="url(#goldGrad1)"/></svg>
        <svg class="corner-flourish corner-bl" viewBox="0 0 20 20" fill="none"><path d="M0 0 H18 V4 H4 V18 H0 Z" fill="url(#goldGrad1)"/></svg>
        <svg class="corner-flourish corner-br" viewBox="0 0 20 20" fill="none"><path d="M0 0 H18 V4 H4 V18 H0 Z" fill="url(#goldGrad1)"/></svg>

        <div>
          <div class="homam-header">
            <div>
              <div class="homam-deity">✦ ${item.deity}</div>
              <h3 class="homam-name">${title}</h3>
            </div>
            <div class="homam-date-badge">${dateStr}</div>
          </div>

          <div class="homam-meta">
            <div class="meta-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${item.time}</span>
            </div>
            <div class="meta-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${venueStr}</span>
            </div>
          </div>

          <p class="homam-desc">${descStr}</p>

          <div class="homam-benefits">
            ${item.benefits.map(b => `<span class="benefit-tag">✦ ${b}</span>`).join('')}
          </div>
        </div>

        <div class="homam-footer">
          <span class="virtual-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ${isTamil ? 'ஆன்லைன் சங்கல்பம் உண்டு' : 'Virtual Sankalpam Available'}
          </span>
          ${item.sankalpam_available ? `
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.54 1.765.808 2.8.808 3.181 0 5.767-2.586 5.768-5.766.001-3.18-2.585-5.766-5.772-5.766zm0 10.366c-.886 0-1.637-.238-2.316-.653l-.166-.102-1.57.412.419-1.53-.108-.172c-.443-.706-.704-1.472-.704-2.555 0-2.536 2.064-4.601 4.602-4.601 2.537 0 4.602 2.065 4.602 4.601 0 2.537-2.065 4.6-4.602 4.6z"/></svg>
              ${isTamil ? 'வாட்ஸ்அப்பில் பதிவு' : 'Enquire via WhatsApp'}
            </a>
          ` : `
            <span style="font-size: 0.85rem; color: var(--gold-secondary); font-style: italic;">
              ${isTamil ? 'மகா பூர்ணாஹுதி நிறைவுற்றது' : 'Ceremony Concluded'}
            </span>
          `}
        </div>
      </div>
    `;
  }).join('');

  // Re-run scroll observer on new cards
  initScrollAnimations();
}

/* ==========================================================================
   NUMEROLOGY ENGINE (Phase 5 Full Implementation)
   ========================================================================== */
function initNumerology() {
  const numTabs = document.querySelectorAll('.num-tab-btn[data-num-tab]');
  const nameCalcWrap = document.getElementById('nameCalcWrap');
  const mobileCalcWrap = document.getElementById('mobileCalcWrap');
  const systemSelect = document.getElementById('systemSelect');
  const masterCheck = document.getElementById('masterNumbersCheck');

  const nameInput = document.getElementById('nameInput');
  const nameCalcBtn = document.getElementById('nameCalcBtn');

  const mobileInput = document.getElementById('mobileInput');
  const mobileCalcBtn = document.getElementById('mobileCalcBtn');

  // Sub-tabs switching
  numTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      numTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-num-tab');

      if (target === 'name') {
        nameCalcWrap.style.display = 'block';
        mobileCalcWrap.style.display = 'none';
      } else {
        nameCalcWrap.style.display = 'none';
        mobileCalcWrap.style.display = 'block';
      }
      hideNumerologyResult();
    });
  });

  if (systemSelect) {
    systemSelect.addEventListener('change', (e) => {
      state.numerologySystem = e.target.value;
      if (nameInput.value.trim().length > 0) {
        calculateNameNumber();
      }
    });
  }

  if (masterCheck) {
    masterCheck.addEventListener('change', (e) => {
      state.keepMasterNumbers = e.target.checked;
      if (nameInput.value.trim().length > 0) {
        calculateNameNumber();
      }
    });
  }

  // Name calculation triggers
  if (nameCalcBtn) {
    nameCalcBtn.addEventListener('click', calculateNameNumber);
  }
  if (nameInput) {
    nameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') calculateNameNumber();
    });
  }

  // Mobile calculation triggers
  if (mobileCalcBtn) {
    mobileCalcBtn.addEventListener('click', calculateMobileNumber);
  }
  if (mobileInput) {
    mobileInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') calculateMobileNumber();
    });
    // Format numeric input
    mobileInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    });
  }
}

// Calculate Name Vibration
function calculateNameNumber() {
  const input = document.getElementById('nameInput');
  const rawText = input.value.trim().toUpperCase();
  if (!rawText) {
    alert(state.lang === 'ta' ? 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்.' : 'Please enter a name to calculate vibration.');
    return;
  }

  const map = NUMEROLOGY_MAPS[state.numerologySystem];
  const chipsWrap = document.getElementById('letterChipsWrap');
  const stepsBox = document.getElementById('reductionSteps');
  const breakdownBox = document.getElementById('calcBreakdownBox');

  chipsWrap.innerHTML = '';
  let sum = 0;
  const letterValues = [];

  // Parse each letter
  for (let i = 0; i < rawText.length; i++) {
    const ch = rawText[i];
    if (map[ch]) {
      const val = map[ch];
      sum += val;
      letterValues.push({ char: ch, val: val });

      const chip = document.createElement('div');
      chip.className = 'letter-chip';
      chip.innerHTML = `<span class="chip-char">${ch}</span><span class="chip-val">${val}</span>`;
      chipsWrap.appendChild(chip);
    }
  }

  if (letterValues.length === 0) {
    alert('Please enter valid alphabetic characters (A-Z).');
    return;
  }

  breakdownBox.classList.add('active');

  // Step-by-step reduction
  let reductionLog = `Formula: ${letterValues.map(item => `${item.char}(${item.val})`).join(' + ')} = ${sum}`;
  let currentNum = sum;

  while (currentNum > 9) {
    if (state.keepMasterNumbers && (currentNum === 11 || currentNum === 22)) {
      reductionLog += ` ➔ Master Number ${currentNum} preserved!`;
      break;
    }
    const digits = currentNum.toString().split('').map(Number);
    const nextSum = digits.reduce((acc, d) => acc + d, 0);
    reductionLog += ` ➔ ${digits.join(' + ')} = ${nextSum}`;
    currentNum = nextSum;
  }

  stepsBox.textContent = reductionLog;

  displayNumerologyResult(currentNum, 'name', rawText);
}

// Calculate Mobile Vibration
function calculateMobileNumber() {
  const input = document.getElementById('mobileInput');
  const rawDigits = input.value.trim();

  if (rawDigits.length < 7) {
    alert(state.lang === 'ta' ? 'சரியான தொலைபேசி எண்ணை உள்ளிடவும்.' : 'Please enter a valid mobile number (at least 7 to 10 digits).');
    return;
  }

  const chipsWrap = document.getElementById('mobileChipsWrap');
  const stepsBox = document.getElementById('mobileReductionSteps');
  const breakdownBox = document.getElementById('mobileBreakdownBox');

  chipsWrap.innerHTML = '';
  let sum = 0;
  const digits = rawDigits.split('').map(Number);

  digits.forEach((d) => {
    sum += d;
    const chip = document.createElement('div');
    chip.className = 'letter-chip';
    chip.innerHTML = `<span class="chip-char">${d}</span>`;
    chipsWrap.appendChild(chip);
  });

  breakdownBox.classList.add('active');

  let reductionLog = `Digit Sum: ${digits.join(' + ')} = ${sum}`;
  let currentNum = sum;

  while (currentNum > 9) {
    const dList = currentNum.toString().split('').map(Number);
    const nextSum = dList.reduce((acc, d) => acc + d, 0);
    reductionLog += ` ➔ ${dList.join(' + ')} = ${nextSum}`;
    currentNum = nextSum;
  }

  stepsBox.textContent = reductionLog;

  displayNumerologyResult(currentNum, 'mobile', rawDigits);
}

let activeResultNum = null;

function displayNumerologyResult(number, type, originalInput) {
  activeResultNum = number;
  const resultCard = document.getElementById('numResultCard');
  const numBadge = document.getElementById('resultNumberVal');
  const titleEl = document.getElementById('resultTitle');
  const planetEl = document.getElementById('resultPlanet');
  const descEl = document.getElementById('resultDesc');
  const dayEl = document.getElementById('resultLuckyDay');
  const colorEl = document.getElementById('resultLuckyColor');
  const dirEl = document.getElementById('resultDirection');

  const info = NUMBER_MEANINGS[number] || NUMBER_MEANINGS[9];
  const isTamil = state.lang === 'ta';

  numBadge.textContent = number;
  titleEl.textContent = isTamil ? info.title_ta : info.title;
  planetEl.textContent = (isTamil ? 'அதிபதி: ' : 'Planetary Ruler: ') + (isTamil ? info.planet_ta : info.planet);
  descEl.textContent = isTamil ? info.summary_ta : info.summary;

  dayEl.textContent = info.lucky_day;
  colorEl.textContent = info.lucky_color;
  dirEl.textContent = info.direction;

  resultCard.classList.add('active');
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateActiveNumerologyMeaning() {
  if (activeResultNum) {
    displayNumerologyResult(activeResultNum, 'name', '');
  }
}

function hideNumerologyResult() {
  const resultCard = document.getElementById('numResultCard');
  if (resultCard) resultCard.classList.remove('active');
}

/* ==========================================================================
   CONTACT FORM & WHATSAPP SANKALPAM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('sankalpamContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const service = document.getElementById('formService').value;
    const date = document.getElementById('formDate').value;
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !phone) {
      alert(state.lang === 'ta' ? 'பெயர் மற்றும் தொடர்பு எண்ணை நிரப்பவும்.' : 'Please enter your Name and WhatsApp phone number.');
      return;
    }

    // Compose formatted WhatsApp payload
    const text = encodeURIComponent(
      `*SANKALPAM / CONSULTATION REQUEST*\n` +
      `--------------------------------\n` +
      `✦ *Name:* ${name}\n` +
      `✦ *WhatsApp:* ${phone}\n` +
      `✦ *Requested Service:* ${service}\n` +
      (date ? `✦ *Preferred Date:* ${date}\n` : '') +
      (message ? `✦ *Prayer Request:* ${message}\n` : '') +
      `--------------------------------\n` +
      `_Sent via Karavinan Tantra Peedam Website_`
    );

    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;

    // Visual feedback
    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = state.lang === 'ta' ? 'அனுப்பப்படுகிறது...' : 'Redirecting to WhatsApp...';

    setTimeout(() => {
      window.open(waUrl, '_blank');
      btn.disabled = false;
      btn.innerHTML = origText;
      form.reset();
    }, 600);
  });
}

/* ==========================================================================
   INTERACTIVE GOLD PARTICLES CANVAS (Subtle Tantric Dust)
   ========================================================================== */
function initGoldParticles() {
  const canvas = document.getElementById('goldParticlesCanvas');
  if (!canvas) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let particles = [];
  const particleCount = 45;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.8;
      this.speedY = -(Math.random() * 0.4 + 0.15);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.hue = Math.floor(Math.random() * 15) + 38; // Rich gold/amber hues
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
        this.reset();
        this.y = canvas.height + 5;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 85%, 65%, ${this.opacity})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `hsla(${this.hue}, 90%, 60%, 0.8)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Pause when offscreen for battery performance
  let isVisible = true;
  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible) loop();
  }, { threshold: 0.1 });
  observer.observe(canvas);

  function loop() {
    if (!isVisible) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animationFrameId = requestAnimationFrame(loop);
  }
  loop();
}

/* ==========================================================================
   SCROLL FADE-UP INTERSECTION OBSERVER
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up:not(.visible)');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
