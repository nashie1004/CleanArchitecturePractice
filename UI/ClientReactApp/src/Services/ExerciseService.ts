import BaseService, { GenericListRequest } from "./BaseService";

export default class ExerciseService extends BaseService {
    constructor() {
        super();
    }

    async submitForm(data: any) {
        const response = await this.basePost("/api/Exercise/addExercise", data);
        return response;
    }
    
    async getMany(listParams: GenericListRequest) {
        const response = await this.baseGetList("/api/Exercise/getManyExercise", listParams);
        return response;
    }
    
    async getOne(exerciseId: string) {
        const response = await this.baseGet(`/api/Exercise/getOne?exerciseId=${exerciseId}`);
        return response;
    }

    async getDropdown(){
        const response = await this.baseGetList("/api/Exercise/getDropdown", {
            pageSize: 0,
            pageNumber: 0,
            sortBy: "",
            filters: ""
        });
        return response;
    }
}