/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhonemeInfo, Milestone, Flashcard } from "./types";

export const CONSONANTS: PhonemeInfo[] = [
  {
    symbol: "p",
    name: "Voiceless bilabial plosive",
    manner: "Plosive",
    place: "Bilabial",
    voicing: "Voiceless",
    example: "pen",
    audioText: "p as in pen"
  },
  {
    symbol: "b",
    name: "Voiced bilabial plosive",
    manner: "Plosive",
    place: "Bilabial",
    voicing: "Voiced",
    example: "box",
    audioText: "b as in box"
  },
  {
    symbol: "t",
    name: "Voiceless alveolar plosive",
    manner: "Plosive",
    place: "Alveolar",
    voicing: "Voiceless",
    example: "two",
    audioText: "t as in two"
  },
  {
    symbol: "d",
    name: "Voiced alveolar plosive",
    manner: "Plosive",
    place: "Alveolar",
    voicing: "Voiced",
    example: "dog",
    audioText: "d as in dog"
  },
  {
    symbol: "k",
    name: "Voiceless velar plosive",
    manner: "Plosive",
    place: "Velar",
    voicing: "Voiceless",
    example: "cat",
    audioText: "k as in cat"
  },
  {
    symbol: "g",
    name: "Voiced velar plosive",
    manner: "Plosive",
    place: "Velar",
    voicing: "Voiced",
    example: "go",
    audioText: "g as in go"
  },
  {
    symbol: "f",
    name: "Voiceless labiodental fricative",
    manner: "Fricative",
    place: "Labiodental",
    voicing: "Voiceless",
    example: "fox",
    audioText: "f as in fox"
  },
  {
    symbol: "v",
    name: "Voiced labiodental fricative",
    manner: "Fricative",
    place: "Labiodental",
    voicing: "Voiced",
    example: "vase",
    audioText: "v as in vase"
  },
  {
    symbol: "θ",
    name: "Voiceless dental fricative",
    manner: "Fricative",
    place: "Dental",
    voicing: "Voiceless",
    example: "thin",
    audioText: "th as in thin"
  },
  {
    symbol: "ð",
    name: "Voiced dental fricative",
    manner: "Fricative",
    place: "Dental",
    voicing: "Voiced",
    example: "this",
    audioText: "th as in this"
  },
  {
    symbol: "s",
    name: "Voiceless alveolar fricative",
    manner: "Fricative",
    place: "Alveolar",
    voicing: "Voiceless",
    example: "sun",
    audioText: "s as in sun"
  },
  {
    symbol: "z",
    name: "Voiced alveolar fricative",
    manner: "Fricative",
    place: "Alveolar",
    voicing: "Voiced",
    example: "zoo",
    audioText: "z as in zoo"
  },
  {
    symbol: "ʃ",
    name: "Voiceless postalveolar fricative",
    manner: "Fricative",
    place: "Postalveolar",
    voicing: "Voiceless",
    example: "shoe",
    audioText: "sh as in shoe"
  },
  {
    symbol: "ʒ",
    name: "Voiced postalveolar fricative",
    manner: "Fricative",
    place: "Postalveolar",
    voicing: "Voiced",
    example: "measure",
    audioText: "zh as in measure"
  },
  {
    symbol: "h",
    name: "Voiceless glottal fricative",
    manner: "Fricative",
    place: "Glottal",
    voicing: "Voiceless",
    example: "hat",
    audioText: "h as in hat"
  },
  {
    symbol: "m",
    name: "Voiced bilabial nasal",
    manner: "Nasal",
    place: "Bilabial",
    voicing: "Voiced",
    example: "mom",
    audioText: "m as in mom"
  },
  {
    symbol: "n",
    name: "Voiced alveolar nasal",
    manner: "Nasal",
    place: "Alveolar",
    voicing: "Voiced",
    example: "no",
    audioText: "n as in no"
  },
  {
    symbol: "ŋ",
    name: "Voiced velar nasal",
    manner: "Nasal",
    place: "Velar",
    voicing: "Voiced",
    example: "sing",
    audioText: "ng as in sing"
  },
  {
    symbol: "l",
    name: "Voiced alveolar lateral approximant",
    manner: "Lateral Approximant",
    place: "Alveolar",
    voicing: "Voiced",
    example: "leaf",
    audioText: "l as in leaf"
  },
  {
    symbol: "ɹ",
    name: "Voiced alveolar approximant",
    manner: "Approximant",
    place: "Alveolar",
    voicing: "Voiced",
    example: "red",
    audioText: "r as in red"
  },
  {
    symbol: "j",
    name: "Voiced palatal approximant",
    manner: "Approximant",
    place: "Palatal",
    voicing: "Voiced",
    example: "yellow",
    audioText: "y as in yellow"
  },
  {
    symbol: "w",
    name: "Voiced labial-velar approximant",
    manner: "Approximant",
    place: "Labial-velar",
    voicing: "Voiced",
    example: "wet",
    audioText: "w as in wet"
  },
  {
    symbol: "tʃ",
    name: "Voiceless postalveolar affricate",
    manner: "Affricate",
    place: "Postalveolar",
    voicing: "Voiceless",
    example: "chair",
    audioText: "ch as in chair"
  },
  {
    symbol: "dʒ",
    name: "Voiced postalveolar affricate",
    manner: "Affricate",
    place: "Postalveolar",
    voicing: "Voiced",
    example: "jam",
    audioText: "j as in jam"
  }
];

export const VOWELS: PhonemeInfo[] = [
  {
    symbol: "i",
    name: "Close front unrounded vowel",
    manner: "Monophthong",
    place: "Front",
    voicing: "Voiced",
    example: "see",
    audioText: "ee as in see"
  },
  {
    symbol: "ɪ",
    name: "Near-close near-front unrounded vowel",
    manner: "Monophthong",
    place: "Front",
    voicing: "Voiced",
    example: "sit",
    audioText: "i as in sit"
  },
  {
    symbol: "e",
    name: "Close-mid front unrounded vowel",
    manner: "Monophthong",
    place: "Front",
    voicing: "Voiced",
    example: "say (first part)",
    audioText: "ay as in say"
  },
  {
    symbol: "ɛ",
    name: "Open-mid front unrounded vowel",
    manner: "Monophthong",
    place: "Front",
    voicing: "Voiced",
    example: "bed",
    audioText: "eh as in bed"
  },
  {
    symbol: "æ",
    name: "Near-open front unrounded vowel",
    manner: "Monophthong",
    place: "Front",
    voicing: "Voiced",
    example: "cat",
    audioText: "aa as in cat"
  },
  {
    symbol: "u",
    name: "Close back rounded vowel",
    manner: "Monophthong",
    place: "Back",
    voicing: "Voiced",
    example: "too",
    audioText: "oo as in too"
  },
  {
    symbol: "ʊ",
    name: "Near-close near-back rounded vowel",
    manner: "Monophthong",
    place: "Back",
    voicing: "Voiced",
    example: "book",
    audioText: "uh as in book"
  },
  {
    symbol: "o",
    name: "Close-mid back rounded vowel",
    manner: "Monophthong",
    place: "Back",
    voicing: "Voiced",
    example: "go (first part)",
    audioText: "oh as in go"
  },
  {
    symbol: "ɔ",
    name: "Open-mid back rounded vowel",
    manner: "Monophthong",
    place: "Back",
    voicing: "Voiced",
    example: "saw",
    audioText: "aw as in saw"
  },
  {
    symbol: "ɑ",
    name: "Open back unrounded vowel",
    manner: "Monophthong",
    place: "Back",
    voicing: "Voiced",
    example: "father",
    audioText: "ah as in father"
  },
  {
    symbol: "ə",
    name: "Mid central vowel (Schwa)",
    manner: "Monophthong",
    place: "Central",
    voicing: "Voiced",
    example: "sofa",
    audioText: "uh as in sofa"
  },
  {
    symbol: "ʌ",
    name: "Open-mid back unrounded vowel",
    manner: "Monophthong",
    place: "Back",
    voicing: "Voiced",
    example: "cup",
    audioText: "uh as in cup"
  },
  {
    symbol: "aɪ",
    name: "Diphthong starting open-front and gliding close-front",
    manner: "Diphthong",
    place: "Gliding",
    voicing: "Voiced",
    example: "my",
    audioText: "eye as in my"
  },
  {
    symbol: "aʊ",
    name: "Diphthong starting open-front and gliding close-back",
    manner: "Diphthong",
    place: "Gliding",
    voicing: "Voiced",
    example: "now",
    audioText: "ow as in now"
  },
  {
    symbol: "ɔɪ",
    name: "Diphthong starting open-mid-back and gliding close-front",
    manner: "Diphthong",
    place: "Gliding",
    voicing: "Voiced",
    example: "boy",
    audioText: "oy as in boy"
  }
];

export const DEVELOPMENTAL_MILESTONES: Milestone[] = [
  {
    age: "0 - 6 Months",
    receptive: [
      "Turns eyes or head toward sound sources",
      "Stops playing or cooing to listen to familiar voices",
      "Responds to changes in voice tone (friendly vs. angry)"
    ],
    expressive: [
      "Coos, gurgles, and makes vowel-like sounds like 'ah, oo'",
      "Cries differently for varied needs (hunger, fatigue, pain)",
      "Smiles and chatters in response to parent interaction"
    ],
    phonology: [
      "Squeals, growls, and varies vocal pitch",
      "Produces simple vegetative and crying sounds"
    ],
    activities: [
      "Talk to your baby frequently, describing what you are doing",
      "Respond eagerly when they make gurgling sounds, mimicking them",
      "Sing simple lullabies with expressive face configurations"
    ]
  },
  {
    age: "6 - 12 Months",
    receptive: [
      "Understands simple words like 'no, bye-bye, bottle'",
      "Turns head when name is called",
      "Points to or looks at familiar objects when named"
    ],
    expressive: [
      "Produces canonical babbling (repeating consonant-vowel chains like 'ba-ba-ba, ma-ma-ma')",
      "Uses gestures (waving bye-bye, shaking head 'no')",
      "Imitates several simple conversational sounds made by adults"
    ],
    phonology: [
      "Early babbling sounds: /p, b, t, d, m, n, j, w/",
      "Vowel variety expands extensively"
    ],
    activities: [
      "Play interactive games like Peek-a-boo and Pat-a-cake",
      "Read colorful books together, pointing to and naming familiar items clearly",
      "Build speech circles where they make a sound and you repeat it back eagerly"
    ]
  },
  {
    age: "1 - 2 Years",
    receptive: [
      "Points to pictures in books when asked ('Where is the dog?')",
      "Follows simple 1-step verbal commands ('Roll the ball')",
      "Recognizes several body parts when prompted"
    ],
    expressive: [
      "Speaks 10 to 50+ single words by 24 months",
      "Combines two words together ('more juice', 'mama go', 'big truck')",
      "Imitates animal sounds and environment sounds enthusiastically"
    ],
    phonology: [
      "Acquiring: /p, b, m, h, w, d/ with reliable clarity in words",
      "May drop final consonants ('ca' for 'cat') or reduce clusters ('poy' for 'toy')"
    ],
    activities: [
      "Label your child's gestures, turning them into language ('Oh you want juice!')",
      "Keep sentences short, clear, and grammatically complete",
      "Build a box of dynamic plastic toys. Name them as they are taken out."
    ]
  },
  {
    age: "2 - 3 Years",
    receptive: [
      "Follows 2-step unrelated instructions ('Get your shoes and go to the door')",
      "Understands contrasting concepts (hot/cold, big/little, up/down)",
      "Recognizes and categorizes common groups of things (animals, foods)"
    ],
    expressive: [
      "Uses 3 to 4 word functional sentences regularly",
      "Asks simple questions using 'What' or 'Where' ('Where puppy?')",
      "Has a word for almost everything in their daily environment"
    ],
    phonology: [
      "Mastered: /p, b, m, n, h, w, t, d, k, g/",
      "Speech is understood by familiar caregivers 50% to 75% of the time"
    ],
    activities: [
      "Add on to what your child says (Child: 'Car go.' Parent: 'Yes, the red car is going fast!')",
      "Ask choices instead of closed questions ('Do you want an apple or a banana?')",
      "Practice speech sounds through physical action (e.g., jump every time they say 'pop')"
    ]
  },
  {
    age: "3 - 4 Years",
    receptive: [
      "Comprehends simple 'Who', 'What', 'Where', and 'Why' inquiries",
      "Understands family relations (brother, sister, grandma)",
      "Hears you when you call from another room"
    ],
    expressive: [
      "Talks about activities at school or friends' houses",
      "Uses sentences with 4 or more words easily",
      "Talks clearly enough for strangers to understand about 75% of the time"
    ],
    phonology: [
      "Acquiring /f, v, s, z, l/ and simple affricates /tʃ, dʒ/",
      "Syllable counts stay accurate; consonant omission should reduce significantly"
    ],
    activities: [
      "Talk about spatial relations ('Let's put the block UNDER the cup')",
      "Read interactive stories and ask them what will happen next",
      "Do sound sorting. Find items starting with the 's' sound, like spoon, sock, soap."
    ]
  },
  {
    age: "4 - 5 Years",
    receptive: [
      "Follows classroom-level multi-step directions",
      "Understands sequencing of time (first, next, last, yesterday)",
      "Hears and understands most of what is said at home and school"
    ],
    expressive: [
      "Tells complex detailed stories keeping a single topic",
      "Uses adult-like grammar mostly (using pronouns like he, she, they, us)",
      "Communicates easily with both peers and adults (95%+ intelligible)"
    ],
    phonology: [
      "Should have mastered almost all sounds EXCEPT sometimes /r, θ, ð, ʒ/",
      "Consonant clusters (e.g., 'blue', 'star', 'frog') are mostly clean and correct"
    ],
    activities: [
      "Encourage dramatic play or puppet shows to expand narrative structures",
      "Play sound guessing games ('I spy something that starts with the /b/ sound')",
      "Introduce simple rhyme associations ('What words sound like cat? ... hat!')"
    ]
  }
];

export const ARTICULATION_DECK: Flashcard[] = [
  {
    id: "r1",
    word: "Rabbit",
    targetSound: "r",
    position: "initial",
    ipa: "/ˈɹæb.ɪt/",
    placementCue: "Pull your tongue backward. Make it wide so the sides touch your upper back teeth like a slide."
  },
  {
    id: "r2",
    word: "Robot",
    targetSound: "r",
    position: "initial",
    ipa: "/ˈɹoʊ.bɑːt/",
    placementCue: "Round your lips slightly, growl like a friendly bear, and lift the sides of your tongue."
  },
  {
    id: "s1",
    word: "Sun",
    targetSound: "s",
    position: "initial",
    ipa: "/sʌn/",
    placementCue: "Keep your teeth closed tightly, put the tongue tip up just behind front teeth, and blow cold snake wind."
  },
  {
    id: "s2",
    word: "Castle",
    targetSound: "s",
    position: "medial",
    ipa: "/ˈkæs.əl/",
    placementCue: "The snake wind blows straight down the center line of your tongue. Don't let it look out the sides."
  },
  {
    id: "l1",
    word: "Leaf",
    targetSound: "l",
    position: "initial",
    ipa: "/liːf/",
    placementCue: "Touch the bumpy ridge behind your top teeth with the very tip of your tongue. Sing 'la la la'!"
  },
  {
    id: "l2",
    word: "Balloon",
    targetSound: "l",
    position: "medial",
    ipa: "/bəˈluːn/",
    placementCue: "Open your mouth wide enough, lift your tongue tip to tap the ceiling ridge, letting the sound pass out the sides."
  },
  {
    id: "th1",
    word: "Thumb",
    targetSound: "θ",
    position: "initial",
    ipa: "/θʌm/",
    placementCue: "Peep the tiny tip of your tongue out between your front teeth and blow a quiet breeze like a sleepy baby."
  },
  {
    id: "th2",
    word: "Feather",
    targetSound: "ð",
    position: "medial",
    ipa: "/ˈfɛð.ɚ/",
    placementCue: "Let your tongue tip touch the edge of your top teeth, turn your motor (vocal chords) ON to feel the buzz."
  },
  {
    id: "k1",
    word: "Cat",
    targetSound: "k",
    position: "initial",
    ipa: "/kæt/",
    placementCue: "Keep your tongue tip down behind your bottom teeth, lift the back of your tongue to tap the soft ceiling."
  },
  {
    id: "k2",
    word: "Rocket",
    targetSound: "k",
    position: "medial",
    ipa: "/ˈɹɑːk.ɪt/",
    placementCue: "Make a quick coughing sound. Trigger the cough in the very back of your throat while keeping the front down."
  }
];
