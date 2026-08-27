import FileHandlingService from "./fileHandling.service.interface";
import { Injectable } from '@nestjs/common';

const sharp: typeof import("sharp")["default"] = require("sharp");

@Injectable()
export default class SharpFileHandlingService implements FileHandlingService {

    async toFile(path: string, data: Buffer): Promise<void> {
        await sharp(data).jpeg( { quality: 80 } ).toFile(path);
    }
}
