# Pet Adoption - Setup Guide

## 1) Clone
```bash
git clone https://github.com/AalveeAhtav/pet-adoption.git
cd pet-adoption
```

## 2) Ports
- Frontend: `5173`
- Backend API: `5000`
- MySQL: `3306`

## 3) Start MySQL (Windows)
Run in PowerShell as admin:

```powershell
net start MySQL84
```

If that service name fails, try:

```powershell
net start mysql
```

## 4) Configure backend env
Create `backend/.env` from `backend/.env.example` and set your DB credentials:

```env
FRONTEND_PORT=5173
BACKEND_PORT=5000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=AnimalShelter
DB_USER=root
DB_PASSWORD=your_mysql_password
```

## 5) Create DB schema
From project root:

```powershell
& "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u root -p -e "CREATE DATABASE IF NOT EXISTS AnimalShelter;"
& "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u root -p -e "USE AnimalShelter; SOURCE database/schema.sql;"
```

If your MySQL path is different, replace it with your installed path.

## 6) Install and run backend
```bash
cd backend
npm install
npm run dev
```

DB health check:
```bash
npm run check-db
```

## 7) Install and run frontend
```bash
cd frontend
npm install
npm run dev
```

## 8) API smoke tests
- `GET http://localhost:5000/api/health`
- `GET http://localhost:5000/api/pets`
- `GET http://localhost:5000/api/applications`

## Current behavior summary

- Pets:
  - Add/Edit/Delete are DB-backed
  - Browse and Home featured sections read from backend pets API
- Applications:
  - Adoption and foster apply flows are DB-backed
  - User and admin application pages read from backend
  - Admin approve/reject/reopen persists to DB
- Status workflow:
  - Approved adoption inserts into `Adoption`, marks pet unavailable
  - Approved foster inserts into `Foster`, marks pet unavailable
  - Reopen can roll approved status back to pending and restore availability when appropriate

## Notes

- Auth is currently mock/frontend-only (`AuthContext` demo users), not secure backend auth.
- The database contract doc is at `backend/DATABASE_CONTRACT.md`.
