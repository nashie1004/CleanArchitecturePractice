using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class UserDTO
    {
        public long UserId { get; set; }
        public string UserName { get; set; }
        public decimal Weight { get; set; }
        public WeightMeasurement WeightMeasurement { get; set; }
        public string WeightMeasurementText { 
            get {
                return WeightMeasurement.ToString();
            }
        }
        public decimal Height { get; set; }
        public HeightMeasurement HeightMeasurement { get; set; }
        public string HeightMeasurementText { 
            get {
                return HeightMeasurement.ToString();
            }
        }
        public string ProfileImageUrl { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public string GenderText
        {
            get
            {
                return Gender.ToString();
            }    
        }
    }
}
