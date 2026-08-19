// ===== Encanto Glow — datos de tratamientos (ES) =====
const TREATMENTS = [
  {
    slug: "limpeza-de-pele",
    icon: "🧼",
    name: "Limpieza Facial Avanzada",
    short: "Higienización profunda, extracción y renovación de la piel con tecnología y cuidado profesional.",
    intro: "La limpieza facial avanzada va más allá de la limpieza tradicional, combinando higienización profunda, exfoliación, extracción de comedones e impurezas y aplicación de activos calmantes. Es la base para una piel más saludable, uniforme y preparada para otros tratamientos estéticos.",
    benefits: [
      "Elimina impurezas y comedones de forma segura",
      "Desobstruye los poros y controla la grasitud",
      "Uniformiza la textura de la piel",
      "Prepara la piel para absorber mejor otros activos",
      "Sensación inmediata de piel renovada"
    ],
    steps: [
      "Evaluación del tipo de piel",
      "Higienización y exfoliación",
      "Extracción de impurezas",
      "Aplicación de mascarilla y activos calmantes",
      "Finalización con protección"
    ],
    indicated: [
      "Pieles grasas o con comedones y granitos",
      "Poros dilatados",
      "Piel opaca y sin brillo",
      "Rutina de mantenimiento estético"
    ],
    care: [
      "Evitar la exposición solar directa en las primeras 24-48h",
      "Usar protector solar a diario",
      "Mantener la piel hidratada",
      "Seguir las recomendaciones dadas en la evaluación"
    ],
    faq: [
      { q: "¿Duele hacer la limpieza facial avanzada?", a: "El procedimiento puede causar leve molestia durante la extracción, pero es bien tolerado por la mayoría de las personas." },
      { q: "¿Con qué frecuencia puedo repetirla?", a: "En general, cada 30 a 45 días, según evaluación individual." },
      { q: "¿Puedo maquillarme después?", a: "Lo ideal es esperar algunas horas y priorizar productos ligeros en las primeras 24h." }
    ],
    images: []
  },
  {
    slug: "rejuvenescimento-facial",
    icon: "✨",
    name: "Rejuvenecimiento Facial",
    short: "Protocolos combinados para estimular colágeno, firmeza y luminosidad, suavizando los signos del tiempo.",
    intro: "El rejuvenecimiento facial reúne técnicas que estimulan la producción de colágeno y elastina, actuando en la firmeza, luminosidad y uniformidad de la piel. El protocolo se personaliza según la necesidad de cada paciente.",
    benefits: [
      "Estimula colágeno y elastina",
      "Suaviza líneas finas y arrugas",
      "Mejora la firmeza y el brillo de la piel",
      "Uniformiza tono y textura",
      "Resultados que evolucionan de forma gradual y natural"
    ],
    steps: [
      "Evaluación facial detallada",
      "Definición del protocolo (combinación de técnicas)",
      "Aplicación del/los procedimiento(s) indicado(s)",
      "Orientaciones de cuidados posteriores"
    ],
    indicated: [
      "Signos iniciales o moderados de envejecimiento",
      "Pérdida de brillo y luminosidad",
      "Búsqueda de prevención del envejecimiento cutáneo"
    ],
    care: [
      "Uso riguroso de protector solar",
      "Hidratación adecuada de la piel",
      "Evitar procedimientos abrasivos en los días siguientes",
      "Retornos de mantenimiento según indicación"
    ],
    faq: [
      { q: "¿A partir de qué edad puedo hacerlo?", a: "No hay una edad fija — la indicación depende de la evaluación individual y de las necesidades de la piel." },
      { q: "¿Los resultados son inmediatos?", a: "Algunos efectos se notan enseguida, pero el estímulo de colágeno evoluciona a lo largo de las semanas." },
      { q: "¿Necesito combinar más de una técnica?", a: "En muchos casos sí — el protocolo se arma a medida en la evaluación." }
    ],
    images: []
  },
  {
    slug: "skinbooster",
    icon: "💧",
    name: "Skinbooster",
    short: "Hidratación profunda inyectable para una piel más luminosa, firme y con brillo saludable.",
    intro: "El skinbooster es un tratamiento inyectable a base de ácido hialurónico de baja densidad, que promueve una hidratación profunda y duradera de la piel, mejorando el brillo, la elasticidad y la luminosidad.",
    benefits: [
      "Hidratación profunda y duradera",
      "Mejora la elasticidad de la piel",
      "Aumenta el brillo y la luminosidad",
      "Suaviza líneas finas de deshidratación",
      "Resultado natural, sin alterar los volúmenes del rostro"
    ],
    steps: [
      "Evaluación e higienización de la piel",
      "Aplicación de anestésico tópico (cuando esté indicado)",
      "Microinyecciones del producto en las áreas definidas",
      "Cuidados posteriores a la aplicación"
    ],
    indicated: [
      "Piel deshidratada y opaca",
      "Líneas finas de deshidratación",
      "Búsqueda de luminosidad sin alterar los contornos faciales"
    ],
    care: [
      "Evitar el sol directo y el calor intenso en los primeros días",
      "No masajear la zona tratada sin orientación",
      "Mantener buena hidratación y protección solar",
      "Pueden aparecer pequeños hematomas, es normal"
    ],
    faq: [
      { q: "¿El skinbooster duele?", a: "Puede causar una leve molestia, generalmente bien tolerada; se puede usar anestésico tópico." },
      { q: "¿Cuántas sesiones son necesarias?", a: "Normalmente un protocolo inicial de sesiones, definido en la evaluación, con mantenimientos periódicos." },
      { q: "¿El skinbooster reemplaza el relleno?", a: "No. El skinbooster hidrata y trata la calidad de la piel; el relleno repone volumen." }
    ],
    images: ["/assets/images/post10.jpg"]
  },
  {
    slug: "flacidez",
    icon: "🪡",
    name: "Flacidez",
    short: "Tratamientos para estimular la firmeza y mejorar el aspecto de la piel flácida en rostro y cuerpo.",
    intro: "Los protocolos para la flacidez actúan estimulando la producción de colágeno y mejorando la firmeza y sostén de la piel, con técnicas seleccionadas según el grado de flacidez y el área tratada.",
    benefits: [
      "Estímulo de colágeno y firmeza",
      "Mejora del contorno facial o corporal",
      "Piel con aspecto más firme y tonificado",
      "Resultados progresivos y naturales"
    ],
    steps: [
      "Evaluación del grado de flacidez",
      "Definición de la técnica más indicada",
      "Realización del procedimiento",
      "Seguimiento de la evolución"
    ],
    indicated: [
      "Flacidez facial leve a moderada",
      "Flacidez corporal en áreas específicas",
      "Post-adelgazamiento (evaluación individual)"
    ],
    care: [
      "Mantener constancia en el protocolo indicado",
      "Hidratación y protección solar diarias",
      "Evitar exposición solar intensa después del procedimiento",
      "Seguir el cronograma de sesiones recomendado"
    ],
    faq: [
      { q: "¿Existe un tratamiento único para la flacidez?", a: "No. La técnica se elige según el grado de flacidez, el área y la evaluación individual." },
      { q: "¿Cuándo aparecen los resultados?", a: "Los resultados suelen ser graduales, evolucionando a lo largo de las semanas y sesiones." },
      { q: "¿La flacidez tiene cura definitiva?", a: "El proceso de envejecimiento es continuo; por eso, los mantenimientos periódicos ayudan a sostener los resultados." }
    ],
    images: []
  },
  {
    slug: "manchas-no-rosto",
    icon: "☀️",
    name: "Manchas en el Rostro",
    short: "Protocolos para uniformizar el tono de la piel y atenuar manchas solares, hormonales o de edad.",
    intro: "El tratamiento de manchas en el rostro está indicado para uniformizar el tono de la piel, actuando sobre manchas de origen solar, hormonal (melasma) o posinflamatorias, siempre con evaluación individual de la causa.",
    benefits: [
      "Uniformiza el tono de la piel",
      "Atenuación gradual de las manchas",
      "Mejora la luminosidad general de la piel",
      "Protocolo personalizado según el tipo de mancha"
    ],
    steps: [
      "Evaluación dermatológica de la mancha",
      "Definición del protocolo (combinación de técnicas y activos)",
      "Sesiones según planificación",
      "Mantenimiento con cuidados diarios"
    ],
    indicated: [
      "Manchas solares",
      "Melasma (evaluación especializada)",
      "Manchas posinflamatorias",
      "Pieles con tono irregular"
    ],
    care: [
      "Uso obligatorio y riguroso de protector solar",
      "Evitar exposición solar sin protección",
      "Seguir al pie de la letra el home care indicado",
      "Tener paciencia — los resultados son graduales"
    ],
    faq: [
      { q: "¿Las manchas desaparecen por completo?", a: "El objetivo es atenuar y uniformizar; el resultado varía según el tipo y la causa de la mancha." },
      { q: "¿Puedo tomar sol durante el tratamiento?", a: "No sin protección adecuada — el sol puede comprometer el resultado y oscurecer la mancha nuevamente." },
      { q: "¿El melasma tiene tratamiento definitivo?", a: "El melasma es una condición crónica; el tratamiento controla y atenúa, exigiendo mantenimiento continuo." }
    ],
    images: []
  },
  {
    slug: "mesoterapia-capilar",
    icon: "💆‍♀️",
    name: "Mesoterapia Capilar",
    short: "Estímulo del cuero cabelludo con activos inyectables para fortalecer y reducir la caída del cabello.",
    intro: "La mesoterapia capilar consiste en la aplicación de activos directamente en el cuero cabelludo, estimulando la microcirculación y fortaleciendo los folículos capilares, ayudando a combatir la caída y fortalecer el cabello.",
    benefits: [
      "Estimula la microcirculación del cuero cabelludo",
      "Fortalece el cabello y reduce la caída",
      "Ayuda en la salud capilar general",
      "Protocolo personalizado según la necesidad"
    ],
    steps: [
      "Evaluación capilar",
      "Definición del coctel de activos",
      "Aplicación en el cuero cabelludo",
      "Planificación de sesiones de mantenimiento"
    ],
    indicated: [
      "Caída capilar",
      "Cabello debilitado",
      "Búsqueda de fortalecimiento y salud capilar"
    ],
    care: [
      "Seguir el número de sesiones indicado",
      "Evitar lavar el cabello en las primeras horas tras la sesión",
      "Mantener la rutina de cuidados capilares orientada",
      "Seguimiento periódico"
    ],
    faq: [
      { q: "¿La mesoterapia capilar duele?", a: "Puede causar una leve molestia puntual, generalmente bien tolerada." },
      { q: "¿Cuántas sesiones son necesarias?", a: "Varía según el estado capilar; generalmente un protocolo de sesiones seguido de mantenimiento." },
      { q: "¿Funciona para calvicie avanzada?", a: "La indicación depende de la evaluación — cuanto antes se inicie, mejor tiende a ser la respuesta." }
    ],
    images: []
  },
  {
    slug: "estrias",
    icon: "〰️",
    name: "Estrías",
    short: "Tratamientos para mejorar el aspecto de las estrías, estimulando la regeneración de la piel.",
    intro: "El tratamiento de estrías actúa estimulando la regeneración de la piel y la producción de colágeno en la zona afectada, mejorando la textura, el color y el aspecto general de las estrías, ya sean rosadas o blancas.",
    benefits: [
      "Estímulo de colágeno en la zona tratada",
      "Mejora de la textura de la piel",
      "Atenuación de la coloración de la estría",
      "Protocolo adaptado al tipo de estría"
    ],
    steps: [
      "Evaluación del tipo y fase de la estría",
      "Elección de la técnica más indicada",
      "Sesiones periódicas del protocolo",
      "Seguimiento de la evolución"
    ],
    indicated: [
      "Estrías rosadas (fase inicial)",
      "Estrías blancas (fase madura)",
      "Áreas de abdomen, cadera, muslos y mamas"
    ],
    care: [
      "Hidratación diaria de la piel",
      "Protección solar en la zona tratada",
      "Constancia en las sesiones indicadas",
      "Resultados graduales y progresivos"
    ],
    faq: [
      { q: "¿Las estrías desaparecen por completo?", a: "El objetivo es la mejora significativa del aspecto; la respuesta varía según el tipo y el tiempo de la estría." },
      { q: "¿La estría rosada y la blanca se tratan igual?", a: "No necesariamente — la técnica se ajusta según la fase de la estría." },
      { q: "¿Cuánto tiempo hasta ver resultados?", a: "Suele ser gradual, a lo largo de varias sesiones." }
    ],
    images: []
  },
  {
    slug: "celulite",
    icon: "🧊",
    name: "Celulitis",
    short: "Protocolos para mejorar la textura de la piel y el aspecto de la celulitis.",
    intro: "El tratamiento de celulitis combina técnicas que actúan en la circulación, en la textura de la piel y en la estructura del tejido, mejorando el aspecto de la llamada 'piel de naranja'.",
    benefits: [
      "Mejora la textura de la piel",
      "Ayuda en la circulación local",
      "Reduce el aspecto de la celulitis",
      "Protocolo combinado según el grado"
    ],
    steps: [
      "Evaluación del grado de celulitis",
      "Definición del protocolo combinado",
      "Sesiones periódicas",
      "Orientaciones de mantenimiento"
    ],
    indicated: [
      "Celulitis leve, moderada o acentuada (evaluación individual)",
      "Búsqueda de mejora en la textura de la piel"
    ],
    care: [
      "Mantener rutina de actividad física, si es posible",
      "Buena hidratación corporal",
      "Seguir la periodicidad de las sesiones",
      "Los resultados evolucionan con constancia"
    ],
    faq: [
      { q: "¿La celulitis tiene cura definitiva?", a: "Es una condición multifactorial; el tratamiento mejora el aspecto, pero el mantenimiento es importante." },
      { q: "¿Necesito cambiar hábitos para que el tratamiento funcione?", a: "Los hábitos saludables potencian los resultados del protocolo estético." },
      { q: "¿Cuántas sesiones se indican?", a: "Varía según el grado y la respuesta individual, definido en la evaluación." }
    ],
    images: []
  },
  {
    slug: "gordura-localizada",
    icon: "🔥",
    name: "Grasa Localizada",
    short: "Tratamientos para reducir medidas en áreas de acumulación de grasa localizada.",
    intro: "Los protocolos para grasa localizada ayudan a reducir medidas en áreas específicas de acumulación de grasa resistente a la dieta y el ejercicio, siempre respetando las indicaciones y límites de cada técnica.",
    benefits: [
      "Ayuda a reducir medidas localizadas",
      "Mejora el contorno corporal",
      "Protocolo personalizado por área",
      "Puede combinarse con otras técnicas corporales"
    ],
    steps: [
      "Evaluación del área y del biotipo",
      "Definición de la técnica indicada",
      "Sesiones según planificación",
      "Seguimiento de medidas"
    ],
    indicated: [
      "Áreas con acumulación de grasa localizada resistente",
      "Complemento a hábitos de vida saludables"
    ],
    care: [
      "Mantener alimentación equilibrada e hidratación",
      "Practicar actividad física, si es posible",
      "Seguir la periodicidad de las sesiones",
      "Los resultados varían según la respuesta individual"
    ],
    faq: [
      { q: "¿El tratamiento reemplaza la dieta y el ejercicio?", a: "No. Es un complemento a hábitos de vida saludables, no un sustituto." },
      { q: "¿Está indicado para cualquier área del cuerpo?", a: "La indicación se evalúa individualmente según el área y el biotipo." },
      { q: "¿Cuándo aparecen los resultados?", a: "Suelen ser progresivos, a lo largo de las sesiones del protocolo." }
    ],
    images: []
  },
  {
    slug: "lipo-de-papada",
    icon: "🔻",
    name: "Lipo de Papada",
    short: "Procedimiento para reducir la grasa en la zona del mentón y mejorar el contorno facial.",
    intro: "La lipo de papada es un procedimiento orientado a reducir la grasa localizada en la zona del mentón y el cuello, contribuyendo a un contorno facial más definido y armónico.",
    benefits: [
      "Reducción de la grasa en la zona del mentón",
      "Mejora del contorno facial",
      "Aspecto de papada menos evidente",
      "Procedimiento con evaluación individual detallada"
    ],
    steps: [
      "Evaluación de la zona e indicación de la técnica",
      "Preparación para el procedimiento",
      "Realización según el protocolo indicado",
      "Orientaciones de cuidados posteriores"
    ],
    indicated: [
      "Acumulación de grasa en la zona del mentón/papada",
      "Búsqueda de un contorno facial más definido"
    ],
    care: [
      "Seguir rigurosamente las orientaciones posteriores",
      "Uso de faja u orientación específica, si se indica",
      "Evitar esfuerzos físicos intensos en los primeros días",
      "Seguimiento con la profesional"
    ],
    faq: [
      { q: "¿Es un procedimiento quirúrgico?", a: "Existen técnicas mínimamente invasivas para la papada — la indicación se define en evaluación individual." },
      { q: "¿Cuánto dura la recuperación?", a: "Varía según la técnica indicada; se dan orientaciones específicas en la evaluación." },
      { q: "¿El resultado es definitivo?", a: "Los resultados tienden a ser duraderos, pero los hábitos de vida influyen en su mantenimiento." }
    ],
    images: []
  },
  {
    slug: "harmonizacao-orofacial",
    icon: "💫",
    name: "Armonización Orofacial",
    short: "Conjunto de técnicas para equilibrar las proporciones del rostro de forma natural e individualizada.",
    intro: "La armonización orofacial reúne diferentes técnicas — como toxina botulínica, rellenos y bioestimuladores — para equilibrar las proporciones faciales, corregir asimetrías y realzar la belleza natural de cada paciente.",
    benefits: [
      "Corrige asimetrías faciales naturales",
      "Mejora el equilibrio y la proporción del rostro",
      "Resultados personalizados y naturales",
      "Puede combinar diferentes técnicas en un único plan de tratamiento"
    ],
    steps: [
      "Evaluación facial completa",
      "Planificación individualizada del protocolo",
      "Ejecución de las técnicas indicadas",
      "Seguimiento y ajustes finos"
    ],
    indicated: [
      "Asimetrías faciales",
      "Búsqueda de equilibrio y proporción",
      "Signos de envejecimiento facial",
      "Deseo de realzar rasgos naturales"
    ],
    care: [
      "Seguir las orientaciones específicas de cada técnica combinada",
      "Evitar exposición solar intensa en los primeros días",
      "Retornos de seguimiento según lo planificado",
      "Evaluación profesional continua"
    ],
    faq: [
      { q: "¿La armonización orofacial deja el rostro 'artificial'?", a: "El objetivo de la planificación es justamente lo contrario: realzar las características naturales con equilibrio." },
      { q: "¿Qué técnicas se pueden usar?", a: "Puede incluir botox, rellenos, bioestimuladores y otras técnicas, según evaluación." },
      { q: "¿El resultado es inmediato?", a: "Algunos efectos se ven enseguida, pero el resultado final se consolida a lo largo de días a semanas." }
    ],
    images: ["/assets/images/post2.jpg"]
  },
  {
    slug: "botox",
    icon: "💉",
    name: "Botox (Toxina Botulínica)",
    short: "Toxina botulínica para prevenir y suavizar arrugas dinámicas, con resultado natural.",
    intro: "La aplicación de toxina botulínica (Botox) relaja la musculatura responsable de las arrugas de expresión, previniendo y suavizando líneas en zonas como la frente, la glabela (entre las cejas) y las patas de gallo.",
    benefits: [
      "Previene y suaviza arrugas de expresión",
      "Resultado perceptible en hasta 15 días",
      "Atenúa líneas en frente, glabela y patas de gallo",
      "Mejora la autoestima",
      "Procedimiento rápido, con poco o ningún tiempo de recuperación"
    ],
    steps: [
      "Evaluación de la musculatura facial",
      "Marcación de los puntos de aplicación",
      "Aplicación de la toxina botulínica",
      "Orientaciones posteriores al procedimiento"
    ],
    indicated: [
      "Arrugas dinámicas (de expresión)",
      "Prevención de líneas de expresión",
      "Asimetrías musculares leves del tercio superior del rostro"
    ],
    care: [
      "Evitar acostarse o bajar la cabeza en las primeras horas",
      "No masajear la zona tratada",
      "Evitar ejercicios físicos intensos el mismo día",
      "Esperar el plazo indicado para evaluar el resultado final"
    ],
    faq: [
      { q: "¿El Botox duele?", a: "La molestia es mínima, con agujas finas; la mayoría de las pacientes lo tolera bien." },
      { q: "¿Cuánto dura el efecto?", a: "En promedio de 4 a 6 meses, variando según cada organismo." },
      { q: "¿A partir de qué edad puedo aplicarlo?", a: "No hay una edad fija; la indicación — preventiva o correctiva — se define en la evaluación profesional." }
    ],
    images: ["/assets/images/post6.jpg", "/assets/images/reel3.jpg", "/assets/images/new1.jpg", "/assets/images/new2.webp", "/assets/images/new3.webp"]
  },
  {
    slug: "preenchimento",
    icon: "🌹",
    name: "Relleno",
    short: "Relleno dérmico para restaurar volumen, contornos y un aspecto más joven y natural.",
    intro: "El relleno dérmico, generalmente a base de ácido hialurónico, repone el volumen perdido con el tiempo, redefine contornos y suaviza surcos, proporcionando un aspecto más joven, equilibrado y natural.",
    benefits: [
      "Restaura volúmenes perdidos con el tiempo",
      "Redefine contornos (labios, ojeras, pómulos, mandíbula, entre otros)",
      "Suaviza surcos y líneas de expresión estáticas",
      "Resultado natural e individualizado"
    ],
    steps: [
      "Evaluación facial y planificación del volumen",
      "Aplicación de anestésico tópico (cuando esté indicado)",
      "Aplicación del relleno en la zona definida",
      "Modelado y orientaciones finales"
    ],
    indicated: [
      "Pérdida de volumen facial",
      "Surcos nasogenianos y otras líneas estáticas",
      "Deseo de realzar contornos (labios, ojeras, pómulos, mandíbula)"
    ],
    care: [
      "Evitar ejercicios físicos intensos en las primeras 48h",
      "No masajear la zona sin orientación",
      "Pueden aparecer pequeños hematomas o hinchazón, es normal",
      "Evitar exposición solar y calor intenso en los primeros días"
    ],
    faq: [
      { q: "¿El relleno duele?", a: "Puede causar leve molestia; se usa anestésico tópico para mayor comodidad." },
      { q: "¿Cuánto dura el resultado?", a: "Varía según la zona y el producto utilizado, en promedio de 6 a 18 meses." },
      { q: "¿El relleno es reversible?", a: "El ácido hialurónico puede disolverse con una enzima específica, si es necesario, mediante evaluación." }
    ],
    images: ["/assets/images/post9.jpg", "/assets/images/post4.webp", "/assets/images/new4.webp"]
  }
];
