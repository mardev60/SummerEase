# Utilisation de l'image Node.js officielle
FROM node:18-alpine

# Définition du répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port de l'API
EXPOSE 3000

# Lancer l'application
CMD ["npm", "run", "start"]