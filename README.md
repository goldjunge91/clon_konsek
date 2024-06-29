<!-- omit from toc -->
# Inhaltsverzeichnis

- [Einleitung](#einleitung)
- [Technologien](#technologien)
  - [Verwendete Technologien und Frameworks](#verwendete-technologien-und-frameworks)
- [Systemaktualisierung und Softwareinstallation](#systemaktualisierung-und-softwareinstallation)
  - [Anaconda Installation](#anaconda-installation)
  - [Entfernung von Apache2 und Installation von NGINX](#entfernung-von-apache2-und-installation-von-nginx)
  - [VSCode CLI Installation](#vscode-cli-installation)
  - [Firewall-Einrichtung](#firewall-einrichtung)
  - [NVM, Node.js und PM2 Installation](#nvm-nodejs-und-pm2-installation)
  - [GitHub Actions Runner Installation](#github-actions-runner-installation)
  - [Einrichtung von Let's Encrypt](#einrichtung-von-lets-encrypt)
- [Systemeinstellungen](#systemeinstellungen)
  - [NextJS Konfigurationsvariablen](#nextjs-konfigurationsvariablen)
  - [Verschlüsselungs- und Docker-Variablen](#verschlüsselungs--und-docker-variablen)
- [Architektur](#architektur)
  - [Projektstruktur und Quellcode-Verzeichnis](#projektstruktur-und-quellcode-verzeichnis)
  - [Unterverzeichnisse und wichtige Dateien](#unterverzeichnisse-und-wichtige-dateien)
    - [App](#app)
    - [App/Admin](#appadmin)
    - [App/API](#appapi)
    - [App/Browse](#appbrowse)
    - [App/Create Task](#appcreate-task)
    - [App/Tasks](#apptasks)
    - [App/Your Tasks](#appyour-tasks)

## Einleitung

PDF-procesor ist eine Webanwendung, die es Benutzern ermöglicht, druckbare PDF-Dokumente aus ihrer DMS (Dokumentenmanagementsystem) zu erstellen. Dieser Service ist Teil des 17025starter-Programms, das von Konsek Engineering & Consulting GmbH angeboten wird.

## Technologien

### Verwendete Technologien und Frameworks

- Next.js: React-Framework für serverseitiges Rendering und Routing
- TypeScript: Typisierter Übersatz von JavaScript
- Tailwind CSS: Utility-First CSS-Framework
- NextAuth.js: Authentifizierungslösung für Next.js
- Drizzle ORM: TypeScript ORM für SQL-Datenbanken
- Docker: Containerverwaltung für PostgresSQL Datenbank

## Systemaktualisierung und Softwareinstallation

Führen Sie die folgenden Befehle aus, um das System zu aktualisieren und die benötigte Software zu installieren:

```bash
sudo apt update -y && sudo apt upgrade -y
sudo apt install -y nano git python3-pip docker.io eza
```

### Anaconda Installation

```bash
curl https://repo.anaconda.com/archive/Anaconda3-2024.02-1-Linux-x86_64.sh --output anaconda.sh
bash anaconda.sh
```

### Entfernung von Apache2 und Installation von NGINX

```bash
sudo systemctl stop apache2
sudo apt purge apache2 -y
sudo apt autoremove -y
sudo apt install -y nginx
```

### VSCode CLI Installation

```bash
curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output vscode_cli.tar.gz
tar -xf vscode_cli.tar.gz
```

### Firewall-Einrichtung

Folgen Sie der Anleitung zur Einrichtung der Firewall: [Firewall einrichten](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server#allowing-connections-to-the-firewall)

### NVM, Node.js und PM2 Installation

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
npm install pm2 -g
```

### GitHub Actions Runner Installation

 Github Action benötigt ein Standarduser
Folgen Sie der Anleitung zur Installation des GitHub Actions Runners:

- [GitHub Actions](https://docs.github.com/en/actions)
  - [Understanding GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions)
  - [Variables](https://docs.github.com/de/actions/learn-github-actions/variables)
- [Managing Deploy Keys](https://docs.github.com/de/authentication/connecting-to-github-with-ssh/managing-deploy-keys#deploy-keys)

### Einrichtung von Let's Encrypt

Folgen Sie der Anleitung zur Einrichtung von Let's Encrypt: [Let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)

## Systemeinstellungen

### NextJS Konfigurationsvariablen

- `DATABASE_URL` = URL Ihrer Datenbank
- `NEXTAUTH_URL` = URL Ihrer Anwendung für NextAuth
- `NEXT_PUBLIC_API_URL` = URL Ihrer Anwendung für NextAuth
- `NEXTAUTH_SECRET` = Geheimer Schlüssel für NextAuth
- `GOOGLE_CLIENT_ID` = Für das Login mit Google.
- `GOOGLE_CLIENT_SECRET` = Für das Login mit Google.

### Verschlüsselungs- und Docker-Variablen

- `ENCRYPTION_KEY` = Schlüssel für das Verschlüsseln.
- `ENCRYPTION_IV` = Schlüssel für das Verschlüsseln.
- `DB_HOST` = Datenbank Host
- `DB_NAME` = Datenbank Name
- `DB_USER` = Datenbank Username
- `DB_PASSWORD` = Datenbank Passwort.

## Architektur

### Projektstruktur und Quellcode-Verzeichnis

- `/src`: Enthält den Quellcode der Anwendung
  - `/app`: Next.js App Router und Seitenkomponenten
  - `/components`: Wiederverwendbare React-Komponenten
  - `/lib`: Hilfsfunktionen und Dienstprogramme
  - `/data-access`: Datenbankzugriff und Datenmodelle

### Unterverzeichnisse und wichtige Dateien

#### App

- [layout.tsx](./src/app/layout.tsx) - Haupt-Layout-Komponente
- [page.tsx](./src/app/page.tsx) - Hauptseiten-Komponente
- [header.tsx](./src/app/header.tsx) - Header-Komponente
- [not-found.tsx](./src/app/not-found.tsx) - 404-Seiten-Komponente
- [error.tsx](./src/app/error.tsx) - Fehlerseiten-Komponente
- [globals.css](./src/app/globals.css) - Globale CSS-Stile

#### App/Admin

- [actions.ts](./src/app/admin/actions.ts) - Admin-Aktionen
- [create-user-form.tsx](./src/app/admin/create-user-form.tsx) - Formular zum Erstellen von Benutzern
- [page.tsx](./src/app/admin/page.tsx) - Admin-Hauptseite

#### App/API

- [options.ts](./src/app/api/auth/[...nextauth]/options.ts) - NextAuth Optionen
- [route.ts](./src/app/api/auth/[...nextauth]/route.ts) - NextAuth API-Route
- [route.ts](./src/app/api/download/[taskId]/route.ts) - Download API-Route
- [route.ts](./src/app/api/users/route.ts) - Benutzer API-Route

#### App/Browse

- [actions.ts](./src/app/browse/actions.ts) - Browse-Aktionen
- [page.tsx](./src/app/browse/page.tsx) - Browse-Hauptseite
- [task-card.tsx](./src/app/browse/task-card.tsx) - Aufgabenkarten-Komponente

#### App/Create Task

- [actions.ts](./src/app/create-task/actions.ts) - Aktionen zum Erstellen von Aufgaben
- [create-task-form.tsx](./src/app/create-task/create-task-form.tsx) - Formular zum Erstellen von Aufgaben
- [page.tsx](./src/app/create-task/page.tsx) - Seite zum Erstellen von Aufgaben

#### App/Tasks

- [TaskView.tsx](./src/app/tasks/[taskId]/TaskView.tsx) - Detailansicht einer Aufgabe
- [actions.ts](./src/app/tasks/[taskId]/actions.ts) - Aufgaben-bezogene Aktionen

#### App/Your Tasks

- [actions.ts](./src/app/your-tasks/actions.ts) - Aktionen für Benutzeraufgaben
- [page.tsx](./src/app/your-tasks/page.tsx) - Seite zur Anzeige von Benutzeraufgaben
- [user-task-card.tsx](./src/app/your-tasks/user-task-card.tsx) - Komponente für Benutzeraufgabenkarten
