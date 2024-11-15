﻿// <auto-generated />
using System;
using Infra;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infra.Migrations.Audit
{
    [DbContext(typeof(AuditContext))]
    partial class AuditContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.20");

            modelBuilder.Entity("Domain.Entities.Audit", b =>
                {
                    b.Property<long>("AuditId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<short>("Action")
                        .HasColumnType("INTEGER");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<long>("LastUpdatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("LastUpdatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("NewData")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("OldData")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("TableName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<long>("TablePrimaryKey")
                        .HasColumnType("INTEGER");

                    b.HasKey("AuditId");

                    b.ToTable("Audits");
                });
#pragma warning restore 612, 618
        }
    }
}
