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
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<CustomUser, UserDTO>();
        }
    }
}
