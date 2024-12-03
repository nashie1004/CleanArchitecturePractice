import axios from "axios";
import api from "./api";

export default class BaseService {

    constructor() {

    }

    protected handleError(status:number, msg: string) : any {
        return {
            status: status,
            data: null,
            message: msg
        }
    }

    protected handleResponse(response: axios.AxiosResponse) : any {
        return {
            status: response.status,
            data: response.data,
            message: "Success"
        }
    }

    async baseGet(url: string) {

        try {
            const response = await api.get(url);
            return this.handleResponse(response);
        }
        catch (err) {
            return this.handleError(500, `${err}`);
        }
    }

    async basePost(url: string, data: any) {

        try {
            const response = await api.post(url, data);
            return this.handleResponse(response);
        }
        catch (err) {
            return this.handleError(500, `${err}`);
        }
    }
   
}