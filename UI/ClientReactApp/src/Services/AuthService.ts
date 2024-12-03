import api from "./api";
import BaseService, { ReturnMessage } from "./BaseService";

class AuthService extends BaseService {

    constructor() {
        super();
    }

    async getMe() {
        const retVal = await this.baseGet("/api/Auth/me");   
        return retVal;
    }
}