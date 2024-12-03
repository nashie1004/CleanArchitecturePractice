import api from "./api";
import BaseService, { GenericReturnMessage } from "./BaseService";

class AuthService extends BaseService {

    constructor() {
        super();
    }

    async getMe() {
        const retVal = await this.baseGet("/api/Auth/me");   
        return retVal;
    }

    async login(data: any) {
        const retVal = await this.basePost("/api/Auth/login", data);
        return retVal;
    }

    async register(data: any) {
        const retVal = await this.basePost("/api/Auth/register", data);
        return retVal;
    }

    async changePassword(data: any) {
        const retVal = await this.basePut("/api/Auth/changePassword", data);
        return retVal;
    }
}