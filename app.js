const express = require('express')
const app = express()
let Parser = require('rss-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts')
var parseurl = require('parseurl')


const port = 3000


app.use(express.static(path.join(__dirname, 'public')))


app.use(expressLayouts)

app.set('views', path.join(__dirname, '/views'))
app.use('css', express.static(path.dirname + 'public/css'))
app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

let parser = new Parser();

let openTabs = [];

const readRss = (() => {
    let openTabs = [];
    const addTab = (title, url, id) => {
        let newTab = {
            title: title,
            url: url,
            id: id
        }
        openTabs.push(newTab)
    }

  
    app.get('/feed/*', async (req, res) => {
        let rssFeed = req.params[0]
        feed = await parser.parseURL(rssFeed)
            .catch(err => console.log("the error is", err))
            console.log(feed);
            res.render('feed', { feed, openTabs, layout: './layouts/feedNav' })

    })


    app.get('/preview', async (req, res) => {
        const { searchRss } = req.query
        feed = await parser.parseURL(searchRss)
            .catch(err => console.log("the error is", err))
            console.log(feed)
        addTab(feed.title, searchRss, feed.title)
        res.render('preview', { feed, openTabs, searchRss, layout: './layouts/feedNav' })
    })


    app.get('/about', (req, res) => {
        res.render('about', { openTabs, layout: './layouts/feedNav' })
    })

    app.get('/about', (req, res) => {
        res.render('about', { openTabs })
    })


    app.get('/', async (req, res) => {
        res.render('index', { openTabs, layout: './layouts/feedNav' });
    })


})

readRss();

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})