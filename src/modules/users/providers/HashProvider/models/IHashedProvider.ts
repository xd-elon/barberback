export default interface IHasheProvider {
    generateHash(payload: string): Promise<string>;
    compareHash( payload: string, hashed: string): Promise<boolean>;
}