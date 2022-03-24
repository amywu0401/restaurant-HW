// 設定express, port 等基本資訊
const express = require('express')
const app = express()
const port = 3000

//設定路由, 首頁 index
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

//設定監聽器
app.listen(port, () => {
  console.log('success  yayyayayayya')
})

//建立handlebars, 路由
const exphbs = require('express-handlebars')
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//建立handlebars 與express
app.use(express.static('public'))

//讀取外部json檔案
const restaurantList = require('./restaurant.json')

//讀取show的資料
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

//定義搜尋列

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword })
})

