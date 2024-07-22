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
- [Entwicklungs- und Verwaltungsbefehle](#entwicklungs--und-verwaltungsbefehle)
  - [Überprüfen der ausgeführten Cronjobs](#überprüfen-der-ausgeführten-cronjobs)
  - [Wechseln in das Projektverzeichnis](#wechseln-in-das-projektverzeichnis)
  - [PM2 Prozessverwaltung](#pm2-prozessverwaltung)
  - [Datenbank-Verwaltung mit Docker](#datenbank-verwaltung-mit-docker)
  - [Umgebungsvariablen setzen (Platzhalter verwenden)](#umgebungsvariablen-setzen-platzhalter-verwenden)
  - [Überprüfen der gesetzten Umgebungsvariable](#überprüfen-der-gesetzten-umgebungsvariable)
  - [Entwicklungsbefehle](#entwicklungsbefehle)
  - [Datenbankoperationen](#datenbankoperationen)
  - [Docker Container Verwaltung](#docker-container-verwaltung)
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



- [Next.js](https://nextjs.org/): React-Framework für serverseitiges Rendering und Routing
- [TypeScript](https://www.typescriptlang.org/): Typisierter Übersatz von JavaScript
- [Tailwind CSS](https://tailwindcss.com/): Utility-First CSS-Framework
- [NextAuth.js](https://next-auth.js.org/): Authentifizierungslösung für Next.js
- [Drizzle ORM](https://orm.drizzle.team/): TypeScript ORM für SQL-Datenbanken
- [Docker](https://www.docker.com/): Containerverwaltung für PostgresSQL Datenbank


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





## Entwicklungs- und Verwaltungsbefehle

Hier ist eine Zusammenfassung der wichtigsten Befehle für die Entwicklung und Verwaltung des PDF-processor Projekts:

### Überprüfen der ausgeführten Cronjobs
```bash
sudo grep CRON /var/log/syslog
```
### Wechseln in das Projektverzeichnis
```bash
cd /pfad/zum/projekt/verzeichnis/
```
### PM2 Prozessverwaltung
```bash
pm2 start config.cjs
pm2 stop config.cjs
```
### Datenbank-Verwaltung mit Docker
```bash
docker logs -f postgres
docker container stop postgres
docker container start postgres
docker exec -it postgres /bin/bash
```
### Umgebungsvariablen setzen (Platzhalter verwenden)
```bash
export DATABASE_URL=postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}
```

### Überprüfen der gesetzten Umgebungsvariable
```bash
echo "Exported DATABASE_URL=${DATABASE_URL}"
```

### Entwicklungsbefehle
```bash
npm run dev          # Entwicklungsserver starten
npm run build        # Projekt bauen
npm run start        # Produktionsserver starten
npm run pod          # Server auf spezifischem Port starten
npm run lint         # Linting durchführen
```
### Datenbankoperationen
```bash
npm run db:push      # Schema-Änderungen in die Datenbank übertragen
npm run db:studio    # Drizzle Studio starten
```

### Docker Container Verwaltung
```Bash
npm run container:postgres  # PostgreSQL Container starten
npm run container:crontab   # Crontab UI Container starten
```

## Systemeinstellungen

### NextJS Konfigurationsvariablen

- `NEXTAUTH_URL` = URL Ihrer Anwendung für NextAuth
- `NEXT_PUBLIC_API_URL` = URL Ihrer Anwendung für NextAuth
- `NEXTAUTH_SECRET` = Geheimer Schlüssel für NextAuth
-
- `GOOGLE_CLIENT_ID` = Für das Login mit Google.
- `ENABLE_GOOGLE_AUTH` = Google Login aktivieren.
- `GOOGLE_CLIENT_SECRET` = Für das Login mit Google.

### Verschlüsselungs- und Docker-Variablen

- - `ENCRYPTION_IV` = Initialisierungsvektor (IV) für die Verschlüsselung (16 Bytes, dargestellt als 32 Zeichen langer Hex-String)
- `ENCRYPTION_KEY` = Verschlüsselungsschlüssel (32 Bytes, dargestellt als 64 Zeichen langer Hex-String)

-node -e "console.log('ENCRYPTION_IV=' + require('crypto').randomBytes(16).toString('hex')); console.log('ENCRYPTION_KEY=' + require('crypto').randomBytes(32).toString('hex'));"

- `DATABASE_URL` = URL Ihrer Datenbank.
-
- `POSTGRES_USER` = Datenbank Username.
- `POSTGRES_PW`   = Datenbank Passwort.
- `POSTGRES_DB`   = Die Datenbank.
- `DB_HOST`       = Datenbank Host.
-
- `PGADMIN_MAIL`  = DatanebankUserMail.
- `PGADMIN_PW`    = DatanebankUserPW.

## Architektur

### Projektstruktur und Quellcode-Verzeichnis

- `/src`: Enthält den Quellcode der Anwendung
    - `/app`: Next.js App Router und Seitenkomponenten
    - `/components`: Wiederverwendbare React-Komponenten
    - `/lib`: Hilfsfunktionen und Dienstprogramme
    - `/db`: Datenbank schema und zugriffkonfiguration
    - `/data-access`: Datenbankzugriff und Datenmodelle

### Unterverzeichnisse und wichtige Dateien

#### App

- [layout.tsx](./src/app/layout.tsx) - Haupt-Layout-Komponente
  Definiert das Grundgerüst der PDF-Website, einschließlich Header und Footer

- [page.tsx](./src/app/page.tsx) - Hauptseiten-Komponente
  Rendert die Startseite der PDF-Website mit einer Übersicht der Funktionen

- [header.tsx](./src/app/header.tsx) - Header-Komponente
  Enthält das Logo und die Navigation für die PDF-Verarbeitungsplattform

- [not-found.tsx](./src/app/not-found.tsx) - 404-Seiten-Komponente
  Zeigt eine benutzerdefinierte Fehlermeldung für nicht gefundene PDF-Ressourcen

- [error.tsx](./src/app/error.tsx) - Fehlerseiten-Komponente
  Handhabt allgemeine Fehler während der PDF-Verarbeitung und -Anzeige

- [globals.css](./src/app/globals.css) - Globale CSS-Stile
  Definiert das einheitliche Erscheinungsbild der PDF-Website


#### App/Admin

- [actions.ts](./src/app/admin/actions.ts) - Admin-Aktionen
  Enthält serverseitige Funktionen für die Verwaltung von Benutzern und PDF-Aufgaben

- [create-user-form.tsx](./src/app/admin/create-user-form.tsx) - Formular zum Erstellen von Benutzern
  Komponente für die Registrierung neuer Benutzer im PDF-Verarbeitungssystem

- [page.tsx](./src/app/admin/page.tsx) - Admin-Hauptseite
  Zeigt das Admin-Dashboard mit Übersicht aller PDF-Aufgaben und Benutzer

#### App/API

- [options.ts](./src/app/api/auth/[...nextauth]/options.ts) - NextAuth Optionen
  Konfiguriert die Authentifizierungsoptionen für den Zugriff auf PDF-Ressourcen

- [route.ts](./src/app/api/auth/[...nextauth]/route.ts) - NextAuth API-Route
  Handhabt Authentifizierungsanfragen für die sichere PDF-Verarbeitung

- [route.ts](./src/app/api/download/[taskId]/route.ts) - Download API-Route
  Verwaltet den Download von verarbeiteten PDF-Dateien

- [route.ts](./src/app/api/users/route.ts) - Benutzer API-Route
  Handhabt benutzerbezogene Anfragen im Kontext der PDF-Verarbeitung

#### App/Browse

- [actions.ts](./src/app/browse/actions.ts) - Browse-Aktionen
  Enthält Funktionen zum Durchsuchen und Filtern von PDF-Aufgaben

- [page.tsx](./src/app/browse/page.tsx) - Browse-Hauptseite
  Zeigt eine durchsuchbare Liste aller PDF-Verarbeitungsaufgaben

- [task-card.tsx](./src/app/browse/task-card.tsx) - Aufgabenkarten-Komponente
  Rendert einzelne PDF-Aufgaben in Kartenform mit relevanten Informationen

#### App/Create Task

- [actions.ts](./src/app/create-task/actions.ts) - Aktionen zum Erstellen von Aufgaben
  Serverseitige Funktionen für die Erstellung neuer PDF-Verarbeitungsaufgaben

- [create-task-form.tsx](./src/app/create-task/create-task-form.tsx) - Formular zum Erstellen von Aufgaben
  Komponente für die Eingabe neuer PDF-Verarbeitungsaufträge

- [page.tsx](./src/app/create-task/page.tsx) - Seite zum Erstellen von Aufgaben
  Hauptseite für die Erstellung neuer PDF-Verarbeitungsaufgaben

#### App/Tasks

- [TaskView.tsx](./src/app/tasks/[taskId]/TaskView.tsx) - Detailansicht einer Aufgabe
  Zeigt detaillierte Informationen zu einer spezifischen PDF-Verarbeitungsaufgabe

- [actions.ts](./src/app/tasks/[taskId]/actions.ts) - Aufgaben-bezogene Aktionen
  Enthält Funktionen für Operationen auf einzelnen PDF-Aufgaben

#### App/Your Tasks

- [actions.ts](./src/app/your-tasks/actions.ts) - Aktionen für Benutzeraufgaben
  Serverseitige Funktionen für benutzerspezifische PDF-Verarbeitungsaufgaben

- [page.tsx](./src/app/your-tasks/page.tsx) - Seite zur Anzeige von Benutzeraufgaben
  Listet die PDF-Verarbeitungsaufgaben des aktuellen Benutzers auf

- [user-task-card.tsx](./src/app/your-tasks/user-task-card.tsx) - Komponente für Benutzeraufgabenkarten
  Rendert PDF-Aufgaben des Benutzers in Kartenform mit Statusanzeige


| Befehl | Beschreibung | Best Practices / Nützliche Optionen |
|--------|--------------|-------------------------------------|
| `pm2 start` | Startet eine Anwendung | `--name`: Benennt den Prozess<br>`--watch`: Überwacht Änderungen<br>`-i max`: Clustermodus mit maximaler Anzahl an CPUs |
| `pm2 stop` | Stoppt eine Anwendung | `all`: Stoppt alle Anwendungen |
| `pm2 restart` | Startet eine Anwendung neu | `--update-env`: Aktualisiert die Umgebungsvariablen |
| `pm2 delete` | Entfernt eine Anwendung aus PM2 | `all`: Löscht alle Anwendungen |
| `pm2 list` | Zeigt alle laufenden Prozesse | `--sort name:desc`: Sortiert nach Namen absteigend |
| `pm2 monit` | Überwacht CPU/Speichernutzung | - |
| `pm2 logs` | Zeigt Logs an | `--lines 200`: Zeigt die letzten 200 Zeilen |
| `pm2 flush` | Leert alle Logs | - |
| `pm2 startup` | Generiert Startup-Script | - |
| `pm2 save` | Speichert die aktuelle Prozessliste | - |
| `pm2 ecosystem` | Generiert eine Ecosystem-Datei | - |
| `pm2 reload` | Neustart ohne Ausfallzeit | `all`: Lädt alle Anwendungen neu |

| Befehl | Beschreibung | Best Practices / Nützliche Optionen |
|--------|--------------|-------------------------------------|
| `docker ps` | Listet laufende Container auf | `-a`: Zeigt alle Container (einschließlich gestoppter)<br>`--format`: Benutzerdefiniertes Ausgabeformat<br>`-q`: Zeigt nur Container-IDs |
| `docker exec` | Führt einen Befehl in einem laufenden Container aus | `-it`: Interaktiver Modus mit Pseudo-TTY<br>`--user`: Gibt den Benutzer an, als der ausgeführt werden soll<br>`--workdir`: Arbeitsverzeichnis im Container |
| `docker logs` | Ruft die Logs eines Containers ab | `--follow` oder `-f`: Folgt der Log-Ausgabe<br>`--tail`: Anzahl der Zeilen, die vom Ende angezeigt werden sollen<br>`--since`: Zeigt Logs seit einem bestimmten Zeitstempel |
| `docker build` | Erstellt ein Image aus einem Dockerfile | `-t`: Taggt das Image<br>`--no-cache`: Verwendet keinen Cache beim Bauen<br>`--pull`: Zieht immer neuere Versionen des Basis-Images |
| `docker run` | Startet einen Container aus einem Image | `-d`: Läuft im Hintergrund-Modus<br>`-p`: Veröffentlicht Ports<br>`-v`: Bindet ein Volume ein<br>`--name`: Weist dem Container einen Namen zu |
| `docker stop` | Stoppt einen oder mehrere laufende Container | `-t`: Sekunden, die auf das Stoppen gewartet wird, bevor der Container beendet wird |
| `docker rm` | Entfernt einen oder mehrere Container | `-f`: Erzwingt das Entfernen eines laufenden Containers<br>`-v`: Entfernt zugehörige Volumes |
| `docker rmi` | Entfernt ein oder mehrere Images | `-f`: Erzwingt das Entfernen des Images |
| `docker volume` | Verwaltet Volumes | `create`: Erstellt ein Volume<br>`ls`: Listet Volumes auf<br>`rm`: Entfernt Volumes |
| `docker network` | Verwaltet Netzwerke | `create`: Erstellt ein Netzwerk<br>`ls`: Listet Netzwerke auf<br>`rm`: Entfernt ein Netzwerk |
| `docker-compose up` | Erstellt und startet Container | `-d`: Läuft im Hintergrund-Modus<br>`--build`: Baut Images vor dem Starten der Container |
| `docker-compose down` | Stoppt und entfernt Container, Netzwerke | `-v`: Entfernt benannte Volumes<br>`--rmi all`: Entfernt alle Images |
| `docker system prune` | Entfernt ungenutzte Daten | `-a`: Entfernt alle ungenutzten Images, nicht nur hängende<br>`--volumes`: Bereinigt Volumes |
| `docker inspect` | Gibt detaillierte Informationen zu Docker-Objekten zurück | `--format`: Formatiert die Ausgabe mit einem Go-Template |
| `docker stats` | Zeigt einen Live-Stream der Ressourcennutzungsstatistiken von Container(n) | `--no-stream`: Deaktiviert Streaming-Statistiken und zieht nur das erste Ergebnis |


| Befehl | Beschreibung | Best Practices / Nützliche Optionen |
|--------|--------------|-------------------------------------|
| **Next.js Befehle** | | |
| `npx create-next-app` | Erstellt ein neues Next.js Projekt | `--typescript`: Verwendet TypeScript<br>`--use-npm`: Nutzt NPM statt Yarn |
| `npm run dev` | Startet den Entwicklungsserver | - |
| `npm run build` | Erstellt eine produktionsreife Version | - |
| `npm start` | Startet den Produktionsserver | - |
| `npm run lint` | Führt ESLint aus | - |
| **NPM Befehle** | | |
| `npm init` | Initialisiert ein neues Projekt | `-y`: Akzeptiert Standardeinstellungen |
| `npm install` | Installiert Abhängigkeiten | `--save-dev` oder `-D`: Als Entwicklungsabhängigkeit<br>`--global` oder `-g`: Global installieren |
| `npm uninstall` | Entfernt Pakete | `--save` oder `-S`: Aktualisiert package.json |
| `npm update` | Aktualisiert Pakete | `--global`: Aktualisiert globale Pakete |
| `npm run` | Führt Skripte aus | - |
| `npm audit` | Führt eine Sicherheitsüberprüfung durch | `fix`: Versucht, Probleme automatisch zu beheben |
| `npm cache clean` | Leert den NPM-Cache | `--force`: Erzwingt die Leerung |
| `npm outdated` | Zeigt veraltete Pakete an | - |


