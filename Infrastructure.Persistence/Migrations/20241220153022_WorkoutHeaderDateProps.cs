using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infra.Migrations
{
    /// <inheritdoc />
    public partial class WorkoutHeaderDateProps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "WorkoutHeaders");

            migrationBuilder.DropColumn(
                name: "DurationMeasurement",
                table: "WorkoutHeaders");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDateTime",
                table: "WorkoutHeaders",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDateTime",
                table: "WorkoutHeaders",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "WorkoutDetails",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDateTime",
                table: "WorkoutHeaders");

            migrationBuilder.DropColumn(
                name: "StartDateTime",
                table: "WorkoutHeaders");

            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "WorkoutDetails");

            migrationBuilder.AddColumn<decimal>(
                name: "Duration",
                table: "WorkoutHeaders",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "DurationMeasurement",
                table: "WorkoutHeaders",
                type: "INTEGER",
                nullable: false,
                defaultValue: (short)0);
        }
    }
}
