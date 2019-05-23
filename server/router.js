const express = require('express')
let Article = require('./modules/article')
let router = express.Router()


router.get('/', (req, res) => {
    res.send({
        "API": "文章管理系统",
        "/article": "列表数据GET",
        "/article/new": "添加数据POST",
        "/article/edit": "根据ID渲染编辑页面GET",
        "/article/edit": "提交编辑请求POST",
        "/article/delete": "根据ID删除数据GET"
    })
})

router.get("/article", (req, res) => {
    Article.find(parseInt(req.query.id), (err, data) => {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.send(data)
    })
})

router.get("/article/page", (req, res) => {
    Article.findList(req.query, (err, data, count) => {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.send({ data, count })
    })
})


router.post("/article/new", (req, res) => {
    Article.save(req.body, (err, code) => {
        if (err) throw err
        res.end()
    })
})

router.get("/article/edit", (req, res) => {
    Article.findById(parseInt(req.query.id), (err, data) => {
        if (err) throw err
        res.send(data[0])
    })
})

router.post("/article/edit", (req, res) => {
    Article.updateById(req.body, (err) => {
        if (err) { throw err }
        res.end()
    })
})

router.get("/article/delete", (req, res) => {
    Article.deleteById(req.query.id, (err) => {
        if (err) { throw err }
        res.end()
    })
})



module.exports = router
