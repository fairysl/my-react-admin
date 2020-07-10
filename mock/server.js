// 1.引入express文件
const express = require('express')

//2 . 调用express得到一个app对象
const app = express()

// 引入mockjs
const Mock = require('mockjs')
// 从Mock身上拿到Random
const Random = Mock.Random
// 返回中文标题
Random.ctitle()

app.get('/admin/edu/subject/:page/:limit',(req,res)=>{
    // req请求
    let {page,limit} = req.params

    // 定义data数据
    // const data={
    //     total:10,
    //     items:[{},{}]
    // }

    // 利用mock，创建虚拟数据
    const data = Random({
    // total表示分类列表总共有多少条数据
    // 需求: 返回的total的值是一个在指定返回内的随机整数
    // 注意: limit从浏览器中获取的,是一个字符串
    total:Random.integer(+limit + 2, limit * 2),
    [`items|${limit}`]:[
        {
            '_id|+1': 1,
            title:'@ctitle(2,5)',
            parentId:0
        }
    ]
    })

    res.json({
        code: 20000,
        success: true,
        data,
        message: ''
      })
})



app.listen(8000,err=>{
    if(err){
       return console.log('服务启动失败')
    }
    console.log('服务启动成功，端口：8000')
})

