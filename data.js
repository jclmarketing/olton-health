// Shared site data
const BIZ = {
  name: 'Olton Health and Performance',
  short: 'Olton Health',
  tagline: 'Our thing is getting you back doing your thing.',
  phone: '0121 314 0666',
  phoneRaw: '+441213140666',
  email: 'hello@oltonhealth.com',
  address: '114 Kineton Green Road, Olton, Solihull, B92 7EE',
  addressLines: ['114 Kineton Green Road', 'Olton', 'Solihull', 'B92 7EE'],
  postcode: 'B92 7EE',
  region: 'Solihull',
  founded: 2014,
  bookUrl: 'https://www.oltonhealth.com/book-online/',
  reviewUrl: 'https://olton.health/review',
  facebook: 'https://www.facebook.com/OltonHealthandPerformance/',
  hours: [
    ['Monday', '9am – 3pm, 6pm – 9pm'],
    ['Tuesday', '9am – 6pm'],
    ['Wednesday', '9am – 9pm'],
    ['Thursday', '9am – 6pm'],
    ['Friday', '9am – 6pm'],
    ['Saturday', 'By arrangement'],
    ['Sunday', '10am – 1pm'],
  ],
  geo: { lat: 52.4444, lng: -1.7758 },
  domain: 'oltonhealth.co.uk', // we'll use the vercel preview, but canonicals go here
  baseUrl: 'https://oltonhealth.com',
};

const SERVICES = [
  {
    slug: 'osteopathy',
    title: 'Osteopathy',
    short: 'Hands-on care for back, neck, joint and sports pain.',
    summary: 'Evidence-led osteopathy in Solihull. Our senior osteopaths use manual techniques, mobilisation and tailored rehab to settle pain and restore movement — without keeping you longer than you need.',
    treats: ['Lower back pain & sciatica','Neck pain & tension headaches','Shoulder, hip and knee pain','Sports injuries','Posture & repetitive strain','Post-accident pain'],
    icon: 'spine',
  },
  {
    slug: 'physiotherapy',
    title: 'Physiotherapy',
    short: 'HCPC-registered chartered physio for injury, surgery recovery and chronic pain.',
    summary: 'Chartered physiotherapy combining manual therapy, exercise prescription and education — built around your goals, whether that\'s lifting a child without pain or returning to sport.',
    treats: ['Post-surgical rehabilitation','Sports & musculoskeletal injuries','Chronic pain & arthritis','Whiplash & RTA recovery','Tendon problems','Workplace strain'],
    icon: 'activity',
  },
  {
    slug: 'sports-massage',
    title: 'Sports Massage',
    short: 'Recovery, mobility and performance massage for active bodies.',
    summary: 'Deep-tissue and sports massage for runners, lifters, golfers, gardeners — anyone who pushes their body and wants to keep moving well. Targeted soft-tissue work to release tension, reduce DOMS and improve range.',
    treats: ['Post-event recovery','Muscle tightness & knots','Marathon & race prep','Office-related tension','DIY & gardening soreness','Maintenance for active lifestyles'],
    icon: 'hand',
  },
  {
    slug: 'medical-acupuncture',
    title: 'Medical Acupuncture',
    short: 'Western medical acupuncture & dry needling for pain.',
    summary: 'Western medical acupuncture grounded in modern anatomy and physiology. We use single-use sterile needles to relieve musculoskeletal pain, reduce muscle tension and support your recovery — registered with Solihull Council.',
    treats: ['Chronic muscle pain','Tension-type headaches','Trigger points','Tennis & golfer\'s elbow','Plantar fasciitis','Neck & shoulder pain'],
    icon: 'needle',
  },
  {
    slug: 'pilates',
    title: '1:1 Pilates',
    short: 'Private clinical Pilates tailored to your body.',
    summary: 'One-to-one clinical Pilates with a qualified clinician. We build flexibility, strength and control around your specific issue — pain, posture, performance or post-injury — at your own pace.',
    treats: ['Persistent back pain','Pelvic floor & post-natal','Hypermobility','Poor posture','Pre/post-surgery conditioning','Older adults staying active'],
    icon: 'flow',
  },
  {
    slug: 'strength-conditioning',
    title: 'Strength & Conditioning',
    short: 'Coached rehab and progressive loading to make you bulletproof.',
    summary: 'Coached strength and conditioning blends rehab and performance. We progressively load tissues, build resilience and turn rehab into long-term capability — for athletes and anyone who refuses to be fragile.',
    treats: ['Late-stage rehab','Return-to-sport','Tendon loading programmes','Strength for over-50s','Pre-hab for surgery','Resilience for desk workers'],
    icon: 'kettlebell',
  },
];

const TEAM = [
  { name: 'Rosi Sexton', role: 'Senior Osteopath & Clinic Lead', bio: 'GOsC-registered (#7588) osteopath with a degree from Oxford Brookes (2010). A former #1-ranked female flyweight MMA athlete and the first British woman to fight in the UFC, Rosi pairs an academic background in mathematics (Cambridge) and computer science (PhD Manchester) with deep clinical experience in sports injury and chronic musculoskeletal pain.' },
  { name: 'Rhiannon Needham', role: 'Osteopath', bio: 'Trained at the London School of Osteopathy with a dissertation in osteoporosis. A lifelong sportswoman — swimming, athletics, football and currently playing rugby for Harlequin Amateur — Rhiannon brings a hands-on, athlete-centred approach to pain and performance.' },
  { name: 'Kruti Kulkarni', role: 'Physiotherapist & Acupuncturist', bio: 'BSc Sport, Health & Exercise Science; MSc (Pre-Reg) Physiotherapy. Chartered Society of Physiotherapy member and HCPC-registered. Combines NHS-trained musculoskeletal expertise with manual therapy, exercise rehab and acupuncture.' },
  { name: 'Matt Thorp', role: 'Massage Therapist & Physiotherapist', bio: 'A martial artist (Wing Chun, kickboxing, BJJ) whose own injury history shapes his hands-on approach. Specialises in sports massage and physiotherapy for active people who want to keep moving.' },
  { name: 'Steve Caudwell', role: 'Clinic Manager', bio: 'Runs operations, systems and client care. A keen rock climber and cyclist — happy to hear feedback at steve.caudwell@oltonhealth.com.' },
];

const AREAS = [
  { slug: 'olton', name: 'Olton', postcode: 'B92', distance: '0 miles', notes: 'Our home. The clinic sits on Kineton Green Road at the corner with Brook Lane — about ten minutes\' walk from Olton railway station and well-served by the A12 bus.' },
  { slug: 'solihull', name: 'Solihull', postcode: 'B91', distance: '2 miles', notes: 'Solihull town centre is a short drive — under ten minutes from Touchwood and Mell Square. Easy access via the A41 Warwick Road.' },
  { slug: 'shirley', name: 'Shirley', postcode: 'B90', distance: '3 miles', notes: 'Direct route via Stratford Road and Lode Lane. Patients from Parkgate, Cranmore and Monkspath are regular faces in our diary.' },
  { slug: 'knowle', name: 'Knowle', postcode: 'B93', distance: '4 miles', notes: 'A pretty drive down the A41 — Knowle and Dorridge residents make up a strong part of our patient base, often combining appointments with errands in Solihull.' },
  { slug: 'dorridge', name: 'Dorridge', postcode: 'B93', distance: '5 miles', notes: 'Quick run via Knowle or the A4023. Dorridge station is one stop from Olton on the Chiltern line if you prefer to travel by train.' },
  { slug: 'bentley-heath', name: 'Bentley Heath', postcode: 'B93', distance: '5 miles', notes: 'Easy access via Widney Manor Road and Tilehouse Lane.' },
  { slug: 'acocks-green', name: 'Acocks Green', postcode: 'B27', distance: '1.5 miles', notes: 'We\'re on the A12 bus route between Solihull and Acocks Green, and it\'s a short hop down Olton Boulevard East.' },
  { slug: 'hall-green', name: 'Hall Green', postcode: 'B28', distance: '2.5 miles', notes: 'Quick journey via the A34 Stratford Road or Robin Hood Lane.' },
  { slug: 'yardley', name: 'Yardley', postcode: 'B25', distance: '3 miles', notes: 'Straight run along the A45 or via Hobs Moat Road.' },
  { slug: 'sheldon', name: 'Sheldon', postcode: 'B26', distance: '2.5 miles', notes: 'Just down the A45 — handy for patients near Birmingham Airport, NEC and the Coventry Road.' },
  { slug: 'marston-green', name: 'Marston Green', postcode: 'B37', distance: '5 miles', notes: 'A clear run across the A45 or via Coleshill Heath Road. Plenty of patients combine appointments with airport business.' },
  { slug: 'elmdon', name: 'Elmdon', postcode: 'B26', distance: '2 miles', notes: 'Right on our doorstep — Elmdon Park is a few minutes away and the A45 makes access easy.' },
  { slug: 'tyseley', name: 'Tyseley', postcode: 'B11', distance: '2.5 miles', notes: 'Direct route via Warwick Road and Reddings Lane — ideal for patients commuting from the Tyseley industrial area.' },
  { slug: 'sparkhill', name: 'Sparkhill', postcode: 'B11', distance: '4 miles', notes: 'Easy run along Stratford Road — good for patients across south-east Birmingham.' },
  { slug: 'moseley', name: 'Moseley', postcode: 'B13', distance: '5 miles', notes: 'Travel via the A435 or Wake Green Road. A short drive for patients south of the city.' },
  { slug: 'kings-heath', name: 'Kings Heath', postcode: 'B14', distance: '5.5 miles', notes: 'Best reached via the A435 or Yardley Wood Road. Plenty of parking on arrival at the clinic.' },
  { slug: 'hockley-heath', name: 'Hockley Heath', postcode: 'B94', distance: '7 miles', notes: 'A pleasant drive via the A3400 or M42 J4 — combine with a stop in Knowle on the way.' },
  { slug: 'dickens-heath', name: 'Dickens Heath', postcode: 'B90', distance: '5 miles', notes: 'Easy run via Tanworth Lane and Dog Kennel Lane.' },
  { slug: 'cheswick-green', name: 'Cheswick Green', postcode: 'B90', distance: '5 miles', notes: 'Quick journey via Creynolds Lane or the A34.' },
  { slug: 'balsall-common', name: 'Balsall Common', postcode: 'CV7', distance: '8 miles', notes: 'A direct route via the A452 — popular with patients combining appointments with Solihull shopping.' },
  { slug: 'castle-bromwich', name: 'Castle Bromwich', postcode: 'B36', distance: '6 miles', notes: 'Quick access via the A452 Chester Road and M6 J5.' },
  { slug: 'chelmsley-wood', name: 'Chelmsley Wood', postcode: 'B37', distance: '6 miles', notes: 'Travel via the A45 or Coleshill Heath Road.' },
  { slug: 'hampton-in-arden', name: 'Hampton-in-Arden', postcode: 'B92', distance: '7 miles', notes: 'Scenic drive via the A452. Hampton-in-Arden station is two stops from Olton on the Chiltern line.' },
  { slug: 'meriden', name: 'Meriden', postcode: 'CV7', distance: '8 miles', notes: 'Easy access via the A45 — well worth the drive for evidence-based, hands-on care.' },
  { slug: 'bickenhill', name: 'Bickenhill', postcode: 'B92', distance: '4 miles', notes: 'Just off the A45 between the NEC and Olton — a quick journey at most times of day.' },
  { slug: 'monkspath', name: 'Monkspath', postcode: 'B90', distance: '4 miles', notes: 'Direct via Stratford Road or the M42 J4 link — handy for patients commuting along the Solihull bypass.' },
  { slug: 'hillfield', name: 'Hillfield', postcode: 'B90', distance: '4 miles', notes: 'Quick run via Monkspath Hall Road and Hillfield Road.' },
];

const CONDITIONS = [
  { slug: 'back-pain', title: 'Back Pain', short: 'From acute disc flare-ups to long-standing stiffness.' },
  { slug: 'neck-pain', title: 'Neck Pain & Tension Headaches', short: 'Desk-related neck pain, cervicogenic headache, whiplash.' },
  { slug: 'sciatica', title: 'Sciatica & Nerve Pain', short: 'Targeted treatment for radiating leg pain and pins-and-needles.' },
  { slug: 'sports-injuries', title: 'Sports Injuries', short: 'From acute injury to return-to-play rehab.' },
  { slug: 'knee-pain', title: 'Knee Pain', short: 'Runner\'s knee, ITB, post-op knees, osteoarthritis.' },
  { slug: 'shoulder-pain', title: 'Shoulder Pain', short: 'Rotator cuff, frozen shoulder, impingement.' },
];

const FAQS = [
  { q: 'Do I need a GP referral?', a: 'No — osteopaths and chartered physiotherapists are primary-care practitioners. You can book directly with us.' },
  { q: 'Do you accept private medical insurance?', a: 'Yes, we work with most major insurers including AXA, Vitality, Aviva and WPA. Please bring your authorisation code and membership number to your first appointment.' },
  { q: 'How long is a first appointment?', a: 'Initial appointments are 45 minutes — long enough to take a full case history, examine you, explain what we find and start treatment.' },
  { q: 'Will I need lots of sessions?', a: 'No. Our policy since 2014 has been to keep no-one in treatment longer than necessary. If we don\'t think we can help, the first appointment is free.' },
  { q: 'Do you offer the Blue Light Card discount?', a: 'Yes — Blue Light Card holders receive 10% off all services and products. Please mention it when booking.' },
  { q: 'Is there parking?', a: 'Yes, free on-street parking is available on Kineton Green Road and surrounding streets.' },
  { q: 'How quickly can I be seen?', a: 'In most weeks we can see new patients within 1–3 working days. Cancellations come up regularly — just call us on 0121 314 0666.' },
  { q: 'What should I wear?', a: 'Comfortable clothing you can move in — gym kit or loose clothing is ideal. We\'ll always discuss what we need to see before treating.' },
];

module.exports = { BIZ, SERVICES, TEAM, AREAS, CONDITIONS, FAQS };
