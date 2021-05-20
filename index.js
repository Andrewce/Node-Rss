let Parser = require('rss-parser');



let parser = new Parser();

(async () => {
    let rssLink = 'http://feeds.bbci.co.uk/news/world/rss.xml'
    let feed = await parser.parseURL(rssLink)
        .then(feed => console.log(feed.title))
        .then(feed => feed.items.forEach(item => console.log(item.title)))

})();