const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

/**
 * Função para esperar um determinado tempo.
 * @param {number} ms - Tempo em milissegundos para esperar.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Função para baixar todas as imagens de uma página específica.
 * @param {string} url - URL da página para fazer o scraping.
 * @param {string} downloadPath - Caminho da pasta onde as imagens serão salvas.
 */
async function downloadAllImages(url, downloadPath) {
    console.log('Iniciando a função downloadAllImages...');
    
    // Cria a pasta de download se não existir
    if (!fs.existsSync(downloadPath)){
        console.log(`Criando a pasta de download: ${downloadPath}`);
        fs.mkdirSync(downloadPath, { recursive: true });
    } else {
        console.log(`Pasta de download já existe: ${downloadPath}`);
    }

    try {
        // Lança o navegador Puppeteer com opções para melhor performance
        console.log('Lançando o navegador Puppeteer...');
        const browser = await puppeteer.launch({
            headless: true, // Executa em modo headless
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        console.log('Abrindo uma nova página...');
        const page = await browser.newPage();

        // Define o tamanho da viewport para carregar mais conteúdo (caso necessário)
        await page.setViewport({ width: 1280, height: 800 });
        console.log('Viewport configurada para 1280x800.');

        console.log(`Navegando para a URL: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2' });
        console.log('Página carregada com sucesso.');

        // Função para simular o scroll até o final da página
        async function autoScroll(page){
            console.log('Iniciando o autoScroll...');
            await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                    let totalHeight = 0;
                    const distance = 100;
                    const timer = setInterval(() => {
                        const scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;

                        if(totalHeight >= scrollHeight){
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });
            console.log('AutoScroll concluído.');
        }

        // Executa o scroll para garantir que todas as imagens sejam carregadas
        console.log('Executando autoScroll...');
        await autoScroll(page);

        // Adiciona um tempo de espera adicional para garantir que todas as imagens carreguem
        console.log('Aguardando 2 segundos adicionais para carregamento completo...');
        // Use diretamente a função sleep
        await sleep(2000);
        console.log('Aguardou 2 segundos usando sleep.');

        // Extrai os URLs das imagens na página
        console.log('Extraindo URLs das imagens...');
        const imageUrls = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'));
            return images.map(img => img.src);
        });

        console.log(`Encontradas ${imageUrls.length} imagens.`);

        // Remove URLs duplicadas
        const uniqueImageUrls = [...new Set(imageUrls)];
        console.log(`Total de imagens únicas: ${uniqueImageUrls.length}`);

        // Faz o download de cada imagem
        for (const [index, imageUrl] of uniqueImageUrls.entries()) {
            try {
                // Verifica se a URL é válida
                let absoluteUrl = imageUrl;
                if (!absoluteUrl.startsWith('http')) {
                    // Converte URLs relativas para absolutas
                    absoluteUrl = new URL(imageUrl, url).href;
                }
                console.log(`Baixando imagem ${index + 1}/${uniqueImageUrls.length}: ${absoluteUrl}`);
                await downloadImage(absoluteUrl, index, downloadPath);
            } catch (error) {
                console.error(`Erro ao processar a imagem ${imageUrl}:`, error.message);
            }
        }

        // Fecha o navegador
        console.log('Fechando o navegador...');
        await browser.close();
        console.log('Navegador fechado.');

    } catch (error) {
        console.error('Erro na função downloadAllImages:', error.message);
    }
}

/**
 * Função auxiliar para baixar uma única imagem.
 * @param {string} imageUrl - URL da imagem.
 * @param {number} index - Índice da imagem.
 * @param {string} downloadPath - Caminho da pasta onde a imagem será salva.
 */
async function downloadImage(imageUrl, index, downloadPath) {
    try {
        console.log(`Iniciando download da imagem: ${imageUrl}`);
        // Faz a requisição da imagem
        const response = await axios({
            method: 'GET',
            url: imageUrl,
            responseType: 'stream',
            timeout: 10000, // Timeout de 10 segundos
        });

        // Extrai o nome da imagem
        const urlPath = new URL(imageUrl).pathname;
        let fileName = path.basename(urlPath);

        // Se o nome da imagem estiver vazio ou for genérico, atribui um nome único
        if (!fileName || fileName.length < 3) {
            fileName = `image_${index}.jpg`;
        }

        // Evita nomes duplicados
        let uniqueFileName = fileName;
        let counter = 1;
        while (fs.existsSync(path.join(downloadPath, uniqueFileName))) {
            const ext = path.extname(fileName);
            const name = path.basename(fileName, ext);
            uniqueFileName = `${name}_${counter}${ext}`;
            counter++;
        }

        // Define o caminho completo para salvar a imagem
        const filePath = path.resolve(downloadPath, uniqueFileName);

        // Cria um fluxo de escrita para salvar a imagem
        const writer = fs.createWriteStream(filePath);

        // Redireciona o fluxo de dados para o arquivo
        response.data.pipe(writer);

        // Aguarda até que a imagem seja completamente escrita
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(`Imagem baixada: ${uniqueFileName}`);
    } catch (error) {
        console.error(`Erro ao baixar a imagem ${imageUrl}:`, error.message);
    }
}

// URL da página que deseja fazer o scraping
const targetUrl = 'https://slimeread.com/ler/6567/cap-1';

// Caminho da pasta onde as imagens serão salvas
const imagesFolder = path.join(__dirname, 'imagens');

// Chama a função para baixar as imagens
downloadAllImages(targetUrl, imagesFolder)
    .then(() => console.log('Download de todas as imagens concluído!'))
    .catch(err => console.error('Erro no download das imagens:', err));
