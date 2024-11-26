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
                .ForMember(dest => dest.WeightMeasurement, opt => opt.MapFrom(src => src.WeightMeasurement.ToString()))
                .ForMember(dest => dest.Height, opt => opt.MapFrom(src => src.HeightMeasurement.ToString()))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender.ToString()))
                ;
        }
    }
}
