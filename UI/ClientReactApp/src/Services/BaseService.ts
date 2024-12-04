import axios from "axios";
import api from "./api";

export interface GenericListRequest {
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    filters: string
}

export interface GenericReturnMessage {
    isOk: boolean,
    status: number,
    data: any,
    message: string
}

export default class BaseService {
    private genericSuccessMsg = "Success";
    private genericErrorMsg = "Error in the request";

    constructor() {

    }

    protected handleError(error: axios.AxiosError | any): GenericReturnMessage {
        if (axios.isAxiosError(error)) {
            return {
                isOk: false
                , status: error.response?.status ?? 500
                , data: null
                //, message: error.response?.data?.message ?? this.genericErrorMsg
                , message: error.message ?? this.genericErrorMsg
            }
        }

        return {
            isOk: false,
            status: 500,
            data: null,
            message: error instanceof Error ? error.message : `${error}`
        }
    }

    protected handleResponse(response: axios.AxiosResponse, message: string = this.genericSuccessMsg): GenericReturnMessage {
        return {
            isOk: true,
            status: response.status,
            data: response.data,
            message
        }
    }

    protected async baseGet(url: string, config?: axios.AxiosRequestConfig) {
        try {
            const response = await api.get(url, config);
            return this.handleResponse(response);
        }
        catch (err) {
            return this.handleError(err);
        }
    }

    protected async basePost(url: string, data: any, config?: axios.AxiosRequestConfig) {
        try {
            const response = await api.post(url, data, config);
            return this.handleResponse(response);
        }
        catch (err) {
            return this.handleError(err);
        }
    }

    protected async baseDelete(url: string, config?: axios.AxiosRequestConfig) {
        try {
            const response = await api.delete(url, config);
            return this.handleResponse(response);
        }
        catch (err) {
            return this.handleError(err);
        }
    }

    protected async basePut(url: string, data: any, config?: axios.AxiosRequestConfig) {
        try {
            const response = await api.put(url, data, config);
            return this.handleResponse(response);
        }
        catch (err) {
            return this.handleError(err);
        }
    }
}