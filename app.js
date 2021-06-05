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
        res.render('index');
    })


    app.get('/feed', (req, res) => {
        res.render('feed', { openTabs: openTabs, layout: './layouts/sidebar' })
    })

    app.post('/', async (req, res) => {
        const { searchRss } = req.body
        let rssLink = searchRss
        feed = await parser.parseURL(rssLink)
            .catch(err => console.log(err))
        addTab(feed.title, rssLink, feed.title)
        console.log(openTabs)
        res.redirect(`/feed`)


    })

    app.get('/about', (req, res) => {
        res.render('about', { layout: './layouts/full-width' })
    })

    app.get('/rss-items/:id', async (req, res) => {
        const searchedId = req.params.id
        console.log("the searched ID", searchedId)
        const rssItem = (searchedId) => {
            for (let tab in openTabs) {
                if (tab.id == searchedId) {
                    rssItem = tab
                }
                else {
                    alert("no ID")
                }
            }
        }

        res.render('rss-item', { rssItem: rssItem, openTabs: "asdasd", layout: './layouts/full-width' })
    })

})





})
readRss();

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})