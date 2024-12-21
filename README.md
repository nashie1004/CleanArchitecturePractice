# Workout Tracker Web App

## To do
- [ ] Dashboard page
- [ ] Profile page
- [ ] Schedule page 
- [ ] Editable workout form
- [ ] Editable exercise form
- [ ] Editable exercise category form
- [ ] All list global search 
- [ ] All list delete
- [ ] Report page

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