const express = require('express')
const app = express()
let Parser = require('rss-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts')
const { v4: uuid } = require('uuid'); //For generating ID's


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

    let openTabs = [];

    const addTab = (title, url, id) => {
        let newTab = {
            title: title,
            url: url,
            id: id

        }
        openTabs.push(newTab)
    }


    app.get('/', async (req, res) => {
        res.render('about');
    })

    app.get('/about', (req, res) => {
        res.render('about', { layout: './layouts/sidebar' })
    })

    app.post('/', async (req, res) => {
        const { searchRss } = req.body
        let rssLink = searchRss
        feed = await parser.parseURL(rssLink)
            .catch(err => console.log(err))
        addTab(feed.title, rssLink, feed.title)
        console.log(openTabs)
        res.redirect(`/rss`)

        app.get('/rss', (req, res) => {
            res.render('rss-feed', { feed: feed, rssTitle: feed.title, rssLink, openTabs: openTabs })
        })
    })



})
readRss();

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})