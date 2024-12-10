import api from "./api";
import BaseService, { GenericReturnMessage } from "./BaseService";

interface UserDTO {
    userId: number
    userName: string
    weight: number
    weightMeasurementText: string
    height: number
    heightMeasurementText: string
    profileImageUrl: string
    dateOfBirth: Date
    genderText: string
}

interface LoginUserReponse {
    JWTToken: string
    userProfile: UserDTO
}

export default class AuthService extends BaseService {

    constructor() {
        super();
    }

    async getMe() {
        return await this.baseGet("/api/Auth/me");   
    }

    async login(data: any) {
        const response = await this.basePost("/api/Auth/login", data);
        const userData = response.data as LoginUserReponse;

        const retVal = { 
            ...response,
            data: userData
        }

        return retVal;
    }

    async register(data: any) {
        return await this.basePost("/api/Auth/register", data);
    }

    async changePassword(data: any) {
        return await this.basePut("/api/Auth/changePassword", data);
    }
}