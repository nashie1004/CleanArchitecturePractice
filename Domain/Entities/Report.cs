using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class Report
{
    [Key]
    public long ReportId { get; set; }
    public string ReportName { get; set; }
}
