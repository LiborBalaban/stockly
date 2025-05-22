import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesRepository } from './images.repository';

@Injectable()
export class ImagesService {
  constructor(private readonly repo: ImagesRepository) {}
  async create(createImageDto: CreateImageDto, productId: number) {
  try {
    const uploaded_img = await this.repo.upload({
      url: createImageDto.url,
      product: { connect: { id: productId } },
    });
    if (uploaded_img) {
      return {
        message: `Obrázek byl úspěšně vytvořen.`,
      };
    }
  } catch (error) {
    console.error('Chyba při ukládání obrázku:', error);
    throw new InternalServerErrorException(
      'Bohužel došlo k chybě při ukládání obrázku.',
    );
  }
}

  async findAll(productId:number) {
    try {
      const images = await this.repo.findAll(productId);

      if(images){
        return {
              documents:images,
              message: `Obrázky byly úspěšně nalezeny.`,
        };
      }
    } catch (error) {
      console.error('Bohužel došlo k chybě při hledání obrázků.', error);
      throw new InternalServerErrorException(
          'Bohužel došlo k chybě při hledání obrázků.',
      );
    }
  }

  async remove(id: number) {
    try {
      const deleted_img = await this.repo.delete(id);

      if(deleted_img){
        return {
                message: `Obrázek byl úspěšně smazán.`,
            };
      }
    } catch (error) {
      console.error('Bohužel došlo k chybě při mazání obrázku.', error);
      throw new InternalServerErrorException(
            'Bohužel došlo k chybě při mazání obrázku.',
      );
    }
  }
}
