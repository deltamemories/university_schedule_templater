import fs from 'fs/promises';
import handlebars from 'handlebars';
import puppeteer from 'puppeteer';


async function renderSchedule() {
	try {
		const templateHtml = await fs.readFile('./template.html', 'utf8');
		const data = JSON.parse(await fs.readFile('./data.json', 'utf8'));

		const template = handlebars.compile(templateHtml);
		const renderedHtml = template(data);

		const browser = await puppeteer.launch({headless: false});
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

		if (scheduleBounds) {
			const now = new Date();
			const dateString = `${(now.getHours() + 1).toString().padStart(2, '0')}_${(now.getMinutes() + 1).toString().padStart(2, '0')}_${(now.getSeconds() + 1).toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now.getFullYear()}`;
			const fileName = `./rendered/schedule_${dateString}.png`;


			await page.setViewport({
				width: Math.ceil(scheduleBounds.width),
				height: Math.ceil(scheduleBounds.height),
				deviceScaleFactor: 4,
			})

			await page.screenshot({
				path: fileName,
				fullPage: true,
				// clip: {
				// 	x: scheduleBounds.x,
				// 	y: scheduleBounds.y,
				// 	width: scheduleBounds.width,
				// 	height: scheduleBounds.height,
				// }
			});
			console.log('Page rendered successfully');
		} else {
			console.log("Can't find schedule element");
		}

		// await browser.close();

	} catch (error) {
		console.error("Render error:", error);
	}
}


await renderSchedule();
