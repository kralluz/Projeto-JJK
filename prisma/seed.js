const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function populateDatabase() {
  const charactersData =  [
    {
      id: 5,
      name: "Dagon",
      age: null,
      bio: "Dagon é um Demônio.",
      image: null,
      powers: [],
      domainExpansions: [],
    },
    {
      id: 1,
      name: "Aoi Todo",
      age: 18,
      bio: "Aoi Todo é um homem conhecido como Feiticeiro Jujutsu, Feiticeiro de Grau 1..",
      image: null,
      powers:
        "Características físicas sobre-humanas, Manipulação de Energia Amaldiçoada (Feiticeiro Avançado), Preparação, Teletransporte (Com Boogie Woogie Todo pode trocar de lugar com qualquer coisa que tenha energia de maldição dentro dele), Nulificação de Poder (Dentro do Domínio Simples todas as técnicas são anuladas), Resistência a: Manipulação de Energia Amaldiçoada (Feiticeiro Avançado)",
      domainExpansions: [],
    },
    {
      id: 3,
      name: "Charles Bernard",
      age: null,
      bio: "Charles Bernard é um homem conhecido como Feiticeiro Jujutsu, Mangaká.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Acrobacias (É capaz de realizar movimentos acrobáticos) Invocação e Maestria em Armas (Pode empunhar G Warstaff e usá-lo eficientemente para lutar contra Hakari) Manipulação do Sangue Limitado, Precognição e Manipulação de Texto (G Warstaff permite que Charles vislumbre o futuro de seu oponente no próximo segundo, marcando-o com um painel de mangá. Colocar mais sangue na arma aumenta essa habilidade, permitindo que Charles estenda sua visão ainda mais para o futuro do alvo)",
      domainExpansions: [],
    },
    {
      id: 2,
      name: "Atsuya Kusakabe",
      age: null,
      bio: "Atsuya Kusakabe é um homem conhecido como Feiticeiro Jujutsu, Grau 1.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Feiticeiro Grau 1) Artes Marciais Acrobacias Maestria em Armas (Apesar de não possuir uma técnica inata, Kusakabe é um respeitado Feiticeiro de Grau 1 e um mestre espadachim do Novo Estilo de Sombra.) Domínio Simples Negação de Poder Limitada (Pode usar um Domínio Simples que neutraliza barreiras imbuídas de uma Técnica Amaldiçoada para anular o efeito de acerto garantido de um Domínio e enfraquece as próprias Técnicas Amaldiçoadas, porém entre todos os Domínios Simples, Kusakabe é o que mais é elogiado pelo seu, sendo tão experiente que conseguiu bloquear alguns ataques do Sukuna com eles.) Reação Instintiva e Amplificação Estatística Limitado (As técnicas de esgrima do Novo Estilo de Sombra podem empregar o Domínio Simples ofensivamente para interceptar automaticamente qualquer coisa que entre no raio do Domínio) Criação de Armas (Pode criar uma lâmina de energia amaldiçoada)",
      domainExpansions: [],
    },
    {
      id: 4,
      name: "Choso",
      age: 150,
      bio: "Choso é um homem conhecido como Pintura da Morte, ventre amaldiçoado, Objeto Amaldiçoado de Grau Especial..",
      image: null,
      powers:
        "Características Físicas Sobre-Humanas, Interação Não-Física (Pode interagir com espíritos, fantasmas, não-corporais e maldições que são manifestações abstratas nascidas dos pensamentos, mente e emoções negativas das pessoas), Desenvolvimento Acelerado (Afirma-se que os feiticeiros melhoram quando há consequências a sofrer. Personagens como Yuji, Yuta e Higuruma também mostram isso), Combatente corpo-a-corpo habilidoso, Sentidos aprimorados (feiticeiros podem ver espíritos amaldiçoados que são invisíveis ao olho humano), Manipulação de energia e manipulação de maldições (Todos os feiticeiros são capazes de amaldiçoar uns aos outros e têm controle sobre a energia da maldição), Amplificação Estatística (Os feiticeiros podem amplificar seu poder físico fluindo energia amaldiçoada através de seus corpos através de emoções negativas), Manipulação de Sangue (Pode controlar o sangue que flui através de seu corpo além sua forma ou movimento, suas habilidades com o sangue estão mudando a temperatura corporal, taxa de pulso, número de células sanguíneas e composição sanguínea), Manipulação de Temperatura (Flowing Red Scale permite ao usuário alterar a temperatura de seu corpo), Manipulação de Veneno (Tem veneno misturado com seus ataques de sangue), Telecinesia Limitada e Danmaku Multidirecional (Orbs Supernova flutuam no ar e podem ser lançados atirando em nosso sangue como um chumbo grosso), Regeneração (Low-Mid; Capaz de regenerar membros perdidos como seu irmão mais novo Eso, ao fazer contato com uma fonte externa de sangue), Criação de Arma (Pode criar armas como uma faca, ao manipular e girar o sangue em alta velocidade. Também pode criar orbes de sangue que ele usa regularmente para perfurar o sangue), Resistência a: Manipulação de Gelo (Capaz de derreter o gelo de Uraume)",
      domainExpansions: [],
    },
    {
      id: 10,
      name: "Haba",
      age: null,
      bio: "Haba é um homem conhecido como Feiticeiro Jujutsu.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Manipulação dos Cabelos Voo (Tipo 3) Artes Marciais Acrobacias",
      domainExpansions: [],
    },
    {
      id: 8,
      name: "Fumihiko Takaba",
      age: 35,
      bio: "Fumihiko Takaba é um homem conhecido como Feiticeiro Jujutsu, Comediante.",
      image: null,
      powers:
        "Base Manipulação de Energia Amaldiçoada (Grau Desconhecido) Realidade Subjetiva (Quando Takaba acredita que ele esta sendo engraçado, a sua técnica irá fazer com que o que ele achou ser engraçado se torne realidade) Acrobacias Influência Social Manipulação da Alma Invulnerabilidade Redução de Danos Cura",
      domainExpansions: [],
    },
    {
      id: 9,
      name: "Ganesha",
      age: null,
      bio: "Ganesha é um Demônio conhecido como Grau Especial.",
      image: null,
      powers:
        "Base Manipulação de Energia Amaldiçoada Tamanho Grande (Tipo 0) Teletransporte",
      domainExpansions: [],
    },
    {
      id: 7,
      name: "Desconhecido",
      age: null,
      bio: "Finger Bearer é um Demônio conhecido como Portador do Dedo.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada Artes Marciais Manipulação de Explosões Regeneração (Baixo-Médio)",
      domainExpansions: [],
    },
    {
      id: 6,
      name: "Eso",
      age: 150,
      bio: "Eso é um homem conhecido como Pintura da Morte, Útero Amaldiçoado, Objeto Amaldiçoado de Grau Especial.",
      image: null,
      powers:
        "Habilidades Resistências Manipulação de Energia Amaldiçoada Artes Marciais (É capaz de lutar contra Yuji) Regeneração (Baixo-Médio. Deve ser capaz de regenerar membros perdidos.) Manipulação do Sangue, Manipulação do Veneno, Voo (Tipo 1), Danmaku (Tipo 3) e Manipulação Corporal (A técnica inata de Eso concede-lhe sangue corrosivo que pode envenenar e decompor seu alvo. Também lhe concede a habilidade de remodelar e manipular seu sangue usando técnicas especiais. Diz-se que o sangue de Eso é mais eficaz que o de Kechizu. Máximo: Wing King pode remodelar o sangue fluindo das costas de Eso em asas em forma de vespa. Essas asas concedem a Eso mais mobilidade, bem como uma maneira de atacar com linhas de sangue de longo alcance.) Manipulação da Temperatura Limitada (Usuários de Manipulação de Sangue podem manipular a temperatura de seu corpo.)",
      domainExpansions: [],
    },
    {
      id: 15,
      name: "Hanami",
      age: null,
      bio: "Hanami é um homem conhecido como Espírito Amaldiçoado de Grau Especial..",
      image: null,
      powers:
        "Características Físicas Sobre-Humanas, Combatente corpo-a-corpo habilidoso, Imortalidade (Tipos 1, 2 e 3), Regeneração (Low-Mid. Espíritos Amaldiçoados podem facilmente regenerar membros perdidos, High-Mid ao longo do tempo. Espíritos Amaldiçoados foram mostrado para ficar consciente depois de ser cortado em vários pedaços), Sentidos Aprimorados, Invisibilidade (Espíritos Amaldiçoados são normalmente invisíveis ao olho humano), Incorporedade e Existência Abstrata (Tipo 2. Espíritos Amaldiçoados são manifestações nascidas da mente, pensamentos e emoções negativas das pessoas. O próprio Hanami foi declarado a própria personificação da Energia Amaldiçoada quando se trata de natureza, plantas, galhos, etc.), Interação Não-Física, Manipulação de Energia Amaldiçoada, Manipulação das Plantas (a Técnica de Hanami permite que ele manifeste as ilusões de plantas amaldiçoadas em realidade. Enquanto ele parece estar manipulando a Energia Amaldiçoada, ele na verdade está criando as plantas Amaldiçoadas que ele controla com a Energia Amaldiçoada. Qualquer planta ou ataque de madeira pode ser apagado da realidade tão rapidamente quanto se manifestou. Esta habilidade arma Hanami com uma grande variedade de plantas amaldiçoadas, cada um com capacidades diferentes. Estes incluem espetos de madeira que podem perfurar feiticeiros, galhos que podem prendê-los, raízes que emergem do solo, etc.), Maestria furtiva, manipulação da mente (pode criar um círculo de flores ao redor de seus oponentes com uma maldição que aparentemente pode tirar a vontade de lutar dos oponentes), absorção de poder (Pode lançar botões amaldiçoados que se alimentam da energia de quem quer que seja anexado), Absorção de Força Vital e Projeção de Energia (seu braço esquerdo pode sugar a força vital de plantas próximas, convertendo-as em Energia Amaldiçoada, permitindo que ele libere uma enorme explosão de energial, Expansão de Domínio (As expansões de domínio usam energia amaldiçoada para construir um domínio inato com uma técnica que abrange a área circundante. Além disso, as Técnicas que foram concedidas no Domínio sempre atingirão o oponente. Uma Expansão de Domínio é capaz de neutralizar todas as Técnicas. Pode neutralizar Técnicas com Amplificação de Domínio)",
      domainExpansions: [],
    },
    {
      id: 14,
      name: "Hana Kurusu",
      age: null,
      bio: "Hana Kurusu é uma mulher conhecido como Feiticeiro Jujutsu, Anjo.",
      image: null,
      powers:
        "Base Manipulação de Energia Amaldiçoada (Grau Desconhecido) Negação de Poder (Hana pode extingir e anular toda e qualquer técnica amaldiçoada. Barreiras e objetos amaldiçoados não são exceção, incluindo graus especiais como o Reino da Prisão) Negação de Durabilidade Manipulação da Luz Purificação Artes Marciais Acrobacias",
      domainExpansions: [],
    },
    {
      id: 11,
      name: "Hagane Daido",
      age: null,
      bio: "Hagane Daido é um homem conhecido como Feiticeiro Jujutsu, Mestre Espadachim.",
      image: null,
      powers:
        "Habilidades Desenvolvimento Acelerado Maestria em Armas Inteligência Genial Negação de Durabilidade Sentidos Aprimorados",
      domainExpansions: [],
    },
    {
      id: 12,
      name: "Hajime Kashimo",
      age: 400,
      bio: "Hajime Kashimo é um homem conhecido como Feiticeiro Jujutsu, Feiticeiro Incarnado, “Deus do Trovão”.",
      image: null,
      powers:
        "Habilidades Resistências Base Fera Mítica Âmbar Características Físicas Sobre-Humanas, Manipulação de Energia Amaldiçoada (Feiticeiro Avançado), Maestria em Armas, Maestria em Artes Marciais, Manipulação da Eletricidade (Por meio de sua técnica jujutsu seu corpo está sempre em constante estado de eletrificação), Indução a Paralisia (Por meio de sua eletricidade), Ataque Teleguiado (Ao atingir um oponente, uma carga positiva é transferida para o oponente e a carga negativa em Hajime é descarregada para a carga positiva, tornando-o um ataque imperdível), Criação de Gás Cloro (Ele é capaz de criar gás cloro com sua eletricidade e uma fonte de água), Aura Elétrica (Kashimo é capaz de liberar sua energia amaldiçoada como uma aura elétrica), Possessão (Os feiticeiros do passado são capazes de suprimir a alma de seu corpo hospedeiro com a sua própria), Explosão de Vapor (Pode causar uma explosão de vapor com sua eletricidade e uma fonte de água através da eletricidade se transformando em energia térmica uma vez na água)",
      domainExpansions: [],
    },
    {
      id: 13,
      name: "Hakari Kinji",
      age: null,
      bio: "Hakari Kinji é um homem conhecido como Feiticeiro Jujutsu.",
      image: null,
      powers:
        "Habilidades Resistências Base Jackpot Manipulação de Energia Amaldiçoada (Feiticeiro Avançado). Características Físicas Sobre-Humanas. Artes Marciais. Sentidos Aprimorados. Manipulação de Jogos (Tipo 2) (Possível Uso: Manipulação da Probabilidade Parcial).",
      domainExpansions: [],
    },
    {
      id: 20,
      name: "Jiro Awasaka",
      age: null,
      bio: "Jiro Awasaka é um homem conhecido como Feiticeiro Jujutsu, Membro do Grupo do Kenjaku.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Maestria em Armas, Artes Marciais e Acrobacias Redução de Danos Limitado Invulnerabilidade Limitada",
      domainExpansions: [],
    },
    {
      id: 16,
      name: "Hanyu",
      age: null,
      bio: "Hanyu é uma mulher conhecido como Feiticeiro Jujutsu.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Manipulação dos Cabelos Voo (Tipo 3) Amplificação Estatística Artes Marciais Acrobacias",
      domainExpansions: [],
    },
    {
      id: 19,
      name: "Iori Hazenoki",
      age: null,
      bio: "Iori Hazenoki é um homem conhecido como Feiticeiro Jujutsu.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Artes Marciais Acrobacias Manipulação de Explosões Regeneração (Baixo-Médio)",
      domainExpansions: [],
    },
    {
      id: 17,
      name: "Haruta Shigemo",
      age: null,
      bio: "Haruta Shigemo é um homem conhecido como Feiticeiro Jujutsu, Membro do Grupo do Kenjaku.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Maestria em Armas, Artes Marciais e Acrobacias Ataque Teleguiado Sorte Sobrenatural Manipulação da Memória",
      domainExpansions: [],
    },
    {
      id: 18,
      name: "Hiromi Higuruma",
      age: 36,
      bio: "Hiromi Higuruma é um homem conhecido como Advogado de Defesa Criminal, Feiticeiro Jujutsu, O Homem que pode superar Satoru Gojo, Prodígio.",
      image: null,
      powers:
        'Higuruma Expansão de Domínio Manipulação de Energia Amaldiçoada (Feiticeiro de Grau 1) Inteligência Genial e Desenvolvimento Acelerado (Atingiu o Grau 1 em apenas doze dias após despertar sua Técnica Amaldiçoada, aprendendo o básico das Técnicas de Barreira graças ao seu Domínio e depois trabalhando de trás para frente para entender o Reforço e Controle da Energia Amaldiçoada. Mais tarde, durante sua luta com Sukuna, seu talento foi comparado sendo igual ao de Gojo quando ele aprendeu a usar a Amplificação de Domínio depois de se tornar um feiticeiro há menos de dois meses. Ele então aprendeu a Técnica Reversa no preciso mesmo momento após Sukuna cortar seus braços) Invocação (De seu martelo pode invocar o seu Shikigami "Judgeman") Maestria em Armas (Pode manejar efetivamente seu martelo e a Espada do Carrasco em combate) Criação de Armas (Pode alterar a forma e o tamanho de seu martelo, permitindo-lhe usá-lo como um martelo, marreta, cajado ou gancho, ele também pode desenvocá-lo livremente e invocá-lo de volta em qualquer uma de suas mãos)',
      domainExpansions: [],
    },
    {
      id: 25,
      name: "Kechizu",
      age: 150,
      bio: "Kechizu é um homem conhecido como Pintura da Morte, Útero Amaldiçoado, Objeto Amaldiçoado de Grau Especial.",
      image: null,
      powers:
        "Habilidades Resistências Manipulação de Energia Amaldiçoada Artes Marciais (É capaz de lutar contra Yuji) Regeneração (Baixo-Médio. Deve ser capaz de regenerar membros perdidos.) Manipulação do Sangue e Manipulação do Veneno (Kechizu pode manipular o sangue corrosivo de seu corpo, que é capaz de envenenar seus alvos. Ele geralmente faz isso vomitando rajadas de sangue podre em seus oponentes, queimando sua carne com o impacto. Infecta o alvo com um padrão floral que decompõe o corpo com um veneno especial. Qualquer pessoa atingida pelo sangue de Kechizu pode ser infectada com esta técnica, mesmo que não tenha sido ele quem a ativou.) Manipulação da Temperatura Limitada (Usuários de Manipulação de Sangue podem manipular a temperatura de seu corpo.)",
      domainExpansions: [],
    },
    {
      id: 21,
      name: "Jogo",
      age: null,
      bio: "Jogo é um Demônio.",
      image: null,
      powers: [],
      domainExpansions: [],
    },
    {
      id: 23,
      name: "Juzo Kumiya",
      age: null,
      bio: "Juzo Kumiya é um homem conhecido como Feiticeiro Jujutsu, Membro do Grupo do Kenjaku.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Criação de Campos de Força Maestria em Armas, Artes Marciais e Acrobacias",
      domainExpansions: [],
    },
    {
      id: 24,
      name: "Kasumi Miwa",
      age: 17,
      bio: "Kasumi Miwa é uma mulher conhecido como Feiticeiro Jujutsu, Grau 3.",
      image: null,
      powers:
        "Habilidades Resistência Manipulação de Energia Amaldiçoada (Feiticeira Grau 3) Maestria em Armas e Artes Marciais (É proficiente com sua Katana que usa como meio para lutar) Reação Instintiva Limitada e Negação de Poder Limitada (As técnicas de esgrima do Novo Estilo de Sombra podem empregar o Domínio Simples ofensivamente para interceptar automaticamente qualquer coisa que entre no raio do Domínio. Pode usar Domínio Simples que neutraliza barreiras imbuídas de uma técnica amaldiçoada para anular o efeito de acerto garantido de um Domínio)",
      domainExpansions: [],
    },
    {
      id: 22,
      name: "Junpei Yoshino",
      age: 17,
      bio: "Junpei Yoshino é um homem conhecido como Usuário de Maldições.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Invocação Indução a Paralisia",
      domainExpansions: [],
    },
    {
      id: 30,
      name: "Kokichi Muta",
      age: 17,
      bio: "Kokichi Muta é um homem conhecido como Feiticeiro Jujutsu, Semi-Grau 1.",
      image: null,
      powers:
        "Mechamaru Kokichi Modo Absoluto Manipulação de Energia Amaldiçoada (Feiticeiro Semi Grau 1) Manipulação Corporal (Pode manipular as partes do sua Marionete como bem entender) Artes Marciais Acrobacias Maestria em Armas Voo Limitado (Tipo 1) (Pode usar o Boost On para se propulsionar) Manipulação de Energia (Usando o Ultra Canon pode disparar Energia Amaldiçoada) Manipulação do Fogo (Pode incenerar e conjurar fogo com sua boca e palmas da mão) Domínio Simples (Mostrado aqui)",
      domainExpansions: [],
    },
    {
      id: 27,
      name: "Kento Nanami",
      age: 28,
      bio: "Kento Nanami é um homem conhecido como Feiticeiro Jujutsu de Primeiro Grau..",
      image: null,
      powers:
        'Poderes Resistências Manipulação de Energia Amaldiçoada (Feiticeiro Avançado), Combatente Corpo a Corpo Habilidoso, Domínio de Armas, Negação de Durabilidade e Redução Estatística (Técnica de Ratio cria um ponto fraco em seus oponentes, e é capaz de infligir mais dano em oponentes mais fortes que Nanami), Black flash, Amplificação Estatística (Horas Extras aumenta seu poder e velocidade. Após usarem o black flash os usuários entram na "zona", onde operam em 120% de seu poder)',
      domainExpansions: [],
    },
    {
      id: 28,
      name: "Kirara Hoshi",
      age: 18,
      bio: "Kirara Hoshi é uma mulher conhecido como Feiticeiro Jujutsu.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Artes Marciais Acrobacias Ataque Teleguiado",
      domainExpansions: [],
    },
    {
      id: 29,
      name: "Kiyotaka Ijichi",
      age: 27,
      bio: "Kiyotaka Ijichi é um homem conhecido como Feiticeiro Jujutsu.",
      image: null,
      powers:
        "Habilidades Resistências Manipulação de Energia Amaldiçoada (Grau Desconhecido) Invocação (Pode invocar Shikigamis) Criação de Campos de Força",
      domainExpansions: [],
    },
    {
      id: 26,
      name: "Kenjaku, Pseudo-Geto, Kaori Itadori (Anteriormente), Noritoshi Kamo (Anteriormente)",
      age: 1,
      bio: "Kenjaku é um Demônio conhecido como Feiticeiro Jujutsu, Feiticeiro de Nível Especial (No corpo de Geto), Mestre de Maldições, Chefe do Clã Kamo.",
      image: null,
      powers:
        'Habilidades Resistências Características Físicas Sobre-Humanas Especialista em Artes Marciais (Kenjaku acumulou várias experiências com o combate corpo a corpo, permitindo que ele lutasse e dominasse Choso em uma batalha de puros golpes físicos. É comparável a Gojo em combate corpo a corpo de acordo com o autor) Manipulação de Energia Amaldiçoada (Feiticeiro Avançado) Inteligência Genial e Preparação (Kenjaku analisou Satoru Gojo para encontrar uma estratégia adequada para tirar o feiticeiro quase imbatível de seu caminho. Ele viu que Satoru era o mais forte lutando sozinho e como contramedida, Kenjaku orquestrou o Incidente de Shibuya para colocá-lo em condições desfavoráveis. Enquanto Satoru foi sufocado por não-feiticeiros e forçado a combater vários espíritos amaldiçoados de grau especial ao mesmo tempo, Kenjaku esperou o momento certo para selá-lo) Possessão e Imortalidade (Tipo 6. A técnica inata de Kenjaku permite que ele troque de corpo com outra pessoa, mesmo que ela esteja morta, transplantando seu cérebro para o corpo de seu alvo) Viagem Dimensional e Manipulação dos Sonhos (Kenjaku era capaz de contatar humanos normais em seus sonhos e escoltá-los através de um reino declarado para ficar entre "sonho e realidade" para um diferente lugar físico na realidade) Manipulação da Realidade (Pode alterar a realidade dentro de barreiras) Invocação (Pode convocar e controlar espíritos amaldiçoados) Absorção (Pode absorver maldições que ele exorcizou) Voo limitado (Pode subir em uma das suas maldições para voar) Manipulação da Doença (Uma de suas Maldições de Grau Especial tem a capacidade de infectar pessoas com a doença da Varíola) Expansão de Domínio (Possui uma expansão de domínio do tipo sem espaço separado, e algumas de suas maldições também possuem domínios, porém com espaços separados) Manipulação de Vibrações e Manipulação da Percepção (Um dos seus espíritos amaldiçoados pode causar terremotos e dar uma sensação de queda ao oponente) Negação de Poder (Com amplificação de domínio pode neutralizar qualquer técnica amaldiçoada oposta ou expansão de domínio com a qual ele entre em contato) Fusionismo e Projeção de Energia (É capaz de criar uzumakis e atirar em seus alvos) (Capaz de fundir maldições com Uzumaki) Regeneração (Baixo-Médio. Pode usar técnica amaldiçoada reversa para curar o seu corpo. Ele também é capaz de usar energia amaldiçoada reversa para alimentar uma reversão de técnica amaldiçoada) Manipulação da Gravidade (Uma de suas técnicas amaldiçoadas permite que ele negue a gravidade quando usada. Ele também pode usar uma reversão de técnica amaldiçoada dessa habilidade, permitindo que ele intensifique a atração gravitacional ao seu redor) absorção de Poderes (Pode extrair arte amaldiçoada inata com Uzumaki quando é usada em espíritos amaldiçoados de classificação semi-grau 1 ou superior, permitindo ao usuário manter as técnicas para usos únicos) Manipulação do Tempo, Selamento e Negação de Poder (Pode selar qualquer coisa ou pessoa com o reino da prisão) Manipulação Conceitual e Remoção do Campo de Batalha (Um do seus espíritos de nível especial pode atingir o conceito de uma técnica alvo e remover obstáculos)',
      domainExpansions: [],
    },
    {
      id: 35,
      name: "Maki Zen'in",
      age: 16,
      bio: "Maki Zenin é uma mulher conhecido como Feiticeira Jujutsu, Feiticeira de Grau 4, Candidata a Grau 1..",
      image: null,
      powers:
        "Características Físicas Sobre-Humanas, Interação Não-Física (Pode interagir e danificar maldições), Combatente corpo a corpo habilidosa, Usuária de Shiranui-gata, Maestria em Armas (Usuário especialista em cajados e espadas, treinou Yuta Okkotsu em um espadachim em apenas alguns meses), Sentidos Aprimorados (Com seus óculos ela pode ver Espíritos Amaldiçoados que são invisíveis ao olho humano), Negação de Durabilidade e Interação Não-Física (Soul Katana contorna a resistência das substâncias para atacar a alma, mesmo sendo feito para objetos inanimados), Criação de Ondas de choque (Com a maldição do dragão, Maki pode criar uma força de impacto semelhante à energia amaldiçoada, jogando o alvo para longe pela vibração do impacto), Preparação.",
      domainExpansions: [],
    },
    {
      id: 32,
      name: "Mahito",
      age: null,
      bio: "Mahito é um Demônio.",
      image: null,
      powers: [],
      domainExpansions: [],
    },
    {
      id: 31,
      name: "Kurourushi",
      age: null,
      bio: "Kurourushi é um Demônio conhecido como Grau Especial.",
      image: null,
      powers:
        "Base Manipulação de Energia Amaldiçoada Manipulação Animal Duplicação Limitada (Ele pode duplicar as baratas que controla) Invocação e Indução a Efeito de Status Negação de Durabilidade Limitada",
      domainExpansions: [],
    },
    {
      id: 33,
      name: "Mahoraga",
      age: null,
      bio: "Mahoraga é um homem conhecido como General Divino.",
      image: null,
      powers:
        "Poderes e Habilidades Resistências Características Físicas Sobre-Humanas Manipulação de Energia Amaldiçoada Artes Marciais Cura (Com a roda) Regeneração (Com adaptação) Adaptação Apagamento da Existência Limitado (A espada de Mahoraga apaga a existência de maldições com energia positiva) Negação de Poder (Quebrou uma expansão de domínio durante sua invocação) Manipulação Espacial e Negação de Durabilidade com Cortes Espaciais (Conseguiu ultrapassar a inviolabilidade de Gojo, cortando o espaço e o mesmo)",
      domainExpansions: [],
    },
    {
      id: 34,
      name: "Mai Zenin",
      age: 16,
      bio: "Mai Zenin é uma mulher conhecido como Feiticeiro Jujutsu, Grau 3.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Feiticeiro Grau 3) Artes Marciais Acrobacias Criação (Com a sua técnica inata, Mai pode criar qualquer coisa que esta deseje de pleno ar) Maestria em Armas",
      domainExpansions: [],
    },
    {
      id: 40,
      name: "Mimiko Hasaba",
      age: 16,
      bio: "Mimiko Hasaba é uma mulher conhecido como Feiticeira Jujutsu, Membro do Grupo do Geto.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Provavel Manipulação da Morte (Com Técnica Inata)",
      domainExpansions: [],
    },
    {
      id: 37,
      name: "Megumi Fushiguro",
      age: 15,
      bio: "Megumi Fushiguro é um homem conhecido como Feiticeiro Jujutsu, Feiticeiro de Grau 2, Candidato ao Grau 1..",
      image: null,
      powers:
        "Habilidades Resistências Características Físicas Sobre-Humanas Manipulação de Energia Amaldiçoada (Feiticeiro Básico) Artes Marciais Manipulação da Escuridão (Cria seres para lutar por ele fora das Sombras) Invocação (Com o ritual de exorcismo) Manipulação da Eletricidade (Com Nue) Maestria em Armas (Usuário proficiente de Tonfas, usuário competente de espadas) Manipulação da Água (Com Elefante Máximo) Expansão de Domínio (Tipo 1)",
      domainExpansions: [],
    },
    {
      id: 36,
      name: "Masamichi Yaga",
      age: 47,
      bio: "Masamichi Yaga é um homem conhecido como Feiticeiro Jujutsu, Grau 1.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Feiticeiro Grau 1) Artes Marciais Acrobacias Manipulação de Marionetes Manipulação da Vida Limitada (Pode dar vida a objetos inanimados)",
      domainExpansions: [],
    },
    {
      id: 39,
      name: "Miguel Oduol",
      age: null,
      bio: "Miguel Oduol é um homem conhecido como Feiticeiro Africano, Membro do Grupo do Geto.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Artes Marciais e Acrobacias Manipulação de Fios e Negação de Poder (Pode manipular a Corda Negra à vontade. Com a Corda Negra, Miguel pode interromper e anular Técnicas Amaldiçoadas ao entrar em contato) Amplificação Estatística e Redução Estatística (Com Prayer Song)",
      domainExpansions: [],
    },
    {
      id: 38,
      name: "Mei Mei",
      age: null,
      bio: "Mei Mei é uma mulher conhecido como Feiticeiro Jujutsu, Grau 1.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Feiticeiro Grau 1) Maestria em Armas (Machado) Manipulação Animal, Amplificação Estatística, Manipulação de Leis e Danmaku (Pode controlar corvos e é capaz de forçá-los a fazer votos vinculativos para apagar o limite de energia da maldição) Clarividência (Capaz de compartilhar a visão através de seus corvos)",
      domainExpansions: [],
    },
    {
      id: 45,
      name: "Haruta Shigemo",
      age: null,
      bio: "Niji Ebina é um homem conhecido como Feiticeiro Jujutsu, Membro do Grupo do Kenjaku.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Invocação",
      domainExpansions: [],
    },
    {
      id: 41,
      name: "Momo Nishimiya",
      age: 18,
      bio: "Momo Nishimiya é uma mulher conhecido como Feiticeiro Jujutsu.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Feiticeiro Semi-Grau 1) Artes Marciais e Acrobacias Voo Limitado Criação de Armas Telecinésia Limitada (Apenas pode controlar a sua vassoura) Manipulação do Ar",
      domainExpansions: [],
    },
    {
      id: 43,
      name: "Naobito Zenin",
      age: 71,
      bio: "Naobito Zenin é um homem conhecido como Feiticeiro Jujutsu de grau 1, ex-chefe da família Zenin..",
      image: null,
      powers:
        "Características Físicas sobre-humanas, Manipulação de Energia Amaldiçoada (Feiticeiro Avançado), Amplificação Estatística (Com Feitiçaria de Projeção), Sentidos Aprimorados (a visibilidade de Naobito com Feitiçaria de Projeção permite que ele divida 1 segundo em 24 painéis fazendo-o ver vários pontos em um segundo), Manipulação de Vetores (Projection Sorcery permite ao usuário definir um conjunto predeterminado de movimentos para se mover em combate), Limited Sealing (Qualquer coisa tocada pela palma da mão de Naobito deve cumprir a regra de 1/24 fps ao se mover, se algo não o fizer, causará instabilidade em seu movimento e resultará em ficar congelado por um segundo em um quadro), Ação Instintiva Não Convencional (Caindo Blossom Emotion é uma técnica anti-domínio que reveste o usuário em energia de maldição que contra-ataca ataques recebidos), Criação de pós-imagem (Feitiçaria de projeção demonstrou criar pós-imagens por breves momentos), Resistência a: Indução de paralisia limitada (Projeção Feitiçaria ignora estar em uma ligação e ainda permite que o usuário se mova independentemente), Manipulação de Energia Amaldiçoada (Feiticeiro Avançado)",
      domainExpansions: [],
    },
    {
      id: 42,
      name: "Mimiko Hasaba",
      age: 16,
      bio: "Nanako Hasaba é uma mulher conhecido como Feiticeira Jujutsu, Membro do Grupo do Geto.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Teletransporte Limitado",
      domainExpansions: [],
    },
    {
      id: 44,
      name: "Naoya Zenin",
      age: 27,
      bio: "Naoya Zenin é um homem conhecido como Feiticeiro Jujutsu de Nível 1, Chefe do Hei..",
      image: null,
      powers:
        "Humano Espirito amaldiçoado Características Físicas sobre-humanas, Manipulação de Energia Amaldiçoada (Feiticeiro Avançado), Amplificação Estatística (Com Feitiçaria de Projeção), Sentidos Aprimorados (a visibilidade de Naoya com Feitiçaria de Projeção permite que ele divida 1 segundo em 24 painéis fazendo-o ver vários pontos em um segundo), Manipulação de Vetores (Feitiçaria de Projeção permite ao usuário definir um conjunto predeterminado de movimentos para se mover em combate), Selamento Limitado (Qualquer coisa tocada pela palma da mão de Naobito deve cumprir a regra de 1/24 fps ao se mover, se algo não o fizer, causará instabilidade em seu movimento e resultará em ficar congelado por um segundo em um quadro), Ação Instintiva Não Convencional (Emoção da pétala Decadente é uma técnica anti-domínio que reveste o usuário em energia de maldição que contra-ataca ataques recebidos), Criação de pós-imagem (Feitiçaria de projeção demonstrou criar pós-imagens por breves momentos), Resistência a: Indução de paralisia limitada (Projeção Feitiçaria ignora estar em uma ligação e ainda permite que o usuário se mova independentemente)",
      domainExpansions: [],
    },
    {
      id: 50,
      name: "PudinCremoso",
      age: null,
      bio: "PudinCremoso é um Demônio.",
      image: null,
      powers: [],
      domainExpansions: [],
    },
    {
      id: 48,
      name: "Ogami",
      age: 87,
      bio: "Ogami é uma mulher conhecido como Feiticeiro Jujutsu, Membro do Grupo do Kenjaku.",
      image: null,
      powers:
        "*'''[https://crossverse.fandom.com/pt-br/wiki/Blog_de_usu%C3%A1rio:Maskara_Bucha/Manipula%C3%A7%C3%A3o_de_Energia_Amaldi%C3%A7oada Manipulação de Energia Amaldiçoada]''' ('''Grau Desconhecido''') '''[[Necromancia]]'''",
      domainExpansions: [],
    },
    {
      id: 49,
      name: "Panda",
      age: null,
      bio: "Panda é um Demônio.",
      image: null,
      powers: [],
      domainExpansions: [],
    },
    {
      id: 46,
      name: "Nobara Kugisaki",
      age: 15,
      bio: "Nobara Kugisaki é uma mulher conhecido como Feiticeira Jujutsu, Feiticeira Grau 3, Candidata Grau 1.",
      image: null,
      powers:
        "Manipulação de Energia Amaldiçoada (Feiticeiro Básico), Maestria em Armas (Habilidosa com seu martelo e pregos), Negação de Durabilidade, Manipulação Corporal e Transferência de Dano (Qualquer coisa que aconteça com a boneca (depois de ligada a um alvo) afetará tal alvo. Pode usar ela mesma como a boneca e qualquer dano que ela receber será dado ao alvo desde que ela esteja conectada a eles), Manipulação da Alma (Sua Ressonância era capaz de afetar diretamente a alma de Mahito), Black Flash, Tolerância à Dor (Ela ainda era capaz de lutar ao ter seu corpo destruído por uma Técnica de Maldições, bem como cravar pregos em seu próprio pulso ao mesmo tempo), Resistência a: Manipulação de Energia Amaldiçoada (Feiticeiro Básico)",
      domainExpansions: [],
    },
    {
      id: 47,
      name: "Noritoshi Kamo",
      age: 18,
      bio: "Noritoshi Kamo é um homem conhecido como Feiticeiro Jujutsu, Semi-Grau 1.",
      image: null,
      powers:
        "Habilidades Resistências Manipulação de Energia Amaldiçoada (Feiticeiro Semi-Grau 1) Artes Marciais e Acrobacias (Noritoshi é habilidoso o suficiente para lutar em combate corpo a corpo contra Megumi. Suas habilidades acrobáticas são mostradas quando ele lutou contra Megumi, Hanami, e Naoya) Manipulação do Sangue e Amplificação Estatística (Pode controlar o sangue que flui através de seu corpo além de sua forma ou movimento, suas habilidades com o sangue mudam a temperatura corporal, a pulsação, o número de células sanguíneas e a composição do sangue) Manipulação da Temperatura Limitada (Flowing Red Scale permite ao usuário alterar a temperatura do seu corpo) Criação de Armas (Noritoshi pode usar Manipulação de Sangue para criar um chakram giratório de sangue e disparar um feixe comprimido de sangue) Maestria em Armas e Ataque Teleguiado (Noritoshi é um arqueiro habilidoso que reforça suas flechas com energia amaldiçoada e as guia usando sangue) Redução de Danos (Visto aqui) Manipulação Corporal (Noritoshi pode fazer circular o sangue usado externamente de volta à corrente sanguínea para evitar perda de sangue) Manipulação do Veneno Limitado (O sangue de um usuário de Manipulação de Sangue é venenoso para espíritos amaldiçoados) Força de Vontade Sobrenatural (Apesar de se sentir perdido e sem importância devido à separação de sua mãe e ao exílio do clã Kamo, a dedicação de Noritoshi permanece inabalável. Ele canaliza sua tristeza na determinação de servir seus aliados, disposto a sacrificar sua própria vida pela causa deles.)",
      domainExpansions: [],
    },
    {
      id: 55,
      name: "Ryu Ishigori",
      age: 400,
      bio: "Ryu Ishigori é um homem conhecido como Feiticeiro Jujutsu, Feiticeiro Incarnado.",
      image: null,
      powers:
        "Habilidades Resistências Características Físicas Sobre-Humanas, Manipulação de Energia Amaldiçoada (Feiticeiro Avançado), Expansão de Dominio, Artes Marciais e acrobacias ( é capaz de boxear com Yuta e pode lutar com eficiência em combate aéreo . )",
      domainExpansions: [],
    },
    {
      id: 51,
      name: "Reggie Star",
      age: null,
      bio: "Reggie Star é um homem conhecido como Feiticeiro Jujutsu.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Artes Marciais Acrobacias Negação de Poder Realidade Subjetiva Limitada Criação de Contrato Manipulação de Vetores Manipulação de Leis",
      domainExpansions: [],
    },
    {
      id: 53,
      name: "Rokujushi Miyo",
      age: null,
      bio: "Rokujushi Miyo é um homem conhecido como Feiticeiro Jujutsu, Lutador de Sumô.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Desenvolvimento Acelerado Artes Marciais Inteligência Genial Sentidos Aprimorados",
      domainExpansions: [],
    },
    {
      id: 52,
      name: "Remi",
      age: null,
      bio: "Remi é um Demônio.",
      image: null,
      powers: [],
      domainExpansions: [],
    },
    {
      id: 54,
      name: "Ryomen Sukuna",
      age: 1,
      bio: "Ryomen Sukuna é um homem conhecido como Rei das Maldições, Feiticeiro Incarnado, Feiticeiro Jujutsu (Anteriormente), O Rei dos Venenos..",
      image: null,
      powers:
        "Habilidades Resistências Corpo original e Corpo de Itadori Corpo de Megumi Manipulação de Energia Amaldiçoada (Feiticeiro Avançado) Artes Marciais (Ultrapassou completamente Megumi em habilidade de combate, Jogo não conseguiu acertar um único golpe nele mesmo que estivesse se segurando, foi capaz de lutar com Gojo) Maestria em Armas (É proficiente no uso de suas armas) Regeneração (pelo menos Low-Mid. Pôde regenerar um coração perdido, e a mão cortada de Yuji) Negação de Poder (Com amplificação de domínio pode neutralizar qualquer técnica amaldiçoada oposta ou expansão de domínio com a qual ele entre em contato) Cura (curou Megumi para mantê-lo vivo depois que ele levou um golpe de Mahoraga) Manipulação Corporal Limitada (Ele cresceu 2 olhos extras no rosto de Yuji, pode criar bocas em qualquer lugar do corpo de Yuji) Indução ao Corte, Manipulação de Explosões e Manipulação do Fogo (Criou uma explosão de chama gigante em Shibuya), Manipulação do Veneno",
      domainExpansions: [],
    },
    {
      id: 60,
      name: "Takuma Ino",
      age: 21,
      bio: "Takuma Ino é um homem conhecido como Feiticeiro Jujutsu, Grau 2.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Feiticeiro Grau 2) Artes Marciais e Acrobacias Amplificação Estatística Percepção Extrassensorial Invocação",
      domainExpansions: [],
    },
    {
      id: 57,
      name: "Shoko Ieiri",
      age: 18,
      bio: "Shoko Ieiri é uma mulher conhecido como Feiticeiro Jujutsu, Doutora.",
      image: null,
      powers:
        "Habilidades Resistências Manipulação de Energia Amaldiçoada (Grau Desconhecido) Cura (Consegue usar a energia amaldiçoada reversa para curar a si e as outras pessoas, mas curando só metade de todo seu potencial ao curar os outros) Regeneração Pelo Menos Médio-Baixo para outras pessoas, Alto-Baixo para si mesmo (Foi capaz de curar Maki e curava ferimentos similares) Análise de Informações Limitada (Por ser uma médica, é capaz de analisar o estado do seu paciente para descobrir tratamentos ou reconhecer ferimentos) Inteligência Genial (Estudou medicina e aprendeu a usar a energia reversa, que é considerado algo difícil até pra usuário de 6 olhos, desde muito nova)",
      domainExpansions: [],
    },
    {
      id: 59,
      name: "Suguru Geto",
      age: 17,
      bio: "Suguru Geto é um homem conhecido como Feiticeiro Jujutsu, Feiticeiro de Grau Especial, Mestre de Maldições.",
      image: null,
      powers:
        "Habilidades Resistências Características Físicas Sobre-Humanas Especialista em Arte Marciais (Superou casualmente um mestre de maldições que era confiante em combate corpo a corpo. É especilialista em artes marciais de acordo com o fanbook oficial) Invocação (Pode invocar diversos tipos de espíritos amaldiçoados) Manipulação de Energia Amaldiçoada (Feiticeiro Avançado) Manipulação da Doença (Uma de suas Maldições de Grau Especial tem a capacidade de infectar pessoas com a doença da Varíola Expansão de Domínio (Algumas de suas maldições têm domínios) Fusionismo (Capaz de fundir maldições com Uzumaki)",
      domainExpansions: [],
    },
    {
      id: 58,
      name: "Smallpox Deity",
      age: null,
      bio: "Smallpox Deity é um Demônio conhecido como Maldição de Doenças.",
      image: null,
      powers:
        "Base Manipulação de Energia Amaldiçoada Manipulação da Doença Manipulação da Morte Limitada Regeneração (Baixo-Médio) Negação de Durabilidade Limitada",
      domainExpansions: [],
    },
    {
      id: 56,
      name: "Satoru Gojo",
      age: 29,
      bio: 'Satoru Gojo é um homem conhecido como Feiticeiro, "O Feiticeiro mais forte do mundo", Feiticeiro de Grau Especial, Chefe do Clã Gojo.',
      image: null,
      powers:
        'Poderes e Habilidades Resistências Habilidades Expansão de Domínio: Muryo Kusho Manipulação da Energia Amaldiçoada (Feiticeiro Avançado) Regeneração (Baixo-Médio. Pôde regenerar seu braço decepado mesmo estando enfraquecido) Habilidoso no Combate Corpo-a-Corpo Vôo (Mostrado Aqui) Telecinese (Pode induzir uma força invisível para esmagar alvos) Manipulação do Sono (Pode colocar as pessoas para dormir com um toque) Reação Instintiva (Graças ao Seis Olhos, ele pode subconscientemente ajustar seu escudo infinito e técnicas de regeneração conforme necessário) Criação de Campo de Força Manipulação Espacial (Gojo pode se tornar intocável de qualquer maneira porque ele pode criar um espaço infinito e invisível entre ele e o alvo. De acordo com Satoru, esta é a convergência de uma série infinita e vem direto do paradoxo de Aquiles e a tartaruga. Semelhante á forma como Aquiles nunca pegará a tartaruga devido ao potencial, infinitas quantidades de espaço finito que os separam ou como o número um nunca tocará o número dois devido à quantidade infinita de frações que os separam, o oponente nunca tocará em Satoru devido ao ser parado pelo infinito entre eles. Portanto, para atingir Gojo com sucesso, o alvo deve primeiro cruzar fisicamente uma distância infinita literal), Expansão de Domínio Pseudo-Teletransporte (Usando da atração gravitacional do azul é capaz de se mover em velocidades extremas, o fazendo parecer se teletransportar) Manipulação da Probabilidade Manipulação da Física e Manipulação da Gravidade (O Vazio Azul é o subproduto de Gojo amplificando os números Ilimitados e Negativos, causando situações impossíveis como o nascimento de maçãs negativas. Através da criação dessas impossibilidades, Gojo cria um cenário onde o próprio mundo é forçado a tentar se corrigir e preencher o espaço negativo, fazendo com que as coisas se juntem no ponto dessa impossibilidade resultando em forças de atração. Com a inversão do Vazio Azul, o Vazio Vermelho tem o efeito oposto. Ao usar sua técnica de reversão para inverter as propriedades do Vazio Azul, Satoru ativa a divergência de seu Infinito e, por sua vez, faz com que uma Técnica que atrai se torne outra que repele violentamente) Manipulação da Matéria (Suas habilidades funcionam num nível Atômico) Reflexão de Ataques (Pode redirecionar uma força para refletir ataques em outras pessoas) Manipulação do Vazio (Combinando os infinitos opostos polares de Vermelho e Azul, Gojo é capaz de criar o Vazio Roxo, uma massa imaginária que ele atira em seus oponentes para apagá-los da realidade. Essas propriedades recebem características de "vazio" e são vistas atravessando qualquer coisa que envolvam sem qualquer impacto ambiental que denotaria um processo físico. Isso também funciona em espíritos amaldiçoados, que são de natureza conceitual)',
      domainExpansions: [],
    },
    {
      id: 65,
      name: "Uro Takako",
      age: 1000,
      bio: "Uro Takako é uma mulher conhecido como Feiticeiro Jujutsu.",
      image: null,
      powers:
        "Base Técnica Inata Manipulação de Energia Amaldiçoada (Grau Desconhecido) Manipulação de Leis (Fez uma promessa vinculativa com Kenjaku de que participaria do Jogo do Abate) Cura Limitada e Transformação (Como Sukuna, os Feiticeiros Reencarnados podem mudar para sua forma da Era Heian e curar todas as feridas infligidas em seu corpo sem a Técnica Amaldiçoada Invertida) Artes Marciais e Acrobacias (Pode lutar contra Yuta e pode lutar com eficiência em combate aéreo.)",
      domainExpansions: [],
    },
    {
      id: 61,
      name: "Tengen",
      age: 1200,
      bio: "Tengen é uma mulher conhecido como Feiticeiro Jujutsu.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Criação de Campos de Força Manipulação de Dimensões de Bolso Artes Marciais e Acrobacias Inteligência Genial Imortalidade (Tipo 1)",
      domainExpansions: [],
    },
    {
      id: 62,
      name: "Toge Inumaki",
      age: 16,
      bio: "Toge Inumaki é um homem conhecido como Feiticeiro Jujutsu, Semi-Grau 1.",
      image: null,
      powers:
        "Base Fala Amaldiçoada Manipulação de Energia Amaldiçoada (Feiticeiro Semi-Grau 1) Força de Vontade Sobrenatural (Tem forte vontade de ultrapassar seus limites além de suas capacidades normais e lutar contra oponentes que são extremamente mais fortes do que ele e não tem chance de vitória.) Artes Marciais Acrobacias",
      domainExpansions: [],
    },
    {
      id: 63,
      name: "Toji Fushiguro",
      age: 25,
      bio: "Toji Fushiguro é um homem conhecido como Assassino de xamãs.",
      image: null,
      powers:
        'Habilidades Resistências Características Físicas Sobre-Humanas (A Restrição Celestial de Toji reduziu sua energia de maldição a zero, algo nunca visto no mundo do Jujutsu e permitiu que ele alcançasse uma altura maior do que a própria força física sobre-humana dos feiticeiros, a ponto de ser considerado sobre-humano em comparação com os feiticeiros) Sentidos Aprimorados e Previsão analítica ( Seus sentidos regulares são aguçados a ponto de ele poder captar odores e pegadas humanas . Seus olhos também devem ser semelhantes aos de Maki, que pode ver as diferenças na temperatura e densidade do ar, ela também é capaz de prever como alguém se moverá com base nisso ) Maestria em Armas (Todo o seu estilo de luta é baseado no uso de armas para substituir o jujutsu. Ele mantém um vasto arsenal em seu espírito amaldiçoado, permitindo que ele troque de armas com eficiência com base na necessidade. Ele usou Espadas, um de Cajado de Três Seções, e uma Corrente com eficiência) afirmado ser ainda habilidoso que Gojo em combate corpo a corpo Especialista em Combate Corpo a Corpo (afirmado ser ainda habilidoso que Gojo em combate corpo a corpo. Superou Suguro Geto no corpo a corpo) Percepção Extrassensorial (capaz de ver maldições invisíveis a olho nu) Acrobacias (semelhante a Maki, que pode reagir no ar) Caminhar na Água (Correu pela água como se fosse normal) Provável Regeneração (No máximo Baixo-Médio. Deve ser capaz de curar danos internos semelhantes a Maki) Acausalidade (Tipo 4. Tendo escapado completamente da Energia Amaldiçoada graças à sua Restrição Celestial, Toji foi considerado uma anomalia. Através do poder da restrição ele escapou do destino, o que lhe permitiu quebrar os destinos de Tengen, o receptáculo de Plasma Estelar e o usuário dos Seis Olhos, com eles sendo conectados pelo destino) Análise de Informações (Comparável a Maki com Restrição Celestial, cujas distinções categóricas entre tipos de estímulos deixaram de existir e estenderam seu alcance sensorial muito além do alcance natural de seus corpos para sentir através de seu ambiente, efetivamente "vendo as almas de objetos inanimados " após sua iluminação) Preparação (Tem acesso ao armazenamento de ferramentas amaldiçoadas do Clã Zen\'in. Luta com mais eficácia quando tem tempo para traçar estratégias contra um oponente) Com Maldição do Inventário: Armazenamento Dimensional (A Maldição do Inventário é capaz de armazenar objetos dentro de si, como armas, outras maldições e pessoas) Manipulação e invocação limitada de insetos (via maldições inseto) Com Ferramentas Amaldiçoadas: Manipulação Limitada de Energia Amaldiçoada (Ferramentas Amaldiçoadas são capazes de atacar e matar espíritos amaldiçoados que são as formas manifestadas de imagens, emoções e informações decorrentes da consciência humana coletiva e percepções relacionadas a vários fenômenos) Lança Invertida do Céu: Negação de Poder (A Lança Invertida do Céu interrompe à força as Técnicas Amaldiçoadas) Com Lâmina Liberta Almas: Manipulação da Alma e Negação de Durabilidade (A Liberta Almas contorna a resistência das substâncias para atacar diretamente a alma, sendo efetivo até mesmo em objetos inanimados) Corrente de Mil Milhas: Manipulação do Tamanho Limitado (A Corrente de Mil Milhas pode continuar se estendendo enquanto a outra extremidade não for vista) Fantoche da Carnificina: Reação Instintiva Não Convencional (Enquanto está nesta forma, Toji luta instintivamente, atacando os mais fortes ignorando qualquer um mais fraco)',
      domainExpansions: [],
    },
    {
      id: 64,
      name: "Uraume",
      age: 1000,
      bio: "Uraume é uma mulher conhecido como Feiticeira Jujutsu, Membro do Grupo do Kenjaku, A Estrela Congelante.",
      image: null,
      powers:
        "Habilidades Resistências Manipulação de Energia Amaldiçoada (Grau Desconhecido) Manipulação da Temperatura (Ao super-resfriar a Energia Amaldiçoada, Uraume pode criar instantaneamente gigantescas paredes de gelo semelhantes a geleiras], e espessas camadas de gelo do tamanho de uma ponte, lâminas de gelo em forma de dedo, uma rajada de pingentes de gelo gigantes e cristalinos, e blocos gigantes de gelo, mesmo remotamente. Pode controlar cirocineticamente cascataS de gelo e uma lança de gelo. Pode selar instantaneamente pessoas como Panda, Kamo, Kusakabe e Choso usando Flowing Red Scale e mais tarde até Hakari, posteriormente congelou um Yuji mais forte e Maki) Aumento de Dano (Pode maximizar o resultado de sua Técnica Amaldiçoada) Danmaku (Tipo 3. Ataca com incontáveis ​​pingentes de gelo quase indesviaveis) Modificação de Poder Limtado e Regeneração (Pelo menos Baixo-Médio. Pode reconstruir partes do corpo multiplicando a energia negativa por si só, produzindo assim energia positiva de cura. Regenerou um buraco em sua mão após ser perfurado pelo Piercing Blood de Choso. Curado após ser perfurado através de uma parede por Gojo) Possivel Interação Não-Física e Percepção Extrassensorial (Tendo encarnado com sucesso, compartilhando um corpo com a alma de seu recipiente, Uraume provavelmente pode visualizar a forma da alma, assim como Yuji, o que permite interação direta) Transformação Limtada e Cura (Tendo encarnado e submerso o ego de seu recipiente, Uraume tem controle sobre o corpo e a alma de seu recipiente e pode reparar completamente seu corpo uma vez reencarnando, como Sukuna; embora, eles tenham provavelmente reencarando anteriormente antes dos eventos da série)",
      domainExpansions: [],
    },
    {
      id: 70,
      name: "Yuki Tsukumo",
      age: null,
      bio: "Yuki Tsukumo é uma mulher conhecido como Feiticeira Jujutsu de classe especial..",
      image: null,
      powers:
        "Características Físicas Sobre-Humanas Manipulação de Energia Amaldiçoada (Feiticeiro Avançado) Nulificação de Poder (Ensinou o domínio simples de Aoi Todo que anula todas as técnicas amaldiçoadas) Artes Marciais (Treinou Aoi Todo) Controle Corporal (Yuki pode converter energia amaldiçoada em massa para seu corpo, auxiliando em seus ataques) Manipulação de Densidade e Criação de Buraco negro (Yuki pode controlar massa e densidade de sua técnica, chegando a criar um pequeno buraco negro na terra)",
      domainExpansions: [],
    },
    {
      id: 66,
      name: "Utahime Iori",
      age: 18,
      bio: "Utahime Iori é uma mulher conhecido como Feiticeiro Jujutsu, Semi-Grau 1.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Feiticeiro Semi-Grau 1) Indução a Efeito de Status e Amplificação Estatística (Utahime é capaz de aumentar o poder de uma técnica, usando danças para fortalecer ainda mais o poder da pessoa que ela escolhe.) Artes Marciais e Acrobacias (Pode reagir ao ataque surpresa de Haruta e estava prestes a enfrentá-lo em combate corpo a corpo)",
      domainExpansions: [],
    },
    {
      id: 69,
      name: "Yuji Itadori",
      age: 15,
      bio: 'Yuji Itadori é um homem conhecido como Feiticeiro Jujutsu, Feiticeiro de Grau 2, Candidato Grau 1, Receptáculo de Sukuna (Anteriormente). "Yuu-chan" (por Kirara), "Pirralho" (por Sukuna), "Irmão" (por Aoi Todo).',
      image: null,
      powers:
        "Habilidades Resistências Arco do Feto Amaldiçoado Arco do Junpei Arco de Kyoto/Arco do Incidente de Shibuya Arco da Migração a Extinção A Batalha Decisiva na Terra Assombrada de Shinjuku Características Físicas Sobre-Humanas e Artes Marciais (Yuji aprendeu Karatê com seu avô & Megumi afirma que Yuji tem força e velocidade sobre-humanas, ele pode fazer bom uso do terreno que se encontra em combates) Interação Não Física e Sentidos Aprimorados (Yuji pode ver espíritos amaldiçoados que são invisíveis ao olho humano e ser capaz de interagir com eles) Maestria em Armas (Itadori é proficiente com uma faca que ele usa para lutar contra maldições) Manipulação de Energia Amaldiçoada Limitada (Com a Tozama, Itadori pode exorcizar Espíritos Amaldiçoados e compensar sua falta de manipulação de energia amaldiçoada) Selamento Limitado (o corpo de Itadori funciona como uma gaiola para o Sukuna) Absorção de Poderes e Negação de Imortalidade (Tipo 6; Afirmado como capaz de absorver a Energia Amaldiçoada das Pinturas da Morte para si mesmo e se ele comer algumas delas, isso pode acabar negando suas imortalidades) Múltiplos Eus (Tipo 2; Além da sua alma o seu corpo abriga a alma do Sukuna) Força de Vontade Sobrenatural (Mesmo que sua mão tenha sido cortada e gravemente ferida. Teve vontade suficiente para continuar lutando contra um oponente mais forte que ele, mesmo que ele não tenha como vencer) Imortalidade (Tipo 3, 4 & 8; Dependente do Sukuna]. Sukuna pode ressuscitar o Itadori e regenerar seus ferimentos críticos) Regeneração (Médio-Baixo com Sukuna; Sukuna regenerou sua mão & coração) Tolerância á Dor",
      domainExpansions: [],
    },
    {
      id: 67,
      name: "Yorozu",
      age: 1000,
      bio: "Yorozu é uma mulher conhecido como Feiticeiro Jujutsu.",
      image: null,
      powers:
        "Base Técnica Inata Manipulação de Energia Amaldiçoada (Grau Desconhecido) Regeneração (Baixo-Médio. Demonstrada ser capaz de usar a Técnica Reversa que ajuda os Feiticeiros a regenerar mãos e cérebro) Criação de Contrato (Pode usar voto vinculativo para formar um contrato com outra pessoa e também pode usar voto vinculativo em si mesma para criar Objetos Amaldiçoados de Grau Especial sacrificando sua vida) Cura Limitada e Transformação (Como Sukuna, os Feiticeiros Reencarnados podem mudar para sua forma da Era Heian e curar todos os ferimentos infligidos em seus corpos sem a Técnica Amaldiçoada Invertida. Não é aplicável ao combate para Yorozu, pois ela já usou a encarnação para o corpo, mas deixou o rosto intacto , o que a tornou incapaz de fazê-lo novamente) Artes Marciais e Acrobacias (Pode lutar minimamente contra Sukuna e pode lutar com eficiência em combate aéreo.) Análise de Informações (Coneguiu analisar as habilidades do Round Deer apenas olhando para ele e as habilidades do Piercing Ox ao ser atingida duas vezes.) Força de Vontade Sobrenatural (Com sua vontade de satisfazer o desprezo de Sukuna, afirma-se que criar uma esfera perfeita é algo impossível, ela foi capaz de criar uma.)",
      domainExpansions: [],
    },
    {
      id: 68,
      name: "Yoshinobu Gakuganji",
      age: 76,
      bio: "Yoshinobu Gakuganji é um homem conhecido como Feiticeiro Jujutsu.",
      image: null,
      powers:
        "Habilidades Manipulação de Energia Amaldiçoada (Grau Desconhecido) Manipulação do Som Artes Marciais Acrobacias",
      domainExpansions: [],
    },
    {
      id: 71,
      name: "Yuta Okkotsu",
      age: 16,
      bio: "Yuta Okkotsu é um homem conhecido como Feiticeiro Jujutsu, Feiticeiro de Grau Especial..",
      image: null,
      powers:
        "Volume 0 Jogo do Abate Expansão de Domínio Habilidades da Rika Manipulação de Energia Amaldiçoada (Feiticeiro Básico),Invocação, Percepção Extrassensorial (A visão de Yuta e Rika é compartilhada, permitindo que eles vejam o que o outro vê), Corrupção (A princípio, pensou-se que Rika estava amaldiçoando Yuta, mas após uma investigação mais aprofundada, foi revelado que Yuta amaldiçoou Rika, transformando-a em um espírito amaldiçoado após a morte, criando um vínculo de mestre e servo. Não aplicável em batalha), Manipulação de Energia, Mimetismo de Poder (Pode copiar incondicionalmente Técnicas Amaldiçoadas), Voo (Via Rika), Manipulação da Água (Yuta conseguiu produzir água), Manipulação da Morte, Indução de Paralisia (Através de Palavras Amaldiçoadas, Yuta pode matar ou paralisar seus alvos), Cura (Pode curar pessoas usando Energia Positiva), Transmutação e Manipulação Espacial (via Cópia)",
      domainExpansions: [],
    },
  ];
  

  for (const character of charactersData) {
    try {
      const createdCharacter = await prisma.character.create({
      data: {
        name: character.name,
        age: character.age !== null ? character.age : 0, // Default age to 0 if null
        bio: character.bio,
        image: character.image !== null ? character.image : "", // Default image to empty string if null
        powers: {
        create: Array.isArray(character.powers) && character.powers.length > 0
          ? character.powers.map((power) => ({
            name: power.name,
            description: power.description,
          }))
          : [],
        },
        domainExpansions: {
        create: Array.isArray(character.domainExpansions) && character.domainExpansions.length > 0
          ? character.domainExpansions.map((domain) => ({
            name: domain.name,
            description: domain.description,
          }))
          : [],
        },
      },
      });
    } catch (error) {
      console.error(`Erro ao criar personagem ${character.name}:`, error);
    }
  }
}

populateDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
