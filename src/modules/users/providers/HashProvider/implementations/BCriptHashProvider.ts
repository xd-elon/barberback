import { compare, hash } from 'bcryptjs';
import IHasheProvider from '../models/IHashedProvider';

class BCryptHashProvider implements IHasheProvider {
    public async generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean> {
        return compare(payload, hashed);
    }
}

export default BCryptHashProvider;