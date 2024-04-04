







# Der Port, den Ihr Container zur Laufzeit verwenden wird

# Starten Sie die Next.js-Anwendung
CMD ["npm", "start"]

# Wählen Sie das offizielle Node.js-Image als Basis
FROM node:21.7.1
# FROM php:8.2-apache

# Install required system packages and dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
# WORKDIR /var/www/html
# Setzen Sie das Arbeitsverzeichnis im Container
# WORKDIR ./

# Copy the current directory contents into the container at /var/www/html
# COPY . /var/www/html
# Kopieren Sie die package.json und package-lock.json (falls vorhanden)
COPY package*.json ./
# Install any dependencies your PHP application may need
# For example, if you're using Composer for dependency management:
# RUN apt-get update && apt-get install -y \
#     git \
#     && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# If you have specific PHP extensions required, you can install them here.
# For example, if you need MySQL support:
# RUN docker-php-ext-install pdo_mysql

# # Adding Postgres support:
# RUN docker-php-ext-install pdo_pgsql
# Installieren Sie die Projekt-Abhängigkeiten
RUN npm install
# Copy custom Apache configuration
# COPY apache.conf /etc/apache2/sites-available/000-default.conf
# Enable Apache modules
RUN a2enmod rewrite
# Kopieren Sie den Projekt-Code
COPY . .

# Bauen Sie Ihre Next.js-Anwendung
RUN npm run build


# Suprisingly, I deployed to Render without this!
# Set Apache to bind to IP address 0.0.0.0
# RUN echo "Listen 0.0.0.0:80" >> /etc/apache2/apache2.conf

# Optionally, you can set environment variables here if needed
# ENV VARIABLE_NAME=value

# Expose port 80 to allow incoming connections to the container
# EXPOSE 80
EXPOSE 3000

# By default, Apache is started automatically. You can change or customize the startup command if necessary.
# CMD ["apache2-foreground"]