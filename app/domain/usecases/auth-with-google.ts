import { Success, Failure } from '@/app/config/response';
import AuthRepository from '../repositories/auth-repository';
import { UseCase } from '@/app/config/abstract';

class AuthWithGoogleUseCase extends UseCase {
    constructor(repository: AuthRepository) {
        super(repository);
    }

    async execute(): Promise<Success<boolean> | Failure> {
        return await (this.repository as AuthRepository).authenticate();
    }
}

export default AuthWithGoogleUseCase;
