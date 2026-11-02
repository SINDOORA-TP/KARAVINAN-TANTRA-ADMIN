/**
 * Karavinan Tantra Peedam - Core Application Logic
 * Features:
 *  - Multilingual Engine (English & Tamil)
 *  - JSON-driven Homam Schedule Loader (schedule.json)
 *  - Sacred Tantra Gallery Loader (gallery.json) with Lightbox
 *  - Daily Thought & Mantra Engine (thoughts.json - day-based auto picker)
 *  - Customer Feedback & Reviews Loader (feedback.json)
 *  - Sacred Numerology Engine:
 *      * Chaldean & Pythagorean Name Number
 *      * Mobile Number Vibration
 *      * Pyramid Number from Date of Birth (Step 4 Algorithm)
 *  - Ambient Gold Particle Canvas
 *  - WhatsApp Enquiries & Form Handlers
 *  - Scroll Animations & Sticky Nav
 */

// Global State
const state = {
  lang: 'en',
  activeHomamTab: 'upcoming',
  homamData: null,
  thoughtsData: null,
  feedbackData: null,
  galleryData: null,
  numerologyData: null,
  lastCalculatedNameResult: null
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
    nav_tantra: 'Tantra Vidhi',
    nav_astrology: 'Astrology',
    nav_numerology: 'Numerology',
    nav_daily_thought: 'Daily Thought',
    nav_feedback: 'Devotee Reviews',
    nav_contact: 'Contact',
    nav_sankalpam_btn: 'Book Sankalpam',

    hero_badge: 'Sri Karavinan Tantra Peedam',
    hero_title: 'Ancient Tantric Wisdom, Sacred Homams & Cosmic Destiny',
    hero_subtitle: 'Awakening divine harmony, supreme protection, and spiritual prosperity through authentic Agamic Vidhi and sacred fire rituals at Sokkanur Sanctum.',
    hero_cta1_title: 'Homam Schedule',
    hero_cta1_desc: 'Upcoming Yagnas & Dates',
    hero_cta2_title: 'Tantra Vidhi',
    hero_cta2_desc: 'Agamic Wisdom & Darshan',
    hero_cta3_title: 'Name Numerology',
    hero_cta3_desc: 'Name & Pyramid Vibrations',
    hero_cta4_title: 'Daily Thought',
    hero_cta4_desc: 'Wisdom & Sacred Mantra',
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

    tantra_plate: 'Sacred Tantra Vidhi',
    tantra_title: 'Agamic Wisdom, Yantras & Sacred Darshan',
    tantra_subtitle: 'Understanding authentic Tantra as a noble science of conscious energy communion, devoid of superstition.',
    tantra_intro_lead: 'Authentic Agamic Tantra is the sacred science of channeling cosmic energies through pure mantra, energized yantra, and consecrated fire.',
    tantra_intro_text: 'At Sokkanur Peedam, Sri Karavinan Swamigal preserves this ancient lineage with highest spiritual purity (Shuddhi). Tantra here is dedicated to healing, dispelling karmic darkness, and awakening inner illumination — rooted in deep devotion to the Supreme Mother and Dharma.',

    astro_plate: 'Vedic Astrology & Parikaram',
    astro_title: 'Cosmic Diagnosis & Divine Remedies',
    astro_subtitle: 'Unravel planetary influences, understand karmic blueprints, and attain peace through precise shastraic remedies.',
    astro_btn_book: 'Book Consultation',

    num_plate: 'Unified Name Numerology',
    num_title: 'Name Number & Sacred Pyramid Vibration',
    num_subtitle: 'Discover your complete Chaldean vibrational code, from individual letter values to the sacred Pyramid Apex.',
    num_calc_btn: 'Reveal Sacred Vibration',
    num_translit_hint: 'Please enter names in English alphabets (A-Z). Dots, spaces, and initials are seamlessly processed.',
    num_step1_label: 'Step 1: Chaldean Letter Values',
    num_step2_label: 'Step 2: Sacred Pyramid Reduction',
    num_name_num_label: 'Name Number',
    num_pyramid_num_label: 'Pyramid Number',
    num_interp_heading: 'Your Numerology Interpretation',
    num_pyramid_guidance_btn: 'Speak with our organiser for guidance',
    num_privacy: '100% Client-Side Privacy: All calculations happen securely inside your browser. No names are stored or uploaded.',
    num_disclaimer: 'Results are for spiritual and informational purposes only.',

    daily_thought_plate: 'Daily Thought & Sacred Mantra',
    daily_thought_title: 'Divine Contemplation for Today',
    daily_thought_subtitle: 'A sacred spark of ancient wisdom and mantra to elevate your mind, cycling automatically at midnight.',
    daily_meaning_label: 'Sacred Meaning & Spiritual Guidance:',
    daily_share_wa: 'Share on WhatsApp',

    feedback_plate: 'What Our Devotees Say',
    feedback_title: 'Blessed Experiences & Sacred Transformations',
    feedback_subtitle: 'Read genuine reflections from families blessed through Sokkanur Sanctum yagnas, horoscopes, and parikarams.',
    feedback_invite_title: 'Share Your Sacred Experience',
    feedback_invite_desc: 'Has your family or business experienced blessings through our Sankalpam? We warmly welcome your genuine thoughts.',
    feedback_invite_btn: 'Send Feedback via WhatsApp',

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
    nav_tantra: 'தந்திர நெறி',
    nav_astrology: 'ஜோதிடம்',
    nav_numerology: 'எண் கணிதம்',
    nav_daily_thought: 'இன்றைய சிந்தனை',
    nav_feedback: 'பக்தர் அனுபவம்',
    nav_contact: 'தொடர்பு',
    nav_sankalpam_btn: 'சங்கல்பம் பதிவு',

    hero_badge: 'ஸ்ரீ கரவினன் தந்திர பீடம்',
    hero_title: 'பவித்ர தந்திர விதிகளும், சக்தி வாய்ந்த ஹோமங்களும், தெய்வீக ஜோதிடமும்',
    hero_subtitle: 'சொக்கனூர் திருத்தலத்தில் 15 ஆண்டுகளுக்கும் மேலாக ஆகம தந்திர நெறிகள், கிரக தோஷ நிவர்த்தி மற்றும் சங்கல்ப யாகங்கள் மூலம் அருள் வழிகாட்டுகிறோம்.',
    hero_cta1_title: 'ஹோம அட்டவணை',
    hero_cta1_desc: 'வரவிருக்கும் யாகங்கள்',
    hero_cta2_title: 'தந்திர நெறி',
    hero_cta2_desc: 'ஆகம தத்துவம் & தரிசனம்',
    hero_cta3_title: 'பெயர் எண் கணிதம்',
    hero_cta3_desc: 'பெயர் & பிரமிடு அதிர்வு',
    hero_cta4_title: 'இன்றைய சிந்தனை',
    hero_cta4_desc: 'தினசரி மந்திரம் & பொருள்',
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

    tantra_plate: 'பவித்ர தந்திர நெறி',
    tantra_title: 'ஆகம தந்திரம், யந்திரங்கள் & திருத்தல தரிசனம்',
    tantra_subtitle: 'மூடநம்பிக்கைகள் அற்ற, உண்மையான ஆகம தந்திர தத்துவத்தையும் அதன் ஆன்ம விழிப்புணர்வையும் உணருங்கள்.',
    tantra_intro_lead: 'ஆகம தந்திரம் என்பது தூய மந்திரம், உருவேற்றப்பட்ட யந்திரம் மற்றும் அக்னி ஹோமங்கள் மூலம் பிரபஞ்ச சக்திகளை ஆவாகனம் செய்யும் உன்னத ஆன்மீக விஞ்ஞானமாகும்.',
    tantra_intro_text: 'சொக்கனூர் பீடத்தில் ஸ்ரீ கரவினன் சுவாமிகள் இந்த மரபினை ஆத்ம சுத்தியுடன் போற்றி வருகிறார். துன்பங்களை நீக்குவதற்கும், எதிர்மறை சக்திகளை அழிப்பதற்கும், மனிதனின் உள்முக ஒளியை மலரச் செய்வதற்கும் இந்த நெறி பயன்படுகிறது.',

    astro_plate: 'வேத ஜோதிடம் & பரிகாரம்',
    astro_title: 'கிரக நிலைகளும் தெய்வீக நிவர்த்திகளும்',
    astro_subtitle: 'உங்கள் ஜனன கால ஜாதகத்தை நுணுக்கமாக ஆராய்ந்து, வாழ்வின் தடைகளை நீக்கும் துல்லியமான பரிகாரங்கள்.',
    astro_btn_book: 'ஆலோசனைக்கு முன்பதிவு',

    num_plate: 'ஒருங்கிணைந்த பெயர் எண் கணிதம்',
    num_title: 'பெயர் எண்ணும் பவித்ர பிரமிடு அதிர்வும்',
    num_subtitle: 'கல்தியன் சாஸ்திரத்தின்படி எழுத்துக்களின் மதிப்பு முதல் பிரமிடு சிகரம் வரையிலான உங்கள் அதிர்வை அறியுங்கள்.',
    num_calc_btn: 'அதிர்வை கணக்கிடுக',
    num_translit_hint: 'ஆங்கில எழுத்துக்களில் (A-Z) பெயரை உள்ளிடவும். புள்ளிகள், இடைவெளிகள் தானாக ஏற்றுக்கொள்ளப்படும்.',
    num_step1_label: 'படி 1: கல்தியன் எழுத்து மதிப்புகள்',
    num_step2_label: 'படி 2: பிரமிடு கூடுகை கணக்கீடு',
    num_name_num_label: 'பெயர் எண்',
    num_pyramid_num_label: 'பிரமிடு எண்',
    num_interp_heading: 'உங்கள் எண் கணித பலன்',
    num_pyramid_guidance_btn: 'குருநாதரின் வழிகாட்டுதல் பெற',
    num_privacy: '🔒 100% பிரைவசி: உங்கள் பெயர் எங்கும் சேமிக்கப்படாது, உங்கள் உலாவியிலேயே கணக்கிடப்படுகிறது.',
    num_disclaimer: 'முடிவுகள் ஆன்மீக மற்றும் தகவல் விழிப்புணர்வு நோக்கத்திற்காக மட்டுமே.',

    daily_thought_plate: 'இன்றைய சிந்தனை & மந்திரம்',
    daily_thought_title: 'இன்றைய ஆன்மீக ஒளி',
    daily_thought_subtitle: 'நமது ஆன்மாவை உயர்த்தும் பவித்ர மந்திரமும் பொருளும்; நள்ளிரவில் தானாகவே மாறும்.',
    daily_meaning_label: 'தெய்வீக பொருளும் ஆன்மீக வழிகாட்டலும்:',
    daily_share_wa: 'வாட்ஸ்அப்பில் பகிர்க',

    feedback_plate: 'பக்தர்களின் அனுபவங்கள்',
    feedback_title: 'அருள் பெற்ற பக்தர்களின் உண்மை அனுபவங்கள்',
    feedback_subtitle: 'சொக்கனூர் பீட ஹோமங்கள், ஜாதக வழிகாட்டல் மற்றும் பரிகாரங்கள் மூலம் பயனடைந்த குடும்பங்களின் பகிர்வுகள்.',
    feedback_invite_title: 'உங்கள் அனுபவத்தை பகிருங்கள்',
    feedback_invite_desc: 'சொக்கனூர் பீட சங்கல்பம் மூலம் தங்கள் இல்லத்தில் அமைதியும் நன்மைகளும் கைகூடியுள்ளதா? தங்கள் அனுபவத்தை அன்புடன் வரவேற்கிறோம்.',
    feedback_invite_btn: 'வாட்ஸ்அப்பில் அனுபவம் பகிர்க',

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
   UNIFIED NAME NUMEROLOGY (Chaldean Letter Values & Pyramid Reduction)
   ========================================================================== */
const VALUES = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

const reduce = n => { 
  while (n > 9) n = [...String(n)].reduce((a, b) => a + +b, 0); 
  return n; 
};

function analyseName(raw) {
  const letters = raw.toUpperCase().replace(/[^A-Z]/g, '').split('');
  if (!letters.length) return null;
  const values = letters.map(l => VALUES[l]);

  const nameTotal = values.reduce((a, b) => a + b, 0);
  const nameNumber = reduce(nameTotal);

  // pyramid: add neighbouring pairs until one number is left
  const rows = [values];
  let row = values;
  while (row.length > 1) {
    row = row.slice(1).map((v, i) => row[i] + v);
    rows.push(row);
  }
  const pyramidNumber = reduce(row[0]);
  return { letters, values, nameTotal, nameNumber, rows, pyramidNumber };
}

const NUMBER_MEANINGS = {
  1: {
    title: 'The Sovereign (Sun / Surya)',
    title_ta: 'சூரிய ஆதிக்கம் (தலைமை & வெற்றி)',
    planet: 'Sun (Surya Bhagavan)',
    planet_ta: 'சூரிய பகவான்',
    summary: 'A powerful vibration of leadership, independence, vitality, and pioneering initiative. Commands respect and paves new paths with visionary determination.',
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
  loadGallery();
  loadNumerologyData();
  initUnifiedNameNumerology();
  loadDailyThought();
  loadFeedback();
  initContactForm();
});

/* ==========================================================================
   LANGUAGE ENGINE
   ========================================================================== */
function initLanguage() {
  const toggleBtn = document.getElementById('langToggleBtn');
  if (!toggleBtn) return;

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

  // Re-render dynamic sections with localized text
  if (state.homamData) renderHomamCards();
  if (state.galleryData) renderGallery();
  if (state.thoughtsData) renderDailyThought();
  if (state.feedbackData) renderFeedbackCards();

  // Re-render unified name numerology if active
  if (state.lastCalculatedNameResult) {
    renderUnifiedNumerologyResult(state.lastCalculatedNameResult);
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
    console.warn('Could not load schedule.json', err);
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

    const waText = encodeURIComponent(
      `Namaste Sri Karavinan Swamigal,\n\nI would like to enquire about the sacred "${item.name}" scheduled for ${item.display_date} at Sokkanur Sanctum.\nPlease share registration and Sankalpam details.`
    );
    const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${waText}`;

    return `
      <div class="gold-framed-card homam-card fade-up">
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

  initScrollAnimations();
}

/* ==========================================================================
   TANTRA SECTION GALLERY (gallery.json with Lightbox)
   ========================================================================== */
async function loadGallery() {
  const container = document.getElementById('tantraGallery');
  if (!container) return;

  try {
    const res = await fetch('gallery.json');
    if (!res.ok) throw new Error('Failed to fetch gallery.json');
    state.galleryData = await res.json();
    renderGallery();
  } catch (err) {
    console.warn('Could not load gallery.json', err);
  }
}

function renderGallery() {
  const container = document.getElementById('tantraGallery');
  if (!container || !state.galleryData) return;

  const isTamil = state.lang === 'ta';

  container.innerHTML = state.galleryData.map((item, idx) => {
    const title = isTamil && item.title_ta ? item.title_ta : item.title;
    const caption = isTamil && item.caption_ta ? item.caption_ta : item.caption;

    if (item.placeholder || !item.src) {
      return `
        <figure class="fade-up" tabindex="0" title="${title}">
          <div class="gallery-placeholder">
            <svg class="gallery-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <circle cx="12" cy="12" r="10" stroke="url(#goldGrad1)"/>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" stroke="url(#goldGrad1)"/>
              <circle cx="12" cy="12" r="4" fill="url(#goldGrad1)" opacity="0.3"/>
            </svg>
            <div class="gallery-placeholder-title">${title}</div>
            <div class="gallery-placeholder-sub">${isTamil ? 'பவித்ர தரிசனம் விரைவில்' : 'Sacred Darshan / Upcoming'}</div>
          </div>
        </figure>
      `;
    }

    return `
      <figure class="fade-up" tabindex="0" data-idx="${idx}">
        <img src="${item.src}" alt="${title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'gallery-placeholder\\'><div class=\\'gallery-placeholder-title\\'>${title}</div></div>'">
        <figcaption class="gallery-caption">
          <span class="gallery-caption-title">${title}</span>
          <span>${caption}</span>
        </figcaption>
      </figure>
    `;
  }).join('');

  // Add click events for Lightbox
  container.querySelectorAll('figure[data-idx]').forEach(fig => {
    fig.addEventListener('click', () => {
      const idx = fig.getAttribute('data-idx');
      const item = state.galleryData[idx];
      if (item && item.src) {
        const title = isTamil && item.title_ta ? item.title_ta : item.title;
        const caption = isTamil && item.caption_ta ? item.caption_ta : item.caption;
        openLightbox(item.src, `${title} — ${caption}`);
      }
    });
  });

  initScrollAnimations();
}

function openLightbox(src, desc) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('lightboxDesc');
  if (!modal || !img) return;

  img.src = src;
  if (captionEl) captionEl.textContent = desc;
  modal.classList.add('active');
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) modal.classList.remove('active');
}

/* ==========================================================================
   DAILY THOUGHT & MANTRA (thoughts.json - Step 3)
   ========================================================================== */
async function loadDailyThought() {
  try {
    const res = await fetch('thoughts.json');
    if (!res.ok) throw new Error('Failed to fetch thoughts.json');
    state.thoughtsData = await res.json();
    renderDailyThought();
  } catch (err) {
    console.warn('Could not load thoughts.json', err);
  }
}

function renderDailyThought() {
  if (!state.thoughtsData || !state.thoughtsData.length) return;

  // Day-based automatic selection that rotates daily at midnight
  const dayIndex = Math.floor(Date.now() / 86400000);
  const thought = state.thoughtsData[dayIndex % state.thoughtsData.length];

  const isTamil = state.lang === 'ta';
  const mantraText = isTamil && thought.mantra_ta ? thought.mantra_ta : thought.mantra;
  const thoughtTitle = isTamil && thought.thought_ta ? thought.thought_ta : thought.thought;
  const meaningText = isTamil && thought.meaning_ta ? thought.meaning_ta : thought.meaning;

  // Formatted date
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString(isTamil ? 'ta-IN' : 'en-US', options);

  const dateBadge = document.getElementById('dailyThoughtDate');
  const mantraEl = document.getElementById('dailyMantraText');
  const themeEl = document.getElementById('dailyThoughtTheme');
  const meaningEl = document.getElementById('dailyMeaningText');
  const shareBtn = document.getElementById('dailyShareWaBtn');

  if (dateBadge) dateBadge.textContent = dateStr;
  if (mantraEl) mantraEl.textContent = mantraText;
  if (themeEl) themeEl.textContent = `✦ ${thoughtTitle} ✦`;
  if (meaningEl) meaningEl.textContent = meaningText;

  if (shareBtn) {
    const shareMessage = encodeURIComponent(
      `*Sri Karavinan Tantra Peedam - Daily Sacred Thought*\n` +
      `📅 *${dateStr}*\n\n` +
      `"${mantraText}"\n\n` +
      `✦ *${thoughtTitle}*\n` +
      `*Meaning:* ${meaningText}\n\n` +
      `_Read daily blessings at https://karavinantantra.org_`
    );
    shareBtn.href = `https://wa.me/?text=${shareMessage}`;
  }
}

/* ==========================================================================
   CUSTOMER FEEDBACK & REVIEWS (feedback.json - Step 2)
   ========================================================================== */
async function loadFeedback() {
  const grid = document.getElementById('feedbackCardsGrid');
  if (!grid) return;

  try {
    const res = await fetch('feedback.json');
    if (!res.ok) throw new Error('Failed to fetch feedback.json');
    state.feedbackData = await res.json();
    renderFeedbackCards();
  } catch (err) {
    console.warn('Could not load feedback.json, rendering invite', err);
    state.feedbackData = [];
    renderFeedbackCards();
  }
}

function renderFeedbackCards() {
  const grid = document.getElementById('feedbackCardsGrid');
  if (!grid) return;

  const isTamil = state.lang === 'ta';
  const list = state.feedbackData || [];

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="gold-framed-card invite-feedback-card" style="grid-column: 1/-1;">
        <h4>${isTamil ? 'உங்கள் அனுபவத்தை முதலில் பகிருங்கள்' : 'Be the First to Share Your Experience'}</h4>
        <p>${isTamil ? 'சொக்கனூர் பீட ஹோமங்கள் அல்லது ஜோதிட ஆலோசனைகள் மூலம் நீங்கள் பெற்ற நன்மைகளை பகிருங்கள்.' : 'Have you participated in our sacred homams or consultations? We would love to hear your blessed experience.'}</p>
        <a href="https://wa.me/${CONFIG.whatsappNumber}?text=Namaste%20Swamigal,%20I%20would%20like%20to%20share%20my%20experience%20with%20Peedam." target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
          ${isTamil ? 'வாட்ஸ்அப்பில் அனுபவம் பகிர்க' : 'Share Experience on WhatsApp'}
        </a>
      </div>
    `;
    return;
  }

  let html = list.map(item => {
    const text = isTamil && item.text_ta ? item.text_ta : item.text;
    const initial = item.name ? item.name.charAt(0).toUpperCase() : '✦';

    // Optional rating: hide stars if missing/null
    let starsHtml = '';
    if (item.rating && Number(item.rating) > 0) {
      starsHtml = `<div class="star-rating" aria-label="${item.rating} stars">${'★'.repeat(Math.min(5, Math.max(1, item.rating)))}</div>`;
    }

    return `
      <div class="gold-framed-card feedback-card fade-up">
        <svg class="corner-flourish corner-tl" viewBox="0 0 20 20" fill="none"><path d="M0 0 H18 V4 H4 V18 H0 Z" fill="url(#goldGrad1)"/></svg>
        <svg class="corner-flourish corner-br" viewBox="0 0 20 20" fill="none"><path d="M0 0 H18 V4 H4 V18 H0 Z" fill="url(#goldGrad1)"/></svg>

        <div>
          <svg class="quote-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          ${starsHtml}
          <p class="feedback-text">"${text}"</p>
        </div>

        <div class="feedback-author">
          <div class="author-avatar">${initial}</div>
          <div class="author-info">
            <h4>${item.name}</h4>
            <span>${item.place}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Add invite card to encourage authentic submissions
  html += `
    <div class="gold-framed-card invite-feedback-card fade-up">
      <h4>${isTamil ? 'உங்கள் அனுபவத்தை பகிருங்கள்' : 'Share Your Sacred Experience'}</h4>
      <p>${isTamil ? 'சொக்கனூர் பீடத்தில் நீங்கள் பெற்ற நன்மைகள் மற்றும் ஆன்மீக மாற்றங்களை எங்களுடன் பகிருங்கள்.' : 'Has your family or business experienced divine grace through our Sankalpams? We welcome your heartfelt reflection.'}</p>
      <a href="https://wa.me/${CONFIG.whatsappNumber}?text=Namaste%20Swamigal,%20I%20would%20like%20to%20share%20my%20devotee%20feedback." target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
        ${isTamil ? 'வாட்ஸ்அப்பில் பகிர்க' : 'Send Feedback via WhatsApp'}
      </a>
    </div>
  `;

  grid.innerHTML = html;
  initScrollAnimations();
}

/* ==========================================================================
   UNIFIED NAME NUMEROLOGY ENGINE (Chaldean Name & Pyramid Number)
   ========================================================================== */
async function loadNumerologyData() {
  try {
    const res = await fetch('numerology.json');
    if (!res.ok) throw new Error('Failed to fetch numerology.json');
    state.numerologyData = await res.json();
    if (state.lastCalculatedNameResult) {
      renderUnifiedNumerologyResult(state.lastCalculatedNameResult);
    }
  } catch (err) {
    console.warn('Could not load numerology.json, falling back to local meanings', err);
  }
}

function initUnifiedNameNumerology() {
  const calcBtn = document.getElementById('unifiedCalculateBtn');
  const input = document.getElementById('unifiedNameInput');

  if (calcBtn) {
    calcBtn.addEventListener('click', handleNameCalculation);
  }

  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleNameCalculation();
    });
  }
}

function handleNameCalculation() {
  const input = document.getElementById('unifiedNameInput');
  const errorAlert = document.getElementById('unifiedErrorAlert');
  const resultsWrap = document.getElementById('unifiedResultsWrap');
  const isTamil = state.lang === 'ta';

  if (!input) return;
  const rawInput = input.value.trim();

  // Edge case 1: Empty input
  if (!rawInput) {
    if (errorAlert) {
      errorAlert.textContent = isTamil 
        ? 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்.' 
        : 'Please enter a name to reveal its sacred vibration.';
      errorAlert.style.display = 'block';
    }
    if (resultsWrap) resultsWrap.style.display = 'none';
    return;
  }

  // Edge case 2: Tamil script detected -> polite English transliteration reminder
  if (/[\u0B80-\u0BFF]/.test(rawInput)) {
    if (errorAlert) {
      errorAlert.textContent = isTamil 
        ? 'தயவுசெய்து ஆங்கில எழுத்துக்களில் (எ.கா. Kandasamy) பெயரை உள்ளிடவும். சாஸ்திர ரீதியான எழுத்துக்கூட்டுக்கு குருநாதரை அணுகலாம்.' 
        : 'Please enter the name using English spelling (e.g., Kandasamy or S. Arul). For traditional transliterations, feel free to speak with our organiser.';
      errorAlert.style.display = 'block';
    }
    if (resultsWrap) resultsWrap.style.display = 'none';
    return;
  }

  // Execute Chaldean & Pyramid Algorithm
  const result = analyseName(rawInput);

  // Edge case 3: No valid alphabetic characters (only numbers or symbols)
  if (!result || !result.letters.length) {
    if (errorAlert) {
      errorAlert.textContent = isTamil 
        ? 'பெயரில் சரியான ஆங்கில எழுத்துக்களை (A-Z) உள்ளிடவும். புள்ளிகள் மற்றும் இடைவெளிகள் ஏற்றுக்கொள்ளப்படும்.' 
        : 'Please enter valid alphabetic characters (A-Z). Dots and spaces are accepted.';
      errorAlert.style.display = 'block';
    }
    if (resultsWrap) resultsWrap.style.display = 'none';
    return;
  }

  // Clear any previous error
  if (errorAlert) errorAlert.style.display = 'none';

  // Store for language reactivity
  state.lastCalculatedNameResult = { rawInput, ...result };

  // Render unified output
  renderUnifiedNumerologyResult(state.lastCalculatedNameResult);

  // Smoothly reveal
  if (resultsWrap) {
    resultsWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function renderUnifiedNumerologyResult(data) {
  if (!data) return;

  const { rawInput, letters, values, nameTotal, nameNumber, rows, pyramidNumber } = data;
  const isTamil = state.lang === 'ta';

  const resultsWrap = document.getElementById('unifiedResultsWrap');
  const letterTilesWrap = document.getElementById('letterTilesWrap');
  const nameTotalSummary = document.getElementById('nameTotalSummary');
  const pyramidTriangleWrap = document.getElementById('pyramidTriangleWrap');
  const bannerNameNumber = document.getElementById('bannerNameNumber');
  const bannerPyramidNumber = document.getElementById('bannerPyramidNumber');
  const interpHeading = document.getElementById('interpHeading');
  const interpPlanet = document.getElementById('interpPlanet');
  const interpToneBox = document.getElementById('interpToneBox');
  const interpNameDetails = document.getElementById('interpNameDetails');
  const interpWaGuidanceBtn = document.getElementById('interpWaGuidanceBtn');

  if (!resultsWrap) return;
  resultsWrap.style.display = 'block';

  // Step 1: Letter Values with small gold tiles (S3 A1 I1)
  if (letterTilesWrap) {
    letterTilesWrap.innerHTML = letters.map((char, i) => `
      <span class="letter-tile" title="${char} = ${values[i]}">
        <span class="letter-tile-char">${char}</span>
        <span class="letter-tile-val">${values[i]}</span>
      </span>
    `).join('');
  }

  // Step 2: Calculation summary and centered pyramid triangle
  if (nameTotalSummary) {
    const sumBreakdown = values.join(' + ');
    const reductionArrow = nameTotal !== nameNumber ? ` ➔ <strong>${nameNumber}</strong>` : '';
    nameTotalSummary.innerHTML = `
      <div>
        <span>${isTamil ? 'பெயர் எண் கூடுகை:' : 'Name Number Sum:'}</span>
        <code>${sumBreakdown} = ${nameTotal}${reductionArrow}</code>
      </div>
    `;
  }

  if (pyramidTriangleWrap) {
    pyramidTriangleWrap.innerHTML = rows.map((rowArr, rowIdx) => {
      const isApex = rowIdx === rows.length - 1;
      const cellsHtml = rowArr.map(val => `
        <span class="unified-pyramid-cell ${isApex ? 'apex' : ''}">${val}</span>
      `).join('');
      return `<div class="unified-pyramid-row" style="animation-delay: ${rowIdx * 0.05}s">${cellsHtml}</div>`;
    }).join('');
  }

  // Step 3: Result Banner in red receipt-style plate
  if (bannerNameNumber) bannerNameNumber.textContent = nameNumber;
  if (bannerPyramidNumber) bannerPyramidNumber.textContent = pyramidNumber;

  // Step 4: Numerology Interpretation (High-contrast cream panel)
  const dict = state.numerologyData || {};
  const pyramidData = dict[pyramidNumber] || (NUMBER_MEANINGS && NUMBER_MEANINGS[pyramidNumber]) || {};
  const nameData = dict[nameNumber] || (NUMBER_MEANINGS && NUMBER_MEANINGS[nameNumber]) || {};

  // Step 4 Tone logic: 2, 4, 5, 7, 8 gentle challenge; 1, 3, 6, 9 favourable
  const isChallenge = [2, 4, 5, 7, 8].includes(pyramidNumber);

  if (interpHeading) {
    const archName = isTamil && pyramidData.archetype_ta ? pyramidData.archetype_ta : (pyramidData.archetype || `Number ${pyramidNumber}`);
    interpHeading.textContent = isTamil 
      ? `பிரமிடு எண் ${pyramidNumber}: ${archName}` 
      : `Pyramid Number ${pyramidNumber}: ${archName}`;
  }

  if (interpPlanet) {
    const planetText = isTamil && pyramidData.planet_ta ? pyramidData.planet_ta : (pyramidData.planet || 'Cosmic Influence');
    interpPlanet.textContent = `${isTamil ? 'அதிபதி கிரகம்: ' : 'Planetary Influence: '} ${planetText}`;
  }

  if (interpToneBox) {
    interpToneBox.className = isChallenge ? 'interp-challenge-box' : 'interp-favourable-box';
    const interpText = isTamil && pyramidData.pyramid_interpretation_ta 
      ? pyramidData.pyramid_interpretation_ta 
      : (pyramidData.pyramid_interpretation || 'According to traditional numerology, guidance, devotion and sincere effort are said to help.');
    interpToneBox.innerHTML = `<p>${interpText}</p>`;
  }

  if (interpNameDetails) {
    const nameInterpText = isTamil && nameData.name_interpretation_ta 
      ? nameData.name_interpretation_ta 
      : (nameData.name_interpretation || 'Sacred name vibration.');
    const nameArch = isTamil && nameData.archetype_ta ? nameData.archetype_ta : (nameData.archetype || '');
    
    interpNameDetails.innerHTML = `
      <p style="margin-top: 1rem;">
        <strong>${isTamil ? 'பெயர் எண் அதிர்வு' : 'Name Number Vibration'} (${nameNumber}${nameArch ? ` — ${nameArch}` : ''}):</strong>
        ${nameInterpText}
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-top: 1.25rem; font-size: 0.92rem; color: #4A3515; border-top: 1px dashed rgba(138, 106, 31, 0.4); padding-top: 1rem;">
        <div><strong>${isTamil ? 'சுப நாள்:' : 'Auspicious Day:'}</strong> ${pyramidData.auspicious_day || 'Auspicious Days'}</div>
        <div><strong>${isTamil ? 'மங்கள நிறம்:' : 'Sacred Color:'}</strong> ${pyramidData.sacred_color || 'Gold & White'}</div>
        <div><strong>${isTamil ? 'திசை:' : 'Direction:'}</strong> ${pyramidData.direction || 'East'}</div>
      </div>
    `;
  }

  // Soft Guidance Action Button
  if (interpWaGuidanceBtn) {
    const waText = encodeURIComponent(
      `Namaste Sri Karavinan Swamigal,\n\nI calculated my Name Numerology on the website:\n✦ Name: ${rawInput}\n✦ Name Number: ${nameNumber}\n✦ Pyramid Number: ${pyramidNumber}\n\nI seek your sacred guidance and parikaram recommendations.`
    );
    interpWaGuidanceBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${waText}`;
  }
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
      this.hue = Math.floor(Math.random() * 15) + 38;
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
