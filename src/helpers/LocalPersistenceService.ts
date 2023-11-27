export class LocalPersistenceService {
    private static bearerAuthToken: string | null = localStorage.getItem('bearerToken')

    protected static get getBearerToken(): string | null {
        return LocalPersistenceService.bearerAuthToken
    }

    protected static saveBearerToken(newToken: string){
        localStorage.setItem('bearerToken', newToken);
    }
    protected static removeBearerToken(){
        localStorage.removeItem('bearerToken');
    }
     protected static set setBearerToken(newToken: string | null) {
        if (newToken) {
            LocalPersistenceService.bearerAuthToken = newToken
        }
    }

    protected constructor() {
    }
}