﻿// <auto-generated />
using System;
using Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infra.Migrations
{
    [DbContext(typeof(MainContext))]
    [Migration("20241125145626_AddMainUserTable")]
    partial class AddMainUserTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<long?>("LastUpdatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("LastUpdatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("NewData")
                        .HasColumnType("TEXT");

                    b.Property<string>("OldData")
                        .HasColumnType("TEXT");

                    b.Property<string>("TableName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<long>("TablePrimaryKey")
                        .HasColumnType("INTEGER");

                    b.HasKey("AuditId");

                    b.ToTable("Audits");
                });

            modelBuilder.Entity("Domain.Entities.Exercise", b =>
                {
                    b.Property<long>("ExerciseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageUrl")
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<long?>("LastUpdatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("LastUpdatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ExerciseId");

                    b.ToTable("Exercises");
                });

            modelBuilder.Entity("Domain.Entities.TodoItem", b =>
                {
                    b.Property<long>("TodoItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsDone")
                        .HasColumnType("INTEGER");

                    b.Property<long?>("LastUpdatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("LastUpdatedDate")
                        .HasColumnType("TEXT");

                    b.HasKey("TodoItemId");

                    b.ToTable("TodoItems");
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.Property<long>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<long>("IdentityImplementationId")
                        .HasColumnType("INTEGER");

                    b.Property<long?>("LastUpdatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("LastUpdatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Weight")
                        .HasColumnType("TEXT");

                    b.Property<short>("WeightMeasurement")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain.Entities.WorkoutDetail", b =>
                {
                    b.Property<long>("WorkoutDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<long>("ExerciseId")
                        .HasColumnType("INTEGER");

                    b.Property<long?>("LastUpdatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("LastUpdatedDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("Reps")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Sets")
                        .HasColumnType("INTEGER");

                    b.Property<decimal?>("Weight")
                        .HasColumnType("TEXT");

                    b.Property<short>("WeightMeasurement")
                        .HasColumnType("INTEGER");

                    b.Property<long>("WorkoutHeaderId")
                        .HasColumnType("INTEGER");

                    b.HasKey("WorkoutDetailId");

                    b.HasIndex("ExerciseId");

                    b.HasIndex("WorkoutHeaderId");

                    b.ToTable("WorkoutDetails");
                });

            modelBuilder.Entity("Domain.Entities.WorkoutHeader", b =>
                {
                    b.Property<long>("WorkoutHeaderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long>("CreatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<decimal?>("Duration")
                        .HasColumnType("TEXT");

                    b.Property<short>("DurationMeasurement")
                        .HasColumnType("INTEGER");

                    b.Property<long?>("LastUpdatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("LastUpdatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Notes")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("TEXT");

                    b.HasKey("WorkoutHeaderId");

                    b.ToTable("WorkoutHeaders");
                });

            modelBuilder.Entity("Domain.Entities.WorkoutDetail", b =>
                {
                    b.HasOne("Domain.Entities.Exercise", "Exercise")
                        .WithMany()
                        .HasForeignKey("ExerciseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.WorkoutHeader", "WorkoutHeader")
                        .WithMany("WorkoutDetails")
                        .HasForeignKey("WorkoutHeaderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Exercise");

                    b.Navigation("WorkoutHeader");
                });

            modelBuilder.Entity("Domain.Entities.WorkoutHeader", b =>
                {
                    b.Navigation("WorkoutDetails");
                });
#pragma warning restore 612, 618
        }
    }
}
