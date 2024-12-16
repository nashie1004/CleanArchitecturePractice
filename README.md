# Workout Tracker Web App

## Features

- Register
- Login

- Dashboard
- Profile
- My Schedule
- Workout Form
- Workout List
- Exercise List
- Exercise Category List
- Report

## Start

1. ASP.NET Core
```
cd /UI/ClientReactApp
npm run dev
```

2. React
```
cd /API
dotnet watch
```

## EF Core Migrations Command

```
dotnet ef database update --context IdentityContext --project Infrastructure.Identity --startup-project API
dotnet ef database update --context MainContext --project Infrastructure.Persistence --startup-project API
```