import api from "./api";
import BaseService, { GenericReturnMessage } from "./BaseService";

export default class AuthService extends BaseService {

    constructor() {
        super();
    }

    async getMe() {
        return await this.baseGet("/api/Auth/me");   
    }

    async login(data: any) {
        return await this.basePost("/api/Auth/login", data);
    }

    async register(data: any) {
        return await this.basePost("/api/Auth/register", data);
    }

    async changePassword(data: any) {
        return await this.basePut("/api/Auth/changePassword", data);
    }
}