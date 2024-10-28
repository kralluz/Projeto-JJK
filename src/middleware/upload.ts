// src/middleware/upload.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { mangaId } = req.params;
    const { number } = req.body;

    const dir = path.join(__dirname, '../../public/images', mangaId, number);
    fs.mkdirSync(dir, { recursive: true }); // Cria o diretório se não existir
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configuração do multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 MB por arquivo
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } 
  },
});

export default upload;
