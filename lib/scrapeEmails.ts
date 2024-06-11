import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeEmails = async (url: string): Promise<string[]> => {
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

        return Array.from(new Set(emails));  // Convertir Set a Array
    } catch (error) {
        console.error(`Error scraping emails from ${url}:`, error);
        return [];
    }
};
