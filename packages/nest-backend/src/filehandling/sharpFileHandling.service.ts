import FileHandlingService from "./fileHandling.service.interface";
import * as sharp from "sharp";
import { Injectable } from '@nestjs/common';

@Injectable()
export default class SharpFileHandlingService implements FileHandlingService {

    async toFile(path: string, data: Buffer): Promise<void> {
        await sharp(data).jpeg( { quality: 80 } ).toFile(path);
    }
}
