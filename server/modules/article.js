const sd = require('silly-datetime')
const connection = require('./connect')

exports.find = (id, callback) => {
    if (id) {
        let last = id * 5
        let first = last - 5;
        connection.query(`select * from articles limit ${first},${last}`, function (err, data) {
            if (err) { return callback(err) }
            return callback(null, data)
        })
    } else {
        connection.query('select * from `articles`', function (err, data) {
            if (err) { return callback(err) }
            return callback(null, data)
        })
    }
}

exports.save = (data, callback) => {
    let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    let article = data.article.replace(/"/g, "'")
    connection.query(`insert into articles values(null,"${data.title}","${article}","${time}","${data.author}","http://attach.bbs.miui.com/forum/201408/27/103420lzrq3jcimigfjmuw.jpg",0);`, function (err) {
        if (err) { return callback(err) }
        return callback(null, 0)
    })
}

exports.findById = (id, callback) => {
    connection.query('select * from `articles` where id=' + id + ';', function (err, data) {
        if (err) { return callback(err) }
        var click = parseInt(data[0].click) + 1

        connection.query(`update articles set click=${click} where id =${id};`, function (err) {
            if (err) throw err
            return callback(null, data);
        })
    })
}


exports.updateById = function (data, callback) {
    connection.query("update `articles` set title='" + data.title + "',author='" + data.author + "' where id=" + data.id + ";", function (err) {
        if (err) { callback(err) }
        return callback(null)
    })
}

exports.deleteById = function (ids, callback) {
    if (Array.isArray(ids)) {
        var sql = `delete from articles where id in (`; //用来拼接？
        var param = [];
        for (let i = 0; i < ids.length; i++) { //循环传过来的id数组，插入到param变量数组中
            param.push(ids[i])
        }
        for (let i = 0; i < ids.length - 1; i++) { //循环拼接sql
            sql = sql + ids[i] + `,`;
        }
        sql = sql + ids[ids.length - 1] + `)`;
    } else {
        sql = `delete from articles where id =${ids}`
    }
    connection.query(sql, function (err) {
        if (err) { callback(err) }
        return callback(null)

    })
}

exports.findList = (data, callback) => {
    connection.query(`select * from articles limit ${data.offset},${data.size}`, function (err, data) {
        if (err) { return callback(err) }
        connection.query('select count(*) as count from articles', (err, count) => {
            console.log(count)
            return callback(null, data, count[0].count)
        })

    })
}
