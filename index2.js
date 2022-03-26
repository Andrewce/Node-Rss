let Parser = require('rss-parser');
const express = require('express')

app.use(express.static(path.join(__dirname, 'public')))



let parser = new Parser();

(async () => {
    let rssLink = 'http://feeds.bbci.co.uk/news/world/rss.xml';

    if (typeof rssLink === 'string') {
        let feed = await parser.parseURL(rssLink)
        console.log(feed.title);

        feed.items.forEach(item => {
            console.log(item.title + ':' + item.link)
        });
    } else {
        console.log("not a string")
    }

})();

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})