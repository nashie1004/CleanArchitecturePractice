import axios from "axios";
import api from "./api";

export interface ReturnMessage {
    status: number,
    data: any,
    message: string
}

export default class BaseService {
    genericSuccessMsg = "Success";
    genericErrorMsg = "Error in the request";

    constructor() {

    }

    protected handleError(error: axios.AxiosError | any): ReturnMessage {
        if (axios.isAxiosError(error)) {
            return {
                status: error.response?.status ?? 500
                , data: null
                , message: error.response?.data?.message ?? this.genericErrorMsg
            }
        }

        return {
            status: 500,
            data: null,
            message: error instanceof Error ? error.message : `${error}`
        }
    }

    protected handleResponse(response: axios.AxiosResponse, message: string = this.genericSuccessMsg): ReturnMessage {
        return {
            status: response.status,
            data: response.data,
            message
        }
    }

    async baseGet(url: string, config?: axios.AxiosRequestConfig) {
        try {
            const response = await api.get(url, config);
            return this.handleResponse(response);
        }
        catch (err) {
            return this.handleError(err);
        }
    }

    async basePost(url: string, data: any, config?: axios.AxiosRequestConfig) {
        try {
            const response = await api.post(url, data, config);
            return this.handleResponse(response);
        }
        catch (err) {
            return this.handleError(err);
        }
    }

    async baseDelete(url: string, config?: axios.AxiosRequestConfig) {
        try {
            const response = await api.delete(url, config);
            return this.handleResponse(response);
        }
        catch (err) {
            return this.handleError(err);
        }
    }

    async basePut(url: string, data: any, config?: axios.AxiosRequestConfig) {
        try {
            const response = await api.put(url, data, config);
            return this.handleResponse(response);
        }
        catch (err) {
            return this.handleError(err);
        }
    }
}