import BaseService, { GenericListRequest } from "./BaseService";

export default class WorkoutService extends BaseService{
    constructor(){
        super();
    }

    async submitForm(data: any){
        return await this.basePost("/api/Workout/submitForm", data);
    }

    async getMany(listParams: GenericListRequest) {
        return await this.baseGetList("/api/Workout/getManyWorkoutHeader", listParams);
    }

    async getOne(workoutHeaderId: number){
        return await this.baseGet(`/api/Workout/getOne?workoutHeaderId=${workoutHeaderId}`)
    }
}