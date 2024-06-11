import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeEmails = async (url: string): Promise<string | null> => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/g;
        const emails: string[] = [];

        $('a[href^="mailto:"]').each((i, elem) => {
            const email = $(elem).attr('href')?.replace('mailto:', '');
            if (email) {
                emails.push(email);
            }
        });

        const bodyEmails = $('body').text().match(emailRegex);
        if (bodyEmails) {
            emails.push(...bodyEmails);
        }

        if (emails.length === 0) {
            return null;  // No se encontraron correos electrónicos
        }

        // Encuentra el correo electrónico más repetido
        const emailCounts: { [key: string]: number } = emails.reduce((counts, email) => {
            counts[email] = (counts[email] || 0) + 1;
            return counts;
        }, {} as { [key: string]: number });

        const mostFrequentEmail = Object.keys(emailCounts).reduce((a, b) => emailCounts[a] > emailCounts[b] ? a : b);

        return mostFrequentEmail || emails[0];  // Devuelve el correo más repetido o el primero
    } catch (error) {
        console.error(`Error scraping emails from ${url}:`, error);
        return null;
    }
};
