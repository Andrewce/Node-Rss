const express = require('express')
const app = express()
let Parser = require('rss-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts')

const port = 3000


app.use(express.static(path.join(__dirname, 'public')))


app.use(expressLayouts)

app.set('views', path.join(__dirname, '/views'))
app.use('css', express.static(path.dirname + 'public/css'))
app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))


let parser = new Parser();



const readRss = (async () => {




    app.get('/', async (req, res) => {
        let rssLink = 'https://www.techmeme.com/feed.xml?x=1'
        feed = await parser.parseURL(rssLink)
            .catch(err => console.log(err))


        res.render('rss-feed', { feed, rssImage: "image", rssLink, rssTitle: rssLink });
    })

    app.get('/about', (req, res) => {
        res.render('about', { layout: './layouts/sidebar' })
    })



    app.post('/', async (req, res) => {
        const { searchRss } = req.body

        let rssLink = searchRss
        // console.log(rssLink)

        feed = await parser.parseURL(rssLink)
            .catch(err => console.log(err))

        res.redirect(`/rss`)

        app.get('/rss', (req, res) => {
            res.render('rss-feed', { feed: feed, rssTitle: searchRss })

            console.log(feed.author)

        })

    })





})
readRss();
const pi = 3.14



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})