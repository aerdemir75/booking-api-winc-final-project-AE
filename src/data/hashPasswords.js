import bcrypt from 'bcrypt';
import { promises as fs } from 'fs';

// Functie om de gebruikersdata te laden
async function loadUsers(filename) {
    const data = await fs.readFile(filename, 'utf8');
    return JSON.parse(data);
}

// Functie om de gebruikersdata op te slaan
async function saveUsers(filename, users) {
    await fs.writeFile(filename, JSON.stringify(users, null, 4));
}

// Functie om wachtwoorden te hashen
async function hashPasswords(users) {
    if (!Array.isArray(users)) {
        throw new TypeError('Expected users to be an array');
    }
    const saltRounds = 10;
    for (let user of users) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
}

// Hoofdprogramma
async function main() {
    const usersFile = './data/users.json'; // Aanpassen aan de locatie van je bestand
    try {
        const users = await loadUsers(usersFile); // Gebruikers laden
        await hashPasswords(users); // Wachtwoorden hashen
        await saveUsers(usersFile, users); // Gewijzigde gebruikers terug opslaan in het bestand
        console.log('Wachtwoorden zijn gehasht en opgeslagen.');
    } catch (error) {
        console.error('Er is een fout opgetreden:', error);
    }
}

main();