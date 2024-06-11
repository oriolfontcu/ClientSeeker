import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeSocialMedia = async (url: string): Promise<{ [key: string]: string | null }> => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        const socialMediaLinks: { [key: string]: string | null } = {
            instagram: null,
            twitter: null,
            facebook: null,
            tiktok: null
        };

        $('a').each((i, elem) => {
            const href = $(elem).attr('href');
            if (href) {
                if (href.includes('instagram.com')) {
                    socialMediaLinks.instagram = href;
                } else if (href.includes('twitter.com')) {
                    socialMediaLinks.twitter = href;
                } else if (href.includes('facebook.com')) {
                    socialMediaLinks.facebook = href;
                } else if (href.includes('tiktok.com')) {
                    socialMediaLinks.tiktok = href;
                }
            }
        });

        return socialMediaLinks;
    } catch (error) {
        console.error(`Error scraping social media links from ${url}:`, error);
        return {
            instagram: null,
            twitter: null,
            facebook: null,
            tiktok: null
        };
    }
};
