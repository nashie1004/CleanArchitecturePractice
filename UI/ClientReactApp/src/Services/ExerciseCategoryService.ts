import BaseService, { GenericListRequest } from "./BaseService";

export default class ExerciseCategoryService extends BaseService {
    constructor() {
        super();
    }

    async submitForm(data: any) {
        const response = await this.basePost("/api/ExerciseCategory/addExerciseCategory", data);
        return response;
    }

    async getMany(listParams: GenericListRequest) {
        const response = await this.baseGetList("/api/ExerciseCategory/getMany", listParams);
        return response;
    }
    
    async getOne(exerciseCategoryId: string) {
        const response = await this.baseGet(`/api/ExerciseCategory/getOne?exerciseCategoryId=${exerciseCategoryId}`);
        return response;
    }


    async getDropdown() {
        const response = await this.baseGetList("/api/ExerciseCategory/getDropdown", {
            pageSize: 0,
            pageNumber: 0,
            sortBy: "",
            filters: ""
        });
        return response;
    }
}