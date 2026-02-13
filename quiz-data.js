// quiz-data.js - Comprehensive Quiz Database for GreenFarm

// Quiz Categories Configuration
const QUIZ_CATEGORIES = [
  {
    id: 'disaster',
    title: 'Disaster Survival',
    description: 'Make critical decisions under pressure during farming emergencies',
    icon: '🚨',
    mode: 'Timed Mode',
    difficulty: 'hard',
    points: 200,
    timed: true
  },
  {
    id: 'soil',
    title: 'Soil & Tools',
    description: 'Master soil types, composition, and essential farming equipment',
    icon: '🔬',
    mode: 'Knowledge',
    difficulty: 'medium',
    points: 150,
    timed: false
  },
  {
    id: 'crop',
    title: 'Crop Cycles',
    description: 'Learn about seasonal crops, Kharif, Rabi, and planting schedules',
    icon: '🌾',
    mode: 'Quiz Mode',
    difficulty: 'easy',
    points: 120,
    timed: false
  },
  {
    id: 'water',
    title: 'Water Management',
    description: 'Smart irrigation techniques and water conservation strategies',
    icon: '💧',
    mode: 'Strategy',
    difficulty: 'medium',
    points: 140,
    timed: false
  },
  {
    id: 'pest',
    title: 'Pest Control',
    description: 'Eco-friendly pest management and integrated pest control methods',
    icon: '🐛',
    mode: 'Strategy',
    difficulty: 'medium',
    points: 160,
    timed: false
  },
  {
    id: 'climate',
    title: 'Climate Smart Farming',
    description: 'Adapt to climate change with sustainable agricultural practices',
    icon: '🌤️',
    mode: 'Strategy',
    difficulty: 'hard',
    points: 180,
    timed: false
  },
  {
    id: 'organic',
    title: 'Organic Certification',
    description: 'Comprehensive test on organic farming standards and certification',
    icon: '🌱',
    mode: 'Exam Mode',
    difficulty: 'hard',
    points: 220,
    timed: false
  },
  {
    id: 'nutrition',
    title: 'Crop Nutrition',
    description: 'Understanding NPK, micronutrients, and fertilizer management',
    icon: '⚗️',
    mode: 'Knowledge',
    difficulty: 'medium',
    points: 150,
    timed: false
  }
];

// Quiz Questions Database
const QUIZ_DATA = {
  // Disaster Survival Quiz (Timed)
  disaster: [
    {
      question: "Locust swarm approaching your field. What's the most effective immediate action?",
      options: [
        "Early harvest of mature crops",
        "Spray water on plants",
        "Do nothing and wait",
        "Apply extra fertilizer"
      ],
      correctIndex: 0,
      explanation: "Early harvesting saves mature crops from complete destruction."
    },
    {
      question: "Heavy unseasonal rains forecasted for 3 days. Your storage has harvested grain. What do you do?",
      options: [
        "Cover storage with waterproof tarps",
        "Leave grain in open air",
        "Mix grain with soil",
        "Water the grain"
      ],
      correctIndex: 0,
      explanation: "Waterproof covering prevents moisture damage and fungal growth."
    },
    {
      question: "Sudden temperature drop to freezing predicted tonight. Your tender seedlings are at risk. Best action?",
      options: [
        "Cover plants with cloth/plastic sheets",
        "Water the plants heavily",
        "Remove all plants",
        "Add more fertilizer"
      ],
      correctIndex: 0,
      explanation: "Covering creates insulation and traps ground heat to protect from frost."
    },
    {
      question: "Drought warning issued for next 2 months. What should be your priority?",
      options: [
        "Install drip irrigation immediately",
        "Plant more water-intensive crops",
        "Remove all mulch",
        "Increase flood irrigation"
      ],
      correctIndex: 0,
      explanation: "Drip irrigation conserves water by delivering it directly to roots."
    },
    {
      question: "Hailstorm approaching in 2 hours. Which crops need immediate protection?",
      options: [
        "Fruits and flowering vegetables",
        "Root vegetables underground",
        "Mature grain crops ready for harvest",
        "Grass and fodder crops"
      ],
      correctIndex: 0,
      explanation: "Fruits and flowers are most vulnerable to hail damage."
    }
  ],

  // Soil & Tools Quiz
  soil: [
    {
      question: "Which soil type is best for cotton cultivation?",
      options: [
        "Black soil (Regur)",
        "Alluvial soil",
        "Red soil",
        "Laterite soil"
      ],
      correctIndex: 0,
      explanation: "Black soil has high clay content and moisture retention, ideal for cotton."
    },
    {
      question: "What is the ideal pH range for most crops?",
      options: [
        "6.0-7.5",
        "4.0-5.0",
        "8.0-9.0",
        "3.0-4.0"
      ],
      correctIndex: 0,
      explanation: "Most crops thrive in slightly acidic to neutral soil (pH 6.0-7.5)."
    },
    {
      question: "Which tool is essential for checking soil moisture before irrigation?",
      options: [
        "Tensiometer",
        "pH meter only",
        "Thermometer",
        "Weighing scale"
      ],
      correctIndex: 0,
      explanation: "Tensiometer measures soil water tension to determine irrigation needs."
    },
    {
      question: "What does high organic matter content in soil primarily improve?",
      options: [
        "Water retention and nutrient availability",
        "Soil color only",
        "Soil weight",
        "Soil temperature"
      ],
      correctIndex: 0,
      explanation: "Organic matter improves soil structure, water holding capacity, and nutrients."
    },
    {
      question: "Which soil amendment is best for acidic soil?",
      options: [
        "Lime (Calcium carbonate)",
        "Sulfur",
        "Sand",
        "Salt"
      ],
      correctIndex: 0,
      explanation: "Lime raises soil pH, neutralizing acidity."
    },
    {
      question: "Red soil is rich in which element?",
      options: [
        "Iron oxide",
        "Calcium",
        "Nitrogen",
        "Phosphorus"
      ],
      correctIndex: 0,
      explanation: "Red color comes from iron oxide content in the soil."
    }
  ],

  // Crop Cycles Quiz
  crop: [
    {
      question: "Which season is Kharif cropping?",
      options: [
        "Monsoon season (June-October)",
        "Winter season (October-March)",
        "Summer season (March-June)",
        "All year round"
      ],
      correctIndex: 0,
      explanation: "Kharif crops are sown with monsoon and harvested in autumn."
    },
    {
      question: "Which of these is a Rabi crop?",
      options: [
        "Wheat",
        "Rice",
        "Cotton",
        "Maize"
      ],
      correctIndex: 0,
      explanation: "Wheat is sown in winter (Rabi season) and harvested in spring."
    },
    {
      question: "What is crop rotation's main benefit?",
      options: [
        "Prevents soil nutrient depletion",
        "Increases water usage",
        "Reduces crop yield",
        "Eliminates need for fertilizer completely"
      ],
      correctIndex: 0,
      explanation: "Rotation prevents nutrient depletion and breaks pest/disease cycles."
    },
    {
      question: "Which crop is known as a 'catch crop'?",
      options: [
        "Short-duration crops between main crops",
        "Crops that catch pests",
        "Crops grown in nets",
        "Crops that fail"
      ],
      correctIndex: 0,
      explanation: "Catch crops are quick-growing crops planted between main crop seasons."
    },
    {
      question: "Legumes in crop rotation help by:",
      options: [
        "Fixing nitrogen in soil",
        "Removing all nutrients",
        "Increasing soil acidity",
        "Attracting more pests"
      ],
      correctIndex: 0,
      explanation: "Legumes have nitrogen-fixing bacteria in root nodules."
    }
  ],

  // Water Management Quiz
  water: [
    {
      question: "Which irrigation method is most water-efficient?",
      options: [
        "Drip irrigation",
        "Flood irrigation",
        "Sprinkler irrigation",
        "Furrow irrigation"
      ],
      correctIndex: 0,
      explanation: "Drip irrigation delivers water directly to roots with minimal waste."
    },
    {
      question: "What is the primary benefit of mulching?",
      options: [
        "Reduces water evaporation from soil",
        "Increases evaporation",
        "Attracts more pests",
        "Blocks sunlight from soil"
      ],
      correctIndex: 0,
      explanation: "Mulch covers soil, reducing evaporation and maintaining moisture."
    },
    {
      question: "Best time to irrigate crops in summer?",
      options: [
        "Early morning or late evening",
        "Noon when hottest",
        "Only at midnight",
        "Randomly throughout day"
      ],
      correctIndex: 0,
      explanation: "Early morning/evening irrigation reduces evaporation losses."
    },
    {
      question: "Rainwater harvesting is important because:",
      options: [
        "Conserves groundwater and provides backup water",
        "It's only for decoration",
        "Wastes space",
        "Increases salinity"
      ],
      correctIndex: 0,
      explanation: "Rainwater harvesting recharges groundwater and stores water for dry periods."
    },
    {
      question: "Signs of over-irrigation include:",
      options: [
        "Waterlogged soil and yellowing leaves",
        "Dry cracked soil",
        "Increased crop yield",
        "Better root growth"
      ],
      correctIndex: 0,
      explanation: "Over-irrigation causes waterlogging, reducing oxygen to roots."
    }
  ],

  // Pest Control Quiz
  pest: [
    {
      question: "What is IPM in agriculture?",
      options: [
        "Integrated Pest Management",
        "Immediate Pest Murder",
        "Individual Pest Monitoring",
        "Indoor Pest Management"
      ],
      correctIndex: 0,
      explanation: "IPM uses multiple strategies to control pests sustainably."
    },
    {
      question: "Which is a biological pest control method?",
      options: [
        "Introducing natural predators like ladybugs",
        "Using chemical pesticides only",
        "Burning all crops",
        "Ignoring pest problems"
      ],
      correctIndex: 0,
      explanation: "Biological control uses natural enemies to manage pest populations."
    },
    {
      question: "Neem oil is used in organic farming as:",
      options: [
        "Natural pesticide and fungicide",
        "Fertilizer only",
        "Irrigation water",
        "Animal feed"
      ],
      correctIndex: 0,
      explanation: "Neem oil disrupts pest life cycles and controls fungal diseases."
    },
    {
      question: "Crop diversification helps in pest management by:",
      options: [
        "Preventing pest population buildup",
        "Attracting more pests",
        "Eliminating all insects",
        "Increasing chemical use"
      ],
      correctIndex: 0,
      explanation: "Diverse crops disrupt pest life cycles and reduce outbreak severity."
    },
    {
      question: "Yellow sticky traps in fields are used to:",
      options: [
        "Monitor and trap flying insect pests",
        "Decorate the field",
        "Feed the birds",
        "Increase pest population"
      ],
      correctIndex: 0,
      explanation: "Yellow color attracts insects; sticky surface traps them for monitoring."
    }
  ],

  // Climate Smart Farming Quiz
  climate: [
    {
      question: "What is climate-smart agriculture?",
      options: [
        "Farming that adapts to climate change while reducing emissions",
        "Using only air conditioning in farms",
        "Farming only in cool climates",
        "Ignoring weather patterns"
      ],
      correctIndex: 0,
      explanation: "Climate-smart agriculture increases resilience and reduces greenhouse gases."
    },
    {
      question: "Which practice helps sequester carbon in soil?",
      options: [
        "Conservation tillage and cover cropping",
        "Excessive tilling",
        "Removing all organic matter",
        "Using only chemical fertilizers"
      ],
      correctIndex: 0,
      explanation: "Minimal tillage and cover crops increase soil organic carbon."
    },
    {
      question: "Agroforestry contributes to climate resilience by:",
      options: [
        "Providing shade, windbreaks, and carbon storage",
        "Removing all trees",
        "Increasing soil erosion",
        "Using more fossil fuels"
      ],
      correctIndex: 0,
      explanation: "Trees in agroforestry moderate microclimate and store carbon."
    },
    {
      question: "Drought-resistant crop varieties are important because:",
      options: [
        "They survive with less water in changing climate",
        "They need more water than normal crops",
        "They grow only in floods",
        "They die quickly"
      ],
      correctIndex: 0,
      explanation: "Drought-resistant varieties maintain yields under water stress."
    },
    {
      question: "Methane emissions from rice paddies can be reduced by:",
      options: [
        "Alternate wetting and drying irrigation",
        "Keeping fields continuously flooded",
        "Adding more organic matter",
        "Using more water"
      ],
      correctIndex: 0,
      explanation: "AWD reduces anaerobic conditions that produce methane."
    }
  ],

  // Organic Certification Quiz
  organic: [
    {
      question: "Organic farming prohibits the use of:",
      options: [
        "Synthetic pesticides and GMO seeds",
        "Compost and manure",
        "Crop rotation",
        "Natural fertilizers"
      ],
      correctIndex: 0,
      explanation: "Organic standards ban synthetic chemicals and genetically modified organisms."
    },
    {
      question: "Minimum transition period for organic certification in India?",
      options: [
        "3 years",
        "1 year",
        "6 months",
        "5 years"
      ],
      correctIndex: 0,
      explanation: "Three years of chemical-free farming required before organic certification."
    },
    {
      question: "Which organization certifies organic products in India?",
      options: [
        "APEDA (Agricultural and Processed Food Products Export Development Authority)",
        "NASA",
        "WHO",
        "FIFA"
      ],
      correctIndex: 0,
      explanation: "APEDA accredits organic certification bodies under NPOP."
    },
    {
      question: "Organic farming improves soil health by:",
      options: [
        "Increasing microbial activity and organic matter",
        "Killing all soil organisms",
        "Removing nutrients",
        "Compacting soil"
      ],
      correctIndex: 0,
      explanation: "Organic practices enhance soil biology and structure."
    },
    {
      question: "Vermicompost in organic farming is produced by:",
      options: [
        "Earthworms decomposing organic waste",
        "Chemical synthesis",
        "Burning crop residues",
        "Mixing with plastics"
      ],
      correctIndex: 0,
      explanation: "Earthworms convert organic waste into nutrient-rich compost."
    },
    {
      question: "Green manuring involves:",
      options: [
        "Growing and plowing in green crops for nutrients",
        "Painting manure green",
        "Using only chemical fertilizers",
        "Removing all plants from field"
      ],
      correctIndex: 0,
      explanation: "Green manure crops are grown and incorporated to enrich soil."
    }
  ],

  // Crop Nutrition Quiz
  nutrition: [
    {
      question: "NPK stands for which three essential nutrients?",
      options: [
        "Nitrogen, Phosphorus, Potassium",
        "Neon, Platinum, Krypton",
        "Nickel, Phosphate, Kalium",
        "Nitrate, Protein, Kinase"
      ],
      correctIndex: 0,
      explanation: "N-P-K are the primary macronutrients required by all plants."
    },
    {
      question: "Nitrogen deficiency in plants shows as:",
      options: [
        "Yellowing of older leaves (chlorosis)",
        "Purple younger leaves",
        "Oversized fruits",
        "Too much flowering"
      ],
      correctIndex: 0,
      explanation: "Nitrogen is mobile; plants move it from old to new growth, causing yellowing."
    },
    {
      question: "Phosphorus is essential for:",
      options: [
        "Root development and flowering",
        "Leaf color only",
        "Stem strength only",
        "Water absorption only"
      ],
      correctIndex: 0,
      explanation: "Phosphorus drives energy transfer, root growth, and reproduction."
    },
    {
      question: "Potassium helps plants by:",
      options: [
        "Improving disease resistance and water regulation",
        "Only making leaves greener",
        "Increasing soil pH",
        "Reducing root growth"
      ],
      correctIndex: 0,
      explanation: "Potassium strengthens cell walls and regulates water/nutrient movement."
    },
    {
      question: "Which is a micronutrient needed in small amounts?",
      options: [
        "Iron",
        "Nitrogen",
        "Phosphorus",
        "Potassium"
      ],
      correctIndex: 0,
      explanation: "Iron is a micronutrient essential for chlorophyll synthesis."
    },
    {
      question: "Composting benefits include:",
      options: [
        "Slow-release nutrients and improved soil structure",
        "Instant chemical nutrients only",
        "Soil compaction",
        "Nutrient leaching"
      ],
      correctIndex: 0,
      explanation: "Compost provides steady nutrition and enhances soil physical properties."
    }
  ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUIZ_CATEGORIES, QUIZ_DATA };
}