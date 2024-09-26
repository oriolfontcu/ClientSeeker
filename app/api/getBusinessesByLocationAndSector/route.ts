import { scrapeEmails } from '@/lib/scrapeEmails';
import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

// Handler para el método GET
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const negocio = searchParams.get('negocio') || null;
  const localizacion = searchParams.get('localizacion') || null;

  if (localizacion === null || negocio === null) {
    return NextResponse.json({ error: 'Missing location, sector parameter.' }, { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navegar a la página de Paginas Amarillas
    await page.goto('https://www.paginasamarillas.es/', { waitUntil: 'networkidle2' });

    await page.waitForSelector('input[name="whatInput"]', { visible: true });
    await page.waitForSelector('input[name="whereInput"]', { visible: true });
    await page.waitForSelector('button[name="submitBtn"]', { visible: true });

    await page.type('input[name="whatInput"]', negocio, { delay: 100 });
    // Escribir en el campo "Dónde" (localización)
    await page.type('input[name="whereInput"]', localizacion, { delay: 100 });
    // Hacer clic en el botón de búsqueda
    await page.click('button[name="submitBtn"]');

    // Lógica de scraping...

    let allBusinessInfo: any[] = [];
    let hasNextPage = true;

    while (hasNextPage) {
      await page.waitForSelector('.first-content-listado', { timeout: 10000 });

      const businessLinks = await page.evaluate(() => {
        const links: { url: string; name: string }[] = [];
        document.querySelectorAll('.box[itemprop="item"] a[data-omniclick="name"]').forEach((link) => {
          links.push({
            url: (link as HTMLAnchorElement).href,
            name: (link.querySelector('span[itemprop="name"]') as HTMLElement)?.textContent?.trim() || ''
          });
        });
        return links;
      });

      // Procesar cada negocio y extraer información...
      for (const { url, name } of businessLinks) {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extraer la información del negocio desde su página de detalles en Paginas Amarillas
        const businessDetail = await page.evaluate(async () => {
          const street = document.querySelector('span[itemprop="streetAddress"]')?.textContent?.trim() || '';
          const postalCode = document.querySelector('span[itemprop="postalCode"]')?.textContent?.trim() || '';
          const locality = document.querySelector('span[itemprop="addressLocality"]')?.textContent?.trim() || '';
          const phone = document.querySelector('span[itemprop="telephone"]')?.textContent?.trim() || 'No phone available';
          let website = (document.querySelector('a[itemprop="url"]') as HTMLAnchorElement)?.href || 'No tiene sitio web';
          website = website.split("?")[0];
          const description = document.querySelector('div[itemprop="description"]')?.textContent?.trim() || '';

          return {
            address: `${street}, ${postalCode}, ${locality}`,
            phone,
            website,
            description,
          };
        });

        let email = null;
        if (businessDetail.website !== 'No tiene sitio web') {
          try{
            email = await scrapeEmails(businessDetail.website);
          } catch (error) {
            console.error(`Error scraping email from ${businessDetail.website}:`, error);
          }
        }

        // Agregar la información del negocio a la lista global
        allBusinessInfo.push({
          name,
          ...businessDetail,
          email,
        });
      }

      // Verificar si hay una página siguiente
      const nextPageLink = await page.$('ul.pagination li a i.icon-flecha-derecha');
      if (nextPageLink) {
        const nextPageUrl = await page.evaluate((el) => (el.parentElement as HTMLAnchorElement).href, nextPageLink);
        await page.goto(nextPageUrl, { waitUntil: 'networkidle2' });
      } else {
        hasNextPage = false;
      }
    }

    await browser.close();

    // Devolver datos en JSON
    return NextResponse.json(allBusinessInfo);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ocurrió un error al realizar el scraping.' }, { status: 500 });
  }
}
