export default interface FileHandlingService {
    toFile(path: string, data: Buffer): Promise<void>;
}
