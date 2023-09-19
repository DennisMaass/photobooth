import type { OutputInfo } from 'sharp';

export default interface PhotoManipulationService {
  resize(path: string, width: number): Promise<Buffer>;
  addWatermark(data: Buffer, path: string): Promise<Buffer>;
}
