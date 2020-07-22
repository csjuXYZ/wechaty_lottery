const fs = require('fs');
const path = require('path');
const fetch = require('fetch');
const {
    Wechaty
} = require("wechaty") // Wechaty核心包
const {
    PuppetPadplus
} = require("wechaty-puppet-padplus") // padplus协议包
const config = require("./config") // 配置文件

const onScan = require("./onScan") // 机器人需要扫描二维码时监听回调
const onRoomJoin = require("./onRoomJoin") // 加入房间监听回调
const onMessage = require("./onMessage") // 消息监听回调
const onFriendShip = require("./onFriendShip") // 好友添加监听回调


// 初始化
const bot = new Wechaty({
    puppet: new PuppetPadplus({
        token: config.token
    }),
    name: config.name
})

// bot
//   .on("scan", onScan) // 机器人需要扫描二维码时监听
//   .on("room-join", onRoomJoin) // 加入房间监听
//   .on("message", onMessage(bot)) // 消息监听
//   .on("friendship", onFriendShip) // 好友添加监听
//   .start()

bot
    .on("scan", onScan)
    // .on('scan', code => console.log('二维码:' + code))
    .on('login', user => console.log('登录成功：' + user))
    // .on('message', message => console.log('收到消息：' + message))
    .on('message', onMessage(bot))
    .on('friendship', friendship => console.log('收到好友请求：' + friendship))
    .on('room-invite', invitation => console.log('收到入群邀请：' + invitation))
    .start()