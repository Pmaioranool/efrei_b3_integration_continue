# Student Management - EFREI B3 Integration Continue

Projet full-stack avec :

- Backend Node.js + Express + Prisma
- Frontend Next.js
- Base de donnees MySQL
- Orchestration Docker Compose

## Prerequis

- Docker Desktop installe et demarre
- Docker Compose v2 (`docker compose version`)

Optionnel (si lancement en local sans Docker) :

- Node.js 20+
- npm

## Variables d'environnement

Le fichier `.env` a la racine doit contenir :

```env
# Database Configuration
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=student_management
MYSQL_USER=student
MYSQL_PASSWORD=studentpassword

# Backend Configuration
PORT=3000
DATABASE_URL="mysql://student:studentpassword@db:3306/student_management"

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Lancement rapide avec Docker (recommande)

Depuis la racine du projet :

```bash
docker compose up --build -d
```

Puis appliquer les migrations Prisma (important au premier lancement) :

```bash
docker compose exec backend npm run migrate
```

Acces :

- Frontend : http://localhost:3001
- Backend : http://localhost:3000
- API base URL : http://localhost:3000/api

Arret :

```bash
docker compose down
```

## Depannage si `docker compose up --build -d` echoue (Exit Code 1)

1. Verifier que Docker Desktop est bien lance.
2. Regarder les logs pour identifier le service en erreur :

```bash
docker compose logs --tail=200
```

3. Verifier service par service :

```bash
docker compose ps
docker compose logs db
docker compose logs backend
docker compose logs frontend
```

4. Rebuild complet sans cache :

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

5. Si le backend demarre mais plante sur Prisma :

```bash
docker compose exec backend npx prisma generate
docker compose exec backend npm run migrate
```

## Lancement sans Docker (local)

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

### 2) Frontend

Dans un autre terminal :

```bash
cd frontend
npm install
npm run dev
```

Frontend local : http://localhost:3000 (ou port propose par Next)

> Note : en mode local sans Docker, il faut une base MySQL disponible et adapter `DATABASE_URL` dans `.env` du backend si besoin.

## Structure du projet

```text
docker-compose.yml
backend/
frontend/
infra/
k8s/
services/
```

## Commandes utiles

```bash
# Voir les containers
docker compose ps

# Voir les logs en continu
docker compose logs -f

# Relancer un service
docker compose restart backend

# Ouvrir un shell dans le backend
docker compose exec backend sh
```
