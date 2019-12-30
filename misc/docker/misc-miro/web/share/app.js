const express = require('express')
const ejs = require('ejs')
const app = express()

app.set('views', __dirname + '/views')
app.use(express.static('static'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.use('/', require('./routes/index.js'))

app.use((req, res, next) => {
    res.status(404).render('404')
})

app.listen(8050)
