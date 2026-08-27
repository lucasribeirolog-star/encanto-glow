// ===== Encanto Glow — treatment data (EN) =====
const TREATMENTS = [
  {
    slug: "limpeza-de-pele",
    icon: "🧼",
    heroImage: "/assets/images/hero-limpeza-de-pele.jpg",
    name: "Advanced Facial Cleansing",
    short: "Deep cleansing, extraction and skin renewal with technology and professional care.",
    intro: "Advanced facial cleansing goes beyond a traditional cleanse, combining deep cleansing, exfoliation, extraction of blackheads and impurities, and application of soothing active ingredients. It's the foundation for healthier, more even skin that's ready for other aesthetic treatments.",
    benefits: [
      "Safely removes impurities and blackheads",
      "Unclogs pores and controls oiliness",
      "Evens out skin texture",
      "Prepares the skin to better absorb other actives",
      "Gives an immediate feeling of renewed skin"
    ],
    steps: [
      "Skin type assessment",
      "Cleansing and exfoliation",
      "Extraction of impurities",
      "Application of mask and soothing actives",
      "Finishing with protection"
    ],
    indicated: [
      "Oily skin or skin with blackheads and breakouts",
      "Enlarged pores",
      "Dull, lackluster skin",
      "Aesthetic maintenance routine"
    ],
    care: [
      "Avoid direct sun exposure for the first 24-48h",
      "Use sunscreen daily",
      "Keep skin hydrated",
      "Follow the recommendations given during the assessment"
    ],
    faq: [
      { q: "Does advanced facial cleansing hurt?", a: "The procedure may cause mild discomfort during extraction, but it is well tolerated by most people." },
      { q: "How often can I repeat it?", a: "Generally every 30 to 45 days, depending on individual assessment." },
      { q: "Can I wear makeup afterward?", a: "It's best to wait a few hours and stick to lightweight products for the first 24h." }
    ],
    images: []
  },
  {
    slug: "rejuvenescimento-facial",
    icon: "✨",
    name: "Facial Rejuvenation",
    short: "Combined protocols to stimulate collagen, firmness and radiance, softening the signs of time.",
    intro: "Facial rejuvenation brings together techniques that stimulate collagen and elastin production, working on firmness, luminosity and skin tone evenness. The protocol is personalized according to each patient's needs.",
    benefits: [
      "Stimulates collagen and elastin",
      "Softens fine lines and wrinkles",
      "Improves skin firmness and radiance",
      "Evens out tone and texture",
      "Results that evolve gradually and naturally"
    ],
    steps: [
      "Detailed facial assessment",
      "Protocol definition (combination of techniques)",
      "Application of the indicated procedure(s)",
      "Post-procedure care guidance"
    ],
    indicated: [
      "Early or moderate signs of aging",
      "Loss of radiance and glow",
      "Seeking prevention of skin aging"
    ],
    care: [
      "Strict use of sunscreen",
      "Adequate skin hydration",
      "Avoid abrasive procedures in the following days",
      "Maintenance follow-ups as indicated"
    ],
    faq: [
      { q: "From what age can I do this?", a: "There is no fixed age — the indication depends on individual assessment and the skin's needs." },
      { q: "Are results immediate?", a: "Some effects are noticeable right away, but collagen stimulation evolves over the following weeks." },
      { q: "Do I need to combine more than one technique?", a: "In many cases, yes — the protocol is custom-built during the assessment." }
    ],
    images: []
  },
  {
    slug: "skinbooster",
    icon: "💧",
    name: "Skinbooster",
    short: "Deep injectable hydration for more radiant, firm skin with healthy glow.",
    intro: "Skinbooster is an injectable treatment based on low-density hyaluronic acid that promotes deep, long-lasting skin hydration, improving radiance, elasticity and glow.",
    benefits: [
      "Deep, long-lasting hydration",
      "Improves skin elasticity",
      "Boosts radiance and glow",
      "Softens fine dehydration lines",
      "Natural result, without changing facial volumes"
    ],
    steps: [
      "Skin assessment and cleansing",
      "Application of topical anesthetic (when indicated)",
      "Micro-injections of the product in defined areas",
      "Post-application care"
    ],
    indicated: [
      "Dehydrated, dull skin",
      "Fine dehydration lines",
      "Seeking radiance without changing facial contours"
    ],
    care: [
      "Avoid direct sun and intense heat in the first days",
      "Do not massage the treated area without guidance",
      "Keep good hydration and sun protection",
      "Small bruises may occur and are normal"
    ],
    faq: [
      { q: "Does Skinbooster hurt?", a: "It may cause mild discomfort, generally well tolerated; a topical anesthetic can be used." },
      { q: "How many sessions are needed?", a: "Usually an initial session protocol, defined during assessment, with periodic maintenance." },
      { q: "Does Skinbooster replace fillers?", a: "No. Skinbooster hydrates and treats skin quality; fillers restore volume." }
    ],
    images: ["/assets/images/post10.jpg"]
  },
  {
    slug: "flacidez",
    icon: "🪡",
    name: "Skin Laxity",
    short: "Treatments to stimulate firmness and improve the appearance of sagging skin on face and body.",
    intro: "Skin laxity protocols work by stimulating collagen production and improving skin firmness and support, with techniques selected according to the degree of laxity and the treated area.",
    benefits: [
      "Stimulates collagen and firmness",
      "Improves facial or body contour",
      "Firmer, more toned-looking skin",
      "Progressive, natural results"
    ],
    steps: [
      "Assessment of the degree of laxity",
      "Definition of the most suitable technique",
      "Procedure performed",
      "Progress follow-up"
    ],
    indicated: [
      "Mild to moderate facial laxity",
      "Body laxity in specific areas",
      "Post-weight-loss (individual assessment)"
    ],
    care: [
      "Stay consistent with the indicated protocol",
      "Daily hydration and sun protection",
      "Avoid intense sun exposure after the procedure",
      "Follow the recommended session schedule"
    ],
    faq: [
      { q: "Is there a single treatment for skin laxity?", a: "No. The technique is chosen according to degree of laxity, area and individual assessment." },
      { q: "When do results appear?", a: "Results are usually gradual, evolving over weeks and sessions." },
      { q: "Is there a definitive cure for laxity?", a: "The aging process is continuous; periodic maintenance helps sustain results." }
    ],
    images: []
  },
  {
    slug: "manchas-no-rosto",
    icon: "☀️",
    name: "Facial Pigmentation",
    short: "Protocols to even out skin tone and fade sun, hormonal or age-related spots.",
    intro: "Facial pigmentation treatment is indicated to even out skin tone, acting on spots of sun, hormonal (melasma) or post-inflammatory origin, always with an individual assessment of the cause.",
    benefits: [
      "Evens out skin tone",
      "Gradual fading of spots",
      "Improves overall skin luminosity",
      "Personalized protocol according to spot type"
    ],
    steps: [
      "Dermatological assessment of the spot",
      "Protocol definition (combination of techniques and actives)",
      "Sessions according to plan",
      "Maintenance with daily care"
    ],
    indicated: [
      "Sun spots",
      "Melasma (specialized assessment)",
      "Post-inflammatory spots",
      "Uneven-toned skin"
    ],
    care: [
      "Mandatory, strict use of sunscreen",
      "Avoid unprotected sun exposure",
      "Strictly follow the indicated home care",
      "Be patient — results are gradual"
    ],
    faq: [
      { q: "Do spots disappear completely?", a: "The goal is to fade and even out; the result varies according to the type and cause of the spot." },
      { q: "Can I sunbathe during treatment?", a: "Not without proper protection — sun exposure can compromise results and darken the spot again." },
      { q: "Does melasma have a definitive treatment?", a: "Melasma is a chronic condition; treatment controls and fades it, requiring ongoing maintenance." }
    ],
    images: []
  },
  {
    slug: "mesoterapia-capilar",
    icon: "💆‍♀️",
    name: "Hair Mesotherapy",
    short: "Scalp stimulation with injectable actives to strengthen hair and reduce hair loss.",
    intro: "Hair mesotherapy involves applying active ingredients directly to the scalp, stimulating microcirculation and strengthening hair follicles, helping fight hair loss and strengthen the hair.",
    benefits: [
      "Stimulates scalp microcirculation",
      "Strengthens hair and reduces hair loss",
      "Supports overall hair health",
      "Personalized protocol according to need"
    ],
    steps: [
      "Hair and scalp assessment",
      "Definition of the active ingredient blend",
      "Application to the scalp",
      "Maintenance session planning"
    ],
    indicated: [
      "Hair loss",
      "Weakened hair",
      "Seeking strengthening and hair health"
    ],
    care: [
      "Follow the indicated number of sessions",
      "Avoid washing hair in the first hours after the session",
      "Maintain the guided hair care routine",
      "Periodic follow-up"
    ],
    faq: [
      { q: "Does hair mesotherapy hurt?", a: "It may cause mild, localized discomfort, generally well tolerated." },
      { q: "How many sessions are needed?", a: "It varies according to hair condition; usually a session protocol followed by maintenance." },
      { q: "Does it work for advanced baldness?", a: "The indication depends on assessment — the sooner it's started, the better the response tends to be." }
    ],
    images: []
  },
  {
    slug: "estrias",
    icon: "〰️",
    name: "Stretch Marks",
    short: "Treatments to improve the appearance of stretch marks by stimulating skin regeneration.",
    intro: "Stretch mark treatment works by stimulating skin regeneration and collagen production in the affected area, improving the texture, color and overall appearance of stretch marks, whether pink or white.",
    benefits: [
      "Stimulates collagen in the treated area",
      "Improves skin texture",
      "Fades stretch mark coloring",
      "Protocol adapted to the type of stretch mark"
    ],
    steps: [
      "Assessment of stretch mark type and stage",
      "Choice of the most suitable technique",
      "Periodic protocol sessions",
      "Progress follow-up"
    ],
    indicated: [
      "Pink stretch marks (early stage)",
      "White stretch marks (mature stage)",
      "Abdomen, hip, thigh and breast areas"
    ],
    care: [
      "Daily skin hydration",
      "Sun protection on the treated area",
      "Consistency with indicated sessions",
      "Gradual, progressive results"
    ],
    faq: [
      { q: "Do stretch marks disappear completely?", a: "The goal is significant improvement in appearance; the response varies according to the type and age of the stretch mark." },
      { q: "Are pink and white stretch marks treated the same way?", a: "Not necessarily — the technique is adjusted according to the stretch mark's stage." },
      { q: "How long until I see results?", a: "It's usually gradual, over several sessions." }
    ],
    images: []
  },
  {
    slug: "celulite",
    icon: "🧊",
    name: "Cellulite",
    short: "Protocols to improve skin texture and the appearance of cellulite.",
    intro: "Cellulite treatment combines techniques that act on circulation, skin texture and tissue structure, improving the appearance of the so-called 'orange peel skin'.",
    benefits: [
      "Improves skin texture",
      "Supports local circulation",
      "Reduces the appearance of cellulite",
      "Combined protocol according to degree"
    ],
    steps: [
      "Assessment of cellulite degree",
      "Definition of the combined protocol",
      "Periodic sessions",
      "Maintenance guidance"
    ],
    indicated: [
      "Mild, moderate or pronounced cellulite (individual assessment)",
      "Seeking improved skin texture"
    ],
    care: [
      "Keep up a physical activity routine, if possible",
      "Good body hydration",
      "Follow the session schedule",
      "Results evolve with consistency"
    ],
    faq: [
      { q: "Is there a definitive cure for cellulite?", a: "It is a multifactorial condition; treatment improves appearance, but maintenance is important." },
      { q: "Do I need to change habits for the treatment to work?", a: "Healthy habits enhance the results of the aesthetic protocol." },
      { q: "How many sessions are recommended?", a: "It varies according to degree and individual response, defined during assessment." }
    ],
    images: []
  },
  {
    slug: "gordura-localizada",
    icon: "🔥",
    name: "Localized Fat",
    short: "Treatments to reduce measurements in areas with localized fat buildup.",
    intro: "Localized fat protocols help reduce measurements in specific areas of fat buildup resistant to diet and exercise, always respecting the indications and limits of each technique.",
    benefits: [
      "Helps reduce localized measurements",
      "Improves body contour",
      "Personalized protocol per area",
      "Can be combined with other body techniques"
    ],
    steps: [
      "Assessment of the area and body type",
      "Definition of the indicated technique",
      "Sessions according to plan",
      "Measurement follow-up"
    ],
    indicated: [
      "Areas with resistant localized fat buildup",
      "Complement to healthy lifestyle habits"
    ],
    care: [
      "Maintain balanced diet and hydration",
      "Practice physical activity, if possible",
      "Follow the session schedule",
      "Results vary according to individual response"
    ],
    faq: [
      { q: "Does the treatment replace diet and exercise?", a: "No. It is a complement to healthy lifestyle habits, not a substitute." },
      { q: "Is it suitable for any area of the body?", a: "The indication is assessed individually according to area and body type." },
      { q: "When do results appear?", a: "They tend to be progressive, over the sessions of the protocol." }
    ],
    images: []
  },
  {
    slug: "lipo-de-papada",
    icon: "🔻",
    name: "Double Chin Lipo",
    short: "Procedure to reduce fat in the chin area and improve facial contour.",
    intro: "Double chin lipo is a procedure aimed at reducing localized fat in the chin and neck area, contributing to a more defined, harmonious facial contour.",
    benefits: [
      "Reduces fat in the chin area",
      "Improves facial contour",
      "Less noticeable double chin appearance",
      "Procedure with detailed individual assessment"
    ],
    steps: [
      "Assessment of the area and technique indication",
      "Preparation for the procedure",
      "Performed according to the indicated protocol",
      "Post-procedure care guidance"
    ],
    indicated: [
      "Fat buildup in the chin/double chin area",
      "Seeking more defined facial contour"
    ],
    care: [
      "Strictly follow post-procedure guidance",
      "Use of compression band or specific guidance, if indicated",
      "Avoid intense physical effort in the first days",
      "Follow-up with the professional"
    ],
    faq: [
      { q: "Is it a surgical procedure?", a: "There are minimally invasive techniques for double chin — the indication is defined during individual assessment." },
      { q: "How long is the recovery?", a: "It varies according to the indicated technique; specific guidance is given during assessment." },
      { q: "Is the result permanent?", a: "Results tend to be long-lasting, but lifestyle habits influence their maintenance." }
    ],
    images: []
  },
  {
    slug: "harmonizacao-orofacial",
    icon: "💫",
    name: "Orofacial Harmonization",
    short: "A set of techniques to balance facial proportions naturally and individually.",
    intro: "Orofacial harmonization brings together different techniques — such as botulinum toxin, fillers and biostimulators — to balance facial proportions, correct asymmetries and enhance each patient's natural beauty.",
    benefits: [
      "Corrects natural facial asymmetries",
      "Improves facial balance and proportion",
      "Personalized, natural results",
      "Can combine different techniques in a single treatment plan"
    ],
    steps: [
      "Complete facial assessment",
      "Individualized protocol planning",
      "Execution of the indicated techniques",
      "Follow-up and fine adjustments"
    ],
    indicated: [
      "Facial asymmetries",
      "Seeking balance and proportion",
      "Signs of facial aging",
      "Desire to enhance natural features"
    ],
    care: [
      "Follow the specific guidance for each combined technique",
      "Avoid intense sun exposure in the first days",
      "Follow-up visits as planned",
      "Ongoing professional assessment"
    ],
    faq: [
      { q: "Does orofacial harmonization make the face look 'artificial'?", a: "The goal of the planning is exactly the opposite: to enhance natural features with balance." },
      { q: "Which techniques can be used?", a: "It can include botox, fillers, biostimulators and other techniques, according to assessment." },
      { q: "Is the result immediate?", a: "Some effects are seen right away, but the final result settles over days to weeks." }
    ],
    images: ["/assets/images/post2.jpg"]
  },
  {
    slug: "botox",
    icon: "💉",
    name: "Botox (Botulinum Toxin)",
    short: "Botulinum toxin to prevent and soften dynamic wrinkles, with a natural result.",
    intro: "Botulinum toxin (Botox) application relaxes the muscles responsible for expression wrinkles, preventing and softening lines in areas such as the forehead, glabella (between the eyebrows) and crow's feet.",
    benefits: [
      "Prevents and softens expression wrinkles",
      "Noticeable result within up to 15 days",
      "Fades lines on forehead, glabella and crow's feet",
      "Boosts self-esteem",
      "Quick procedure, with little to no downtime"
    ],
    steps: [
      "Facial muscle assessment",
      "Marking of application points",
      "Application of the botulinum toxin",
      "Post-procedure guidance"
    ],
    indicated: [
      "Dynamic (expression) wrinkles",
      "Prevention of expression lines",
      "Mild muscular asymmetries of the upper third of the face"
    ],
    care: [
      "Avoid lying down or bending your head forward in the first hours",
      "Do not massage the treated area",
      "Avoid intense physical exercise on the same day",
      "Wait the indicated period to assess the final result"
    ],
    faq: [
      { q: "Does Botox hurt?", a: "Discomfort is minimal, with fine needles; most patients tolerate it well." },
      { q: "How long does the effect last?", a: "On average 4 to 6 months, varying by individual metabolism." },
      { q: "From what age can I apply it?", a: "There is no fixed age; the indication — preventive or corrective — is defined during professional assessment." }
    ],
    images: ["/assets/images/post6.jpg", "/assets/images/reel3.jpg", "/assets/images/new1.jpg", "/assets/images/new2.webp", "/assets/images/new3.webp"]
  },
  {
    slug: "preenchimento",
    icon: "🌹",
    name: "Dermal Filler",
    short: "Dermal filler to restore volume, contours and a more youthful, natural look.",
    intro: "Dermal filler, usually hyaluronic acid based, replaces volume lost over time, redefines contours and softens grooves, providing a more youthful, balanced and natural appearance.",
    benefits: [
      "Restores volume lost over time",
      "Redefines contours (lips, under-eyes, cheeks, jawline, and more)",
      "Softens static grooves and expression lines",
      "Natural, individualized result"
    ],
    steps: [
      "Facial assessment and volume planning",
      "Application of topical anesthetic (when indicated)",
      "Filler application to the defined area",
      "Shaping and final guidance"
    ],
    indicated: [
      "Facial volume loss",
      "Nasolabial folds and other static lines",
      "Desire to enhance contours (lips, under-eyes, cheeks, jawline)"
    ],
    care: [
      "Avoid intense physical exercise in the first 48h",
      "Do not massage the area without guidance",
      "Small bruises or swelling may occur and are normal",
      "Avoid sun exposure and intense heat in the first days"
    ],
    faq: [
      { q: "Does filler hurt?", a: "It may cause mild discomfort; topical anesthetic is used for greater comfort." },
      { q: "How long does the result last?", a: "It varies according to the area and product used, averaging 6 to 18 months." },
      { q: "Is filler reversible?", a: "Hyaluronic acid can be dissolved with a specific enzyme, if necessary, upon assessment." }
    ],
    images: ["/assets/images/post9.jpg", "/assets/images/post4.webp", "/assets/images/new4.webp"]
  }
];
