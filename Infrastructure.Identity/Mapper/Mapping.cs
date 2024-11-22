using Application.DTOs;
using AutoMapper;
using Infrastructure.Identity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity.Mapper
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Domain.Entities.User, CustomUser>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.Weight, opt => opt.MapFrom(src => src.Weight))
                .ForMember(dest => dest.WeightMeasurement, opt => opt.MapFrom(src => src.WeightMeasurement))
                ;

            CreateMap<CustomUser, Domain.Entities.User>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.Weight, opt => opt.MapFrom(src => src.Weight))
                .ForMember(dest => dest.WeightMeasurement, opt => opt.MapFrom(src => src.WeightMeasurement))
                ;

            CreateMap<CustomUser, UserDTO>();
        }
    }
}
