// ===== Encanto Glow — dados dos tratamentos =====
const TREATMENTS = [
  {
    slug: "limpeza-de-pele",
    icon: "🧼",
    name: "Limpeza de Pele Avançada",
    short: "Higienização profunda, extração e renovação da pele com tecnologia e cuidado profissional.",
    intro: "A limpeza de pele avançada vai além da limpeza tradicional, combinando higienização profunda, esfoliação, extração de cravos e impurezas e aplicação de ativos calmantes. É a base para uma pele mais saudável, uniforme e preparada para outros tratamentos estéticos.",
    benefits: [
      "Remove impurezas e cravos de forma segura",
      "Desobstrui os poros e controla a oleosidade",
      "Uniformiza a textura da pele",
      "Prepara a pele para absorver melhor outros ativos",
      "Proporciona sensação imediata de pele renovada"
    ],
    steps: [
      "Avaliação do tipo de pele",
      "Higienização e esfoliação",
      "Extração das impurezas",
      "Aplicação de máscara e ativos calmantes",
      "Finalização com proteção"
    ],
    indicated: [
      "Peles oleosas ou com cravos e espinhas",
      "Poros dilatados",
      "Pele opaca e sem viço",
      "Rotina de manutenção estética"
    ],
    care: [
      "Evitar exposição solar direta nas primeiras 24-48h",
      "Usar protetor solar diariamente",
      "Manter a pele hidratada",
      "Seguir as recomendações passadas na avaliação"
    ],
    faq: [
      { q: "Dói fazer limpeza de pele avançada?", a: "O procedimento pode causar leve desconforto durante a extração, mas é bem tolerado pela maioria das pessoas." },
      { q: "Com que frequência posso repetir?", a: "Em geral, a cada 30 a 45 dias, conforme avaliação individual." },
      { q: "Posso usar maquiagem depois?", a: "O ideal é aguardar algumas horas e priorizar produtos leves nas primeiras 24h." }
    ],
    images: []
  },
  {
    slug: "rejuvenescimento-facial",
    icon: "✨",
    name: "Rejuvenescimento Facial",
    short: "Protocolos combinados para estimular colágeno, firmeza e viço, suavizando os sinais do tempo.",
    intro: "O rejuvenescimento facial reúne técnicas que estimulam a produção de colágeno e elastina, atuando na firmeza, luminosidade e uniformidade da pele. O protocolo é personalizado conforme a necessidade de cada paciente.",
    benefits: [
      "Estimula colágeno e elastina",
      "Suaviza linhas finas e rugas",
      "Melhora firmeza e viço da pele",
      "Uniformiza tom e textura",
      "Resultados que evoluem de forma gradual e natural"
    ],
    steps: [
      "Avaliação facial detalhada",
      "Definição do protocolo (associação de técnicas)",
      "Aplicação do(s) procedimento(s) indicado(s)",
      "Orientações de cuidados pós-procedimento"
    ],
    indicated: [
      "Sinais iniciais ou moderados de envelhecimento",
      "Perda de viço e luminosidade",
      "Busca por prevenção do envelhecimento cutâneo"
    ],
    care: [
      "Uso rigoroso de protetor solar",
      "Hidratação adequada da pele",
      "Evitar procedimentos abrasivos nos dias seguintes",
      "Retornos de manutenção conforme indicação"
    ],
    faq: [
      { q: "A partir de que idade posso fazer?", a: "Não há uma idade fixa — a indicação depende da avaliação individual e das necessidades da pele." },
      { q: "Os resultados são imediatos?", a: "Alguns efeitos são perceptíveis logo, mas o estímulo de colágeno evolui ao longo das semanas." },
      { q: "Preciso associar mais de uma técnica?", a: "Em muitos casos sim — o protocolo é montado sob medida na avaliação." }
    ],
    images: []
  },
  {
    slug: "skinbooster",
    icon: "💧",
    name: "Skinbooster",
    short: "Hidratação profunda injetável para pele mais viçosa, firme e com brilho saudável.",
    intro: "O skinbooster é um tratamento injetável à base de ácido hialurônico de baixa densidade, que promove hidratação profunda e duradoura da pele, melhorando viço, elasticidade e luminosidade.",
    benefits: [
      "Hidratação profunda e duradoura",
      "Melhora a elasticidade da pele",
      "Aumenta o viço e a luminosidade",
      "Suaviza linhas finas de desidratação",
      "Resultado natural, sem alterar os volumes do rosto"
    ],
    steps: [
      "Avaliação e higienização da pele",
      "Aplicação de anestésico tópico (quando indicado)",
      "Microinjeções do produto nas áreas definidas",
      "Cuidados pós-aplicação"
    ],
    indicated: [
      "Pele desidratada e opaca",
      "Linhas finas de desidratação",
      "Busca por viço sem alterar contornos faciais"
    ],
    care: [
      "Evitar sol direto e calor intenso nos primeiros dias",
      "Não massagear a área tratada sem orientação",
      "Manter boa hidratação e proteção solar",
      "Pequenos hematomas podem ocorrer e são normais"
    ],
    faq: [
      { q: "Skinbooster dói?", a: "Pode causar um leve desconforto, geralmente bem tolerado; anestésico tópico pode ser utilizado." },
      { q: "Quantas sessões são necessárias?", a: "Normalmente um protocolo inicial de sessões, definido na avaliação, com manutenções periódicas." },
      { q: "Skinbooster substitui o preenchimento?", a: "Não. O skinbooster hidrata e trata a qualidade da pele; o preenchimento repõe volume." }
    ],
    images: ["assets/images/post10.jpg"]
  },
  {
    slug: "flacidez",
    icon: "🪡",
    name: "Flacidez",
    short: "Tratamentos para estimular firmeza e melhorar o aspecto da pele flácida no rosto e corpo.",
    intro: "Os protocolos para flacidez atuam estimulando a produção de colágeno e melhorando a firmeza e sustentação da pele, com técnicas selecionadas conforme o grau de flacidez e a área tratada.",
    benefits: [
      "Estímulo de colágeno e firmeza",
      "Melhora do contorno facial ou corporal",
      "Pele com aspecto mais firme e tonificado",
      "Resultados progressivos e naturais"
    ],
    steps: [
      "Avaliação do grau de flacidez",
      "Definição da técnica mais indicada",
      "Realização do procedimento",
      "Acompanhamento da evolução"
    ],
    indicated: [
      "Flacidez facial leve a moderada",
      "Flacidez corporal em áreas específicas",
      "Pós-emagrecimento (avaliação individual)"
    ],
    care: [
      "Manter constância no protocolo indicado",
      "Hidratação e proteção solar diárias",
      "Evitar exposição solar intensa após o procedimento",
      "Seguir o cronograma de sessões recomendado"
    ],
    faq: [
      { q: "Existe um tratamento único para flacidez?", a: "Não. A técnica é escolhida conforme grau de flacidez, área e avaliação individual." },
      { q: "Quando os resultados aparecem?", a: "Os resultados costumam ser graduais, evoluindo ao longo das semanas e sessões." },
      { q: "Flacidez tem cura definitiva?", a: "O processo de envelhecimento é contínuo; por isso, manutenções periódicas ajudam a sustentar os resultados." }
    ],
    images: []
  },
  {
    slug: "manchas-no-rosto",
    icon: "☀️",
    name: "Manchas no Rosto",
    short: "Protocolos para uniformizar o tom da pele e amenizar manchas solares, hormonais ou de idade.",
    intro: "O tratamento de manchas no rosto é indicado para uniformizar o tom da pele, atuando em manchas de origem solar, hormonal (melasma) ou pós-inflamatórias, sempre com avaliação individual da causa.",
    benefits: [
      "Uniformiza o tom da pele",
      "Amenização gradual das manchas",
      "Melhora a luminosidade geral da pele",
      "Protocolo personalizado conforme o tipo de mancha"
    ],
    steps: [
      "Avaliação dermatológica da mancha",
      "Definição do protocolo (associação de técnicas e ativos)",
      "Sessões conforme planejamento",
      "Manutenção com cuidados diários"
    ],
    indicated: [
      "Manchas solares",
      "Melasma (avaliação especializada)",
      "Manchas pós-inflamatórias",
      "Peles com tom irregular"
    ],
    care: [
      "Uso obrigatório e rigoroso de protetor solar",
      "Evitar exposição solar sem proteção",
      "Seguir à risca o home care indicado",
      "Ter paciência — resultados são graduais"
    ],
    faq: [
      { q: "Manchas somem completamente?", a: "O objetivo é a amenização e uniformização; o resultado varia conforme o tipo e a causa da mancha." },
      { q: "Posso pegar sol durante o tratamento?", a: "Não sem proteção adequada — o sol pode comprometer o resultado e escurecer novamente a mancha." },
      { q: "Melasma tem tratamento definitivo?", a: "O melasma é uma condição crônica; o tratamento controla e ameniza, exigindo manutenção contínua." }
    ],
    images: []
  },
  {
    slug: "mesoterapia-capilar",
    icon: "💆‍♀️",
    name: "Mesoterapia Capilar",
    short: "Estímulo do couro cabeludo com ativos injetáveis para fortalecer e reduzir a queda dos fios.",
    intro: "A mesoterapia capilar consiste na aplicação de ativos diretamente no couro cabeludo, estimulando a microcirculação e fortalecendo os folículos capilares, auxiliando no combate à queda e no fortalecimento dos fios.",
    benefits: [
      "Estimula a microcirculação do couro cabeludo",
      "Fortalece os fios e reduz a queda",
      "Auxilia na saúde capilar geral",
      "Protocolo personalizado conforme a necessidade"
    ],
    steps: [
      "Avaliação capilar",
      "Definição do coquetel de ativos",
      "Aplicação no couro cabeludo",
      "Planejamento de sessões de manutenção"
    ],
    indicated: [
      "Queda capilar",
      "Fios enfraquecidos",
      "Busca por fortalecimento e saúde capilar"
    ],
    care: [
      "Seguir o número de sessões indicado",
      "Evitar lavar o cabelo nas primeiras horas após a sessão",
      "Manter rotina de cuidados capilares orientada",
      "Acompanhamento periódico"
    ],
    faq: [
      { q: "Mesoterapia capilar dói?", a: "Pode causar um leve desconforto pontual, geralmente bem tolerado." },
      { q: "Quantas sessões são necessárias?", a: "Varia conforme o quadro capilar; geralmente um protocolo de sessões seguido de manutenção." },
      { q: "Funciona para calvície avançada?", a: "A indicação depende da avaliação — quanto antes iniciado, tendencialmente melhor a resposta." }
    ],
    images: []
  },
  {
    slug: "estrias",
    icon: "〰️",
    name: "Estrias",
    short: "Tratamentos para melhorar o aspecto de estrias, estimulando a regeneração da pele.",
    intro: "O tratamento de estrias atua estimulando a regeneração da pele e a produção de colágeno na área afetada, melhorando a textura, a cor e o aspecto geral das estrias, sejam elas rosadas ou brancas.",
    benefits: [
      "Estímulo de colágeno na área tratada",
      "Melhora da textura da pele",
      "Amenização da coloração da estria",
      "Protocolo adaptado ao tipo de estria"
    ],
    steps: [
      "Avaliação do tipo e fase da estria",
      "Escolha da técnica mais indicada",
      "Sessões periódicas do protocolo",
      "Acompanhamento da evolução"
    ],
    indicated: [
      "Estrias rosadas (fase inicial)",
      "Estrias brancas (fase madura)",
      "Áreas de abdômen, quadril, coxas e mamas"
    ],
    care: [
      "Hidratação diária da pele",
      "Proteção solar na área tratada",
      "Constância nas sessões indicadas",
      "Resultados graduais e progressivos"
    ],
    faq: [
      { q: "Estrias somem completamente?", a: "O objetivo é a melhora significativa do aspecto; a resposta varia conforme o tipo e o tempo da estria." },
      { q: "Estria rosada e branca são tratadas da mesma forma?", a: "Não necessariamente — a técnica é ajustada conforme a fase da estria." },
      { q: "Quanto tempo até ver resultado?", a: "Costuma ser gradual, ao longo de várias sessões." }
    ],
    images: []
  },
  {
    slug: "celulite",
    icon: "🧊",
    name: "Celulite",
    short: "Protocolos para melhorar a textura da pele e o aspecto da celulite (fibroedema geloide).",
    intro: "O tratamento de celulite (fibroedema geloide) combina técnicas que atuam na circulação, na textura da pele e na estrutura do tecido, melhorando o aspecto da chamada 'pele de casca de laranja'.",
    benefits: [
      "Melhora a textura da pele",
      "Auxilia na circulação local",
      "Reduz o aspecto de celulite",
      "Protocolo combinado conforme o grau"
    ],
    steps: [
      "Avaliação do grau de celulite",
      "Definição do protocolo combinado",
      "Sessões periódicas",
      "Orientações de manutenção"
    ],
    indicated: [
      "Celulite leve, moderada ou acentuada (avaliação individual)",
      "Busca por melhora na textura da pele"
    ],
    care: [
      "Manter rotina de atividade física, se possível",
      "Boa hidratação corporal",
      "Seguir a periodicidade das sessões",
      "Resultados evoluem com constância"
    ],
    faq: [
      { q: "Celulite tem cura definitiva?", a: "É uma condição multifatorial; o tratamento melhora o aspecto, mas a manutenção é importante." },
      { q: "Preciso mudar hábitos para o tratamento funcionar?", a: "Hábitos saudáveis potencializam os resultados do protocolo estético." },
      { q: "Quantas sessões são indicadas?", a: "Varia conforme o grau e a resposta individual, definido na avaliação." }
    ],
    images: []
  },
  {
    slug: "gordura-localizada",
    icon: "🔥",
    name: "Gordura Localizada",
    short: "Tratamentos para reduzir medidas em áreas de acúmulo de gordura localizada.",
    intro: "Os protocolos para gordura localizada auxiliam na redução de medidas em áreas específicas de acúmulo de gordura resistente à dieta e exercício, sempre respeitando as indicações e limites de cada técnica.",
    benefits: [
      "Auxilia na redução de medidas localizadas",
      "Melhora o contorno corporal",
      "Protocolo personalizado por área",
      "Pode ser associado a outras técnicas corporais"
    ],
    steps: [
      "Avaliação da área e do biotipo",
      "Definição da técnica indicada",
      "Sessões conforme planejamento",
      "Acompanhamento de medidas"
    ],
    indicated: [
      "Áreas com acúmulo de gordura localizada resistente",
      "Complemento a hábitos de vida saudáveis"
    ],
    care: [
      "Manter alimentação equilibrada e hidratação",
      "Praticar atividade física, se possível",
      "Seguir a periodicidade das sessões",
      "Resultados variam conforme resposta individual"
    ],
    faq: [
      { q: "O tratamento substitui dieta e exercício?", a: "Não. É um complemento a hábitos de vida saudáveis, não um substituto." },
      { q: "É indicado para qualquer área do corpo?", a: "A indicação é avaliada individualmente conforme a área e o biotipo." },
      { q: "Quando os resultados aparecem?", a: "Costumam ser progressivos, ao longo das sessões do protocolo." }
    ],
    images: []
  },
  {
    slug: "lipo-de-papada",
    icon: "🔻",
    name: "Lipo de Papada",
    short: "Procedimento para reduzir a gordura na região do queixo e melhorar o contorno facial.",
    intro: "A lipo de papada é um procedimento voltado para a redução de gordura localizada na região do queixo e pescoço, contribuindo para um contorno facial mais definido e harmônico.",
    benefits: [
      "Redução da gordura na região do queixo",
      "Melhora do contorno facial",
      "Aspecto de papada menos evidente",
      "Procedimento com avaliação individual detalhada"
    ],
    steps: [
      "Avaliação da região e indicação da técnica",
      "Preparação para o procedimento",
      "Realização conforme protocolo indicado",
      "Orientações de cuidados pós-procedimento"
    ],
    indicated: [
      "Acúmulo de gordura na região do queixo/papada",
      "Busca por contorno facial mais definido"
    ],
    care: [
      "Seguir rigorosamente as orientações pós-procedimento",
      "Uso de cinta ou orientação específica, se indicado",
      "Evitar esforços físicos intensos nos primeiros dias",
      "Acompanhamento com a profissional"
    ],
    faq: [
      { q: "É um procedimento cirúrgico?", a: "Existem técnicas minimamente invasivas para papada — a indicação é definida em avaliação individual." },
      { q: "Quanto tempo dura a recuperação?", a: "Varia conforme a técnica indicada; orientações específicas são passadas na avaliação." },
      { q: "O resultado é definitivo?", a: "Os resultados tendem a ser duradouros, mas hábitos de vida influenciam sua manutenção." }
    ],
    images: []
  },
  {
    slug: "harmonizacao-orofacial",
    icon: "💫",
    name: "Harmonização Orofacial",
    short: "Conjunto de técnicas para equilibrar as proporções do rosto de forma natural e individualizada.",
    intro: "A harmonização orofacial reúne diferentes técnicas — como toxina botulínica, preenchimentos e bioestimuladores — para equilibrar as proporções faciais, corrigir assimetrias e valorizar a beleza natural de cada paciente.",
    benefits: [
      "Corrige assimetrias faciais naturais",
      "Melhora o equilíbrio e a proporção do rosto",
      "Resultados personalizados e naturais",
      "Pode combinar diferentes técnicas em um único plano de tratamento"
    ],
    steps: [
      "Avaliação facial completa",
      "Planejamento individualizado do protocolo",
      "Execução das técnicas indicadas",
      "Acompanhamento e ajustes finos"
    ],
    indicated: [
      "Assimetrias faciais",
      "Busca por equilíbrio e proporção",
      "Sinais de envelhecimento facial",
      "Desejo de valorizar traços naturais"
    ],
    care: [
      "Seguir as orientações específicas de cada técnica associada",
      "Evitar exposição solar intensa nos primeiros dias",
      "Retornos de acompanhamento conforme planejado",
      "Avaliação profissional contínua"
    ],
    faq: [
      { q: "Harmonização orofacial deixa o rosto 'artificial'?", a: "O objetivo do planejamento é justamente o contrário: valorizar as características naturais com equilíbrio." },
      { q: "Quais técnicas podem ser usadas?", a: "Pode incluir botox, preenchimentos, bioestimuladores e outras técnicas, conforme avaliação." },
      { q: "O resultado é imediato?", a: "Alguns efeitos são vistos logo após, mas o resultado final se consolida ao longo de dias a semanas." }
    ],
    images: ["assets/images/post2.jpg"]
  },
  {
    slug: "botox",
    icon: "💉",
    name: "Botox (Toxina Botulínica)",
    short: "Toxina botulínica para prevenir e suavizar rugas dinâmicas, com resultado natural.",
    intro: "A aplicação de toxina botulínica (Botox) relaxa a musculatura responsável pelas rugas de expressão, prevenindo e suavizando linhas em áreas como testa, glabela (entre as sobrancelhas) e pés de galinha.",
    benefits: [
      "Previne e suaviza rugas de expressão",
      "Resultado perceptível em até 15 dias",
      "Ameniza linhas em testa, glabela e pés de galinha",
      "Melhora a autoestima",
      "Procedimento rápido, com pouco ou nenhum tempo de recuperação"
    ],
    steps: [
      "Avaliação da musculatura facial",
      "Marcação dos pontos de aplicação",
      "Aplicação da toxina botulínica",
      "Orientações pós-procedimento"
    ],
    indicated: [
      "Rugas dinâmicas (de expressão)",
      "Prevenção de linhas de expressão",
      "Assimetrias musculares leves do terço superior da face"
    ],
    care: [
      "Evitar deitar-se ou abaixar a cabeça nas primeiras horas",
      "Não massagear a área tratada",
      "Evitar exercícios físicos intensos no mesmo dia",
      "Aguardar o prazo indicado para avaliar o resultado final"
    ],
    faq: [
      { q: "Botox dói?", a: "O desconforto é mínimo, com agulhas finas; a maioria das pacientes tolera bem." },
      { q: "Quanto tempo dura o efeito?", a: "Em média de 4 a 6 meses, variando conforme cada organismo." },
      { q: "A partir de que idade posso aplicar?", a: "Não há idade fixa; a indicação — preventiva ou corretiva — é definida na avaliação profissional." }
    ],
    images: ["assets/images/post6.jpg", "assets/images/reel3.jpg", "assets/images/new1.jpg", "assets/images/new2.webp", "assets/images/new3.webp"]
  },
  {
    slug: "preenchimento",
    icon: "🌹",
    name: "Preenchimento",
    short: "Preenchimento dérmico para restaurar volume, contornos e um aspecto mais jovem e natural.",
    intro: "O preenchimento dérmico, geralmente à base de ácido hialurônico, repõe o volume perdido com o tempo, redefine contornos e suaviza sulcos, proporcionando um aspecto mais jovem, equilibrado e natural.",
    benefits: [
      "Restaura volumes perdidos com o tempo",
      "Redefine contornos (lábios, olheiras, malar, mandíbula, entre outros)",
      "Suaviza sulcos e linhas de expressão estáticas",
      "Resultado natural e individualizado"
    ],
    steps: [
      "Avaliação facial e planejamento do volume",
      "Aplicação de anestésico tópico (quando indicado)",
      "Aplicação do preenchimento na área definida",
      "Modelagem e orientações finais"
    ],
    indicated: [
      "Perda de volume facial",
      "Sulcos nasogenianos e outras linhas estáticas",
      "Desejo de realçar contornos (lábios, olheiras, malar, mandíbula)"
    ],
    care: [
      "Evitar exercícios físicos intensos nas primeiras 48h",
      "Não massagear a área sem orientação",
      "Pequenos hematomas ou inchaço podem ocorrer e são normais",
      "Evitar exposição solar e calor intenso nos primeiros dias"
    ],
    faq: [
      { q: "Preenchimento dói?", a: "Pode causar leve desconforto; anestésico tópico é utilizado para maior conforto." },
      { q: "Quanto tempo dura o resultado?", a: "Varia conforme a área e o produto utilizado, em média de 6 a 18 meses." },
      { q: "Preenchimento é reversível?", a: "O ácido hialurônico pode ser dissolvido com enzima específica, se necessário, mediante avaliação." }
    ],
    images: ["assets/images/post9.jpg", "assets/images/post4.webp", "assets/images/new4.webp"]
  }
];
