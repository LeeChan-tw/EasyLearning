// require packages used in th project
const express = require('express')
const app = express()
const port = 3000
//require express-handlebars here
const exphbs = require('express-handlebars')
//require movie data
const movieList = require('./movie.json')

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
//routes setting
app.get('/', (req, res) => {
    res.render('index', { movies: movieList.results })
})
app.get('/movies/:movie_id', (req, res) => {
    const movie = movieList.results.find((movie) => movie.id.toString() === req.params.movie_id)
    res.render('show', { movie: movie })
})
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const movies = movieList.results.filter((movie) => {
        return movie.title.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { movies: movies, keyword: keyword })
})
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})
