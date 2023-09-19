import * as sharp from 'sharp';
import PhotoManipulationService from './photoManipulation.service.interface.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class SharpPhotoManipulationService
  implements PhotoManipulationService
{
  async resize(path: string, width: number): Promise<Buffer> {
    return await sharp(path).resize({ width }).toBuffer();
  }

  async addWatermark(data: Buffer, path: string): Promise<Buffer> {
    const watermark = sharp(path);
    const watermarkMetaData = await watermark.metadata();

    const dataImage = sharp(data);
    const dataMetaData = await dataImage.metadata();

    const margin = 20;
    const left = dataMetaData.width - watermarkMetaData.width - margin;
    const top = dataMetaData.height - watermarkMetaData.height - margin;

    return await dataImage
      .composite([{ input: await watermark.toBuffer(), top, left }])
      .toBuffer();
  }
}
