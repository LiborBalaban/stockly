// middleware/multer-config.ts
import * as multer from 'multer';
import * as path from 'path';

// Nastavení úložiště pro Multer
export const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // Určujeme, kam se soubor uloží
      cb(null, '../uploads');
    },
    filename: (req, file, cb) => {
      // Nastavení jedinečného názvu souboru
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file, cb) => {
    // Kontrola typu souboru
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Nepovolený typ souboru. Povolené jsou JPEG, PNG a GIF.'));
    }
  },
  limits: {
    // Omezení velikosti souboru na 5 MB
    fileSize: 5 * 1024 * 1024,
  },
};