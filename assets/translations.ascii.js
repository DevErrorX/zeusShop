// store Translations
// Usage: window.translations.en.key or window.translations.ar.key

const UNIQUE_NAMES_EN = [
  'Abdullah Al-Rashid','Fahad Al-Anazi','Khaled Al-Dosari','Saud Al-Mutairi','Mohammed Al-Shehri','Rashid Al-Qahtani','Bader Al-Harbi','Sultan Al-Ghamdi','Turki Al-Subaie','Nayef Al-Zahrani','Mansour Al-Otaibi','Salem Al-Jaber','Hamad Al-Harthi','Faisal Al-Saleh','Saad Al-Salem','Yasser Al-Dhaheri','Majed Al-Kuwari','Rakan Al-Suwaidi','Nawaf Al-Naimi','Talal Al-Balushi','Ziyad Al-Mansoori','Mishal Al-Marzouqi','Omar Al-Mahri','Adel Al-Buqami','Hani Al-Falih','Tareq Al-Ruwais','Sami Al-Humaidi','Waleed Al-Mutawa','Fares Al-Rumaihi','Bassam Al-Sharif','Sarah Al-Khalifa','Noura Al-Kwaari','Reem Al-Suwaidi','Maha Al-Naimi','Latifa Al-Balushi','Jawaher Al-Mansoori','Hessa Al-Marzouqi','Layla Al-Sabah','Mariam Al-Dhaheri','Dana Al-Rumaihi','Aisha Al-Kuwari','Abeer Al-Khalifa','Lama Al-Suwaidi','Munira Al-Naimi','Wejdan Al-Balushi','Ghadir Al-Mansoori','Asma Al-Marzouqi','Afnan Al-Dhaheri','Shurooq Al-Kuwari','Reema Al-Khalifa','Joud Al-Rashid','Bayan Al-Anazi','Lulwa Al-Dosari','Noor Al-Mutairi','Rawan Al-Shehri','Yara Al-Qahtani','Fatima Al-Harbi','Mona Al-Ghamdi','Dalia Al-Subaie','Lina Al-Zahrani','Haifa Al-Otaibi','Rima Al-Jaber','Nada Al-Harthi','Amal Al-Saleh','Hana Al-Salem','Ibrahim Al-Rashid','Yusuf Al-Anazi','Abdulaziz Al-Dosari','Abdulrahman Al-Mutairi','Jassim Al-Shehri','Nasser Al-Qahtani','Yazeed Al-Harbi','Bandar Al-Ghamdi','Khalifa Al-Subaie','Mazen Al-Zahrani'
];
const UNIQUE_NAMES_AR = [
  '\u0639\u0628\u062f\u0627\u0644\u0644\u0647 \u0627\u0644\u0631\u0634\u064a\u062f','\u0641\u0647\u062f \u0627\u0644\u0639\u0646\u0632\u064a','\u062e\u0627\u0644\u062f \u0627\u0644\u062f\u0648\u0633\u0631\u064a','\u0633\u0639\u0648\u062f \u0627\u0644\u0645\u0637\u064a\u0631\u064a','\u0645\u062d\u0645\u062f \u0627\u0644\u0634\u0647\u0631\u064a','\u0631\u0627\u0634\u062f \u0627\u0644\u0642\u062d\u0637\u0627\u0646\u064a','\u0628\u062f\u0631 \u0627\u0644\u062d\u0631\u0628\u064a','\u0633\u0644\u0637\u0627\u0646 \u0627\u0644\u063a\u0627\u0645\u062f\u064a','\u062a\u0631\u0643\u064a \u0627\u0644\u0633\u0628\u0627\u0639\u064a','\u0646\u0627\u064a\u0641 \u0627\u0644\u0632\u0647\u0631\u0627\u0646\u064a','\u0645\u0646\u0635\u0648\u0631 \u0627\u0644\u0639\u062a\u064a\u0628\u064a','\u0633\u0627\u0644\u0645 \u0627\u0644\u062c\u0627\u0628\u0631','\u062d\u0645\u062f \u0627\u0644\u062d\u0627\u0631\u062b\u064a','\u0641\u064a\u0635\u0644 \u0627\u0644\u0635\u0627\u0644\u062d','\u0633\u0639\u062f \u0627\u0644\u0633\u0627\u0644\u0645','\u064a\u0627\u0633\u0631 \u0627\u0644\u0638\u0627\u0647\u0631\u064a','\u0645\u0627\u062c\u062f \u0627\u0644\u0643\u0648\u0627\u0631\u064a','\u0631\u0627\u0643\u0627\u0646 \u0627\u0644\u0633\u0648\u064a\u062f\u064a','\u0646\u0648\u0627\u0641 \u0627\u0644\u0646\u0639\u064a\u0645\u064a','\u0637\u0644\u0627\u0644 \u0627\u0644\u0628\u0644\u0648\u0634\u064a','\u0632\u064a\u0627\u062f \u0627\u0644\u0645\u0646\u0635\u0648\u0631\u064a','\u0645\u0634\u0639\u0644 \u0627\u0644\u0645\u0631\u0632\u0648\u0642\u064a','\u0639\u0645\u0631 \u0627\u0644\u0645\u0647\u0631\u064a','\u0639\u0627\u062f\u0644 \u0627\u0644\u0628\u0642\u0645\u064a','\u0647\u0627\u0646\u064a \u0627\u0644\u0641\u0627\u0644\u062d','\u0637\u0627\u0631\u0642 \u0627\u0644\u0631\u0648\u064a\u0633','\u0633\u0627\u0645\u064a \u0627\u0644\u062d\u0645\u064a\u062f\u064a','\u0648\u0644\u064a\u062f \u0627\u0644\u0645\u0637\u0648\u0639','\u0641\u0627\u0631\u0633 \u0627\u0644\u0631\u0645\u064a\u062d\u064a','\u0628\u0633\u0627\u0645 \u0627\u0644\u0634\u0631\u064a\u0641','\u0633\u0627\u0631\u0629 \u0627\u0644\u062e\u0644\u064a\u0641\u0629','\u0646\u0648\u0631\u0629 \u0627\u0644\u0643\u0648\u0627\u0631\u064a','\u0631\u064a\u0645 \u0627\u0644\u0633\u0648\u064a\u062f\u064a','\u0645\u0647\u0627 \u0627\u0644\u0646\u0639\u064a\u0645\u064a','\u0644\u0637\u064a\u0641\u0629 \u0627\u0644\u0628\u0644\u0648\u0634\u064a','\u062c\u0648\u0627\u0647\u0631 \u0627\u0644\u0645\u0646\u0635\u0648\u0631\u064a','\u062d\u0635\u0629 \u0627\u0644\u0645\u0631\u0632\u0648\u0642\u064a','\u0644\u064a\u0644\u0649 \u0627\u0644\u0635\u0628\u0627\u062d','\u0645\u0631\u064a\u0645 \u0627\u0644\u0638\u0627\u0647\u0631\u064a','\u062f\u0627\u0646\u0627 \u0627\u0644\u0631\u0645\u064a\u062d\u064a','\u0639\u0627\u0626\u0634\u0629 \u0627\u0644\u0643\u0648\u0627\u0631\u064a','\u0639\u0628\u064a\u0631 \u0627\u0644\u062e\u0644\u064a\u0641\u0629','\u0644\u0645\u0649 \u0627\u0644\u0633\u0648\u064a\u062f\u064a','\u0645\u0646\u064a\u0631\u0629 \u0627\u0644\u0646\u0639\u064a\u0645\u064a','\u0648\u062c\u062f\u0627\u0646 \u0627\u0644\u0628\u0644\u0648\u0634\u064a','\u063a\u062f\u064a\u0631 \u0627\u0644\u0645\u0646\u0635\u0648\u0631\u064a','\u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0645\u0631\u0632\u0648\u0642\u064a','\u0623\u0641\u0646\u0627\u0646 \u0627\u0644\u0638\u0627\u0647\u0631\u064a','\u0634\u0631\u0648\u0642 \u0627\u0644\u0643\u0648\u0627\u0631\u064a','\u0631\u064a\u0645\u0627 \u0627\u0644\u062e\u0644\u064a\u0641\u0629','\u062c\u0648\u062f \u0627\u0644\u0631\u0634\u064a\u062f','\u0628\u064a\u0627\u0646 \u0627\u0644\u0639\u0646\u0632\u064a','\u0644\u0648\u0644\u0648\u0629 \u0627\u0644\u062f\u0648\u0633\u0631\u064a','\u0646\u0648\u0631 \u0627\u0644\u0645\u0637\u064a\u0631\u064a','\u0631\u0648\u0627\u0646 \u0627\u0644\u0634\u0647\u0631\u064a','\u064a\u0627\u0631\u0627 \u0627\u0644\u0642\u062d\u0637\u0627\u0646\u064a','\u0641\u0627\u0637\u0645\u0629 \u0627\u0644\u062d\u0631\u0628\u064a','\u0645\u0646\u0649 \u0627\u0644\u063a\u0627\u0645\u062f\u064a','\u062f\u0627\u0644\u064a\u0627 \u0627\u0644\u0633\u0628\u0627\u0639\u064a','\u0644\u064a\u0646\u0627 \u0627\u0644\u0632\u0647\u0631\u0627\u0646\u064a','\u0647\u064a\u0641\u0627\u0621 \u0627\u0644\u0639\u062a\u064a\u0628\u064a','\u0631\u064a\u0645\u0629 \u0627\u0644\u062c\u0627\u0628\u0631','\u0646\u062f\u0649 \u0627\u0644\u062d\u0627\u0631\u062b\u064a','\u0623\u0645\u0644 \u0627\u0644\u0635\u0627\u0644\u062d','\u0647\u0646\u0627\u0621 \u0627\u0644\u0633\u0627\u0644\u0645','\u0625\u0628\u0631\u0627\u0647\u064a\u0645 \u0627\u0644\u0631\u0634\u064a\u062f','\u064a\u0648\u0633\u0641 \u0627\u0644\u0639\u0646\u0632\u064a','\u0639\u0628\u062f\u0627\u0644\u0639\u0632\u064a\u0632 \u0627\u0644\u062f\u0648\u0633\u0631\u064a','\u0639\u0628\u062f\u0627\u0644\u0631\u062d\u0645\u0646 \u0627\u0644\u0645\u0637\u064a\u0631\u064a','\u062c\u0627\u0633\u0645 \u0627\u0644\u0634\u0647\u0631\u064a','\u0646\u0627\u0635\u0631 \u0627\u0644\u0642\u062d\u0637\u0627\u0646\u064a','\u064a\u0632\u064a\u062f \u0627\u0644\u062d\u0631\u0628\u064a','\u0628\u0646\u062f\u0631 \u0627\u0644\u063a\u0627\u0645\u062f\u064a','\u062e\u0644\u064a\u0641\u0629 \u0627\u0644\u0633\u0628\u0627\u0639\u064a','\u0645\u0627\u0632\u0646 \u0627\u0644\u0632\u0647\u0631\u0627\u0646\u064a'
];

const productReviewsBase = [
  { daysAgo: 2, textEn: 'Activation was instant after payment; support answered on WhatsApp within 2 minutes. Trusted Gulf store.', textAr: '\u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0643\u0627\u0646 \u0641\u0648\u0631\u064a \u0628\u0639\u062f \u0627\u0644\u062f\u0641\u0639 \u0648\u0627\u0644\u062f\u0639\u0645 \u0631\u062f \u0639\u0644\u0649 \u0627\u0644\u0648\u0627\u062a\u0633 \u062e\u0644\u0627\u0644 \u062f\u0642\u064a\u0642\u062a\u064a\u0646. \u0645\u062a\u062c\u0631 \u062e\u0644\u064a\u062c\u064a \u0645\u0648\u062b\u0648\u0642.' },
  { daysAgo: 3, textEn: 'Paid with mada smoothly and got the code right away; dashboard is clear and simple.', textAr: '\u062f\u0641\u0639\u062a \u0639\u0628\u0631 \u0645\u062f\u0649 \u0628\u0633\u0644\u0627\u0633\u0629 \u0648\u0648\u0635\u0644\u0646\u064a \u0627\u0644\u0643\u0648\u062f \u0645\u0628\u0627\u0634\u0631\u0629 \u0648\u0644\u0648\u062d\u0629 \u0627\u0644\u062a\u062d\u0643\u0645 \u0648\u0627\u0636\u062d\u0629 \u0648\u0628\u0633\u064a\u0637\u0629.' },
  { daysAgo: 4, textEn: 'Asked for a refund once and it arrived the same day; honest service and clear policies.', textAr: '\u0637\u0644\u0628\u062a \u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0645\u0631\u0629 \u0648\u0648\u0635\u0644 \u0628\u0646\u0641\u0633 \u0627\u0644\u064a\u0648\u0645 \u062e\u062f\u0645\u0629 \u0635\u0627\u062f\u0642\u0629 \u0648\u0633\u064a\u0627\u0633\u0629 \u0648\u0627\u0636\u062d\u0629.' },
  { daysAgo: 5, textEn: 'Second purchase this month; license delivered instantly and Arabic instructions were easy.', textAr: '\u0647\u0630\u0627 \u062b\u0627\u0646\u064a \u0634\u0631\u0627\u0621 \u0644\u064a \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0644\u062d\u0638\u064a \u0648\u0627\u0644\u062a\u0639\u0644\u064a\u0645\u0627\u062a \u0628\u0627\u0644\u0639\u0631\u0628\u064a \u0633\u0647\u0644\u0629.' },
  { daysAgo: 6, textEn: 'Midnight KSA order and support still replied quickly. Recommending to friends.', textAr: '\u0637\u0644\u0628\u062a \u0645\u0646\u062a\u0635\u0641 \u0627\u0644\u0644\u064a\u0644 \u0628\u062a\u0648\u0642\u064a\u062a \u0627\u0644\u0631\u064a\u0627\u0636 \u0648\u0627\u0644\u062f\u0639\u0645 \u0631\u062f \u0628\u0633\u0631\u0639\u0629. \u0628\u0646\u0635\u062d \u0641\u064a\u0647 \u0627\u0644\u0623\u0635\u062f\u0642\u0627\u0621.' },
  { daysAgo: 7, textEn: 'Bought a bundle for my team; fair pricing and invoice plus code arrived immediately by email.', textAr: '\u0627\u0634\u062a\u0631\u064a\u062a \u0628\u0627\u0642\u0629 \u0644\u0644\u0641\u0631\u064a\u0642 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0645\u0646\u0627\u0633\u0628\u0629 \u0648\u0627\u0644\u0641\u0627\u062a\u0648\u0631\u0629 \u0648\u0627\u0644\u0643\u0648\u062f \u0648\u0635\u0644\u0648\u0627 \u0645\u0628\u0627\u0634\u0631\u0629 \u0639\u0644\u0649 \u0627\u0644\u0625\u064a\u0645\u064a\u0644.' },
  { daysAgo: 8, textEn: 'Needed it for a Saudi client; activation in minutes and support shared the key securely.', textAr: '\u0627\u062d\u062a\u062c\u062a\u0647 \u0644\u0639\u0645\u064a\u0644 \u0633\u0639\u0648\u062f\u064a \u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0641\u064a \u062f\u0642\u0627\u0626\u0642 \u0648\u0627\u0644\u062f\u0639\u0645 \u0623\u0631\u0633\u0644 \u0627\u0644\u0645\u0641\u062a\u0627\u062d \u0628\u0634\u0643\u0644 \u0622\u0645\u0646.' },
  { daysAgo: 9, textEn: 'Tested before launch; product is stable and updates arrive regularly without hassle.', textAr: '\u062c\u0631\u0628\u062a\u0647 \u0642\u0628\u0644 \u0627\u0644\u0625\u0637\u0644\u0627\u0642 \u0627\u0644\u0645\u0646\u062a\u062c \u062b\u0627\u0628\u062a \u0648\u0627\u0644\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u062a\u0648\u0635\u0644 \u0628\u0627\u0646\u062a\u0638\u0627\u0645 \u0628\u062f\u0648\u0646 \u062a\u0639\u0642\u064a\u062f.' },
  { daysAgo: 10, textEn: 'Used STC Pay checkout without issues; activation link was instant.', textAr: '\u0627\u0633\u062a\u062e\u062f\u0645\u062a \u0627\u0644\u062f\u0641\u0639 \u0628\u0640 STC Pay \u0628\u062f\u0648\u0646 \u0645\u0634\u0627\u0643\u0644 \u0631\u0627\u0628\u0637 \u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0643\u0627\u0646 \u0641\u0648\u0631\u064a.' },
  { daysAgo: 12, textEn: 'Live chat solved a setup question in under 5 minutes; code worked first try.', textAr: '\u0627\u0644\u062f\u0639\u0645 \u0641\u064a \u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629 \u062d\u0644 \u0627\u0633\u062a\u0641\u0633\u0627\u0631\u064a \u0641\u064a \u0623\u0642\u0644 \u0645\u0646 \u062e\u0645\u0633 \u062f\u0642\u0627\u0626\u0642 \u0648\u0627\u0644\u0643\u0648\u062f \u0627\u0634\u062a\u063a\u0644 \u0645\u0646 \u0623\u0648\u0644 \u0645\u0631\u0629.' },
  { daysAgo: 13, textEn: 'Activation is immediate every time; pricing is fair for GCC market.', textAr: '\u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0641\u0648\u0631\u064a \u0643\u0644 \u0645\u0631\u0629 \u0648\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0633\u0648\u0642 \u0627\u0644\u062e\u0644\u064a\u062c.' },
  { daysAgo: 14, textEn: 'Support verified my order quickly and sent the key securely.', textAr: '\u0627\u0644\u062f\u0639\u0645 \u062a\u062d\u0642\u0642 \u0645\u0646 \u0637\u0644\u0628\u064a \u0628\u0633\u0631\u0639\u0629 \u0648\u0623\u0631\u0633\u0644 \u0627\u0644\u0645\u0641\u062a\u0627\u062d \u0628\u0634\u0643\u0644 \u0622\u0645\u0646.' },
  { daysAgo: 15, textEn: 'Instructions in Arabic were clear; I activated within minutes.', textAr: '\u0627\u0644\u062a\u0639\u0644\u064a\u0645\u0627\u062a \u0628\u0627\u0644\u0639\u0631\u0628\u064a \u0643\u0627\u0646\u062a \u0648\u0627\u0636\u062d\u0629 \u0648\u0641\u0639\u0644\u062a \u0627\u0644\u0645\u0646\u062a\u062c \u062e\u0644\u0627\u0644 \u062f\u0642\u0627\u0626\u0642.' },
  { daysAgo: 16, textEn: 'Refund policy is real\u2014I got mine same day when I switched product.', textAr: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u062d\u0642\u064a\u0642\u064a\u0629 \u0627\u0633\u062a\u0631\u062c\u0639\u062a \u0628\u0646\u0641\u0633 \u0627\u0644\u064a\u0648\u0645 \u0644\u0645\u0627 \u063a\u064a\u0631\u062a \u0627\u0644\u0645\u0646\u062a\u062c.' },
  { daysAgo: 17, textEn: 'Dashboard shows the code and invoice right away; smooth experience.', textAr: '\u0644\u0648\u062d\u0629 \u0627\u0644\u062a\u062d\u0643\u0645 \u062a\u0639\u0631\u0636 \u0627\u0644\u0643\u0648\u062f \u0648\u0627\u0644\u0641\u0627\u062a\u0648\u0631\u0629 \u0641\u0648\u0631\u0627\u064b \u062a\u062c\u0631\u0628\u0629 \u0633\u0644\u0633\u0629.' },
  { daysAgo: 18, textEn: 'Needed help with activation time; support replied in minutes.', textAr: '\u0627\u062d\u062a\u062c\u062a \u0645\u0633\u0627\u0639\u062f\u0629 \u0628\u0648\u0642\u062a \u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0648\u0627\u0644\u062f\u0639\u0645 \u0631\u062f \u062e\u0644\u0627\u0644 \u062f\u0642\u0627\u0626\u0642.' },
  { daysAgo: 19, textEn: 'Bought twice now; both times instant activation and clean instructions.', textAr: '\u0627\u0634\u062a\u0631\u064a\u062a \u0645\u0631\u062a\u064a\u0646 \u0648\u0643\u0644 \u0645\u0631\u0629 \u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0644\u062d\u0638\u064a \u0648\u0627\u0644\u062a\u0639\u0644\u064a\u0645\u0627\u062a \u0648\u0627\u0636\u062d\u0629.' },
  { daysAgo: 20, textEn: 'mada payment worked fine; key delivered immediately.', textAr: '\u062f\u0641\u0639 \u0645\u062f\u0649 \u0627\u0634\u062a\u063a\u0644 \u062a\u0645\u0627\u0645 \u0648\u0627\u0644\u0645\u0641\u062a\u0627\u062d \u0648\u0635\u0644 \u0641\u0648\u0631\u0627\u064b.' },
  { daysAgo: 21, textEn: 'Support even sent a quick video to guide me\u2014great service.', textAr: '\u0627\u0644\u062f\u0639\u0645 \u0623\u0631\u0633\u0644 \u0641\u064a\u062f\u064a\u0648 \u0633\u0631\u064a\u0639 \u064a\u0634\u0631\u062d \u0627\u0644\u062e\u0637\u0648\u0627\u062a \u062e\u062f\u0645\u0629 \u0645\u0645\u062a\u0627\u0632\u0629.' },
  { daysAgo: 22, textEn: 'Activation email landed in seconds; no delays at all.', textAr: '\u0625\u064a\u0645\u064a\u0644 \u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0648\u0635\u0644 \u0641\u064a \u062b\u0648\u0627\u0646\u064a \u0628\u062f\u0648\u0646 \u0623\u064a \u062a\u0623\u062e\u064a\u0631.' },
  { daysAgo: 23, textEn: 'Late-night Doha order got instant delivery; impressed.', textAr: '\u0637\u0644\u0628\u062a \u0622\u062e\u0631 \u0627\u0644\u0644\u064a\u0644 \u0641\u064a \u0627\u0644\u062f\u0648\u062d\u0629 \u0648\u0627\u0644\u062a\u0633\u0644\u064a\u0645 \u0643\u0627\u0646 \u0641\u0648\u0631\u064a \u0645\u0645\u062a\u0627\u0632.' },
  { daysAgo: 24, textEn: 'They sent invoice in Arabic and English; activation quick.', textAr: '\u0623\u0631\u0633\u0644\u0648\u0627 \u0627\u0644\u0641\u0627\u062a\u0648\u0631\u0629 \u0628\u0627\u0644\u0639\u0631\u0628\u064a \u0648\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a \u0648\u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0633\u0631\u064a\u0639.' },
  { daysAgo: 25, textEn: 'Bought for my sister; support transferred the key securely.', textAr: '\u0627\u0634\u062a\u0631\u064a\u062a \u0644\u0623\u062e\u062a\u064a \u0648\u0627\u0644\u062f\u0639\u0645 \u0646\u0642\u0644 \u0627\u0644\u0645\u0641\u062a\u0627\u062d \u0628\u0623\u0645\u0627\u0646.' },
  { daysAgo: 27, textEn: 'License worked on first try; fair price for GCC.', textAr: '\u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0627\u0634\u062a\u063a\u0644 \u0645\u0646 \u0623\u0648\u0644 \u0645\u0631\u0629 \u0648\u0627\u0644\u0633\u0639\u0631 \u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u062e\u0644\u064a\u062c.' },
  { daysAgo: 28, textEn: 'Oman payment with card succeeded; code delivered instantly.', textAr: '\u062f\u0641\u0639\u062a \u0628\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0641\u064a \u0639\u0645\u0627\u0646 \u0648\u0648\u0635\u0644 \u0627\u0644\u0643\u0648\u062f \u0641\u0648\u0631\u0627\u064b.' },
  { daysAgo: 29, textEn: 'Support added screenshots for me; activation smooth.', textAr: '\u0627\u0644\u062f\u0639\u0645 \u0623\u0636\u0627\u0641 \u0644\u0642\u0637\u0627\u062a \u0634\u0627\u0634\u0629 \u0644\u064a \u0648\u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0643\u0627\u0646 \u0633\u0644\u0633.' },
  { daysAgo: 31, textEn: 'STC Pay + instant code + WhatsApp follow-up. Solid.', textAr: 'STC Pay \u0645\u0639 \u0643\u0648\u062f \u0641\u0648\u0631\u064a \u0648\u0645\u062a\u0627\u0628\u0639\u0629 \u0648\u0627\u062a\u0633 \u062a\u062c\u0631\u0628\u0629 \u0645\u0645\u062a\u0627\u0632\u0629.' },
  { daysAgo: 32, textEn: 'Product stable after updates; no downtime.', textAr: '\u0627\u0644\u0645\u0646\u062a\u062c \u062b\u0627\u0628\u062a \u0628\u0639\u062f \u0627\u0644\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0628\u062f\u0648\u0646 \u0623\u064a \u062a\u0648\u0642\u0641.' },
  { daysAgo: 33, textEn: 'Appreciated the 24h refund promise; feels safe to buy.', textAr: '\u0623\u0639\u062c\u0628\u0646\u064a \u0636\u0645\u0627\u0646 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u062e\u0644\u0627\u0644 24 \u0633\u0627\u0639\u0629 \u064a\u0639\u0637\u064a \u0623\u0645\u0627\u0646 \u0644\u0644\u0634\u0631\u0627\u0621.' },
  { daysAgo: 34, textEn: 'Support moved my license to another email same day.', textAr: '\u0627\u0644\u062f\u0639\u0645 \u0646\u0642\u0644 \u0627\u0644\u0631\u062e\u0635\u0629 \u0644\u0625\u064a\u0645\u064a\u0644 \u0622\u062e\u0631 \u0628\u0646\u0641\u0633 \u0627\u0644\u064a\u0648\u0645.' },
  { daysAgo: 35, textEn: 'Simple checkout; activation link ready instantly.', textAr: '\u062f\u0641\u0639 \u0628\u0633\u064a\u0637 \u0648\u0631\u0627\u0628\u0637 \u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u062c\u0627\u0647\u0632 \u0641\u0648\u0631\u0627\u064b.' },
  { daysAgo: 36, textEn: 'Helpful support and clean dashboard; great for teams.', textAr: '\u062f\u0639\u0645 \u0645\u062a\u0639\u0627\u0648\u0646 \u0648\u0644\u0648\u062d\u0629 \u062a\u062d\u0643\u0645 \u0645\u0631\u062a\u0628\u0629 \u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u0641\u0631\u0642.' },
  { daysAgo: 38, textEn: 'Bought multiple licenses; each delivered within seconds.', textAr: '\u0627\u0634\u062a\u0631\u064a\u062a \u0639\u062f\u0629 \u0631\u062e\u0635 \u0648\u0643\u0644\u0647\u0627 \u0648\u0635\u0644\u062a \u062e\u0644\u0627\u0644 \u062b\u0648\u0627\u0646\u064a.' },
  { daysAgo: 40, textEn: 'Had a typo in my email; support fixed it quickly.', textAr: '\u0643\u0627\u0646 \u0639\u0646\u062f\u064a \u062e\u0637\u0623 \u0628\u0627\u0644\u0625\u064a\u0645\u064a\u0644 \u0648\u0627\u0644\u062f\u0639\u0645 \u0639\u062f\u0644\u0647 \u0628\u0633\u0631\u0639\u0629.' },
  { daysAgo: 42, textEn: 'Great for agencies\u2014fast keys and clear invoices.', textAr: '\u0645\u0645\u062a\u0627\u0632 \u0644\u0644\u0648\u0643\u0627\u0644\u0627\u062a \u0645\u0641\u0627\u062a\u064a\u062d \u0633\u0631\u064a\u0639\u0629 \u0648\u0641\u0648\u0627\u062a\u064a\u0631 \u0648\u0627\u0636\u062d\u0629.' },
  { daysAgo: 43, textEn: 'PayPal alternative not needed; mada and Visa worked fine.', textAr: '\u0645\u0627 \u0627\u062d\u062a\u062c\u062a \u0628\u0627\u064a\u0628\u0627\u0644 \u0645\u062f\u0649 \u0648\u0641\u064a\u0632\u0627 \u0627\u0634\u062a\u063a\u0644\u0648\u0627 \u062a\u0645\u0627\u0645.' },
  { daysAgo: 44, textEn: 'Received updates for free after purchase; nice bonus.', textAr: '\u0648\u0635\u0644\u062a\u0646\u064a \u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0645\u062c\u0627\u0646\u064a\u0629 \u0628\u0639\u062f \u0627\u0644\u0634\u0631\u0627\u0621 \u0634\u064a\u0621 \u062c\u0645\u064a\u0644.' },
  { daysAgo: 45, textEn: 'Clear steps in Arabic PDF; activated smoothly.', textAr: '\u0627\u0644\u062e\u0637\u0648\u0627\u062a \u0628\u0627\u0644\u0639\u0631\u0628\u064a \u0641\u064a \u0645\u0644\u0641 PDF \u0648\u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0643\u0627\u0646 \u0633\u0644\u0633.' },
  { daysAgo: 46, textEn: 'Support verified domain quickly and key worked.', textAr: '\u0627\u0644\u062f\u0639\u0645 \u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062f\u0648\u0645\u064a\u0646 \u0628\u0633\u0631\u0639\u0629 \u0648\u0627\u0644\u0645\u0641\u062a\u0627\u062d \u0627\u0634\u062a\u063a\u0644.' },
  { daysAgo: 47, textEn: 'Nice to see VAT invoice and instant delivery together.', textAr: '\u062c\u0645\u064a\u0644 \u0648\u062c\u0648\u062f \u0641\u0627\u062a\u0648\u0631\u0629 \u0636\u0631\u064a\u0628\u0629 \u0645\u0639 \u062a\u0633\u0644\u064a\u0645 \u0641\u0648\u0631\u064a.' },
  { daysAgo: 48, textEn: 'GCC-specific support understood my needs immediately.', textAr: '\u062f\u0639\u0645 \u064a\u0641\u0647\u0645 \u0627\u062d\u062a\u064a\u0627\u062c\u0627\u062a \u0627\u0644\u062e\u0644\u064a\u062c \u0645\u0628\u0627\u0634\u0631\u0629.' },
  { daysAgo: 50, textEn: 'Activated for Abu Dhabi client in minutes; smooth.', textAr: '\u0641\u0639\u0651\u0644\u062a \u0644\u0639\u0645\u064a\u0644 \u0641\u064a \u0623\u0628\u0648\u0638\u0628\u064a \u062e\u0644\u0627\u0644 \u062f\u0642\u0627\u0626\u0642 \u0633\u0644\u0633 \u062c\u062f\u0627\u064b.' },
  { daysAgo: 52, textEn: 'Renewal discount applied automatically; appreciated.', textAr: '\u062e\u0635\u0645 \u0627\u0644\u062a\u062c\u062f\u064a\u062f \u0627\u0646\u062d\u0633\u0628 \u062a\u0644\u0642\u0627\u0626\u064a\u0627\u064b \u062e\u0637\u0648\u0629 \u0644\u0637\u064a\u0641\u0629.' },
  { daysAgo: 54, textEn: 'WhatsApp follow-up to confirm activation was thoughtful.', textAr: '\u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u0648\u0627\u062a\u0633 \u0644\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0643\u0627\u0646\u062a \u0644\u0641\u062a\u0629 \u0637\u064a\u0628\u0629.' },
  { daysAgo: 55, textEn: 'Support switched my plan without extra fees; thanks.', textAr: '\u0627\u0644\u062f\u0639\u0645 \u063a\u064a\u0631 \u062e\u0637\u062a\u064a \u0628\u062f\u0648\u0646 \u0631\u0633\u0648\u0645 \u0625\u0636\u0627\u0641\u064a\u0629 \u0634\u0643\u0631\u0627\u064b.' },
  { daysAgo: 57, textEn: 'Key delivered in less than a minute; great speed.', textAr: '\u0627\u0644\u0645\u0641\u062a\u0627\u062d \u0648\u0635\u0644 \u0641\u064a \u0623\u0642\u0644 \u0645\u0646 \u062f\u0642\u064a\u0642\u0629 \u0633\u0631\u0639\u0629 \u0645\u0645\u062a\u0627\u0632\u0629.' },
  { daysAgo: 58, textEn: 'Got activation plus quick mini guide video\u2014helpful.', textAr: '\u0648\u0635\u0644\u0646\u064a \u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0645\u0639 \u0641\u064a\u062f\u064a\u0648 \u0625\u0631\u0634\u0627\u062f\u064a \u0633\u0631\u064a\u0639 \u0645\u0641\u064a\u062f \u062c\u062f\u0627\u064b.' },
  { daysAgo: 60, textEn: 'No hidden fees; price shown is what I paid.', textAr: '\u0645\u0627 \u0641\u064a \u0631\u0633\u0648\u0645 \u0645\u062e\u0641\u064a\u0629 \u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0645\u0639\u0631\u0648\u0636 \u0647\u0648 \u0627\u0644\u0644\u064a \u062f\u0641\u0639\u062a\u0647.' },
  { daysAgo: 62, textEn: 'Excellent for quick delivery\u2014my client got the key instantly.', textAr: '\u0645\u0645\u062a\u0627\u0632 \u0644\u0644\u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u0633\u0631\u064a\u0639 \u0627\u0644\u0639\u0645\u064a\u0644 \u0648\u0635\u0644\u062a\u0647 \u0627\u0644\u0631\u062e\u0635\u0629 \u0641\u0648\u0631\u0627\u064b.' },
  { daysAgo: 64, textEn: 'Arabic support explained every step; smooth checkout.', textAr: '\u0627\u0644\u062f\u0639\u0645 \u0628\u0627\u0644\u0639\u0631\u0628\u064a \u0634\u0631\u062d \u0643\u0644 \u062e\u0637\u0648\u0629 \u0648\u0627\u0644\u062f\u0641\u0639 \u0643\u0627\u0646 \u0633\u0644\u0633.' },
  { daysAgo: 66, textEn: 'Mada and Apple Pay both worked; instant activation.', textAr: '\u0645\u062f\u0649 \u0648\u0623\u0628\u0644 \u0628\u0627\u064a \u0627\u0634\u062a\u063a\u0644\u0648\u0627 \u0648\u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0643\u0627\u0646 \u0641\u0648\u0631\u064a.' },
  { daysAgo: 68, textEn: 'Appreciate the honest ETA\u2014got the key even faster.', textAr: '\u0623\u0642\u062f\u0631 \u0627\u0644\u0648\u0639\u062f \u0628\u0627\u0644\u0648\u0642\u062a \u0648\u0635\u0644\u0646\u064a \u0627\u0644\u0645\u0641\u062a\u0627\u062d \u0623\u0633\u0631\u0639 \u0645\u0645\u0627 \u062a\u0648\u0642\u0639\u062a\u0647.' },
  { daysAgo: 70, textEn: 'License works great; support followed up after activation.', textAr: '\u0627\u0644\u0631\u062e\u0635\u0629 \u062a\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0645\u0645\u062a\u0627\u0632 \u0648\u0627\u0644\u062f\u0639\u0645 \u062a\u0627\u0628\u0639 \u0628\u0639\u062f \u0627\u0644\u062a\u0641\u0639\u064a\u0644.' },
  { daysAgo: 72, textEn: 'Clear refund window stated; I feel safe buying here.', textAr: '\u0645\u062f\u0629 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0648\u0627\u0636\u062d\u0629 \u0623\u062d\u0633 \u0628\u0627\u0644\u0623\u0645\u0627\u0646 \u0628\u0627\u0644\u0634\u0631\u0627\u0621 \u0647\u0646\u0627.' },
  { daysAgo: 74, textEn: 'Fast replies and instant codes\u2014exactly what I needed.', textAr: '\u0631\u062f\u0648\u062f \u0633\u0631\u064a\u0639\u0629 \u0648\u0623\u0643\u0648\u0627\u062f \u0641\u0648\u0631\u064a\u0629 \u0628\u0627\u0644\u0636\u0628\u0637 \u0627\u0644\u0644\u064a \u0623\u062d\u062a\u0627\u062c\u0647.' },
  { daysAgo: 76, textEn: 'Used for a Kuwaiti project; activation smooth.', textAr: '\u0627\u0633\u062a\u062e\u062f\u0645\u062a\u0647 \u0644\u0645\u0634\u0631\u0648\u0639 \u0641\u064a \u0627\u0644\u0643\u0648\u064a\u062a \u0648\u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0643\u0627\u0646 \u0633\u0644\u0633.' },
  { daysAgo: 78, textEn: 'Support called to confirm details; appreciated the care.', textAr: '\u0627\u0644\u062f\u0639\u0645 \u0627\u062a\u0635\u0644 \u0644\u0644\u062a\u0623\u0643\u064a\u062f \u0623\u0642\u062f\u0631 \u0627\u0647\u062a\u0645\u0627\u0645\u0647\u0645.' },
  { daysAgo: 80, textEn: 'Invoice and code arrived together; no waiting.', textAr: '\u0627\u0644\u0641\u0627\u062a\u0648\u0631\u0629 \u0648\u0627\u0644\u0643\u0648\u062f \u0648\u0635\u0644\u0648\u0627 \u0645\u0639\u0627\u064b \u0628\u062f\u0648\u0646 \u0627\u0646\u062a\u0638\u0627\u0631.' },
  { daysAgo: 82, textEn: 'Team-ready delivery\u2014got multiple keys at once.', textAr: '\u062a\u0633\u0644\u064a\u0645 \u062c\u0627\u0647\u0632 \u0644\u0644\u0641\u0631\u0642 \u0648\u0635\u0644\u0646\u064a \u0623\u0643\u062b\u0631 \u0645\u0646 \u0645\u0641\u062a\u0627\u062d \u0645\u0631\u0629 \u0648\u062d\u062f\u0629.' },
  { daysAgo: 84, textEn: 'Product matches description; activation flawless.', textAr: '\u0627\u0644\u0645\u0646\u062a\u062c \u0645\u0637\u0627\u0628\u0642 \u0644\u0644\u0648\u0635\u0641 \u0648\u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0628\u062f\u0648\u0646 \u0645\u0634\u0627\u0643\u0644.' },
  { daysAgo: 86, textEn: 'Trusted them for a client delivery; no delays.', textAr: '\u0627\u0639\u062a\u0645\u062f\u062a \u0639\u0644\u064a\u0647\u0645 \u0644\u062a\u0633\u0644\u064a\u0645 \u0639\u0645\u064a\u0644 \u0628\u062f\u0648\u0646 \u0623\u064a \u062a\u0623\u062e\u064a\u0631.' },
  { daysAgo: 88, textEn: 'Gulf-based support knows the payment options we use.', textAr: '\u0627\u0644\u062f\u0639\u0645 \u062e\u0644\u064a\u062c\u064a \u0648\u064a\u0641\u0647\u0645 \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0644\u064a \u0646\u0633\u062a\u062e\u062f\u0645\u0647\u0627.' },
  { daysAgo: 90, textEn: 'Keys are legitimate and activate instantly.', textAr: '\u0627\u0644\u0645\u0641\u0627\u062a\u064a\u062d \u0623\u0635\u0644\u064a\u0629 \u0648\u062a\u062a\u0641\u0639\u0651\u0644 \u0641\u0648\u0631\u0627\u064b.' },
  { daysAgo: 92, textEn: 'Appreciate the Arabic-first experience; easy to follow.', textAr: '\u0627\u0644\u062a\u062c\u0631\u0628\u0629 \u0628\u0627\u0644\u0639\u0631\u0628\u064a \u0623\u0648\u0644\u0627\u064b \u0648\u0633\u0647\u0644\u0629 \u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629.' },
  { daysAgo: 94, textEn: 'Got a discount code and the key right away.', textAr: '\u062d\u0635\u0644\u062a \u0639\u0644\u0649 \u0643\u0648\u0628\u0648\u0646 \u062e\u0635\u0645 \u0648\u0627\u0644\u0643\u0648\u062f \u0648\u0635\u0644 \u0645\u0628\u0627\u0634\u0631\u0629.' },
  { daysAgo: 96, textEn: 'Support fixed my typo and resent the code quickly.', textAr: '\u0627\u0644\u062f\u0639\u0645 \u0635\u062d\u062d \u0627\u0644\u062e\u0637\u0623 \u0648\u0623\u0639\u0627\u062f \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0643\u0648\u062f \u0628\u0633\u0631\u0639\u0629.' },
  { daysAgo: 98, textEn: 'Great for GCC teams needing fast activation.', textAr: '\u0645\u0645\u062a\u0627\u0632 \u0644\u0641\u0631\u0642 \u0627\u0644\u062e\u0644\u064a\u062c \u0627\u0644\u0644\u064a \u062a\u062d\u062a\u0627\u062c \u062a\u0641\u0639\u064a\u0644 \u0633\u0631\u064a\u0639.' },
  { daysAgo: 100, textEn: 'Refund once processed in hours; impressed.', textAr: '\u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u062a\u0645 \u062e\u0644\u0627\u0644 \u0633\u0627\u0639\u0627\u062a \u0645\u0628\u0647\u0631.' },
  { daysAgo: 105, textEn: 'Keys delivered and verified; no issues.', textAr: '\u0627\u0644\u0645\u0641\u0627\u062a\u064a\u062d \u0648\u0635\u0644\u062a \u0648\u062a\u0641\u0639\u0651\u0644\u062a \u0628\u062f\u0648\u0646 \u0645\u0634\u0627\u0643\u0644.' },
  { daysAgo: 110, textEn: 'I like the instant SMS + email delivery.', textAr: '\u0623\u0639\u062c\u0628\u0646\u064a \u0648\u0635\u0648\u0644 \u0627\u0644\u062a\u0646\u0628\u064a\u0647 SMS \u0645\u0639 \u0627\u0644\u0625\u064a\u0645\u064a\u0644 \u0641\u0648\u0631\u0627\u064b.' },
  { daysAgo: 115, textEn: 'Bought for a Riyadh client; activation was instant.', textAr: '\u0627\u0634\u062a\u0631\u064a\u062a \u0644\u0639\u0645\u064a\u0644 \u0641\u064a \u0627\u0644\u0631\u064a\u0627\u0636 \u0648\u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0643\u0627\u0646 \u0641\u0648\u0631\u064a.' },
  { daysAgo: 120, textEn: 'Even old orders still show in dashboard; organized.', textAr: '\u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0642\u062f\u064a\u0645\u0629 \u0645\u0627 \u0632\u0627\u0644\u062a \u062a\u0638\u0647\u0631 \u0641\u064a \u0644\u0648\u062d\u0629 \u0627\u0644\u062a\u062d\u0643\u0645 \u062a\u0646\u0638\u064a\u0645 \u0645\u0645\u062a\u0627\u0632.' },
];

const makeReviewName = (index, language) => {
  const namePool = language === 'ar' ? UNIQUE_NAMES_AR : UNIQUE_NAMES_EN;
  return namePool[index % namePool.length];
};

const productReviews = {
  en: productReviewsBase.map((item, idx) => ({ name: makeReviewName(idx, 'en'), rating: 5, daysAgo: item.daysAgo, text: item.textEn })),
  ar: productReviewsBase.map((item, idx) => ({ name: makeReviewName(idx, 'ar'), rating: 5, daysAgo: item.daysAgo, text: item.textAr })),
};

window.translations = {
  en: {
    // Header Navigation
    home: 'Home',
    products: 'Products',
    categories: 'Categories',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
    
    // Mobile Menu
    quickActions: 'Quick actions',
    fast: 'Fast',
    openMenu: 'Open menu',
    searchLabel: 'Search',
    findProduct: 'Find a product',
    cartLabel: 'Cart',
    reviewItems: 'Review items',
    categoriesLabel: 'Categories',
    browseByType: 'Browse by type',
    trackOrder: 'Track Order',
    orderStatus: 'Order status',
    helpLabel: 'Help',
    faqsSupport: 'FAQs & support',
    navigation: 'Navigation',
    helpPolicies: 'Help & policies',
    viewLabel: 'View',
    shippingLabel: 'Shipping',
    digitalGuarantee: 'Digital guarantee',
    returnsLabel: 'Returns',
    privacyLabel: 'Privacy',
    termsLabel: 'Terms',
    safeShopping: 'Safe shopping',
    safeShoppingDescDigital: 'Clear digital delivery, a 14-day guarantee, and fast support when needed.',
    safeShoppingDescPhysical: 'Clear shipping, flexible returns, and fast support when needed.',
    contactUs: 'Contact',
    helpUs: 'Help',
    
    // Auth
    login: 'Login',
    logout: 'Logout',
    signUp: 'Sign Up',
    register: 'Register',
    profile: 'Profile',
    adminPanel: 'Admin Panel',
    account: 'Account',
    
    // Search
    search: 'Search...',
    searchPlaceholder: 'Search for products, services, or categories...',
    searchResults: 'Search Results',
    noResults: 'No results found',
    
    // Cart
    cart: 'Cart',
    yourCart: 'Your Cart',
    emptyCart: 'Your cart is empty',
    addToCart: 'Add to Cart',
    removeFromCart: 'Remove',
    checkout: 'Checkout',
    continueShopping: 'Continue Shopping',
    subtotal: 'Subtotal',
    total: 'Total',
    
    // Products
    buyNow: 'Buy Now',
    viewDetails: 'View Details',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    limitedStock: 'Limited Stock',
    price: 'Price',
    salePrice: 'Sale Price',
    quantity: 'Quantity',
    description: 'Description',
    features: 'Features',
    specifications: 'Specifications',
    reviews: 'Reviews',
    rating: 'Rating',
    
    // Categories
    allCategories: 'All Categories',
    filterByCategory: 'Filter by Category',
    'Shop by Category': 'Shop by Category',
    'Subcategories': 'Subcategories',
    'No products found in this category': 'No products found in this category',
    'Shop Now': 'Shop Now',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    viewAllResults: 'View all results for "{query}"',
    exploreCategory: 'Explore {name}',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    viewAll: 'View All',
    showMore: 'Show More',
    showLess: 'Show Less',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    and: 'and',
    
    // Messages
    loggingOut: 'Logging out...',
    addedToCart: 'Added to cart',
    removedFromCart: 'Removed from cart',
    cartUpdated: 'Cart updated',
    
    // Footer
    allRightsReserved: 'All rights reserved',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    followUs: 'Follow Us',
    quickLinks: 'Quick Links',

    // Common namespace \u2014 used by t("common.X") calls in site (non-admin) components.
    // Mirrors the most-used flat keys above so callers can use either form.
    common: {
      addedToCart: 'Added to cart',
      removedFromCart: 'Removed from cart',
      cartUpdated: 'Cart updated',
      removeFromCart: 'Remove',
      remove: 'Remove',
      quantity: 'Quantity',
      outOfStock: 'Out of Stock',
      inStock: 'In Stock',
      total: 'Total',
      subtotal: 'Subtotal',
      continueShopping: 'Continue Shopping',
      cancel: 'Cancel',
      close: 'Close',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      loading: 'Loading...',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
    },

    // Cart
    cart: {
      shoppingCart: 'Shopping Cart',
      productUnavailable: 'Product not available',
      items: 'items',
      item: 'item',
      emptyCart: 'Your cart is empty',
      addProductsToStart: 'Add some products to get started',
      digitalProduct: 'Digital Product',
      subtotal: 'Subtotal',
      total: 'Total',
      proceedToCheckout: 'Proceed to Checkout',
      continueShopping: 'Continue Shopping',
      off: 'OFF',
      outOfStock: 'Out of Stock',
      onlyAvailable: 'Only {count} available',
      maxAvailableReached: 'Maximum available reached',
      unavailableLabel: 'Unavailable',
      availableLabel: 'Available',
      removeAllUnavailable: 'Remove all unavailable items',
      youSaved: 'You saved',
      totalAmount: 'Total',
      removeUnavailableFirst: 'Remove unavailable items first',
      clickToPayNow: 'Click here to pay now',
      itemSingular: 'item',
      itemPlural: 'items',
      productSingular: 'product',
      productPlural: 'products'
    },

    // Product Page
    productPage: {
      home: 'Home',
      products: 'Products',
      backToProducts: 'Back to Products',
      featured: 'FEATURED',
      popular: 'POPULAR',
      currentlyUnavailable: 'Currently Unavailable',
      outOfStock: 'Out of Stock',
      available: 'available',
      backorderAvailable: 'Backorder available',
      price: 'Price',
      limitedTimeOffer: 'Limited Time Offer',
      instantAccess: 'Instant delivery',
      lifetimeUpdates: 'Lifetime Updates',
      securePayment: 'Secure Payment',
      support247: '24/7 Support',
      addToCart: 'Add to Cart',
      addedToCart: 'Added to Cart!',
      viewLiveDemo: 'View Live Demo',
      instantDelivery: 'Instant Delivery',
      secureCheckout: 'Secure Checkout',
      productGallery: 'Product Gallery',
      description: 'Description',
      features: 'Features',
      reviews: 'Reviews',
      detailedInformation: 'Detailed Information',
      whatYoullGet: "What You'll Get:",
      keyFeatures: 'Key Features',
      whyChooseThisProduct: 'Why Choose This Product?',
      secureReliable: 'Secure & Reliable',
      builtWithSecurity: 'Built with security best practices',
      highPerformance: 'High Performance',
      optimizedForSpeed: 'Optimized for speed and efficiency',
      cleanCode: 'Clean Code',
      wellDocumented: 'Well-documented and maintainable',
      expertSupport: 'Expert Support',
      technicalAssistance: '24/7 technical assistance',
      customerReviews: 'Customer Reviews',
      wouldRecommend: '97% recommend the store',
      customersLove: 'Customers praise the instant activation and fast support. Secure checkout with a 24h refund guarantee when needed.',
      verifiedPurchase: 'Verified Purchase',
      loadMoreReviews: 'Show more reviews',
      youMightAlsoLike: 'You Might Also Like',
      similarProducts: 'Similar products from the same category',
      viewAll: 'View All',
      viewAllProducts: 'View All Products',
      unavailable: 'Unavailable',
      sold: 'sold',
      professionalDigitalSolution: 'Professional Digital Solution',
      productDemoVideo: 'Product Demo Video',
      // Physical mode alternatives
      fastShipping: 'Fast Shipping',
      qualityGuarantee: 'Quality Guarantee',
      easyReturns: 'Easy Returns',
      customerService: 'Customer Service',
      whatYoullReceive: "What You'll Receive:",
      productFeatures: 'Product Features',
      // Default Features
      defaultFeatures: {
        professionalGrade: 'Professional grade code quality',
        comprehensiveDocs: 'Comprehensive documentation included',
        regularUpdates: 'Regular updates and improvements',
        prioritySupport: 'Priority technical support',
        secureImplementation: 'Secure and tested implementation',
        easyIntegration: 'Easy integration process',
      },
      // Physical mode features
      physicalFeatures: {
        premiumQuality: 'Premium quality materials',
        carefulPackaging: 'Careful packaging',
        fastDelivery: 'Fast delivery',
        satisfactionGuarantee: 'Satisfaction guarantee',
        authenticProduct: 'Authentic product',
        customerSupport: 'Customer support',
      },
      // Physical mode alternatives for badges and sections
      physicalProduct: 'Physical Product',
      whyChooseThisItem: 'Why Choose This Item?',
      // Physical mode Why Choose section
      testedQuality: 'Tested Quality',
      rigorousQualityControl: 'Rigorous quality control standards',
      fastDeliveryTitle: 'Fast Delivery',
      quickShipping: 'Quick and secure shipping',
      originalProduct: 'Original Product',
      authenticGuaranteed: '100% authentic guaranteed',
      supportTeam: 'Support Team',
      supportDescription: 'Dedicated customer support',
      playVideo: 'Play video',
      watchDemo: 'Watch our comprehensive product demonstration'
    },
    
    // Home Page
    featuredProducts: 'Featured Products',
    latestProducts: 'Latest Products',
    popularProducts: 'Popular Products',
    whyChooseUs: 'Why Choose Us',
    ourServices: 'Our Services',
    testimonials: 'Testimonials',
    
    // Detailed Sections
    servicesSection: {
      badge: 'Our Professional Services',
      headingPrimary: 'Advanced',
      headingHighlight: 'Solutions',
      headingSecondary: 'for Professionals',
      description: 'We provide comprehensive development services in blockchain and Web3 with guaranteed quality and security.',
      popularBadge: 'Most Popular',
      cta: 'Order Service',
      cards: {
        web3Development: {
          title: 'Web3 Development',
          description: 'Custom blockchain solutions, smart contracts, and DeFi platforms built with cutting-edge technology.',
          price: 'From $5000',
          features: ['Smart Contracts', 'DApp Development', 'Token Creation', 'NFT Platforms']
        },
        presalePlatforms: {
          title: 'Presale Platforms',
          description: 'Professional presale websites with advanced features, analytics, and secure payment systems.',
          price: 'From $2000',
          features: ['Custom Design', 'Payment Gateway', 'Analytics Dashboard', 'Mobile Responsive']
        },
        securitySolutions: {
          title: 'Security Solutions',
          description: 'Advanced security tools and audit services to protect your blockchain projects and assets.',
          price: 'From $3000',
          features: ['Security Audit', 'Penetration Testing', 'Vulnerability Assessment', '24/7 Monitoring']
        },
        exchangeDevelopment: {
          title: 'Exchange Development',
          description: 'Complete CEX/DEX platforms with advanced trading features and institutional-grade security.',
          price: 'From $10000',
          features: ['Trading Engine', 'Liquidity Management', 'KYC/AML', 'Multi-Currency Support']
        },
        whiteLabelSolutions: {
          title: 'White Label Solutions',
          description: 'Ready-to-deploy branded solutions that can be customized to match your business needs.',
          price: 'From $1500',
          features: ['Brand Customization', 'Quick Deployment', 'Full Support', 'Source Code']
        },
        customDevelopment: {
          title: 'Custom Development',
          description: 'Tailored development services for unique projects and specific business requirements.',
          price: 'Custom Quote',
          features: ['Custom Solutions', 'Dedicated Team', 'Agile Development', 'Long-term Support']
        }
      }
    },
    productsSection: {
      badge: 'Product Categories',
      headingPrimary: 'Explore Our',
      headingHighlight: 'Products',
      headingSecondary: 'By Category',
      description: 'Browse our exclusive collection of digital products organized by category.',
      cta: 'View Products',
      viewAll: 'View All Products',
      categories: {
        walletApplications: {
          title: 'Wallet Applications',
          description: 'Advanced multi-currency wallet applications with high security and user-friendly interface'
        },
        web3Scripts: {
          title: 'Web3 Scripts',
          description: 'Comprehensive collection of ready-to-use Web3 scripts with installation guides'
        },
        presalePlatforms: {
          title: 'Presale Platforms',
          description: 'Professional presale websites with advanced features and secure payment systems'
        },
        exchangePlatforms: {
          title: 'DEX/CEX Platforms',
          description: 'Complete exchange platforms with advanced trading features and institutional-grade security'
        }
      }
    },
    contactPage: {
      heroTitlePrimary: 'Get In',
      heroTitleHighlight: 'Touch',
      heroDescription: 'Have questions about our products or need custom development services? Our expert team is here to help you succeed.',
      contactInformationTitle: 'Contact Information',
      contactInformationDescription: 'Ready to take your project to the next level? Reach out to us through any of these channels.',
      labels: {
        email: 'Email',
        phone: 'Phone',
        hours: 'Business Hours',
        location: 'Location',
        whatWeOffer: 'What We Offer'
      },
      supportFeatures: {
        support: '24/7 Technical Support',
        security: 'Secure Communication',
        response: 'Quick Response Time'
      },
      infoLines: {
        hoursWeekdays: 'Sunday - Thursday: 9:00 AM - 6:00 PM',
        hoursWeekend: 'Friday - Saturday: Limited support',
        locationPrimary: 'Online store',
        locationSecondary: 'Serving customers across the Gulf'
      },
      contactDetails: {
        emails: [],
        phones: []
      }
    },
    contactForm: {
      title: 'Send us a Message',
      firstName: 'First Name',
      lastName: 'Last Name',
      emailAddress: 'Email Address',
      subject: 'Subject',
      subjectPlaceholder: 'Select a subject',
      subjects: {
        general: 'General Inquiry',
        custom: 'Custom Development',
        support: 'Technical Support',
        billing: 'Billing Question',
        partnership: 'Partnership'
      },
      message: 'Message',
      messagePlaceholder: 'Tell us about your project or question...',
      privacyNotice: 'I agree to the',
      placeholders: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      },
      submit: 'Send Message'
    },
    aboutPage: {
      badge: 'About {siteName}',
      heroHeadingPrimary: 'Building the Future',
      heroHeadingSecondary: 'of Web3 Solutions',
      heroDescription: 'We are a team of passionate developers and blockchain experts dedicated to creating professional, secure, and innovative Web3 tools for the global community.',
      ctaPrimary: 'Explore Products',
      ctaSecondary: 'Contact Us',
      stats: {
        activeUsers: 'Active Users',
        productsDelivered: 'Products Delivered',
        successRate: 'Success Rate',
        countriesServed: 'Countries Served'
      },
      statsValues: {
        activeUsers: '10,000+',
        productsDelivered: '50+',
        successRate: '99.9%',
        countriesServed: '45+'
      },
      missionTitle: 'Our Mission',
      missionDescription: 'To empower developers, businesses, and individuals with professional-grade Web3 tools and blockchain solutions.',
      valuesTitle: 'Our Core Values',
      valuesSubtitle: 'The principles that guide everything we do',
      teamTitle: 'Our Team',
      teamSubtitle: 'Dedicated professionals working together to deliver excellence',
      journeyTitle: 'Our Journey',
      journeySubtitle: 'Key milestones in our growth story',
      ctaTitle: 'Join Our Community',
      ctaDescription: 'Be part of the growing ecosystem of developers and businesses building the future of Web3',
      valuesList: [
        {
          title: 'Security First',
          description: 'We prioritize security in every product we develop, implementing industry-leading practices and audited smart contracts.'
        },
        {
          title: 'Innovation',
          description: 'Constantly pushing boundaries with cutting-edge Web3 technologies and blockchain solutions.'
        },
        {
          title: 'Customer Success',
          description: 'Your success is our mission. We provide 24/7 support and comprehensive documentation.'
        },
        {
          title: 'Excellence',
          description: 'Committed to delivering premium quality products that exceed expectations.'
        }
      ],
      teamMembers: [
        {
          name: 'Development Team',
          role: 'Blockchain Developers',
          description: 'Expert developers with 5+ years in Web3 and smart contract development.'
        },
        {
          name: 'Security Team',
          role: 'Security Auditors',
          description: 'Certified security professionals ensuring all products meet the highest standards.'
        },
        {
          name: 'Support Team',
          role: 'Customer Success',
          description: '24/7 dedicated support team ready to assist with any questions or issues.'
        }
      ],
      journeyTimeline: [
        { year: '2021', title: 'Company Founded', description: 'Started our journey in Web3 development.' },
        { year: '2022', title: 'First 1000 Users', description: 'Reached our first major milestone.' },
        { year: '2023', title: 'Product Expansion', description: 'Launched 20+ professional products.' },
        { year: '2024', title: 'Global Reach', description: 'Expanded services to 45+ countries.' },
        { year: '2025', title: 'Industry Leader', description: 'Recognized as top Web3 solutions provider.' }
      ],
      ctaButton: 'Get Started',
      highReliability: 'High Reliability',
      highReliabilityDesc: '100% tested and secure products',
      superiorPerformance: 'Superior Performance',
      superiorPerformanceDesc: 'Optimized solutions for speed',
      support247Title: '24/7 Support',
      support247Desc: 'Support team available around the clock',
      premiumQuality: 'Premium Quality',
      premiumQualityDesc: 'Highest development standards'
    },
    privacyPage: {
      hero: {
        badge: 'Your Privacy Matters',
        titlePrimary: 'Privacy',
        titleHighlight: 'Policy',
        description: 'We are committed to protecting your privacy and handling your data responsibly. This policy explains what information we collect, how we use it, who we share it with, and the choices you have.',
        lastUpdated: 'Last updated: June 18, 2026'
      },
      sections: [
        {
          key: 'informationWeCollect',
          title: 'Information We Collect',
          items: [
            'Contact details you provide at checkout or registration: name, email address, phone number, and country',
            'Shipping address (for physical orders only) to deliver your order',
            'Order and purchase history needed to deliver products and provide support',
            'Device and usage data such as IP address, browser type, and pages visited',
            'Advertising identifiers from the link you arrived through (e.g. TikTok, Meta or Snapchat click IDs) used to measure ad performance',
            'We do NOT collect sensitive personal information \u2014 no national IDs, passport numbers, bank or full card details, passwords, health, religious or biometric data'
          ]
        },
        {
          key: 'howWeUseInformation',
          title: 'How We Use Your Information',
          items: [
            'To process your order, deliver products, and send purchase confirmations',
            'To contact you about your order (email, phone, or messaging apps)',
            'To provide customer support and respond to inquiries',
            'To measure and optimize our advertising on platforms like TikTok, Meta, Snapchat and Google',
            'To improve our website, prevent fraud, and keep the platform secure',
            'Only for the purposes described here \u2014 never for anything you have not been told about'
          ]
        },
        {
          key: 'dataSecurity',
          title: 'Data Security & Payments',
          items: [
            'All card payments are processed by licensed, PCI-DSS compliant third-party payment gateways',
            'We do NOT store your full card number or CVV on our servers',
            'Industry-standard SSL/TLS encryption for all data transmission',
            'Secure servers with limited employee access to personal information',
            'Regular backups and disaster-recovery procedures',
            'Compliance with applicable data-protection standards'
          ]
        },
        {
          key: 'informationSharing',
          title: 'Information Sharing',
          items: [
            'We never sell your personal information to anyone',
            'Payment gateways receive only the data needed to process your payment',
            'Shipping/delivery partners receive only what is needed to deliver physical orders',
            'Advertising & analytics partners (TikTok, Meta, Snapchat, Google) may receive limited, securely hashed identifiers (such as a hashed email or phone) solely to measure and optimize advertising',
            'We disclose information when required by law or to prevent fraud',
            'All service providers are bound by confidentiality and data-protection obligations'
          ]
        },
        {
          key: 'yourRights',
          title: 'Your Rights & Choices',
          items: [
            'Access your personal data at any time',
            'Request correction of inaccurate information',
            'Request deletion of your account and data',
            'Opt out of marketing communications at any time',
            'Limit ad tracking via your device/browser settings or the platform (e.g. TikTok) ad-settings',
            'Object to or restrict processing of your personal data'
          ]
        },
        {
          key: 'cookies',
          title: 'Cookies, Pixels & Tracking',
          items: [
            'Essential cookies required for the website and checkout to function',
            'Analytics cookies that help us understand how the site is used',
            'Preference cookies that remember your language and settings',
            'Advertising/measurement pixels from partners such as TikTok, Meta, Snapchat and Google, used to measure and optimize our ads',
            'You can limit advertising cookies through your browser, device, or the ad platform settings',
            'We request your consent before processing your data at checkout'
          ]
        }
      ],
      additional: [
        {
          key: 'advertisingPartners',
          title: 'Advertising & Measurement Partners',
          body: 'We advertise on platforms such as TikTok, Meta (Facebook/Instagram), Snapchat and Google. To measure whether our ads lead to purchases and to improve their relevance, we may share a limited set of securely hashed identifiers (for example a hashed email or phone number) and event data (such as page views or completed orders) with these partners through their official measurement tools (pixels and server-side Events/Conversions APIs). This data is used only for advertising measurement and optimization, is never sold, and never includes sensitive personal information. You can limit this tracking through your browser/device settings or the ad preferences of each platform.'
        },
        {
          key: 'dataRetention',
          title: 'Data Retention',
          body: 'We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Transaction records are retained as required by applicable financial regulations.'
        },
        {
          key: 'internationalTransfers',
          title: 'International Transfers',
          body: 'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this policy and applicable laws.'
        },
        {
          key: 'childrenPrivacy',
          title: "Children's Privacy",
          body: 'Our services are not directed to individuals under 18. We do not knowingly collect personal information from children and will delete it if discovered.'
        },
        {
          key: 'policyChanges',
          title: 'Changes to This Policy',
          body: 'We may update this policy from time to time. We will notify you by posting the new policy on this page and updating the date. Significant changes may be emailed to you.'
        }
      ],
      contact: {
        title: 'Contact Us',
        description: 'If you have any questions about this Privacy Policy or how we handle your data, please contact us:',
        emailLabel: 'Privacy Email',
        emailValue: 'privacy@store.com',
        dpoLabel: 'Data Protection Officer',
        dpoValue: 'dpo@store.com'
      },
      cta: {
        title: 'Your Data is Safe With Us',
        description: 'We use industry-leading security measures to protect your information',
        primaryButton: 'Contact Us',
        secondaryButton: 'Learn More'
      }
    },
    termsPage: {
      hero: {
        badge: 'Legal Agreement',
        titlePrimary: 'Terms of',
        titleHighlight: 'Service',
        description: 'Please read these terms carefully before using our services. By accessing or using {brand}, you agree to be bound by these terms.',
        lastUpdated: 'Last updated: June 18, 2026'
      },
      introduction: {
        title: 'Agreement to Terms',
        paragraphs: [
          'These Terms of Service ("Terms") govern your access to and use of {brand}\'s website, products, and services.',
          'By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.',
          'Important: These Terms include information about your legal rights, remedies, and obligations, including limitations and exclusions that may apply to you.'
        ]
      },
      sections: [
        {
          key: 'accountTerms',
          title: 'Account Terms',
          items: [
            'You must be 18 years or older to use our services',
            'You are responsible for maintaining account security',
            'One account per user; multiple accounts are prohibited',
            'Accurate and truthful information required during registration',
            'Account sharing or selling is strictly forbidden',
            'We reserve the right to terminate accounts violating terms'
          ]
        },
        {
          key: 'paymentBilling',
          title: 'Payment and Billing',
          items: [
            'All prices are in USD unless otherwise specified',
            'Payment must be made in full before product delivery',
            'We accept various payment methods including cards and digital wallets',
            'All sales are final; no refunds after access',
            'You agree to pay all applicable taxes',
            'Prices may change without notice'
          ]
        },
        {
          key: 'intellectualProperty',
          title: 'Intellectual Property',
          items: [
            'Products are licensed, not sold',
            'You receive a non-exclusive, non-transferable license',
            'No redistribution or resale of purchased products',
            'Reverse engineering is prohibited',
            'We retain all rights to our products and content',
            'Violation may result in legal action'
          ]
        },
        {
          key: 'acceptableUse',
          title: 'Acceptable Use',
          items: [
            'Use products only for lawful purposes',
            'Do not use our services for illegal activities',
            'No malicious or harmful use of products',
            'Comply with all applicable laws and regulations',
            'Respect intellectual property rights',
            'No harassment or abuse of other users or staff'
          ]
        },
        {
          key: 'prohibitedActivities',
          title: 'Prohibited Activities',
          items: [
            'Attempting to hack or compromise our systems',
            'Distributing malware or viruses',
            'Creating unauthorized accounts or access',
            'Scraping or automated data collection',
            'Interfering with service operations',
            'Impersonating {brand} or its representatives'
          ]
        },
        {
          key: 'disclaimers',
          title: 'Disclaimers and Limitations',
          items: [
            'Products provided "as is" without warranties',
            'No guarantee of specific results or outcomes',
            'We are not liable for indirect or consequential damages',
            'Liability limited to purchase price',
            'You assume all risk of product use',
            'We do not warrant error-free operation'
          ]
        }
      ],
      additionalSections: [
        {
          key: 'productLicenses',
          title: 'Product Licenses',
          body: 'When you purchase a product from {brand}, you receive a license to use that product under specific terms. Each product includes its own license agreement that must be reviewed and accepted before use.',
          youMayLabel: 'You May',
          youMay: ['Use for personal or commercial projects', 'Modify code for your own use', 'Create end products for clients'],
          youMayNotLabel: 'You May Not',
          youMayNot: ['Redistribute or resell the product', 'Share your license with others', 'Use for illegal or harmful purposes']
        },
        {
          key: 'supportUpdates',
          title: 'Support and Updates',
          body: 'We provide technical support for all purchased products, including bug fixes, compatibility updates, and assistance with functionality. Product updates are provided free of charge for the lifetime of the product.'
        },
        {
          key: 'termination',
          title: 'Termination',
          body: 'We may terminate or suspend your access immediately for any breach of these Terms. Upon termination, your right to use the services will cease, but certain clauses will survive.'
        },
        {
          key: 'governingLaw',
          title: 'Governing Law and Disputes',
          body: 'These Terms are governed by international commercial law principles. Disputes will be resolved through binding arbitration after attempting informal resolution.'
        },
        {
          key: 'changes',
          title: 'Changes to Terms',
          body: 'We may modify or replace these Terms at any time. Continued use after changes become effective constitutes acceptance of the new Terms.'
        },
        {
          key: 'contact',
          title: 'Contact Information',
          body: 'If you have any questions about these Terms of Service, please contact us:',
          contactDetails: {
            emailLabel: 'Email',
            emailValue: 'legal@store.com',
            linkLabel: 'Website',
            linkText: 'Contact Support',
            linkHref: '/contact'
          }
        }
      ],
      cta: {
        title: 'Questions About Our Terms?',
        description: 'Our legal team is here to help clarify any questions you may have',
        primaryButton: 'Contact Us',
        secondaryButton: 'Privacy Policy'
      }
    },
    helpPage: {
      heroTitle: 'Help Center',
      heroDescription: 'Find answers to common questions and get the support you need',
      searchPlaceholder: 'Search for help...',
      quickLinks: {
        accountSetup: 'Account Setup',
        paymentGuide: 'Payment Guide',
        productInstallation: 'Product Installation',
        troubleshooting: 'Troubleshooting'
      },
      faqTitle: 'Frequently Asked Questions',
      categories: {
        gettingStarted: {
          title: 'Getting Started',
          faqs: [
            {
              question: 'How do I create an account?',
              answer: 'Click on the "Sign Up" button, fill in your details, and verify your email to activate your account.'
            },
            {
              question: 'What payment methods do you accept?',
              answer: 'We accept various payment methods including credit cards, mobile wallets, and bank transfers. Available options are shown on each product page.'
            },
            {
              question: 'How long does it take to receive my product?',
              answer: 'Digital products are available immediately after payment confirmation. Custom orders take 24-48 hours.'
            }
          ]
        },
        ordersPayments: {
          title: 'Orders & Payments',
          faqs: [
            {
              question: 'How can I track my order?',
              answer: 'Use your order number in the order tracking page or view "My Orders" inside your profile.'
            },
            {
              question: 'Can I cancel my order?',
              answer: 'Orders can be cancelled within 1 hour if delivery has not occurred. Contact support immediately.'
            },
            {
              question: 'What if my payment fails?',
              answer: 'Check your wallet balance and network fees. If issues persist, contact support with your transaction details.'
            }
          ]
        },
        productsAccess: {
          title: 'Products & Access',
          faqs: [
            {
              question: 'How do I access my purchased products?',
              answer: 'Visit "My Orders" inside your profile, locate the order, and open the links / codes for that order.'
            },
            {
              question: 'Can I get a refund?',
              answer: 'Refunds are only provided for technical issues that cannot be resolved. Contact support within 48 hours.'
            },
            {
              question: 'Do you offer product updates?',
              answer: 'All purchased products include free updates for 12 months. You will be notified via email when updates are available.'
            }
          ]
        }
      },
      supportSection: {
        title: 'Still Need Help?',
        description: 'Our support team is available 24/7 to assist you with any questions or issues',
        liveChat: {
          title: 'Live Chat Support',
          description: 'Chat with our support team in real-time',
          availability: 'Available 24/7'
        },
        emailSupport: {
          title: 'Email Support',
          description: "Send us an email and we'll respond within 24 hours",
          address: 'support@store.com'
        }
      },
      categoriesLabel: 'categories',
      questionsLabel: 'questions',
      clickToSeeAnswer: 'Click any question to see its answer',
      noResultsFor: 'No results for'
    },
    categoriesPage: {
      heroTitlePrimary: 'Product',
      heroTitleHighlight: 'Categories',
      heroDescription: 'Explore our comprehensive range of digital solutions organized by category. Find exactly what you need for your Web3 and cryptocurrency projects.',
      loading: 'Loading categories...',
      explorePrefix: 'Explore',
      ctaTitle: "Can't Find What You're Looking For?",
      ctaDescription: 'We offer custom development services to bring your unique ideas to life. Get in touch with our expert team.',
      primaryCta: 'Request Custom Solution',
      secondaryCta: 'Browse All Products'
    },
    statusPage: {
      heroTitle: 'System Status',
      heroDescription: 'Real-time status and uptime information for all our services',
      overallStatus: 'All Systems Operational',
      serviceStatusTitle: 'Service Status',
      incidentsTitle: 'Recent Incidents',
      maintenanceTitle: 'Scheduled Maintenance',
      uptimeHistoryTitle: '30-Day Uptime History',
      uptimeHistoryStart: '30 days ago',
      uptimeHistoryEnd: 'Today',
      subscribeTitle: 'Get Status Updates',
      subscribeDescription: 'Subscribe to receive notifications about service status and planned maintenance',
      subscribePlaceholder: 'Enter your email',
      subscribeButton: 'Subscribe',
      impactLabel: 'Expected Impact',
      statusLabels: {
        operational: 'Operational',
        degraded: 'Degraded',
        outage: 'Outage',
        resolved: 'Resolved'
      },
      services: [
        { key: 'website', name: 'Website', status: 'operational', uptime: '99.99%', responseTime: '45ms' },
        { key: 'api', name: 'API Server', status: 'operational', uptime: '99.98%', responseTime: '120ms' },
        { key: 'database', name: 'Database', status: 'operational', uptime: '99.99%', responseTime: '15ms' },
        { key: 'payments', name: 'Payment Processing', status: 'operational', uptime: '99.95%', responseTime: '230ms' },
        { key: 'contentAccess', name: 'Content Access', status: 'operational', uptime: '99.97%', responseTime: '89ms' }
      ],
      incidents: [
        {
          date: 'Nov 25, 2025',
          time: '14:30 UTC',
          title: 'Scheduled Maintenance Completed',
          status: 'resolved',
          description: 'Database optimization and security updates were successfully completed. All services are now operational.',
          updates: [
            { time: '16:00 UTC', message: 'All services restored and operating normally' },
            { time: '15:30 UTC', message: 'Final testing in progress' },
            { time: '14:30 UTC', message: 'Maintenance started as scheduled' }
          ]
        },
        {
          date: 'Nov 20, 2025',
          time: '09:15 UTC',
          title: 'API Performance Degradation',
          status: 'resolved',
          description: 'Brief API slowdown was detected and resolved. Response times returned to normal within 20 minutes.',
          updates: [
            { time: '09:35 UTC', message: 'Issue resolved, monitoring continues' },
            { time: '09:20 UTC', message: 'Investigating cause of slowdown' },
            { time: '09:15 UTC', message: 'API performance degradation detected' }
          ]
        }
      ],
      maintenance: [
        {
          date: 'Dec 5, 2025',
          time: '02:00 - 04:00 UTC',
          title: 'Infrastructure Upgrade',
          description: 'We will be upgrading our server infrastructure to improve performance and reliability.',
          impact: 'Brief interruptions may occur during this period'
        }
      ]
    },
    orderTrackingPage: {
      headerTitle: 'My Account',
      headerDescription: 'Manage your orders and account settings',
      tabs: {
        orders: 'Orders',
        profile: 'Profile'
      },
      searchPlaceholder: 'Search orders by ID or product name...',
      filterLabel: 'All Status',
      filterOptions: {
        pending: 'Pending',
        processing: 'Processing',
        completed: 'Completed',
        failed: 'Failed',
        cancelled: 'Cancelled',
        refunded: 'Refunded'
      },
      emptyState: {
        title: 'No orders found',
        noOrders: "You haven't placed any orders yet.",
        noMatches: 'No orders match your current filters.',
        cta: 'Start Shopping'
      },
      order: 'Order',
      products: 'product(s)',
      shipping: 'Shipping',
      estimatedDelivery: 'Estimated Delivery',
      email: 'Email',
      orderCard: {
        totalLabel: 'Total',
        itemsLabel: 'Items',
        viewDetails: 'View Details',
        dateLabel: 'Date'
      },
      profileSection: {
        personalInfo: 'Personal Information',
        firstName: 'First Name',
        lastName: 'Last Name',
        emailAddress: 'Email Address',
        phoneNumber: 'Phone Number',
        accountStats: 'Account Statistics',
        totalOrders: 'Total Orders',
        totalSpent: 'Total Spent',
        completedOrders: 'Completed Orders'
      },
      recentActivity: 'Recent Activity',
      modal: {
        title: 'Order Details',
        orderId: 'Order ID',
        status: 'Status',
        date: 'Date',
        total: 'Total',
        items: 'Items',
        quantity: 'Quantity',
        paymentInfo: 'Payment Information',
        transactionHash: 'Transaction Hash'
      },
      shippingInfo: 'Shipping Information',
      shippingAddress: 'Shipping Address',
      trackingNumber: 'Tracking Number',
      shippingStatuses: {
        pending: 'Pending',
        processing: 'Processing',
        shipped: 'Shipped',
        inTransit: 'In Transit',
        outForDelivery: 'Out for Delivery',
        delivered: 'Delivered',
        returned: 'Returned',
        failed: 'Failed'
      },
      failedToLoadOrders: 'Failed to load orders',
      connectionError: 'Please check your connection and try again.',
      retry: 'Retry',
      codBadge: 'COD',
      settled: 'Settled',
      trackingLabel: 'Tracking:',
      noteLabel: 'Note:',
      close: 'Close',
      cashOnDelivery: 'Cash on Delivery',
      preparingForShipping: 'Order is being prepared for shipping...',
      items: 'item(s)',
      qty: 'Qty:',
      subtotal: 'Subtotal',
      shippingCostLabel: 'Shipping',
      pageTitle: 'Order Tracking',
      pageDescription: 'Track your order shipments',
      carrier: 'Carrier',
      cancelOrder: 'Cancel Order',
      cancelOrderConfirm: 'Are you sure you want to cancel this order? This action cannot be undone.',
      cancelOrderSuccess: 'Order cancelled successfully.',
      cancelOrderError: 'Failed to cancel order. Please try again.',
      cannotCancelShipped: 'Cannot cancel: order has already been shipped. Please contact support.',
      cancelling: 'Cancelling...',
      loading: 'Loading...',
      guest: {
        title: 'Track your order',
        description: 'Enter your order number to view its status.',
        placeholder: 'Order number (e.g. SQX-XXXXXX)',
        submit: 'Track order',
        searching: 'Searching...',
        notFound: "We couldn't find an order with that number. Please check it and try again.",
        error: 'Something went wrong. Please try again.',
        signInHint: 'Have an account?',
        signIn: 'Sign in'
      }
    },

    // Shipping Address Form
    shippingForm: {
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      phone: 'Phone',
      phoneSecondary: 'Alt. Phone (Optional)',
      country: 'Country',
      selectCountry: 'Select Country',
      region: 'Region',
      selectRegion: 'Select Region',
      district: 'District/Area',
      selectDistrict: 'Select District',
      noDistricts: 'No districts available',
      streetAddress: 'Detailed Address',
      streetAddressPlaceholder: 'Street, area, building, floor, apartment...',
      landmark: 'Landmark (Optional)',
      landmarkPlaceholder: 'Near, opposite...',
      shippingCost: 'Shipping',
      deliveryTime: 'Delivery',
      notAvailable: 'Not available',
      required: 'Required',
      invalidPhone: 'Invalid number',
      free: 'Free',
      savedAddresses: 'Saved Addresses',
      selectAddress: 'Select Address',
      newAddress: 'New Address',
      saveAddress: 'Save address to my account',
      defaultAddress: 'Default',
      noSavedAddresses: 'No saved addresses',
      phonePlaceholder: 'Phone number'
    },

    // Policy Pages (DB fallback titles)
    policyPages: {
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      returnPolicy: 'Return Policy',
      shippingPolicy: 'Shipping Policy',
      digitalReturnGuarantee: 'Digital Return Guarantee'
    },

    // Shipping Tracker
    shippingTracker: {
      shippingStatus: 'Shipping Status',
      trackingNumber: 'Tracking Number',
      carrier: 'Carrier',
      shippedOn: 'Shipped on',
      deliveredOn: 'Delivered on',
      viewHistory: 'View Tracking History',
      hideHistory: 'Hide History',
      noHistory: 'No tracking history',
      failedDescription: 'Delivery attempt failed. We will contact you.',
      returnedDescription: 'Order has been returned.',
      steps: {
        pending: 'Order Placed',
        processing: 'Processing',
        shipped: 'Shipped',
        in_transit: 'In Transit',
        out_for_delivery: 'Out for Delivery',
        delivered: 'Delivered',
        returned: 'Returned',
        failed: 'Failed'
      }
    },

    // Checkout Failed Page
    checkoutFailed: {
      loading: 'Loading...',
      paymentFailed: 'Payment Failed',
      orderNumber: 'Order #',
      paymentFailedBadge: 'Payment Failed',
      orderSummary: 'Order Summary',
      orderNumberLabel: 'Order Number',
      amount: 'Amount',
      paymentMethod: 'Payment Method',
      orderType: 'Order Type',
      physicalProducts: 'Physical Products',
      digitalProducts: 'Digital Products',
      paymentStatus: 'Payment Status',
      failed: 'Failed',
      whatCanYouDo: 'What can you do?',
      tryAgain: 'Try Again',
      tryAgainDescription: 'Go back to checkout and retry payment',
      trackOrder: 'Track Order',
      trackOrderDescription: 'Check your order status',
      myOrders: 'My Orders',
      myOrdersDescription: 'View all orders',
      contactPage: 'Contact Page',
      needHelp: 'Need help? Contact us via',
      egp: 'EGP',
      // Error reason messages
      errorDefaultTitle: 'Payment could not be completed',
      errorDefaultDesc: 'An error occurred while processing your payment. Please try again or choose a different payment method.',
      errorCancelledTitle: 'Payment was cancelled',
      errorCancelledDesc: 'You cancelled the payment. No amount was charged. You can try again when you are ready.',
      errorVerificationTitle: 'Payment verification issue',
      errorVerificationDesc: 'We could not verify the payment status. If you were charged, please wait a few minutes and check your order via Track Order, or contact our support team.',
      errorServerTitle: 'Temporary payment server issue',
      errorServerDesc: 'The payment server is experiencing a temporary issue. No amount was charged. Please try again in a minute or choose a different payment method.',
      errorDeclinedTitle: 'Card declined',
      errorDeclinedDesc: 'Your card was declined by the issuing bank. Please check your card details and available balance, or try a different card.',
      errorInsufficientTitle: 'Insufficient funds',
      errorInsufficientDesc: 'Your account does not have enough balance to complete this transaction. Please ensure sufficient funds are available or use a different payment method.',
      errorExpiredTitle: 'Card expired',
      errorExpiredDesc: 'The card you used has expired. Please use a valid, non-expired card.',
      errorInvalidCardTitle: 'Invalid card details',
      errorInvalidCardDesc: 'Please double-check your card number, expiry date, and CVV code, then try again.',
      errorSecurityTitle: 'Security verification failed',
      errorSecurityDesc: '3D Secure / OTP verification failed. Please make sure you enter the correct verification code sent by your bank and try again.',
      errorTimeoutTitle: 'Payment timed out',
      errorTimeoutDesc: 'The payment took longer than expected. No amount was charged. Please try again.',
      errorRefundedTitle: 'Payment refunded',
      errorRefundedDesc: 'This payment has been refunded. The amount will appear in your account within 3-5 business days depending on your bank.',
      errorCryptoTitle: 'Cryptocurrency payment issue',
      errorCryptoDesc: 'There was an issue with your cryptocurrency payment. Please check your wallet and try again or choose a different payment method.',
      errorConnectionTitle: 'Connection issue',
      errorConnectionDesc: 'A connection issue occurred during payment. Please check your internet connection and try again.',
      errorGenericFailedDesc: 'Your payment was not completed successfully. Please check your payment details and available balance, then try again or use a different payment method.',
      errorTechnicalTitle: 'Temporary error',
      errorTechnicalDesc: 'A temporary error occurred while processing your payment. No amount was charged. Please try again in a moment.',
      errorFallbackDesc: 'Your payment was not completed successfully. Please try again or choose a different payment method. If the issue persists, contact our support team.'
    },
    checkoutSuccess: {
      // Payment method labels
      applePay: 'Apple Pay',
      cardPayment: 'Card Payment',
      mobileWallets: 'Mobile Wallets',
      walletBalance: 'Wallet Balance',
      cryptocurrency: 'Cryptocurrency',
      bankInstallments: 'Bank Installments',
      buyNowPayLater: 'Buy Now Pay Later',
      kioskPayment: 'Kiosk Payment',
      instaPay: 'InstaPay',
      cashOnDelivery: 'Cash on Delivery',
      paysky: 'PaySky',
      // Error/Loading
      orderIdNotFound: 'Order ID not found',
      verifyingPayment: 'Verifying Payment...',
      pleaseWait: 'Please wait',
      noPermission: 'You don\'t have permission to access this order. Please use the link from your order confirmation or log in.',
      paymentNotConfirmed: 'Payment not confirmed yet. Please wait or check order status.',
      failedToLoad: 'Failed to load order data',
      errorLoading: 'Error loading order data',
      somethingWrong: 'Something went wrong',
      // Navigation
      trackOrder: 'Track Order',
      products: 'Products',
      myOrders: 'My Orders',
      // Success section
      shareReceipt: 'Share Receipt',
      orderConfirmed: 'Order Confirmed!',
      paymentSuccessful: 'Payment Successful!',
      orderCreated: 'Order Created Successfully!',
      orderPlaced: 'Your order has been placed',
      clickToCopy: 'Click to copy',
      order: 'Order',
      payOnDelivery: 'Pay on Delivery',
      preparing: 'Preparing',
      paidWithWallet: 'Paid with Wallet',
      paymentConfirmed: 'Payment Confirmed',
      // COD section
      amountToPay: 'Amount to Pay',
      includesDiscount: 'Includes discount of',
      codDescription: 'Pay the delivery person when you receive your order. Please have the exact amount ready.',
      // Payment Summary
      paymentSummary: 'Payment Summary',
      paymentMethod: 'Payment Method',
      amountPaid: 'Amount Paid',
      paymentStatus: 'Payment Status',
      paid: 'Paid',
      youSaved: 'You saved',
      shippingStatus: 'Shipping Status',
      // Order Details
      orderDetails: 'Order Details',
      qty: 'Qty:',
      sku: 'SKU',
      subtotal: 'Subtotal',
      coupon: 'Coupon',
      discount: 'Discount',
      shipping: 'Shipping',
      codFee: 'COD Fee',
      total: 'Total',
      // Shipping Info
      shippingInformation: 'Shipping Information',
      paymentOnDelivery: 'Payment on Delivery',
      paymentReceived: 'Payment Received Successfully',
      preparingForShipping: 'Your order is being prepared for shipping',
      trackingWillBeSent: 'Tracking number will be sent via email once shipped',
      deliveryToAddress: 'Will be delivered to your specified address',
      // Digital Content
      orderReady: 'Your Order is Ready',
      subscriptionCode: 'Subscription Code',
      subscriptionCodes: 'Subscription Codes',
      copy: 'Copy',
      links: 'Links',
      link: 'Link',
      deliveryNote: 'Delivery Note',
      email: 'Email',
      password: 'Password',
      saveOrder: 'Save order #',
      tapToCopy: 'Tap to copy',
      // Share Modal
      saveShareReceipt: 'Save & Share Receipt',
      saveShare: 'Save & Share',
      saveAsImage: 'Save as Image',
      saveHighQuality: 'Save receipt as high quality image',
      shareVia: 'Share via',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      twitterX: 'X',
      facebook: 'Facebook',
      done: 'Done!',
      copyLink: 'Copy Link',
      moreOptions: 'More options...',
      // Digital delivery pending (paid, content not yet provisioned)
      digitalPendingTitle: 'Your items are on the way',
      digitalPendingBody: "Your payment was received. Your digital items are being prepared and will appear here shortly \u2014 we'll also email them to you.",
      // Legacy / Crypto checkout keys
      // Legacy / Crypto checkout keys
    },

    productsPage: {
      hero: {
        defaultTitle: 'Our Products',
        defaultDescription: 'Discover our premium collection of digital solutions, tools, and services designed for professionals.',
        exploreTitle: 'Explore by Category',
        exploreDescription: 'Browse our organized categories to find exactly what you need.',
        exploreButton: 'View All Categories'
      },
      error: {
        title: 'Failed to Load Products',
        description: 'Please refresh the page or try again in a moment.',
        retry: 'Try Again'
      },
      labels: {
        unavailable: 'Currently Unavailable',
        featured: 'Featured',
        sales: '{count} sales',
        salesShort: 'sold',
        stockAvailable: '{count} available',
        stockUnavailable: 'Out of Stock',
        instantDelivery: 'Instant delivery'
      },
      buttons: {
        browseCategories: 'Browse All Categories',
        viewDemo: 'View Demo',
        demoShort: 'Demo',
        notAvailable: 'N/A',
        addToCart: 'Add to Cart',
        cart: 'Cart',
        outOfStock: 'Out of Stock',
        selectOptions: 'Select Options'
      },
      variantAttributes: {
        size: 'Size',
        ml: 'ML',
        color: 'Color',
        denomination: 'Denomination',
        style: 'Style',
        material: 'Material',
        fit: 'Fit',
        pattern: 'Pattern',
        region: 'Region',
        platform: 'Platform',
        edition: 'Edition',
        period: 'Period',
        weight: 'Weight',
        volume: 'Volume',
        capacity: 'Capacity',
        storage: 'Storage',
        ram: 'RAM',
        type: 'Type',
        model: 'Model',
        flavor: 'Flavor',
        scent: 'Scent',
        length: 'Length',
        width: 'Width',
        connectivity: 'Connectivity',
        voltage: 'Voltage'
      },
      variantValues: {
        // Sizes (clothing / generic)
        xs: 'XS', s: 'S', m: 'M', l: 'L', xl: 'XL', xxl: 'XXL', xxxl: '3XL',
        small: 'Small', medium: 'Medium', large: 'Large', extra_large: 'Extra Large',
        one_size: 'One Size', free_size: 'Free Size',
        // Common colors
        red: 'Red', blue: 'Blue', green: 'Green', yellow: 'Yellow',
        black: 'Black', white: 'White', grey: 'Grey', gray: 'Gray',
        pink: 'Pink', purple: 'Purple', orange: 'Orange', brown: 'Brown',
        navy: 'Navy', beige: 'Beige', gold: 'Gold', silver: 'Silver',
        cyan: 'Cyan', magenta: 'Magenta', lime: 'Lime', teal: 'Teal', maroon: 'Maroon',
        // Materials
        cotton: 'Cotton', polyester: 'Polyester', leather: 'Leather',
        wool: 'Wool', silk: 'Silk', linen: 'Linen', denim: 'Denim',
        // Fits
        slim: 'Slim', regular: 'Regular', loose: 'Loose', oversized: 'Oversized',
        // Generic
        default: 'Default', standard: 'Standard', premium: 'Premium', basic: 'Basic',
        new: 'New', used: 'Used', refurbished: 'Refurbished',
        digital: 'Digital', physical: 'Physical'
      },
      loadingProduct: 'Loading product...',
      searchResultsFor: 'Search results for:',
      loadingMore: 'Loading more products...',
      emptyState: {
        title: 'No Products in This Category Yet',
        description: "We're currently preparing products for this category. Check back soon!",
        cta: 'Browse All Categories'
      }
    },

    profilePage: {
      title: 'My Account',
      loggingOut: 'Logging Out...',
      verifiedAccount: 'Verified Account',
      unverifiedAccount: 'Email Not Verified',
      verifyEmailBadge: 'Verify Now',
      emailVerification: {
        sectionTitle: 'Email Verification',
        sectionDesc: 'Verify your email address to secure your account and receive important notifications.',
        statusVerified: 'Your email is verified',
        statusUnverified: 'Your email is not verified yet',
        sendOtp: 'Send Verification Code',
        sending: 'Sending...',
        resendOtp: 'Resend Code',
        resendIn: 'Resend in {s}s',
        otpSent: 'A 6-digit code was sent to',
        otpPlaceholder: 'Enter 6-digit code',
        verify: 'Verify Email',
        verifying: 'Verifying...',
        successTitle: 'Email Verified!',
        successDesc: 'Your email address has been successfully verified.',
        changeCode: 'Change Code',
        invalidCode: 'Invalid or expired code. Please try again.',
        networkError: 'Network error. Please check your connection.',
        sendFailed: 'Failed to send code. Please try again.'
      },
      tabs: {
        overview: 'Overview',
        wallet: 'Wallet',
        orders: 'Orders',
        codes: 'Subscription Codes',
        links: 'Links',
        settings: 'Settings'
      },
      signOut: 'Sign Out',
      signingOut: 'Logging out...',
      stats: {
        walletBalance: 'Wallet Balance',
        totalOrders: 'Total Orders',
        totalSpent: 'Total Spent',
        links: 'Links'
      },
      overview: {
        recentOrders: 'Recent Orders',
        viewAll: 'View All \u2192',
        noOrders: 'No orders yet',
        orderNumber: 'Order #{id}',
        quickActions: 'Quick Actions',
        browseProducts: 'Browse Products',
        linksHistory: 'Links History',
        contactSupport: 'Contact Support',
        startShopping: 'Start Shopping',
        myLinks: 'My Links',
        inShipping: 'In Shipping'
      },
      orders: {
        title: 'Order History',
        noOrders: 'No orders yet',
        orderNumber: 'Order #{id}',
        items: 'Items',
        itemCount: '{count} item(s)',
        details: 'Details',
        startShopping: 'Start shopping to see your orders here',
        completed: 'Completed',
        pending: 'Pending',
        processing: 'Processing',
        cancelled: 'Cancelled',
        refunded: 'Refunded',
        orderDetails: 'Order Details',
        noItems: 'No items found',
        transactionInfo: 'Transaction Info',
        close: 'Close',
        settled: 'Settled',
        cashOnDelivery: 'Cash on Delivery',
        paymentFailed: 'Payment Failed',
        incompleteTransaction: 'Incomplete Transaction',
        note: 'Note',
        date: 'Date',
        payment: 'Payment',
        total: 'Total',
        saved: 'Saved',
        coupon: 'Coupon',
        discount: 'Discount',
        shippingCost: 'Shipping Cost',
        shippingAddress: 'Shipping Address',
        codesLabel: 'Codes',
        deliveryNotes: 'Delivery Notes',
        email: 'Email',
        password: 'Password',
        transactionHash: 'Transaction Hash',
        copyOrderNumber: 'Copy Order Number',
        cod: 'COD',
        qty: 'Qty',
        unknownProduct: 'Unknown Product',
        subtotal: 'Subtotal',
        trackingNumber: 'Tracking Number'
      },
      codes: {
        title: 'Subscription Codes',
        markAllViewed: 'Mark all as viewed',
        noCodes: 'No codes available yet',
        purchaseHint: 'Purchase products with digital codes to see them here',
        orderNumber: 'Order #{id}',
        codeCount: '{count} Code(s)',
        copied: 'Code copied to clipboard!'
      },
      links: {
        title: 'Links',
        noLinks: 'No links available yet',
        purchaseHint: 'Purchase products with links to see them here',
        orderNumber: 'Order #{id}',
        linkCount: '{count} Link(s)',
        link: 'Link',
        open: 'Open'
      },
      wallet: {
        balance: 'Wallet Balance',
        manageBalance: 'Manage your account balance',
        currentBalance: 'Current Balance',
        addFunds: 'Add Funds',
        history: 'History',
        totalDeposits: 'Total Deposits',
        totalSpent: 'Total Spent',
        pending: 'Pending',
        recentTransactions: 'Recent Transactions',
        noTransactions: 'No transactions yet',
        transactionsWillAppear: 'Your transaction history will appear here',
        deposit: 'Deposit',
        withdrawal: 'Withdrawal',
        adminCredit: 'Admin Credit',
        adminDebit: 'Admin Debit',
        order: 'Purchase',
        refund: 'Refund',
        viewOrderDetails: 'View purchase details',
        orderDetailsUnavailable: 'Unable to load purchase details right now',
        completed: 'Completed',
        failed: 'Failed',
        cancelled: 'Cancelled'
      },
      settings: {
        title: 'Account Settings',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        emailNote: 'Email cannot be changed',
        phone: 'Phone',
        firstNamePlaceholder: 'Enter first name',
        lastNamePlaceholder: 'Enter last name',
        emailPlaceholder: 'Email address',
        phonePlaceholder: 'Enter phone number',
        saving: 'Saving...',
        preferences: 'Preferences',
        emailNotifications: 'Email Notifications',
        emailNotificationsDesc: 'Receive updates about your orders and new products',
        marketingCommunications: 'Marketing Communications',
        marketingCommunicationsDesc: 'Receive promotional emails and special offers',
        saveChanges: 'Save Changes',
        toggleEmailNotifications: 'Toggle email notifications',
        toggleMarketingCommunications: 'Toggle marketing communications',
        security: {
          title: 'Change Password',
          currentPassword: 'Current Password',
          currentPasswordPlaceholder: 'Enter current password',
          newPassword: 'New Password',
          newPasswordPlaceholder: 'Enter new password',
          confirmPassword: 'Confirm New Password',
          confirmPasswordPlaceholder: 'Re-enter new password',
          hint: 'At least 8 characters',
          changeButton: 'Change Password',
          changing: 'Changing...',
          success: 'Password changed successfully!',
          failed: 'Failed to change password',
          tooShort: 'Password must be at least 8 characters',
          mismatch: 'Passwords do not match'
        }
      },
      toast: {
        success: 'Success!',
        error: 'Error!',
        profileUpdated: 'Profile updated successfully!',
        profileUpdateFailed: 'Failed to update profile',
        allCodesMarkedViewed: 'All codes marked as viewed',
        failedMarkCodesViewed: 'Failed to mark codes as viewed',
        allLinksMarkedViewed: 'All links marked as viewed',
        failedMarkLinksViewed: 'Failed to mark links as viewed',
        allUpdatesRead: 'All updates marked as read',
        addressUpdated: 'Address updated successfully',
        addressAdded: 'Address added successfully',
        addressSaveFailed: 'Failed to save address',
        addressDeleted: 'Address deleted successfully',
        addressDeleteFailed: 'Failed to delete address',
        defaultAddressSet: 'Default address updated',
        defaultAddressFailed: 'Failed to set default address',
        logoutFailed: 'Failed to logout',
        codesNotMarked: 'Could not mark codes as viewed',
        linksNotMarked: 'Could not mark links as viewed'
      },
      addresses: {
        tab: 'Addresses',
        title: 'My Addresses',
        default: 'Default',
        deleteTitle: 'Delete Address',
        deleteConfirm: 'Are you sure you want to delete this address?',
        delete: 'Delete',
        cancel: 'Cancel',
        noAddresses: 'No saved addresses yet',
        addNew: 'Add New Address',
        edit: 'Edit',
        fullName: 'Full Name',
        fullNamePlaceholder: 'Enter your full name',
        phone: 'Phone Number',
        country: 'Country',
        selectCountry: 'Select Country',
        region: 'Region',
        loading: 'Loading...',
        selectRegion: 'Select Region',
        district: 'District',
        districtLabel: 'District',
        noDistricts: 'No districts available',
        selectDistrict: 'Select District',
        detailedAddress: 'Detailed Address',
        addressPlaceholder: 'Enter your detailed address',
        addressLabel: 'Address Label',
        home: 'Home',
        work: 'Work',
        other: 'Other',
        setDefault: 'Set as Default',
        update: 'Update Address',
        add: 'Add Address',
        editTitle: 'Edit Address'
      },
      shipping: {
        tab: 'Shipping',
        title: 'My Shipments',
        markAsRead: 'Mark all as read',
        noShipments: 'No shipments yet',
        trackLabel: 'Track',
        copyTrackingNumber: 'Copy tracking number',
        statuses: {
          delivered: 'Delivered',
          shipped: 'Shipped',
          inTransit: 'In Transit',
          outForDelivery: 'Out for Delivery',
          processing: 'Processing',
          deliveryFailed: 'Delivery Failed',
          returnedFull: 'Returned to Sender',
          returned: 'Returned',
          failed: 'Failed'
        },
        progressSteps: {
          'new': 'New',
          prep: 'Preparing',
          ship: 'Shipped',
          done: 'Delivered'
        },
        notifications: {
          title: 'Shipping Notifications',
          badge: 'New',
          active: 'Active',
          toggle: 'Toggle Notifications',
          enabled: 'Notifications enabled',
          disabled: 'Notifications disabled'
        }
      },
      notes: {
        title: 'Notes',
        order: 'Order',
        noNotes: 'No notes yet',
        markUpdatesRead: 'Mark updates as read'
      }
    },

    // Footer
    footer: {
      getItOn: 'Get it on',
      downloadOn: 'Download on',
      terahPowered: 'Powered by Terah',
      terahLinkAria: 'Squadx',
      noLinkSet: 'No link set',
      companyTitle: 'Company',
      supportTitle: 'Support',
      rights: 'All rights reserved',
      community: 'Community',
      contactShort: 'Contact',
      backToTop: 'Back to top',
      craftedWith: 'Crafted with',
      joinSquad: 'JOIN THE SQUAD',
      levelUp: 'LEVEL UP',
      pressStart: 'PRESS START',
      helpCenter: 'Help Center',
      supportCenter: 'Support Center',
      contactLabel: 'Contact Us',
      getInTouch: 'Get in touch',
      shippingPolicy: 'Shipping Policy',
      deliveryInfo: 'Delivery information',
      returnPolicy: 'Return Policy',
      easyReturns: 'Returns within 14 days',
      digitalGuaranteeLabel: 'Refund Guarantee',
      digitalGuaranteeDesc: '14-day guarantee for digital products',
      aboutUs: 'About Us',
      aboutDesc: 'Our story and mission',
      privacyPolicy: 'Privacy Policy',
      privacyDesc: 'Your privacy matters',
      termsOfService: 'Terms of Service',
      termsDesc: 'Service terms',
      stats: [
        { key: 'activeUsers', label: 'Active Users', value: '10K+' },
        { key: 'products', label: 'Products', value: '50+' },
        { key: 'successRate', label: 'Success Rate', value: '99.9%' },
        { key: 'projects', label: 'Projects', value: '200+' }
      ],
      sections: [
        {
          key: 'company',
          title: 'Company',
          links: [
            { key: 'about', label: 'About Us', description: 'Our story and mission', href: '/about' },
            { key: 'contact', label: 'Contact', description: 'Get in touch', href: '/contact' },
            { key: 'privacy', label: 'Privacy Policy', description: 'Your privacy matters', href: '/privacy' },
            { key: 'terms', label: 'Terms of Service', description: 'Service terms', href: '/terms' }
          ]
        },
        {
          key: 'support',
          title: 'Support',
          links: [
            { key: 'help', label: 'Help Center', description: 'Support center', href: '/help' }
          ]
        }
      ],
      bottom: {
        rights: 'All rights reserved.',
        madeWith: 'Made with',
        byTeam: 'by',
        teamSuffix: 'Team',
        scrollTop: 'Scroll to top',
        features: [
          { key: 'secure', label: 'Secure', color: '#22d3ee' },
          { key: 'fast', label: 'Fast', color: '#fbbf24' },
          { key: 'premium', label: 'Premium', color: '#e879f9' }
        ]
      }
    },

    // Language
    language: 'Language',
    english: 'English',
    arabic: 'Arabic',
    switchLanguage: 'Switch Language',

    // 404 Page
    loadingProduct: 'Loading product...',
    notFoundPage: {
      title: 'Page Not Found',
      description: "Sorry, we couldn't find the page you're looking for. It might have been removed or the URL might be incorrect.",
      backToHome: 'Back to Home',
      browseProducts: 'Browse Products',
      goBack: 'Go back to previous page'
    },

    // Error Page
    errorPage: {
      title: 'Something Went Wrong',
      description: "We encountered a problem loading this page. Don't worry, you can try again or go back to the home page.",
      tryAgain: 'Try Again',
      backHome: 'Back to Home',
      support: 'Contact Support',
      persistMsg: "If the problem persists, reach out and we'll help right away",
      statusLabel: 'Unexpected Error',
      errorIdLabel: 'Error ID',
      copyId: 'Copy',
      copied: 'Copied',
      technicalDetails: 'Technical details',
      hideDetails: 'Hide details',
      reassurance: 'Your data is safe and your session is preserved.'
    },

    // Cart Toast
    cartToast: {
      addedToCart: 'Added to cart',
      removedFromCart: 'Removed from cart',
      cartUpdated: 'Cart updated',
      error: 'An error occurred'
    },

    // Cart Changes Modal
    cartChangesModal: {
      title: 'Cart Updates',
      description: 'Some items in your cart have changed',
      updatedMessage: 'Your cart has been updated with the latest information',
      continue: 'Continue',
      summary: {
        blockingAndPrice: 'We synced availability and pricing before you continue to checkout.',
        blocking: 'Some items are no longer available, so your cart was adjusted automatically.',
        quantity: 'Cart quantities were synced with the latest stock availability.',
        defaultDescription: 'Your cart was synced with the latest pricing and availability before checkout.'
      },
      changes: {
        removed: 'This item has been removed from your cart',
        unavailable: 'This item is no longer available',
        priceChange: 'Price has changed',
        stockWarning: 'Low stock warning',
        outOfStock: 'Out of stock',
        quantityReduced: 'Quantity reduced',
        reducedFrom: 'Reduced from {requested} to {available} items'
      },
      labels: {
        product: 'Product',
        removed: 'Removed',
        unavailable: 'Unavailable',
        outOfStock: 'Out of stock',
        lowStock: 'Low stock',
        quantityUpdated: 'Quantity updated',
        priceDecreased: 'Price decreased',
        priceIncreased: 'Price increased',
        updated: 'Updated',
        requested: 'Requested',
        available: 'Available',
        updates: 'updates',
        needsReview: 'Needs review',
        unavailableItems: 'unavailable items',
        quantityUpdates: 'quantity updates',
        priceChanges: 'price changes',
        close: 'Close',
        previousPrice: 'Previous price',
        currentPrice: 'Current price',
        footerUpdatedMessage: 'Your cart now reflects the latest availability and pricing.'
      }
    },

    // Kashier Payment
    kashierPayment: {
      loadingOptions: 'Loading payment options...',
      paymentError: 'Payment Error',
      securePayment: 'Secure Payment',
      poweredByKashier: 'Powered by Kashier',
      applePay: 'Apple Pay',
      loadingPaymentPage: 'Loading payment page...',
      pleaseWait: 'Please wait',
      securedByKashier: 'Secured & encrypted by Kashier payment gateway',
      securedByApplePay: 'Secured by Apple Pay & Kashier',
      initializingApplePay: 'Initializing Apple Pay...',
      failedToLoadPaymentPage: 'Failed to load payment page',
      failedToLoadConfig: 'Failed to load payment configuration',
      failedToInitialize: 'Failed to initialize payment',
      applePayNotAvailable: 'Apple Pay is not available on this device',
      failedToCreateApplePaySession: 'Failed to create Apple Pay session',
      failedToInitializeApplePay: 'Failed to initialize Apple Pay',
      failedToLoadKashierSDK: 'Failed to load Kashier SDK',
      applePayFailed: 'Apple Pay payment failed'
    },

    // Paymob Payment Component
    paymobPayment: {
      loadingOptions: 'Loading payment options...',
      paymentError: 'Payment Error',
      securePayment: 'Secure Payment',
      poweredByPaymob: 'Powered by Paymob',
      loadingPaymentPage: 'Loading payment page...',
      pleaseWait: 'Please wait',
      securedByPaymob: 'Secured & encrypted by Paymob payment gateway',
      retry: 'Retry',
      tryAgain: 'Try Again',
      takingLonger: 'This is taking longer than expected...',
      slowConnection: 'Connection is slow...',
      paymentFailed: 'Payment failed',
      failedToInitialize: 'Failed to initialize payment',
      failedToLoadPaymentPage: 'Failed to load payment page'
    },

    // Kashier Payment Page
    kashierPaymentPage: {
      loadingPayment: 'Loading Payment...',
      pleaseWaitPreparing: 'Please wait while we prepare your payment',
      paymentError: 'Payment Error',
      invalidPaymentRequest: 'Invalid payment request. Please try again.',
      backToCheckout: 'Back to Checkout',
      completeYourPayment: 'Complete Your Payment',
      orderNumber: 'Order #',
      amount: 'Amount:',
      orderSummary: 'Order Summary',
      orderNumber2: 'Order Number:',
      items: 'Items:',
      products: 'product(s)',
      totalAmount: 'Total Amount:',
      securePayment: 'Secure Payment',
      securePaymentDescription: 'Your payment is processed securely through Kashier. All transactions are encrypted and PCI DSS compliant.',
      needHelp: 'Need help?',
      contactSupport: 'Contact Support',
      paymentPageLanguage: 'Payment page language',
      paymentLang: 'Payment lang:'
    },

    // Paymob Payment Page
    paymobPaymentPage: {
      paymobPayment: 'Paymob Payment',
      chooseMethod: 'Choose your preferred payment method',
      back: 'Back',
      orderSummary: 'Order Summary',
      orderId: 'Order ID:',
      amount: 'Amount:',
      loadingMethods: 'Loading payment methods...',
      selectPaymentMethod: 'Select Payment Method',
      noMethodsAvailable: 'No Payment Methods Available',
      noMethodsConfigured: 'Paymob payment methods are not configured yet. Please contact support.',
      chooseDifferentMethod: 'Choose Different Method',
      proceedToPayment: 'Proceed to Payment',
      processing: 'Processing...',
      securedByPaymob: 'Secured by Paymob (Accept Payment Gateway)',
      paymentInformation: 'Payment Information',
      paymentInfoDescription: "You will be redirected to Paymob's secure payment page to complete your transaction. All payment data is encrypted and processed securely.",
      invalidRequest: 'Invalid Request',
      orderIdMissing: 'Order ID is missing',
      backToCheckout: 'Back to Checkout',
      tryAgain: 'Try Again',
      loading: 'Loading...'
    },

    // Crypto Payment Page
    cryptoPaymentPage: {
      loading: 'Loading payment details...',
      selectCryptocurrency: 'Select Cryptocurrency',
      choosePreferredMethod: 'Choose your preferred payment method',
      loadingCryptocurrencies: 'Loading available cryptocurrencies...',
      noCryptocurrencies: 'No cryptocurrencies available. Please try again.',
      retry: 'Retry',
      creatingPayment: 'Creating Payment...',
      paymentDetails: 'Payment Details',
      amountToPay: 'Amount to Pay',
      paymentAddress: 'Payment Address',
      copyAddress: 'Copy Address',
      copyAmount: 'Copy Amount',
      copied: 'Copied!',
      timeRemaining: 'Time Remaining',
      checkingStatus: 'Checking status...',
      checkStatus: 'Check Status',
      statusUpdatesAuto: 'Status automatically updates every 3 seconds',
      paymentError: 'Payment Error',
      backToCheckout: 'Back to Checkout',
      sendExactAmount: 'Send the exact amount to the address above',
      minimumAmount: 'Minimum',
      amountTooLow: 'Amount too low for this cryptocurrency',
      allCurrenciesLocked: 'Order amount is too low for all available cryptocurrencies',
      testModeWarning: 'Test Mode - No real funds will be transferred',
      securedBy: 'Secured by NOWPayments'
    },

    // Auth Page
    authPage: {
      welcomeBack: 'Welcome back to {siteName}',
      createYourAccount: 'Create your account',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      createAccount: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      forgotPassword: 'Forgot your password?',
      
      // Form Fields
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      required: '*',
      
      // Placeholders
      firstNamePlaceholder: 'John',
      lastNamePlaceholder: 'Smith',
      emailPlaceholder: 'your@email.com',
      passwordPlaceholder: 'Enter your password',
      createPasswordPlaceholder: 'Create a password',
      confirmPasswordPlaceholder: 'Confirm your password',
      
      // Validation Messages
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email format',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 8 characters',
      passwordRequirements: 'At least 8 characters with uppercase, lowercase, and number',
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      passwordsDoNotMatch: 'Passwords do not match',
      
      // Success Messages
      loginSuccessful: 'Login successful! Redirecting...',
      
      // Error Messages
      unexpectedError: 'An unexpected error occurred',
      verifyYourEmail: 'Verify Your Email',
      verify: 'Verify',
      skipVerify: 'Skip now, verify later',
      phoneLabel: 'Phone',
      phonePlaceholder: 'e.g. 501234567'
    },

    // Checkout Page
    checkoutPage: {
      // Empty Cart
      emptyCartTitle: 'Your cart is empty',
      emptyCartDescription: 'Add some products to continue with checkout',
      browseProducts: 'Browse Products',
      loadingPayment: 'Loading payment\u2026',

      // Customer Info
      customerInformation: 'Customer Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      firstNamePlaceholder: 'John',
      lastNamePlaceholder: 'Doe',
      emailPlaceholder: 'john@example.com',
      required: '*',
      loginPrompt: 'Please login to your account or continue as a guest to complete your purchase',
      loginButton: 'Sign Up / Login',
      guestButton: 'Continue as Guest',
      backToOptions: 'Back to login options',
      createAccountTip: 'Create an account to track your orders, save your information, and get exclusive offers!',
      tipLabel: 'Tip:',
      
      // Order Type
      
      // Payment Methods
      paymentMethod: 'Payment Method',
      cryptocurrency: 'Pay with Cryptocurrency',
      cryptocurrencyMore: 'More',
      payWithCard: 'Bank Card Payment',
      applePay: 'Apple Pay',
      applePayPaymob: 'Apple Pay (Paymob)',
      applePayDescription: 'Fast & secure payment with Apple Pay',
      applePayPaymobDescription: 'Fast & secure with Apple Pay',
      creditDebitCards: 'Credit/Debit Cards',
      creditDebitCardsVisa: 'Visa',
      creditDebitCardsMaster: 'Master',
      creditDebitCardsMeeza: 'Meeza',
      visa: 'Visa',
      mastercard: 'Mastercard',
      meeza: 'Meeza',
      mada: 'Mada',
      madaSaudi: 'Mada Saudi',
      mobileWallets: 'Mobile Wallets',
      mobileWalletsDescription: 'Vodafone Cash, Orange Money, Etisalat',
      bankInstallments: 'Bank Installments',
      bankInstallmentsDescription: 'Pay in monthly installments',
      payAtKiosk: 'Pay at Kiosk',
      payAtKioskDescription: 'Aman, Masary, Khales, Bee',
      buyNowPayLater: 'Buy Now Pay Later',
      buyNowPayLaterDescription: 'ValU, Sympl, Souhoola',
      instaPay: 'InstaPay',
      instaPayDescription: 'Instant bank transfers',
      
      payWithWallet: 'Pay with Wallet',
      balance: 'Balance:',
      insufficient: '(Insufficient)',
      topUp: 'Top Up',
      noPaymentMethods: 'No payment methods available at the moment.',
      
      // Cash on Delivery
      cashOnDelivery: 'Cash on Delivery',
      payWhenReceive: 'Pay when you receive your order',
      codExtraFee: 'Extra fee:',
      
      // Buttons
      backToProducts: 'Back to Products',
      processing: 'Processing...',
      
      // Success Modal
      total: 'Total',
      payWithWallet: 'Pay with Wallet',
      topUp: 'Top Up',
      
      // Shipping Info
      
      // Validation
      cartIsEmpty: 'Your cart is empty',
      paymentSuccessfulButFailedToLoad: 'Payment was successful but failed to load order details.',
      failedToCreateOrder: 'Failed to create order. Please try again.',
      errorOccurred: 'An error occurred while creating your order. Please try again.',
      productsNotAvailable: 'Some products in your cart are no longer available. Please review your cart and try again.',
      insufficientBalance: 'Insufficient wallet balance. Please top up your wallet or use another payment method.',
      paymentMethodNotAvailable: 'The selected payment method is not available. Please choose another payment method.',
      
      // Field Validation Errors
      emailRequired: 'Email is required',
      phoneRequired: 'Phone number is required',
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      invalidEmailFormat: 'Please enter a valid email address',
      
      // Order Summary
      orderSummary: 'Order Summary',
      unavailable: 'Unavailable',
      subtotal: 'Subtotal',
      instantDigitalDelivery: 'Instant delivery',
      secureCheckout: 'Secure checkout',
      customerSupport: '24/7 customer support',
      
      // Processing
      processingPayment: 'Processing Payment...',
      pleaseWait: 'Please wait while we process your order',
      doNotClose: 'Do not close or refresh this page',
      
      // Apple Pay Popup
      applePayLoading: 'Loading Apple Pay',
      applePayPleaseWait: 'Please wait while we prepare your secure payment',
      applePaySecurePayment: 'Secure Payment',
      applePayEncrypted: 'End-to-end encrypted',
      applePayProcessing: 'Processing via Apple Pay',
      applePayPreparing: 'Preparing Apple Pay',
      applePayCompleteInPopup: 'Complete payment in the opened window',
      applePayAutoRedirect: 'You will be redirected automatically after payment',
      applePaySettingUp: 'Setting up your secure payment session',
      applePayTapToContinue: 'Tap to open Apple Pay',
      continueToApplePay: 'Continue to Apple Pay',
      // PaySky Popup (generic \u2014 used for cards & wallets)
      payskyLoadingPayment: 'Loading Payment',
      payskyPleaseWait: 'Please wait while we prepare your secure payment',
      payskyProcessingPayment: 'Processing Payment',
      payskyPreparingPayment: 'Preparing Payment',
      payskyCompleteInPopup: 'Complete payment in the opened window',
      payskyAutoRedirect: 'You will be redirected automatically after payment',
      payskySettingUp: 'Setting up your secure payment session',
      payskyTapToContinue: 'Tap to open payment page',
      // Pending-order resume modal
      pendingOrderTitle: 'You have a pending order',
      pendingOrderMessage: 'Order #{orderId} has incomplete payment. Would you like to continue payment or start fresh?',
      checkPaymentStatus: 'Check Payment Status',
      startNewOrder: 'Start New Order',
      
      // Unavailable Products
      unavailableProductsTitle: 'Some Products Unavailable',
      
      // Service Info Modal
      
      // Source Code Info Modal
      
      // Loading
      
      // Checkout Page Title
      checkout: 'Checkout',
      
      // Security & Trust
      securePaymentDescription: 'Shop with confidence \u2014 your payment is secure and protected.',
      
      // Modal Actions
      
      // Wallet Payment Errors
      walletPaymentFailed: 'Wallet payment failed',
      failedToProcessWalletPayment: 'Failed to process wallet payment',
      failedToInitializePayment: 'Failed to initialize payment',
      
      // Order Creation Errors
      
      // Success Messages
      
      // Payment Cancelled/Error Messages
      
      // Paymob Payment Methods
      mobileWallets: 'Mobile Wallets',
      payAtKiosk: 'Pay at Kiosk',
      buyNowPayLater: 'Buy Now Pay Later',
      instaPay: 'InstaPay',
      applePay: 'Apple Pay',
      
      // Crypto Payment
      cryptocurrency: 'Pay with Cryptocurrency',
      cryptocurrencyMore: 'More',
      
      // Wallet Payment
      payWithWallet: 'Pay with Wallet',
      topUp: 'Top Up',
      balance: 'Balance:',
      
      // Cash on Delivery
      cashOnDelivery: 'Cash on Delivery',
      payWhenReceive: 'Pay when you receive your order',
      codExtraFee: 'Extra fee:',
      
      // Cart Empty
      cartIsEmpty: 'Your cart is empty',
      
      // Payment Gateway Labels
      couponErrorConnection: 'Connection error, please try again',
      applePayTitle: 'Apple Pay',
      googlePayTitle: 'Google Pay',
      samsungPayTitle: 'Samsung Pay',
      ziinaApplePayDesc: 'Fast & secure via Apple Pay \u00b7 Ziina',
      ziinaGooglePayDesc: 'Fast checkout via Google Pay \u00b7 Ziina',
      ziinaSamsungPayDesc: 'Pay via Samsung Pay \u00b7 Ziina',
      edfapayCardsTitle: 'EdfaPay Cards',
      edfapayApplePayTitle: 'Apple Pay via EdfaPay',
      edfapayTamaraTitle: 'Tamara via EdfaPay',
      paypalTitle: 'PayPal',
      paypalDescription: 'Pay securely with PayPal',
      paypalCardTitle: 'Card via PayPal',
      paypalCardDesc: 'Pay with card \u2014 no PayPal account needed',
      paypalPayLaterTitle: 'Pay Later via PayPal',
      paypalPayLaterDesc: 'Buy now, pay over time \u2014 PayPal Credit / 4 installments',
      
      // Breadcrumb & Navigation
      homeBreadcrumb: 'Home',
      
      // Unavailable Products
      itemsUnavailable: 'Items Unavailable',
      editCart: 'Edit Cart',
      unknownProduct: 'Unknown Product',
      productNotFoundReason: 'Not found',
      
      // Order Summary Inline
      priceBeforeDiscount: 'Price before discount',
      youSaved: 'You saved',
      freeShipping: 'Free Shipping',
      couponPlaceholder: 'Coupon code',
      couponApply: 'Apply',
      couponDiscount: 'Coupon Discount',
      shippingLabel: 'Shipping',
      shippingFree: 'Free \u2713',
      selectRegion: 'Select region',
      codFee: 'COD Fee',
      readRefundPolicy: 'Read full Refund Policy \u2192',
      fastDelivery: 'Fast delivery',
      
      // Delivery Info
      deliveryInformation: 'Delivery Information',
      phoneLabel: 'Phone',
      phoneNumberLabel: 'Phone number',
      
      // Lock overlay & availability
      egyptOnly: 'Egypt only',
      walletProviders: 'Vodafone Cash \u00b7 Orange \u00b7 Etisalat',
      applePayOnlyOnIphone: 'Apple Pay is only available on iPhone/iPad',
      
      // Payment method descriptions
      edfapayCardsDesc: 'Independent cards choice through EdfaPay hosted checkout',
      edfapayApplePayDesc: 'Independent Apple Pay option with the same EdfaPay hosted checkout',
      edfapayTamaraDesc: 'Independent BNPL choice with itemized hosted checkout payloads',
      codNotAvailableRegion: 'COD not available in your region',
      
      // Validation messages
      deliveryInfoRequired: 'Delivery information is required',
      fullNameRequired: 'Full name is required',
      shippingPhoneRequired: 'Phone number is required',
      regionRequired: 'Region is required',
      addressRequired: 'Street address is required',
      selectPaymentMethod: 'Please select a payment method',
      completeShippingInfo: 'Please complete the shipping information',
      
      // Cart & order
      productsNoLongerAvailable: 'The following products are no longer available. Please remove them to continue.',
      removeFromCart: 'Remove from cart',
      removeCoupon: 'Remove coupon',
      invalidCoupon: 'Invalid coupon',
      clickToPayNow: 'Click here to pay now',

      // Privacy / Terms consent (required before placing an order)
      policyConsentPrefix: 'I have read and agree to the',
      policyConsentPrivacy: 'Privacy Policy',
      policyConsentAnd: 'and',
      policyConsentTerms: 'Terms of Service',
      policyConsentSuffix: ', and consent to my data being used to complete my order.',
      policyConsentRequired: 'Please agree to the Privacy Policy and Terms of Service to continue.',

      // PayPal refund policy
      noRefundPolicyTitle: 'No-Refund Policy for PayPal Payments',
      noRefundPolicyDesc: 'When paying via PayPal, products are delivered instantly and payments are non-refundable. By completing this PayPal purchase, you agree that all sales are final \u2014 no returns or refunds.',
      
      // Stock Availability
      stockCheckFailed: 'Could not verify product availability. Please review your order carefully before placing it.',

      // Pending Order Modal
      verifyingPayment: 'Verifying Payment...'
    },
    forgotPassword: {
      pageTitle: 'Forgot Password',
      enterVerificationCode: 'Enter Verification Code',
      newPasswordTitle: 'New Password',
      invalidEmail: 'Enter a valid email address',
      codeSent: 'Reset code sent to your email',
      somethingWentWrong: 'Something went wrong',
      unexpectedError: 'An unexpected error occurred',
      enterOtp: 'Enter the 6-digit code',
      invalidOtp: 'Invalid verification code',
      verificationError: 'An error occurred during verification',
      passwordMinLength: 'Password must be at least 8 characters',
      passwordsNoMatch: 'Passwords do not match',
      resetSuccess: 'Password reset successfully! Redirecting...',
      sessionExpired: 'Reset session expired. Redirecting to resend a new code.',
      resetFailed: 'Reset failed',
      codeResent: 'Code resent successfully',
      resendFailed: 'Failed to resend code',
      emailLabel: 'Email Address',
      emailPlaceholder: 'your@email.com',
      sendResetCode: 'Send Reset Code',
      emailDescription: "Enter your email and we'll send you a reset code",
      enterCodeSentTo: 'Enter the code sent to',
      change: 'Change',
      enterNewPassword: 'Enter your new password',
      verifyCode: 'Verify Code',
      resendCode: 'Resend code',
      changeEmail: 'Change email',
      newPasswordLabel: 'New Password',
      newPasswordPlaceholder: 'New password',
      atLeast8Chars: 'At least 8 characters',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm password',
      resetPassword: 'Reset Password',
      backToSignIn: 'Back to sign in',
      resetUnavailable: 'Password reset is currently unavailable. Please contact support to recover your account.',
      accountRecoveryRequest: 'Account Recovery Request'
    },

    // Floating Support
    floatingSupport: {
      tooManyMessages: 'Too many messages. Please wait a moment and try again.',
      errorOccurred: 'Sorry, an error occurred. Please try again.',
      connectionError: 'Connection failed. Please check your internet and try again.',
      aiAssistant: 'AI Assistant',
      contactUs: 'Contact Us',
      onlineNow: 'Online now',
      contactChannels: 'Contact channels',
      typeMessage: 'Type a message...',
      noChannelsAvailable: 'No channels available',
      newChat: 'New Chat',
      copyMessage: 'Copy',
      stopGenerating: 'Stop generating',
      retry: 'Retry',
      poweredByAI: 'Powered by AI'
    },

    // Testimonials
    testimonials: {
      verified: 'Verified',
      today: 'Today',
      oneDayAgo: '1 day ago',
      daysAgo: '{count} days ago',
      oneWeekAgo: '1 week ago',
      weeksAgo: '{count} weeks ago',
      oneMonthAgo: '1 month ago',
      customerReviews: 'Customer Reviews',
      whatOur: 'What Our ',
      clientsSay: 'Clients Say',
      hClassicSub: 'Real reviews from real customers - your opinion matters and shapes what we do.',
      hMarqueeT1: 'Trusted by ',
      hMarqueeT2: 'our customers',
      hMarqueeSub: 'Experiences that speak for us around the clock - join them and share yours.',
      hWallT1: 'What they say ',
      hWallT2: 'about us',
      hWallSub: 'Every word here comes from a real customer - credibility is everything to us.',
      hSpotT1: 'A testimonial ',
      hSpotT2: 'we cherish',
      hSpotSub: 'We share our customers\' words with full transparency - your story could be next.'
    },

    // EdfaPay Card
    edfapayCard: {
      paymentFailed: 'Payment failed.',
      failedToStartPayment: 'Failed to start payment',
      embeddedTitle: 'Embedded EdfaPay Cards',
      cardNumber: 'Card Number',
      expMonth: 'Exp. Month',
      expYear: 'Exp. Year',
      s2sFlow: 'Docs-aligned S2S flow',
      bankVerificationStarted: 'Bank verification started'
    },

    // Hero Slider
    heroSlider: {
      featured: 'Featured',
      play: 'Play',
      pause: 'Pause'
    },

    // Blog Page
    blogPage: {
      title: 'Blog',
      searchPlaceholder: 'Search articles...',
      all: 'All',
      noArticlesYet: 'No articles yet',
    },

    // DB Content Page
    dbContentPage: {
      backToHome: 'Back to Home'
    },

    // Payment Method Labels (used by payment-labels.ts)
    paymentLabels: {
      applePay: 'Apple Pay',
      cardPayment: 'Card Payment',
      mobileWallets: 'Mobile Wallets',
      bankInstallments: 'Bank Installments',
      buyNowPayLater: 'Buy Now Pay Later',
      kioskPayment: 'Kiosk Payment',
      instaPay: 'InstaPay',
      cryptocurrency: 'Cryptocurrency',
      cashOnDelivery: 'Cash on Delivery',
      walletBalance: 'Wallet Balance',
      paysky: 'PaySky',
      ziinaCard: 'Ziina Card',
      ziinaApplePay: 'Ziina Apple Pay',
      ziinaGooglePay: 'Ziina Google Pay',
      ziinaSamsungPay: 'Ziina Samsung Pay',
      ziina: 'Ziina',
      edfapayCards: 'EdfaPay Cards',
      edfapayApplePay: 'EdfaPay Apple Pay',
      edfapayTamara: 'EdfaPay Tamara',
      edfapay: 'EdfaPay',
      paymob: 'Paymob',
      kashier: 'Kashier',
      bankTransfer: 'Bank Transfer',
      crypto: 'Crypto',
      wallet: 'Wallet',
      cod: 'COD',
      egpSymbol: 'EGP'
    },

    // Address Labels
    addressLabels: {
      home: 'Home',
      work: 'Work',
      office: 'Office',
      other: 'Other'
    },

    // Cart extra
    cartExtra: {
      unavailableCount: '{count} unavailable',
      onlyAvailableFallback: 'Only {count} available',
      peopleBought: 'People also bought',
      estimateShipping: 'Estimate shipping',
      chooseZone: 'Choose zone',
      selectZone: '\u2014 Select \u2014',
      calculating: 'Calculating\u2026',
      shippingLabel: 'Shipping:',
      notAvailable: 'Not available'
    },

    // Categories Page extra
    categoriesPageExtra: {
      allCategories: 'All Categories',
      browseAllCategories: 'Browse all our product categories',
      productCount: '{count} products',
      noCategoriesAvailable: 'No categories available',
      failedToLoadCategories: 'Failed to load categories. Please try again.',
      noCategoriesFound: 'No categories found',
      retry: 'Retry'
    },

    // Category Detail Page
    categoryDetail: {
      subcategories: 'Subcategories',
      products: 'Products',
      loadingMore: 'Loading more...',
      noProductsInCategory: 'No products found in this category'
    },

    // Homepage All Products Section
    homepageProducts: {
      noProductsAvailable: 'No products available',
      allProducts: 'All Products',
      previous: 'Previous',
      next: 'Next',
      swipeToSeeMore: 'Swipe to see more'
    },

    // Homepage Categories Section
    homepageCategories: {
      viewMore: 'View More',
      clickToViewProducts: 'Click to view products',
      more: 'More',
      noProductsInCategory: 'No products in this category',
      failedToLoadCategories: 'Failed to load categories. Please try again.',
      retry: 'Retry'
    },

    // Country Code Selector
    countrySelector: {
      searchCountry: 'Search country...',
      detectedLocation: 'Detected location',
      middleEast: 'Middle East',
      restOfWorld: 'Rest of World',
      noCountriesFound: 'No countries found'
    },

    // About Page fallbacks
    aboutPageExtra: {
      defaultTitle: 'About Us',
      defaultDescription: 'We provide distinctive digital solutions for professionals',
      noContentYet: 'No content added yet. This content can be edited from the admin panel.'
    },

    // Dynamic Page fallback
    dynamicPageExtra: {
      noContentYet: 'No content added yet.'
    },

    // EdfaPay Card extra
    edfapayCardExtra: {
      s2sInfo: 'Per EdfaPay S2S docs, 3DS step is shown in an iframe after the server sends the request.',
      bankVerificationInfo: 'Bank verification will appear inside the frame after the order is sent to EdfaPay from the server.',
      starting: 'Starting...',
      payNow: 'Pay Now',
      complete3ds: 'Complete the 3DS step inside the frame below. We will verify the result automatically.',
      checkingPayment: 'Checking payment status...',
      waitingPayment: 'Waiting for payment status...',
      failedToStart: 'Failed to start payment'
    },

    // Blog Page extra
    blogPageExtra: {
      discoverArticles: 'Discover the latest articles, news, and tips',
      stayTuned: 'Stay tuned for upcoming content',
      pageOf: 'Page {page} of {total}',
      minRead: '{minutes} min read'
    },

    // Checkout Success extra
    checkoutSuccessExtra: {
      whatsappShareText: 'My order #{orderNumber} from {siteName} has been confirmed',
      shareGreeting: 'Hi \ud83d\udc4b',
      shareOrderConfirmed: 'My order #{orderNumber} has been confirmed!',
      shareProducts: '\n\ud83d\udce6 Products:\n\u2022 {productList}',
      shareOrderLink: '\n\ud83d\udd17 Order link:\n{url}'
    },

    // Auth Page extra
    authPageExtra: {
      phoneRequired: 'Phone number is required',
      enterOtpCode: 'Enter the 6-digit verification code',
      emailVerifiedRedirecting: 'Email verified successfully! Redirecting...',
      invalidOrExpiredCode: 'Invalid or expired code',
      verificationError: 'An error occurred during verification',
      otpResent: 'Verification code resent',
      resendFailed: 'Failed to resend, try again later',
      emailVerificationRequired: 'You must verify your email first. Verification code sent.',
      accountCreatedVerify: 'Account created! Check your email for the verification code',
      resendIn: 'Resend in {seconds} seconds',
      resendCode: 'Resend code',
      lastStepToSecure: 'Last step to secure your account',
      securePortal: 'Trusted access',
      fastAccess: 'Fast access',
      newAccount: 'New account',
      accountSuite: 'Account suite',
      encryptedAccess: 'Encrypted access',
      sessionQuality: 'Session quality',
      layeredSecurity: 'Layered security with steadier flow',
      sessionDescription: 'Secure access with a calmer desktop rhythm, wider spacing, and a steadier form-reading experience from start to finish.',
      tagEncrypted: 'Encrypted',
      tagStableLayout: 'Stable layout',
      tagClearerFocus: 'Clearer focus',
      layoutRhythm: 'Layout rhythm',
      calmerBalance: 'Calmer desktop balance',
      layoutDescription: 'Brand context sits on one side while the form stays focused on the other, avoiding the cramped three-card feel.',
      accountSetup: 'Account setup',
      directEntry: 'Direct entry without clutter',
      guidedSignup: 'Guided signup for desktop',
      loginFlowDescription: 'Reach account tools with clearer focus on the fields and the main action, instead of crowding the side content.',
      registerFlowDescription: 'Create an account with more breathing room and clearer sequencing for desktop sessions.',
      accountAccess: 'Account access',
      messageSuccess: 'Success',
      messageFailure: 'Unable to continue'
    },

    // Products Page extra
    productsPageExtra: {
      noResultsFor: 'No results for "{query}"',
      tryAdjusting: 'Try adjusting your search terms or browse all products'
    },

    // Profile Page extra
    profilePageExtra: {
      allCodesViewed: 'All codes marked as viewed',
      allLinksViewed: 'All links marked as viewed',
      failedToMarkCodes: 'Failed to mark codes as viewed',
      failedToMarkLinks: 'Failed to mark links as viewed',
      deliveryNotesEmpty: 'Delivery notes and links will appear here after purchasing digital products',
      noLinksYet: 'No links available yet',
      buyProductsForLinks: 'Purchase products to get access links',
      shippingTrackingEmpty: 'Shipping tracking will appear here when your order ships',
      addShippingAddress: 'Add a shipping address to simplify ordering',
      shippingNotificationsDesc: 'Get instant notifications when your order shipping status updates',
      shippingNotificationsEnabled: 'Shipping notifications enabled successfully!',
      browserNotSupported: 'This browser does not support notifications',
      allowNotifications: 'Please allow notifications in your browser',
      notificationsDenied: '\u26a0\ufe0f Notifications blocked. Please enable them in browser settings:\n1. Click the lock icon next to the URL\n2. Select \'Notifications\'\n3. Choose \'Allow\'',
      egpFormat: 'EGP {amount}',
      selectCountryFirst: 'Please select a country first',
      noRegionsAvailable: 'No regions available',
      loadMore: 'Load More',
      loadingMore: 'Loading...',
      loadError: 'Failed to load. Please try again.',
      retry: 'Retry',
      addFundsInfo: 'To add funds to your wallet, please contact our support team.'
    },

    // Checkout Page extra
    checkoutPageExtra: {
      egpSymbol: 'EGP',
      minOrderAmount: 'Minimum order: {amount}',
      maxOrderAmount: 'Maximum order: {amount}',
      andMoreUnavailable: 'and {count} more products...'
    },

    advancedCheckoutExtra: {
      customerInformation: 'Customer Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      firstNamePlaceholder: 'Enter your first name',
      lastNamePlaceholder: 'Enter your last name',
      emailAddress: 'Email Address',
      emailPlaceholder: 'your@email.com',
      phoneOptional: 'Phone Number (Optional)',
      phonePlaceholder: '+1 (555) 123-4567',
      continueToPayment: 'Continue to Payment',
      selectPaymentMethod: 'Select Payment Method',
      sendPaymentTo: 'Send payment to:',
      network: 'Network',
      amount: 'Amount',
      confirmPayment: 'Confirm Payment',
      processingPayment: 'Processing Payment',
      processingDescription: 'Please wait while we confirm your payment...',
      processingHint: 'This may take a few minutes',
      paymentSuccessful: 'Payment Successful!',
      successDescription: 'Your order has been confirmed and access links have been sent to your email.',
      orderDetails: 'Order Details',
      orderId: 'Order ID',
      paymentMethod: 'Payment Method',
      transaction: 'Transaction',
      orderItems: 'Order Items',
      qty: 'x',
      viewOrders: 'View Orders',
      paymentFailed: 'Payment Failed',
      failedDescription: 'Something went wrong while processing your payment. Please try again.',
      taxLabel: 'Tax (8%)',
      emailRequired: 'Email is required',
      invalidEmailFormat: 'Invalid email format',
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      failedToCreateOrder: 'Failed to create order'
    },

    // Payment Status page
    paymentStatusPage: {
      paymentInfoNotFound: 'Payment information not found. Please try again from the payment page.',
      errorOccurred: 'An error occurred',
      errorVerifyingPayment: 'An error occurred while verifying payment',
      backToPayment: 'Back to Payment',
      homePage: 'Home Page',
      operationCancelled: 'Operation Cancelled',
      tryAgainOrBrowse: 'You can try again or go back to shopping',
      retry: 'Retry',
      verifyingPayment: 'Verifying Payment',
      paymentNotConfirmedYet: 'Payment result has not been confirmed yet. This may take a moment.',
      processingPayment: 'Processing payment...',
      pleaseWaitDontClose: 'Please wait, do not close this page',
      paymentNotCompleted: 'Payment not completed?',
      paymentNotCompletedDesc: 'If you did not complete the payment or encountered an issue, you can cancel the operation',
      cancelAndReturn: 'Cancel operation and return'
    },

    // Checkout Failed Tips
    checkoutFailedTips: {
      cancelledTip1: 'Click "Try Again" when you are ready to complete your purchase',
      cancelledTip2: 'You can choose a different payment method if you prefer',
      verificationTip1: 'If you were charged, do not retry \u2014 check "Track Order" first',
      verificationTip2: 'Wait a few minutes then check your order status',
      verificationTip3: 'If no amount was charged, it is safe to try again',
      verificationTip4: 'Contact our support team if you are unsure',
      declinedTip1: 'Verify your card details and available balance',
      declinedTip2: 'Try a different card or payment method',
      declinedTip3: 'Contact your bank to ensure online transactions are enabled',
      insufficientTip1: 'Ensure you have sufficient balance in your account',
      insufficientTip2: 'Try a different payment method or card',
      expiredTip1: 'Use a valid, non-expired card',
      expiredTip2: 'You can also choose an alternative payment method',
      invalidCardTip1: 'Double-check your card number for any typos',
      invalidCardTip2: 'Verify the expiry date and CVV code',
      invalidCardTip3: 'Try entering the details carefully again',
      otpTip1: 'Enter the OTP code sent by your bank correctly',
      otpTip2: 'Make sure your phone number registered with the bank is up to date',
      otpTip3: 'Try again and complete verification within the time limit',
      timeoutTip1: 'Ensure your internet connection is stable',
      timeoutTip2: 'Try again and complete payment more quickly',
      timeoutTip3: 'Try a different payment method if the issue persists',
      serverTip1: 'Wait a minute or two then try again',
      serverTip2: 'Try a different payment method if the issue persists',
      cryptoTip1: 'Ensure you sent the correct amount in the specified currency',
      cryptoTip2: 'Check your crypto wallet balance',
      cryptoTip3: 'Try a different payment method if needed',
      refundTip1: 'The refund will appear in your account within 3-5 business days',
      refundTip2: 'If you do not see it after that, contact your bank or our support team',
      networkTip1: 'Make sure your internet connection is stable',
      networkTip2: 'Try switching to a different Wi-Fi or use mobile data',
      networkTip3: 'Try again after confirming your connection',
      technicalTip1: 'Wait a moment then try again',
      technicalTip2: 'Try a different payment method',
      technicalTip3: 'Contact our support team if the issue persists',
      defaultTip1: 'Check your payment details and available balance, then try again',
      defaultTip2: 'Try a different payment method',
      defaultTip3: 'Contact your bank to ensure there are no restrictions',
      defaultTip4: 'If the issue persists, contact our support team'
    },

    // Language Switcher (storefront)
    languageSwitcher: {
      switchToOtherLang: 'Switch to Arabic',
      otherLangLabel: '\u0639\u0631\u0628\u064a'
    },

    // Blog Article extra
    blogArticleExtra: {
      backToBlog: 'Back to blog',
      viewAllArticles: 'View all articles'
    },

    // Auth extra
    authExtra: {
      otpSentMessage: 'We sent a 6-digit verification code to'
    },

    // Product Reviews extra
    productReviewsExtra: {
      customerReviews: 'Customer Reviews',
      basedOnReviews: 'Based on {count} reviews',
      reviewsSummary: 'Customers praise instant activation speed and fast support. Safe buying experience with a 24-hour refund guarantee when needed.',
      recommendPercentage: '97% recommend the store',
      verifiedPurchase: 'Verified purchase',
      showMoreReviews: 'Show {count} more reviews'
    },

    // Digital Return Policy extra
    digitalReturnPolicyExtra: {
      followSteps: 'Follow these steps to speed up the review and resolution.',
      legalNote: 'Note: This document does not change your legal rights. In case of conflict, local laws and platform provider policies apply.'
    },

    // Blog Article
    blogArticle: {
      linkCopied: 'Link copied!',
      articleNotFound: 'Article Not Found',
      articleNotFoundDesc: "Sorry, this article doesn't exist or has been removed",
      views: 'views',
      share: 'Share',
      moreArticles: 'More Articles'
    },

    // ProductPageClient extra
    productPageExtra: {
      egpSymbol: 'EGP',
      recently: 'Recently',
      buyNowLabel: 'Buy Now',
      buyShort: 'Buy',
      optionsShort: 'Options',
      addShort: 'Add',
      shareProduct: 'Share',
      freeShippingBadge: 'Free Shipping',
      saveBadge: 'Save',
      fromPrice: 'From',
      onlyXLeft: 'Only {count} left',
      getItBy: 'Get it by {date}',
      estimatedDeliveryRange: 'Estimated delivery: {min} \u2013 {max}',
      freeReturnsWithinDays: 'Free returns within {days} days',
      chooseVariant: 'Choose {group}',
      combinationUnavailable: 'Combination Unavailable',
      completeYourSelection: 'Complete your selection',
      customizeProduct: 'Customize Product',
      completeSelectionFirst: 'Complete selection first',
      viewFullDetails: 'View full details',
      chooseRightOption: 'Choose the right option',
      selectedOfTotal: '{selected} of {total} selected',
      chooseOptionsBefore: 'Choose the right options before adding to cart',
      addFailed: 'Could not add to cart. Please try again.',
    },

    // Footer features
    footerFeatures: {
      secureContents: 'Secure contents',
      instantDelivery: 'Instant delivery',
      returnGuarantee: 'Return guarantee',
      securePackaging: 'Secure packaging',
      fastShipping: 'Fast shipping',
      easyReturns: 'Easy returns'
    },

    // Shipping Policy fallback
    shippingPolicyFallback: {
      heroBadge: 'Shipping Info',
      heroTitlePrimary: 'Shipping',
      heroTitleHighlight: 'Policy',
      heroDescription: 'Learn about our shipping methods and delivery areas.',
      heroLastUpdated: 'Last updated: December 2025',
      sectionShippingMethodsTitle: 'Shipping Methods',
      sectionShippingMethodsItem1: 'Multiple shipping options available',
      sectionShippingMethodsItem2: 'Standard and express shipping',
      sectionShippingMethodsItem3: 'Tracking information available',
      sectionDeliveryAreasTitle: 'Delivery Areas',
      sectionDeliveryAreasItem1: 'We ship to multiple regions',
      sectionDeliveryAreasItem2: 'International shipping available',
      sectionDeliveryAreasItem3: 'Accurate address required',
      sectionOrderProcessingTitle: 'Order Processing',
      sectionOrderProcessingItem1: 'Processing after payment',
      sectionOrderProcessingItem2: 'Tracking number via email',
      sectionOrderProcessingItem3: 'Check status in your account',
      sectionShippingCostsTitle: 'Shipping Costs',
      sectionShippingCostsItem1: 'Calculated at checkout',
      sectionShippingCostsItem2: 'Free shipping offers',
      sectionShippingCostsItem3: 'No hidden fees',
      featuresTitle: 'Our Shipping Promise',
      featureTrackingTitle: 'Order Tracking',
      featureTrackingDesc: 'Track your order every step',
      featureSecureTitle: 'Secure Packaging',
      featureSecureDesc: 'Products carefully packed',
      featureSupportTitle: 'Shipping Support',
      featureSupportDesc: 'Help with delivery questions',
      featureCoverageTitle: 'Wide Coverage',
      featureCoverageDesc: 'Multiple destinations',
      ctaTitle: 'Need Help With Shipping?',
      ctaDescription: 'Our support team is ready to assist.',
      ctaPrimary: 'Contact Support',
      ctaSecondary: 'Track Order'
    },

    // Return Policy fallback
    returnPolicyFallback: {
      heroBadge: 'Easy Returns',
      heroTitlePrimary: 'Return',
      heroTitleHighlight: 'Policy',
      heroDescription: 'We want you to be completely happy with your purchase. If not, we are here to help.',
      heroLastUpdated: 'Last updated: December 2025',
      returnPeriodTitle: 'Return Period',
      returnPeriodDays: '14 Days',
      returnPeriodDesc: 'You have 14 days from purchase date to return the product',
      sectionEligibilityTitle: 'Return Eligibility',
      sectionEligibilityItem1: 'Product must be in original condition',
      sectionEligibilityItem2: 'Product must be unused',
      sectionEligibilityItem3: 'Original packaging must be intact',
      sectionEligibilityItem4: 'Proof of purchase required',
      sectionConditionsTitle: 'Return Conditions',
      sectionConditionsItem1: 'Must show no signs of use',
      sectionConditionsItem2: 'Must include all accessories',
      sectionConditionsItem3: 'Must be in sellable condition',
      sectionRefundTitle: 'Refund Process',
      sectionRefundItem1: 'Processing after product inspection',
      sectionRefundItem2: 'Refund issued to original payment method',
      sectionRefundItem3: 'Processing time varies by payment method',
      sectionExchangesTitle: 'Exchanges',
      sectionExchangesItem1: 'Exchanges available for different sizes or colors',
      sectionExchangesItem2: 'Subject to product availability',
      sectionExchangesItem3: 'Contact support to arrange an exchange',
      processTitle: 'How to Return',
      processContactTitle: 'Contact Us',
      processContactDesc: 'Reach out to our support team',
      processApprovalTitle: 'Get Approval',
      processApprovalDesc: 'Receive return authorization',
      processShipTitle: 'Ship Item',
      processShipDesc: 'Package and ship following guidelines',
      processRefundTitle: 'Receive Refund',
      processRefundDesc: 'Get refund after inspection',
      nonReturnableTitle: 'Non-Returnable Items',
      nonReturnableItem1: 'Opened or used items',
      nonReturnableItem2: 'Gift cards and vouchers',
      nonReturnableItem3: 'Items marked as final sale',
      nonReturnableItem4: 'Personalized items',
      ctaTitle: 'Need to Return Something?',
      ctaDescription: 'Our support team is ready to help you.',
      ctaPrimary: 'Start Return',
      ctaSecondary: 'Contact Support'
    },
    sprint3: {
      categoryFilters: {
        filters: 'Filters',
        filterSort: 'Filter & Sort',
        sortBy: 'Sort by',
        popular: 'Most popular',
        newest: 'Newest',
        priceAsc: 'Price: Low to High',
        priceDesc: 'Price: High to Low',
        topRated: 'Top rated',
        biggestDiscount: 'Biggest discount',
        priceRange: 'Price range',
        minRating: 'Minimum rating',
        ratingAny: 'Any',
        inStockOnly: 'In stock only',
        clearAllFilters: 'Clear all filters',
        showResults: 'Show results',
        noResults: 'No products match the filters'
      },
      recentSearches: {
        title: 'Recent searches',
        clearAll: 'Clear'
      },
      quickView: {
        buttonLabel: 'Quick view',
        close: 'Close',
        addToCart: 'Add to cart',
        added: 'Added \u2713',
        outOfStock: 'Out of stock',
        selectOptions: 'Select options',
        viewFullDetails: 'View full details',
        addFailed: 'Could not add to cart. Please try again.'
      },
      qa: {
        title: 'Questions & Answers',
        askQuestion: 'Ask a question',
        yourName: 'Your name',
        emailPlaceholder: 'Email',
        questionPlaceholder: 'Type your question...',
        reviewNote: 'Your question will be reviewed before publishing',
        loading: 'Loading...',
        submit: 'Submit',
        submitted: 'Submitted',
        noQuestions: 'No questions yet. Be the first to ask!',
        askedBy: 'Asked by',
        supportTeam: '(Support team)',
        helpful: 'Helpful',
        submitError: 'Unable to submit. Please try again.',
        networkError: 'Network error. Please try again.',
        csrfError: 'Security check failed. Please refresh the page and try again.',
        rateLimitError: 'Too many requests. Please wait a moment and try again.',
        loadError: 'Could not load questions. Please try again.',
        retry: 'Retry',
        successTitle: 'Question submitted',
        successMessage: 'Thank you. Your question is awaiting review and will appear shortly.',
        successClose: 'Got it'
      },
      stockNotify: {
        buttonLabel: 'Notify me when available',
        modalTitle: 'Get back-in-stock alert',
        modalDesc: "We'll email you the moment this product is back in stock.",
        emailPlaceholder: 'your@email.com',
        alsoNotifyPriceDrop: 'Also notify me on price drops',
        notifyMe: 'Notify me',
        done: 'Done!',
        submitError: 'Unable to subscribe. Please try again.',
        networkError: 'Network error. Please try again.'
      },
      reviewsHistogram: {
        reviews: 'reviews'
      },
      savedPayments: {
        title: 'Saved cards',
        encrypted: 'Token-encrypted',
        loading: 'Loading...',
        deleteConfirm: 'Delete this card?',
        defaultBadge: 'Default',
        card: 'Card',
        exp: 'Exp',
        setDefault: 'Set default',
        delete: 'Delete',
        noCards: "No saved cards yet. They'll be saved automatically at checkout.",
        setDefaultError: 'Failed to set default card. Please try again.',
        deleteError: 'Failed to delete card. Please try again.',
        loadError: "Couldn't load your saved cards.",
        retry: 'Retry'
      }
    },
    wishlist: {
      title: 'My Wishlist',
      empty: 'Your wishlist is empty',
      emptyHint: 'Tap the heart icon on any product to save it for later',
      browse: 'Browse products',
      addAll: 'Add all to cart',
      clear: 'Clear wishlist',
      addToCart: 'Add to cart',
      remove: 'Remove',
      items: 'items',
      addToWishlist: 'Add to wishlist',
      removeFromWishlist: 'Remove from wishlist'
    },
    newsletter: {
      unsubscribe: {
        loading: 'Unsubscribing\u2026',
        successTitle: "You've been unsubscribed",
        successDesc: "You won't receive newsletter emails anymore. We're sorry to see you go.",
        backHome: 'Back to home',
        invalidLink: 'Invalid link'
      },
      confirm: {
        loading: 'Confirming\u2026',
        alreadyTitle: 'Already subscribed',
        successTitle: 'Subscription confirmed! \uD83C\uDF89',
        backHome: 'Back to home',
        invalidLink: 'Invalid link',
        invalidDesc: 'This link may have expired or already been used.'
      }
    }
  },

  ar: {
    // Header Navigation
    home: '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
    products: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
    categories: '\u0627\u0644\u0641\u0626\u0627\u062a',
    blog: '\u0627\u0644\u0645\u062f\u0648\u0646\u0629',
    about: '\u0645\u0646 \u0646\u062d\u0646',
    contact: '\u0627\u062a\u0635\u0644 \u0628\u0646\u0627',
    
    // Mobile Menu
    quickActions: '\u0627\u062e\u062a\u0635\u0627\u0631\u0627\u062a',
    fast: '\u0633\u0631\u064a\u0639',
    openMenu: '\u0641\u062a\u062d \u0627\u0644\u0642\u0627\u0626\u0645\u0629',
    searchLabel: '\u0628\u062d\u062b',
    findProduct: '\u0627\u0628\u062d\u062b \u0639\u0646 \u0645\u0646\u062a\u062c',
    cartLabel: '\u0627\u0644\u0633\u0644\u0629',
    reviewItems: '\u0631\u0627\u062c\u0639 \u0645\u0634\u062a\u0631\u064a\u0627\u062a\u0643',
    categoriesLabel: '\u0627\u0644\u0623\u0642\u0633\u0627\u0645',
    browseByType: '\u062a\u0635\u0641\u062d \u062d\u0633\u0628 \u0627\u0644\u0642\u0633\u0645',
    trackOrder: '\u062a\u062a\u0628\u0639 \u0627\u0644\u0637\u0644\u0628',
    orderStatus: '\u0627\u0639\u0631\u0641 \u062d\u0627\u0644\u0629 \u0627\u0644\u0634\u062d\u0646\u0629',
    helpLabel: '\u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629',
    faqsSupport: '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629',
    navigation: '\u0627\u0644\u062a\u0646\u0642\u0644',
    helpPolicies: '\u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629 \u0648\u0627\u0644\u0633\u064a\u0627\u0633\u0627\u062a',
    viewLabel: '\u0639\u0631\u0636',
    shippingLabel: '\u0627\u0644\u0634\u062d\u0646',
    digitalGuarantee: '\u0636\u0645\u0627\u0646 \u0627\u0644\u0645\u0646\u062a\u062c',
    returnsLabel: '\u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
    privacyLabel: '\u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629',
    termsLabel: '\u0627\u0644\u0634\u0631\u0648\u0637',
    safeShopping: '\u062a\u062c\u0631\u0628\u0629 \u0634\u0631\u0627\u0621 \u0622\u0645\u0646\u0629',
    safeShoppingDescDigital: '\u062a\u0633\u0644\u064a\u0645 \u0631\u0642\u0645\u064a \u0648\u0627\u0636\u062d\u060c \u0648\u0636\u0645\u0627\u0646 14 \u064a\u0648\u0645\u060c \u0648\u062f\u0639\u0645 \u0633\u0631\u064a\u0639 \u0639\u0646\u062f \u0627\u0644\u062d\u0627\u062c\u0629.',
    safeShoppingDescPhysical: '\u0634\u062d\u0646 \u0648\u0627\u0636\u062d\u060c \u0648\u0633\u064a\u0627\u0633\u0627\u062a \u0645\u0631\u0646\u0629\u060c \u0648\u062f\u0639\u0645 \u0633\u0631\u064a\u0639 \u0639\u0646\u062f \u0627\u0644\u062d\u0627\u062c\u0629.',
    contactUs: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',
    helpUs: '\u0645\u0633\u0627\u0639\u062f\u0629',
    
    // Auth
    login: '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644',
    logout: '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c',
    signUp: '\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628',
    register: '\u0627\u0644\u062a\u0633\u062c\u064a\u0644',
    profile: '\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a',
    adminPanel: '\u0644\u0648\u062d\u0629 \u0627\u0644\u0625\u062f\u0627\u0631\u0629',
    account: '\u0627\u0644\u062d\u0633\u0627\u0628',
    
    // Search
    search: '\u0628\u062d\u062b...',
    searchPlaceholder: '\u0627\u0628\u062d\u062b \u0639\u0646 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0623\u0648 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0623\u0648 \u0627\u0644\u0641\u0626\u0627\u062a...',
    searchResults: '\u0646\u062a\u0627\u0626\u062c \u0627\u0644\u0628\u062d\u062b',
    noResults: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c',
    
    // Cart
    cart: '\u0627\u0644\u0633\u0644\u0629',
    yourCart: '\u0633\u0644\u0629 \u0627\u0644\u062a\u0633\u0648\u0642',
    emptyCart: '\u0627\u0644\u0633\u0644\u0629 \u0641\u0627\u0631\u063a\u0629',
    addToCart: '\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629',
    removeFromCart: '\u062d\u0630\u0641',
    checkout: '\u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u0634\u0631\u0627\u0621',
    continueShopping: '\u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u062a\u0633\u0648\u0642',
    subtotal: '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0641\u0631\u0639\u064a',
    total: '\u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a',
    
    // Products
    buyNow: '\u0627\u0634\u062a\u0631\u064a \u0627\u0644\u0622\u0646',
    viewDetails: '\u0639\u0631\u0636 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644',
    outOfStock: '\u0646\u0641\u0630\u062a \u0627\u0644\u0643\u0645\u064a\u0629',
    inStock: '\u0645\u062a\u0648\u0641\u0631',
    limitedStock: '\u0643\u0645\u064a\u0629 \u0645\u062d\u062f\u0648\u062f\u0629',
    price: '\u0627\u0644\u0633\u0639\u0631',
    salePrice: '\u0633\u0639\u0631 \u0627\u0644\u062a\u062e\u0641\u064a\u0636',
    quantity: '\u0627\u0644\u0643\u0645\u064a\u0629',
    description: '\u0627\u0644\u0648\u0635\u0641',
    features: '\u0627\u0644\u0645\u0645\u064a\u0632\u0627\u062a',
    specifications: '\u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062a',
    reviews: '\u0627\u0644\u062a\u0642\u064a\u064a\u0645\u0627\u062a',
    rating: '\u0627\u0644\u062a\u0642\u064a\u064a\u0645',
    
    // Categories
    allCategories: '\u062c\u0645\u064a\u0639 \u0627\u0644\u0641\u0626\u0627\u062a',
    filterByCategory: '\u062a\u0635\u0641\u064a\u0629 \u062d\u0633\u0628 \u0627\u0644\u0641\u0626\u0629',
    'Shop by Category': '\u062a\u0633\u0648\u0642 \u062d\u0633\u0628 \u0627\u0644\u0641\u0626\u0629',
    'Subcategories': '\u0627\u0644\u0641\u0626\u0627\u062a \u0627\u0644\u0641\u0631\u0639\u064a\u0629',
    'No products found in this category': '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0646\u062a\u062c\u0627\u062a \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0641\u0626\u0629',
    'Shop Now': '\u062a\u0633\u0648\u0642 \u0627\u0644\u0622\u0646',
    
    // Common
    loading: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644...',
    error: '\u062e\u0637\u0623',
    success: '\u0646\u062c\u0627\u062d',
    save: '\u062d\u0641\u0638',
    cancel: '\u0625\u0644\u063a\u0627\u0621',
    close: '\u0625\u063a\u0644\u0627\u0642',
    viewAllResults: '\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0646\u062a\u0627\u0626\u062c \u0644\u0640 "{query}"',
    exploreCategory: '\u0627\u0633\u062a\u0643\u0634\u0641 {name}',
    delete: '\u062d\u0630\u0641',
    edit: '\u062a\u0639\u062f\u064a\u0644',
    view: '\u0639\u0631\u0636',
    viewAll: '\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064a\u062f',
    showMore: '\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064a\u062f',
    showLess: '\u0639\u0631\u0636 \u0623\u0642\u0644',
    learnMore: '\u0627\u0639\u0631\u0641 \u0627\u0644\u0645\u0632\u064a\u062f',
    getStarted: '\u0627\u0628\u062f\u0623 \u0627\u0644\u0622\u0646',
    and: '\u0648',
    
    // Messages
    loggingOut: '\u062c\u0627\u0631\u064a \u0627\u0644\u062e\u0631\u0648\u062c...',
    addedToCart: '\u062a\u0645\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629',
    removedFromCart: '\u062a\u0645 \u0627\u0644\u062d\u0630\u0641 \u0645\u0646 \u0627\u0644\u0633\u0644\u0629',
    cartUpdated: '\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0633\u0644\u0629',
    
    // Footer
    allRightsReserved: '\u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629',
    privacyPolicy: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629',
    termsOfService: '\u0634\u0631\u0648\u0637 \u0627\u0644\u062e\u062f\u0645\u0629',
    followUs: '\u062a\u0627\u0628\u0639\u0646\u0627',
    quickLinks: '\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064a\u0639\u0629',

    // \u0645\u0633\u0627\u062d\u0629 \u0627\u0644\u0623\u0633\u0645\u0627\u0621 common \u2014 \u062a\u0633\u062a\u062e\u062f\u0645\u0647\u0627 \u0627\u0633\u062a\u062f\u0639\u0627\u0621\u0627\u062a t("common.X") \u0641\u064a \u0645\u0643\u0648\u0651\u0646\u0627\u062a \u0627\u0644\u0645\u0648\u0642\u0639 (\u063a\u064a\u0631 \u0627\u0644\u0625\u062f\u0627\u0631\u0629).
    common: {
      addedToCart: '\u062a\u0645\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629',
      removedFromCart: '\u062a\u0645 \u0627\u0644\u062d\u0630\u0641 \u0645\u0646 \u0627\u0644\u0633\u0644\u0629',
      cartUpdated: '\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0633\u0644\u0629',
      removeFromCart: '\u062d\u0630\u0641',
      remove: '\u062d\u0630\u0641',
      quantity: '\u0627\u0644\u0643\u0645\u064a\u0629',
      outOfStock: '\u0646\u0641\u0630\u062a \u0627\u0644\u0643\u0645\u064a\u0629',
      inStock: '\u0645\u062a\u0648\u0641\u0631',
      total: '\u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a',
      subtotal: '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0641\u0631\u0639\u064a',
      continueShopping: '\u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u062a\u0633\u0648\u0642',
      cancel: '\u0625\u0644\u063a\u0627\u0621',
      close: '\u0625\u063a\u0644\u0627\u0642',
      save: '\u062d\u0641\u0638',
      delete: '\u062d\u0630\u0641',
      edit: '\u062a\u0639\u062f\u064a\u0644',
      view: '\u0639\u0631\u0636',
      loading: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644...',
      confirm: '\u062a\u0623\u0643\u064a\u062f',
      yes: '\u0646\u0639\u0645',
      no: '\u0644\u0627',
    },

    // Cart
    cart: {
      shoppingCart: '\u0633\u0644\u0629 \u0627\u0644\u062a\u0633\u0648\u0642',
      productUnavailable: '\u0627\u0644\u0645\u0646\u062a\u062c \u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631 \u062d\u0627\u0644\u064a\u064b\u0627',
      items: '\u0645\u0646\u062a\u062c\u0627\u062a',
      item: '\u0645\u0646\u062a\u062c',
      emptyCart: '\u0633\u0644\u0629 \u0627\u0644\u062a\u0633\u0648\u0642 \u0641\u0627\u0631\u063a\u0629',
      addProductsToStart: '\u0623\u0636\u0641 \u0628\u0639\u0636 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0644\u0644\u0628\u062f\u0621',
      digitalProduct: '\u0645\u0646\u062a\u062c \u0631\u0642\u0645\u064a',
      subtotal: '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0641\u0631\u0639\u064a',
      total: '\u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a',
      proceedToCheckout: '\u0645\u062a\u0627\u0628\u0639\u0629 \u0625\u0644\u0649 \u0627\u0644\u062f\u0641\u0639',
      continueShopping: '\u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u062a\u0633\u0648\u0642',
      off: '\u062e\u0635\u0645',
      outOfStock: '\u0646\u0641\u0630 \u0645\u0646 \u0627\u0644\u0645\u062e\u0632\u0648\u0646',
      onlyAvailable: '\u0645\u062a\u0648\u0641\u0631 {count} \u0641\u0642\u0637',
      maxAvailableReached: '\u062a\u0645 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u062d\u062f \u0627\u0644\u0623\u0642\u0635\u0649 \u0627\u0644\u0645\u062a\u0627\u062d',
      unavailableLabel: '\u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631',
      availableLabel: '\u0645\u062a\u0648\u0641\u0631',
      removeAllUnavailable: '\u0625\u0632\u0627\u0644\u0629 \u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u063a\u064a\u0631 \u0627\u0644\u0645\u062a\u0648\u0641\u0631\u0629',
      youSaved: '\u0645\u0628\u0631\u0648\u0643! \u0648\u0641\u0651\u0631\u062a',
      totalAmount: '\u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a',
      removeUnavailableFirst: '\u0623\u0632\u0644 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u063a\u064a\u0631 \u0627\u0644\u0645\u062a\u0648\u0641\u0631\u0629 \u0623\u0648\u0644\u0627\u064b',
      clickToPayNow: '\u0627\u0636\u063a\u0637 \u0647\u0646\u0627 \u0644\u0644\u062f\u0641\u0639 \u0627\u0644\u0622\u0646',
      itemSingular: '\u0645\u0646\u062a\u062c',
      itemPlural: '\u0645\u0646\u062a\u062c\u0627\u062a',
      productSingular: '\u0645\u0646\u062a\u062c',
      productPlural: '\u0645\u0646\u062a\u062c\u0627\u062a'
    },

    // Product Page
    productPage: {
      home: '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
      products: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      backToProducts: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      featured: '\u0645\u0645\u064a\u0632',
      popular: '\u0634\u0627\u0626\u0639',
      currentlyUnavailable: '\u063a\u064a\u0631 \u0645\u062a\u0627\u062d \u062d\u0627\u0644\u064a\u0627\u064b',
      outOfStock: '\u0646\u0641\u0630\u062a \u0627\u0644\u0643\u0645\u064a\u0629',
      available: '\u0645\u062a\u0627\u062d',
      backorderAvailable: '\u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0633\u0628\u0642 \u0645\u062a\u0627\u062d',
      price: '\u0627\u0644\u0633\u0639\u0631',
      limitedTimeOffer: '\u0639\u0631\u0636 \u0644\u0641\u062a\u0631\u0629 \u0645\u062d\u062f\u0648\u062f\u0629',
      instantAccess: '\u062a\u0633\u0644\u064a\u0645 \u0641\u0648\u0631\u064a',
      lifetimeUpdates: '\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0645\u062f\u0649 \u0627\u0644\u062d\u064a\u0627\u0629',
      securePayment: '\u062f\u0641\u0639 \u0622\u0645\u0646',
      support247: '\u062f\u0639\u0645 \u0639\u0644\u0649 \u0645\u062f\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629',
      addToCart: '\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629',
      addedToCart: '\u062a\u0645\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629!',
      viewLiveDemo: '\u0639\u0631\u0636 \u062a\u062c\u0631\u064a\u0628\u064a \u0645\u0628\u0627\u0634\u0631',
      instantDelivery: '\u062a\u0633\u0644\u064a\u0645 \u0641\u0648\u0631\u064a',
      secureCheckout: '\u062f\u0641\u0639 \u0622\u0645\u0646',
      productGallery: '\u0645\u0639\u0631\u0636 \u0627\u0644\u0645\u0646\u062a\u062c',
      description: '\u0627\u0644\u0648\u0635\u0641',
      features: '\u0627\u0644\u0645\u0645\u064a\u0632\u0627\u062a',
      reviews: '\u0627\u0644\u062a\u0642\u064a\u064a\u0645\u0627\u062a',
      detailedInformation: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u062a\u0641\u0635\u064a\u0644\u064a\u0629',
      whatYoullGet: '\u0645\u0627 \u0633\u062a\u062d\u0635\u0644 \u0639\u0644\u064a\u0647:',
      keyFeatures: '\u0627\u0644\u0645\u0645\u064a\u0632\u0627\u062a \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
      whyChooseThisProduct: '\u0644\u0645\u0627\u0630\u0627 \u062a\u062e\u062a\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u062a\u062c\u061f',
      secureReliable: '\u0622\u0645\u0646 \u0648\u0645\u0648\u062b\u0648\u0642',
      builtWithSecurity: '\u0645\u0628\u0646\u064a \u0628\u0623\u0641\u0636\u0644 \u0645\u0639\u0627\u064a\u064a\u0631 \u0627\u0644\u0623\u0645\u0627\u0646',
      highPerformance: '\u0623\u062f\u0627\u0621 \u0639\u0627\u0644\u064a',
      optimizedForSpeed: '\u0645\u062d\u0633\u0651\u0646 \u0644\u0644\u0633\u0631\u0639\u0629 \u0648\u0627\u0644\u0643\u0641\u0627\u0621\u0629',
      cleanCode: '\u0643\u0648\u062f \u0646\u0638\u064a\u0641',
      wellDocumented: '\u0645\u0648\u062b\u0651\u0642 \u0628\u0634\u0643\u0644 \u062c\u064a\u062f \u0648\u0642\u0627\u0628\u0644 \u0644\u0644\u0635\u064a\u0627\u0646\u0629',
      expertSupport: '\u062f\u0639\u0645 \u0645\u062a\u062e\u0635\u0635',
      technicalAssistance: '\u0645\u0633\u0627\u0639\u062f\u0629 \u062a\u0642\u0646\u064a\u0629 \u0639\u0644\u0649 \u0645\u062f\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629',
      customerReviews: '\u062a\u0642\u064a\u064a\u0645\u0627\u062a \u0627\u0644\u0639\u0645\u0644\u0627\u0621',
      wouldRecommend: '\u0669\u0667\u066a \u064a\u0648\u0635\u0648\u0646 \u0628\u0627\u0644\u0645\u062a\u062c\u0631',
      customersLove: '\u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u064a\u0645\u062f\u062d\u0648\u0646 \u0633\u0631\u0639\u0629 \u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u0641\u0648\u0631\u064a \u0648\u0627\u0644\u062f\u0639\u0645 \u0627\u0644\u0633\u0631\u064a\u0639. \u062a\u062c\u0631\u0628\u0629 \u0634\u0631\u0627\u0621 \u0622\u0645\u0646\u0629 \u0645\u0639 \u0636\u0645\u0627\u0646 \u0627\u0633\u062a\u0631\u062f\u0627\u062f \u062e\u0644\u0627\u0644 24 \u0633\u0627\u0639\u0629 \u0639\u0646\u062f \u0627\u0644\u062d\u0627\u062c\u0629.',
      verifiedPurchase: '\u0639\u0645\u0644\u064a\u0629 \u0634\u0631\u0627\u0621 \u0645\u0648\u062b\u0642\u0629',
      loadMoreReviews: '\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064a\u062f \u0645\u0646 \u0627\u0644\u062a\u0642\u064a\u064a\u0645\u0627\u062a',
      youMightAlsoLike: '\u0642\u062f \u064a\u0639\u062c\u0628\u0643 \u0623\u064a\u0636\u0627\u064b',
      similarProducts: '\u0645\u0646\u062a\u062c\u0627\u062a \u0645\u0634\u0627\u0628\u0647\u0629 \u0645\u0646 \u0646\u0641\u0633 \u0627\u0644\u0641\u0626\u0629',
      viewAll: '\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064a\u062f',
      viewAllProducts: '\u0639\u0631\u0636 \u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      unavailable: '\u063a\u064a\u0631 \u0645\u062a\u0627\u062d',
      sold: '\u0639\u0645\u0644\u064a\u0629 \u0634\u0631\u0627\u0621',
      professionalDigitalSolution: '\u062d\u0644 \u0631\u0642\u0645\u064a \u0627\u062d\u062a\u0631\u0627\u0641\u064a',
      productDemoVideo: '\u0641\u064a\u062f\u064a\u0648 \u062a\u0648\u0636\u064a\u062d\u064a \u0644\u0644\u0645\u0646\u062a\u062c',
      // Physical mode alternatives
      fastShipping: '\u0634\u062d\u0646 \u0633\u0631\u064a\u0639',
      qualityGuarantee: '\u0636\u0645\u0627\u0646 \u0627\u0644\u062c\u0648\u062f\u0629',
      easyReturns: '\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0633\u0647\u0644',
      customerService: '\u062e\u062f\u0645\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621',
      whatYoullReceive: '\u0645\u0627 \u0633\u062a\u0633\u062a\u0644\u0645\u0647:',
      productFeatures: '\u0645\u0648\u0627\u0635\u0641\u0627\u062a \u0627\u0644\u0645\u0646\u062a\u062c',
      // Default Features
      defaultFeatures: {
        professionalGrade: '\u062c\u0648\u062f\u0629 \u0643\u0648\u062f \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629',
        comprehensiveDocs: '\u062a\u0648\u062b\u064a\u0642 \u0634\u0627\u0645\u0644 \u0645\u064f\u0631\u0641\u0642',
        regularUpdates: '\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0648\u062a\u062d\u0633\u064a\u0646\u0627\u062a \u0645\u0633\u062a\u0645\u0631\u0629',
        prioritySupport: '\u062f\u0639\u0645 \u0641\u0646\u064a \u0630\u0648 \u0623\u0648\u0644\u0648\u064a\u0629',
        secureImplementation: '\u062a\u0637\u0628\u064a\u0642 \u0622\u0645\u0646 \u0648\u0645\u064f\u062e\u062a\u0628\u0631',
        easyIntegration: '\u0639\u0645\u0644\u064a\u0629 \u062a\u0643\u0627\u0645\u0644 \u0633\u0647\u0644\u0629',
      },
      // Physical mode features
      physicalFeatures: {
        premiumQuality: '\u062e\u0627\u0645\u0627\u062a \u0639\u0627\u0644\u064a\u0629 \u0627\u0644\u062c\u0648\u062f\u0629',
        carefulPackaging: '\u062a\u063a\u0644\u064a\u0641 \u0645\u062d\u0643\u0645 \u0648\u0622\u0645\u0646',
        fastDelivery: '\u062a\u0648\u0635\u064a\u0644 \u0633\u0631\u064a\u0639',
        satisfactionGuarantee: '\u0636\u0645\u0627\u0646 \u0627\u0644\u0631\u0636\u0627',
        authenticProduct: '\u0645\u0646\u062a\u062c \u0623\u0635\u0644\u064a',
        customerSupport: '\u062f\u0639\u0645 \u0627\u0644\u0639\u0645\u0644\u0627\u0621',
      },
      // Physical mode alternatives for badges and sections
      physicalProduct: '\u0645\u0646\u062a\u062c \u0645\u0644\u0645\u0648\u0633',
      whyChooseThisItem: '\u0644\u0645\u0627\u0630\u0627 \u062a\u062e\u062a\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u062a\u062c\u061f',
      // Physical mode Why Choose section
      testedQuality: '\u062c\u0648\u062f\u0629 \u0645\u062e\u062a\u0628\u0631\u0629',
      rigorousQualityControl: '\u0645\u0639\u0627\u064a\u064a\u0631 \u0635\u0627\u0631\u0645\u0629 \u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u062c\u0648\u062f\u0629',
      fastDeliveryTitle: '\u062a\u0648\u0635\u064a\u0644 \u0633\u0631\u064a\u0639',
      quickShipping: '\u0634\u062d\u0646 \u0633\u0631\u064a\u0639 \u0648\u0622\u0645\u0646',
      originalProduct: '\u0645\u0646\u062a\u062c \u0623\u0635\u0644\u064a',
      authenticGuaranteed: '\u0623\u0635\u0644\u064a 100% \u0645\u0636\u0645\u0648\u0646',
      supportTeam: '\u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645',
      supportDescription: '\u062f\u0639\u0645 \u0639\u0645\u0644\u0627\u0621 \u0645\u062a\u062e\u0635\u0635',
      playVideo: '\u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u0641\u064a\u062f\u064a\u0648',
      watchDemo: '\u0634\u0627\u0647\u062f \u0639\u0631\u0636 \u0627\u0644\u0645\u0646\u062a\u062c \u0627\u0644\u062a\u0641\u0635\u064a\u0644\u064a'
    },
    
    // Home Page
    featuredProducts: '\u0645\u0646\u062a\u062c\u0627\u062a \u0645\u0645\u064a\u0632\u0629',
    latestProducts: '\u0623\u062d\u062f\u062b \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
    popularProducts: '\u0645\u0646\u062a\u062c\u0627\u062a \u0634\u0627\u0626\u0639\u0629',
    whyChooseUs: '\u0644\u0645\u0627\u0630\u0627 \u062a\u062e\u062a\u0627\u0631\u0646\u0627',
    ourServices: '\u062e\u062f\u0645\u0627\u062a\u0646\u0627',
    testimonials: '\u0622\u0631\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u0627\u0621',
    
    // Detailed Sections
    servicesSection: {
      badge: '\u062e\u062f\u0645\u0627\u062a\u0646\u0627 \u0627\u0644\u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629',
      headingPrimary: '\u062d\u0644\u0648\u0644',
      headingHighlight: '\u0645\u062a\u0642\u062f\u0645\u0629',
      headingSecondary: '\u0644\u0644\u0645\u062d\u062a\u0631\u0641\u064a\u0646',
      description: '\u0646\u0642\u062f\u0645 \u062e\u062f\u0645\u0627\u062a \u062a\u0637\u0648\u064a\u0631 \u0634\u0627\u0645\u0644\u0629 \u0641\u064a \u0627\u0644\u0628\u0644\u0648\u0643\u062a\u0634\u064a\u0646 \u0648 Web3\u200e \u0645\u0639 \u0636\u0645\u0627\u0646 \u0627\u0644\u062c\u0648\u062f\u0629 \u0648\u0627\u0644\u062d\u0645\u0627\u064a\u0629.',
      popularBadge: '\u0627\u0644\u0623\u0643\u062b\u0631 \u0637\u0644\u0628\u0627\u064b',
      cta: '\u0627\u0637\u0644\u0628 \u0627\u0644\u062e\u062f\u0645\u0629',
      cards: {
        web3Development: {
          title: '\u062a\u0637\u0648\u064a\u0631 Web3',
          description: '\u062d\u0644\u0648\u0644 \u0628\u0644\u0648\u0643\u062a\u0634\u064a\u0646 \u0645\u062e\u0635\u0635\u0629\u060c \u0639\u0642\u0648\u062f \u0630\u0643\u064a\u0629\u060c \u0648\u0645\u0646\u0635\u0627\u062a DeFi\u200e \u0645\u0628\u0646\u064a\u0629 \u0628\u0623\u062d\u062f\u062b \u0627\u0644\u062a\u0642\u0646\u064a\u0627\u062a.',
          price: '\u0627\u0628\u062a\u062f\u0627\u0621\u064b \u0645\u0646 5000$',
          features: ['\u0627\u0644\u0639\u0642\u0648\u062f \u0627\u0644\u0630\u0643\u064a\u0629', '\u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u062a\u0637\u0628\u064a\u0642\u0627\u062a \u0627\u0644\u0644\u0627\u0645\u0631\u0643\u0632\u064a\u0629', '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062a\u0648\u0643\u0646\u0627\u062a', '\u0645\u0646\u0635\u0627\u062a NFT']
        },
        presalePlatforms: {
          title: '\u0645\u0646\u0635\u0627\u062a \u0627\u0644\u0628\u064a\u0639 \u0627\u0644\u0645\u0633\u0628\u0642 (Presale)',
          description: '\u0645\u0648\u0627\u0642\u0639 \u0628\u064a\u0639 \u0645\u0633\u0628\u0642 \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629 \u0628\u062e\u0635\u0627\u0626\u0635 \u0645\u062a\u0642\u062f\u0645\u0629 \u0648\u062a\u062d\u0644\u064a\u0644\u0627\u062a \u0648\u0623\u0646\u0638\u0645\u0629 \u062f\u0641\u0639 \u0622\u0645\u0646\u0629.',
          price: '\u0627\u0628\u062a\u062f\u0627\u0621\u064b \u0645\u0646 2000$',
          features: ['\u062a\u0635\u0645\u064a\u0645 \u0645\u062e\u0635\u0635', '\u0628\u0648\u0627\u0628\u0627\u062a \u062f\u0641\u0639', '\u0644\u0648\u062d\u0629 \u062a\u062d\u0644\u064a\u0644\u0627\u062a', '\u062a\u0648\u0627\u0641\u0642 \u0643\u0627\u0645\u0644 \u0645\u0639 \u0627\u0644\u0647\u0648\u0627\u062a\u0641']
        },
        securitySolutions: {
          title: '\u062d\u0644\u0648\u0644 \u0627\u0644\u0623\u0645\u0627\u0646',
          description: '\u0623\u062f\u0648\u0627\u062a \u0623\u0645\u0627\u0646 \u0645\u062a\u0642\u062f\u0645\u0629 \u0648\u062e\u062f\u0645\u0627\u062a \u062a\u062f\u0642\u064a\u0642 \u0644\u062d\u0645\u0627\u064a\u0629 \u0645\u0634\u0627\u0631\u064a\u0639\u0643 \u0648\u0623\u0635\u0648\u0644\u0643.',
          price: '\u0627\u0628\u062a\u062f\u0627\u0621\u064b \u0645\u0646 3000$',
          features: ['\u062a\u062f\u0642\u064a\u0642 \u0623\u0645\u0646\u064a', '\u0627\u062e\u062a\u0628\u0627\u0631\u0627\u062a \u0627\u062e\u062a\u0631\u0627\u0642', '\u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u062b\u063a\u0631\u0627\u062a', '\u0645\u0631\u0627\u0642\u0628\u0629 \u0639\u0644\u0649 \u0645\u062f\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629']
        },
        exchangeDevelopment: {
          title: '\u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0645\u0646\u0635\u0627\u062a',
          description: '\u0645\u0646\u0635\u0627\u062a \u062a\u062f\u0627\u0648\u0644 (CEX/DEX) \u0645\u062a\u0643\u0627\u0645\u0644\u0629 \u0628\u062e\u0635\u0627\u0626\u0635 \u062a\u062f\u0627\u0648\u0644 \u0645\u062a\u0642\u062f\u0645\u0629 \u0648\u0623\u0645\u0646 \u0645\u0624\u0633\u0633\u064a.',
          price: '\u0627\u0628\u062a\u062f\u0627\u0621\u064b \u0645\u0646 10000$',
          features: ['\u0645\u062d\u0631\u0643 \u062a\u062f\u0627\u0648\u0644', '\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0633\u064a\u0648\u0644\u0629', '\u0627\u0639\u0631\u0641 \u0639\u0645\u064a\u0644\u0643 \u0648\u0645\u0643\u0627\u0641\u062d\u0629 \u063a\u0633\u0644 \u0627\u0644\u0623\u0645\u0648\u0627\u0644', '\u062f\u0639\u0645 \u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0639\u0645\u0644\u0627\u062a']
        },
        whiteLabelSolutions: {
          title: '\u062d\u0644\u0648\u0644 \u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u0628\u064a\u0636\u0627\u0621',
          description: '\u062d\u0644\u0648\u0644 \u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u0646\u0634\u0631 \u064a\u0645\u0643\u0646 \u062a\u062e\u0635\u064a\u0635\u0647\u0627 \u0644\u062a\u0637\u0627\u0628\u0642 \u0647\u0648\u064a\u0629 \u0639\u0645\u0644\u0643.',
          price: '\u0627\u0628\u062a\u062f\u0627\u0621\u064b \u0645\u0646 1500$',
          features: ['\u062a\u062e\u0635\u064a\u0635 \u0627\u0644\u0647\u0648\u064a\u0629', '\u0625\u0637\u0644\u0627\u0642 \u0633\u0631\u064a\u0639', '\u062f\u0639\u0645 \u0643\u0627\u0645\u0644', '\u0643\u0648\u062f \u0627\u0644\u0645\u0635\u062f\u0631']
        },
        customDevelopment: {
          title: '\u062a\u0637\u0648\u064a\u0631 \u0645\u062e\u0635\u0635',
          description: '\u062e\u062f\u0645\u0627\u062a \u062a\u0637\u0648\u064a\u0631 \u0645\u0641\u0635\u0644\u0629 \u0644\u0644\u0645\u0634\u0627\u0631\u064a\u0639 \u0627\u0644\u0641\u0631\u064a\u062f\u0629 \u0648\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062e\u0627\u0635\u0629.',
          price: '\u0639\u0631\u0636 \u0633\u0639\u0631 \u0645\u062e\u0635\u0635',
          features: ['\u062d\u0644\u0648\u0644 \u062e\u0627\u0635\u0629', '\u0641\u0631\u064a\u0642 \u0645\u062e\u0635\u0635', '\u062a\u0637\u0648\u064a\u0631 \u0645\u0631\u0646', '\u062f\u0639\u0645 \u0637\u0648\u064a\u0644 \u0627\u0644\u0623\u0645\u062f']
        }
      }
    },
    productsSection: {
      badge: '\u0641\u0626\u0627\u062a \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      headingPrimary: '\u0627\u0633\u062a\u0643\u0634\u0641',
      headingHighlight: '\u0645\u0646\u062a\u062c\u0627\u062a\u0646\u0627',
      headingSecondary: '\u062d\u0633\u0628 \u0627\u0644\u0641\u0626\u0629',
      description: '\u062a\u0635\u0641\u062d \u0645\u062c\u0645\u0648\u0639\u062a\u0646\u0627 \u0627\u0644\u062d\u0635\u0631\u064a\u0629 \u0645\u0646 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0627\u0644\u0645\u0635\u0646\u0641\u0629 \u062d\u0633\u0628 \u0627\u0644\u0641\u0626\u0629.',
      cta: '\u0639\u0631\u0636 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      viewAll: '\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      categories: {
        walletApplications: {
          title: '\u062a\u0637\u0628\u064a\u0642\u0627\u062a \u0627\u0644\u0645\u062d\u0627\u0641\u0638',
          description: '\u062a\u0637\u0628\u064a\u0642\u0627\u062a \u0645\u062d\u0627\u0641\u0638 \u0645\u062a\u0639\u062f\u062f\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0628\u0623\u0645\u0627\u0646 \u0639\u0627\u0644\u064d \u0648\u062a\u062c\u0631\u0628\u0629 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0633\u0647\u0644\u0629'
        },
        web3Scripts: {
          title: '\u0633\u0643\u0631\u0628\u062a\u0627\u062a Web3',
          description: '\u0645\u062c\u0645\u0648\u0639\u0629 \u0634\u0627\u0645\u0644\u0629 \u0645\u0646 \u0633\u0643\u0631\u0628\u062a\u0627\u062a Web3\u200e \u0627\u0644\u062c\u0627\u0647\u0632\u0629 \u0645\u0639 \u0623\u062f\u0644\u0629 \u062a\u0631\u0643\u064a\u0628'
        },
        presalePlatforms: {
          title: '\u0645\u0646\u0635\u0627\u062a \u0627\u0644\u0628\u064a\u0639 \u0627\u0644\u0645\u0633\u0628\u0642',
          description: '\u0645\u0648\u0627\u0642\u0639 \u0628\u064a\u0639 \u0645\u0633\u0628\u0642 \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629 \u0628\u062e\u0635\u0627\u0626\u0635 \u0645\u062a\u0642\u062f\u0645\u0629 \u0648\u0623\u0646\u0638\u0645\u0629 \u062f\u0641\u0639 \u0622\u0645\u0646\u0629'
        },
        exchangePlatforms: {
          title: '\u0645\u0646\u0635\u0627\u062a \u0627\u0644\u062a\u062f\u0627\u0648\u0644 (DEX/CEX)',
          description: '\u0645\u0646\u0635\u0627\u062a \u062a\u062f\u0627\u0648\u0644 \u0645\u062a\u0643\u0627\u0645\u0644\u0629 \u0628\u062e\u0635\u0627\u0626\u0635 \u0645\u062a\u0642\u062f\u0645\u0629 \u0648\u0623\u0645\u0646 \u0645\u0624\u0633\u0633\u064a'
        }
      }
    },
    contactPage: {
      heroTitlePrimary: '\u062a\u0648\u0627\u0635\u0644',
      heroTitleHighlight: '\u0645\u0639\u0646\u0627',
      heroDescription: '\u0647\u0644 \u0644\u062f\u064a\u0643 \u0623\u0633\u0626\u0644\u0629 \u062d\u0648\u0644 \u0645\u0646\u062a\u062c\u0627\u062a\u0646\u0627 \u0623\u0648 \u062a\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u062d\u0644\u0648\u0644 \u062a\u0637\u0648\u064a\u0631 \u0645\u062e\u0635\u0635\u0629\u061f \u0641\u0631\u064a\u0642\u0646\u0627 \u0627\u0644\u062e\u0628\u064a\u0631 \u0647\u0646\u0627 \u0644\u0645\u0633\u0627\u0639\u062f\u062a\u0643 \u0639\u0644\u0649 \u0627\u0644\u0646\u062c\u0627\u062d.',
      contactInformationTitle: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0648\u0627\u0635\u0644',
      contactInformationDescription: '\u062c\u0627\u0647\u0632\u0648\u0646 \u0644\u0646\u0642\u0644 \u0645\u0634\u0631\u0648\u0639\u0643 \u0644\u0644\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u062a\u0627\u0644\u064a. \u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0639\u0628\u0631 \u0623\u064a \u0645\u0646 \u0627\u0644\u0642\u0646\u0648\u0627\u062a \u0627\u0644\u062a\u0627\u0644\u064a\u0629.',
      labels: {
        email: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        phone: '\u0627\u0644\u0647\u0627\u062a\u0641',
        hours: '\u0633\u0627\u0639\u0627\u062a \u0627\u0644\u0639\u0645\u0644',
        location: '\u0627\u0644\u0645\u0648\u0642\u0639',
        whatWeOffer: '\u0645\u0627\u0630\u0627 \u0646\u0642\u062f\u0645'
      },
      supportFeatures: {
        support: '\u062f\u0639\u0645 \u0641\u0646\u064a \u0639\u0644\u0649 \u0645\u062f\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629',
        security: '\u0627\u062a\u0635\u0627\u0644 \u0622\u0645\u0646',
        response: '\u0627\u0633\u062a\u062c\u0627\u0628\u0629 \u0633\u0631\u064a\u0639\u0629'
      },
      infoLines: {
        hoursWeekdays: '\u0627\u0644\u0623\u062d\u062f - \u0627\u0644\u062e\u0645\u064a\u0633: 9:00 \u0635 - 6:00 \u0645',
        hoursWeekend: '\u0627\u0644\u062c\u0645\u0639\u0629 - \u0627\u0644\u0633\u0628\u062a: \u062f\u0639\u0645 \u0645\u062d\u062f\u0648\u062f',
        locationPrimary: '\u0645\u062a\u062c\u0631 \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        locationSecondary: '\u0646\u062e\u062f\u0645 \u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u0641\u064a \u0627\u0644\u062e\u0644\u064a\u062c'
      },
      contactDetails: {
        emails: [],
        phones: []
      }
    },
    contactForm: {
      title: '\u0623\u0631\u0633\u0644 \u0644\u0646\u0627 \u0631\u0633\u0627\u0644\u0629',
      firstName: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644',
      lastName: '\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0626\u0644\u0629',
      emailAddress: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
      subject: '\u0627\u0644\u0645\u0648\u0636\u0648\u0639',
      subjectPlaceholder: '\u0627\u062e\u062a\u0631 \u0645\u0648\u0636\u0648\u0639\u0627\u064b',
      subjects: {
        general: '\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0639\u0627\u0645',
        custom: '\u062a\u0637\u0648\u064a\u0631 \u0645\u062e\u0635\u0635',
        support: '\u062f\u0639\u0645 \u0641\u0646\u064a',
        billing: '\u0633\u0624\u0627\u0644 \u0645\u0627\u0644\u064a',
        partnership: '\u0634\u0631\u0627\u0643\u0629'
      },
      message: '\u0627\u0644\u0631\u0633\u0627\u0644\u0629',
      messagePlaceholder: '\u0623\u062e\u0628\u0631\u0646\u0627 \u0639\u0646 \u0645\u0634\u0631\u0648\u0639\u0643 \u0623\u0648 \u0633\u0624\u0627\u0644\u0643...',
      privacyNotice: '\u0623\u0648\u0627\u0641\u0642 \u0639\u0644\u0649',
      placeholders: {
        firstName: '\u0623\u062d\u0645\u062f',
        lastName: '\u0627\u0644\u0633\u064a\u062f',
        email: 'ahmed@example.com'
      },
      submit: '\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629'
    },
    aboutPage: {
      badge: '\u0639\u0646 {siteName}',
      heroHeadingPrimary: '\u0646\u0628\u0646\u064a \u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644',
      heroHeadingSecondary: '\u0644\u062d\u0644\u0648\u0644 Web3',
      heroDescription: '\u0646\u062d\u0646 \u0641\u0631\u064a\u0642 \u0645\u0646 \u0627\u0644\u0645\u0637\u0648\u0631\u064a\u0646 \u0648\u062e\u0628\u0631\u0627\u0621 \u0627\u0644\u0628\u0644\u0648\u0643\u062a\u0634\u064a\u0646 \u0627\u0644\u0634\u063a\u0648\u0641\u064a\u0646 \u0628\u062a\u0642\u062f\u064a\u0645 \u0623\u062f\u0648\u0627\u062a Web3\u200e \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629 \u0648\u0622\u0645\u0646\u0629 \u0648\u0645\u0628\u062a\u0643\u0631\u0629 \u0644\u0644\u0645\u062c\u062a\u0645\u0639 \u0627\u0644\u0639\u0627\u0644\u0645\u064a.',
      ctaPrimary: '\u0627\u0633\u062a\u0643\u0634\u0641 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      ctaSecondary: '\u0627\u062a\u0635\u0644 \u0628\u0646\u0627',
      stats: {
        activeUsers: '\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u0648\u0646 \u0627\u0644\u0646\u0634\u0637\u0648\u0646',
        productsDelivered: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0645\u0633\u0644\u0651\u0645\u0629',
        successRate: '\u0646\u0633\u0628\u0629 \u0627\u0644\u0646\u062c\u0627\u062d',
        countriesServed: '\u0627\u0644\u062f\u0648\u0644 \u0627\u0644\u0645\u062e\u062f\u0648\u0645\u0629'
      },
      statsValues: {
        activeUsers: '10,000+',
        productsDelivered: '50+',
        successRate: '99.9%',
        countriesServed: '45+'
      },
      missionTitle: '\u0645\u0647\u0645\u062a\u0646\u0627',
      missionDescription: '\u062a\u0645\u0643\u064a\u0646 \u0627\u0644\u0645\u0637\u0648\u0631\u064a\u0646 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0648\u0627\u0644\u0623\u0641\u0631\u0627\u062f \u0628\u0623\u062f\u0648\u0627\u062a Web3\u200e \u0648\u062d\u0644\u0648\u0644 \u0628\u0644\u0648\u0643\u062a\u0634\u064a\u0646 \u0628\u0645\u0633\u062a\u0648\u0649 \u0627\u062d\u062a\u0631\u0627\u0641\u064a.',
      valuesTitle: '\u0642\u064a\u0645\u0646\u0627 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629',
      valuesSubtitle: '\u0627\u0644\u0645\u0628\u0627\u062f\u0626 \u0627\u0644\u062a\u064a \u062a\u0648\u062c\u0647 \u0643\u0644 \u0645\u0627 \u0646\u0642\u0648\u0645 \u0628\u0647',
      teamTitle: '\u0641\u0631\u064a\u0642\u0646\u0627',
      teamSubtitle: '\u0645\u062d\u062a\u0631\u0641\u0648\u0646 \u064a\u0639\u0645\u0644\u0648\u0646 \u0645\u0639\u0627\u064b \u0644\u062a\u0642\u062f\u064a\u0645 \u0627\u0644\u062a\u0645\u064a\u0632',
      journeyTitle: '\u0631\u062d\u0644\u062a\u0646\u0627',
      journeySubtitle: '\u0645\u062d\u0637\u0627\u062a \u0631\u0626\u064a\u0633\u064a\u0629 \u0641\u064a \u0642\u0635\u0629 \u0646\u0645\u0648\u0646\u0627',
      ctaTitle: '\u0627\u0646\u0636\u0645 \u0625\u0644\u0649 \u0645\u062c\u062a\u0645\u0639\u0646\u0627',
      ctaDescription: '\u0643\u0646 \u062c\u0632\u0621\u0627\u064b \u0645\u0646 \u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0645\u0637\u0648\u0631\u064a\u0646 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u0628\u0646\u064a \u0645\u0633\u062a\u0642\u0628\u0644 Web3',
      valuesList: [
        {
          title: '\u0627\u0644\u0623\u0645\u0627\u0646 \u0623\u0648\u0644\u0627\u064b',
          description: '\u0646\u0636\u0639 \u0627\u0644\u0623\u0645\u0627\u0646 \u0641\u064a \u0635\u0645\u064a\u0645 \u0643\u0644 \u0645\u0646\u062a\u062c \u0648\u0646\u0637\u0628\u0642 \u0623\u0641\u0636\u0644 \u0627\u0644\u0645\u0645\u0627\u0631\u0633\u0627\u062a \u0648\u0645\u0639\u0627\u064a\u064a\u0631 \u0627\u0644\u0639\u0642\u0648\u062f \u0627\u0644\u0630\u0643\u064a\u0629 \u0627\u0644\u0645\u062f\u0642\u0642\u0629.'
        },
        {
          title: '\u0627\u0644\u0627\u0628\u062a\u0643\u0627\u0631',
          description: '\u0646\u062f\u0641\u0639 \u062d\u062f\u0648\u062f \u0627\u0644\u062a\u0642\u0646\u064a\u0629 \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0623\u062d\u062f\u062b \u062d\u0644\u0648\u0644 Web3\u200e \u0648\u0627\u0644\u0628\u0644\u0648\u0643\u062a\u0634\u064a\u0646.'
        },
        {
          title: '\u0646\u062c\u0627\u062d \u0627\u0644\u0639\u0645\u0644\u0627\u0621',
          description: '\u0646\u062c\u0627\u062d\u0643 \u0647\u0648 \u0645\u0647\u0645\u062a\u0646\u0627\u061b \u0646\u0648\u0641\u0631 \u062f\u0639\u0645\u0627\u064b \u0645\u062a\u0648\u0627\u0635\u0644\u0627\u064b \u0648\u062a\u0648\u062b\u064a\u0642\u0627\u064b \u0634\u0627\u0645\u0644\u0627\u064b.'
        },
        {
          title: '\u0627\u0644\u062a\u0645\u064a\u0632',
          description: '\u0645\u0644\u062a\u0632\u0645\u0648\u0646 \u0628\u062a\u0642\u062f\u064a\u0645 \u062c\u0648\u062f\u0629 \u0627\u0633\u062a\u062b\u0646\u0627\u0626\u064a\u0629 \u062a\u0641\u0648\u0642 \u0627\u0644\u062a\u0648\u0642\u0639\u0627\u062a.'
        }
      ],
      teamMembers: [
        {
          name: '\u0641\u0631\u064a\u0642 \u0627\u0644\u062a\u0637\u0648\u064a\u0631',
          role: '\u0645\u0637\u0648\u0631\u0648 \u0627\u0644\u0628\u0644\u0648\u0643\u062a\u0634\u064a\u0646',
          description: '\u0645\u0637\u0648\u0631\u0648\u0646 \u062e\u0628\u0631\u0627\u0621 \u0628\u062e\u0628\u0631\u0629 \u062a\u062a\u062c\u0627\u0648\u0632 5 \u0633\u0646\u0648\u0627\u062a \u0641\u064a Web3\u200e \u0648\u0627\u0644\u0639\u0642\u0648\u062f \u0627\u0644\u0630\u0643\u064a\u0629.'
        },
        {
          name: '\u0641\u0631\u064a\u0642 \u0627\u0644\u0623\u0645\u0627\u0646',
          role: '\u0645\u062f\u0642\u0642\u0648 \u0627\u0644\u0623\u0645\u0627\u0646',
          description: '\u0645\u062e\u062a\u0635\u0648\u0646 \u0645\u0639\u062a\u0645\u062f\u0648\u0646 \u064a\u0636\u0645\u0646\u0648\u0646 \u0627\u0644\u062a\u0632\u0627\u0645 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0628\u0623\u0639\u0644\u0649 \u0645\u0639\u0627\u064a\u064a\u0631 \u0627\u0644\u062d\u0645\u0627\u064a\u0629.'
        },
        {
          name: '\u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645',
          role: '\u0646\u062c\u0627\u062d \u0627\u0644\u0639\u0645\u0644\u0627\u0621',
          description: '\u0641\u0631\u064a\u0642 \u062f\u0639\u0645 \u0645\u062a\u0641\u0631\u063a \u0639\u0644\u0649 \u0645\u062f\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629 \u0644\u0645\u0633\u0627\u0639\u062f\u062a\u0643 \u0641\u064a \u0623\u064a \u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0623\u0648 \u0645\u0634\u0643\u0644\u0629.'
        }
      ],
      journeyTimeline: [
        { year: '2021', title: '\u062a\u0623\u0633\u064a\u0633 \u0627\u0644\u0634\u0631\u0643\u0629', description: '\u0628\u062f\u0623\u0646\u0627 \u0631\u062d\u0644\u062a\u0646\u0627 \u0641\u064a \u062a\u0637\u0648\u064a\u0631 \u062d\u0644\u0648\u0644 Web3\u200e.' },
        { year: '2022', title: '\u0623\u0648\u0644 1000 \u0645\u0633\u062a\u062e\u062f\u0645', description: '\u062d\u0642\u0642\u0646\u0627 \u0623\u0648\u0644 \u0625\u0646\u062c\u0627\u0632 \u0631\u0626\u064a\u0633\u064a \u0641\u064a \u0639\u062f\u062f \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646.' },
        { year: '2023', title: '\u062a\u0648\u0633\u064a\u0639 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a', description: '\u0623\u0637\u0644\u0642\u0646\u0627 \u0623\u0643\u062b\u0631 \u0645\u0646 20 \u0645\u0646\u062a\u062c\u0627\u064b \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0627\u064b.' },
        { year: '2024', title: '\u0648\u0635\u0648\u0644 \u0639\u0627\u0644\u0645\u064a', description: '\u0648\u0633\u0639\u0646\u0627 \u062e\u062f\u0645\u0627\u062a\u0646\u0627 \u0625\u0644\u0649 \u0623\u0643\u062b\u0631 \u0645\u0646 45 \u062f\u0648\u0644\u0629.' },
        { year: '2025', title: '\u0631\u064a\u0627\u062f\u0629 \u0627\u0644\u0635\u0646\u0627\u0639\u0629', description: '\u062a\u0645 \u0627\u0644\u0627\u0639\u062a\u0631\u0627\u0641 \u0628\u0646\u0627 \u0643\u0623\u062d\u062f \u0623\u0628\u0631\u0632 \u0645\u0632\u0648\u062f\u064a \u062d\u0644\u0648\u0644 Web3\u200e.' }
      ],
      ctaButton: '\u0627\u0628\u062f\u0623 \u0627\u0644\u0622\u0646',
      highReliability: '\u0645\u0648\u062b\u0648\u0642\u064a\u0629 \u0639\u0627\u0644\u064a\u0629',
      highReliabilityDesc: '\u0645\u0646\u062a\u062c\u0627\u062a \u0645\u062e\u062a\u0628\u0631\u0629 \u0648\u0622\u0645\u0646\u0629 100%',
      superiorPerformance: '\u0623\u062f\u0627\u0621 \u0641\u0627\u0626\u0642',
      superiorPerformanceDesc: '\u062d\u0644\u0648\u0644 \u0645\u062d\u0633\u0646\u0629 \u0644\u0644\u0633\u0631\u0639\u0629 \u0648\u0627\u0644\u0643\u0641\u0627\u0621\u0629',
      support247Title: '\u062f\u0639\u0645 \u0645\u062a\u0648\u0627\u0635\u0644',
      support247Desc: '\u0641\u0631\u064a\u0642 \u062f\u0639\u0645 \u0645\u062a\u0627\u062d \u0639\u0644\u0649 \u0645\u062f\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629',
      premiumQuality: '\u062c\u0648\u062f\u0629 \u0645\u0645\u062a\u0627\u0632\u0629',
      premiumQualityDesc: '\u0623\u0639\u0644\u0649 \u0645\u0639\u0627\u064a\u064a\u0631 \u0627\u0644\u062a\u0637\u0648\u064a\u0631 \u0648\u0627\u0644\u062c\u0648\u062f\u0629'
    },
    privacyPage: {
      hero: {
        badge: '\u062e\u0635\u0648\u0635\u064a\u062a\u0643 \u0645\u0647\u0645\u0629',
        titlePrimary: '\u0633\u064a\u0627\u0633\u0629',
        titleHighlight: '\u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629',
        description: '\u0646\u0644\u062a\u0632\u0645 \u0628\u062d\u0645\u0627\u064a\u0629 \u062e\u0635\u0648\u0635\u064a\u062a\u0643 \u0648\u0627\u0644\u062a\u0639\u0627\u0645\u0644 \u0645\u0639 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u0628\u0645\u0633\u0624\u0648\u0644\u064a\u0629. \u062a\u0648\u0636\u062d \u0647\u0630\u0647 \u0627\u0644\u0633\u064a\u0627\u0633\u0629 \u0645\u0627 \u0646\u062c\u0645\u0639\u0647 \u0645\u0646 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0648\u0643\u064a\u0641 \u0646\u0633\u062a\u062e\u062f\u0645\u0647 \u0648\u0645\u0639 \u0645\u0646 \u0646\u0634\u0627\u0631\u0643\u0647 \u0648\u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a \u0627\u0644\u0645\u062a\u0627\u062d\u0629 \u0644\u0643.',
        lastUpdated: '\u0622\u062e\u0631 \u062a\u062d\u062f\u064a\u062b: 18 \u064a\u0648\u0646\u064a\u0648 2026'
      },
      sections: [
        {
          key: 'informationWeCollect',
          title: '\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u064a \u0646\u062c\u0645\u0639\u0647\u0627',
          items: [
            '\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0627\u0644\u062a\u064a \u062a\u0642\u062f\u0645\u0647\u0627 \u0639\u0646\u062f \u0627\u0644\u062f\u0641\u0639 \u0623\u0648 \u0627\u0644\u062a\u0633\u062c\u064a\u0644: \u0627\u0644\u0627\u0633\u0645\u060c \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u060c \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641\u060c \u0648\u0627\u0644\u062f\u0648\u0644\u0629',
            '\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0634\u062d\u0646 (\u0644\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0644\u0645\u0648\u0633\u0629 \u0641\u0642\u0637) \u0644\u062a\u0648\u0635\u064a\u0644 \u0637\u0644\u0628\u0643',
            '\u0633\u062c\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0648\u0627\u0644\u0645\u0634\u062a\u0631\u064a\u0627\u062a \u0627\u0644\u0644\u0627\u0632\u0645 \u0644\u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0648\u062a\u0642\u062f\u064a\u0645 \u0627\u0644\u062f\u0639\u0645',
            '\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062c\u0647\u0627\u0632 \u0648\u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0645\u062b\u0644 \u0639\u0646\u0648\u0627\u0646 IP\u200e \u0648\u0646\u0648\u0639 \u0627\u0644\u0645\u062a\u0635\u0641\u062d \u0648\u0627\u0644\u0635\u0641\u062d\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u0632\u0648\u0631\u0647\u0627',
            '\u0645\u0639\u0631\u0651\u0641\u0627\u062a \u0625\u0639\u0644\u0627\u0646\u064a\u0629 \u0645\u0646 \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u0630\u064a \u0648\u0635\u0644\u062a \u0639\u0628\u0631\u0647 (\u0645\u062b\u0644 \u0645\u0639\u0631\u0651\u0641\u0627\u062a \u0627\u0644\u0646\u0642\u0631 \u0645\u0646 \u062a\u064a\u0643 \u062a\u0648\u0643 \u0623\u0648 \u0645\u064a\u062a\u0627 \u0623\u0648 \u0633\u0646\u0627\u0628 \u0634\u0627\u062a) \u0644\u0642\u064a\u0627\u0633 \u0623\u062f\u0627\u0621 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062a',
            '\u0646\u062d\u0646 \u0644\u0627 \u0646\u062c\u0645\u0639 \u0623\u064a \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0634\u062e\u0635\u064a\u0629 \u062d\u0633\u0651\u0627\u0633\u0629 \u2014 \u0644\u0627 \u0623\u0631\u0642\u0627\u0645 \u0647\u0648\u064a\u0629 \u0623\u0648 \u062c\u0648\u0627\u0632\u0627\u062a\u060c \u0648\u0644\u0627 \u0628\u064a\u0627\u0646\u0627\u062a \u0628\u0646\u0643\u064a\u0629 \u0623\u0648 \u0623\u0631\u0642\u0627\u0645 \u0628\u0637\u0627\u0642\u0627\u062a \u0643\u0627\u0645\u0644\u0629\u060c \u0648\u0644\u0627 \u0643\u0644\u0645\u0627\u062a \u0645\u0631\u0648\u0631 \u0623\u0648 \u0628\u064a\u0627\u0646\u0627\u062a \u0635\u062d\u064a\u0629 \u0623\u0648 \u062f\u064a\u0646\u064a\u0629 \u0623\u0648 \u062d\u064a\u0648\u064a\u0629'
          ]
        },
        {
          key: 'howWeUseInformation',
          title: '\u0643\u064a\u0641\u064a\u0629 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a',
          items: [
            '\u0645\u0639\u0627\u0644\u062c\u0629 \u0637\u0644\u0628\u0643 \u0648\u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0648\u0625\u0631\u0633\u0627\u0644 \u062a\u0623\u0643\u064a\u062f\u0627\u062a \u0627\u0644\u0634\u0631\u0627\u0621',
            '\u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0628\u062e\u0635\u0648\u0635 \u0637\u0644\u0628\u0643 (\u0628\u0631\u064a\u062f\u060c \u0647\u0627\u062a\u0641\u060c \u0623\u0648 \u062a\u0637\u0628\u064a\u0642\u0627\u062a \u0627\u0644\u0645\u0631\u0627\u0633\u0644\u0629)',
            '\u062a\u0642\u062f\u064a\u0645 \u062f\u0639\u0645 \u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u0648\u0627\u0644\u0631\u062f \u0639\u0644\u0649 \u0627\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631\u0627\u062a',
            '\u0642\u064a\u0627\u0633 \u0648\u062a\u062d\u0633\u064a\u0646 \u0625\u0639\u0644\u0627\u0646\u0627\u062a\u0646\u0627 \u0639\u0644\u0649 \u0645\u0646\u0635\u0627\u062a \u0645\u062b\u0644 \u062a\u064a\u0643 \u062a\u0648\u0643 \u0648\u0645\u064a\u062a\u0627 \u0648\u0633\u0646\u0627\u0628 \u0634\u0627\u062a \u0648\u062c\u0648\u062c\u0644',
            '\u062a\u062d\u0633\u064a\u0646 \u0645\u0648\u0642\u0639\u0646\u0627 \u0648\u0645\u0646\u0639 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u0644 \u0648\u0627\u0644\u062d\u0641\u0627\u0638 \u0639\u0644\u0649 \u0623\u0645\u0627\u0646 \u0627\u0644\u0645\u0646\u0635\u0629',
            '\u0641\u0642\u0637 \u0644\u0644\u0623\u063a\u0631\u0627\u0636 \u0627\u0644\u0645\u0648\u0636\u0651\u062d\u0629 \u0647\u0646\u0627 \u2014 \u0648\u0644\u0627 \u0646\u0633\u062a\u062e\u062f\u0645\u0647\u0627 \u0623\u0628\u062f\u0627\u064b \u0641\u064a \u0623\u064a \u063a\u0631\u0636 \u0644\u0645 \u062a\u064f\u062e\u0637\u064e\u0631 \u0628\u0647'
          ]
        },
        {
          key: 'dataSecurity',
          title: '\u0623\u0645\u0627\u0646 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0627\u0644\u0645\u062f\u0641\u0648\u0639\u0627\u062a',
          items: [
            '\u062a\u062a\u0645 \u0645\u0639\u0627\u0644\u062c\u0629 \u062c\u0645\u064a\u0639 \u0645\u062f\u0641\u0648\u0639\u0627\u062a \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0639\u0628\u0631 \u0628\u0648\u0627\u0628\u0627\u062a \u062f\u0641\u0639 \u0645\u0631\u062e\u0651\u0635\u0629 \u0648\u0645\u062a\u0648\u0627\u0641\u0642\u0629 \u0645\u0639 \u0645\u0639\u064a\u0627\u0631 PCI-DSS',
            '\u0646\u062d\u0646 \u0644\u0627 \u0646\u062e\u0632\u0651\u0646 \u0631\u0642\u0645 \u0628\u0637\u0627\u0642\u062a\u0643 \u0627\u0644\u0643\u0627\u0645\u0644 \u0623\u0648 \u0631\u0645\u0632 CVV \u0639\u0644\u0649 \u062e\u0648\u0627\u062f\u0645\u0646\u0627',
            '\u062a\u0634\u0641\u064a\u0631 SSL/TLS \u0628\u0645\u0639\u0627\u064a\u064a\u0631 \u0635\u0646\u0627\u0639\u064a\u0629 \u0644\u062c\u0645\u064a\u0639 \u062a\u0628\u0627\u062f\u0644\u0627\u062a \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a',
            '\u062e\u0648\u0627\u062f\u0645 \u0622\u0645\u0646\u0629 \u0645\u0639 \u0648\u0635\u0648\u0644 \u0645\u062d\u062f\u0648\u062f \u0644\u0645\u0648\u0638\u0641\u064a\u0646\u0627 \u0625\u0644\u0649 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629',
            '\u0646\u0633\u062e \u0627\u062d\u062a\u064a\u0627\u0637\u064a\u0629 \u0645\u0646\u062a\u0638\u0645\u0629 \u0648\u0625\u062c\u0631\u0627\u0621\u0627\u062a \u0644\u0627\u0633\u062a\u0639\u0627\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a',
            '\u0627\u0644\u062a\u0632\u0627\u0645 \u0628\u0645\u0639\u0627\u064a\u064a\u0631 \u062d\u0645\u0627\u064a\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u0639\u0645\u0648\u0644 \u0628\u0647\u0627'
          ]
        },
        {
          key: 'informationSharing',
          title: '\u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a',
          items: [
            '\u0644\u0646 \u0646\u0628\u064a\u0639 \u0645\u0639\u0644\u0648\u0645\u0627\u062a\u0643 \u0627\u0644\u0634\u062e\u0635\u064a\u0629 \u0644\u0623\u064a \u062c\u0647\u0629 \u0639\u0644\u0649 \u0627\u0644\u0625\u0637\u0644\u0627\u0642',
            '\u0628\u0648\u0627\u0628\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u062a\u062d\u0635\u0644 \u0641\u0642\u0637 \u0639\u0644\u0649 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0644\u0627\u0632\u0645\u0629 \u0644\u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u062f\u0641\u0639',
            '\u0634\u0631\u0643\u0627\u0621 \u0627\u0644\u0634\u062d\u0646 \u064a\u062d\u0635\u0644\u0648\u0646 \u0641\u0642\u0637 \u0639\u0644\u0649 \u0645\u0627 \u064a\u0644\u0632\u0645 \u0644\u062a\u0648\u0635\u064a\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0644\u0645\u0648\u0633\u0629',
            '\u0634\u0631\u0643\u0627\u0621 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0648\u0627\u0644\u062a\u062d\u0644\u064a\u0644\u0627\u062a (\u062a\u064a\u0643 \u062a\u0648\u0643\u060c \u0645\u064a\u062a\u0627\u060c \u0633\u0646\u0627\u0628 \u0634\u0627\u062a\u060c \u062c\u0648\u062c\u0644) \u0642\u062f \u064a\u062a\u0644\u0642\u0648\u0646 \u0645\u0639\u0631\u0651\u0641\u0627\u062a \u0645\u062d\u062f\u0648\u062f\u0629 \u0648\u0645\u062c\u0632\u0651\u0623\u0629 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646 (\u0645\u062b\u0644 \u0628\u0631\u064a\u062f \u0623\u0648 \u0647\u0627\u062a\u0641 \u0645\u062c\u0632\u0651\u0623) \u0641\u0642\u0637 \u0644\u0642\u064a\u0627\u0633 \u0648\u062a\u062d\u0633\u064a\u0646 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062a',
            '\u0646\u0641\u0635\u062d \u0639\u0646 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0646\u062f \u0637\u0644\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0623\u0648 \u0644\u0645\u0646\u0639 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u0644',
            '\u062c\u0645\u064a\u0639 \u0645\u0632\u0648\u062f\u064a \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0645\u0644\u0632\u0645\u0648\u0646 \u0628\u0627\u0644\u0633\u0631\u064a\u0629 \u0648\u062d\u0645\u0627\u064a\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a'
          ]
        },
        {
          key: 'yourRights',
          title: '\u062d\u0642\u0648\u0642\u0643 \u0648\u062e\u064a\u0627\u0631\u0627\u062a\u0643',
          items: [
            '\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u0627\u0644\u0634\u062e\u0635\u064a\u0629 \u0641\u064a \u0623\u064a \u0648\u0642\u062a',
            '\u0637\u0644\u0628 \u062a\u0635\u062d\u064a\u062d \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u063a\u064a\u0631 \u0627\u0644\u062f\u0642\u064a\u0642\u0629',
            '\u0637\u0644\u0628 \u062d\u0630\u0641 \u062d\u0633\u0627\u0628\u0643 \u0648\u0628\u064a\u0627\u0646\u0627\u062a\u0643',
            '\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643 \u0645\u0646 \u0627\u0644\u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u062a\u0633\u0648\u064a\u0642\u064a\u0629 \u0641\u064a \u0623\u064a \u0648\u0642\u062a',
            '\u062a\u0642\u064a\u064a\u062f \u062a\u062a\u0628\u0651\u0639 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062a \u0639\u0628\u0631 \u0625\u0639\u062f\u0627\u062f\u0627\u062a \u062c\u0647\u0627\u0632\u0643/\u0645\u062a\u0635\u0641\u062d\u0643 \u0623\u0648 \u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0625\u0639\u0644\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u0646\u0635\u0629 (\u0645\u062b\u0644 \u062a\u064a\u0643 \u062a\u0648\u0643)',
            '\u0627\u0644\u0627\u0639\u062a\u0631\u0627\u0636 \u0639\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u0623\u0648 \u062a\u0642\u064a\u064a\u062f\u0647\u0627'
          ]
        },
        {
          key: 'cookies',
          title: '\u0645\u0644\u0641\u0627\u062a \u062a\u0639\u0631\u064a\u0641 \u0627\u0644\u0627\u0631\u062a\u0628\u0627\u0637 \u0648\u0627\u0644\u0628\u0643\u0633\u0644\u0627\u062a \u0648\u0627\u0644\u062a\u062a\u0628\u0639',
          items: [
            '\u0645\u0644\u0641\u0627\u062a \u0623\u0633\u0627\u0633\u064a\u0629 \u0636\u0631\u0648\u0631\u064a\u0629 \u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062f\u0641\u0639',
            '\u0645\u0644\u0641\u0627\u062a \u062a\u062d\u0644\u064a\u0644\u064a\u0629 \u062a\u0633\u0627\u0639\u062f\u0646\u0627 \u0639\u0644\u0649 \u0641\u0647\u0645 \u0643\u064a\u0641\u064a\u0629 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0645\u0648\u0642\u0639',
            '\u0645\u0644\u0641\u0627\u062a \u062a\u0641\u0636\u064a\u0644\u0627\u062a \u0644\u062a\u0630\u0643\u0651\u0631 \u0644\u063a\u062a\u0643 \u0648\u0625\u0639\u062f\u0627\u062f\u0627\u062a\u0643',
            '\u0628\u0643\u0633\u0644\u0627\u062a \u0625\u0639\u0644\u0627\u0646\u064a\u0629/\u0642\u064a\u0627\u0633 \u0645\u0646 \u0634\u0631\u0643\u0627\u0621 \u0645\u062b\u0644 \u062a\u064a\u0643 \u062a\u0648\u0643 \u0648\u0645\u064a\u062a\u0627 \u0648\u0633\u0646\u0627\u0628 \u0634\u0627\u062a \u0648\u062c\u0648\u062c\u0644 \u0644\u0642\u064a\u0627\u0633 \u0648\u062a\u062d\u0633\u064a\u0646 \u0625\u0639\u0644\u0627\u0646\u0627\u062a\u0646\u0627',
            '\u064a\u0645\u0643\u0646\u0643 \u062a\u0642\u064a\u064a\u062f \u0645\u0644\u0641\u0627\u062a \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062a \u0639\u0628\u0631 \u0645\u062a\u0635\u0641\u062d\u0643 \u0623\u0648 \u062c\u0647\u0627\u0632\u0643 \u0623\u0648 \u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0645\u0646\u0635\u0629 \u0627\u0644\u0625\u0639\u0644\u0627\u0646',
            '\u0646\u0637\u0644\u0628 \u0645\u0648\u0627\u0641\u0642\u062a\u0643 \u0642\u0628\u0644 \u0645\u0639\u0627\u0644\u062c\u0629 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u0639\u0646\u062f \u0627\u0644\u062f\u0641\u0639'
          ]
        }
      ],
      additional: [
        {
          key: 'advertisingPartners',
          title: '\u0634\u0631\u0643\u0627\u0621 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0648\u0627\u0644\u0642\u064a\u0627\u0633',
          body: '\u0646\u064f\u0639\u0644\u0646 \u0639\u0644\u0649 \u0645\u0646\u0635\u0627\u062a \u0645\u062b\u0644 \u062a\u064a\u0643 \u062a\u0648\u0643 \u0648\u0645\u064a\u062a\u0627 (\u0641\u064a\u0633\u0628\u0648\u0643/\u0625\u0646\u0633\u062a\u063a\u0631\u0627\u0645) \u0648\u0633\u0646\u0627\u0628 \u0634\u0627\u062a \u0648\u062c\u0648\u062c\u0644. \u0648\u0644\u0642\u064a\u0627\u0633 \u0645\u0627 \u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u0625\u0639\u0644\u0627\u0646\u0627\u062a\u0646\u0627 \u062a\u0624\u062f\u064a \u0625\u0644\u0649 \u0639\u0645\u0644\u064a\u0627\u062a \u0634\u0631\u0627\u0621 \u0648\u062a\u062d\u0633\u064a\u0646 \u0645\u062f\u0649 \u0645\u0644\u0627\u0621\u0645\u062a\u0647\u0627\u060c \u0642\u062f \u0646\u0634\u0627\u0631\u0643 \u0645\u062c\u0645\u0648\u0639\u0629 \u0645\u062d\u062f\u0648\u062f\u0629 \u0645\u0646 \u0627\u0644\u0645\u0639\u0631\u0651\u0641\u0627\u062a \u0627\u0644\u0645\u062c\u0632\u0651\u0623\u0629 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646 (\u0645\u062b\u0644 \u0628\u0631\u064a\u062f \u0623\u0648 \u0631\u0642\u0645 \u0647\u0627\u062a\u0641 \u0645\u062c\u0632\u0651\u0623) \u0648\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0623\u062d\u062f\u0627\u062b (\u0645\u062b\u0644 \u0632\u064a\u0627\u0631\u0629 \u0635\u0641\u062d\u0629 \u0623\u0648 \u0625\u062a\u0645\u0627\u0645 \u0637\u0644\u0628) \u0645\u0639 \u0647\u0624\u0644\u0627\u0621 \u0627\u0644\u0634\u0631\u0643\u0627\u0621 \u0639\u0628\u0631 \u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0642\u064a\u0627\u0633 \u0627\u0644\u0631\u0633\u0645\u064a\u0629 \u0627\u0644\u062e\u0627\u0635\u0629 \u0628\u0647\u0645 (\u0627\u0644\u0628\u0643\u0633\u0644\u0627\u062a \u0648\u0648\u0627\u062c\u0647\u0627\u062a \u0627\u0644\u0623\u062d\u062f\u0627\u062b/\u0627\u0644\u062a\u062d\u0648\u064a\u0644\u0627\u062a \u0645\u0646 \u062c\u0647\u0629 \u0627\u0644\u062e\u0627\u062f\u0645). \u062a\u064f\u0633\u062a\u062e\u062f\u0645 \u0647\u0630\u0647 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0641\u0642\u0637 \u0644\u0642\u064a\u0627\u0633 \u0648\u062a\u062d\u0633\u064a\u0646 \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062a\u060c \u0648\u0644\u0627 \u062a\u064f\u0628\u0627\u0639 \u0623\u0628\u062f\u0627\u064b\u060c \u0648\u0644\u0627 \u062a\u062a\u0636\u0645\u0646 \u0623\u064a \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0634\u062e\u0635\u064a\u0629 \u062d\u0633\u0651\u0627\u0633\u0629. \u064a\u0645\u0643\u0646\u0643 \u062a\u0642\u064a\u064a\u062f \u0647\u0630\u0627 \u0627\u0644\u062a\u062a\u0628\u0651\u0639 \u0639\u0628\u0631 \u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0645\u062a\u0635\u0641\u062d\u0643/\u062c\u0647\u0627\u0632\u0643 \u0623\u0648 \u062a\u0641\u0636\u064a\u0644\u0627\u062a \u0627\u0644\u0625\u0639\u0644\u0627\u0646\u0627\u062a \u0641\u064a \u0643\u0644 \u0645\u0646\u0635\u0629.'
        },
        {
          key: 'dataRetention',
          title: '\u0627\u0644\u0627\u062d\u062a\u0641\u0627\u0638 \u0628\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a',
          body: '\u0646\u062d\u062a\u0641\u0638 \u0628\u0645\u0639\u0644\u0648\u0645\u0627\u062a\u0643 \u0627\u0644\u0634\u062e\u0635\u064a\u0629 \u0637\u0627\u0644\u0645\u0627 \u0643\u0627\u0646 \u0630\u0644\u0643 \u0636\u0631\u0648\u0631\u064a\u0627\u064b \u0644\u062a\u0642\u062f\u064a\u0645 \u062e\u062f\u0645\u0627\u062a\u0646\u0627 \u0648\u0627\u0644\u0627\u0645\u062a\u062b\u0627\u0644 \u0644\u0644\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0629. \u064a\u062a\u0645 \u0627\u0644\u0627\u062d\u062a\u0641\u0627\u0638 \u0628\u0633\u062c\u0644\u0627\u062a \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062a \u0648\u0641\u0642 \u0627\u0644\u0644\u0648\u0627\u0626\u062d \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0627\u0644\u0645\u0639\u0645\u0648\u0644 \u0628\u0647\u0627.'
        },
        {
          key: 'internationalTransfers',
          title: '\u0627\u0644\u0646\u0642\u0644 \u0627\u0644\u062f\u0648\u0644\u064a \u0644\u0644\u0628\u064a\u0627\u0646\u0627\u062a',
          body: '\u0642\u062f \u064a\u062a\u0645 \u0646\u0642\u0644 \u0645\u0639\u0644\u0648\u0645\u0627\u062a\u0643 \u0625\u0644\u0649 \u0628\u0644\u062f\u0627\u0646 \u0623\u062e\u0631\u0649 \u0648\u0645\u0639\u0627\u0644\u062c\u062a\u0647\u0627 \u0647\u0646\u0627\u0643. \u0646\u0636\u0645\u0646 \u0648\u062c\u0648\u062f \u0636\u0645\u0627\u0646\u0627\u062a \u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u062d\u0645\u0627\u064a\u0629 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u0648\u0641\u0642\u0627\u064b \u0644\u0647\u0630\u0647 \u0627\u0644\u0633\u064a\u0627\u0633\u0629 \u0648\u0627\u0644\u0642\u0648\u0627\u0646\u064a\u0646 \u0627\u0644\u0645\u0639\u0645\u0648\u0644 \u0628\u0647\u0627.'
        },
        {
          key: 'childrenPrivacy',
          title: '\u062e\u0635\u0648\u0635\u064a\u0629 \u0627\u0644\u0623\u0637\u0641\u0627\u0644',
          body: '\u062e\u062f\u0645\u0627\u062a\u0646\u0627 \u063a\u064a\u0631 \u0645\u0648\u062c\u0647\u0629 \u0644\u0645\u0646 \u0647\u0645 \u062f\u0648\u0646 18 \u0639\u0627\u0645\u0627\u064b. \u0644\u0627 \u0646\u062c\u0645\u0639 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0634\u062e\u0635\u064a\u0629 \u0639\u0646 \u0642\u0635\u062f \u0645\u0646 \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u0648\u0633\u0646\u0642\u0648\u0645 \u0628\u062d\u0630\u0641\u0647\u0627 \u0641\u0648\u0631\u0627\u064b \u0639\u0646\u062f \u0627\u0643\u062a\u0634\u0627\u0641\u0647\u0627.'
        },
        {
          key: 'policyChanges',
          title: '\u062a\u063a\u064a\u064a\u0631\u0627\u062a \u0627\u0644\u0633\u064a\u0627\u0633\u0629',
          body: '\u0642\u062f \u0646\u0642\u0648\u0645 \u0628\u062a\u062d\u062f\u064a\u062b \u0647\u0630\u0647 \u0627\u0644\u0633\u064a\u0627\u0633\u0629 \u0645\u0646 \u0648\u0642\u062a \u0644\u0622\u062e\u0631. \u0633\u0646\u062e\u0637\u0631\u0643 \u0628\u0646\u0634\u0631 \u0627\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u062c\u062f\u064a\u062f\u0629 \u0648\u062a\u062d\u062f\u064a\u062b \u062a\u0627\u0631\u064a\u062e\u0647\u0627\u060c \u0648\u0642\u062f \u0646\u0631\u0633\u0644 \u0628\u0631\u064a\u062f\u0627\u064b \u0639\u0646\u062f \u0648\u062c\u0648\u062f \u062a\u063a\u064a\u064a\u0631\u0627\u062a \u062c\u0648\u0647\u0631\u064a\u0629.'
        }
      ],
      contact: {
        title: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',
        description: '\u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u0644\u062f\u064a\u0643 \u0623\u064a \u0623\u0633\u0626\u0644\u0629 \u062d\u0648\u0644 \u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629 \u0647\u0630\u0647 \u0623\u0648 \u0643\u064a\u0641\u064a\u0629 \u062a\u0639\u0627\u0645\u0644\u0646\u0627 \u0645\u0639 \u0628\u064a\u0627\u0646\u0627\u062a\u0643\u060c \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627:',
        emailLabel: '\u0628\u0631\u064a\u062f \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629',
        emailValue: 'privacy@store.com',
        dpoLabel: '\u0645\u0633\u0624\u0648\u0644 \u062d\u0645\u0627\u064a\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a',
        dpoValue: 'dpo@store.com'
      },
      cta: {
        title: '\u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u0641\u064a \u0623\u0645\u0627\u0646 \u0645\u0639\u0646\u0627',
        description: '\u0646\u0633\u062a\u062e\u062f\u0645 \u0623\u062d\u062f\u062b \u0645\u0639\u0627\u064a\u064a\u0631 \u0627\u0644\u0623\u0645\u0627\u0646 \u0644\u062d\u0645\u0627\u064a\u0629 \u0645\u0639\u0644\u0648\u0645\u0627\u062a\u0643',
        primaryButton: '\u0627\u062a\u0635\u0644 \u0628\u0646\u0627',
        secondaryButton: '\u0627\u0639\u0631\u0641 \u0627\u0644\u0645\u0632\u064a\u062f'
      }
    },
    termsPage: {
      hero: {
        badge: '\u0627\u062a\u0641\u0627\u0642\u064a\u0629 \u0642\u0627\u0646\u0648\u0646\u064a\u0629',
        titlePrimary: '\u0634\u0631\u0648\u0637',
        titleHighlight: '\u0627\u0644\u062e\u062f\u0645\u0629',
        description: '\u064a\u0631\u062c\u0649 \u0642\u0631\u0627\u0621\u0629 \u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637 \u0628\u0639\u0646\u0627\u064a\u0629 \u0642\u0628\u0644 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u062e\u062f\u0645\u0627\u062a\u0646\u0627. \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0643 {brand} \u0641\u0625\u0646\u0643 \u062a\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u0627\u0644\u0627\u0644\u062a\u0632\u0627\u0645 \u0628\u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637.',
        lastUpdated: '\u0622\u062e\u0631 \u062a\u062d\u062f\u064a\u062b: 18 \u064a\u0648\u0646\u064a\u0648 2026'
      },
      introduction: {
        title: '\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0634\u0631\u0648\u0637',
        paragraphs: [
          '\u062a\u062d\u0643\u0645 \u0634\u0631\u0648\u0637 \u0627\u0644\u062e\u062f\u0645\u0629 \u0647\u0630\u0647 \u0648\u0635\u0648\u0644\u0643 \u0625\u0644\u0649 \u0645\u0648\u0642\u0639 {brand} \u0648\u0645\u0646\u062a\u062c\u0627\u062a\u0647 \u0648\u062e\u062f\u0645\u0627\u062a\u0647 \u0648\u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0643 \u0644\u0647\u0627.',
          '\u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0643 \u062e\u062f\u0645\u0627\u062a\u0646\u0627 \u0641\u0625\u0646\u0643 \u062a\u0642\u0631 \u0628\u0623\u0646\u0643 \u0642\u0631\u0623\u062a \u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637 \u0648\u0641\u0647\u0645\u062a\u0647\u0627 \u0648\u0648\u0627\u0641\u0642\u062a \u0639\u0644\u0649 \u0627\u0644\u0627\u0644\u062a\u0632\u0627\u0645 \u0628\u0647\u0627 \u0648\u0628\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629.',
          '\u0645\u0647\u0645: \u062a\u062a\u0636\u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u062d\u0648\u0644 \u062d\u0642\u0648\u0642\u0643 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0648\u0627\u0644\u062a\u0632\u0627\u0645\u0627\u062a\u0643 \u0628\u0645\u0627 \u0641\u064a \u0630\u0644\u0643 \u0627\u0644\u0642\u064a\u0648\u062f \u0648\u0627\u0644\u0627\u0633\u062a\u062b\u0646\u0627\u0621\u0627\u062a.'
        ]
      },
      sections: [
        {
          key: 'accountTerms',
          title: '\u0634\u0631\u0648\u0637 \u0627\u0644\u062d\u0633\u0627\u0628',
          items: [
            '\u064a\u062c\u0628 \u0623\u0646 \u062a\u0643\u0648\u0646 \u0628\u0639\u0645\u0631 18 \u0639\u0627\u0645\u0627\u064b \u0623\u0648 \u0623\u0643\u062b\u0631 \u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u062e\u062f\u0645\u0627\u062a\u0646\u0627',
            '\u0623\u0646\u062a \u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062d\u0641\u0627\u0638 \u0639\u0644\u0649 \u0623\u0645\u0627\u0646 \u062d\u0633\u0627\u0628\u0643',
            '\u062d\u0633\u0627\u0628 \u0648\u0627\u062d\u062f \u0644\u0643\u0644 \u0645\u0633\u062a\u062e\u062f\u0645\u061b \u0627\u0644\u062d\u0633\u0627\u0628\u0627\u062a \u0627\u0644\u0645\u062a\u0639\u062f\u062f\u0629 \u0645\u0645\u0646\u0648\u0639\u0629',
            '\u064a\u062c\u0628 \u062a\u0642\u062f\u064a\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u062f\u0642\u064a\u0642\u0629 \u0648\u0635\u062d\u064a\u062d\u0629 \u0639\u0646\u062f \u0627\u0644\u062a\u0633\u062c\u064a\u0644',
            '\u064a\u064f\u062d\u0638\u0631 \u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u062d\u0633\u0627\u0628 \u0623\u0648 \u0628\u064a\u0639\u0647',
            '\u0646\u062d\u062a\u0641\u0638 \u0628\u0627\u0644\u062d\u0642 \u0641\u064a \u0625\u0646\u0647\u0627\u0621 \u0627\u0644\u062d\u0633\u0627\u0628\u0627\u062a \u0627\u0644\u0645\u062e\u0627\u0644\u0641\u0629'
          ]
        },
        {
          key: 'paymentBilling',
          title: '\u0627\u0644\u062f\u0641\u0639 \u0648\u0627\u0644\u0641\u0648\u062a\u0631\u0629',
          items: [
            '\u062c\u0645\u064a\u0639 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0628\u0627\u0644\u062f\u0648\u0644\u0627\u0631 \u0627\u0644\u0623\u0645\u0631\u064a\u0643\u064a \u0645\u0627 \u0644\u0645 \u064a\u0630\u0643\u0631 \u062e\u0644\u0627\u0641 \u0630\u0644\u0643',
            '\u064a\u062c\u0628 \u0633\u062f\u0627\u062f \u062b\u0645\u0646 \u0627\u0644\u0645\u0646\u062a\u062c \u0643\u0627\u0645\u0644\u0627\u064b \u0642\u0628\u0644 \u0627\u0644\u062a\u0633\u0644\u064a\u0645',
            '\u0646\u0642\u0628\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0634\u0641\u0631\u0629 \u0648\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
            '\u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0628\u064a\u0639\u0627\u062a \u0646\u0647\u0627\u0626\u064a\u0629\u061b \u0644\u0627 \u064a\u0648\u062c\u062f \u0627\u0633\u062a\u0631\u062f\u0627\u062f \u0628\u0639\u062f \u0627\u0644\u0648\u0635\u0648\u0644',
            '\u0623\u0646\u062a \u062a\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u062f\u0641\u0639 \u0627\u0644\u0636\u0631\u0627\u0626\u0628 \u0627\u0644\u0645\u0637\u0628\u0642\u0629',
            '\u0642\u062f \u062a\u062a\u063a\u064a\u0631 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u062f\u0648\u0646 \u0625\u0634\u0639\u0627\u0631'
          ]
        },
        {
          key: 'intellectualProperty',
          title: '\u0627\u0644\u0645\u0644\u0643\u064a\u0629 \u0627\u0644\u0641\u0643\u0631\u064a\u0629',
          items: [
            '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u062a\u064f\u0645\u0646\u062d \u0628\u062a\u0631\u062e\u064a\u0635 \u0648\u0644\u064a\u0633\u062a \u0644\u0644\u0628\u064a\u0639 \u0627\u0644\u0645\u0637\u0644\u0642',
            '\u062a\u062d\u0635\u0644 \u0639\u0644\u0649 \u062a\u0631\u062e\u064a\u0635 \u063a\u064a\u0631 \u062d\u0635\u0631\u064a \u0648\u063a\u064a\u0631 \u0642\u0627\u0628\u0644 \u0644\u0644\u062a\u062d\u0648\u064a\u0644',
            '\u064a\u064f\u062d\u0638\u0631 \u0625\u0639\u0627\u062f\u0629 \u062a\u0648\u0632\u064a\u0639 \u0627\u0644\u0645\u0646\u062a\u062c \u0623\u0648 \u0625\u0639\u0627\u062f\u0629 \u0628\u064a\u0639\u0647',
            '\u064a\u064f\u0645\u0646\u0639 \u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0627\u0644\u0639\u0643\u0633\u064a\u0629',
            '\u0646\u062d\u062a\u0641\u0638 \u0628\u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0641\u064a \u0645\u0646\u062a\u062c\u0627\u062a\u0646\u0627 \u0648\u0645\u062d\u062a\u0648\u0627\u0646\u0627',
            '\u0642\u062f \u064a\u062a\u0631\u062a\u0628 \u0639\u0644\u0649 \u0627\u0644\u0627\u0646\u062a\u0647\u0627\u0643 \u0627\u062a\u062e\u0627\u0630 \u0625\u062c\u0631\u0627\u0621\u0627\u062a \u0642\u0627\u0646\u0648\u0646\u064a\u0629'
          ]
        },
        {
          key: 'acceptableUse',
          title: '\u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0645\u0642\u0628\u0648\u0644',
          items: [
            '\u0627\u0633\u062a\u062e\u062f\u0645 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0644\u0623\u063a\u0631\u0627\u0636 \u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0641\u0642\u0637',
            '\u0644\u0627 \u062a\u0633\u062a\u062e\u062f\u0645 \u062e\u062f\u0645\u0627\u062a\u0646\u0627 \u0641\u064a \u0623\u0646\u0634\u0637\u0629 \u063a\u064a\u0631 \u0642\u0627\u0646\u0648\u0646\u064a\u0629',
            '\u064a\u064f\u0645\u0646\u0639 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0636\u0627\u0631 \u0623\u0648 \u0627\u0644\u062e\u0628\u064a\u062b \u0644\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
            '\u0627\u0644\u0627\u0644\u062a\u0632\u0627\u0645 \u0628\u062c\u0645\u064a\u0639 \u0627\u0644\u0642\u0648\u0627\u0646\u064a\u0646 \u0648\u0627\u0644\u0644\u0648\u0627\u0626\u062d \u0627\u0644\u0645\u0639\u0645\u0648\u0644 \u0628\u0647\u0627',
            '\u0627\u062d\u062a\u0631\u0627\u0645 \u062d\u0642\u0648\u0642 \u0627\u0644\u0645\u0644\u0643\u064a\u0629 \u0627\u0644\u0641\u0643\u0631\u064a\u0629',
            '\u0639\u062f\u0645 \u0645\u0636\u0627\u064a\u0642\u0629 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646 \u0627\u0644\u0622\u062e\u0631\u064a\u0646 \u0623\u0648 \u0641\u0631\u064a\u0642 \u0627\u0644\u0639\u0645\u0644'
          ]
        },
        {
          key: 'prohibitedActivities',
          title: '\u0623\u0646\u0634\u0637\u0629 \u0645\u062d\u0638\u0648\u0631\u0629',
          items: [
            '\u0645\u062d\u0627\u0648\u0644\u0629 \u0627\u062e\u062a\u0631\u0627\u0642 \u0623\u0646\u0638\u0645\u062a\u0646\u0627 \u0623\u0648 \u062a\u0639\u0637\u064a\u0644\u0647\u0627',
            '\u0646\u0634\u0631 \u0627\u0644\u0628\u0631\u0645\u062c\u064a\u0627\u062a \u0627\u0644\u062e\u0628\u064a\u062b\u0629 \u0623\u0648 \u0627\u0644\u0641\u064a\u0631\u0648\u0633\u0627\u062a',
            '\u0625\u0646\u0634\u0627\u0621 \u0648\u0635\u0648\u0644 \u0623\u0648 \u062d\u0633\u0627\u0628\u0627\u062a \u063a\u064a\u0631 \u0645\u0635\u0631\u062d \u0628\u0647\u0627',
            '\u062c\u0645\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0622\u0644\u064a\u0627\u064b \u0623\u0648 \u0643\u0634\u0637\u0647\u0627',
            '\u0627\u0644\u062a\u062f\u062e\u0644 \u0641\u064a \u0639\u0645\u0644\u064a\u0627\u062a \u0627\u0644\u062e\u062f\u0645\u0629',
            '\u0627\u0646\u062a\u062d\u0627\u0644 \u0634\u062e\u0635\u064a\u0629 {brand} \u0623\u0648 \u0645\u0645\u062b\u0644\u064a\u0647\u0627'
          ]
        },
        {
          key: 'disclaimers',
          title: '\u0625\u062e\u0644\u0627\u0621 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064a\u0629 \u0648\u0627\u0644\u0642\u064a\u0648\u062f',
          items: [
            '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0645\u0642\u062f\u0645\u0629 "\u0643\u0645\u0627 \u0647\u064a" \u062f\u0648\u0646 \u0636\u0645\u0627\u0646\u0627\u062a',
            '\u0644\u0627 \u0646\u0636\u0645\u0646 \u0646\u062a\u0627\u0626\u062c \u0623\u0648 \u0645\u062e\u0631\u062c\u0627\u062a \u0645\u062d\u062f\u062f\u0629',
            '\u0644\u0633\u0646\u0627 \u0645\u0633\u0624\u0648\u0644\u064a\u0646 \u0639\u0646 \u0627\u0644\u0623\u0636\u0631\u0627\u0631 \u063a\u064a\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0629 \u0623\u0648 \u0627\u0644\u062a\u0628\u0639\u064a\u0629',
            '\u062a\u0646\u062d\u0635\u0631 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064a\u0629 \u0641\u064a \u0633\u0639\u0631 \u0627\u0644\u0634\u0631\u0627\u0621',
            '\u0623\u0646\u062a \u062a\u062a\u062d\u0645\u0644 \u0643\u0627\u0645\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0645\u0646\u062a\u062c',
            '\u0644\u0627 \u0646\u0636\u0645\u0646 \u062e\u0644\u0648 \u0627\u0644\u062e\u062f\u0645\u0629 \u0645\u0646 \u0627\u0644\u0623\u062e\u0637\u0627\u0621'
          ]
        }
      ],
      additionalSections: [
        {
          key: 'productLicenses',
          title: '\u062a\u0631\u0627\u062e\u064a\u0635 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
          body: '\u0639\u0646\u062f \u0634\u0631\u0627\u0626\u0643 \u0645\u0646\u062a\u062c\u0627\u064b \u0645\u0646 {brand} \u062a\u062d\u0635\u0644 \u0639\u0644\u0649 \u062a\u0631\u062e\u064a\u0635 \u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0647 \u0648\u0641\u0642 \u0634\u0631\u0648\u0637 \u0645\u062d\u062f\u062f\u0629. \u064a\u062a\u0636\u0645\u0646 \u0643\u0644 \u0645\u0646\u062a\u062c \u0627\u062a\u0641\u0627\u0642\u064a\u0629 \u062a\u0631\u062e\u064a\u0635 \u064a\u062c\u0628 \u0642\u0631\u0627\u0621\u062a\u0647\u0627 \u0648\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u064a\u0647\u0627 \u0642\u0628\u0644 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645.',
          youMayLabel: '\u0645\u0633\u0645\u0648\u062d \u0644\u0643',
          youMay: ['\u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0644\u0644\u0645\u0634\u0627\u0631\u064a\u0639 \u0627\u0644\u0634\u062e\u0635\u064a\u0629 \u0623\u0648 \u0627\u0644\u062a\u062c\u0627\u0631\u064a\u0629', '\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0643\u0648\u062f \u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0643 \u0627\u0644\u062e\u0627\u0635', '\u0625\u0646\u0634\u0627\u0621 \u0645\u0646\u062a\u062c\u0627\u062a \u0646\u0647\u0627\u0626\u064a\u0629 \u0644\u0644\u0639\u0645\u0644\u0627\u0621'],
          youMayNotLabel: '\u063a\u064a\u0631 \u0645\u0633\u0645\u0648\u062d \u0644\u0643',
          youMayNot: ['\u0625\u0639\u0627\u062f\u0629 \u062a\u0648\u0632\u064a\u0639 \u0623\u0648 \u0625\u0639\u0627\u062f\u0629 \u0628\u064a\u0639 \u0627\u0644\u0645\u0646\u062a\u062c', '\u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u062a\u0631\u062e\u064a\u0635 \u0645\u0639 \u0627\u0644\u0622\u062e\u0631\u064a\u0646', '\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0645\u0646\u062a\u062c \u0644\u0623\u063a\u0631\u0627\u0636 \u063a\u064a\u0631 \u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0623\u0648 \u0636\u0627\u0631\u0629']
        },
        {
          key: 'supportUpdates',
          title: '\u0627\u0644\u062f\u0639\u0645 \u0648\u0627\u0644\u062a\u062d\u062f\u064a\u062b\u0627\u062a',
          body: '\u0646\u0642\u062f\u0645 \u062f\u0639\u0645\u0627\u064b \u0641\u0646\u064a\u0627\u064b \u0644\u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0645\u0634\u062a\u0631\u0627\u0629 \u064a\u0634\u0645\u0644 \u0625\u0635\u0644\u0627\u062d \u0627\u0644\u0623\u062e\u0637\u0627\u0621 \u0648\u062a\u0648\u0627\u0641\u0642 \u0627\u0644\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0648\u0645\u0633\u0627\u0639\u062f\u0629 \u0627\u0644\u0648\u0638\u0627\u0626\u0641. \u0627\u0644\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0645\u062c\u0627\u0646\u064a\u0629 \u0637\u0648\u0627\u0644 \u0639\u0645\u0631 \u0627\u0644\u0645\u0646\u062a\u062c.'
        },
        {
          key: 'termination',
          title: '\u0625\u0646\u0647\u0627\u0621 \u0627\u0644\u062e\u062f\u0645\u0629',
          body: '\u064a\u062c\u0648\u0632 \u0644\u0646\u0627 \u0625\u0646\u0647\u0627\u0621 \u0623\u0648 \u062a\u0639\u0644\u064a\u0642 \u0648\u0635\u0648\u0644\u0643 \u0641\u0648\u0631\u0627\u064b \u0639\u0646\u062f \u062e\u0631\u0642 \u0627\u0644\u0634\u0631\u0648\u0637. \u0639\u0646\u062f \u0627\u0644\u0625\u0646\u0647\u0627\u0621 \u064a\u062a\u0648\u0642\u0641 \u062d\u0642\u0643 \u0641\u064a \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0644\u0643\u0646 \u062a\u0628\u0642\u0649 \u0628\u0639\u0636 \u0627\u0644\u0628\u0646\u0648\u062f \u0633\u0627\u0631\u064a\u0629.'
        },
        {
          key: 'governingLaw',
          title: '\u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u062d\u0627\u0643\u0645 \u0648\u0627\u0644\u0646\u0632\u0627\u0639\u0627\u062a',
          body: '\u062a\u062e\u0636\u0639 \u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637 \u0644\u0645\u0628\u0627\u062f\u0626 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u062a\u062c\u0627\u0631\u064a \u0627\u0644\u062f\u0648\u0644\u064a. \u064a\u062a\u0645 \u062d\u0644 \u0627\u0644\u0646\u0632\u0627\u0639\u0627\u062a \u0639\u0628\u0631 \u062a\u062d\u0643\u064a\u0645 \u0645\u0644\u0632\u0645 \u0628\u0639\u062f \u0645\u062d\u0627\u0648\u0644\u0629 \u0627\u0644\u062a\u0633\u0648\u064a\u0629 \u0627\u0644\u0648\u062f\u064a\u0629.'
        },
        {
          key: 'changes',
          title: '\u062a\u063a\u064a\u064a\u0631\u0627\u062a \u0627\u0644\u0634\u0631\u0648\u0637',
          body: '\u064a\u062c\u0648\u0632 \u0644\u0646\u0627 \u062a\u0639\u062f\u064a\u0644 \u0647\u0630\u0647 \u0627\u0644\u0634\u0631\u0648\u0637 \u0641\u064a \u0623\u064a \u0648\u0642\u062a. \u0627\u0633\u062a\u0645\u0631\u0627\u0631\u0643 \u0641\u064a \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0628\u0639\u062f \u0633\u0631\u064a\u0627\u0646 \u0627\u0644\u062a\u0639\u062f\u064a\u0644\u0627\u062a \u064a\u0639\u062f \u0642\u0628\u0648\u0644\u0627\u064b \u0644\u0644\u0634\u0631\u0648\u0637 \u0627\u0644\u0645\u062d\u062f\u062b\u0629.'
        },
        {
          key: 'contact',
          title: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0648\u0627\u0635\u0644',
          body: '\u0644\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0639\u0646 \u0634\u0631\u0648\u0637 \u0627\u0644\u062e\u062f\u0645\u0629 \u064a\u0631\u062c\u0649 \u0645\u0631\u0627\u0633\u0644\u062a\u0646\u0627 \u0639\u0628\u0631 \u0627\u0644\u0642\u0646\u0648\u0627\u062a \u0627\u0644\u062a\u0627\u0644\u064a\u0629:',
          contactDetails: {
            emailLabel: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
            emailValue: 'legal@store.com',
            linkLabel: '\u0627\u0644\u0645\u0648\u0642\u0639',
            linkText: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062f\u0639\u0645',
            linkHref: '/contact'
          }
        }
      ],
      cta: {
        title: '\u0644\u062f\u064a\u0643 \u0623\u0633\u0626\u0644\u0629 \u062d\u0648\u0644 \u0627\u0644\u0634\u0631\u0648\u0637\u061f',
        description: '\u0641\u0631\u064a\u0642\u0646\u0627 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a \u062c\u0627\u0647\u0632 \u0644\u062a\u0648\u0636\u064a\u062d \u0623\u064a \u0627\u0633\u062a\u0641\u0633\u0627\u0631\u0627\u062a \u0644\u062f\u064a\u0643',
        primaryButton: '\u0627\u062a\u0635\u0644 \u0628\u0646\u0627',
        secondaryButton: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629'
      }
    },
    helpPage: {
      heroTitle: '\u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629',
      heroDescription: '\u0627\u0639\u062b\u0631 \u0639\u0644\u0649 \u0625\u062c\u0627\u0628\u0627\u062a \u0644\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0648\u0627\u062d\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u062f\u0639\u0645 \u0627\u0644\u0630\u064a \u062a\u062d\u062a\u0627\u062c\u0647',
      searchPlaceholder: '\u0627\u0628\u062d\u062b \u0639\u0646 \u0645\u0633\u0627\u0639\u062f\u0629...',
      quickLinks: {
        accountSetup: '\u0625\u0639\u062f\u0627\u062f \u0627\u0644\u062d\u0633\u0627\u0628',
        paymentGuide: '\u062f\u0644\u064a\u0644 \u0627\u0644\u062f\u0641\u0639',
        productInstallation: '\u062a\u062b\u0628\u064a\u062a \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
        troubleshooting: '\u0627\u0633\u062a\u0643\u0634\u0627\u0641 \u0627\u0644\u0623\u062e\u0637\u0627\u0621'
      },
      faqTitle: '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629',
      categories: {
        gettingStarted: {
          title: '\u0627\u0644\u0628\u062f\u0621 \u0627\u0644\u0633\u0631\u064a\u0639',
          faqs: [
            {
              question: '\u0643\u064a\u0641 \u0623\u0646\u0634\u0626 \u062d\u0633\u0627\u0628\u0627\u064b\u061f',
              answer: '\u0627\u0636\u063a\u0637 \u0639\u0644\u0649 "\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628" \u0648\u0627\u0645\u0644\u0623 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u062b\u0645 \u0641\u0639\u0651\u0644 \u0627\u0644\u062d\u0633\u0627\u0628 \u0639\u0628\u0631 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a.'
            },
            {
              question: '\u0645\u0627 \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0645\u062a\u0627\u062d\u0629\u061f',
              answer: '\u0646\u0642\u0628\u0644 \u0637\u0631\u0642 \u062f\u0641\u0639 \u0645\u062a\u0646\u0648\u0639\u0629 \u0628\u0645\u0627 \u0641\u064a \u0630\u0644\u0643 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0627\u0644\u0627\u0626\u062a\u0645\u0627\u0646\u064a\u0629 \u0648\u0627\u0644\u0645\u062d\u0627\u0641\u0638 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629 \u0648\u0627\u0644\u062a\u062d\u0648\u064a\u0644\u0627\u062a \u0627\u0644\u0628\u0646\u0643\u064a\u0629. \u0648\u062a\u0638\u0647\u0631 \u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a \u0627\u0644\u0645\u062a\u0627\u062d\u0629 \u0641\u064a \u0635\u0641\u062d\u0629 \u0643\u0644 \u0645\u0646\u062a\u062c.'
            },
            {
              question: '\u0645\u062a\u0649 \u0623\u0633\u062a\u0644\u0645 \u0627\u0644\u0645\u0646\u062a\u062c\u061f',
              answer: '\u062a\u062a\u0648\u0641\u0631 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0641\u0648\u0631 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062f\u0641\u0639\u060c \u0623\u0645\u0627 \u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u062e\u0635\u0635\u0629 \u0641\u062a\u0633\u062a\u063a\u0631\u0642 24-48 \u0633\u0627\u0639\u0629.'
            }
          ]
        },
        ordersPayments: {
          title: '\u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0648\u0627\u0644\u0645\u062f\u0641\u0648\u0639\u0627\u062a',
          faqs: [
            {
              question: '\u0643\u064a\u0641 \u0623\u062a\u062a\u0628\u0639 \u0637\u0644\u0628\u064a\u061f',
              answer: '\u0627\u0633\u062a\u062e\u062f\u0645 \u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628 \u0641\u064a \u0635\u0641\u062d\u0629 \u062a\u062a\u0628\u0639 \u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0623\u0648 \u0645\u0646 \u0642\u0633\u0645 "\u0637\u0644\u0628\u0627\u062a\u064a" \u062f\u0627\u062e\u0644 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a.'
            },
            {
              question: '\u0647\u0644 \u064a\u0645\u0643\u0646\u0646\u064a \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0637\u0644\u0628\u061f',
              answer: '\u064a\u0645\u0643\u0646 \u0627\u0644\u0625\u0644\u063a\u0627\u0621 \u062e\u0644\u0627\u0644 \u0633\u0627\u0639\u0629 \u0625\u0630\u0627 \u0644\u0645 \u064a\u062a\u0645 \u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u0645\u0646\u062a\u062c \u0628\u0639\u062f. \u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062f\u0639\u0645 \u0641\u0648\u0631\u0627\u064b.'
            },
            {
              question: '\u0645\u0627\u0630\u0627 \u0623\u0641\u0639\u0644 \u0639\u0646\u062f \u0641\u0634\u0644 \u0627\u0644\u062f\u0641\u0639\u061f',
              answer: '\u062a\u062d\u0642\u0642 \u0645\u0646 \u0631\u0635\u064a\u062f \u0627\u0644\u0645\u062d\u0641\u0638\u0629 \u0648\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0634\u0628\u0643\u064a\u0629\u060c \u0648\u0625\u0646 \u0627\u0633\u062a\u0645\u0631 \u0627\u0644\u062e\u0644\u0644 \u0641\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062f\u0639\u0645 \u0645\u0632\u0648\u062f\u0627\u064b \u0628\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0639\u0645\u0644\u064a\u0629.'
            }
          ]
        },
        productsAccess: {
          title: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0648\u0627\u0644\u0648\u0635\u0648\u0644',
          faqs: [
            {
              question: '\u0643\u064a\u0641 \u0623\u0635\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u062a\u064a \u0627\u0634\u062a\u0631\u064a\u062a\u0647\u0627\u061f',
              answer: '\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 "\u0637\u0644\u0628\u0627\u062a\u064a" \u062f\u0627\u062e\u0644 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a\u060c \u0648\u0627\u062e\u062a\u0631 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0643\u062a\u0645\u0644\u060c \u062b\u0645 \u0627\u0641\u062a\u062d \u0631\u0648\u0627\u0628\u0637 / \u0623\u0643\u0648\u0627\u062f \u0627\u0644\u0637\u0644\u0628.'
            },
            {
              question: '\u0647\u0644 \u064a\u0645\u0643\u0646\u0646\u064a \u0627\u0633\u062a\u0631\u062f\u0627\u062f \u0627\u0644\u0645\u0628\u0644\u063a\u061f',
              answer: '\u0646\u0642\u0628\u0644 \u0627\u0644\u0627\u0633\u062a\u0631\u062f\u0627\u062f \u0641\u0642\u0637 \u0639\u0646\u062f \u0648\u062c\u0648\u062f \u0645\u0634\u0627\u0643\u0644 \u062a\u0642\u0646\u064a\u0629 \u0644\u0627 \u064a\u0645\u0643\u0646 \u062d\u0644\u0647\u0627. \u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062f\u0639\u0645 \u062e\u0644\u0627\u0644 48 \u0633\u0627\u0639\u0629.'
            },
            {
              question: '\u0647\u0644 \u062a\u0648\u0641\u0631\u0648\u0646 \u062a\u062d\u062f\u064a\u062b\u0627\u062a\u061f',
              answer: '\u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u062a\u0634\u0645\u0644 \u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0645\u062c\u0627\u0646\u064a\u0629 \u0644\u0645\u062f\u0629 12 \u0634\u0647\u0631\u0627\u064b \u0645\u0639 \u0625\u0634\u0639\u0627\u0631 \u0628\u0631\u064a\u062f\u064a \u0639\u0646\u062f \u062a\u0648\u0641\u0631 \u0627\u0644\u062a\u062d\u062f\u064a\u062b.'
            }
          ]
        }
      },
      supportSection: {
        title: '\u0645\u0627 \u0632\u0644\u062a \u062a\u062d\u062a\u0627\u062c \u0645\u0633\u0627\u0639\u062f\u0629\u061f',
        description: '\u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645 \u0645\u062a\u0648\u0641\u0631 24/7 \u0644\u0645\u0633\u0627\u0639\u062f\u062a\u0643 \u0641\u064a \u0623\u064a \u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0623\u0648 \u0645\u0634\u0643\u0644\u0629',
        liveChat: {
          title: '\u062f\u0639\u0645 \u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0629',
          description: '\u062a\u062d\u062f\u062b \u0645\u0639 \u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645 \u0628\u0634\u0643\u0644 \u0641\u0648\u0631\u064a',
          availability: '\u0645\u062a\u0648\u0641\u0631 \u0637\u0648\u0627\u0644 \u0627\u0644\u064a\u0648\u0645'
        },
        emailSupport: {
          title: '\u062f\u0639\u0645 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
          description: '\u0623\u0631\u0633\u0644 \u0644\u0646\u0627 \u0631\u0633\u0627\u0644\u0629 \u0648\u0633\u0646\u0631\u062f \u062e\u0644\u0627\u0644 24 \u0633\u0627\u0639\u0629',
          address: 'support@store.com'
        }
      },
      categoriesLabel: '\u0623\u0642\u0633\u0627\u0645',
      questionsLabel: '\u0633\u0624\u0627\u0644',
      clickToSeeAnswer: '\u0627\u0636\u063a\u0637 \u0639\u0644\u0649 \u0623\u064a \u0633\u0624\u0627\u0644 \u0644\u0644\u0627\u0637\u0644\u0627\u0639 \u0639\u0644\u0649 \u0627\u0644\u0625\u062c\u0627\u0628\u0629',
      noResultsFor: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c \u0644\u0640'
    },
    categoriesPage: {
      heroTitlePrimary: '\u0641\u0626\u0627\u062a',
      heroTitleHighlight: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      heroDescription: '\u0627\u0633\u062a\u0643\u0634\u0641 \u0645\u062c\u0645\u0648\u0639\u062a\u0646\u0627 \u0627\u0644\u0634\u0627\u0645\u0644\u0629 \u0645\u0646 \u0627\u0644\u062d\u0644\u0648\u0644 \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0627\u0644\u0645\u0635\u0646\u0641\u0629 \u062d\u0633\u0628 \u0627\u0644\u0641\u0626\u0629 \u0648\u0627\u0628\u062d\u062b \u0639\u0646 \u0645\u0627 \u064a\u0646\u0627\u0633\u0628 \u0645\u0634\u0627\u0631\u064a\u0639 Web3\u200e \u0648\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629.',
      loading: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0641\u0626\u0627\u062a...',
      explorePrefix: '\u0627\u0633\u062a\u0643\u0634\u0641',
      ctaTitle: '\u0644\u0645 \u062a\u062c\u062f \u0645\u0627 \u062a\u0628\u062d\u062b \u0639\u0646\u0647\u061f',
      ctaDescription: '\u0646\u0642\u062f\u0645 \u062e\u062f\u0645\u0627\u062a \u062a\u0637\u0648\u064a\u0631 \u0645\u062e\u0635\u0635\u0629 \u0644\u062a\u062d\u0648\u064a\u0644 \u0623\u0641\u0643\u0627\u0631\u0643 \u0625\u0644\u0649 \u0648\u0627\u0642\u0639. \u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064a\u0642\u0646\u0627 \u0627\u0644\u062e\u0628\u064a\u0631.',
      primaryCta: '\u0627\u0637\u0644\u0628 \u062d\u0644\u0627\u064b \u0645\u062e\u0635\u0635\u0627\u064b',
      secondaryCta: '\u062a\u0635\u0641\u062d \u0643\u0644 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a'
    },
    statusPage: {
      heroTitle: '\u062d\u0627\u0644\u0629 \u0627\u0644\u0646\u0638\u0627\u0645',
      heroDescription: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0641\u0648\u0631\u064a\u0629 \u0639\u0646 \u062d\u0627\u0644\u0629 \u0627\u0644\u062a\u0648\u0641\u0631 \u0648\u0632\u0645\u0646 \u0627\u0644\u062a\u0634\u063a\u064a\u0644 \u0644\u0643\u0644 \u062e\u062f\u0645\u0627\u062a\u0646\u0627',
      overallStatus: '\u0643\u0644 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u062a\u0639\u0645\u0644',
      serviceStatusTitle: '\u062d\u0627\u0644\u0629 \u0627\u0644\u062e\u062f\u0645\u0627\u062a',
      incidentsTitle: '\u0627\u0644\u062d\u0648\u0627\u062f\u062b \u0627\u0644\u0623\u062e\u064a\u0631\u0629',
      maintenanceTitle: '\u0627\u0644\u0635\u064a\u0627\u0646\u0629 \u0627\u0644\u0645\u062c\u062f\u0648\u0644\u0629',
      uptimeHistoryTitle: '\u0633\u062c\u0644 \u0627\u0644\u062a\u0648\u0641\u0631 \u0644\u0622\u062e\u0631 30 \u064a\u0648\u0645\u0627\u064b',
      uptimeHistoryStart: '\u0642\u0628\u0644 30 \u064a\u0648\u0645\u0627\u064b',
      uptimeHistoryEnd: '\u0627\u0644\u064a\u0648\u0645',
      subscribeTitle: '\u0627\u062d\u0635\u0644 \u0639\u0644\u0649 \u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0627\u0644\u062d\u0627\u0644\u0629',
      subscribeDescription: '\u0627\u0634\u062a\u0631\u0643 \u0644\u062a\u062a\u0644\u0642\u0649 \u062a\u0646\u0628\u064a\u0647\u0627\u062a \u062d\u0648\u0644 \u062d\u0627\u0644\u0629 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0648\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0635\u064a\u0627\u0646\u0629 \u0627\u0644\u0645\u062e\u0637\u0637 \u0644\u0647\u0627',
      subscribePlaceholder: '\u0623\u062f\u062e\u0644 \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
      subscribeButton: '\u0627\u0634\u062a\u0631\u0643',
      impactLabel: '\u0627\u0644\u062a\u0623\u062b\u064a\u0631 \u0627\u0644\u0645\u062a\u0648\u0642\u0639',
      statusLabels: {
        operational: '\u064a\u0639\u0645\u0644',
        degraded: '\u0645\u062a\u0628\u0627\u0637\u0626',
        outage: '\u062a\u0648\u0642\u0641',
        resolved: '\u062a\u0645 \u0627\u0644\u062d\u0644'
      },
      services: [
        { key: 'website', name: '\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a', status: 'operational', uptime: '99.99%', responseTime: '45ms' },
        { key: 'api', name: '\u062e\u0627\u062f\u0645 API', status: 'operational', uptime: '99.98%', responseTime: '120ms' },
        { key: 'database', name: '\u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a', status: 'operational', uptime: '99.99%', responseTime: '15ms' },
        { key: 'payments', name: '\u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u0645\u062f\u0641\u0648\u0639\u0627\u062a', status: 'operational', uptime: '99.95%', responseTime: '230ms' },
        { key: 'contentAccess', name: '\u062e\u062f\u0645\u0629 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0645\u062d\u062a\u0648\u0649', status: 'operational', uptime: '99.97%', responseTime: '89ms' }
      ],
      incidents: [
        {
          date: '25 \u0646\u0648\u0641\u0645\u0628\u0631 2025',
          time: '14:30 \u0628\u0627\u0644\u062a\u0648\u0642\u064a\u062a \u0627\u0644\u0639\u0627\u0644\u0645\u064a',
          title: '\u0627\u0646\u062a\u0647\u0627\u0621 \u0635\u064a\u0627\u0646\u0629 \u0645\u062c\u062f\u0648\u0644\u0629',
          status: 'resolved',
          description: '\u062a\u0645 \u0625\u0646\u062c\u0627\u0632 \u062a\u062d\u0633\u064a\u0646\u0627\u062a \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0627\u0644\u0623\u0645\u0627\u0646 \u0628\u0646\u062c\u0627\u062d \u0648\u0639\u0627\u062f\u062a \u062c\u0645\u064a\u0639 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0644\u0644\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0637\u0628\u064a\u0639\u064a.',
          updates: [
            { time: '16:00 \u0628\u0627\u0644\u062a\u0648\u0642\u064a\u062a \u0627\u0644\u0639\u0627\u0644\u0645\u064a', message: '\u062a\u0645\u062a \u0627\u0633\u062a\u0639\u0627\u062f\u0629 \u062c\u0645\u064a\u0639 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0648\u062a\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0637\u0628\u064a\u0639\u064a' },
            { time: '15:30 \u0628\u0627\u0644\u062a\u0648\u0642\u064a\u062a \u0627\u0644\u0639\u0627\u0644\u0645\u064a', message: '\u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631\u0627\u062a \u0627\u0644\u0646\u0647\u0627\u0626\u064a\u0629 \u062c\u0627\u0631\u064a\u0629' },
            { time: '14:30 \u0628\u0627\u0644\u062a\u0648\u0642\u064a\u062a \u0627\u0644\u0639\u0627\u0644\u0645\u064a', message: '\u0628\u062f\u0621 \u0627\u0644\u0635\u064a\u0627\u0646\u0629 \u0643\u0645\u0627 \u0647\u0648 \u0645\u062c\u062f\u0648\u0644' }
          ]
        },
        {
          date: '20 \u0646\u0648\u0641\u0645\u0628\u0631 2025',
          time: '09:15 \u0628\u0627\u0644\u062a\u0648\u0642\u064a\u062a \u0627\u0644\u0639\u0627\u0644\u0645\u064a',
          title: '\u062a\u0628\u0627\u0637\u0624 \u0641\u064a \u0623\u062f\u0627\u0621 API\u200e',
          status: 'resolved',
          description: '\u062a\u0645 \u0631\u0635\u062f \u0628\u0637\u0621 \u0645\u0624\u0642\u062a \u0641\u064a \u0648\u0627\u062c\u0647\u0629 API\u200e \u0648\u062a\u0645\u062a \u0645\u0639\u0627\u0644\u062c\u062a\u0647\u060c \u0648\u0639\u0627\u062f \u0632\u0645\u0646 \u0627\u0644\u0627\u0633\u062a\u062c\u0627\u0628\u0629 \u0644\u0644\u0648\u0636\u0639 \u0627\u0644\u0637\u0628\u064a\u0639\u064a \u062e\u0644\u0627\u0644 20 \u062f\u0642\u064a\u0642\u0629.',
          updates: [
            { time: '09:35 \u0628\u0627\u0644\u062a\u0648\u0642\u064a\u062a \u0627\u0644\u0639\u0627\u0644\u0645\u064a', message: '\u062a\u0645 \u062d\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0648\u064a\u0633\u062a\u0645\u0631 \u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629' },
            { time: '09:20 \u0628\u0627\u0644\u062a\u0648\u0642\u064a\u062a \u0627\u0644\u0639\u0627\u0644\u0645\u064a', message: '\u062c\u0627\u0631\u064d \u062a\u062d\u0644\u064a\u0644 \u0633\u0628\u0628 \u0627\u0644\u062a\u0628\u0627\u0637\u0624' },
            { time: '09:15 \u0628\u0627\u0644\u062a\u0648\u0642\u064a\u062a \u0627\u0644\u0639\u0627\u0644\u0645\u064a', message: '\u062a\u0645 \u0627\u0643\u062a\u0634\u0627\u0641 \u062a\u062f\u0647\u0648\u0631 \u0641\u064a \u0623\u062f\u0627\u0621 API\u200e' }
          ]
        }
      ],
      maintenance: [
        {
          date: '5 \u062f\u064a\u0633\u0645\u0628\u0631 2025',
          time: '02:00 - 04:00 \u0628\u0627\u0644\u062a\u0648\u0642\u064a\u062a \u0627\u0644\u0639\u0627\u0644\u0645\u064a',
          title: '\u062a\u0631\u0642\u064a\u0629 \u0627\u0644\u0628\u0646\u064a\u0629 \u0627\u0644\u062a\u062d\u062a\u064a\u0629',
          description: '\u0633\u0646\u0642\u0648\u0645 \u0628\u062a\u0631\u0642\u064a\u0629 \u062e\u0648\u0627\u062f\u0645\u0646\u0627 \u0644\u062a\u062d\u0633\u064a\u0646 \u0627\u0644\u0623\u062f\u0627\u0621 \u0648\u0627\u0644\u0645\u0648\u062b\u0648\u0642\u064a\u0629.',
          impact: '\u0642\u062f \u062a\u062d\u062f\u062b \u0627\u0646\u0642\u0637\u0627\u0639\u0627\u062a \u0642\u0635\u064a\u0631\u0629 \u062e\u0644\u0627\u0644 \u0647\u0630\u0647 \u0627\u0644\u0641\u062a\u0631\u0629'
        }
      ]
    },
    orderTrackingPage: {
      headerTitle: '\u062d\u0633\u0627\u0628\u064a',
      headerDescription: '\u0623\u062f\u0631 \u0637\u0644\u0628\u0627\u062a\u0643 \u0648\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u062d\u0633\u0627\u0628\u0643',
      tabs: {
        orders: '\u0627\u0644\u0637\u0644\u0628\u0627\u062a',
        profile: '\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a'
      },
      searchPlaceholder: '\u0627\u0628\u062d\u062b \u0639\u0646 \u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0628\u0627\u0644\u0645\u0639\u0631\u0641 \u0623\u0648 \u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062a\u062c...',
      filterLabel: '\u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0627\u0644\u0627\u062a',
      filterOptions: {
        pending: '\u0642\u064a\u062f \u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0629',
        processing: '\u0642\u064a\u062f \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629',
        completed: '\u0645\u0643\u062a\u0645\u0644',
        failed: '\u0641\u0634\u0644',
        cancelled: '\u0645\u0644\u063a\u064a',
        refunded: '\u0645\u0633\u062a\u0631\u062f'
      },
      emptyState: {
        title: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0637\u0644\u0628\u0627\u062a',
        noOrders: '\u0644\u0645 \u062a\u0642\u0645 \u0628\u0623\u064a \u0637\u0644\u0628 \u062d\u062a\u0649 \u0627\u0644\u0622\u0646.',
        noMatches: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0637\u0644\u0628\u0627\u062a \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u062e\u064a\u0627\u0631\u0627\u062a \u0627\u0644\u062a\u0635\u0641\u064a\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629.',
        cta: '\u0627\u0628\u062f\u0623 \u0627\u0644\u062a\u0633\u0648\u0642'
      },
      order: '\u0637\u0644\u0628',
      products: '\u0645\u0646\u062a\u062c',
      shipping: '\u0627\u0644\u0634\u062d\u0646',
      estimatedDelivery: '\u0627\u0644\u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u0645\u062a\u0648\u0642\u0639',
      email: '\u0627\u0644\u0628\u0631\u064a\u062f',
      orderCard: {
        totalLabel: '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a',
        itemsLabel: '\u0627\u0644\u0639\u0646\u0627\u0635\u0631',
        viewDetails: '\u0639\u0631\u0636 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644',
        dateLabel: '\u0627\u0644\u062a\u0627\u0631\u064a\u062e'
      },
      profileSection: {
        personalInfo: '\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629',
        firstName: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644',
        lastName: '\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0626\u0644\u0629',
        emailAddress: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        phoneNumber: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641',
        accountStats: '\u0625\u062d\u0635\u0627\u0626\u064a\u0627\u062a \u0627\u0644\u062d\u0633\u0627\u0628',
        totalOrders: '\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0637\u0644\u0628\u0627\u062a',
        totalSpent: '\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0625\u0646\u0641\u0627\u0642',
        completedOrders: '\u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0643\u062a\u0645\u0644\u0629'
      },
      recentActivity: '\u0627\u0644\u0646\u0634\u0627\u0637 \u0627\u0644\u0623\u062e\u064a\u0631',
      modal: {
        title: '\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0637\u0644\u0628',
        orderId: '\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628',
        status: '\u0627\u0644\u062d\u0627\u0644\u0629',
        date: '\u0627\u0644\u062a\u0627\u0631\u064a\u062e',
        total: '\u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a',
        items: '\u0627\u0644\u0639\u0646\u0627\u0635\u0631',
        quantity: '\u0627\u0644\u0643\u0645\u064a\u0629',
        paymentInfo: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062f\u0641\u0639',
        transactionHash: '\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0629'
      },
      shippingInfo: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0634\u062d\u0646',
      shippingAddress: '\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0634\u062d\u0646',
      trackingNumber: '\u0631\u0642\u0645 \u0627\u0644\u062a\u062a\u0628\u0639',
      shippingStatuses: {
        pending: '\u0642\u064a\u062f \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631',
        processing: '\u0642\u064a\u062f \u0627\u0644\u062a\u062c\u0647\u064a\u0632',
        shipped: '\u062a\u0645 \u0627\u0644\u0634\u062d\u0646',
        inTransit: '\u0641\u064a \u0627\u0644\u0637\u0631\u064a\u0642',
        outForDelivery: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u0648\u0635\u064a\u0644',
        delivered: '\u062a\u0645 \u0627\u0644\u062a\u0633\u0644\u064a\u0645',
        returned: '\u0645\u064f\u0631\u062a\u062c\u0639',
        failed: '\u0641\u0634\u0644'
      },
      failedToLoadOrders: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0641\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062a',
      connectionError: '\u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0648\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      retry: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629',
      codBadge: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
      settled: '\u062a\u0645\u062a \u0627\u0644\u062a\u0633\u0648\u064a\u0629',
      trackingLabel: '\u0631\u0642\u0645 \u0627\u0644\u062a\u062a\u0628\u0639:',
      noteLabel: '\u0645\u0644\u0627\u062d\u0638\u0629:',
      close: '\u0625\u063a\u0644\u0627\u0642',
      cashOnDelivery: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
      preparingForShipping: '\u062c\u0627\u0631\u064a \u062a\u062c\u0647\u064a\u0632 \u0627\u0644\u0637\u0644\u0628 \u0644\u0644\u0634\u062d\u0646...',
      items: '\u0645\u0646\u062a\u062c',
      qty: '\u0627\u0644\u0643\u0645\u064a\u0629:',
      subtotal: '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0641\u0631\u0639\u064a',
      shippingCostLabel: '\u062a\u0643\u0644\u0641\u0629 \u0627\u0644\u0634\u062d\u0646',
      pageTitle: '\u062a\u062a\u0628\u0639 \u0627\u0644\u0637\u0644\u0628\u0627\u062a',
      pageDescription: '\u062a\u062a\u0628\u0639 \u0634\u062d\u0646\u0627\u062a \u0637\u0644\u0628\u0627\u062a\u0643',
      carrier: '\u0634\u0631\u0643\u0629 \u0627\u0644\u0634\u062d\u0646',
      cancelOrder: '\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0637\u0644\u0628',
      cancelOrderConfirm: '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0623\u0646\u0643 \u062a\u0631\u064a\u062f \u0625\u0644\u063a\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061f \u0644\u0627 \u064a\u0645\u0643\u0646 \u0627\u0644\u062a\u0631\u0627\u062c\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062c\u0631\u0627\u0621.',
      cancelOrderSuccess: '\u062a\u0645 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062c\u0627\u062d.',
      cancelOrderError: '\u0641\u0634\u0644 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0637\u0644\u0628. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      cannotCancelShipped: '\u0644\u0627 \u064a\u0645\u0643\u0646 \u0627\u0644\u0625\u0644\u063a\u0627\u0621: \u062a\u0645 \u0634\u062d\u0646 \u0627\u0644\u0637\u0644\u0628 \u0628\u0627\u0644\u0641\u0639\u0644. \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062f\u0639\u0645.',
      cancelling: '\u062c\u0627\u0631\u064a \u0627\u0644\u0625\u0644\u063a\u0627\u0621...',
      loading: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644...',
      guest: {
        title: '\u062a\u062a\u0628\u0639 \u0637\u0644\u0628\u0643',
        description: '\u0623\u062f\u062e\u0644 \u0631\u0642\u0645 \u0637\u0644\u0628\u0643 \u0644\u0639\u0631\u0636 \u062d\u0627\u0644\u062a\u0647.',
        placeholder: '\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628 (\u0645\u062b\u0627\u0644: SQX-XXXXXX)',
        submit: '\u062a\u062a\u0628\u0639 \u0627\u0644\u0637\u0644\u0628',
        searching: '\u062c\u0627\u0631\u064a \u0627\u0644\u0628\u062d\u062b...',
        notFound: '\u0644\u0645 \u0646\u062a\u0645\u0643\u0646 \u0645\u0646 \u0627\u0644\u0639\u062b\u0648\u0631 \u0639\u0644\u0649 \u0637\u0644\u0628 \u0628\u0647\u0630\u0627 \u0627\u0644\u0631\u0642\u0645. \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646\u0647 \u0648\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
        error: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0645\u0627. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
        signInHint: '\u0644\u062f\u064a\u0643 \u062d\u0633\u0627\u0628\u061f',
        signIn: '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644'
      }
    },

    // Shipping Address Form
    shippingForm: {
      fullName: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644',
      fullNamePlaceholder: '\u0627\u0644\u0627\u0633\u0645 \u0628\u0627\u0644\u0643\u0627\u0645\u0644',
      phone: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641',
      phoneSecondary: '\u0647\u0627\u062a\u0641 \u0625\u0636\u0627\u0641\u064a (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)',
      country: '\u0627\u0644\u062f\u0648\u0644\u0629',
      selectCountry: '\u0627\u062e\u062a\u0631 \u0627\u0644\u062f\u0648\u0644\u0629',
      region: '\u0627\u0644\u0645\u0646\u0637\u0642\u0629',
      selectRegion: '\u0627\u062e\u062a\u0631 \u0627\u0644\u0645\u0646\u0637\u0642\u0629',
      district: '\u0627\u0644\u0645\u0631\u0643\u0632/\u0627\u0644\u0645\u0646\u0637\u0642\u0629',
      selectDistrict: '\u0627\u062e\u062a\u0631 \u0627\u0644\u0645\u0631\u0643\u0632',
      noDistricts: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0631\u0627\u0643\u0632',
      streetAddress: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062a\u0641\u0635\u064a\u0644\u064a',
      streetAddressPlaceholder: '\u0627\u0644\u0634\u0627\u0631\u0639\u060c \u0627\u0644\u0645\u0646\u0637\u0642\u0629\u060c \u0631\u0642\u0645 \u0627\u0644\u0645\u0628\u0646\u0649\u060c \u0627\u0644\u062f\u0648\u0631\u060c \u0627\u0644\u0634\u0642\u0629...',
      landmark: '\u0639\u0644\u0627\u0645\u0629 \u0645\u0645\u064a\u0632\u0629 (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)',
      landmarkPlaceholder: '\u0628\u062c\u0648\u0627\u0631\u060c \u0623\u0645\u0627\u0645...',
      shippingCost: '\u0627\u0644\u0634\u062d\u0646',
      deliveryTime: '\u0627\u0644\u062a\u0648\u0635\u064a\u0644',
      notAvailable: '\u063a\u064a\u0631 \u0645\u062a\u0627\u062d',
      required: '\u0645\u0637\u0644\u0648\u0628',
      invalidPhone: '\u0631\u0642\u0645 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d',
      free: '\u0645\u062c\u0627\u0646\u064a',
      savedAddresses: '\u0627\u0644\u0639\u0646\u0627\u0648\u064a\u0646 \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629',
      selectAddress: '\u0627\u062e\u062a\u0631 \u0639\u0646\u0648\u0627\u0646',
      newAddress: '\u0639\u0646\u0648\u0627\u0646 \u062c\u062f\u064a\u062f',
      saveAddress: '\u062d\u0641\u0638 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0641\u064a \u062d\u0633\u0627\u0628\u064a',
      defaultAddress: '\u0627\u0641\u062a\u0631\u0627\u0636\u064a',
      noSavedAddresses: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0646\u0627\u0648\u064a\u0646 \u0645\u062d\u0641\u0648\u0638\u0629',
      phonePlaceholder: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641'
    },

    // Policy Pages (DB fallback titles)
    policyPages: {
      termsOfService: '\u0634\u0631\u0648\u0637 \u0627\u0644\u062e\u062f\u0645\u0629',
      privacyPolicy: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629',
      returnPolicy: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
      shippingPolicy: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u0634\u062d\u0646',
      digitalReturnGuarantee: '\u0636\u0645\u0627\u0646 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0627\u0644\u0631\u0642\u0645\u064a'
    },

    // Shipping Tracker
    shippingTracker: {
      shippingStatus: '\u062d\u0627\u0644\u0629 \u0627\u0644\u0634\u062d\u0646',
      trackingNumber: '\u0631\u0642\u0645 \u0627\u0644\u062a\u062a\u0628\u0639',
      carrier: '\u0634\u0631\u0643\u0629 \u0627\u0644\u0634\u062d\u0646',
      shippedOn: '\u062a\u0645 \u0627\u0644\u0634\u062d\u0646 \u0641\u064a',
      deliveredOn: '\u062a\u0645 \u0627\u0644\u062a\u0633\u0644\u064a\u0645 \u0641\u064a',
      viewHistory: '\u0639\u0631\u0636 \u0633\u062c\u0644 \u0627\u0644\u062a\u062a\u0628\u0639',
      hideHistory: '\u0625\u062e\u0641\u0627\u0621 \u0627\u0644\u0633\u062c\u0644',
      noHistory: '\u0644\u0627 \u064a\u0648\u062c\u062f \u0633\u062c\u0644 \u062a\u062a\u0628\u0639',
      failedDescription: '\u0641\u0634\u0644\u062a \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062a\u0648\u0635\u064a\u0644. \u0633\u064a\u062a\u0645 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643.',
      returnedDescription: '\u062a\u0645 \u0625\u0631\u062c\u0627\u0639 \u0627\u0644\u0637\u0644\u0628.',
      steps: {
        pending: '\u062a\u0645 \u0627\u0633\u062a\u0644\u0627\u0645 \u0627\u0644\u0637\u0644\u0628',
        processing: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062c\u0647\u064a\u0632',
        shipped: '\u062a\u0645 \u0627\u0644\u0634\u062d\u0646',
        in_transit: '\u0641\u064a \u0627\u0644\u0637\u0631\u064a\u0642',
        out_for_delivery: '\u062e\u0631\u062c \u0644\u0644\u062a\u0648\u0635\u064a\u0644',
        delivered: '\u062a\u0645 \u0627\u0644\u062a\u0633\u0644\u064a\u0645',
        returned: '\u062a\u0645 \u0627\u0644\u0625\u0631\u062c\u0627\u0639',
        failed: '\u0641\u0634\u0644 \u0627\u0644\u062a\u0648\u0635\u064a\u0644'
      }
    },

    // Checkout Failed Page
    checkoutFailed: {
      loading: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644...',
      paymentFailed: '\u0641\u0634\u0644\u062a \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639',
      orderNumber: '\u0627\u0644\u0637\u0644\u0628 \u0631\u0642\u0645 #',
      paymentFailedBadge: '\u0627\u0644\u062f\u0641\u0639 \u0641\u0634\u0644',
      orderSummary: '\u0645\u0644\u062e\u0635 \u0627\u0644\u0637\u0644\u0628',
      orderNumberLabel: '\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628',
      amount: '\u0627\u0644\u0645\u0628\u0644\u063a',
      paymentMethod: '\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639',
      orderType: '\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628',
      physicalProducts: '\u0645\u0646\u062a\u062c\u0627\u062a \u0645\u0644\u0645\u0648\u0633\u0629',
      digitalProducts: '\u0645\u0646\u062a\u062c\u0627\u062a \u0631\u0642\u0645\u064a\u0629',
      paymentStatus: '\u062d\u0627\u0644\u0629 \u0627\u0644\u062f\u0641\u0639',
      failed: '\u0641\u0634\u0644',
      whatCanYouDo: '\u0645\u0627\u0630\u0627 \u064a\u0645\u0643\u0646\u0643 \u0623\u0646 \u062a\u0641\u0639\u0644\u061f',
      tryAgain: '\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649',
      tryAgainDescription: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0635\u0641\u062d\u0629 \u0627\u0644\u062f\u0641\u0639 \u0648\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629',
      trackOrder: '\u062a\u062a\u0628\u0639 \u0627\u0644\u0637\u0644\u0628',
      trackOrderDescription: '\u062a\u0627\u0628\u0639 \u062d\u0627\u0644\u0629 \u0637\u0644\u0628\u0643',
      myOrders: '\u0637\u0644\u0628\u0627\u062a\u064a',
      myOrdersDescription: '\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062a',
      contactPage: '\u0635\u0641\u062d\u0629 \u0627\u0644\u0627\u062a\u0635\u0627\u0644',
      needHelp: '\u0647\u0644 \u062a\u062d\u062a\u0627\u062c \u0645\u0633\u0627\u0639\u062f\u0629\u061f \u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0639\u0628\u0631',
      egp: '\u062c.\u0645',
      // Error reason messages
      errorDefaultTitle: '\u0644\u0645 \u062a\u062a\u0645 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639',
      errorDefaultDesc: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062c\u0629 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0623\u0648 \u0627\u062e\u062a\u064a\u0627\u0631 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0645\u062e\u062a\u0644\u0641\u0629.',
      errorCancelledTitle: '\u062a\u0645 \u0625\u0644\u063a\u0627\u0621 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639',
      errorCancelledDesc: '\u0642\u0645\u062a \u0628\u0625\u0644\u063a\u0627\u0621 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639. \u0644\u0645 \u064a\u062a\u0645 \u062e\u0635\u0645 \u0623\u064a \u0645\u0628\u0644\u063a \u0645\u0646 \u062d\u0633\u0627\u0628\u0643. \u064a\u0645\u0643\u0646\u0643 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0639\u0646\u062f\u0645\u0627 \u062a\u0643\u0648\u0646 \u062c\u0627\u0647\u0632\u0627\u064b.',
      errorVerificationTitle: '\u062a\u0639\u0630\u0631 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639',
      errorVerificationDesc: '\u062a\u0639\u0630\u0631 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u062d\u0627\u0644\u0629 \u0627\u0644\u062f\u0641\u0639. \u0625\u0630\u0627 \u062a\u0645 \u062e\u0635\u0645 \u0627\u0644\u0645\u0628\u0644\u063a \u0645\u0646 \u062d\u0633\u0627\u0628\u0643\u060c \u0641\u0644\u0627 \u062a\u0642\u0644\u0642 \u2014 \u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631 \u0628\u0636\u0639 \u062f\u0642\u0627\u0626\u0642 \u062b\u0645 \u062a\u062d\u0642\u0642 \u0645\u0646 \u062d\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628 \u0639\u0628\u0631 \u062a\u062a\u0628\u0639 \u0627\u0644\u0637\u0644\u0628\u060c \u0623\u0648 \u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645 \u0648\u0633\u0646\u0633\u0627\u0639\u062f\u0643 \u0641\u0648\u0631\u0627\u064b.',
      errorServerTitle: '\u0645\u0634\u0643\u0644\u0629 \u0645\u0624\u0642\u062a\u0629 \u0641\u064a \u062e\u0627\u062f\u0645 \u0627\u0644\u062f\u0641\u0639',
      errorServerDesc: '\u064a\u0648\u0627\u062c\u0647 \u062e\u0627\u062f\u0645 \u0627\u0644\u062f\u0641\u0639 \u0645\u0634\u0643\u0644\u0629 \u0645\u0624\u0642\u062a\u0629. \u0644\u0645 \u064a\u062a\u0645 \u062e\u0635\u0645 \u0623\u064a \u0645\u0628\u0644\u063a. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0628\u0639\u062f \u062f\u0642\u064a\u0642\u0629 \u0623\u0648 \u0627\u062e\u062a\u064a\u0627\u0631 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0623\u062e\u0631\u0649.',
      errorDeclinedTitle: '\u062a\u0645 \u0631\u0641\u0636 \u0627\u0644\u0628\u0637\u0627\u0642\u0629',
      errorDeclinedDesc: '\u062a\u0645 \u0631\u0641\u0636 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0645\u0646 \u0642\u0628\u0644 \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0635\u062f\u0631. \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0648\u0627\u0644\u0631\u0635\u064a\u062f \u0627\u0644\u0645\u062a\u0627\u062d\u060c \u0623\u0648 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0628\u0637\u0627\u0642\u0629 \u0623\u062e\u0631\u0649.',
      errorInsufficientTitle: '\u0631\u0635\u064a\u062f \u063a\u064a\u0631 \u0643\u0627\u0641\u064d',
      errorInsufficientDesc: '\u0627\u0644\u0631\u0635\u064a\u062f \u0627\u0644\u0645\u062a\u0627\u062d \u0641\u064a \u062d\u0633\u0627\u0628\u0643 \u063a\u064a\u0631 \u0643\u0627\u0641\u064d \u0644\u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u0639\u0645\u0644\u064a\u0629. \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u0623\u0643\u062f \u0645\u0646 \u062a\u0648\u0641\u0631 \u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0623\u0648 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0623\u062e\u0631\u0649.',
      errorExpiredTitle: '\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0645\u0646\u062a\u0647\u064a\u0629 \u0627\u0644\u0635\u0644\u0627\u062d\u064a\u0629',
      errorExpiredDesc: '\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u0629 \u0645\u0646\u062a\u0647\u064a\u0629 \u0627\u0644\u0635\u0644\u0627\u062d\u064a\u0629. \u064a\u0631\u062c\u0649 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0628\u0637\u0627\u0642\u0629 \u0633\u0627\u0631\u064a\u0629 \u0627\u0644\u0645\u0641\u0639\u0648\u0644.',
      errorInvalidCardTitle: '\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d\u0629',
      errorInvalidCardDesc: '\u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0648\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0627\u0646\u062a\u0647\u0627\u0621 \u0648\u0631\u0645\u0632 \u0627\u0644\u0623\u0645\u0627\u0646 (CVV) \u0648\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      errorSecurityTitle: '\u0641\u0634\u0644 \u0627\u0644\u062a\u062d\u0642\u0642 \u0627\u0644\u0623\u0645\u0646\u064a',
      errorSecurityDesc: '\u0641\u0634\u0644 \u0627\u0644\u062a\u062d\u0642\u0642 \u0627\u0644\u0623\u0645\u0646\u064a (3D Secure / OTP). \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u0623\u0643\u062f \u0645\u0646 \u0625\u062f\u062e\u0627\u0644 \u0631\u0645\u0632 \u0627\u0644\u062a\u062d\u0642\u0642 \u0627\u0644\u0635\u062d\u064a\u062d \u0627\u0644\u0645\u0631\u0633\u0644 \u0645\u0646 \u0627\u0644\u0628\u0646\u0643 \u0648\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      errorTimeoutTitle: '\u0627\u0646\u062a\u0647\u062a \u0645\u0647\u0644\u0629 \u0627\u0644\u062f\u0641\u0639',
      errorTimeoutDesc: '\u0627\u0633\u062a\u063a\u0631\u0642\u062a \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639 \u0648\u0642\u062a\u0627\u064b \u0623\u0637\u0648\u0644 \u0645\u0646 \u0627\u0644\u0645\u062a\u0648\u0642\u0639. \u0644\u0645 \u064a\u062a\u0645 \u062e\u0635\u0645 \u0623\u064a \u0645\u0628\u0644\u063a. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      errorRefundedTitle: '\u062a\u0645 \u0627\u0633\u062a\u0631\u062f\u0627\u062f \u0627\u0644\u0645\u0628\u0644\u063a',
      errorRefundedDesc: '\u062a\u0645 \u0627\u0633\u062a\u0631\u062f\u0627\u062f \u0645\u0628\u0644\u063a \u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064a\u0629. \u0633\u064a\u0638\u0647\u0631 \u0627\u0644\u0645\u0628\u0644\u063a \u0641\u064a \u062d\u0633\u0627\u0628\u0643 \u062e\u0644\u0627\u0644 \u0663-\u0665 \u0623\u064a\u0627\u0645 \u0639\u0645\u0644 \u062d\u0633\u0628 \u0627\u0644\u0628\u0646\u0643.',
      errorCryptoTitle: '\u0645\u0634\u0643\u0644\u0629 \u0641\u064a \u0627\u0644\u062f\u0641\u0639 \u0628\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629',
      errorCryptoDesc: '\u062d\u062f\u062b\u062a \u0645\u0634\u0643\u0644\u0629 \u0641\u064a \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639 \u0628\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629. \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0645\u062d\u0641\u0638\u062a\u0643 \u0648\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0623\u0648 \u0627\u062e\u062a\u064a\u0627\u0631 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0623\u062e\u0631\u0649.',
      errorConnectionTitle: '\u0645\u0634\u0643\u0644\u0629 \u0641\u064a \u0627\u0644\u0627\u062a\u0635\u0627\u0644',
      errorConnectionDesc: '\u062d\u062f\u062b\u062a \u0645\u0634\u0643\u0644\u0629 \u0641\u064a \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0623\u062b\u0646\u0627\u0621 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639. \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u062a\u0635\u0627\u0644\u0643 \u0628\u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a \u0648\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      errorGenericFailedDesc: '\u0644\u0645 \u062a\u062a\u0645 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639 \u0628\u0646\u062c\u0627\u062d. \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u0648\u0627\u0644\u0631\u0635\u064a\u062f \u0627\u0644\u0645\u062a\u0627\u062d \u062b\u0645 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649\u060c \u0623\u0648 \u062c\u0631\u0628 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0645\u062e\u062a\u0644\u0641\u0629.',
      errorTechnicalTitle: '\u062e\u0637\u0623 \u0645\u0624\u0642\u062a',
      errorTechnicalDesc: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0645\u0624\u0642\u062a \u0623\u062b\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u062f\u0641\u0639. \u0644\u0645 \u064a\u062a\u0645 \u062e\u0635\u0645 \u0623\u064a \u0645\u0628\u0644\u063a. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0628\u0639\u062f \u0644\u062d\u0638\u0627\u062a.',
      errorFallbackDesc: '\u0644\u0645 \u062a\u062a\u0645 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639 \u0628\u0646\u062c\u0627\u062d. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0623\u0648 \u0627\u062e\u062a\u064a\u0627\u0631 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0645\u062e\u062a\u0644\u0641\u0629. \u0625\u0630\u0627 \u0627\u0633\u062a\u0645\u0631\u062a \u0627\u0644\u0645\u0634\u0643\u0644\u0629\u060c \u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645.'
    },

    // Checkout Success Page
    checkoutSuccess: {
      // Payment method labels
      applePay: '\u0623\u0628\u0644 \u0628\u0627\u064a',
      cardPayment: '\u0628\u0637\u0627\u0642\u0629 \u0627\u0626\u062a\u0645\u0627\u0646',
      mobileWallets: '\u0627\u0644\u0645\u062d\u0627\u0641\u0638 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629',
      walletBalance: '\u0631\u0635\u064a\u062f \u0627\u0644\u0645\u062d\u0641\u0638\u0629',
      cryptocurrency: '\u0639\u0645\u0644\u0627\u062a \u0631\u0642\u0645\u064a\u0629',
      bankInstallments: '\u0627\u0644\u062a\u0642\u0633\u064a\u0637 \u0627\u0644\u0628\u0646\u0643\u064a',
      buyNowPayLater: '\u0627\u0634\u062a\u0631\u064a \u0627\u0644\u0622\u0646 \u0648\u0627\u062f\u0641\u0639 \u0644\u0627\u062d\u0642\u0627\u064b',
      kioskPayment: '\u0641\u0648\u0631\u064a / \u0643\u0634\u0643',
      instaPay: '\u0625\u0646\u0633\u062a\u0627\u0628\u0627\u064a',
      cashOnDelivery: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
      paysky: '\u0628\u0627\u064a \u0633\u0643\u0627\u064a',
      // Error/Loading
      orderIdNotFound: '\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f',
      verifyingPayment: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062f\u0641\u0639...',
      pleaseWait: '\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631',
      noPermission: '\u0644\u064a\u0633 \u0644\u062f\u064a\u0643 \u0635\u0644\u0627\u062d\u064a\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0644\u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628. \u064a\u0631\u062c\u0649 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0631\u0627\u0628\u0637 \u0645\u0646 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0637\u0644\u0628 \u0623\u0648 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644.',
      paymentNotConfirmed: '\u0644\u0645 \u064a\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062f\u0641\u0639 \u0628\u0639\u062f. \u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631 \u0623\u0648 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u062d\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628.',
      failedToLoad: '\u0641\u0634\u0644 \u0641\u064a \u062a\u062d\u0645\u064a\u0644 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0637\u0644\u0628',
      errorLoading: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u062a\u062d\u0645\u064a\u0644 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0637\u0644\u0628',
      somethingWrong: '\u062d\u062f\u062b \u062e\u0637\u0623',
      // Navigation
      trackOrder: '\u062a\u062a\u0628\u0639 \u0627\u0644\u0637\u0644\u0628',
      products: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      myOrders: '\u0637\u0644\u0628\u0627\u062a\u064a',
      // Success section
      shareReceipt: '\u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0625\u064a\u0635\u0627\u0644',
      orderConfirmed: '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0637\u0644\u0628!',
      paymentSuccessful: '\u062a\u0645 \u0627\u0644\u062f\u0641\u0639 \u0628\u0646\u062c\u0627\u062d!',
      orderCreated: '\u062a\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062c\u0627\u062d!',
      orderPlaced: '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0637\u0644\u0628',
      clickToCopy: '\u0627\u0646\u0642\u0631 \u0644\u0644\u0646\u0633\u062e',
      order: '\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628',
      payOnDelivery: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
      preparing: '\u0642\u064a\u062f \u0627\u0644\u062a\u062c\u0647\u064a\u0632',
      paidWithWallet: '\u062a\u0645 \u0627\u0644\u062f\u0641\u0639 \u0645\u0646 \u0627\u0644\u0645\u062d\u0641\u0638\u0629',
      paymentConfirmed: '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062f\u0641\u0639',
      // COD section
      amountToPay: '\u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0645\u0637\u0644\u0648\u0628',
      includesDiscount: '\u0634\u0627\u0645\u0644 \u062e\u0635\u0645',
      codDescription: '\u0627\u062f\u0641\u0639 \u0644\u0644\u0645\u0646\u062f\u0648\u0628 \u0639\u0646\u062f \u0627\u0633\u062a\u0644\u0627\u0645 \u0637\u0644\u0628\u0643. \u064a\u0631\u062c\u0649 \u062a\u062c\u0647\u064a\u0632 \u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0645\u0637\u0644\u0648\u0628.',
      // Payment Summary
      paymentSummary: '\u0645\u0644\u062e\u0635 \u0627\u0644\u062f\u0641\u0639',
      paymentMethod: '\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639',
      amountPaid: '\u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0645\u062f\u0641\u0648\u0639',
      paymentStatus: '\u062d\u0627\u0644\u0629 \u0627\u0644\u062f\u0641\u0639',
      paid: '\u0645\u062f\u0641\u0648\u0639',
      youSaved: '\u0648\u0641\u0651\u0631\u062a',
      shippingStatus: '\u062d\u0627\u0644\u0629 \u0627\u0644\u0634\u062d\u0646',
      // Order Details
      orderDetails: '\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0637\u0644\u0628',
      qty: '\u0627\u0644\u0643\u0645\u064a\u0629:',
      sku: '\u0627\u0644\u0631\u0645\u0632',
      subtotal: '\u0627\u0644\u0645\u062c\u0645\u0648\u0639 \u0627\u0644\u0641\u0631\u0639\u064a',
      coupon: '\u0643\u0648\u0628\u0648\u0646',
      discount: '\u062e\u0635\u0645',
      shipping: '\u0627\u0644\u0634\u062d\u0646',
      codFee: '\u0631\u0633\u0648\u0645 \u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
      total: '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a',
      // Shipping Info
      shippingInformation: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0634\u062d\u0646',
      paymentOnDelivery: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
      paymentReceived: '\u062a\u0645 \u0627\u0633\u062a\u0644\u0627\u0645 \u0627\u0644\u062f\u0641\u0639 \u0628\u0646\u062c\u0627\u062d',
      preparingForShipping: '\u062c\u0627\u0631\u064a \u062a\u062c\u0647\u064a\u0632 \u0637\u0644\u0628\u0643 \u0644\u0644\u0634\u062d\u0646',
      trackingWillBeSent: '\u0633\u064a\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0642\u0645 \u0627\u0644\u062a\u062a\u0628\u0639 \u0639\u0628\u0631 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0628\u0645\u062c\u0631\u062f \u0634\u062d\u0646 \u0627\u0644\u0637\u0644\u0628',
      deliveryToAddress: '\u0633\u064a\u062a\u0645 \u0627\u0644\u062a\u0648\u0635\u064a\u0644 \u0625\u0644\u0649 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u062d\u062f\u062f',
      // Digital Content
      orderReady: '\u0637\u0644\u0628\u0643 \u062c\u0627\u0647\u0632 \u0644\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
      subscriptionCode: '\u0643\u0648\u062f \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643',
      subscriptionCodes: '\u0623\u0643\u0648\u0627\u062f \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643',
      copy: '\u0646\u0633\u062e',
      links: '\u0627\u0644\u0631\u0648\u0627\u0628\u0637',
      link: '\u0631\u0627\u0628\u0637',
      deliveryNote: '\u0645\u0644\u0627\u062d\u0638\u0629 \u0627\u0644\u062a\u0633\u0644\u064a\u0645',
      email: '\u0627\u0644\u0628\u0631\u064a\u062f',
      password: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0633\u0631',
      saveOrder: '\u0627\u062d\u0641\u0638 \u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628',
      tapToCopy: '\u0627\u0636\u063a\u0637 \u0644\u0644\u0646\u0633\u062e',
      // Share Modal
      saveShareReceipt: '\u062d\u0641\u0638 \u0648\u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0625\u064a\u0635\u0627\u0644',
      saveShare: '\u062d\u0641\u0638 \u0648\u0645\u0634\u0627\u0631\u0643\u0629',
      saveAsImage: '\u062d\u0641\u0638 \u0643\u0635\u0648\u0631\u0629',
      saveHighQuality: '\u062d\u0641\u0638 \u0627\u0644\u0625\u064a\u0635\u0627\u0644 \u0643\u0635\u0648\u0631\u0629 \u0639\u0627\u0644\u064a\u0629 \u0627\u0644\u062c\u0648\u062f\u0629',
      shareVia: '\u0645\u0634\u0627\u0631\u0643\u0629 \u0639\u0628\u0631',
      whatsapp: '\u0648\u0627\u062a\u0633\u0627\u0628',
      telegram: '\u062a\u064a\u0644\u064a\u062c\u0631\u0627\u0645',
      twitterX: '\u0625\u0643\u0633',
      facebook: '\u0641\u064a\u0633\u0628\u0648\u0643',
      done: '\u062a\u0645!',
      copyLink: '\u0646\u0633\u062e \u0627\u0644\u0631\u0627\u0628\u0637',
      moreOptions: '\u0627\u0644\u0645\u0632\u064a\u062f \u0645\u0646 \u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a...',
      // Digital delivery pending (paid, content not yet provisioned)
      digitalPendingTitle: '\u0645\u0646\u062a\u062c\u0627\u062a\u0643 \u0641\u064a \u0627\u0644\u0637\u0631\u064a\u0642 \u0625\u0644\u064a\u0643',
      digitalPendingBody: '\u062a\u0645 \u0627\u0633\u062a\u0644\u0627\u0645 \u062f\u0641\u0639\u062a\u0643. \u064a\u062a\u0645 \u0627\u0644\u0622\u0646 \u062a\u062c\u0647\u064a\u0632 \u0645\u0646\u062a\u062c\u0627\u062a\u0643 \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0648\u0633\u062a\u0638\u0647\u0631 \u0647\u0646\u0627 \u062e\u0644\u0627\u0644 \u0644\u062d\u0638\u0627\u062a \u2014 \u0648\u0633\u0646\u0631\u0633\u0644\u0647\u0627 \u0623\u064a\u0636\u0627\u064b \u0625\u0644\u0649 \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a.',
      // Legacy / Crypto checkout keys
      // Legacy / Crypto checkout keys
    },

    productsPage: {
      hero: {
        defaultTitle: '\u0645\u0646\u062a\u062c\u0627\u062a\u0646\u0627',
        defaultDescription: '\u0627\u0643\u062a\u0634\u0641 \u0645\u062c\u0645\u0648\u0639\u062a\u0646\u0627 \u0627\u0644\u0645\u0645\u064a\u0632\u0629 \u0645\u0646 \u0627\u0644\u062d\u0644\u0648\u0644 \u0648\u0627\u0644\u0623\u062f\u0648\u0627\u062a \u0648\u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0627\u0644\u0645\u0635\u0645\u0645\u0629 \u0644\u0644\u0645\u062d\u062a\u0631\u0641\u064a\u0646.',
        exploreTitle: '\u0627\u0633\u062a\u0643\u0634\u0641 \u062d\u0633\u0628 \u0627\u0644\u0641\u0626\u0629',
        exploreDescription: '\u062a\u0635\u0641\u062d \u0627\u0644\u0641\u0626\u0627\u062a \u0627\u0644\u0645\u0646\u0638\u0645\u0629 \u0644\u0644\u0639\u062b\u0648\u0631 \u0639\u0644\u0649 \u0645\u0627 \u062a\u062d\u062a\u0627\u062c\u0647 \u062a\u0645\u0627\u0645\u0627\u064b.',
        exploreButton: '\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0641\u0626\u0627\u062a'
      },
      error: {
        title: '\u0641\u0634\u0644 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
        description: '\u064a\u0631\u062c\u0649 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0635\u0641\u062d\u0629 \u0623\u0648 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0644\u0627\u062d\u0642\u0627\u064b.',
        retry: '\u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649'
      },
      labels: {
        unavailable: '\u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631 \u062d\u0627\u0644\u064a\u0627\u064b',
        featured: '\u0645\u0645\u064a\u0632',
        sales: '{count} \u0639\u0645\u0644\u064a\u0629 \u0628\u064a\u0639',
        salesShort: '\u0639\u0645\u0644\u064a\u0629 \u0634\u0631\u0627\u0621',
        stockAvailable: '{count} \u0645\u062a\u0648\u0641\u0631',
        stockUnavailable: '\u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631',
        instantDelivery: '\u062a\u0633\u0644\u064a\u0645 \u0641\u0648\u0631\u064a'
      },
      buttons: {
        browseCategories: '\u062a\u0635\u0641\u062d \u0643\u0644 \u0627\u0644\u0641\u0626\u0627\u062a',
        viewDemo: '\u0639\u0631\u0636 \u0627\u0644\u062a\u062c\u0631\u0628\u0629',
        demoShort: '\u0639\u0631\u0636',
        notAvailable: '\u063a\u064a\u0631 \u0645\u062a\u0627\u062d',
        addToCart: '\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629',
        cart: '\u0633\u0644\u0629',
        outOfStock: '\u0646\u0641\u0630\u062a \u0627\u0644\u0643\u0645\u064a\u0629',
        selectOptions: '\u0639\u0631\u0636 \u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a'
      },
      variantAttributes: {
        size: '\u0627\u0644\u0645\u0642\u0627\u0633',
        ml: '\u0645\u0644',
        color: '\u0627\u0644\u0644\u0648\u0646',
        denomination: '\u0627\u0644\u0641\u0626\u0629',
        style: '\u0627\u0644\u0646\u0645\u0637',
        material: '\u0627\u0644\u062e\u0627\u0645\u0629',
        fit: '\u0627\u0644\u0642\u0635\u0629',
        pattern: '\u0627\u0644\u0646\u0642\u0634',
        region: '\u0627\u0644\u0645\u0646\u0637\u0642\u0629',
        platform: '\u0627\u0644\u0645\u0646\u0635\u0629',
        edition: '\u0627\u0644\u0625\u0635\u062f\u0627\u0631',
        period: '\u0627\u0644\u0645\u062f\u0629',
        weight: '\u0627\u0644\u0648\u0632\u0646',
        volume: '\u0627\u0644\u062d\u062c\u0645',
        capacity: '\u0627\u0644\u0633\u0639\u0629',
        storage: '\u0627\u0644\u062a\u062e\u0632\u064a\u0646',
        ram: '\u0627\u0644\u0630\u0627\u0643\u0631\u0629',
        type: '\u0627\u0644\u0646\u0648\u0639',
        model: '\u0627\u0644\u0645\u0648\u062f\u064a\u0644',
        flavor: '\u0627\u0644\u0646\u0643\u0647\u0629',
        scent: '\u0627\u0644\u0639\u0637\u0631',
        length: '\u0627\u0644\u0637\u0648\u0644',
        width: '\u0627\u0644\u0639\u0631\u0636',
        connectivity: '\u0627\u0644\u0627\u062a\u0635\u0627\u0644',
        voltage: '\u0627\u0644\u062c\u0647\u062f'
      },
      variantValues: {
        // \u0627\u0644\u0645\u0642\u0627\u0633\u0627\u062a
        xs: 'XS', s: 'S', m: 'M', l: 'L', xl: 'XL', xxl: 'XXL', xxxl: '3XL',
        small: '\u0635\u063a\u064a\u0631', medium: '\u0648\u0633\u0637', large: '\u0643\u0628\u064a\u0631', extra_large: '\u0643\u0628\u064a\u0631 \u062c\u062f\u0627\u064b',
        one_size: '\u0645\u0642\u0627\u0633 \u0648\u0627\u062d\u062f', free_size: '\u0645\u0642\u0627\u0633 \u062d\u0631',
        // \u0627\u0644\u0623\u0644\u0648\u0627\u0646
        red: '\u0623\u062d\u0645\u0631', blue: '\u0623\u0632\u0631\u0642', green: '\u0623\u062e\u0636\u0631', yellow: '\u0623\u0635\u0641\u0631',
        black: '\u0623\u0633\u0648\u062f', white: '\u0623\u0628\u064a\u0636', grey: '\u0631\u0645\u0627\u062f\u064a', gray: '\u0631\u0645\u0627\u062f\u064a',
        pink: '\u0648\u0631\u062f\u064a', purple: '\u0628\u0646\u0641\u0633\u062c\u064a', orange: '\u0628\u0631\u062a\u0642\u0627\u0644\u064a', brown: '\u0628\u0646\u064a',
        navy: '\u0643\u062d\u0644\u064a', beige: '\u0628\u064a\u062c', gold: '\u0630\u0647\u0628\u064a', silver: '\u0641\u0636\u064a',
        cyan: '\u0633\u064a\u0627\u0646', magenta: '\u0623\u0631\u062c\u0648\u0627\u0646\u064a', lime: '\u0644\u064a\u0645\u0648\u0646\u064a', teal: '\u0641\u064a\u0631\u0648\u0632\u064a', maroon: '\u0639\u0646\u0627\u0628\u064a',
        // \u0627\u0644\u062e\u0627\u0645\u0627\u062a
        cotton: '\u0642\u0637\u0646', polyester: '\u0628\u0648\u0644\u064a\u0633\u062a\u0631', leather: '\u062c\u0644\u062f',
        wool: '\u0635\u0648\u0641', silk: '\u062d\u0631\u064a\u0631', linen: '\u0643\u062a\u0627\u0646', denim: '\u062c\u064a\u0646\u0632',
        // \u0627\u0644\u0642\u0635\u0629
        slim: '\u0636\u064a\u0642', regular: '\u0639\u0627\u062f\u064a', loose: '\u0641\u0636\u0641\u0627\u0636', oversized: '\u0648\u0627\u0633\u0639',
        // \u0639\u0627\u0645
        default: '\u0627\u0641\u062a\u0631\u0627\u0636\u064a', standard: '\u0642\u064a\u0627\u0633\u064a', premium: '\u0641\u0627\u062e\u0631', basic: '\u0623\u0633\u0627\u0633\u064a',
        new: '\u062c\u062f\u064a\u062f', used: '\u0645\u0633\u062a\u0639\u0645\u0644', refurbished: '\u0645\u062c\u062f\u062f',
        digital: '\u0631\u0642\u0645\u064a', physical: '\u0645\u0644\u0645\u0648\u0633'
      },
      loadingProduct: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0646\u062a\u062c...',
      searchResultsFor: '\u0646\u062a\u0627\u0626\u062c \u0627\u0644\u0628\u062d\u062b \u0639\u0646:',
      loadingMore: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0632\u064a\u062f \u0645\u0646 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a...',
      emptyState: {
        title: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0646\u062a\u062c\u0627\u062a \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0641\u0626\u0629 \u0628\u0639\u062f',
        description: '\u0646\u0642\u0648\u0645 \u062d\u0627\u0644\u064a\u0627\u064b \u0628\u0625\u0639\u062f\u0627\u062f \u0645\u0646\u062a\u062c\u0627\u062a \u0644\u0647\u0630\u0647 \u0627\u0644\u0641\u0626\u0629. \u0639\u062f \u0644\u0627\u062d\u0642\u0627\u064b!',
        cta: '\u062a\u0635\u0641\u062d \u0643\u0644 \u0627\u0644\u0641\u0626\u0627\u062a'
      }
    },

    profilePage: {
      title: '\u062d\u0633\u0627\u0628\u064a',
      loggingOut: '\u062c\u0627\u0631\u064a \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c...',
      verifiedAccount: '\u062d\u0633\u0627\u0628 \u0645\u0648\u062b\u0642',
      unverifiedAccount: '\u0627\u0644\u0628\u0631\u064a\u062f \u063a\u064a\u0631 \u0645\u0641\u0639\u0644',
      verifyEmailBadge: '\u0641\u0639\u0651\u0644 \u0627\u0644\u0622\u0646',
      emailVerification: {
        sectionTitle: '\u062a\u0648\u062b\u064a\u0642 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        sectionDesc: '\u0641\u0639\u0651\u0644 \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0644\u062a\u0623\u0645\u064a\u0646 \u062d\u0633\u0627\u0628\u0643 \u0648\u0627\u0633\u062a\u0642\u0628\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0627\u0644\u0645\u0647\u0645\u0629.',
        statusVerified: '\u062a\u0645 \u062a\u0648\u062b\u064a\u0642 \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        statusUnverified: '\u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u063a\u064a\u0631 \u0645\u0648\u062b\u0642 \u0628\u0639\u062f',
        sendOtp: '\u0625\u0631\u0633\u0627\u0644 \u0631\u0645\u0632 \u0627\u0644\u062a\u062d\u0642\u0642',
        sending: '\u062c\u0627\u0631\u064a \u0627\u0644\u0625\u0631\u0633\u0627\u0644...',
        resendOtp: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0625\u0631\u0633\u0627\u0644',
        resendIn: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u0628\u0639\u062f {s}\u062b',
        otpSent: '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0645\u0632 \u0645\u0643\u0648\u0646 \u0645\u0646 6 \u0623\u0631\u0642\u0627\u0645 \u0625\u0644\u0649',
        otpPlaceholder: '\u0623\u062f\u062e\u0644 \u0627\u0644\u0631\u0645\u0632 \u0627\u0644\u0645\u0643\u0648\u0646 \u0645\u0646 6 \u0623\u0631\u0642\u0627\u0645',
        verify: '\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0628\u0631\u064a\u062f',
        verifying: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0642\u0642...',
        successTitle: '\u062a\u0645 \u0627\u0644\u062a\u0648\u062b\u064a\u0642!',
        successDesc: '\u062a\u0645 \u062a\u0648\u062b\u064a\u0642 \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0628\u0646\u062c\u0627\u062d.',
        changeCode: '\u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0631\u0645\u0632',
        invalidCode: '\u0627\u0644\u0631\u0645\u0632 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d \u0623\u0648 \u0645\u0646\u062a\u0647\u064a \u0627\u0644\u0635\u0644\u0627\u062d\u064a\u0629. \u062d\u0627\u0648\u0644 \u0645\u062c\u062f\u062f\u0627\u064b.',
        networkError: '\u062e\u0637\u0623 \u0641\u064a \u0627\u0644\u0634\u0628\u0643\u0629. \u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u062a\u0635\u0627\u0644\u0643.',
        sendFailed: '\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0645\u0632. \u0623\u0639\u062f \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.'
      },
      tabs: {
        overview: '\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629',
        wallet: '\u0627\u0644\u0645\u062d\u0641\u0638\u0629',
        orders: '\u0627\u0644\u0637\u0644\u0628\u0627\u062a',
        codes: '\u0623\u0643\u0648\u0627\u062f \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643',
        links: '\u0627\u0644\u0631\u0648\u0627\u0628\u0637',
        settings: '\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a'
      },
      signOut: '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c',
      signingOut: '\u062c\u0627\u0631\u064a \u0627\u0644\u062e\u0631\u0648\u062c...',
      stats: {
        walletBalance: '\u0631\u0635\u064a\u062f \u0627\u0644\u0645\u062d\u0641\u0638\u0629',
        totalOrders: '\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0637\u0644\u0628\u0627\u062a',
        totalSpent: '\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0625\u0646\u0641\u0627\u0642',
        links: '\u0627\u0644\u0631\u0648\u0627\u0628\u0637'
      },
      overview: {
        recentOrders: '\u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0623\u062e\u064a\u0631\u0629',
        viewAll: '\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064a\u062f \u2190',
        noOrders: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0637\u0644\u0628\u0627\u062a \u0628\u0639\u062f',
        orderNumber: '\u0637\u0644\u0628 #{id}',
        quickActions: '\u0625\u062c\u0631\u0627\u0621\u0627\u062a \u0633\u0631\u064a\u0639\u0629',
        browseProducts: '\u062a\u0635\u0641\u062d \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
        linksHistory: '\u0633\u062c\u0644 \u0627\u0644\u0631\u0648\u0627\u0628\u0637',
        contactSupport: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062f\u0639\u0645',
        startShopping: '\u0627\u0628\u062f\u0623 \u0627\u0644\u062a\u0633\u0648\u0642',
        myLinks: '\u0631\u0648\u0627\u0628\u0637\u064a',
        inShipping: '\u0642\u064a\u062f \u0627\u0644\u0634\u062d\u0646'
      },
      orders: {
        title: '\u0633\u062c\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062a',
        noOrders: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0637\u0644\u0628\u0627\u062a \u0628\u0639\u062f',
        orderNumber: '\u0637\u0644\u0628 #{id}',
        items: '\u0627\u0644\u0639\u0646\u0627\u0635\u0631',
        itemCount: '\u0645\u0646\u062a\u062c ({count})',
        details: '\u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644',
        startShopping: '\u0627\u0628\u062f\u0623 \u0627\u0644\u062a\u0633\u0648\u0642 \u0644\u0631\u0624\u064a\u0629 \u0637\u0644\u0628\u0627\u062a\u0643 \u0647\u0646\u0627',
        completed: '\u0645\u0643\u062a\u0645\u0644',
        pending: '\u0642\u064a\u062f \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631',
        processing: '\u0642\u064a\u062f \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629',
        cancelled: '\u0645\u0644\u063a\u064a',
        refunded: '\u0645\u0633\u062a\u0631\u062f',
        orderDetails: '\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0637\u0644\u0628',
        noItems: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0646\u0627\u0635\u0631',
        transactionInfo: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0629',
        close: '\u0625\u063a\u0644\u0627\u0642',
        settled: '\u062a\u0645\u062a \u0627\u0644\u062a\u0633\u0648\u064a\u0629',
        cashOnDelivery: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
        paymentFailed: '\u0641\u0634\u0644 \u0627\u0644\u062f\u0641\u0639',
        incompleteTransaction: '\u0645\u0639\u0627\u0645\u0644\u0629 \u063a\u064a\u0631 \u0645\u0643\u062a\u0645\u0644\u0629',
        note: '\u0645\u0644\u0627\u062d\u0638\u0629',
        date: '\u0627\u0644\u062a\u0627\u0631\u064a\u062e',
        payment: '\u0627\u0644\u062f\u0641\u0639',
        total: '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a',
        saved: '\u0648\u0641\u0651\u0631\u062a',
        coupon: '\u0643\u0648\u0628\u0648\u0646',
        discount: '\u062e\u0635\u0645',
        shippingCost: '\u062a\u0643\u0644\u0641\u0629 \u0627\u0644\u0634\u062d\u0646',
        shippingAddress: '\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0634\u062d\u0646',
        codesLabel: '\u0627\u0644\u0623\u0643\u0648\u0627\u062f',
        deliveryNotes: '\u0645\u0644\u0627\u062d\u0638\u0627\u062a \u0627\u0644\u062a\u0648\u0635\u064a\u0644',
        email: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        password: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
        transactionHash: '\u0647\u0627\u0634 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0629',
        copyOrderNumber: '\u0646\u0633\u062e \u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628',
        cod: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
        qty: '\u0627\u0644\u0643\u0645\u064a\u0629',
        unknownProduct: '\u0645\u0646\u062a\u062c \u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641',
        subtotal: '\u0627\u0644\u0645\u062c\u0645\u0648\u0639 \u0627\u0644\u0641\u0631\u0639\u064a',
        trackingNumber: '\u0631\u0642\u0645 \u0627\u0644\u062a\u062a\u0628\u0639'
      },
      codes: {
        title: '\u0623\u0643\u0648\u0627\u062f \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643',
        markAllViewed: '\u062a\u062d\u062f\u064a\u062f \u0627\u0644\u062c\u0645\u064a\u0639 \u0643\u0645\u0642\u0631\u0648\u0621',
        noCodes: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0643\u0648\u0627\u062f \u0645\u062a\u0627\u062d\u0629 \u0628\u0639\u062f',
        purchaseHint: '\u0627\u0634\u062a\u0631\u0650 \u0645\u0646\u062a\u062c\u0627\u062a \u062a\u062d\u062a\u0648\u064a \u0639\u0644\u0649 \u0623\u0643\u0648\u0627\u062f \u0631\u0642\u0645\u064a\u0629 \u0644\u0639\u0631\u0636\u0647\u0627 \u0647\u0646\u0627',
        orderNumber: '\u0637\u0644\u0628 #{id}',
        codeCount: '\u0643\u0648\u062f ({count})',
        copied: '\u062a\u0645 \u0646\u0633\u062e \u0627\u0644\u0643\u0648\u062f \u0625\u0644\u0649 \u0627\u0644\u062d\u0627\u0641\u0638\u0629!'
      },
      links: {
        title: '\u0627\u0644\u0631\u0648\u0627\u0628\u0637',
        noLinks: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0631\u0648\u0627\u0628\u0637 \u0645\u062a\u0627\u062d\u0629 \u0628\u0639\u062f',
        purchaseHint: '\u0627\u0634\u062a\u0631\u0650 \u0645\u0646\u062a\u062c\u0627\u062a \u062a\u062d\u062a\u0648\u064a \u0639\u0644\u0649 \u0631\u0648\u0627\u0628\u0637 \u0644\u0639\u0631\u0636\u0647\u0627 \u0647\u0646\u0627',
        orderNumber: '\u0637\u0644\u0628 #{id}',
        linkCount: '\u0631\u0627\u0628\u0637 ({count})',
        link: '\u0631\u0627\u0628\u0637',
        open: '\u0641\u062a\u062d'
      },
      wallet: {
        balance: '\u0631\u0635\u064a\u062f \u0627\u0644\u0645\u062d\u0641\u0638\u0629',
        manageBalance: '\u0623\u062f\u0631 \u0631\u0635\u064a\u062f \u062d\u0633\u0627\u0628\u0643',
        currentBalance: '\u0627\u0644\u0631\u0635\u064a\u062f \u0627\u0644\u062d\u0627\u0644\u064a',
        addFunds: '\u0625\u0636\u0627\u0641\u0629 \u0631\u0635\u064a\u062f',
        history: '\u0627\u0644\u0633\u062c\u0644',
        totalDeposits: '\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0625\u064a\u062f\u0627\u0639\u0627\u062a',
        totalSpent: '\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0625\u0646\u0641\u0627\u0642',
        pending: '\u0642\u064a\u062f \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629',
        recentTransactions: '\u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062a \u0627\u0644\u0623\u062e\u064a\u0631\u0629',
        noTransactions: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0639\u0627\u0645\u0644\u0627\u062a \u0628\u0639\u062f',
        transactionsWillAppear: '\u0633\u064a\u0638\u0647\u0631 \u0633\u062c\u0644 \u0645\u0639\u0627\u0645\u0644\u0627\u062a\u0643 \u0647\u0646\u0627',
        deposit: '\u0625\u064a\u062f\u0627\u0639',
        withdrawal: '\u0633\u062d\u0628',
        adminCredit: '\u0625\u0636\u0627\u0641\u0629 \u0645\u0646 \u0627\u0644\u0625\u062f\u0627\u0631\u0629',
        adminDebit: '\u062e\u0635\u0645 \u0645\u0646 \u0627\u0644\u0625\u062f\u0627\u0631\u0629',
        order: '\u0639\u0645\u0644\u064a\u0629 \u0634\u0631\u0627\u0621',
        refund: '\u0627\u0633\u062a\u0631\u062f\u0627\u062f',
        viewOrderDetails: '\u0639\u0631\u0636 \u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0637\u0644\u0628',
        orderDetailsUnavailable: '\u062a\u0639\u0630\u0631 \u062a\u062d\u0645\u064a\u0644 \u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0622\u0646',
        completed: '\u0645\u0643\u062a\u0645\u0644',
        failed: '\u0641\u0634\u0644',
        cancelled: '\u0645\u0644\u063a\u064a'
      },
      settings: {
        title: '\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u062d\u0633\u0627\u0628',
        firstName: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644',
        lastName: '\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0626\u0644\u0629',
        email: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        emailNote: '\u0644\u0627 \u064a\u0645\u0643\u0646 \u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        phone: '\u0627\u0644\u0647\u0627\u062a\u0641',
        firstNamePlaceholder: '\u0623\u062f\u062e\u0644 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644',
        lastNamePlaceholder: '\u0623\u062f\u062e\u0644 \u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0626\u0644\u0629',
        emailPlaceholder: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        phonePlaceholder: '\u0623\u062f\u062e\u0644 \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641',
        saving: '\u062c\u0627\u0631\u064a \u0627\u0644\u062d\u0641\u0638...',
        preferences: '\u0627\u0644\u062a\u0641\u0636\u064a\u0644\u0627\u062a',
        emailNotifications: '\u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        emailNotificationsDesc: '\u0627\u0633\u062a\u0644\u0645 \u062a\u062d\u062f\u064a\u062b\u0627\u062a \u062d\u0648\u0644 \u0637\u0644\u0628\u0627\u062a\u0643 \u0648\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u062c\u062f\u064a\u062f\u0629',
        marketingCommunications: '\u0627\u0644\u0627\u062a\u0635\u0627\u0644\u0627\u062a \u0627\u0644\u062a\u0633\u0648\u064a\u0642\u064a\u0629',
        marketingCommunicationsDesc: '\u0627\u0633\u062a\u0644\u0645 \u0631\u0633\u0627\u0626\u0644 \u062a\u0631\u0648\u064a\u062c\u064a\u0629 \u0648\u0639\u0631\u0648\u0636 \u062e\u0627\u0635\u0629',
        saveChanges: '\u062d\u0641\u0638 \u0627\u0644\u062a\u063a\u064a\u064a\u0631\u0627\u062a',
        toggleEmailNotifications: '\u062a\u0641\u0639\u064a\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        toggleMarketingCommunications: '\u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u062a\u0633\u0648\u064a\u0642\u064a\u0629',
        security: {
          title: '\u062a\u063a\u064a\u064a\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
          currentPassword: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062d\u0627\u0644\u064a\u0629',
          currentPasswordPlaceholder: '\u0623\u062f\u062e\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062d\u0627\u0644\u064a\u0629',
          newPassword: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062c\u062f\u064a\u062f\u0629',
          newPasswordPlaceholder: '\u0623\u062f\u062e\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062c\u062f\u064a\u062f\u0629',
          confirmPassword: '\u062a\u0623\u0643\u064a\u062f \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062c\u062f\u064a\u062f\u0629',
          confirmPasswordPlaceholder: '\u0623\u0639\u062f \u0625\u062f\u062e\u0627\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062c\u062f\u064a\u062f\u0629',
          hint: '8 \u0623\u062d\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644',
          changeButton: '\u062a\u063a\u064a\u064a\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
          changing: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u063a\u064a\u064a\u0631...',
          success: '\u062a\u0645 \u062a\u063a\u064a\u064a\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0628\u0646\u062c\u0627\u062d!',
          failed: '\u0641\u0634\u0644 \u062a\u063a\u064a\u064a\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
          tooShort: '\u064a\u062c\u0628 \u0623\u0646 \u062a\u0643\u0648\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 8 \u0623\u062d\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644',
          mismatch: '\u0643\u0644\u0645\u062a\u0627 \u0627\u0644\u0645\u0631\u0648\u0631 \u063a\u064a\u0631 \u0645\u062a\u0637\u0627\u0628\u0642\u062a\u064a\u0646'
        }
      },
      toast: {
        success: '\u0646\u062c\u062d!',
        error: '\u062e\u0637\u0623!',
        profileUpdated: '\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a \u0628\u0646\u062c\u0627\u062d!',
        profileUpdateFailed: '\u0641\u0634\u0644 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062e\u0635\u064a',
        allCodesMarkedViewed: '\u062a\u0645 \u062a\u0639\u0644\u064a\u0645 \u0643\u0644 \u0627\u0644\u0623\u0643\u0648\u0627\u062f \u0643\u0645\u0634\u0627\u0647\u062f\u0629',
        failedMarkCodesViewed: '\u0641\u0634\u0644 \u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0623\u0643\u0648\u0627\u062f \u0643\u0645\u0634\u0627\u0647\u062f\u0629',
        allLinksMarkedViewed: '\u062a\u0645 \u062a\u0639\u0644\u064a\u0645 \u0643\u0644 \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0643\u0645\u0634\u0627\u0647\u062f\u0629',
        failedMarkLinksViewed: '\u0641\u0634\u0644 \u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0643\u0645\u0634\u0627\u0647\u062f\u0629',
        allUpdatesRead: '\u062a\u0645 \u062a\u0639\u0644\u064a\u0645 \u0643\u0644 \u0627\u0644\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0643\u0645\u0642\u0631\u0648\u0621\u0629',
        addressUpdated: '\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0628\u0646\u062c\u0627\u062d',
        addressAdded: '\u062a\u0645\u062a \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0628\u0646\u062c\u0627\u062d',
        addressSaveFailed: '\u0641\u0634\u0644 \u062d\u0641\u0638 \u0627\u0644\u0639\u0646\u0648\u0627\u0646',
        addressDeleted: '\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0628\u0646\u062c\u0627\u062d',
        addressDeleteFailed: '\u0641\u0634\u0644 \u062d\u0630\u0641 \u0627\u0644\u0639\u0646\u0648\u0627\u0646',
        defaultAddressSet: '\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a',
        defaultAddressFailed: '\u0641\u0634\u0644 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a',
        logoutFailed: '\u0641\u0634\u0644 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c',
        codesNotMarked: '\u062a\u0639\u0630\u0631 \u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0623\u0643\u0648\u0627\u062f \u0643\u0645\u0634\u0627\u0647\u062f\u0629',
        linksNotMarked: '\u062a\u0639\u0630\u0631 \u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0643\u0645\u0634\u0627\u0647\u062f\u0629'
      },
      addresses: {
        tab: '\u0627\u0644\u0639\u0646\u0627\u0648\u064a\u0646',
        title: '\u0639\u0646\u0627\u0648\u064a\u0646\u064a',
        default: '\u0627\u0641\u062a\u0631\u0627\u0636\u064a',
        deleteTitle: '\u062d\u0630\u0641 \u0627\u0644\u0639\u0646\u0648\u0627\u0646',
        deleteConfirm: '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0639\u0646\u0648\u0627\u0646\u061f',
        delete: '\u062d\u0630\u0641',
        cancel: '\u0625\u0644\u063a\u0627\u0621',
        noAddresses: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0646\u0627\u0648\u064a\u0646 \u0645\u062d\u0641\u0648\u0638\u0629 \u0628\u0639\u062f',
        addNew: '\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0648\u0627\u0646 \u062c\u062f\u064a\u062f',
        edit: '\u062a\u0639\u062f\u064a\u0644',
        fullName: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644',
        fullNamePlaceholder: '\u0623\u062f\u062e\u0644 \u0627\u0633\u0645\u0643 \u0627\u0644\u0643\u0627\u0645\u0644',
        phone: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641',
        country: '\u0627\u0644\u062f\u0648\u0644\u0629',
        selectCountry: '\u0627\u062e\u062a\u0631 \u0627\u0644\u062f\u0648\u0644\u0629',
        region: '\u0627\u0644\u0645\u0646\u0637\u0642\u0629',
        loading: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644...',
        selectRegion: '\u0627\u062e\u062a\u0631 \u0627\u0644\u0645\u0646\u0637\u0642\u0629',
        district: '\u0627\u0644\u062d\u064a',
        districtLabel: '\u0627\u0644\u062d\u064a',
        noDistricts: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u062d\u064a\u0627\u0621 \u0645\u062a\u0627\u062d\u0629',
        selectDistrict: '\u0627\u062e\u062a\u0631 \u0627\u0644\u062d\u064a',
        detailedAddress: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062a\u0641\u0635\u064a\u0644\u064a',
        addressPlaceholder: '\u0623\u062f\u062e\u0644 \u0639\u0646\u0648\u0627\u0646\u0643 \u0627\u0644\u062a\u0641\u0635\u064a\u0644\u064a',
        addressLabel: '\u062a\u0635\u0646\u064a\u0641 \u0627\u0644\u0639\u0646\u0648\u0627\u0646',
        home: '\u0627\u0644\u0645\u0646\u0632\u0644',
        work: '\u0627\u0644\u0639\u0645\u0644',
        other: '\u0622\u062e\u0631',
        setDefault: '\u062a\u0639\u064a\u064a\u0646 \u0643\u0627\u0641\u062a\u0631\u0627\u0636\u064a',
        update: '\u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0639\u0646\u0648\u0627\u0646',
        add: '\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0639\u0646\u0648\u0627\u0646',
        editTitle: '\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0639\u0646\u0648\u0627\u0646'
      },
      shipping: {
        tab: '\u0627\u0644\u0634\u062d\u0646',
        title: '\u0634\u062d\u0646\u0627\u062a\u064a',
        markAsRead: '\u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0643\u0644 \u0643\u0645\u0642\u0631\u0648\u0621',
        noShipments: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0634\u062d\u0646\u0627\u062a \u0628\u0639\u062f',
        trackLabel: '\u062a\u062a\u0628\u0639',
        copyTrackingNumber: '\u0646\u0633\u062e \u0631\u0642\u0645 \u0627\u0644\u062a\u062a\u0628\u0639',
        statuses: {
          delivered: '\u062a\u0645 \u0627\u0644\u062a\u0648\u0635\u064a\u0644',
          shipped: '\u062a\u0645 \u0627\u0644\u0634\u062d\u0646',
          inTransit: '\u0641\u064a \u0627\u0644\u0637\u0631\u064a\u0642',
          outForDelivery: '\u062e\u0631\u062c \u0644\u0644\u062a\u0648\u0635\u064a\u0644',
          processing: '\u0642\u064a\u062f \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629',
          deliveryFailed: '\u0641\u0634\u0644 \u0627\u0644\u062a\u0648\u0635\u064a\u0644',
          returnedFull: '\u0645\u0631\u062a\u062c\u0639 \u0625\u0644\u0649 \u0627\u0644\u0645\u0631\u0633\u0644',
          returned: '\u0645\u0631\u062a\u062c\u0639',
          failed: '\u0641\u0634\u0644'
        },
        progressSteps: {
          'new': '\u062c\u062f\u064a\u062f',
          prep: '\u062a\u062c\u0647\u064a\u0632',
          ship: '\u062a\u0645 \u0627\u0644\u0634\u062d\u0646',
          done: '\u062a\u0645 \u0627\u0644\u062a\u0648\u0635\u064a\u0644'
        },
        notifications: {
          title: '\u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0627\u0644\u0634\u062d\u0646',
          badge: '\u062c\u062f\u064a\u062f',
          active: '\u0646\u0634\u0637',
          toggle: '\u062a\u0628\u062f\u064a\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a',
          enabled: '\u062a\u0645 \u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a',
          disabled: '\u062a\u0645 \u0625\u064a\u0642\u0627\u0641 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a'
        }
      },
      notes: {
        title: '\u0627\u0644\u0645\u0644\u0627\u062d\u0638\u0627\u062a',
        order: '\u0637\u0644\u0628',
        noNotes: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0644\u0627\u062d\u0638\u0627\u062a \u0628\u0639\u062f',
        markUpdatesRead: '\u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0643\u0645\u0642\u0631\u0648\u0621\u0629'
      }
    },

    // Footer
    footer: {
      getItOn: '\u0627\u062d\u0635\u0644 \u0639\u0644\u064a\u0647 \u0639\u0644\u0649',
      downloadOn: '\u062d\u0645\u0651\u0644 \u0645\u0646',
      terahPowered: '\u0645\u062f\u0639\u0648\u0645 \u0628\u0648\u0627\u0633\u0637\u0629 \u062a\u064a\u0631\u0627\u0647',
      terahLinkAria: '\u062e\u0644\u064a\u062c \u0628\u0644\u0627\u064a',
      noLinkSet: '\u0644\u0645 \u064a\u062a\u0645 \u062a\u062d\u062f\u064a\u062f \u0631\u0627\u0628\u0637',
      companyTitle: '\u0627\u0644\u0634\u0631\u0643\u0629',
      supportTitle: '\u0627\u0644\u062f\u0639\u0645',
      rights: '\u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629',
      community: '\u0627\u0644\u0645\u062c\u062a\u0645\u0639',
      contactShort: '\u062a\u0648\u0627\u0635\u0644',
      backToTop: '\u0644\u0644\u0623\u0639\u0644\u0649',
      craftedWith: '\u0635\u064f\u0646\u0639 \u0628\u0640',
      joinSquad: '\u0627\u0646\u0636\u0645 \u0625\u0644\u064a\u0646\u0627',
      levelUp: '\u0627\u0628\u062f\u0623 \u0627\u0644\u0644\u0639\u0628',
      pressStart: '\u0627\u0628\u062f\u0623 \u0627\u0644\u0622\u0646',
      helpCenter: '\u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629',
      supportCenter: '\u0645\u0631\u0643\u0632 \u0627\u0644\u062f\u0639\u0645',
      contactLabel: '\u0627\u062a\u0635\u0644 \u0628\u0646\u0627',
      getInTouch: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',
      shippingPolicy: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u0634\u062d\u0646',
      deliveryInfo: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0648\u0635\u064a\u0644',
      returnPolicy: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
      easyReturns: '\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u062e\u0644\u0627\u0644 14 \u064a\u0648\u0645',
      digitalGuaranteeLabel: '\u0636\u0645\u0627\u0646 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
      digitalGuaranteeDesc: '\u0636\u0645\u0627\u0646 14 \u064a\u0648\u0645 \u0644\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629',
      aboutUs: '\u0645\u0646 \u0646\u062d\u0646',
      aboutDesc: '\u0642\u0635\u062a\u0646\u0627 \u0648\u0631\u0633\u0627\u0644\u062a\u0646\u0627',
      privacyPolicy: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629',
      privacyDesc: '\u062e\u0635\u0648\u0635\u064a\u062a\u0643 \u0645\u0647\u0645\u0629',
      termsOfService: '\u0634\u0631\u0648\u0637 \u0627\u0644\u062e\u062f\u0645\u0629',
      termsDesc: '\u0634\u0631\u0648\u0637 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645',
      stats: [
        { key: 'activeUsers', label: '\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u0648\u0646 \u0627\u0644\u0646\u0634\u0637\u0648\u0646', value: '10,000+' },
        { key: 'products', label: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a', value: '50+' },
        { key: 'successRate', label: '\u0646\u0633\u0628\u0629 \u0627\u0644\u0646\u062c\u0627\u062d', value: '99.9%' },
        { key: 'projects', label: '\u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639', value: '200+' }
      ],
      sections: [
        {
          key: 'company',
          title: '\u0627\u0644\u0634\u0631\u0643\u0629',
          links: [
            { key: 'about', label: '\u0645\u0646 \u0646\u062d\u0646', description: '\u0642\u0635\u062a\u0646\u0627 \u0648\u0631\u0633\u0627\u0644\u062a\u0646\u0627', href: '/about' },
            { key: 'contact', label: '\u0627\u062a\u0635\u0644 \u0628\u0646\u0627', description: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627', href: '/contact' },
            { key: 'privacy', label: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629', description: '\u062e\u0635\u0648\u0635\u064a\u062a\u0643 \u0645\u0647\u0645\u0629 \u0644\u0646\u0627', href: '/privacy' },
            { key: 'terms', label: '\u0634\u0631\u0648\u0637 \u0627\u0644\u062e\u062f\u0645\u0629', description: '\u0634\u0631\u0648\u0637 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645', href: '/terms' }
          ]
        },
        {
          key: 'support',
          title: '\u0627\u0644\u062f\u0639\u0645',
          links: [
            { key: 'help', label: '\u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629', description: '\u0645\u0631\u0643\u0632 \u0627\u0644\u062f\u0639\u0645', href: '/help' }
          ]
        }
      ],
      bottom: {
        rights: '\u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629.',
        madeWith: '\u0635\u064f\u0646\u0639 \u0628\u0640',
        byTeam: '\u0628\u0648\u0627\u0633\u0637\u0629',
        teamSuffix: '\u0641\u0631\u064a\u0642',
        scrollTop: '\u0627\u0644\u062a\u0645\u0631\u064a\u0631 \u0625\u0644\u0649 \u0627\u0644\u0623\u0639\u0644\u0649',
        features: [
          { key: 'secure', label: '\u0622\u0645\u0646', color: '#22d3ee' },
          { key: 'fast', label: '\u0633\u0631\u064a\u0639', color: '#fbbf24' },
          { key: 'premium', label: '\u0627\u062d\u062a\u0631\u0627\u0641\u064a', color: '#e879f9' }
        ]
      }
    },

    // Language
    language: '\u0627\u0644\u0644\u063a\u0629',
    english: '\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629',
    arabic: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629',
    switchLanguage: '\u062a\u0628\u062f\u064a\u0644 \u0627\u0644\u0644\u063a\u0629',

    // 404 Page
    loadingProduct: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0646\u062a\u062c...',
    notFoundPage: {
      title: '\u0627\u0644\u0635\u0641\u062d\u0629 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f\u0629',
      description: '\u0639\u0630\u0631\u064b\u0627\u060c \u0644\u0645 \u0646\u062a\u0645\u0643\u0646 \u0645\u0646 \u0627\u0644\u0639\u062b\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u062a\u064a \u062a\u0628\u062d\u062b \u0639\u0646\u0647\u0627. \u0631\u0628\u0645\u0627 \u062a\u0645\u062a \u0625\u0632\u0627\u0644\u062a\u0647\u0627 \u0623\u0648 \u0623\u0646 \u0627\u0644\u0631\u0627\u0628\u0637 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d.',
      backToHome: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
      browseProducts: '\u062a\u0635\u0641\u062d \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      goBack: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629'
    },

    // Error Page
    errorPage: {
      title: '\u062d\u062f\u062b \u062e\u0637\u0623 \u063a\u064a\u0631 \u0645\u062a\u0648\u0642\u0639',
      description: '\u0648\u0627\u062c\u0647\u0646\u0627 \u0645\u0634\u0643\u0644\u0629 \u0623\u062b\u0646\u0627\u0621 \u062a\u062d\u0645\u064a\u0644 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629. \u0644\u0627 \u062a\u0642\u0644\u0642\u060c \u064a\u0645\u0643\u0646\u0643 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0623\u0648 \u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629.',
      tryAgain: '\u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649',
      backHome: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
      support: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062f\u0639\u0645',
      persistMsg: '\u0625\u0630\u0627 \u0627\u0633\u062a\u0645\u0631\u062a \u0627\u0644\u0645\u0634\u0643\u0644\u0629\u060c \u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0648\u0633\u0646\u0633\u0627\u0639\u062f\u0643 \u0641\u0648\u0631\u0627\u064b',
      statusLabel: '\u062e\u0637\u0623 \u063a\u064a\u0631 \u0645\u062a\u0648\u0642\u0639',
      errorIdLabel: '\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u062e\u0637\u0623',
      copyId: '\u0646\u0633\u062e',
      copied: '\u062a\u0645 \u0627\u0644\u0646\u0633\u062e',
      technicalDetails: '\u062a\u0641\u0627\u0635\u064a\u0644 \u062a\u0642\u0646\u064a\u0629',
      hideDetails: '\u0625\u062e\u0641\u0627\u0621 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644',
      reassurance: '\u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u0645\u062d\u0641\u0648\u0638\u0629 \u0648\u062c\u0644\u0633\u062a\u0643 \u0645\u0633\u062a\u0645\u0631\u0629 \u0628\u0623\u0645\u0627\u0646.'
    },

    // Cart Toast
    cartToast: {
      addedToCart: '\u062a\u0645\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629',
      removedFromCart: '\u062a\u0645\u062a \u0627\u0644\u0625\u0632\u0627\u0644\u0629 \u0645\u0646 \u0627\u0644\u0633\u0644\u0629',
      cartUpdated: '\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0633\u0644\u0629',
      error: '\u062d\u062f\u062b \u062e\u0637\u0623'
    },

    // Cart Changes Modal
    cartChangesModal: {
      title: '\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0627\u0644\u0633\u0644\u0629',
      description: '\u062d\u062f\u062b\u062a \u062a\u063a\u064a\u064a\u0631\u0627\u062a \u0639\u0644\u0649 \u0628\u0639\u0636 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0641\u064a \u0633\u0644\u062a\u0643',
      updatedMessage: '\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0633\u0644\u062a\u0643 \u0628\u0623\u062d\u062f\u062b \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a',
      continue: '\u0645\u062a\u0627\u0628\u0639\u0629',
      summary: {
        blockingAndPrice: '\u0631\u0627\u062c\u0639\u0646\u0627 \u0627\u0644\u0633\u0644\u0629 \u0648\u062d\u062f\u0651\u062b\u0646\u0627 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u063a\u064a\u0631 \u0627\u0644\u0645\u062a\u0627\u062d\u0629 \u0648\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0642\u0628\u0644 \u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629.',
        blocking: '\u0628\u0639\u0636 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0644\u0645 \u062a\u0639\u062f \u0645\u062a\u0627\u062d\u0629 \u0623\u0648 \u062e\u0631\u062c\u062a \u0645\u0646 \u0627\u0644\u0645\u062e\u0632\u0648\u0646\u060c \u0644\u0630\u0644\u0643 \u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0633\u0644\u0629 \u062a\u0644\u0642\u0627\u0626\u064a\u064b\u0627.',
        quantity: '\u062a\u0645\u062a \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0643\u0645\u064a\u0627\u062a \u0627\u0644\u0645\u062a\u0627\u062d\u0629 \u0641\u064a \u0627\u0644\u0633\u0644\u0629 \u0628\u0646\u0627\u0621\u064b \u0639\u0644\u0649 \u0627\u0644\u0645\u062e\u0632\u0648\u0646 \u0627\u0644\u062d\u0627\u0644\u064a.',
        defaultDescription: '\u062a\u0645\u062a \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0633\u0644\u0629 \u0645\u0639 \u0623\u062d\u062f\u062b \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0648\u0627\u0644\u062a\u0648\u0627\u0641\u0631 \u0642\u0628\u0644 \u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u0637\u0644\u0628.'
      },
      changes: {
        removed: '\u062a\u0645\u062a \u0625\u0632\u0627\u0644\u0629 \u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u062a\u062c \u0645\u0646 \u0633\u0644\u062a\u0643',
        unavailable: '\u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u062a\u062c \u0644\u0645 \u064a\u0639\u062f \u0645\u062a\u0627\u062d\u064b\u0627',
        priceChange: '\u062a\u063a\u064a\u0631 \u0627\u0644\u0633\u0639\u0631',
        stockWarning: '\u062a\u062d\u0630\u064a\u0631 \u0645\u0646 \u0627\u0646\u062e\u0641\u0627\u0636 \u0627\u0644\u0645\u062e\u0632\u0648\u0646',
        outOfStock: '\u0646\u0641\u062f \u0645\u0646 \u0627\u0644\u0645\u062e\u0632\u0648\u0646',
        quantityReduced: '\u062a\u0645 \u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0643\u0645\u064a\u0629',
        reducedFrom: '\u062a\u0645 \u0627\u0644\u062a\u0642\u0644\u064a\u0644 \u0645\u0646 {requested} \u0625\u0644\u0649 {available} \u0642\u0637\u0639\u0629'
      },
      labels: {
        product: '\u0645\u0646\u062a\u062c',
        removed: '\u062a\u0645\u062a \u0627\u0644\u0625\u0632\u0627\u0644\u0629',
        unavailable: '\u063a\u064a\u0631 \u0645\u062a\u0627\u062d',
        outOfStock: '\u0646\u0641\u062f \u0627\u0644\u0645\u062e\u0632\u0648\u0646',
        lowStock: '\u0645\u062e\u0632\u0648\u0646 \u0645\u062d\u062f\u0648\u062f',
        quantityUpdated: '\u062a\u0645 \u062a\u0642\u0644\u064a\u0644 \u0627\u0644\u0643\u0645\u064a\u0629',
        priceDecreased: '\u0627\u0644\u0633\u0639\u0631 \u0627\u0646\u062e\u0641\u0636',
        priceIncreased: '\u0627\u0644\u0633\u0639\u0631 \u0627\u0631\u062a\u0641\u0639',
        updated: '\u062a\u0645 \u0627\u0644\u062a\u062d\u062f\u064a\u062b',
        requested: '\u0627\u0644\u0645\u0637\u0644\u0648\u0628',
        available: '\u0627\u0644\u0645\u062a\u0627\u062d',
        updates: '\u062a\u062d\u062f\u064a\u062b',
        needsReview: '\u064a\u062a\u0637\u0644\u0628 \u0645\u0631\u0627\u062c\u0639\u0629',
        unavailableItems: '\u0639\u0646\u0627\u0635\u0631 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629',
        quantityUpdates: '\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0643\u0645\u064a\u0629',
        priceChanges: '\u062a\u062d\u062f\u064a\u062b\u0627\u062a \u0633\u0639\u0631',
        close: '\u0625\u063a\u0644\u0627\u0642',
        previousPrice: '\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0633\u0627\u0628\u0642',
        currentPrice: '\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u062d\u0627\u0644\u064a',
        footerUpdatedMessage: '\u062a\u0645 \u062d\u0641\u0638 \u0623\u062d\u062f\u062b \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u062f\u0627\u062e\u0644 \u0627\u0644\u0633\u0644\u0629 \u062d\u062a\u0649 \u062a\u0643\u0645\u0644 \u0627\u0644\u0637\u0644\u0628 \u0639\u0644\u0649 \u0628\u064a\u0627\u0646\u0627\u062a \u0635\u062d\u064a\u062d\u0629.'
      }
    },

    // Kashier Payment
    kashierPayment: {
      loadingOptions: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u062e\u064a\u0627\u0631\u0627\u062a \u0627\u0644\u062f\u0641\u0639...',
      paymentError: '\u062e\u0637\u0623 \u0641\u064a \u0627\u0644\u062f\u0641\u0639',
      securePayment: '\u062f\u0641\u0639 \u0622\u0645\u0646',
      poweredByKashier: '\u0645\u062f\u0639\u0648\u0645 \u0645\u0646 Kashier',
      applePay: '\u0623\u0628\u0644 \u0628\u0627\u064a',
      loadingPaymentPage: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0635\u0641\u062d\u0629 \u0627\u0644\u062f\u0641\u0639...',
      pleaseWait: '\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631',
      securedByKashier: '\u0645\u062d\u0645\u064a \u0648\u0645\u0634\u0641\u0631 \u0628\u0648\u0627\u0633\u0637\u0629 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062f\u0641\u0639 Kashier',
      securedByApplePay: '\u0645\u062d\u0645\u064a \u0628\u0648\u0627\u0633\u0637\u0629 Apple Pay \u0648 Kashier',
      initializingApplePay: '\u062c\u0627\u0631\u064a \u062a\u0647\u064a\u0626\u0629 Apple Pay...',
      failedToLoadPaymentPage: '\u0641\u0634\u0644 \u062a\u062d\u0645\u064a\u0644 \u0635\u0641\u062d\u0629 \u0627\u0644\u062f\u0641\u0639',
      failedToLoadConfig: '\u0641\u0634\u0644 \u062a\u062d\u0645\u064a\u0644 \u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u062f\u0641\u0639',
      failedToInitialize: '\u0641\u0634\u0644 \u062a\u0647\u064a\u0626\u0629 \u0627\u0644\u062f\u0641\u0639',
      applePayNotAvailable: 'Apple Pay \u063a\u064a\u0631 \u0645\u062a\u0627\u062d \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062c\u0647\u0627\u0632',
      failedToCreateApplePaySession: '\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u062c\u0644\u0633\u0629 Apple Pay',
      failedToInitializeApplePay: '\u0641\u0634\u0644 \u062a\u0647\u064a\u0626\u0629 Apple Pay',
      failedToLoadKashierSDK: '\u0641\u0634\u0644 \u062a\u062d\u0645\u064a\u0644 Kashier SDK',
      applePayFailed: '\u0641\u0634\u0644 \u0627\u0644\u062f\u0641\u0639 \u0628\u0640 Apple Pay'
    },

    // Paymob Payment Component
    paymobPayment: {
      loadingOptions: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u062e\u064a\u0627\u0631\u0627\u062a \u0627\u0644\u062f\u0641\u0639...',
      paymentError: '\u062e\u0637\u0623 \u0641\u064a \u0627\u0644\u062f\u0641\u0639',
      securePayment: '\u062f\u0641\u0639 \u0622\u0645\u0646',
      poweredByPaymob: '\u0645\u062f\u0639\u0648\u0645 \u0645\u0646 Paymob',
      loadingPaymentPage: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0635\u0641\u062d\u0629 \u0627\u0644\u062f\u0641\u0639...',
      pleaseWait: '\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631',
      securedByPaymob: '\u0645\u062d\u0645\u064a \u0648\u0645\u0634\u0641\u0631 \u0628\u0648\u0627\u0633\u0637\u0629 \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062f\u0641\u0639 Paymob',
      retry: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629',
      tryAgain: '\u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649',
      takingLonger: '\u064a\u0633\u062a\u063a\u0631\u0642 \u0647\u0630\u0627 \u0648\u0642\u062a\u0627\u064b \u0623\u0637\u0648\u0644 \u0645\u0646 \u0627\u0644\u0645\u062a\u0648\u0642\u0639...',
      slowConnection: '\u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0637\u064a\u0621...',
      paymentFailed: '\u0641\u0634\u0644 \u0627\u0644\u062f\u0641\u0639',
      failedToInitialize: '\u0641\u0634\u0644 \u062a\u0647\u064a\u0626\u0629 \u0627\u0644\u062f\u0641\u0639',
      failedToLoadPaymentPage: '\u0641\u0634\u0644 \u062a\u062d\u0645\u064a\u0644 \u0635\u0641\u062d\u0629 \u0627\u0644\u062f\u0641\u0639'
    },

    // Kashier Payment Page
    kashierPaymentPage: {
      loadingPayment: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u062f\u0641\u0639...',
      pleaseWaitPreparing: '\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631 \u0628\u064a\u0646\u0645\u0627 \u0646\u0642\u0648\u0645 \u0628\u062a\u062d\u0636\u064a\u0631 \u0627\u0644\u062f\u0641\u0639',
      paymentError: '\u062e\u0637\u0623 \u0641\u064a \u0627\u0644\u062f\u0641\u0639',
      invalidPaymentRequest: '\u0637\u0644\u0628 \u062f\u0641\u0639 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      backToCheckout: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u062f\u0641\u0639',
      completeYourPayment: '\u0623\u0643\u0645\u0644 \u0627\u0644\u062f\u0641\u0639',
      orderNumber: '\u0627\u0644\u0637\u0644\u0628 #',
      amount: '\u0627\u0644\u0645\u0628\u0644\u063a:',
      orderSummary: '\u0645\u0644\u062e\u0635 \u0627\u0644\u0637\u0644\u0628',
      orderNumber2: '\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628:',
      items: '\u0627\u0644\u0639\u0646\u0627\u0635\u0631:',
      products: '\u0645\u0646\u062a\u062c(\u0645\u0646\u062a\u062c\u0627\u062a)',
      totalAmount: '\u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a:',
      securePayment: '\u062f\u0641\u0639 \u0622\u0645\u0646',
      securePaymentDescription: '\u062a\u062a\u0645 \u0645\u0639\u0627\u0644\u062c\u0629 \u062f\u0641\u0639\u062a\u0643 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646 \u0645\u0646 \u062e\u0644\u0627\u0644 Kashier. \u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062a \u0645\u0634\u0641\u0631\u0629 \u0648\u0645\u062a\u0648\u0627\u0641\u0642\u0629 \u0645\u0639 PCI DSS.',
      needHelp: '\u0647\u0644 \u062a\u062d\u062a\u0627\u062c \u0645\u0633\u0627\u0639\u062f\u0629\u061f',
      contactSupport: '\u0627\u062a\u0635\u0644 \u0628\u0627\u0644\u062f\u0639\u0645',
      paymentPageLanguage: '\u0644\u063a\u0629 \u0635\u0641\u062d\u0629 \u0627\u0644\u062f\u0641\u0639',
      paymentLang: '\u0644\u063a\u0629 \u0627\u0644\u062f\u0641\u0639:'
    },

    // Paymob Payment Page
    paymobPaymentPage: {
      paymobPayment: '\u062f\u0641\u0639 Paymob',
      chooseMethod: '\u0627\u062e\u062a\u0631 \u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0645\u0641\u0636\u0644\u0629 \u0644\u062f\u064a\u0643',
      back: '\u0631\u062c\u0648\u0639',
      orderSummary: '\u0645\u0644\u062e\u0635 \u0627\u0644\u0637\u0644\u0628',
      orderId: '\u0645\u0639\u0631\u0641 \u0627\u0644\u0637\u0644\u0628:',
      amount: '\u0627\u0644\u0645\u0628\u0644\u063a:',
      loadingMethods: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0637\u0631\u0642 \u0627\u0644\u062f\u0641\u0639...',
      selectPaymentMethod: '\u0627\u062e\u062a\u0631 \u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639',
      noMethodsAvailable: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0637\u0631\u0642 \u062f\u0641\u0639 \u0645\u062a\u0627\u062d\u0629',
      noMethodsConfigured: '\u0644\u0645 \u064a\u062a\u0645 \u062a\u0643\u0648\u064a\u0646 \u0637\u0631\u0642 \u062f\u0641\u0639 Paymob\u200e \u0628\u0639\u062f. \u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0627\u0644\u062f\u0639\u0645.',
      chooseDifferentMethod: '\u0627\u062e\u062a\u0631 \u0637\u0631\u064a\u0642\u0629 \u0623\u062e\u0631\u0649',
      proceedToPayment: '\u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0644\u0644\u062f\u0641\u0639',
      processing: '\u062c\u0627\u0631\u064a \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629...',
      securedByPaymob: '\u0645\u062d\u0645\u064a \u0628\u0648\u0627\u0633\u0637\u0629 Paymob (\u0628\u0648\u0627\u0628\u0629 Accept \u0644\u0644\u062f\u0641\u0639)',
      paymentInformation: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062f\u0641\u0639',
      paymentInfoDescription: '\u0633\u064a\u062a\u0645 \u0625\u0639\u0627\u062f\u0629 \u062a\u0648\u062c\u064a\u0647\u0643 \u0625\u0644\u0649 \u0635\u0641\u062d\u0629 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0622\u0645\u0646\u0629 \u0644\u0640 Paymob\u200e \u0644\u0625\u0643\u0645\u0627\u0644 \u0645\u0639\u0627\u0645\u0644\u062a\u0643. \u062c\u0645\u064a\u0639 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u0645\u0634\u0641\u0631\u0629 \u0648\u064a\u062a\u0645 \u0645\u0639\u0627\u0644\u062c\u062a\u0647\u0627 \u0628\u0634\u0643\u0644 \u0622\u0645\u0646.',
      invalidRequest: '\u0637\u0644\u0628 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d',
      orderIdMissing: '\u0645\u0639\u0631\u0641 \u0627\u0644\u0637\u0644\u0628 \u0645\u0641\u0642\u0648\u062f',
      backToCheckout: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u062f\u0641\u0639',
      tryAgain: '\u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649',
      loading: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644...'
    },

    // Crypto Payment Page
    cryptoPaymentPage: {
      loading: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u062f\u0641\u0639...',
      selectCryptocurrency: '\u0627\u062e\u062a\u0631 \u0627\u0644\u0639\u0645\u0644\u0629 \u0627\u0644\u0631\u0642\u0645\u064a\u0629',
      choosePreferredMethod: '\u0627\u062e\u062a\u0631 \u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0645\u0641\u0636\u0644\u0629 \u0644\u062f\u064a\u0643',
      loadingCryptocurrencies: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0627\u0644\u0645\u062a\u0627\u062d\u0629...',
      noCryptocurrencies: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0645\u0644\u0627\u062a \u0631\u0642\u0645\u064a\u0629 \u0645\u062a\u0627\u062d\u0629. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      retry: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629',
      creatingPayment: '\u062c\u0627\u0631\u064a \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062f\u0641\u0639...',
      paymentDetails: '\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u062f\u0641\u0639',
      amountToPay: '\u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062f\u0641\u0639\u0647',
      paymentAddress: '\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062f\u0641\u0639',
      copyAddress: '\u0646\u0633\u062e \u0627\u0644\u0639\u0646\u0648\u0627\u0646',
      copyAmount: '\u0646\u0633\u062e \u0627\u0644\u0645\u0628\u0644\u063a',
      copied: '\u062a\u0645 \u0627\u0644\u0646\u0633\u062e!',
      timeRemaining: '\u0627\u0644\u0648\u0642\u062a \u0627\u0644\u0645\u062a\u0628\u0642\u064a',
      checkingStatus: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062d\u0627\u0644\u0629...',
      checkStatus: '\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062d\u0627\u0644\u0629',
      statusUpdatesAuto: '\u064a\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u062d\u0627\u0644\u0629 \u062a\u0644\u0642\u0627\u0626\u064a\u0627\u064b \u0643\u0644 3 \u062b\u0648\u0627\u0646\u064d',
      paymentError: '\u062e\u0637\u0623 \u0641\u064a \u0627\u0644\u062f\u0641\u0639',
      backToCheckout: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u062f\u0641\u0639',
      sendExactAmount: '\u0623\u0631\u0633\u0644 \u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u062f\u0642\u064a\u0642 \u0625\u0644\u0649 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0623\u0639\u0644\u0627\u0647',
      minimumAmount: '\u0627\u0644\u062d\u062f \u0627\u0644\u0623\u062f\u0646\u0649',
      amountTooLow: '\u0627\u0644\u0645\u0628\u0644\u063a \u0623\u0642\u0644 \u0645\u0646 \u0627\u0644\u062d\u062f \u0627\u0644\u0623\u062f\u0646\u0649 \u0644\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u0629 \u0627\u0644\u0631\u0642\u0645\u064a\u0629',
      allCurrenciesLocked: '\u0645\u0628\u0644\u063a \u0627\u0644\u0637\u0644\u0628 \u0623\u0642\u0644 \u0645\u0646 \u0627\u0644\u062d\u062f \u0627\u0644\u0623\u062f\u0646\u0649 \u0644\u062c\u0645\u064a\u0639 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0627\u0644\u0645\u062a\u0627\u062d\u0629',
      testModeWarning: '\u0648\u0636\u0639 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 - \u0644\u0646 \u064a\u062a\u0645 \u062a\u062d\u0648\u064a\u0644 \u0623\u0645\u0648\u0627\u0644 \u062d\u0642\u064a\u0642\u064a\u0629',
      securedBy: '\u0645\u062d\u0645\u064a \u0628\u0648\u0627\u0633\u0637\u0629 NOWPayments'
    },

    // Auth Page
    authPage: {
      welcomeBack: '\u0645\u0631\u062d\u0628\u064b\u0627 \u0628\u0639\u0648\u062f\u062a\u0643 \u0625\u0644\u0649 {siteName}',
      createYourAccount: '\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628\u0643',
      signIn: '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644',
      signUp: '\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628',
      createAccount: '\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628',
      alreadyHaveAccount: '\u0647\u0644 \u0644\u062f\u064a\u0643 \u062d\u0633\u0627\u0628\u061f',
      dontHaveAccount: '\u0644\u064a\u0633 \u0644\u062f\u064a\u0643 \u062d\u0633\u0627\u0628\u061f',
      forgotPassword: '\u0646\u0633\u064a\u062a \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631\u061f',
      
      // Form Fields
      firstName: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644',
      lastName: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u062e\u064a\u0631',
      email: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
      password: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
      confirmPassword: '\u062a\u0623\u0643\u064a\u062f \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
      required: '*',
      
      // Placeholders
      firstNamePlaceholder: '\u0623\u062d\u0645\u062f',
      lastNamePlaceholder: '\u0645\u062d\u0645\u062f',
      emailPlaceholder: 'your@email.com',
      passwordPlaceholder: '\u0623\u062f\u062e\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
      createPasswordPlaceholder: '\u0625\u0646\u0634\u0627\u0621 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631',
      confirmPasswordPlaceholder: '\u062a\u0623\u0643\u064a\u062f \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
      
      // Validation Messages
      emailRequired: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0645\u0637\u0644\u0648\u0628',
      emailInvalid: '\u0635\u064a\u063a\u0629 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u063a\u064a\u0631 \u0635\u062d\u064a\u062d\u0629',
      passwordRequired: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u0637\u0644\u0648\u0628\u0629',
      passwordMinLength: '\u064a\u062c\u0628 \u0623\u0646 \u062a\u0643\u0648\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 8 \u0623\u062d\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644',
      passwordRequirements: '\u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 8 \u0623\u062d\u0631\u0641 \u062a\u062d\u062a\u0648\u064a \u0639\u0644\u0649 \u0623\u062d\u0631\u0641 \u0643\u0628\u064a\u0631\u0629 \u0648\u0635\u063a\u064a\u0631\u0629 \u0648\u0623\u0631\u0642\u0627\u0645',
      firstNameRequired: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 \u0645\u0637\u0644\u0648\u0628',
      lastNameRequired: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u062e\u064a\u0631 \u0645\u0637\u0644\u0648\u0628',
      passwordsDoNotMatch: '\u0643\u0644\u0645\u0627\u062a \u0627\u0644\u0645\u0631\u0648\u0631 \u063a\u064a\u0631 \u0645\u062a\u0637\u0627\u0628\u0642\u0629',
      
      // Success Messages
      loginSuccessful: '\u062a\u0645 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u0646\u062c\u0627\u062d! \u062c\u0627\u0631\u064d \u0627\u0644\u062a\u062d\u0648\u064a\u0644...',
      
      // Error Messages
      unexpectedError: '\u062d\u062f\u062b \u062e\u0637\u0623 \u063a\u064a\u0631 \u0645\u062a\u0648\u0642\u0639',
      verifyYourEmail: '\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
      verify: '\u062a\u0623\u0643\u064a\u062f',
      skipVerify: '\u062a\u062e\u0637\u064a \u0627\u0644\u0622\u0646 \u0648\u0627\u0644\u062a\u0623\u0643\u064a\u062f \u0644\u0627\u062d\u0642\u0627\u064b',
      phoneLabel: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641',
      phonePlaceholder: '\u0645\u062b\u0627\u0644: 501234567'
    },

    // Checkout Page
    checkoutPage: {
      // Empty Cart
      emptyCartTitle: '\u0633\u0644\u0629 \u0627\u0644\u062a\u0633\u0648\u0642 \u0641\u0627\u0631\u063a\u0629',
      emptyCartDescription: '\u0623\u0636\u0641 \u0628\u0639\u0636 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u0634\u0631\u0627\u0621',
      browseProducts: '\u062a\u0635\u0641\u062d \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      loadingPayment: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0635\u0641\u062d\u0629 \u0627\u0644\u062f\u0641\u0639\u2026',

      // Customer Info
      customerInformation: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0639\u0645\u064a\u0644',
      firstName: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644',
      lastName: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u062e\u064a\u0631',
      email: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
      firstNamePlaceholder: '\u0623\u062d\u0645\u062f',
      lastNamePlaceholder: '\u0645\u062d\u0645\u062f',
      emailPlaceholder: 'ahmed@example.com',
      required: '*',
      loginPrompt: '\u064a\u0631\u062c\u0649 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0625\u0644\u0649 \u062d\u0633\u0627\u0628\u0643 \u0623\u0648 \u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0643\u0632\u0627\u0626\u0631 \u0644\u0625\u0643\u0645\u0627\u0644 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u0634\u0631\u0627\u0621',
      loginButton: '\u0625\u0646\u0634\u0627\u0621 / \u062a\u0633\u062c\u064a\u0644 \u062f\u062e\u0648\u0644',
      guestButton: '\u0645\u062a\u0627\u0628\u0639\u0629 \u0643\u0632\u0627\u0626\u0631',
      backToOptions: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u062e\u064a\u0627\u0631\u0627\u062a \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644',
      createAccountTip: '\u0623\u0646\u0634\u0626 \u062d\u0633\u0627\u0628\u064b\u0627 \u0644\u062a\u062a\u0628\u0639 \u0637\u0644\u0628\u0627\u062a\u0643 \u0648\u062d\u0641\u0638 \u0645\u0639\u0644\u0648\u0645\u0627\u062a\u0643 \u0648\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0639\u0631\u0648\u0636 \u062d\u0635\u0631\u064a\u0629!',
      tipLabel: '\u0646\u0635\u064a\u062d\u0629:',
      
      // Order Type
      
      // Payment Methods
      paymentMethod: '\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639',
      cryptocurrency: '\u0627\u0644\u062f\u0641\u0639 \u0628\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629',
      cryptocurrencyMore: '\u0627\u0644\u0645\u0632\u064a\u062f',
      payWithCard: '\u0628\u0637\u0627\u0642\u0627\u062a \u0627\u0644\u0627\u0626\u062a\u0645\u0627\u0646/\u0627\u0644\u062e\u0635\u0645',
      applePay: '\u0623\u0628\u0644 \u0628\u0627\u064a',
      applePayPaymob: '\u0623\u0628\u0644 \u0628\u0627\u064a (\u0628\u0627\u064a \u0645\u0648\u0628)',
      applePayDescription: '\u062f\u0641\u0639 \u0633\u0631\u064a\u0639 \u0648\u0622\u0645\u0646 \u0639\u0628\u0631 Apple Pay',
      applePayPaymobDescription: '\u0633\u0631\u064a\u0639 \u0648\u0622\u0645\u0646 \u0645\u0639 Apple Pay',
      creditDebitCards: '\u0628\u0637\u0627\u0642\u0627\u062a \u0627\u0644\u0627\u0626\u062a\u0645\u0627\u0646/\u0627\u0644\u062e\u0635\u0645',
      creditDebitCardsVisa: '\u0641\u064a\u0632\u0627',
      creditDebitCardsMaster: '\u0645\u0627\u0633\u062a\u0631',
      creditDebitCardsMeeza: '\u0645\u064a\u0632\u0629',
      visa: '\u0641\u064a\u0632\u0627',
      mastercard: '\u0645\u0627\u0633\u062a\u0631',
      meeza: '\u0645\u064a\u0632\u0629',
      mada: '\u0645\u062f\u0649',
      madaSaudi: '\u0645\u062f\u0649 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629',
      mobileWallets: '\u0627\u0644\u0645\u062d\u0627\u0641\u0638 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629',
      mobileWalletsDescription: '\u0641\u0648\u062f\u0627\u0641\u0648\u0646 \u0643\u0627\u0634\u060c \u0623\u0648\u0631\u0646\u062c \u0645\u0648\u0646\u064a\u060c \u0627\u062a\u0635\u0627\u0644\u0627\u062a',
      bankInstallments: '\u0627\u0644\u062a\u0642\u0633\u064a\u0637 \u0627\u0644\u0628\u0646\u0643\u064a',
      bankInstallmentsDescription: '\u0627\u062f\u0641\u0639 \u0639\u0644\u0649 \u0623\u0642\u0633\u0627\u0637 \u0634\u0647\u0631\u064a\u0629',
      payAtKiosk: '\u0627\u0644\u062f\u0641\u0639 \u0645\u0646 \u0627\u0644\u0643\u0634\u0643',
      payAtKioskDescription: '\u0623\u0645\u0627\u0646\u060c \u0645\u0635\u0627\u0631\u064a\u060c \u062e\u0627\u0644\u0635\u060c \u0628\u064a',
      buyNowPayLater: '\u0627\u0634\u062a\u0631\u064a \u0627\u0644\u0622\u0646 \u0648\u0627\u062f\u0641\u0639 \u0644\u0627\u062d\u0642\u064b\u0627',
      buyNowPayLaterDescription: '\u0641\u0627\u0644\u064a\u0648\u060c \u0633\u064a\u0645\u0628\u0644\u060c \u0633\u0647\u0648\u0644\u0629',
      instaPay: '\u0625\u0646\u0633\u062a\u0627\u0628\u0627\u064a',
      instaPayDescription: '\u0627\u0644\u062a\u062d\u0648\u064a\u0644\u0627\u062a \u0627\u0644\u0628\u0646\u0643\u064a\u0629 \u0627\u0644\u0641\u0648\u0631\u064a\u0629',
      
      payWithWallet: '\u0627\u0644\u062f\u0641\u0639 \u0645\u0646 \u0627\u0644\u0645\u062d\u0641\u0638\u0629',
      balance: '\u0627\u0644\u0631\u0635\u064a\u062f:',
      insufficient: '(\u063a\u064a\u0631 \u0643\u0627\u0641\u064a)',
      topUp: '\u0634\u062d\u0646 \u0627\u0644\u0631\u0635\u064a\u062f',
      noPaymentMethods: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0637\u0631\u0642 \u062f\u0641\u0639 \u0645\u062a\u0627\u062d\u0629 \u0641\u064a \u0627\u0644\u0648\u0642\u062a \u0627\u0644\u062d\u0627\u0644\u064a.',
      
      // Cash on Delivery
      cashOnDelivery: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
      payWhenReceive: '\u0627\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0633\u062a\u0644\u0627\u0645 \u0637\u0644\u0628\u0643',
      codExtraFee: '\u0631\u0633\u0648\u0645 \u0625\u0636\u0627\u0641\u064a\u0629:',
      
      // Buttons
      backToProducts: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      processing: '\u062c\u0627\u0631\u064d \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629...',
      
      // Success Modal
      total: '\u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a',
      payWithWallet: '\u0627\u0644\u062f\u0641\u0639 \u0645\u0646 \u0627\u0644\u0645\u062d\u0641\u0638\u0629',
      topUp: '\u0634\u062d\u0646 \u0627\u0644\u0631\u0635\u064a\u062f',
      
      // Shipping Info
      
      // Validation
      cartIsEmpty: '\u0633\u0644\u0629 \u0627\u0644\u062a\u0633\u0648\u0642 \u0641\u0627\u0631\u063a\u0629',
      paymentSuccessfulButFailedToLoad: '\u062a\u0645 \u0627\u0644\u062f\u0641\u0639 \u0628\u0646\u062c\u0627\u062d \u0644\u0643\u0646 \u0641\u0634\u0644 \u062a\u062d\u0645\u064a\u0644 \u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0637\u0644\u0628.',
      failedToCreateOrder: '\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0637\u0644\u0628. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      errorOccurred: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0637\u0644\u0628\u0643. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      productsNotAvailable: '\u0628\u0639\u0636 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0641\u064a \u0633\u0644\u062a\u0643 \u0644\u0645 \u062a\u0639\u062f \u0645\u062a\u0627\u062d\u0629. \u064a\u0631\u062c\u0649 \u0645\u0631\u0627\u062c\u0639\u0629 \u0633\u0644\u062a\u0643 \u0648\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      insufficientBalance: '\u0631\u0635\u064a\u062f \u0627\u0644\u0645\u062d\u0641\u0638\u0629 \u063a\u064a\u0631 \u0643\u0627\u0641\u064d. \u064a\u0631\u062c\u0649 \u0634\u062d\u0646 \u0645\u062d\u0641\u0638\u062a\u0643 \u0623\u0648 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0623\u062e\u0631\u0649.',
      paymentMethodNotAvailable: '\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629. \u064a\u0631\u062c\u0649 \u0627\u062e\u062a\u064a\u0627\u0631 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0623\u062e\u0631\u0649.',
      
      // Field Validation Errors
      emailRequired: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0645\u0637\u0644\u0648\u0628',
      phoneRequired: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641 \u0645\u0637\u0644\u0648\u0628',
      firstNameRequired: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 \u0645\u0637\u0644\u0648\u0628',
      lastNameRequired: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u062e\u064a\u0631 \u0645\u0637\u0644\u0648\u0628',
      invalidEmailFormat: '\u064a\u0631\u062c\u0649 \u0625\u062f\u062e\u0627\u0644 \u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0635\u062d\u064a\u062d',
      
      // Order Summary
      orderSummary: '\u0645\u0644\u062e\u0635 \u0627\u0644\u0637\u0644\u0628',
      unavailable: '\u063a\u064a\u0631 \u0645\u062a\u0627\u062d',
      subtotal: '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0641\u0631\u0639\u064a',
      instantDigitalDelivery: '\u062a\u0633\u0644\u064a\u0645 \u0641\u0648\u0631\u064a',
      secureCheckout: '\u062f\u0641\u0639 \u0622\u0645\u0646',
      customerSupport: '\u062f\u0639\u0645 \u0627\u0644\u0639\u0645\u0644\u0627\u0621 24/7',
      
      // Processing
      processingPayment: '\u062c\u0627\u0631\u064d \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u062f\u0641\u0639...',
      pleaseWait: '\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631 \u0628\u064a\u0646\u0645\u0627 \u0646\u0639\u0627\u0644\u062c \u0637\u0644\u0628\u0643',
      doNotClose: '\u0644\u0627 \u062a\u063a\u0644\u0642 \u0623\u0648 \u062a\u062d\u062f\u062b \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629',
      
      // Apple Pay Popup
      applePayLoading: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 Apple Pay',
      applePayPleaseWait: '\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631 \u0628\u064a\u0646\u0645\u0627 \u0646\u062c\u0647\u0632 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0622\u0645\u0646',
      applePaySecurePayment: '\u062f\u0641\u0639 \u0622\u0645\u0646',
      applePayEncrypted: '\u0645\u0634\u0641\u0631 \u0645\u0646 \u0637\u0631\u0641 \u0625\u0644\u0649 \u0637\u0631\u0641',
      applePayProcessing: '\u062c\u0627\u0631\u064a \u0627\u0644\u062f\u0641\u0639 \u0639\u0628\u0631 Apple Pay',
      applePayPreparing: '\u062c\u0627\u0631\u064a \u062a\u062c\u0647\u064a\u0632 Apple Pay',
      applePayCompleteInPopup: '\u0623\u0643\u0645\u0644 \u0627\u0644\u062f\u0641\u0639 \u0641\u064a \u0627\u0644\u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0645\u0641\u062a\u0648\u062d\u0629',
      applePayAutoRedirect: '\u0633\u064a\u062a\u0645 \u062a\u062d\u0648\u064a\u0644\u0643 \u062a\u0644\u0642\u0627\u0626\u064a\u064b\u0627 \u0628\u0639\u062f \u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u062f\u0641\u0639',
      applePaySettingUp: '\u062c\u0627\u0631\u064a \u062a\u062c\u0647\u064a\u0632 \u062c\u0644\u0633\u0629 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0622\u0645\u0646\u0629',
      applePayTapToContinue: '\u0627\u0636\u063a\u0637 \u0644\u0641\u062a\u062d Apple Pay',
      continueToApplePay: '\u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0625\u0644\u0649 Apple Pay',
      // PaySky Popup (\u0639\u0627\u0645 \u2014 \u0644\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0648\u0627\u0644\u0645\u062d\u0627\u0641\u0638)
      payskyLoadingPayment: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u062f\u0641\u0639',
      payskyPleaseWait: '\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631 \u0628\u064a\u0646\u0645\u0627 \u0646\u062c\u0647\u0632 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0622\u0645\u0646',
      payskyProcessingPayment: '\u062c\u0627\u0631\u064a \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u062f\u0641\u0639',
      payskyPreparingPayment: '\u062c\u0627\u0631\u064a \u062a\u062c\u0647\u064a\u0632 \u0627\u0644\u062f\u0641\u0639',
      payskyCompleteInPopup: '\u0623\u0643\u0645\u0644 \u0627\u0644\u062f\u0641\u0639 \u0641\u064a \u0627\u0644\u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0645\u0641\u062a\u0648\u062d\u0629',
      payskyAutoRedirect: '\u0633\u064a\u062a\u0645 \u062a\u062d\u0648\u064a\u0644\u0643 \u062a\u0644\u0642\u0627\u0626\u064a\u064b\u0627 \u0628\u0639\u062f \u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u062f\u0641\u0639',
      payskySettingUp: '\u062c\u0627\u0631\u064a \u062a\u062c\u0647\u064a\u0632 \u062c\u0644\u0633\u0629 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0622\u0645\u0646\u0629',
      payskyTapToContinue: '\u0627\u0636\u063a\u0637 \u0644\u0641\u062a\u062d \u0635\u0641\u062d\u0629 \u0627\u0644\u062f\u0641\u0639',
      // \u0646\u0627\u0641\u0630\u0629 \u0627\u0633\u062a\u0626\u0646\u0627\u0641 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0639\u0644\u0651\u0642
      pendingOrderTitle: '\u0644\u062f\u064a\u0643 \u0637\u0644\u0628 \u0642\u064a\u062f \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631',
      pendingOrderMessage: '\u0627\u0644\u0637\u0644\u0628 #{orderId} \u0644\u0645 \u064a\u0643\u062a\u0645\u0644 \u062f\u0641\u0639\u0647 \u0628\u0639\u062f. \u0647\u0644 \u062a\u0631\u064a\u062f \u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u062f\u0641\u0639 \u0623\u0645 \u0628\u062f\u0621 \u0637\u0644\u0628 \u062c\u062f\u064a\u062f\u061f',
      checkPaymentStatus: '\u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u062d\u0627\u0644\u0629 \u0627\u0644\u062f\u0641\u0639',
      startNewOrder: '\u0628\u062f\u0621 \u0637\u0644\u0628 \u062c\u062f\u064a\u062f',
      
      // Unavailable Products
      unavailableProductsTitle: '\u0628\u0639\u0636 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629',
      
      // Service Info Modal
      
      // Source Code Info Modal
      
      // Loading
      
      // Checkout Page Title
      checkout: '\u0627\u0644\u062f\u0641\u0639',
      
      // Security & Trust
      securePaymentDescription: '\u062a\u0633\u0648\u0651\u0642 \u0628\u0631\u0627\u062d\u0629 \u0628\u0627\u0644 \u2014 \u062f\u0641\u0639\u0643 \u0622\u0645\u0646 \u0648\u0645\u062d\u0645\u064a \u0628\u0627\u0644\u0643\u0627\u0645\u0644.',
      
      // Modal Actions
      
      // Wallet Payment Errors
      walletPaymentFailed: '\u0641\u0634\u0644 \u0627\u0644\u062f\u0641\u0639 \u0645\u0646 \u0627\u0644\u0645\u062d\u0641\u0638\u0629',
      failedToProcessWalletPayment: '\u0641\u0634\u0644\u062a \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u062f\u0641\u0639 \u0645\u0646 \u0627\u0644\u0645\u062d\u0641\u0638\u0629',
      failedToInitializePayment: '\u0641\u0634\u0644 \u062a\u0647\u064a\u0626\u0629 \u0627\u0644\u062f\u0641\u0639',
      
      // Order Creation Errors
      
      // Success Messages
      
      // Payment Cancelled/Error Messages
      
      // Paymob Payment Methods
      mobileWallets: '\u0627\u0644\u0645\u062d\u0627\u0641\u0638 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629',
      payAtKiosk: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0628\u0631 \u0623\u0645\u0627\u0646/\u0645\u0635\u0627\u0631\u064a',
      buyNowPayLater: '\u0627\u0634\u062a\u0631\u0650 \u0627\u0644\u0622\u0646 \u0648\u0627\u062f\u0641\u0639 \u0644\u0627\u062d\u0642\u0627\u064b',
      instaPay: '\u0627\u0646\u0633\u062a\u0627\u0628\u0627\u064a',
      applePay: '\u0623\u0628\u0644 \u0628\u0627\u064a',
      
      // Crypto Payment
      cryptocurrency: '\u0627\u0644\u062f\u0641\u0639 \u0628\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629',
      cryptocurrencyMore: '\u0627\u0644\u0645\u0632\u064a\u062f',
      
      // Wallet Payment
      payWithWallet: '\u0627\u0644\u062f\u0641\u0639 \u0645\u0646 \u0627\u0644\u0645\u062d\u0641\u0638\u0629',
      topUp: '\u0634\u062d\u0646 \u0627\u0644\u0631\u0635\u064a\u062f',
      balance: '\u0627\u0644\u0631\u0635\u064a\u062f:',
      
      // Cash on Delivery
      cashOnDelivery: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
      payWhenReceive: '\u0627\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0633\u062a\u0644\u0627\u0645 \u0637\u0644\u0628\u0643',
      codExtraFee: '\u0631\u0633\u0648\u0645 \u0625\u0636\u0627\u0641\u064a\u0629:',
      
      // Cart Empty
      cartIsEmpty: '\u0627\u0644\u0633\u0644\u0629 \u0641\u0627\u0631\u063a\u0629',
      
      // Payment Gateway Labels
      couponErrorConnection: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0641\u064a \u0627\u0644\u0627\u062a\u0635\u0627\u0644\u060c \u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649',
      applePayTitle: '\u0623\u0628\u0644 \u0628\u0627\u064a',
      googlePayTitle: '\u062c\u0648\u062c\u0644 \u0628\u0627\u064a',
      samsungPayTitle: '\u0633\u0627\u0645\u0633\u0648\u0646\u062c \u0628\u0627\u064a',
      ziinaApplePayDesc: '\u062f\u0641\u0639 \u0633\u0631\u064a\u0639 \u0648\u0622\u0645\u0646 \u0639\u0628\u0631 Apple Pay \u00b7 Ziina',
      ziinaGooglePayDesc: '\u062f\u0641\u0639 \u0633\u0631\u064a\u0639 \u0639\u0628\u0631 Google Pay \u00b7 Ziina',
      ziinaSamsungPayDesc: '\u062f\u0641\u0639 \u0639\u0628\u0631 Samsung Pay \u00b7 Ziina',
      edfapayCardsTitle: '\u0628\u0637\u0627\u0642\u0627\u062a EdfaPay',
      edfapayApplePayTitle: '\u0623\u0628\u0644 \u0628\u0627\u064a \u0639\u0628\u0631 EdfaPay',
      edfapayTamaraTitle: '\u062a\u0645\u0627\u0631\u0627 \u0639\u0628\u0631 EdfaPay',
      paypalTitle: '\u0628\u0627\u064a \u0628\u0627\u0644',
      paypalDescription: '\u0627\u062f\u0641\u0639 \u0628\u0623\u0645\u0627\u0646 \u0639\u0628\u0631 \u0628\u0627\u064a \u0628\u0627\u0644',
      paypalCardTitle: '\u0628\u0637\u0627\u0642\u0629 \u0639\u0628\u0631 PayPal',
      paypalCardDesc: '\u0627\u062f\u0641\u0639 \u0628\u0628\u0637\u0627\u0642\u062a\u0643 \u0628\u062f\u0648\u0646 \u062d\u0633\u0627\u0628 \u0628\u0627\u064a \u0628\u0627\u0644',
      paypalPayLaterTitle: '\u0627\u062f\u0641\u0639 \u0644\u0627\u062d\u0642\u0627\u064b \u0639\u0628\u0631 PayPal',
      paypalPayLaterDesc: '\u0627\u0634\u062a\u0631\u064a \u0627\u0644\u0622\u0646 \u0648\u0627\u062f\u0641\u0639 \u0639\u0644\u0649 \u0623\u0642\u0633\u0627\u0637',
      
      // Breadcrumb & Navigation
      homeBreadcrumb: '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
      
      // Unavailable Products
      itemsUnavailable: '\u0645\u0646\u062a\u062c\u0627\u062a \u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631\u0629',
      editCart: '\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u0633\u0644\u0629',
      unknownProduct: '\u0645\u0646\u062a\u062c \u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641',
      productNotFoundReason: '\u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f',
      
      // Order Summary Inline
      priceBeforeDiscount: '\u0627\u0644\u0633\u0639\u0631 \u0642\u0628\u0644 \u0627\u0644\u062e\u0635\u0645',
      youSaved: '\u0645\u0628\u0631\u0648\u0643! \u0648\u0641\u0651\u0631\u062a',
      freeShipping: '\u0634\u062d\u0646 \u0645\u062c\u0627\u0646\u064a',
      couponPlaceholder: '\u0643\u0648\u062f \u0627\u0644\u062e\u0635\u0645',
      couponApply: '\u062a\u0637\u0628\u064a\u0642',
      couponDiscount: '\u062e\u0635\u0645 \u0627\u0644\u0643\u0648\u0628\u0648\u0646',
      shippingLabel: '\u0627\u0644\u0634\u062d\u0646',
      shippingFree: '\u0645\u062c\u0627\u0646\u064a \u2713',
      selectRegion: '\u0627\u062e\u062a\u0631 \u0627\u0644\u0645\u0646\u0637\u0642\u0629',
      codFee: '\u0631\u0633\u0648\u0645 \u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
      readRefundPolicy: '\u0642\u0631\u0627\u0621\u0629 \u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u2190',
      fastDelivery: '\u0634\u062d\u0646 \u0633\u0631\u064a\u0639',
      
      // Delivery Info
      deliveryInformation: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0648\u0635\u064a\u0644',
      phoneLabel: '\u0627\u0644\u0647\u0627\u062a\u0641',
      phoneNumberLabel: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641',
      
      // Lock overlay & availability
      egyptOnly: '\u0645\u062a\u0627\u062d \u062f\u0627\u062e\u0644 \u0645\u0635\u0631 \u0641\u0642\u0637',
      walletProviders: '\u0641\u0648\u062f\u0627\u0641\u0648\u0646 \u0643\u0627\u0634 \u00b7 \u0623\u0648\u0631\u0627\u0646\u062c \u00b7 \u0627\u062a\u0635\u0627\u0644\u0627\u062a',
      applePayOnlyOnIphone: '\u0645\u062a\u0627\u062d \u0641\u0642\u0637 \u0639\u0644\u0649 \u0623\u062c\u0647\u0632\u0629 iPhone/iPad',
      
      // Payment method descriptions
      edfapayCardsDesc: '\u062e\u064a\u0627\u0631 \u0645\u0633\u062a\u0642\u0644 \u0644\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0639\u0628\u0631 \u0635\u0641\u062d\u0629 EdfaPay \u0627\u0644\u0645\u0633\u062a\u0636\u0627\u0641\u0629',
      edfapayApplePayDesc: '\u062e\u064a\u0627\u0631 Apple Pay \u0645\u0633\u062a\u0642\u0644 \u0645\u0639 \u0646\u0641\u0633 \u0635\u0641\u062d\u0629 EdfaPay \u0627\u0644\u0645\u0633\u062a\u0636\u0627\u0641\u0629',
      edfapayTamaraDesc: '\u062e\u064a\u0627\u0631 BNPL \u0645\u0633\u062a\u0642\u0644 \u0645\u0639 \u0625\u0631\u0633\u0627\u0644 \u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u062d\u0633\u0628 \u0648\u062b\u0627\u0626\u0642 Tamara',
      codNotAvailableRegion: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d \u0644\u0645\u0646\u0637\u0642\u062a\u0643',
      
      // Validation messages
      deliveryInfoRequired: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0648\u0635\u064a\u0644 \u0645\u0637\u0644\u0648\u0628\u0629',
      fullNameRequired: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0637\u0644\u0648\u0628',
      shippingPhoneRequired: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641 \u0645\u0637\u0644\u0648\u0628',
      regionRequired: '\u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0645\u0637\u0644\u0648\u0628\u0629',
      addressRequired: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0645\u0637\u0644\u0648\u0628',
      selectPaymentMethod: '\u064a\u0631\u062c\u0649 \u0627\u062e\u062a\u064a\u0627\u0631 \u0648\u0633\u064a\u0644\u0629 \u062f\u0641\u0639',
      completeShippingInfo: '\u064a\u0631\u062c\u0649 \u0625\u0643\u0645\u0627\u0644 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062a\u0648\u0635\u064a\u0644',
      
      // Cart & order
      productsNoLongerAvailable: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u062a\u0627\u0644\u064a\u0629 \u0644\u0645 \u062a\u0639\u062f \u0645\u062a\u0627\u062d\u0629. \u064a\u0631\u062c\u0649 \u0625\u0632\u0627\u0644\u062a\u0647\u0627 \u0644\u0644\u0645\u062a\u0627\u0628\u0639\u0629.',
      removeFromCart: '\u062d\u0630\u0641 \u0645\u0646 \u0627\u0644\u0633\u0644\u0629',
      removeCoupon: '\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0643\u0648\u0628\u0648\u0646',
      invalidCoupon: '\u0643\u0648\u0628\u0648\u0646 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d',
      clickToPayNow: '\u0627\u0636\u063a\u0637 \u0647\u0646\u0627 \u0644\u0644\u062f\u0641\u0639 \u0627\u0644\u0622\u0646',

      // Privacy / Terms consent (required before placing an order)
      policyConsentPrefix: '\u0644\u0642\u062f \u0642\u0631\u0623\u062a \u0648\u0623\u0648\u0627\u0641\u0642 \u0639\u0644\u0649',
      policyConsentPrivacy: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629',
      policyConsentAnd: '\u0648',
      policyConsentTerms: '\u0634\u0631\u0648\u0637 \u0627\u0644\u062e\u062f\u0645\u0629',
      policyConsentSuffix: '\u060c \u0648\u0623\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0628\u064a\u0627\u0646\u0627\u062a\u064a \u0644\u0625\u062a\u0645\u0627\u0645 \u0637\u0644\u0628\u064a.',
      policyConsentRequired: '\u064a\u064f\u0631\u062c\u0649 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629 \u0648\u0634\u0631\u0648\u0637 \u0627\u0644\u062e\u062f\u0645\u0629 \u0644\u0644\u0645\u062a\u0627\u0628\u0639\u0629.',

      // PayPal refund policy
      noRefundPolicyTitle: '\u0633\u064a\u0627\u0633\u0629 \u0639\u062f\u0645 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0639\u0646\u062f \u0627\u0644\u062f\u0641\u0639 \u0639\u0628\u0631 PayPal',
      noRefundPolicyDesc: '\u0639\u0646\u062f \u0627\u0644\u062f\u0641\u0639 \u0639\u0628\u0631 PayPal\u060c \u064a\u062a\u0645 \u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0641\u0648\u0631\u064a\u0627\u064b \u0648\u0644\u0627 \u064a\u0645\u0643\u0646 \u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0645\u062f\u0641\u0648\u0639. \u0628\u0625\u062a\u0645\u0627\u0645 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u0634\u0631\u0627\u0621 \u0639\u0628\u0631 PayPal\u060c \u0623\u0646\u062a \u062a\u0648\u0627\u0641\u0642 \u0639\u0644\u0649 \u0623\u0646 \u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0628\u064a\u0639\u0627\u062a \u0646\u0647\u0627\u0626\u064a\u0629 \u0648\u0644\u0627 \u064a\u0648\u062c\u062f \u0627\u0633\u062a\u0631\u062c\u0627\u0639.',
      
      // Stock Availability
      stockCheckFailed: '\u062a\u0639\u0630\u0651\u0631 \u0627\u0644\u062a\u062d\u0642\u0651\u0642 \u0645\u0646 \u062a\u0648\u0641\u0651\u0631 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a. \u064a\u064f\u0631\u062c\u0649 \u0645\u0631\u0627\u062c\u0639\u0629 \u0637\u0644\u0628\u0643 \u0628\u0639\u0646\u0627\u064a\u0629 \u0642\u0628\u0644 \u062a\u0623\u0643\u064a\u062f\u0647.',

      // Pending Order Modal
      verifyingPayment: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062f\u0641\u0639...'
    },
    forgotPassword: {
      pageTitle: '\u0646\u0633\u064a\u062a \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
      enterVerificationCode: '\u0623\u062f\u062e\u0644 \u0631\u0645\u0632 \u0627\u0644\u062a\u062d\u0642\u0642',
      newPasswordTitle: '\u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u062c\u062f\u064a\u062f\u0629',
      invalidEmail: '\u0623\u062f\u062e\u0644 \u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0635\u062d\u064a\u062d',
      codeSent: '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0645\u0632 \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u062a\u0639\u064a\u064a\u0646 \u0625\u0644\u0649 \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
      somethingWentWrong: '\u062d\u062f\u062b \u062e\u0637\u0623',
      unexpectedError: '\u062d\u062f\u062b \u062e\u0637\u0623 \u063a\u064a\u0631 \u0645\u062a\u0648\u0642\u0639',
      enterOtp: '\u0623\u062f\u062e\u0644 \u0631\u0645\u0632 \u0627\u0644\u062a\u062d\u0642\u0642 \u0627\u0644\u0645\u0643\u0648\u0646 \u0645\u0646 6 \u0623\u0631\u0642\u0627\u0645',
      invalidOtp: '\u0631\u0645\u0632 \u0627\u0644\u062a\u062d\u0642\u0642 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d',
      verificationError: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u0627\u0644\u062a\u062d\u0642\u0642',
      passwordMinLength: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u064a\u062c\u0628 \u0623\u0646 \u062a\u0643\u0648\u0646 8 \u0623\u062d\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644',
      passwordsNoMatch: '\u0643\u0644\u0645\u062a\u0627 \u0627\u0644\u0645\u0631\u0648\u0631 \u063a\u064a\u0631 \u0645\u062a\u0637\u0627\u0628\u0642\u062a\u064a\u0646',
      resetSuccess: '\u062a\u0645 \u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0628\u0646\u062c\u0627\u062d! \u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0648\u064a\u0644...',
      sessionExpired: '\u0627\u0646\u062a\u0647\u062a \u062c\u0644\u0633\u0629 \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u062a\u0639\u064a\u064a\u0646. \u0633\u064a\u062a\u0645 \u0625\u0639\u0627\u062f\u062a\u0643 \u0644\u0625\u0631\u0633\u0627\u0644 \u0631\u0645\u0632 \u062c\u062f\u064a\u062f.',
      resetFailed: '\u0641\u0634\u0644 \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u062a\u0639\u064a\u064a\u0646',
      codeResent: '\u062a\u0645 \u0625\u0639\u0627\u062f\u0629 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0645\u0632',
      resendFailed: '\u0641\u0634\u0644 \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0625\u0631\u0633\u0627\u0644',
      emailLabel: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
      emailPlaceholder: '\u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
      sendResetCode: '\u0625\u0631\u0633\u0627\u0644 \u0631\u0645\u0632 \u0627\u0644\u062a\u062d\u0642\u0642',
      emailDescription: '\u0623\u062f\u062e\u0644 \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0648\u0633\u0646\u0631\u0633\u0644 \u0644\u0643 \u0631\u0645\u0632 \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u062a\u0639\u064a\u064a\u0646',
      enterCodeSentTo: '\u0623\u062f\u062e\u0644 \u0627\u0644\u0631\u0645\u0632 \u0627\u0644\u0645\u0631\u0633\u0644 \u0625\u0644\u0649',
      change: '\u062a\u063a\u064a\u064a\u0631',
      enterNewPassword: '\u0623\u062f\u062e\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062c\u062f\u064a\u062f\u0629',
      verifyCode: '\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0631\u0645\u0632',
      resendCode: '\u0625\u0639\u0627\u062f\u0629 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0645\u0632',
      changeEmail: '\u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0628\u0631\u064a\u062f',
      newPasswordLabel: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062c\u062f\u064a\u062f\u0629',
      newPasswordPlaceholder: '\u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u062c\u062f\u064a\u062f\u0629',
      atLeast8Chars: '8 \u0623\u062d\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644',
      confirmPasswordLabel: '\u062a\u0623\u0643\u064a\u062f \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
      confirmPasswordPlaceholder: '\u062a\u0623\u0643\u064a\u062f \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
      resetPassword: '\u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
      backToSignIn: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644',
      resetUnavailable: '\u062e\u062f\u0645\u0629 \u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d\u0629 \u062d\u0627\u0644\u064a\u0627\u064b. \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062f\u0639\u0645 \u0644\u0627\u0633\u062a\u0631\u062f\u0627\u062f \u062d\u0633\u0627\u0628\u0643.',
      accountRecoveryRequest: '\u0637\u0644\u0628 \u0627\u0633\u062a\u0631\u062f\u0627\u062f \u062d\u0633\u0627\u0628'
    },

    // Floating Support
    floatingSupport: {
      tooManyMessages: '\u0639\u062f\u062f \u0627\u0644\u0631\u0633\u0627\u0626\u0644 \u0643\u062b\u064a\u0631. \u0627\u0646\u062a\u0638\u0631 \u0642\u0644\u064a\u0644\u0627\u064b \u062b\u0645 \u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      errorOccurred: '\u0639\u0630\u0631\u0627\u064b\u060c \u062d\u062f\u062b \u062e\u0637\u0623. \u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      connectionError: '\u0639\u0630\u0631\u0627\u064b\u060c \u0644\u0627 \u064a\u0645\u0643\u0646 \u0627\u0644\u0627\u062a\u0635\u0627\u0644. \u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u062a\u0635\u0627\u0644\u0643 \u0628\u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a.',
      aiAssistant: '\u0627\u0644\u0645\u0633\u0627\u0639\u062f \u0627\u0644\u0630\u0643\u064a',
      contactUs: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',
      onlineNow: '\u0645\u062a\u0635\u0644 \u0627\u0644\u0622\u0646',
      contactChannels: '\u0642\u0646\u0648\u0627\u062a \u0627\u0644\u062a\u0648\u0627\u0635\u0644',
      typeMessage: '\u0627\u0643\u062a\u0628 \u0631\u0633\u0627\u0644\u062a\u0643...',
      noChannelsAvailable: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0642\u0646\u0648\u0627\u062a \u0645\u062a\u0627\u062d\u0629',
      newChat: '\u0645\u062d\u0627\u062f\u062b\u0629 \u062c\u062f\u064a\u062f\u0629',
      copyMessage: '\u0646\u0633\u062e',
      stopGenerating: '\u0625\u064a\u0642\u0627\u0641 \u0627\u0644\u062a\u0648\u0644\u064a\u062f',
      retry: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629',
      poweredByAI: '\u0645\u062f\u0639\u0648\u0645 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a'
    },

    // Testimonials
    testimonials: {
      verified: '\u0645\u0648\u062b\u0642\u0629',
      today: '\u0627\u0644\u064a\u0648\u0645',
      oneDayAgo: '\u0645\u0646\u0630 \u064a\u0648\u0645',
      daysAgo: '\u0645\u0646\u0630 {count} \u0623\u064a\u0627\u0645',
      oneWeekAgo: '\u0645\u0646\u0630 \u0623\u0633\u0628\u0648\u0639',
      weeksAgo: '\u0645\u0646\u0630 {count} \u0623\u0633\u0627\u0628\u064a\u0639',
      oneMonthAgo: '\u0645\u0646\u0630 \u0634\u0647\u0631',
      customerReviews: '\u0622\u0631\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u0627\u0621',
      whatOur: '\u0645\u0627\u0630\u0627 \u064a\u0642\u0648\u0644 ',
      clientsSay: '\u0639\u0645\u0644\u0627\u0624\u0646\u0627',
      hClassicSub: '\u0622\u0631\u0627\u0621 \u062d\u0642\u064a\u0642\u064a\u0629 \u0645\u0646 \u0639\u0645\u0644\u0627\u0621 \u062d\u0642\u064a\u0642\u064a\u064a\u0646 \u2014 \u0631\u0623\u064a\u0643 \u064a\u0647\u0645\u0646\u0627 \u0648\u064a\u0635\u0646\u0639 \u0627\u0644\u0641\u0631\u0642.',
      hMarqueeT1: '\u0645\u0648\u062b\u0648\u0642\u0648\u0646 \u0645\u0646 ',
      hMarqueeT2: '\u0639\u0645\u0644\u0627\u0626\u0646\u0627',
      hMarqueeSub: '\u062a\u062c\u0627\u0631\u0628 \u062a\u062a\u062d\u062f\u062b \u0639\u0646\u0627 \u0639\u0644\u0649 \u0645\u062f\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629 \u2014 \u0627\u0646\u0636\u0645 \u0625\u0644\u064a\u0647\u0645 \u0648\u0634\u0627\u0631\u0643\u0646\u0627 \u0631\u0623\u064a\u0643.',
      hWallT1: '\u0642\u0627\u0644\u0648\u0627 ',
      hWallT2: '\u0639\u0646\u0651\u0627',
      hWallSub: '\u0643\u0644 \u0643\u0644\u0645\u0629 \u0647\u0646\u0627 \u0645\u0646 \u0639\u0645\u064a\u0644 \u062d\u0642\u064a\u0642\u064a \u0623\u062a\u0645\u0651 \u062a\u062c\u0631\u0628\u062a\u0647 \u0645\u0639\u0646\u0627 \u2014 \u0641\u0645\u0635\u062f\u0627\u0642\u064a\u062a\u0646\u0627 \u0623\u063a\u0644\u0649 \u0645\u0627 \u0646\u0645\u0644\u0643.',
      hSpotT1: '\u0634\u0647\u0627\u062f\u0629 ',
      hSpotT2: '\u0646\u0639\u062a\u0632 \u0628\u0647\u0627',
      hSpotSub: '\u0646\u0639\u0631\u0636 \u0622\u0631\u0627\u0621 \u0639\u0645\u0644\u0627\u0626\u0646\u0627 \u0628\u0643\u0644 \u0634\u0641\u0627\u0641\u064a\u0629 \u2014 \u0648\u0642\u0635\u062a\u0643 \u0627\u0644\u0642\u0627\u062f\u0645\u0629 \u0642\u062f \u062a\u064f\u0631\u0648\u0649 \u0647\u0646\u0627.'
    },

    // EdfaPay Card
    edfapayCard: {
      paymentFailed: '\u0641\u0634\u0644\u062a \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639.',
      failedToStartPayment: '\u0641\u0634\u0644 \u0628\u062f\u0621 \u0627\u0644\u062f\u0641\u0639',
      embeddedTitle: '\u0628\u0637\u0627\u0642\u0627\u062a EdfaPay \u0627\u0644\u0645\u062f\u0645\u062c\u0629',
      cardNumber: '\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629',
      expMonth: '\u0634\u0647\u0631 \u0627\u0644\u0627\u0646\u062a\u0647\u0627\u0621',
      expYear: '\u0633\u0646\u0629 \u0627\u0644\u0627\u0646\u062a\u0647\u0627\u0621',
      s2sFlow: '\u062a\u062f\u0641\u0642 S2S \u0645\u0648\u062b\u0651\u0642',
      bankVerificationStarted: '\u062a\u0645 \u0628\u062f\u0621 \u0627\u0644\u062a\u062d\u0642\u0642 \u0627\u0644\u0628\u0646\u0643\u064a'
    },

    // Hero Slider
    heroSlider: {
      featured: '\u0639\u0631\u0636 \u0645\u0645\u064a\u0632',
      play: '\u062a\u0634\u063a\u064a\u0644',
      pause: '\u0625\u064a\u0642\u0627\u0641'
    },

    // Blog Page
    blogPage: {
      title: '\u0627\u0644\u0645\u062f\u0648\u0646\u0629',
      searchPlaceholder: '\u0627\u0628\u062d\u062b \u0641\u064a \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062a...',
      all: '\u0627\u0644\u0643\u0644',
      noArticlesYet: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0642\u0627\u0644\u0627\u062a \u0628\u0639\u062f',
    },

    // DB Content Page
    dbContentPage: {
      backToHome: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629'
    },

    // Payment Method Labels
    paymentLabels: {
      applePay: '\u0623\u0628\u0644 \u0628\u0627\u064a',
      cardPayment: '\u0627\u0644\u062f\u0641\u0639 \u0628\u0627\u0644\u0628\u0637\u0627\u0642\u0629',
      mobileWallets: '\u0627\u0644\u0645\u062d\u0627\u0641\u0638 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629',
      bankInstallments: '\u0627\u0644\u062a\u0642\u0633\u064a\u0637 \u0627\u0644\u0628\u0646\u0643\u064a',
      buyNowPayLater: '\u0627\u0634\u062a\u0631\u064a \u0627\u0644\u0622\u0646 \u0648\u0627\u062f\u0641\u0639 \u0644\u0627\u062d\u0642\u0627\u064b',
      kioskPayment: '\u0627\u0644\u062f\u0641\u0639 \u0645\u0646 \u0627\u0644\u0643\u0634\u0643',
      instaPay: '\u0625\u0646\u0633\u062a\u0627\u0628\u0627\u064a',
      cryptocurrency: '\u0627\u0644\u062f\u0641\u0639 \u0628\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629',
      cashOnDelivery: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
      walletBalance: '\u0631\u0635\u064a\u062f \u0627\u0644\u0645\u062d\u0641\u0638\u0629',
      paysky: '\u0628\u0627\u064a \u0633\u0643\u0627\u064a',
      ziinaCard: '\u0632\u064a\u0646\u0627 - \u0628\u0637\u0627\u0642\u0629',
      ziinaApplePay: '\u0632\u064a\u0646\u0627 - \u0623\u0628\u0644 \u0628\u0627\u064a',
      ziinaGooglePay: '\u0632\u064a\u0646\u0627 - \u062c\u0648\u062c\u0644 \u0628\u0627\u064a',
      ziinaSamsungPay: '\u0632\u064a\u0646\u0627 - \u0633\u0627\u0645\u0633\u0648\u0646\u062c \u0628\u0627\u064a',
      ziina: '\u0632\u064a\u0646\u0627',
      edfapayCards: '\u0625\u062f\u0641\u0639 \u0628\u0627\u064a - \u0628\u0637\u0627\u0642\u0627\u062a',
      edfapayApplePay: '\u0625\u062f\u0641\u0639 \u0628\u0627\u064a - \u0623\u0628\u0644 \u0628\u0627\u064a',
      edfapayTamara: '\u0625\u062f\u0641\u0639 \u0628\u0627\u064a - \u062a\u0645\u0627\u0631\u0627',
      edfapay: '\u0625\u062f\u0641\u0639 \u0628\u0627\u064a',
      paymob: '\u0628\u0627\u064a \u0645\u0648\u0628',
      kashier: '\u0643\u0627\u0634\u064a\u0631',
      bankTransfer: '\u062a\u062d\u0648\u064a\u0644 \u0628\u0646\u0643\u064a',
      crypto: '\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629',
      wallet: '\u0627\u0644\u0645\u062d\u0641\u0638\u0629',
      cod: '\u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
      egpSymbol: '\u062c.\u0645'
    },

    // Address Labels
    addressLabels: {
      home: '\u0627\u0644\u0645\u0646\u0632\u0644',
      work: '\u0627\u0644\u0639\u0645\u0644',
      office: '\u0627\u0644\u0645\u0643\u062a\u0628',
      other: '\u0622\u062e\u0631'
    },

    // Cart extra
    cartExtra: {
      unavailableCount: '{count} \u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631',
      onlyAvailableFallback: '\u0627\u0644\u0645\u062a\u0648\u0641\u0631 {count} \u0641\u0642\u0637',
      peopleBought: '\u0627\u0634\u062a\u0631\u0627\u0647\u0627 \u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u0623\u064a\u0636\u0627\u064b',
      estimateShipping: '\u062a\u0642\u062f\u064a\u0631 \u0627\u0644\u0634\u062d\u0646',
      chooseZone: '\u0627\u062e\u062a\u0631 \u0627\u0644\u0645\u0646\u0637\u0642\u0629',
      selectZone: '\u2014 \u0627\u062e\u062a\u0631 \u2014',
      calculating: '\u062c\u0627\u0631\u064a \u0627\u0644\u062d\u0633\u0627\u0628\u2026',
      shippingLabel: '\u0627\u0644\u0634\u062d\u0646:',
      notAvailable: '\u063a\u064a\u0631 \u0645\u062a\u0627\u062d'
    },

    // Categories Page extra
    categoriesPageExtra: {
      allCategories: '\u062c\u0645\u064a\u0639 \u0627\u0644\u0623\u0642\u0633\u0627\u0645',
      browseAllCategories: '\u062a\u0635\u0641\u062d \u062c\u0645\u064a\u0639 \u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0644\u062f\u064a\u0646\u0627',
      productCount: '{count} \u0645\u0646\u062a\u062c',
      noCategoriesAvailable: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0642\u0633\u0627\u0645 \u0645\u062a\u0627\u062d\u0629',
      failedToLoadCategories: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0641\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0623\u0642\u0633\u0627\u0645. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      noCategoriesFound: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0642\u0633\u0627\u0645 \u062d\u0627\u0644\u064a\u0627\u064b',
      retry: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629'
    },

    // Category Detail Page
    categoryDetail: {
      subcategories: '\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0641\u0631\u0639\u064a\u0629',
      products: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      loadingMore: '\u062c\u0627\u0631\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0632\u064a\u062f...',
      noProductsInCategory: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0646\u062a\u062c\u0627\u062a \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645'
    },

    // Homepage All Products Section
    homepageProducts: {
      noProductsAvailable: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0646\u062a\u062c\u0627\u062a \u0645\u062a\u0627\u062d\u0629',
      allProducts: '\u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      previous: '\u0627\u0644\u0633\u0627\u0628\u0642',
      next: '\u0627\u0644\u062a\u0627\u0644\u064a',
      swipeToSeeMore: '\u0627\u0633\u062d\u0628 \u0644\u0631\u0624\u064a\u0629 \u0627\u0644\u0645\u0632\u064a\u062f'
    },

    // Homepage Categories Section
    homepageCategories: {
      viewMore: '\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064a\u062f',
      clickToViewProducts: '\u0627\u0636\u063a\u0637 \u0644\u0639\u0631\u0636 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      more: '\u0627\u0644\u0645\u0632\u064a\u062f',
      noProductsInCategory: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0646\u062a\u062c\u0627\u062a \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0641\u0626\u0629',
      failedToLoadCategories: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0641\u064a \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0623\u0642\u0633\u0627\u0645. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      retry: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629'
    },

    // Country Code Selector
    countrySelector: {
      searchCountry: '\u0627\u0628\u062d\u062b \u0639\u0646 \u062f\u0648\u0644\u0629...',
      detectedLocation: '\u062a\u0645 \u0627\u0643\u062a\u0634\u0627\u0641 \u0645\u0648\u0642\u0639\u0643',
      middleEast: '\u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637',
      restOfWorld: '\u0628\u0627\u0642\u064a \u0627\u0644\u0639\u0627\u0644\u0645',
      noCountriesFound: '\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u0639\u062b\u0648\u0631 \u0639\u0644\u0649 \u0646\u062a\u0627\u0626\u062c'
    },

    // About Page fallbacks
    aboutPageExtra: {
      defaultTitle: '\u0645\u0646 \u0646\u062d\u0646',
      defaultDescription: '\u0646\u0642\u062f\u0645 \u062d\u0644\u0648\u0644 \u0631\u0642\u0645\u064a\u0629 \u0645\u0645\u064a\u0632\u0629 \u0644\u0644\u0645\u062d\u062a\u0631\u0641\u064a\u0646',
      noContentYet: '\u0644\u0645 \u064a\u062a\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u062d\u062a\u0648\u0649 \u0628\u0639\u062f. \u064a\u0645\u0643\u0646 \u062a\u0639\u062f\u064a\u0644 \u0647\u0630\u0627 \u0627\u0644\u0645\u062d\u062a\u0648\u0649 \u0645\u0646 \u0644\u0648\u062d\u0629 \u0627\u0644\u0625\u062f\u0627\u0631\u0629.'
    },

    // Dynamic Page fallback
    dynamicPageExtra: {
      noContentYet: '\u0644\u0645 \u064a\u062a\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u062d\u062a\u0648\u0649 \u0628\u0639\u062f.'
    },

    // EdfaPay Card extra
    edfapayCardExtra: {
      s2sInfo: '\u0648\u0641\u0642 \u0648\u062b\u0627\u0626\u0642 EdfaPay S2S\u060c \u064a\u062a\u0645 \u0639\u0631\u0636 \u062e\u0637\u0648\u0629 3DS \u062f\u0627\u062e\u0644 iframe \u0628\u0639\u062f \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0645\u0646 \u0627\u0644\u062e\u0627\u062f\u0645.',
      bankVerificationInfo: '\u0627\u0644\u062a\u062d\u0642\u0642 \u0627\u0644\u0628\u0646\u0643\u064a \u0633\u064a\u0638\u0647\u0631 \u062f\u0627\u062e\u0644 \u0627\u0644\u0625\u0637\u0627\u0631 \u0628\u0639\u062f \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0625\u0644\u0649 EdfaPay \u0645\u0646 \u0627\u0644\u062e\u0627\u062f\u0645.',
      starting: '\u062c\u0627\u0631\u064d \u0627\u0644\u0628\u062f\u0621...',
      payNow: '\u0627\u062f\u0641\u0639 \u0627\u0644\u0622\u0646',
      complete3ds: '\u0623\u0643\u0645\u0644 \u062e\u0637\u0648\u0629 3DS \u062f\u0627\u062e\u0644 \u0627\u0644\u0625\u0637\u0627\u0631 \u0623\u062f\u0646\u0627\u0647. \u0633\u0646\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0646\u062a\u064a\u062c\u0629 \u062a\u0644\u0642\u0627\u0626\u064a\u064b\u0627.',
      checkingPayment: '\u062c\u0627\u0631\u064d \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u062d\u0627\u0644\u0629 \u0627\u0644\u062f\u0641\u0639...',
      waitingPayment: '\u0641\u064a \u0627\u0646\u062a\u0638\u0627\u0631 \u062d\u0627\u0644\u0629 \u0627\u0644\u062f\u0641\u0639...',
      failedToStart: '\u0641\u0634\u0644 \u0628\u062f\u0621 \u0627\u0644\u062f\u0641\u0639'
    },

    // Blog Page extra
    blogPageExtra: {
      discoverArticles: '\u0627\u0643\u062a\u0634\u0641 \u0623\u062d\u062f\u062b \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062a \u0648\u0627\u0644\u0623\u062e\u0628\u0627\u0631 \u0648\u0627\u0644\u0646\u0635\u0627\u0626\u062d',
      stayTuned: '\u062a\u0631\u0642\u0628\u0648\u0627 \u0627\u0644\u0645\u062d\u062a\u0648\u0649 \u0627\u0644\u0642\u0627\u062f\u0645',
      pageOf: '\u0635\u0641\u062d\u0629 {page} \u0645\u0646 {total}',
      minRead: '{minutes} \u062f\u0642\u0627\u0626\u0642 \u0642\u0631\u0627\u0621\u0629'
    },

    // Checkout Success extra
    checkoutSuccessExtra: {
      whatsappShareText: '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0637\u0644\u0628\u064a \u0631\u0642\u0645 #{orderNumber} \u0645\u0646 {siteName}',
      shareGreeting: '\u0645\u0631\u062d\u0628\u0627\u064b \ud83d\udc4b',
      shareOrderConfirmed: '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0637\u0644\u0628\u064a \u0631\u0642\u0645 #{orderNumber}',
      shareProducts: '\n\ud83d\udce6 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a:\n\u2022 {productList}',
      shareOrderLink: '\n\ud83d\udd17 \u0631\u0627\u0628\u0637 \u0627\u0644\u0637\u0644\u0628:\n{url}'
    },

    // Auth Page extra
    authPageExtra: {
      phoneRequired: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641 \u0645\u0637\u0644\u0648\u0628',
      enterOtpCode: '\u0623\u062f\u062e\u0644 \u0631\u0645\u0632 \u0627\u0644\u062a\u062d\u0642\u0642 \u0627\u0644\u0645\u0643\u0648\u0646 \u0645\u0646 6 \u0623\u0631\u0642\u0627\u0645',
      emailVerifiedRedirecting: '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0628\u0646\u062c\u0627\u062d! \u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0648\u064a\u0644...',
      invalidOrExpiredCode: '\u0631\u0645\u0632 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d \u0623\u0648 \u0645\u0646\u062a\u0647\u064a \u0627\u0644\u0635\u0644\u0627\u062d\u064a\u0629',
      verificationError: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u0627\u0644\u062a\u062d\u0642\u0642',
      otpResent: '\u062a\u0645 \u0625\u0639\u0627\u062f\u0629 \u0625\u0631\u0633\u0627\u0644 \u0631\u0645\u0632 \u0627\u0644\u062a\u062d\u0642\u0642',
      resendFailed: '\u0641\u0634\u0644 \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0625\u0631\u0633\u0627\u0644\u060c \u062d\u0627\u0648\u0644 \u0644\u0627\u062d\u0642\u0627\u064b',
      emailVerificationRequired: '\u064a\u062c\u0628 \u062a\u0623\u0643\u064a\u062f \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0623\u0648\u0644\u0627\u064b. \u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0645\u0632 \u0627\u0644\u062a\u062d\u0642\u0642.',
      accountCreatedVerify: '\u062a\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062d\u0633\u0627\u0628! \u062a\u062d\u0642\u0642 \u0645\u0646 \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0644\u0631\u0645\u0632 \u0627\u0644\u062a\u0623\u0643\u064a\u062f',
      resendIn: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 \u062e\u0644\u0627\u0644 {seconds} \u062b\u0627\u0646\u064a\u0629',
      resendCode: '\u0625\u0639\u0627\u062f\u0629 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0645\u0632',
      lastStepToSecure: '\u062e\u0637\u0648\u0629 \u0623\u062e\u064a\u0631\u0629 \u0644\u062a\u0623\u0645\u064a\u0646 \u062d\u0633\u0627\u0628\u0643',
      securePortal: '\u062f\u062e\u0648\u0644 \u0645\u0648\u062b\u0648\u0642',
      fastAccess: '\u0648\u0635\u0648\u0644 \u0633\u0631\u064a\u0639',
      newAccount: '\u0625\u0639\u062f\u0627\u062f \u062d\u0633\u0627\u0628 \u062c\u062f\u064a\u062f',
      accountSuite: '\u0645\u0646\u0635\u0629 \u0627\u0644\u062d\u0633\u0627\u0628',
      encryptedAccess: '\u0645\u0624\u0645\u0646\u0629 \u0648\u0645\u0634\u0641\u0631\u0629',
      sessionQuality: '\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0627\u0644\u062c\u0644\u0633\u0629',
      layeredSecurity: '\u062d\u0645\u0627\u064a\u0629 \u0645\u062a\u0639\u062f\u062f\u0629 \u0628\u062b\u0628\u0627\u062a \u0623\u0639\u0644\u0649',
      sessionDescription: '\u062c\u0644\u0633\u0629 \u0622\u0645\u0646\u0629 \u0648\u062a\u0633\u062c\u064a\u0644 \u062f\u062e\u0648\u0644 \u0645\u062d\u0645\u064a \u0645\u0639 \u062a\u0648\u0632\u064a\u0639 \u0623\u0648\u0636\u062d \u0648\u0645\u0633\u0627\u0641\u0627\u062a \u0623\u0647\u062f\u0623 \u0639\u0644\u0649 \u0627\u0644\u0643\u0645\u0628\u064a\u0648\u062a\u0631\u060c \u062d\u062a\u0649 \u064a\u0638\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062c \u0645\u0631\u064a\u062d\u064b\u0627 \u0648\u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0623\u0633\u0647\u0644 \u0637\u0648\u0627\u0644 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645.',
      tagEncrypted: '\u062a\u0634\u0641\u064a\u0631',
      tagStableLayout: '\u062b\u0628\u0627\u062a \u0628\u0635\u0631\u064a',
      tagClearerFocus: '\u0648\u0636\u0648\u062d \u0623\u0633\u0631\u0639',
      layoutRhythm: '\u062a\u0648\u0632\u064a\u0639 \u0627\u0644\u0648\u0627\u062c\u0647\u0629',
      calmerBalance: '\u062a\u0648\u0632\u064a\u0639 \u0623\u0647\u062f\u0623 \u0648\u0623\u0648\u0636\u062d',
      layoutDescription: '\u0627\u0644\u0645\u062d\u062a\u0648\u0649 \u0627\u0644\u062a\u0639\u0631\u064a\u0641\u064a \u0641\u064a \u062c\u0647\u0629\u060c \u0648\u0627\u0644\u0646\u0645\u0648\u0630\u062c \u0641\u064a \u062c\u0647\u0629 \u0623\u062e\u0631\u0649\u060c \u0644\u064a\u0638\u0647\u0631 \u0627\u0644\u0645\u0634\u0647\u062f \u0623\u062e\u0641 \u0648\u0623\u0633\u0647\u0644 \u0642\u0631\u0627\u0621\u0629 \u0628\u062f\u0648\u0646 \u0634\u0639\u0648\u0631 \u0628\u0627\u0644\u0627\u0632\u062f\u062d\u0627\u0645.',
      accountSetup: '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062d\u0633\u0627\u0628',
      directEntry: '\u0648\u0635\u0648\u0644 \u0645\u0628\u0627\u0634\u0631 \u0628\u0644\u0627 \u062a\u0634\u062a\u064a\u062a',
      guidedSignup: '\u0628\u062f\u0627\u064a\u0629 \u0645\u0646\u0638\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u0643\u0645\u0628\u064a\u0648\u062a\u0631',
      loginFlowDescription: '\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u062d\u0633\u0627\u0628 \u0648\u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0648\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0645\u0646 \u062f\u0648\u0646 \u0636\u063a\u0637 \u0628\u0635\u0631\u064a \u0632\u0627\u0626\u062f\u060c \u0645\u0639 \u062a\u0631\u0643\u064a\u0632 \u0623\u0648\u0636\u062d \u0639\u0644\u0649 \u0627\u0644\u062d\u0642\u0648\u0644 \u0648\u0627\u0644\u0632\u0631 \u0627\u0644\u0623\u0633\u0627\u0633\u064a.',
      registerFlowDescription: '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062d\u0633\u0627\u0628 \u0628\u062e\u0637\u0648\u0627\u062a \u0623\u0648\u0636\u062d \u0648\u0645\u0633\u0627\u062d\u0627\u062a \u0623\u0648\u0633\u0639 \u062a\u0646\u0627\u0633\u0628 \u0627\u0644\u062c\u0644\u0633\u0627\u062a \u0627\u0644\u0637\u0648\u064a\u0644\u0629 \u0639\u0644\u0649 \u0627\u0644\u0643\u0645\u0628\u064a\u0648\u062a\u0631.',
      accountAccess: '\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u062d\u0633\u0627\u0628',
      messageSuccess: '\u062a\u0645\u062a \u0627\u0644\u0639\u0645\u0644\u064a\u0629 \u0628\u0646\u062c\u0627\u062d',
      messageFailure: '\u062a\u0639\u0630\u0631 \u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u0637\u0644\u0628'
    },

    // Products Page extra
    productsPageExtra: {
      noResultsFor: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0646\u062a\u0627\u0626\u062c \u0644\u0640 "{query}"',
      tryAdjusting: '\u062c\u0631\u0651\u0628 \u062a\u0639\u062f\u064a\u0644 \u0643\u0644\u0645\u0627\u062a \u0627\u0644\u0628\u062d\u062b \u0623\u0648 \u062a\u0635\u0641\u0651\u062d \u0643\u0644 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a'
    },

    // Profile Page extra
    profilePageExtra: {
      allCodesViewed: '\u062a\u0645 \u062a\u0639\u0644\u064a\u0645 \u0643\u0644 \u0627\u0644\u0623\u0643\u0648\u0627\u062f \u0643\u0645\u0634\u0627\u0647\u062f\u0629',
      allLinksViewed: '\u062a\u0645 \u062a\u0639\u0644\u064a\u0645 \u062c\u0645\u064a\u0639 \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0643\u0645\u0634\u0627\u0647\u062f\u0629',
      failedToMarkCodes: '\u0641\u0634\u0644 \u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0623\u0643\u0648\u0627\u062f \u0643\u0645\u0634\u0627\u0647\u062f\u0629',
      failedToMarkLinks: '\u0641\u0634\u0644 \u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0643\u0645\u0634\u0627\u0647\u062f\u0629',
      deliveryNotesEmpty: '\u0633\u062a\u0638\u0647\u0631 \u0645\u0644\u0627\u062d\u0638\u0627\u062a \u0627\u0644\u062a\u0633\u0644\u064a\u0645 \u0648\u0631\u0648\u0627\u0628\u0637\u0647\u0627 \u0647\u0646\u0627 \u0628\u0639\u062f \u0634\u0631\u0627\u0621 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629',
      noLinksYet: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0631\u0648\u0627\u0628\u0637 \u0645\u062a\u0627\u062d\u0629 \u062d\u062a\u0649 \u0627\u0644\u0622\u0646',
      buyProductsForLinks: '\u0642\u0645 \u0628\u0634\u0631\u0627\u0621 \u0645\u0646\u062a\u062c\u0627\u062a \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u0648\u0635\u0648\u0644',
      shippingTrackingEmpty: '\u0639\u0646\u062f \u0625\u062a\u0645\u0627\u0645 \u0637\u0644\u0628\u0643 \u0633\u064a\u0638\u0647\u0631 \u062a\u062a\u0628\u0639 \u0627\u0644\u0634\u062d\u0646 \u0647\u0646\u0627',
      addShippingAddress: '\u0623\u0636\u0641 \u0639\u0646\u0648\u0627\u0646 \u0634\u062d\u0646 \u0644\u062a\u0633\u0647\u064a\u0644 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u0637\u0644\u0628',
      shippingNotificationsDesc: '\u0627\u062d\u0635\u0644 \u0639\u0644\u0649 \u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0641\u0648\u0631\u064a\u0629 \u0639\u0646\u062f \u062a\u062d\u062f\u064a\u062b \u062d\u0627\u0644\u0629 \u0634\u062d\u0646 \u0637\u0644\u0628\u0627\u062a\u0643',
      shippingNotificationsEnabled: '\u062a\u0645 \u062a\u0641\u0639\u064a\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0627\u0644\u0634\u062d\u0646 \u0628\u0646\u062c\u0627\u062d!',
      browserNotSupported: '\u0647\u0630\u0627 \u0627\u0644\u0645\u062a\u0635\u0641\u062d \u0644\u0627 \u064a\u062f\u0639\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a',
      allowNotifications: '\u064a\u0631\u062c\u0649 \u0627\u0644\u0633\u0645\u0627\u062d \u0628\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0641\u064a \u0627\u0644\u0645\u062a\u0635\u0641\u062d',
      notificationsDenied: '\u26a0\ufe0f \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0645\u062d\u0638\u0648\u0631\u0629. \u064a\u0631\u062c\u0649 \u062a\u0641\u0639\u064a\u0644\u0647\u0627 \u0645\u0646 \u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u0645\u062a\u0635\u0641\u062d:\n1. \u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0623\u064a\u0642\u0648\u0646\u0629 \u0627\u0644\u0642\u0641\u0644 \u0628\u062c\u0627\u0646\u0628 \u0627\u0644\u0639\u0646\u0648\u0627\u0646\n2. \u0627\u062e\u062a\u0631 \'\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a\'\n3. \u0627\u062e\u062a\u0631 \'\u0627\u0644\u0633\u0645\u0627\u062d\'',
      egpFormat: '{amount} \u062c.\u0645',
      selectCountryFirst: '\u064a\u0631\u062c\u0649 \u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u062f\u0648\u0644\u0629 \u0623\u0648\u0644\u0627\u064b \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062f\u0648\u0644',
      noRegionsAvailable: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0646\u0627\u0637\u0642 \u0645\u062a\u0627\u062d\u0629',
      loadMore: '\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0632\u064a\u062f',
      loadingMore: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644...',
      loadError: '\u0641\u0634\u0644 \u0627\u0644\u062a\u062d\u0645\u064a\u0644. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      retry: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629',
      addFundsInfo: '\u0644\u0625\u0636\u0627\u0641\u0629 \u0631\u0635\u064a\u062f \u0625\u0644\u0649 \u0645\u062d\u0641\u0638\u062a\u0643\u060c \u064a\u0631\u062c\u0649 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645.'
    },

    // Checkout Page extra
    checkoutPageExtra: {
      egpSymbol: '\u062c.\u0645',
      minOrderAmount: '\u0627\u0644\u062d\u062f \u0627\u0644\u0623\u062f\u0646\u0649 \u0644\u0644\u0637\u0644\u0628: {amount}',
      maxOrderAmount: '\u0627\u0644\u062d\u062f \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0637\u0644\u0628: {amount}',
      andMoreUnavailable: '\u0648 {count} \u0645\u0646\u062a\u062c\u0627\u062a \u0623\u062e\u0631\u0649...'
    },

    advancedCheckoutExtra: {
      customerInformation: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0639\u0645\u064a\u0644',
      firstName: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644',
      lastName: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u062e\u064a\u0631',
      firstNamePlaceholder: '\u0623\u062f\u062e\u0644 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644',
      lastNamePlaceholder: '\u0623\u062f\u062e\u0644 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u062e\u064a\u0631',
      emailAddress: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
      emailPlaceholder: 'your@email.com',
      phoneOptional: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641 (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)',
      phonePlaceholder: '+1 (555) 123-4567',
      continueToPayment: '\u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0625\u0644\u0649 \u0627\u0644\u062f\u0641\u0639',
      selectPaymentMethod: '\u0627\u062e\u062a\u0631 \u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639',
      sendPaymentTo: '\u0623\u0631\u0633\u0644 \u0627\u0644\u062f\u0641\u0639 \u0625\u0644\u0649:',
      network: '\u0627\u0644\u0634\u0628\u0643\u0629',
      amount: '\u0627\u0644\u0645\u0628\u0644\u063a',
      confirmPayment: '\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062f\u0641\u0639',
      processingPayment: '\u062c\u0627\u0631\u064a \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u062f\u0641\u0639',
      processingDescription: '\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631 \u0628\u064a\u0646\u0645\u0627 \u0646\u0642\u0648\u0645 \u0628\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062f\u0641\u0639...',
      processingHint: '\u0642\u062f \u064a\u0633\u062a\u063a\u0631\u0642 \u0647\u0630\u0627 \u0628\u0636\u0639 \u062f\u0642\u0627\u0626\u0642',
      paymentSuccessful: '\u062a\u0645 \u0627\u0644\u062f\u0641\u0639 \u0628\u0646\u062c\u0627\u062d!',
      successDescription: '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0637\u0644\u0628\u0643 \u0648\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a.',
      orderDetails: '\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0637\u0644\u0628',
      orderId: '\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628',
      paymentMethod: '\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639',
      transaction: '\u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0629',
      orderItems: '\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0637\u0644\u0628',
      qty: 'x',
      viewOrders: '\u0639\u0631\u0636 \u0627\u0644\u0637\u0644\u0628\u0627\u062a',
      paymentFailed: '\u0641\u0634\u0644 \u0627\u0644\u062f\u0641\u0639',
      failedDescription: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u062f\u0641\u0639. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
      taxLabel: '\u0627\u0644\u0636\u0631\u064a\u0628\u0629 (8%)',
      emailRequired: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0645\u0637\u0644\u0648\u0628',
      invalidEmailFormat: '\u062a\u0646\u0633\u064a\u0642 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u063a\u064a\u0631 \u0635\u062d\u064a\u062d',
      firstNameRequired: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 \u0645\u0637\u0644\u0648\u0628',
      lastNameRequired: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u062e\u064a\u0631 \u0645\u0637\u0644\u0648\u0628',
      failedToCreateOrder: '\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0637\u0644\u0628'
    },

    // Payment Status page
    paymentStatusPage: {
      paymentInfoNotFound: '\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u0639\u062b\u0648\u0631 \u0639\u0644\u0649 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062f\u0641\u0639. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0645\u0646 \u0635\u0641\u062d\u0629 \u0627\u0644\u062f\u0641\u0639.',
      errorOccurred: '\u062d\u062f\u062b \u062e\u0637\u0623',
      errorVerifyingPayment: '\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062f\u0641\u0639',
      backToPayment: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u062f\u0641\u0639',
      homePage: '\u0627\u0644\u0635\u0641\u062d\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
      operationCancelled: '\u062a\u0645 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064a\u0629',
      tryAgainOrBrowse: '\u064a\u0645\u0643\u0646\u0643 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0623\u0648 \u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u062a\u0633\u0648\u0642',
      retry: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629',
      verifyingPayment: '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062f\u0641\u0639',
      paymentNotConfirmedYet: '\u0644\u0645 \u064a\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0646\u062a\u064a\u062c\u0629 \u0627\u0644\u062f\u0641\u0639 \u0628\u0639\u062f. \u0642\u062f \u064a\u0633\u062a\u063a\u0631\u0642 \u0627\u0644\u0623\u0645\u0631 \u0628\u0639\u0636 \u0627\u0644\u0648\u0642\u062a.',
      processingPayment: '\u062c\u0627\u0631\u064a \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u062f\u0641\u0639...',
      pleaseWaitDontClose: '\u064a\u0631\u062c\u0649 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631\u060c \u0644\u0627 \u062a\u063a\u0644\u0642 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629',
      paymentNotCompleted: '\u0644\u0645 \u062a\u0643\u062a\u0645\u0644 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062f\u0641\u0639\u061f',
      paymentNotCompletedDesc: '\u0625\u0630\u0627 \u0644\u0645 \u062a\u0642\u0645 \u0628\u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u062f\u0641\u0639 \u0623\u0648 \u0648\u0627\u062c\u0647\u062a \u0645\u0634\u0643\u0644\u0629\u060c \u064a\u0645\u0643\u0646\u0643 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064a\u0629',
      cancelAndReturn: '\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064a\u0629 \u0648\u0627\u0644\u0639\u0648\u062f\u0629'
    },

    // Checkout Failed Tips
    checkoutFailedTips: {
      cancelledTip1: '\u0627\u0636\u063a\u0637 "\u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649" \u0639\u0646\u062f\u0645\u0627 \u062a\u0643\u0648\u0646 \u062c\u0627\u0647\u0632\u0627\u064b \u0644\u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u0634\u0631\u0627\u0621',
      cancelledTip2: '\u064a\u0645\u0643\u0646\u0643 \u0627\u062e\u062a\u064a\u0627\u0631 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0645\u062e\u062a\u0644\u0641\u0629 \u0625\u0630\u0627 \u0623\u0631\u062f\u062a',
      verificationTip1: '\u0625\u0630\u0627 \u062a\u0645 \u062e\u0635\u0645 \u0627\u0644\u0645\u0628\u0644\u063a\u060c \u0644\u0627 \u062a\u062d\u0627\u0648\u0644 \u0627\u0644\u062f\u0641\u0639 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u2014 \u062a\u062d\u0642\u0642 \u0645\u0646 "\u062a\u062a\u0628\u0639 \u0627\u0644\u0637\u0644\u0628" \u0623\u0648\u0644\u0627\u064b',
      verificationTip2: '\u0627\u0646\u062a\u0638\u0631 \u0628\u0636\u0639 \u062f\u0642\u0627\u0626\u0642 \u062b\u0645 \u062a\u062d\u0642\u0642 \u0645\u0646 \u062d\u0627\u0644\u0629 \u0637\u0644\u0628\u0643',
      verificationTip3: '\u0625\u0630\u0627 \u0644\u0645 \u064a\u062a\u0645 \u062e\u0635\u0645 \u0623\u064a \u0645\u0628\u0644\u063a\u060c \u064a\u0645\u0643\u0646\u0643 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0628\u0623\u0645\u0627\u0646',
      verificationTip4: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645 \u0625\u0630\u0627 \u0643\u0646\u062a \u063a\u064a\u0631 \u0645\u062a\u0623\u0643\u062f',
      declinedTip1: '\u062a\u0623\u0643\u062f \u0645\u0646 \u0635\u062d\u0629 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0648\u0627\u0644\u0631\u0635\u064a\u062f \u0627\u0644\u0645\u062a\u0627\u062d',
      declinedTip2: '\u062c\u0631\u0628 \u0628\u0637\u0627\u0642\u0629 \u0623\u062e\u0631\u0649 \u0623\u0648 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0645\u062e\u062a\u0644\u0641\u0629',
      declinedTip3: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0628\u0646\u0643 \u0644\u0644\u062a\u0623\u0643\u062f \u0645\u0646 \u0639\u062f\u0645 \u0648\u062c\u0648\u062f \u0642\u064a\u0648\u062f \u0639\u0644\u0649 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062a \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629',
      insufficientTip1: '\u062a\u0623\u0643\u062f \u0645\u0646 \u062a\u0648\u0641\u0631 \u0627\u0644\u0631\u0635\u064a\u062f \u0627\u0644\u0643\u0627\u0641\u064a \u0641\u064a \u062d\u0633\u0627\u0628\u0643',
      insufficientTip2: '\u062c\u0631\u0628 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0623\u062e\u0631\u0649 \u0623\u0648 \u0628\u0637\u0627\u0642\u0629 \u0645\u062e\u062a\u0644\u0641\u0629',
      expiredTip1: '\u0627\u0633\u062a\u062e\u062f\u0645 \u0628\u0637\u0627\u0642\u0629 \u0633\u0627\u0631\u064a\u0629 \u0627\u0644\u0645\u0641\u0639\u0648\u0644',
      expiredTip2: '\u064a\u0645\u0643\u0646\u0643 \u0623\u064a\u0636\u0627\u064b \u0627\u062e\u062a\u064a\u0627\u0631 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0628\u062f\u064a\u0644\u0629',
      invalidCardTip1: '\u062a\u062d\u0642\u0642 \u0645\u0646 \u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u2014 \u062a\u0623\u0643\u062f \u0645\u0646 \u0625\u062f\u062e\u0627\u0644\u0647 \u0628\u0634\u0643\u0644 \u0635\u062d\u064a\u062d',
      invalidCardTip2: '\u062a\u0623\u0643\u062f \u0645\u0646 \u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0627\u0646\u062a\u0647\u0627\u0621 \u0648\u0631\u0645\u0632 \u0627\u0644\u0623\u0645\u0627\u0646 (CVV)',
      invalidCardTip3: '\u062c\u0631\u0628 \u0625\u0639\u0627\u062f\u0629 \u0625\u062f\u062e\u0627\u0644 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0628\u0639\u0646\u0627\u064a\u0629',
      otpTip1: '\u062a\u0623\u0643\u062f \u0645\u0646 \u0625\u062f\u062e\u0627\u0644 \u0631\u0645\u0632 \u0627\u0644\u062a\u062d\u0642\u0642 (OTP) \u0627\u0644\u0645\u0631\u0633\u0644 \u0645\u0646 \u0627\u0644\u0628\u0646\u0643 \u0628\u0634\u0643\u0644 \u0635\u062d\u064a\u062d',
      otpTip2: '\u062a\u0623\u0643\u062f \u0645\u0646 \u0623\u0646 \u0631\u0642\u0645 \u0647\u0627\u062a\u0641\u0643 \u0627\u0644\u0645\u0633\u062c\u0644 \u0644\u062f\u0649 \u0627\u0644\u0628\u0646\u0643 \u0645\u062d\u062f\u062b',
      otpTip3: '\u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0648\u0623\u0643\u0645\u0644 \u062e\u0637\u0648\u0629 \u0627\u0644\u062a\u062d\u0642\u0642 \u062e\u0644\u0627\u0644 \u0627\u0644\u0645\u062f\u0629 \u0627\u0644\u0645\u062d\u062f\u062f\u0629',
      timeoutTip1: '\u062a\u0623\u0643\u062f \u0645\u0646 \u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0627\u062a\u0635\u0627\u0644\u0643 \u0628\u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a',
      timeoutTip2: '\u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0648\u0623\u0643\u0645\u0644 \u0627\u0644\u062f\u0641\u0639 \u0628\u0634\u0643\u0644 \u0623\u0633\u0631\u0639',
      timeoutTip3: '\u062c\u0631\u0628 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0645\u062e\u062a\u0644\u0641\u0629 \u0625\u0630\u0627 \u0627\u0633\u062a\u0645\u0631\u062a \u0627\u0644\u0645\u0634\u0643\u0644\u0629',
      serverTip1: '\u0627\u0646\u062a\u0638\u0631 \u062f\u0642\u064a\u0642\u0629 \u0623\u0648 \u062f\u0642\u064a\u0642\u062a\u064a\u0646 \u062b\u0645 \u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649',
      serverTip2: '\u062c\u0631\u0628 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0623\u062e\u0631\u0649 \u0625\u0630\u0627 \u0627\u0633\u062a\u0645\u0631\u062a \u0627\u0644\u0645\u0634\u0643\u0644\u0629',
      cryptoTip1: '\u062a\u0623\u0643\u062f \u0645\u0646 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0645\u0628\u0644\u063a \u0627\u0644\u0635\u062d\u064a\u062d \u0628\u0627\u0644\u0639\u0645\u0644\u0629 \u0627\u0644\u0645\u062d\u062f\u062f\u0629',
      cryptoTip2: '\u062a\u062d\u0642\u0642 \u0645\u0646 \u0631\u0635\u064a\u062f \u0645\u062d\u0641\u0638\u062a\u0643 \u0627\u0644\u0631\u0642\u0645\u064a\u0629',
      cryptoTip3: '\u062c\u0631\u0628 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0623\u062e\u0631\u0649 \u0625\u0630\u0627 \u0644\u0632\u0645 \u0627\u0644\u0623\u0645\u0631',
      refundTip1: '\u0633\u064a\u0638\u0647\u0631 \u0627\u0644\u0645\u0628\u0644\u063a \u0641\u064a \u062d\u0633\u0627\u0628\u0643 \u062e\u0644\u0627\u0644 \u0663-\u0665 \u0623\u064a\u0627\u0645 \u0639\u0645\u0644',
      refundTip2: '\u0625\u0630\u0627 \u0644\u0645 \u064a\u0638\u0647\u0631 \u0627\u0644\u0645\u0628\u0644\u063a \u0628\u0639\u062f \u0647\u0630\u0647 \u0627\u0644\u0645\u062f\u0629\u060c \u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0628\u0646\u0643 \u0623\u0648 \u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645',
      networkTip1: '\u062a\u0623\u0643\u062f \u0645\u0646 \u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0627\u062a\u0635\u0627\u0644\u0643 \u0628\u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a',
      networkTip2: '\u062c\u0631\u0628 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0628\u0634\u0628\u0643\u0629 Wi-Fi \u0645\u062e\u062a\u0644\u0641\u0629 \u0623\u0648 \u0627\u0633\u062a\u062e\u062f\u0645 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0647\u0627\u062a\u0641',
      networkTip3: '\u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0628\u0639\u062f \u0627\u0644\u062a\u0623\u0643\u062f \u0645\u0646 \u0627\u0644\u0627\u062a\u0635\u0627\u0644',
      technicalTip1: '\u0627\u0646\u062a\u0638\u0631 \u0644\u062d\u0638\u0627\u062a \u062b\u0645 \u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649',
      technicalTip2: '\u062c\u0631\u0628 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0645\u062e\u062a\u0644\u0641\u0629',
      technicalTip3: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645 \u0625\u0630\u0627 \u0627\u0633\u062a\u0645\u0631\u062a \u0627\u0644\u0645\u0634\u0643\u0644\u0629',
      defaultTip1: '\u062a\u062d\u0642\u0642 \u0645\u0646 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u0648\u0627\u0644\u0631\u0635\u064a\u062f \u0627\u0644\u0645\u062a\u0627\u062d \u0648\u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649',
      defaultTip2: '\u062c\u0631\u0628 \u0637\u0631\u064a\u0642\u0629 \u062f\u0641\u0639 \u0645\u062e\u062a\u0644\u0641\u0629',
      defaultTip3: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0628\u0646\u0643 \u0644\u0644\u062a\u0623\u0643\u062f \u0645\u0646 \u0639\u062f\u0645 \u0648\u062c\u0648\u062f \u0642\u064a\u0648\u062f',
      defaultTip4: '\u0625\u0630\u0627 \u0627\u0633\u062a\u0645\u0631\u062a \u0627\u0644\u0645\u0634\u0643\u0644\u0629\u060c \u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645'
    },

    // Language Switcher (storefront) - shows the OTHER language
    languageSwitcher: {
      switchToOtherLang: 'Switch to English',
      otherLangLabel: 'English'
    },

    // Blog Article extra
    blogArticleExtra: {
      backToBlog: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0645\u062f\u0648\u0646\u0629',
      viewAllArticles: '\u0639\u0631\u0636 \u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062a'
    },

    // Auth extra
    authExtra: {
      otpSentMessage: '\u0623\u0631\u0633\u0644\u0646\u0627 \u0631\u0645\u0632 \u062a\u062d\u0642\u0642 \u0645\u0643\u0648\u0646 \u0645\u0646 6 \u0623\u0631\u0642\u0627\u0645 \u0625\u0644\u0649'
    },

    // Product Reviews extra
    productReviewsExtra: {
      customerReviews: '\u062a\u0642\u064a\u064a\u0645\u0627\u062a \u0627\u0644\u0639\u0645\u0644\u0627\u0621',
      basedOnReviews: '\u0628\u0646\u0627\u0621\u064b \u0639\u0644\u0649 {count} \u062a\u0642\u064a\u064a\u0645',
      reviewsSummary: '\u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u064a\u0645\u062f\u062d\u0648\u0646 \u0633\u0631\u0639\u0629 \u0627\u0644\u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u0641\u0648\u0631\u064a \u0648\u0627\u0644\u062f\u0639\u0645 \u0627\u0644\u0633\u0631\u064a\u0639. \u062a\u062c\u0631\u0628\u0629 \u0634\u0631\u0627\u0621 \u0622\u0645\u0646\u0629 \u0645\u0639 \u0636\u0645\u0627\u0646 \u0627\u0633\u062a\u0631\u062f\u0627\u062f \u062e\u0644\u0627\u0644 24 \u0633\u0627\u0639\u0629 \u0639\u0646\u062f \u0627\u0644\u062d\u0627\u062c\u0629.',
      recommendPercentage: '\u0669\u0667\u066a \u064a\u0648\u0635\u0648\u0646 \u0628\u0627\u0644\u0645\u062a\u062c\u0631',
      verifiedPurchase: '\u0639\u0645\u0644\u064a\u0629 \u0634\u0631\u0627\u0621 \u0645\u0648\u062b\u0642\u0629',
      showMoreReviews: '\u0639\u0631\u0636 {count} \u062a\u0642\u064a\u064a\u0645\u0627\u062a \u0625\u0636\u0627\u0641\u064a\u0629'
    },

    // Digital Return Policy extra
    digitalReturnPolicyExtra: {
      followSteps: '\u0627\u062a\u0628\u0639 \u0627\u0644\u062e\u0637\u0648\u0627\u062a \u0627\u0644\u062a\u0627\u0644\u064a\u0629 \u0644\u062a\u0633\u0631\u064a\u0639 \u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0629 \u0648\u0627\u0644\u062d\u0644.',
      legalNote: '\u0645\u0644\u0627\u062d\u0638\u0629: \u0644\u0627 \u064a\u063a\u064a\u0651\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062a\u0646\u062f \u062d\u0642\u0648\u0642\u0643 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0629. \u0641\u064a \u062d\u0627\u0644 \u0648\u062c\u0648\u062f \u062a\u0639\u0627\u0631\u0636\u060c \u062a\u064f\u0637\u0628\u0651\u0642 \u0627\u0644\u0642\u0648\u0627\u0646\u064a\u0646 \u0627\u0644\u0645\u062d\u0644\u064a\u0629 \u0648\u0633\u064a\u0627\u0633\u0627\u062a \u0645\u0632\u0648\u0651\u062f \u0627\u0644\u0645\u0646\u0635\u0629.'
    },

    // Blog Article
    blogArticle: {
      linkCopied: '\u062a\u0645 \u0646\u0633\u062e \u0627\u0644\u0631\u0627\u0628\u0637!',
      articleNotFound: '\u0627\u0644\u0645\u0642\u0627\u0644 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f',
      articleNotFoundDesc: '\u0639\u0630\u0631\u0627\u064b\u060c \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0644 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f \u0623\u0648 \u062a\u0645\u062a \u0625\u0632\u0627\u0644\u062a\u0647',
      views: '\u0645\u0634\u0627\u0647\u062f\u0629',
      share: '\u0645\u0634\u0627\u0631\u0643\u0629',
      moreArticles: '\u0645\u0642\u0627\u0644\u0627\u062a \u0623\u062e\u0631\u0649'
    },

    // ProductPageClient extra
    productPageExtra: {
      egpSymbol: '\u062c.\u0645',
      recently: '\u0645\u0646\u0630 \u0641\u062a\u0631\u0629 \u0642\u0635\u064a\u0631\u0629',
      buyNowLabel: '\u0627\u0634\u062a\u0631 \u0627\u0644\u0622\u0646',
      buyShort: '\u0634\u0631\u0627\u0621',
      optionsShort: '\u062e\u064a\u0627\u0631\u0627\u062a',
      addShort: '\u0623\u0636\u0641',
      shareProduct: '\u0645\u0634\u0627\u0631\u0643\u0629',
      freeShippingBadge: '\u0634\u062d\u0646 \u0645\u062c\u0627\u0646\u064a',
      saveBadge: '\u0648\u0641\u0651\u0631',
      fromPrice: '\u064a\u0628\u062f\u0623 \u0645\u0646',
      onlyXLeft: '\u062a\u0628\u0642\u0649 {count} \u0641\u0642\u0637',
      getItBy: '\u064a\u0635\u0644 \u0628\u062d\u0644\u0648\u0644 {date}',
      estimatedDeliveryRange: '\u0627\u0644\u062a\u0648\u0635\u064a\u0644 \u0627\u0644\u0645\u062a\u0648\u0642\u0639: {min} - {max}',
      freeReturnsWithinDays: '\u0625\u0631\u062c\u0627\u0639 \u0645\u062c\u0627\u0646\u064a \u062e\u0644\u0627\u0644 {days} \u064a\u0648\u0645\u0627\u064b',
      chooseVariant: '\u0627\u062e\u062a\u0631 {group}',
      combinationUnavailable: '\u0647\u0630\u0647 \u0627\u0644\u062a\u0634\u0643\u064a\u0644\u0629 \u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631\u0629',
      completeYourSelection: '\u0623\u0643\u0645\u0644 \u0627\u0644\u0627\u062e\u062a\u064a\u0627\u0631 \u0623\u0648\u0644\u0627\u064b',
      customizeProduct: '\u062a\u062e\u0635\u064a\u0635 \u0627\u0644\u0645\u0646\u062a\u062c',
      completeSelectionFirst: '\u0623\u0643\u0645\u0644 \u0627\u0644\u062a\u062d\u062f\u064a\u062f \u0623\u0648\u0644\u0627\u064b',
      viewFullDetails: '\u0639\u0631\u0636 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0643\u0627\u0645\u0644\u0629',
      chooseRightOption: '\u0627\u062e\u062a\u0631 \u0627\u0644\u062e\u064a\u0627\u0631 \u0627\u0644\u0645\u0646\u0627\u0633\u0628',
      selectedOfTotal: '\u062a\u0645 \u062a\u062d\u062f\u064a\u062f {selected} \u0645\u0646 {total}',
      chooseOptionsBefore: '\u062d\u062f\u0651\u062f \u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0642\u0628\u0644 \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629',
      addFailed: '\u062a\u0639\u0630\u0651\u0631\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.',
    },

    // Footer features
    footerFeatures: {
      secureContents: '\u0645\u062d\u062a\u0648\u064a\u0627\u062a \u0622\u0645\u0646\u0629',
      instantDelivery: '\u062a\u0633\u0644\u064a\u0645 \u0641\u0648\u0631\u064a',
      returnGuarantee: '\u0636\u0645\u0627\u0646 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
      securePackaging: '\u062a\u063a\u0644\u064a\u0641 \u0622\u0645\u0646',
      fastShipping: '\u0634\u062d\u0646 \u0633\u0631\u064a\u0639',
      easyReturns: '\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0633\u0647\u0644'
    },

    // Shipping Policy fallback
    shippingPolicyFallback: {
      heroBadge: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0634\u062d\u0646',
      heroTitlePrimary: '\u0633\u064a\u0627\u0633\u0629',
      heroTitleHighlight: '\u0627\u0644\u0634\u062d\u0646',
      heroDescription: '\u062a\u0639\u0631\u0641 \u0639\u0644\u0649 \u0637\u0631\u0642 \u0627\u0644\u0634\u062d\u0646 \u0648\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u062a\u0648\u0635\u064a\u0644.',
      heroLastUpdated: '\u0622\u062e\u0631 \u062a\u062d\u062f\u064a\u062b: \u062f\u064a\u0633\u0645\u0628\u0631 2025',
      sectionShippingMethodsTitle: '\u0637\u0631\u0642 \u0627\u0644\u0634\u062d\u0646',
      sectionShippingMethodsItem1: '\u062e\u064a\u0627\u0631\u0627\u062a \u0634\u062d\u0646 \u0645\u062a\u0639\u062f\u062f\u0629 \u0645\u062a\u0627\u062d\u0629',
      sectionShippingMethodsItem2: '\u0634\u062d\u0646 \u0639\u0627\u062f\u064a \u0648\u0633\u0631\u064a\u0639',
      sectionShippingMethodsItem3: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u062a\u0628\u0639 \u0645\u062a\u0648\u0641\u0631\u0629',
      sectionDeliveryAreasTitle: '\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u062a\u0648\u0635\u064a\u0644',
      sectionDeliveryAreasItem1: '\u0646\u0634\u062d\u0646 \u0625\u0644\u0649 \u0645\u0646\u0627\u0637\u0642 \u0645\u062a\u0639\u062f\u062f\u0629',
      sectionDeliveryAreasItem2: '\u0627\u0644\u0634\u062d\u0646 \u0627\u0644\u062f\u0648\u0644\u064a \u0645\u062a\u0627\u062d',
      sectionDeliveryAreasItem3: '\u0639\u0646\u0648\u0627\u0646 \u062f\u0642\u064a\u0642 \u0645\u0637\u0644\u0648\u0628',
      sectionOrderProcessingTitle: '\u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u0637\u0644\u0628\u0627\u062a',
      sectionOrderProcessingItem1: '\u0645\u0639\u0627\u0644\u062c\u0629 \u0628\u0639\u062f \u0627\u0644\u062f\u0641\u0639',
      sectionOrderProcessingItem2: '\u0631\u0642\u0645 \u0627\u0644\u062a\u062a\u0628\u0639 \u0639\u0628\u0631 \u0627\u0644\u0628\u0631\u064a\u062f',
      sectionOrderProcessingItem3: '\u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062d\u0627\u0644\u0629 \u0641\u064a \u062d\u0633\u0627\u0628\u0643',
      sectionShippingCostsTitle: '\u062a\u0643\u0627\u0644\u064a\u0641 \u0627\u0644\u0634\u062d\u0646',
      sectionShippingCostsItem1: '\u062a\u064f\u062d\u0633\u0628 \u0639\u0646\u062f \u0627\u0644\u062f\u0641\u0639',
      sectionShippingCostsItem2: '\u0639\u0631\u0648\u0636 \u0634\u062d\u0646 \u0645\u062c\u0627\u0646\u064a',
      sectionShippingCostsItem3: '\u0644\u0627 \u0631\u0633\u0648\u0645 \u0645\u062e\u0641\u064a\u0629',
      featuresTitle: '\u0648\u0639\u062f\u0646\u0627 \u0641\u064a \u0627\u0644\u0634\u062d\u0646',
      featureTrackingTitle: '\u062a\u062a\u0628\u0639 \u0627\u0644\u0637\u0644\u0628',
      featureTrackingDesc: '\u062a\u062a\u0628\u0639 \u0643\u0644 \u062e\u0637\u0648\u0629',
      featureSecureTitle: '\u062a\u063a\u0644\u064a\u0641 \u0622\u0645\u0646',
      featureSecureDesc: '\u0645\u0646\u062a\u062c\u0627\u062a \u0645\u0639\u0628\u0623\u0629 \u0628\u0639\u0646\u0627\u064a\u0629',
      featureSupportTitle: '\u062f\u0639\u0645 \u0627\u0644\u0634\u062d\u0646',
      featureSupportDesc: '\u0645\u0633\u0627\u0639\u062f\u0629 \u0641\u064a \u0627\u0644\u0623\u0633\u0626\u0644\u0629',
      featureCoverageTitle: '\u062a\u063a\u0637\u064a\u0629 \u0648\u0627\u0633\u0639\u0629',
      featureCoverageDesc: '\u0648\u062c\u0647\u0627\u062a \u0645\u062a\u0639\u062f\u062f\u0629',
      ctaTitle: '\u062a\u062d\u062a\u0627\u062c \u0645\u0633\u0627\u0639\u062f\u0629 \u0641\u064a \u0627\u0644\u0634\u062d\u0646\u061f',
      ctaDescription: '\u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645 \u062c\u0627\u0647\u0632 \u0644\u0644\u0645\u0633\u0627\u0639\u062f\u0629.',
      ctaPrimary: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062f\u0639\u0645',
      ctaSecondary: '\u062a\u062a\u0628\u0639 \u0627\u0644\u0637\u0644\u0628'
    },

    // Return Policy fallback
    returnPolicyFallback: {
      heroBadge: '\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0633\u0647\u0644',
      heroTitlePrimary: '\u0633\u064a\u0627\u0633\u0629',
      heroTitleHighlight: '\u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
      heroDescription: '\u0646\u0631\u064a\u062f\u0643 \u0623\u0646 \u062a\u0643\u0648\u0646 \u0631\u0627\u0636\u064a\u0627\u064b \u062a\u0645\u0627\u0645\u0627\u064b \u0639\u0646 \u0645\u0634\u062a\u0631\u064a\u0627\u062a\u0643. \u0625\u0630\u0627 \u0644\u0645 \u062a\u0643\u0646 \u0633\u0639\u064a\u062f\u0627\u064b\u060c \u0646\u062d\u0646 \u0647\u0646\u0627 \u0644\u0644\u0645\u0633\u0627\u0639\u062f\u0629.',
      heroLastUpdated: '\u0622\u062e\u0631 \u062a\u062d\u062f\u064a\u062b: \u062f\u064a\u0633\u0645\u0628\u0631 2025',
      returnPeriodTitle: '\u0641\u062a\u0631\u0629 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
      returnPeriodDays: '14 \u064a\u0648\u0645\u0627\u064b',
      returnPeriodDesc: '\u0644\u062f\u064a\u0643 14 \u064a\u0648\u0645\u0627\u064b \u0645\u0646 \u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0634\u0631\u0627\u0621 \u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0627\u0644\u0645\u0646\u062a\u062c',
      sectionEligibilityTitle: '\u0634\u0631\u0648\u0637 \u0627\u0644\u0623\u0647\u0644\u064a\u0629 \u0644\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
      sectionEligibilityItem1: '\u064a\u062c\u0628 \u0623\u0646 \u064a\u0643\u0648\u0646 \u0627\u0644\u0645\u0646\u062a\u062c \u0641\u064a \u062d\u0627\u0644\u062a\u0647 \u0627\u0644\u0623\u0635\u0644\u064a\u0629',
      sectionEligibilityItem2: '\u064a\u062c\u0628 \u0623\u0646 \u064a\u0643\u0648\u0646 \u0627\u0644\u0645\u0646\u062a\u062c \u063a\u064a\u0631 \u0645\u0633\u062a\u062e\u062f\u0645',
      sectionEligibilityItem3: '\u064a\u062c\u0628 \u0623\u0646 \u062a\u0643\u0648\u0646 \u0627\u0644\u0639\u0628\u0648\u0629 \u0627\u0644\u0623\u0635\u0644\u064a\u0629 \u0633\u0644\u064a\u0645\u0629',
      sectionEligibilityItem4: '\u0625\u062b\u0628\u0627\u062a \u0627\u0644\u0634\u0631\u0627\u0621 \u0645\u0637\u0644\u0648\u0628',
      sectionConditionsTitle: '\u0634\u0631\u0648\u0637 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
      sectionConditionsItem1: '\u064a\u062c\u0628 \u0623\u0644\u0627 \u062a\u0638\u0647\u0631 \u0639\u0644\u0627\u0645\u0627\u062a \u0627\u0633\u062a\u062e\u062f\u0627\u0645',
      sectionConditionsItem2: '\u064a\u062c\u0628 \u062a\u0636\u0645\u064a\u0646 \u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0644\u062d\u0642\u0627\u062a',
      sectionConditionsItem3: '\u064a\u062c\u0628 \u0623\u0646 \u062a\u0643\u0648\u0646 \u0641\u064a \u062d\u0627\u0644\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0628\u064a\u0639',
      sectionRefundTitle: '\u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u0627\u0633\u062a\u0631\u062f\u0627\u062f',
      sectionRefundItem1: '\u062a\u062a\u0645 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0628\u0639\u062f \u0641\u062d\u0635 \u0627\u0644\u0645\u0646\u062a\u062c',
      sectionRefundItem2: '\u064a\u062a\u0645 \u0627\u0644\u0627\u0633\u062a\u0631\u062f\u0627\u062f \u0644\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639 \u0627\u0644\u0623\u0635\u0644\u064a\u0629',
      sectionRefundItem3: '\u064a\u062e\u062a\u0644\u0641 \u0648\u0642\u062a \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u062d\u0633\u0628 \u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639',
      sectionExchangesTitle: '\u0627\u0644\u0627\u0633\u062a\u0628\u062f\u0627\u0644',
      sectionExchangesItem1: '\u0627\u0644\u0627\u0633\u062a\u0628\u062f\u0627\u0644 \u0645\u062a\u0627\u062d \u0644\u0623\u062d\u062c\u0627\u0645 \u0623\u0648 \u0623\u0644\u0648\u0627\u0646 \u0645\u062e\u062a\u0644\u0641\u0629',
      sectionExchangesItem2: '\u064a\u062e\u0636\u0639 \u0644\u062a\u0648\u0641\u0631 \u0627\u0644\u0645\u0646\u062a\u062c',
      sectionExchangesItem3: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062f\u0639\u0645 \u0644\u0644\u0627\u0633\u062a\u0628\u062f\u0627\u0644',
      processTitle: '\u0643\u064a\u0641\u064a\u0629 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
      processContactTitle: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',
      processContactDesc: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645',
      processApprovalTitle: '\u0627\u062d\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629',
      processApprovalDesc: '\u0627\u0633\u062a\u0644\u0645 \u062a\u0635\u0631\u064a\u062d \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
      processShipTitle: '\u0634\u062d\u0646 \u0627\u0644\u0645\u0646\u062a\u062c',
      processShipDesc: '\u0642\u0645 \u0628\u062a\u063a\u0644\u064a\u0641 \u0648\u0634\u062d\u0646 \u0627\u0644\u0645\u0646\u062a\u062c',
      processRefundTitle: '\u0627\u0633\u062a\u0644\u0645 \u0627\u0644\u0645\u0628\u0644\u063a',
      processRefundDesc: '\u0627\u062d\u0635\u0644 \u0639\u0644\u0649 \u0627\u0633\u062a\u0631\u062f\u0627\u062f\u0643 \u0628\u0639\u062f \u0627\u0644\u0641\u062d\u0635',
      nonReturnableTitle: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u063a\u064a\u0631 \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
      nonReturnableItem1: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0645\u0641\u062a\u0648\u062d\u0629 \u0623\u0648 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u0629',
      nonReturnableItem2: '\u0628\u0637\u0627\u0642\u0627\u062a \u0627\u0644\u0647\u062f\u0627\u064a\u0627',
      nonReturnableItem3: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0628\u062a\u062e\u0641\u064a\u0636 \u0646\u0647\u0627\u0626\u064a',
      nonReturnableItem4: '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0645\u062e\u0635\u0635\u0629',
      ctaTitle: '\u062a\u062d\u062a\u0627\u062c \u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0645\u0646\u062a\u062c\u061f',
      ctaDescription: '\u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645 \u062c\u0627\u0647\u0632 \u0644\u0645\u0633\u0627\u0639\u062f\u062a\u0643.',
      ctaPrimary: '\u0628\u062f\u0621 \u0627\u0644\u0627\u0633\u062a\u0631\u062c\u0627\u0639',
      ctaSecondary: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u062f\u0639\u0645'
    },
    sprint3: {
      categoryFilters: {
        filters: '\u0627\u0644\u0641\u0644\u0627\u062a\u0631',
        filterSort: '\u062a\u0635\u0641\u064a\u0629 \u0648\u062a\u0631\u062a\u064a\u0628',
        sortBy: '\u062a\u0631\u062a\u064a\u0628 \u062d\u0633\u0628',
        popular: '\u0627\u0644\u0623\u0643\u062b\u0631 \u0645\u0628\u064a\u0639\u0627\u064b',
        newest: '\u0627\u0644\u0623\u062d\u062f\u062b',
        priceAsc: '\u0627\u0644\u0633\u0639\u0631: \u0627\u0644\u0623\u0642\u0644 \u0623\u0648\u0644\u0627\u064b',
        priceDesc: '\u0627\u0644\u0633\u0639\u0631: \u0627\u0644\u0623\u0639\u0644\u0649 \u0623\u0648\u0644\u0627\u064b',
        topRated: '\u0627\u0644\u0623\u0639\u0644\u0649 \u062a\u0642\u064a\u064a\u0645\u0627\u064b',
        biggestDiscount: '\u0623\u0643\u0628\u0631 \u062e\u0635\u0645',
        priceRange: '\u0646\u0637\u0627\u0642 \u0627\u0644\u0633\u0639\u0631',
        minRating: '\u0623\u0642\u0644 \u062a\u0642\u064a\u064a\u0645',
        ratingAny: '\u0623\u064a',
        inStockOnly: '\u0627\u0644\u0645\u062a\u0648\u0641\u0631 \u0641\u0642\u0637',
        clearAllFilters: '\u0645\u0633\u062d \u062c\u0645\u064a\u0639 \u0627\u0644\u0641\u0644\u0627\u062a\u0631',
        showResults: '\u0639\u0631\u0636 \u0627\u0644\u0646\u062a\u0627\u0626\u062c',
        noResults: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0646\u062a\u062c\u0627\u062a \u062a\u0637\u0627\u0628\u0642 \u0627\u0644\u0641\u0644\u0627\u062a\u0631'
      },
      recentSearches: {
        title: '\u0628\u062d\u062b\u062a \u0645\u0624\u062e\u0631\u0627\u064b',
        clearAll: '\u0645\u0633\u062d \u0627\u0644\u0643\u0644'
      },
      quickView: {
        buttonLabel: '\u0639\u0631\u0636 \u0633\u0631\u064a\u0639',
        close: '\u0625\u063a\u0644\u0627\u0642',
        addToCart: '\u0623\u0636\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629',
        added: '\u062a\u0645\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u2713',
        outOfStock: '\u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631',
        selectOptions: '\u0627\u062e\u062a\u0631 \u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a',
        viewFullDetails: '\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644',
        addFailed: '\u062a\u0639\u0630\u0651\u0631\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.'
      },
      qa: {
        title: '\u0623\u0633\u0626\u0644\u0629 \u0648\u0623\u062c\u0648\u0628\u0629',
        askQuestion: '\u0627\u0637\u0631\u062d \u0633\u0624\u0627\u0644\u0627\u064b',
        yourName: '\u0627\u0644\u0627\u0633\u0645',
        emailPlaceholder: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        questionPlaceholder: '\u0627\u0643\u062a\u0628 \u0633\u0624\u0627\u0644\u0643...',
        reviewNote: '\u0633\u064a\u062a\u0645 \u0645\u0631\u0627\u062c\u0639\u0629 \u0633\u0624\u0627\u0644\u0643 \u0642\u0628\u0644 \u0627\u0644\u0646\u0634\u0631',
        loading: '\u062c\u0627\u0631\u0650 \u0627\u0644\u062a\u062d\u0645\u064a\u0644...',
        submit: '\u0625\u0631\u0633\u0627\u0644',
        submitted: '\u062a\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644',
        noQuestions: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0633\u0626\u0644\u0629 \u0628\u0639\u062f. \u0643\u0646 \u0623\u0648\u0644 \u0645\u0646 \u064a\u0633\u0623\u0644!',
        askedBy: '\u0628\u0648\u0627\u0633\u0637\u0629',
        supportTeam: '(\u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645)',
        helpful: '\u0645\u0641\u064a\u062f',
        submitError: '\u062a\u0639\u0630\u0651\u0631 \u0627\u0644\u0625\u0631\u0633\u0627\u0644. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u062c\u062f\u062f\u0627\u064b.',
        networkError: '\u062e\u0637\u0623 \u0641\u064a \u0627\u0644\u0634\u0628\u0643\u0629. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u062c\u062f\u062f\u0627\u064b.',
        csrfError: '\u0641\u0634\u0644 \u0627\u0644\u062a\u062d\u0642\u0642 \u0627\u0644\u0623\u0645\u0646\u064a. \u064a\u0631\u062c\u0649 \u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0635\u0641\u062d\u0629 \u0648\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.',
        rateLimitError: '\u0645\u062d\u0627\u0648\u0644\u0627\u062a \u0643\u062b\u064a\u0631\u0629. \u0627\u0646\u062a\u0638\u0631 \u0644\u062d\u0638\u0629 \u062b\u0645 \u0623\u0639\u062f \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629.',
        loadError: '\u062a\u0639\u0630\u0651\u0631 \u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0623\u0633\u0626\u0644\u0629. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u062c\u062f\u062f\u0627\u064b.',
        retry: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629',
        successTitle: '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0633\u0624\u0627\u0644',
        successMessage: '\u0634\u0643\u0631\u0627\u064b \u0644\u0643. \u0633\u0624\u0627\u0644\u0643 \u0642\u064a\u062f \u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0629 \u0648\u0633\u064a\u0638\u0647\u0631 \u0642\u0631\u064a\u0628\u0627\u064b.',
        successClose: '\u062a\u0645'
      },
      stockNotify: {
        buttonLabel: '\u0623\u0628\u0644\u063a\u0646\u064a \u0639\u0646\u062f \u0627\u0644\u062a\u0648\u0641\u0631',
        modalTitle: '\u0646\u0628\u0647\u0646\u064a \u0639\u0646\u062f \u0627\u0644\u062a\u0648\u0641\u0631',
        modalDesc: '\u0633\u0646\u0631\u0633\u0644 \u0644\u0643 \u0628\u0631\u064a\u062f\u0627\u064b \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0627\u064b \u0641\u0648\u0631 \u062a\u0648\u0641\u0631 \u0627\u0644\u0645\u0646\u062a\u062c.',
        emailPlaceholder: '\u0628\u0631\u064a\u062f\u0643 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        alsoNotifyPriceDrop: '\u0646\u0628\u0651\u0647\u0646\u064a \u0623\u064a\u0636\u0627\u064b \u0639\u0646\u062f \u0627\u0646\u062e\u0641\u0627\u0636 \u0627\u0644\u0633\u0639\u0631',
        notifyMe: '\u0627\u0634\u062a\u0631\u0643',
        done: '\u062a\u0645!',
        submitError: '\u062a\u0639\u0630\u0631 \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u062c\u062f\u062f\u0627\u064b.',
        networkError: '\u062e\u0637\u0623 \u0641\u064a \u0627\u0644\u0634\u0628\u0643\u0629. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u062c\u062f\u062f\u0627\u064b.'
      },
      reviewsHistogram: {
        reviews: '\u062a\u0642\u064a\u064a\u0645'
      },
      savedPayments: {
        title: '\u0628\u0637\u0627\u0642\u0627\u062a\u064a \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629',
        encrypted: '\u0622\u0645\u0646\u0629 \u0628\u0627\u0644\u062a\u0634\u0641\u064a\u0631',
        loading: '\u062c\u0627\u0631\u0650 \u0627\u0644\u062a\u062d\u0645\u064a\u0644...',
        deleteConfirm: '\u0647\u0644 \u062a\u0631\u064a\u062f \u062d\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u0628\u0637\u0627\u0642\u0629\u061f',
        defaultBadge: '\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629',
        card: '\u0627\u0644\u0628\u0637\u0627\u0642\u0629',
        exp: '\u062a\u0646\u062a\u0647\u064a',
        setDefault: '\u062a\u0639\u064a\u064a\u0646 \u0643\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629',
        delete: '\u062d\u0630\u0641',
        noCards: '\u0644\u0627 \u062a\u0648\u062c\u062f \u0628\u0637\u0627\u0642\u0627\u062a \u0645\u062d\u0641\u0648\u0638\u0629. \u0633\u064a\u062a\u0645 \u062d\u0641\u0638\u0647\u0627 \u062a\u0644\u0642\u0627\u0626\u064a\u0627\u064b \u0639\u0646\u062f \u0627\u0644\u062f\u0641\u0639.',
        setDefaultError: '\u0641\u0634\u0644 \u062a\u0639\u064a\u064a\u0646 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629. \u0627\u0644\u0631\u062c\u0627\u0621 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u062c\u062f\u062f\u0627\u064b.',
        deleteError: '\u0641\u0634\u0644 \u062d\u0630\u0641 \u0627\u0644\u0628\u0637\u0627\u0642\u0629. \u0627\u0644\u0631\u062c\u0627\u0621 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u062c\u062f\u062f\u0627\u064b.',
        loadError: '\u062a\u0639\u0630\u0631 \u062a\u062d\u0645\u064a\u0644 \u0628\u0637\u0627\u0642\u0627\u062a\u0643 \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0629.',
        retry: '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629'
      }
    },
    wishlist: {
      title: '\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0646\u064a\u0627\u062a',
      empty: '\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0645\u0646\u064a\u0627\u062a \u0641\u0627\u0631\u063a\u0629',
      emptyHint: '\u0627\u0628\u062f\u0623 \u0628\u0625\u0636\u0627\u0641\u0629 \u0645\u0646\u062a\u062c\u0627\u062a \u0625\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0623\u0645\u0646\u064a\u0627\u062a\u0643 \u0628\u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0623\u064a\u0642\u0648\u0646\u0629 \u0627\u0644\u0642\u0644\u0628',
      browse: '\u062a\u0635\u0641\u062d \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a',
      addAll: '\u0623\u0636\u0641 \u0627\u0644\u0643\u0644 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629',
      clear: '\u0625\u0641\u0631\u0627\u063a \u0627\u0644\u0642\u0627\u0626\u0645\u0629',
      addToCart: '\u0623\u0636\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629',
      remove: '\u0625\u0632\u0627\u0644\u0629',
      items: '\u0645\u0646\u062a\u062c\u0627\u062a',
      addToWishlist: '\u0623\u0636\u0641 \u0625\u0644\u0649 \u0627\u0644\u0645\u0641\u0636\u0644\u0629',
      removeFromWishlist: '\u0625\u0632\u0627\u0644\u0629 \u0645\u0646 \u0627\u0644\u0645\u0641\u0636\u0644\u0629'
    },
    newsletter: {
      unsubscribe: {
        loading: '\u062c\u0627\u0631\u064d \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643\u2026',
        successTitle: '\u062a\u0645 \u0625\u0644\u063a\u0627\u0621 \u0627\u0634\u062a\u0631\u0627\u0643\u0643',
        successDesc: '\u0644\u0646 \u062a\u062a\u0644\u0642\u0649 \u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u0646\u0634\u0631\u0629 \u0628\u0639\u062f \u0627\u0644\u0622\u0646. \u0646\u0623\u0633\u0641 \u0644\u0631\u0624\u064a\u062a\u0643 \u062a\u0631\u062d\u0644.',
        backHome: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
        invalidLink: '\u0631\u0627\u0628\u0637 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d'
      },
      confirm: {
        loading: '\u062c\u0627\u0631\u064d \u0627\u0644\u062a\u0623\u0643\u064a\u062f\u2026',
        alreadyTitle: '\u0623\u0646\u062a \u0645\u0634\u062a\u0631\u0643 \u0628\u0627\u0644\u0641\u0639\u0644',
        successTitle: '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0634\u062a\u0631\u0627\u0643\u0643 \u0628\u0646\u062c\u0627\u062d \uD83C\uDF89',
        backHome: '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
        invalidLink: '\u0631\u0627\u0628\u0637 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d',
        invalidDesc: '\u0642\u062f \u064a\u0643\u0648\u0646 \u0627\u0644\u0631\u0627\u0628\u0637 \u0645\u0646\u062a\u0647\u064a \u0627\u0644\u0635\u0644\u0627\u062d\u064a\u0629 \u0623\u0648 \u0633\u0628\u0642 \u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0647.'
      }
    }
  }
};

// Language Manager
function resolveTranslationValue(source, path) {
  if (!source || !path) return undefined;
  const segments = path.split('.');
  let current = source;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    if (current == null) {
      return undefined;
    }

    if (Array.isArray(current)) {
      const index = Number(segment);
      if (Number.isNaN(index) || index < 0 || index >= current.length) {
        return undefined;
      }
      current = current[index];
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(current, segment)) {
      current = current[segment];
    } else {
      return undefined;
    }
  }

  return current;
}

function resolveApiBase() {
  if (typeof window === 'undefined') {
    return '';
  }

  var protocol = window.location.protocol;
  var hostname = window.location.hostname;
  var port = window.location.port;

  function inferXamppFolder() {
    try {
      // Check if we have XAMPP_FOLDER in meta tag (set by Next.js)
      var meta = document.querySelector('meta[name="xampp-folder"]');
      if (meta && meta.content) {
        return meta.content;
      }
      // Default to SQAUDSstore for this project
      return 'SQAUDSstore';
    } catch (e) {
      return 'SQAUDSstore';
    }
  }

  var xamppFolder = inferXamppFolder();

  if (port === '3000') {
    return protocol + '//localhost/' + xamppFolder + '/api';
  }

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return '/' + xamppFolder + '/api';
  }

  return '/api';
}

function getStoredLanguage() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    // Priority 1: Check localStorage
    var savedLang = window.localStorage.getItem('site_language');
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
      return savedLang;
    }
    
    // Priority 2: Check cookie (set by middleware)
    var match = document.cookie.match(/(^| )site_language=([^;]+)/);
    if (match && match[2]) {
      var cookieLang = match[2];
      if (cookieLang === 'ar' || cookieLang === 'en') {
        // Sync to localStorage
        window.localStorage.setItem('site_language', cookieLang);
        return cookieLang;
      }
    }
    
    return null;
  } catch (error) {
    console.warn('[LanguageManager] Unable to read language from localStorage. Falling back to English.', error);
    return null;
  }
}

function setStoredLanguage(lang) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem('site_language', lang);
    // Mark that user has explicitly chosen a language
    window.localStorage.setItem('user_language_choice', 'true');
    // Also set cookie for proxy to read
    document.cookie = 'site_language=' + lang + ';path=/;max-age=31536000;SameSite=Lax';
  } catch (error) {
    console.warn('[LanguageManager] Unable to persist language preference to localStorage.', error);
  }
}

// Repair common mojibake issues (UTF-8 bytes interpreted as latin1)
// This is intentionally self-contained (no imports) and safe to call repeatedly.
function repairUtf8Mojibake(input) {
  if (!input || typeof input !== 'string') return input;
  // Common markers when Arabic UTF-8 is decoded as latin1/Windows-1252.
  if (!/[\u00c3\u00d8\u00d9\u00c2\u00e2]/.test(input)) return input;

  try {
    if (typeof TextDecoder !== 'function') return input;
    var bytes = new Uint8Array(input.length);
    for (var i = 0; i < input.length; i++) {
      bytes[i] = input.charCodeAt(i) & 0xff;
    }
    var decoded = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
    if (!decoded || decoded === input) return input;
    // Accept only if it looks improved: contains Arabic or removed mojibake markers.
    var hasArabic = /[\u0600-\u06FF]/.test(decoded);
    var stillMojibake = /[\u00c3\u00d8\u00d9\u00c2\u00e2]/.test(decoded);
    if (hasArabic || !stillMojibake) return decoded;
  } catch (e) {
    // ignore
  }

  return input;
}

function repairAnyTextLite(value) {
  if (!value || typeof value !== 'string') return value;
  // Only run mojibake repair for now (keeps cost very low).
  var out = value;
  // Run a couple of passes in case of double-encoding.
  for (var i = 0; i < 2; i++) {
    var fixed = repairUtf8Mojibake(out);
    if (!fixed || fixed === out) break;
    out = fixed;
  }
  return out;
}

function deepRepairTranslations(node, seen) {
  if (!node) return;
  if (!seen) {
    seen = typeof WeakSet === 'function' ? new WeakSet() : null;
  }

  if (seen && typeof node === 'object') {
    if (seen.has(node)) return;
    seen.add(node);
  }

  if (typeof node === 'string') {
    return repairAnyTextLite(node);
  }

  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var value = node[i];
      if (typeof value === 'string') {
        node[i] = repairAnyTextLite(value);
      } else if (value && typeof value === 'object') {
        deepRepairTranslations(value, seen);
      }
    }
    return;
  }

  if (node && typeof node === 'object') {
    for (var key in node) {
      if (!Object.prototype.hasOwnProperty.call(node, key)) continue;
      var val = node[key];
      if (typeof val === 'string') {
        node[key] = repairAnyTextLite(val);
      } else if (val && typeof val === 'object') {
        deepRepairTranslations(val, seen);
      }
    }
  }
}

// Proactively repair any mojibake in translations at load time.
try {
  if (typeof window !== 'undefined' && window.translations) {
    deepRepairTranslations(window.translations);
  }
} catch (e) {
  // ignore
}

window.LanguageManager = {
  currentLanguage: 'en', // Will be set properly in init

  // Get current language
  getLanguage() {
    return this.currentLanguage;
  },

  // Set language
  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'ar') {
      console.error('Invalid language. Only "en" and "ar" are supported.');
      return;
    }
    this.currentLanguage = lang;
    // Keep DOM in sync with language state
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    setStoredLanguage(lang);
    this.triggerLanguageChange();
  },



  // Toggle between languages
  toggleLanguage() {
    const newLang = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  },

  // Resolve translation with fallback to English
  getValue(key) {
    const currentTranslations = window.translations[this.currentLanguage] || {};
    const fallbackTranslations = window.translations.en || {};

    const localized = resolveTranslationValue(currentTranslations, key);
    if (localized !== undefined) {
      return localized;
    }
    return resolveTranslationValue(fallbackTranslations, key);
  },

  // Get translation
  t(key) {
    const value = this.getValue(key);
    if (typeof value === 'string') {
      return repairAnyTextLite(value);
    }
    if (typeof value === 'number') {
      return String(value);
    }
    return key;
  },

  // Get localized value (for database fields)
  getLocalized(enValue, arValue) {
    if (this.currentLanguage === 'ar') {
      return repairAnyTextLite(arValue || enValue);
    }
    return repairAnyTextLite(enValue || arValue);
  },

  // Check if current language is Arabic
  isArabic() {
    return this.currentLanguage === 'ar';
  },

  // Check if current language is English
  isEnglish() {
    return this.currentLanguage === 'en';
  },

  // Trigger custom event for language change
  triggerLanguageChange() {
    const event = new CustomEvent('languageChanged', {
      detail: { language: this.currentLanguage }
    });
    window.dispatchEvent(event);
  },

  // Initialize
  init() {
    // Load saved language (set by default-language.js smart detection)
    const saved = getStoredLanguage();
    if (saved === 'ar' || saved === 'en') {
      this.currentLanguage = saved;
    } else {
      // Fallback: read from document lang attribute (set by default-language.js)
      const htmlLang = document.documentElement.lang;
      this.currentLanguage = (htmlLang === 'ar' || htmlLang === 'en') ? htmlLang : 'en';
    }
  }
};

// Auto-initialize on load
function initAndNotify() {
  window.LanguageManager.init();
  // Notify React that translations are ready (useTranslation hook listens for this)
  try {
    window.dispatchEvent(new CustomEvent('translationsReady'));
  } catch (e) { /* ignore */ }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAndNotify);
} else {
  initAndNotify();
}
