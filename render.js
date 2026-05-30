import fs from 'fs/promises';
import handlebars from 'handlebars';
import puppeteer from 'puppeteer';


const availableThemes = Object.freeze({
	light: 'light',
	dark: 'dark',
	oled: 'oled',
})


async function renderSchedule() {
	let browser
	try {
		const templateHtml = await fs.readFile('./template.html', 'utf8');
		const data = JSON.parse(await fs.readFile('./data.json', 'utf8'));
		const scaleFactor = data['scale_factor'];

		if (!Object.values(availableThemes).includes(data['theme'])) {
			console.error("Missing theme parameter in configuration");
			return
		}

		const theme = data['theme'];

		const template = handlebars.compile(templateHtml);
		const renderedHtml = template(data);

		browser = await puppeteer.launch();
		const page = await browser.newPage();

		await page.setContent(renderedHtml, {waitUntil: 'networkidle0'});


		// getting page size
		const scheduleBounds = await page.evaluate(() => {
			const schedule = document.getElementById('schedule');
			if (!schedule) {
				return null;
			}
			const {x, y, width, height} = schedule.getBoundingClientRect();
			return {x, y, width, height};
		})

		if (!scheduleBounds) {
			console.error("Can't find schedule element");
		} else {
			const now = new Date();
			const dateString = `${(now.getHours() + 1).toString().padStart(2, '0')}_${(now.getMinutes() + 1).toString().padStart(2, '0')}_${(now.getSeconds() + 1).toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now.getFullYear()}`;
			const fileName = `./rendered/schedule_${dateString}_${theme}.png`;

			await page.setViewport({
				width: Math.ceil(scheduleBounds.width),
				height: Math.ceil(scheduleBounds.height),
				deviceScaleFactor: scaleFactor,
			})

			try {
				await fs.mkdir('./rendered')
			} catch (err) {
				if (err.code !== 'EEXIST') {
					return Promise.reject(err);
				}
			}

			await page.screenshot({
				path: fileName,
				fullPage: true,
			});
			console.log('Page rendered successfully');
		}

	} catch (error) {
		console.error("Render error:", error);
	} finally {
		if (browser) {
			await browser.close()
		}
	}
}


await renderSchedule();
