## cronjobs ausgeführt wurden.

sudo grep CRON /var/log/syslog

cd /home/runneruser/actions-runner/\_work/pdf-website/pdf-website/
pm2 start cosystem.config.cjs
pm2 stop cosystem.config.cjs

#Datenbank
docker logs -f postgres
docker container stop postgres
docker container start postgres
docker exec -it postgres /bin/bash

# Export the DATABASE_URL

export DATABASE_URL=postgres://postgres:Iphone5S@localhost:5432/postgres
export DATABASE_URL=postgres://${{POSTGRES_USER}}:${{POSTGRES_PASSWORD}}@localhost:5432/${{POSTGRES_DB}}

# Echo the exported DATABASE_URL (for verification)

echo "Exported DATABASE_URL=${DATABASE_URL}"

# Umgebungsvariablen ausgeben.

# PDF Website Development Commands

## Development

````bash
npm run dev
Build

Certainly! Here's a markdown summary of the commands you can use for the pdf-website project:

# PDF Website Development Commands

## Development
```bash
npm run dev


Build
npm run build

Start Production Server
npm run start


Start on Specific Port (3000)
npm run pod

Linting
npm run lint

Database Operations
# Push schema changes to database
npm run db:push

# Start Drizzle Studio
npm run db:studio

Docker Container Management
# Start PostgreSQL container
npm run container:postgres

# Start Crontab UI container
npm run container:crontab
````
