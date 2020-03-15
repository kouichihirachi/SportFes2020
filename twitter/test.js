const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-logging'] });
    const page = await browser.newPage();

    await page.goto("https://twitter.com/login?hide_message=true&redirect_after_login=https%3A%2F%2Ftweetdeck.twitter.com%2F%3Fvia_twitter_login%3Dtrue", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.querySelectorAll("input[name='session[username_or_email]']").forEach((n) => n.value = 'kou3141592'));
    await page.evaluate(() => document.querySelectorAll("input[name='session[password]']").forEach((n) => n.value = 'Sparc3sparc'));
    await page.evaluate(() => {
        // ここで 2 秒待っているのは生活の知恵みたいなもんです、こうするとうまくいく
        setTimeout(() => {
            document.querySelectorAll("button.submit").forEach((n) => n.click())
        }, 2000);
    });
    await page.waitFor(3000)
    await page.screenshot({ path: 'example.png', fullPage: true });
    console.log('Starting navigation');
    page.on('response', async(res) => {
        const url = res.url();
        // home timeline だけ処理するようにします
        if (!url.match(/api\.twitter\.com/)) { return }
        if (!url.match(/home_timeline.json/)) { return }
        if ((await res.text()) === "") { return true }

        try {
            console.log('tweet received');
            const data = await res.json();
            console.log(data);
        } catch (e) {
            console.log(url);
            console.log(e);
            console.log(await res.text());
        }
    });
    await page.close();
    await browser.close();
})();