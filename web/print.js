const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Função auxiliar para esperar um determinado tempo.
 * @param {number} ms - Tempo em milissegundos para esperar.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Função para simular o scroll até o final da página de forma rápida.
 * Isso ajuda a carregar todo o conteúdo dinâmico que aparece com a rolagem.
 * @param {object} page - Objeto da página Puppeteer.
 */
async function autoScroll(page){
    console.log('Iniciando o autoScroll rápido...');
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 200; // Aumenta a distância rolada
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 50); // Reduz o tempo do intervalo
        });
    });
    console.log('AutoScroll rápido concluído.');
}

/**
 * Função para capturar uma captura de tela completa de uma página.
 * @param {string} url - URL da página para capturar a captura de tela.
 * @param {string} downloadPath - Caminho da pasta onde a captura de tela será salva.
 * @param {string} fileName - Nome do arquivo de captura de tela.
 */
async function captureFullPageScreenshot(url, downloadPath, fileName) {
    console.log(`Iniciando a captura de tela para: ${url}`);

    // Cria a pasta de download se não existir
    if (!fs.existsSync(downloadPath)){
        console.log(`Criando a pasta de download: ${downloadPath}`);
        fs.mkdirSync(downloadPath, { recursive: true });
    }

    try {
        // Lança o navegador Puppeteer com opções para melhor performance
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        // Define o tamanho da viewport
        await page.setViewport({ width: 1280, height: 800 });

        console.log(`Navegando para a URL: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2' });
        console.log('Página carregada com sucesso.');

        // Executa o scroll rápido para garantir que todo o conteúdo dinâmico seja carregado
        await autoScroll(page);

        // Aguardar 3 segundos após o carregamento
        await sleep(3000);

        // Define o caminho completo para salvar a captura de tela
        const filePath = path.resolve(downloadPath, fileName);

        // Captura a captura de tela completa da página
        await page.screenshot({
            path: filePath,
            fullPage: true,
        });
        console.log(`Captura de tela salva em: ${filePath}`);

        await browser.close();
        console.log('Navegador fechado.');

    } catch (error) {
        console.error('Erro na captura de tela:', error.message);
    }
}

// Função principal para capturar capturas de tela de múltiplos capítulos
async function captureScreenshots() {
    const screenshotsFolder = path.join(__dirname, 'capturas_de_tela');

    // Cria um array com os capítulos a serem capturados
    const chapters = [];
    for (let i = 1; i <= 181; i++) {
        chapters.push(i);
    }
    chapters.push(20.5, 23.5); // Adicionando os capítulos 20.5 e 23.5

    // Percorre os capítulos e captura as telas
    for (const chapter of chapters) {
        const url = `https://slimeread.com/ler/6567/cap-${chapter}`;
        const fileName = `capitulo_${chapter}.png`;
        await captureFullPageScreenshot(url, screenshotsFolder, fileName);
    }

    console.log('Capturas de tela de todos os capítulos concluídas com sucesso!');
}

// Chama a função principal para capturar as telas
captureScreenshots();
