/*
 * @Author: isboyjc
 * @Date: 2020-02-18 16:31:25
 * @LastEditors: isboyjc
 * @LastEditTime: 2020-03-01 02:16:17
 * @Description: 消息监听回调
 */
const { Message } = require("wechaty")
    // 配置文件
const config = require("./config")
    // 机器人名字
const name = config.name

// 消息监听回调
module.exports = bot => {
        return async function onMessage(msg) {
            // 判断消息来自自己，直接return
            if (msg.self()) return
                // 输出消息简介
                //   console.log("=============================")
                //   console.log(`msg : ${msg}`)
                //   console.log(
                //       `from: ${msg.from() ? msg.from().name() : null}: ${
                //   msg.from() ? msg.from().id : null
                // }`
                //   )
                //   console.log(`to: ${msg.to()}`)
                //   console.log(`text: ${msg.text()}`)
                //   console.log(`isRoom: ${msg.room()}`)
                //   console.log("=============================")

            // 判断此消息类型是否为文本
            if (msg.type() == Message.Type.Text) {
                // 判断消息类型来自群聊
                if (msg.room()) {
                    // 获取群聊
                    const room = await msg.room()

                    // 收到消息，提到自己
                    if (await msg.mentionSelf()) {
                        // 获取提到自己的名字
                        // let self = await msg.to()
                        // self = "@" + self.name()
                        // 获取消息内容，拿到整个消息文本，去掉 @+名字
                        // let text = msg.text().replace(self, "")
                        return
                    } else {
                        // 收到消息，是关键字 “抽奖”
                        if (await lottery(msg)) return
                    }


                } else {
                    //私聊消息
                }
            } else {
                console.log("消息不是文本！")
            }
        }
    }
    /**
     * @description 回复信息是关键字 “抽奖” 
     * @param {Object} msg 消息对象
     * @return {Promise} true-是 false-不是
     */
async function lottery(msg) {
    //判断文字消息是否以抽奖+空格开头
    if (msg.text().indexOf("抽奖 ") == 0) {
        const room = await msg.room()
        let member = await room.memberAll()
            // 获取群内成员数组,去除机器人以及发奖人
        member = member.filter(v => (!v.self()) && (v != msg.from()))

        // 随机从成员数组中抽取一个
        let target = member[Math.floor(Math.random() * member.length)]

        room.say(msg.text() + "\n---\n" + "\n中奖的人是:" + ((await room.alias(target)) || target.name()), msg.from(), target)

        return true
    }
    return false
}