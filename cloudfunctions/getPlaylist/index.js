// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const rp = require('request-promise')

const db = cloud.database()
const playlistCollection = db.collection('playlist')
const MAX_LIMIT = 100 //总共30条数据可以每次10条进行测试

//推荐音乐的接口 数据来至于网易云音乐
const URL = 'https://musicapi.xxytime.top/api/personalized'
// 云函数入口函数

exports.main = async (event, context) => {
  
  //拿到所有条数据
  const countResult = await playlistCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  let list = {
    data: []
  } 
  if (tasks.length > 0) {
    //reduce迭代数据
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }
  
  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })
  
  const newData = []
  //去重数据
  for (let i = 0, len1 = playlist.length; i < len1; i++) {
    let flag = true
    for (let j = 0, len2 = list.data.length; j < len2; j++) {
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      newData.push(playlist[i])
    }
  }

  //把数据存数据库
  for (let i = 0, len = newData.length; i < len; i++) {
    await playlistCollection.add({
      data: {
        ...newData[i],
        createTime: db.serverDate(),
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.error('插入失败')
    })
  }

}