using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<User, UserDTO>()
                .ForMember(dest => dest.WeightMeasurementText, opt => opt.MapFrom(src => src.WeightMeasurement.ToString()))
                .ForMember(dest => dest.HeightMeasurementText, opt => opt.MapFrom(src => src.HeightMeasurement.ToString()))
                .ForMember(dest => dest.GenderText, opt => opt.MapFrom(src => src.Gender.ToString()))
                ;
            CreateMap<ExerciseCategory, ExerciseCategoryDTO>()
                .ForMember(dest => dest.GeneratedBy, opt => opt.MapFrom(src => src.GeneratedBy.ToString()))
                ;
            CreateMap<ExerciseCategory, ExerciseCategoryDropdownDTO>();
            CreateMap<Exercise, ExerciseDTO>();
            CreateMap<WorkoutHeader, WorkoutHeaderDTO>().ReverseMap();
            CreateMap<WorkoutDetail, WorkoutDetailDTO>().ReverseMap();
            CreateMap<Audit, AuditDTO>().ReverseMap();
        }
    }
}
