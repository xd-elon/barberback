import { container } from 'tsyringe';

import IHasheProvider from './HashProvider/models/IHashedProvider';
import BCryptHashProvider from './HashProvider/implementations/BCriptHashProvider';

container.registerSingleton<IHasheProvider>('HasheProvider',BCryptHashProvider)