const puppeteer = require("puppeteer");
const fs = require("fs").promises;

// Função para dividir um array em lotes
function chunkArray(array, chunk_size) {
  const results = [];
  for (let i = 0; i < array.length; i += chunk_size) {
    results.push(array.slice(i, i + chunk_size));
  }
  return results;
}

(async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const characters = [
    { id: 1, name: "Aoi Todo" },
    { id: 2, name: "Atsuya Kusakabe" },
    { id: 3, name: "Charles Bernard" },
    { id: 4, name: "Choso" },
    { id: 5, name: "Dagon" },
    { id: 6, name: "Eso" },
    { id: 7, name: "Finger Bearer" },
    { id: 8, name: "Fumihiko Takaba" },
    { id: 9, name: "Ganesha" },
    { id: 10, name: "Haba" },
    { id: 11, name: "Hagane Daido" },
    { id: 12, name: "Hajime Kashimo" },
    { id: 13, name: "Hakari Kinji" },
    { id: 14, name: "Hana Kurusu" },
    { id: 15, name: "Hanami" },
    { id: 16, name: "Hanyu" },
    { id: 17, name: "Haruta Shigemo" },
    { id: 18, name: "Hiromi Higuruma" },
    { id: 19, name: "Iori Hazenoki" },
    { id: 20, name: "Jiro Awasaka" },
    { id: 21, name: "Jogo" },
    { id: 22, name: "Junpei Yoshino" },
    { id: 23, name: "Juzo Kumiya" },
    { id: 24, name: "Kasumi Miwa" },
    { id: 25, name: "Kechizu" },
    { id: 26, name: "Kenjaku" },
    { id: 27, name: "Kento Nanami" },
    { id: 28, name: "Kirara Hoshi" },
    { id: 29, name: "Kiyotaka Ijichi" },
    { id: 30, name: "Kokichi Muta" },
    { id: 31, name: "Kurourushi" },
    { id: 32, name: "Mahito" },
    { id: 33, name: "Mahoraga" },
    { id: 34, name: "Mai Zenin" },
    { id: 35, name: "Maki Zenin" },
    { id: 36, name: "Masamichi Yaga" },
    { id: 37, name: "Megumi Fushiguro" },
    { id: 38, name: "Mei Mei" },
    { id: 39, name: "Miguel Oduol" },
    { id: 40, name: "Mimiko Hasaba" },
    { id: 41, name: "Momo Nishimiya" },
    { id: 42, name: "Nanako Hasaba" },
    { id: 43, name: "Naobito Zenin" },
    { id: 44, name: "Naoya Zenin" },
    { id: 45, name: "Niji Ebina" },
    { id: 46, name: "Nobara Kugisaki" },
    { id: 47, name: "Noritoshi Kamo" },
    { id: 48, name: "Ogami" },
    { id: 49, name: "Panda" },
    { id: 50, name: "PudinCremoso" },
    { id: 51, name: "Reggie Star" },
    { id: 52, name: "Remi" },
    { id: 53, name: "Rokujushi Miyo" },
    { id: 54, name: "Ryomen Sukuna" },
    { id: 55, name: "Ryu Ishigori" },
    { id: 56, name: "Satoru Gojo" },
    { id: 57, name: "Shoko Ieiri" },
    { id: 58, name: "Smallpox Deity" },
    { id: 59, name: "Suguru Geto" },
    { id: 60, name: "Takuma Ino" },
    { id: 61, name: "Tengen" },
    { id: 62, name: "Toge Inumaki" },
    { id: 63, name: "Toji Fushiguro" },
    { id: 64, name: "Uraume" },
    { id: 65, name: "Uro Takako" },
    { id: 66, name: "Utahime Iori" },
    { id: 67, name: "Yorozu" },
    { id: 68, name: "Yoshinobu Gakuganji" },
    { id: 69, name: "Yuji Itadori" },
    { id: 70, name: "Yuki Tsukumo" },
    { id: 71, name: "Yuta Okkotsu" },
  ];

  const results = [];
  const concurrencyLimit = 5; // Define o número de tarefas paralelas
  const batches = chunkArray(characters, concurrencyLimit);

  // Inicializa contadores para poderes e expansões de domínio
  let powerIdCounter = 1;
  let domainIdCounter = 1;

  for (const batch of batches) {
    const promises = batch.map(async (character) => {
      try {
        const characterName = character.name.replace(/ /g, "_");
        const url = `https://crossverse.fandom.com/pt-br/wiki/${encodeURIComponent(
          characterName
        )}`;
        console.log(
          `Processando personagem (${character.id}): ${character.name}`
        );

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        // Extrair a URL da imagem do personagem, se disponível
        const imageUrl = await page.evaluate(() => {
          const img = document.querySelector(".pi-image-thumbnail");
          return img ? img.src : null;
        });

        const pageText = await page.evaluate(() => document.body.innerText);

        // Estruturar o texto em chave-valor
        const characterData = parseTextToJson(pageText);

        // Adaptar para o formato desejado com IDs auto-incrementados
        const adaptedData = adaptToDesiredFormat(
          characterData,
          character.name,
          imageUrl,
          character.id,
          powerIdCounter,
          domainIdCounter
        );

        // Atualizar os contadores
        powerIdCounter += adaptedData.powers.length;
        domainIdCounter += adaptedData.domainExpansions.length;

        results.push(adaptedData);
        console.log(`Dados extraídos para: ${character.name}`);
        await page.close();
      } catch (error) {
        console.error(`Erro ao processar ${character.name}:`, error.message);
      }
    });

    await Promise.all(promises);
  }

  await browser.close();

  // Salvar os resultados em um arquivo JSON
  try {
    await fs.writeFile(
      "charactersData.json",
      JSON.stringify(results, null, 2),
      "utf8"
    );
    console.log("Dados salvos em charactersData.json");
  } catch (fileError) {
    console.error("Erro ao salvar o arquivo JSON:", fileError.message);
  }
})();

// Função para parsear o texto em um objeto JSON
function parseTextToJson(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const data = {};
  let currentKey = "";

  lines.forEach((line) => {
    if (line.endsWith(":")) {
      currentKey = line.slice(0, -1);
    } else if (currentKey) {
      if (!data[currentKey]) {
        data[currentKey] = [];
      }
      data[currentKey].push(line);
    }
  });

  for (const key in data) {
    if (data[key].length === 1) {
      data[key] = data[key][0];
    } else {
      data[key] = data[key].join(" ");
    }
  }

  return data;
}

// Função para adaptar os dados ao formato desejado com IDs auto-incrementados
function adaptToDesiredFormat(
  characterData,
  characterName,
  imageUrl,
  characterId,
  powerStartId,
  domainStartId
) {
  // Tratamento para campo Gênero
  let manOrWoman = "um Demônio"; // Padrão neutro
  if (characterData["Gênero"]) {
    const genero = characterData["Gênero"].toLowerCase();
    if (genero === "masculino") {
      manOrWoman = "um homem";
    } else if (genero === "feminino") {
      manOrWoman = "uma mulher";
    }
  }

  // Tratamento para campo Idade
  let age = null;
  if (characterData["Idade"]) {
    const ageMatch = characterData["Idade"].match(/(\d+)/);
    age = ageMatch ? parseInt(ageMatch[1], 10) : null;
  }

  // Tratamento para Bio
  let bio = "";
  if (characterData["Classificação"]) {
    bio = `${characterName} é ${manOrWoman} conhecido como ${characterData["Classificação"]}.`;
  } else if (characterData["Obra"]) {
    bio = `${characterName} é ${manOrWoman} da obra ${characterData["Obra"]}.`;
  } else {
    bio = `${characterName} é ${manOrWoman}.`;
  }

  // Tratamento para poderes e habilidades
  let powers = [];
  if (characterData["Poderes e Habilidades"]) {
    const rawPowers = characterData["Poderes e Habilidades"];
    powers = rawPowers;
  }

  // Tratamento para expansões de domínio (supondo que estejam listadas em "Expansão de Domínio")
  let domainExpansions = [];
  if (characterData["Expansão de Domínio"]) {
    const rawDomains = characterData["Expansão de Domínio"]
      .split(/,|\n/)
      .map((d) => d.trim())
      .filter((d) => d.length > 0);
    domainExpansions = rawDomains.map((domain) => ({
      id: `domain_${domainStartId++}`, 
      name: domain,
      description: `${domain} de ${characterName}.`,
      characterId: characterId,
    }));
  }

  return {
    id: characterId, // ID auto-incrementado do personagem
    name: characterData["Nome"] || characterName,
    age: age,
    bio: bio,
    image: imageUrl || null, // URL da imagem ou null se não disponível
    powers: powers,
    domainExpansions: domainExpansions,
  };
}
