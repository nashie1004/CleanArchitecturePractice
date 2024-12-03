import api from "./api";
import BaseService from "./BaseService";

class AuthService extends BaseService {

    constructor() {
        super();
    }

    async getMe() {
        this.baseGet("/api/Auth/me");   
    }
}