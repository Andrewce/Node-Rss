let Parser = require('rss-parser');



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