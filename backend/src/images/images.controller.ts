import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  // Upload obrázků k produktu
  @Post(':productId')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Nepovolený typ souboru.'), false);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    }),
  )
  async uploadImages(
    @Param('productId') productId: string,
    @UploadedFiles() files
  ) {
    // Paralelní zpracování obrázků
    const results = await Promise.all(
      files.map(file => {
        const dto: CreateImageDto = {
          url: file.path,  // Můžeš upravit, jak chceš strukturovat URL
        };
        return this.imagesService.create(dto, +productId);
      }),
    );

    return {
      message: `Úspěšně nahráno ${results.length} obrázků.`,
    };
  }

  // Získání obrázků podle produktu
  @Get(':productId')
  async findAll(@Param('productId', ParseIntPipe) productId: number) {
    return this.imagesService.findAll(productId);
  }

  // Smazání obrázku podle ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.remove(id);
  }
}