/*
 * @Author: isboyjc
 * @Date: 2020-06-14 17:39:17
 * @LastEditors: isboyjc
 * @LastEditTime: 2020-06-14 18:01:21
 * @Description: 测试程序
 */

// Wechaty核心包
const { Wechaty } = require("wechaty")
// padplus协议包
const { PuppetPadplus } = require("wechaty-puppet-padplus")
// qr码
const Qrterminal = require("qrcode-terminal")
// 插件 WechatyRoomInvite
const WechatyRoomInvite = require("../index")

// 初始化 bot
const bot = new Wechaty({
  puppet: new PuppetPadplus({
    // 机器人padplus协议token
    token: PUPPET_PADPLUS_TOKEN,
  }),
  // 机器人名字
  name: ROBOT_NAME,
})

const options = {
  keyword: ["加群", "入群", "群"],
  roomList: [
    {
      name: "Web圈0x01",
      roomId: "10614174865@chatroom",
      alias: "A01",
      label: "推荐",
    },
    {
      name: "Web圈0x02",
      roomId: "22825376327@chatroom",
      alias: "A02",
      label: "新群",
    },
    {
      name: "微信机器人",
      roomId: "24661539197@chatroom",
      alias: "A04",
      label: "推荐",
    },
    {
      name: "男神开门群",
      roomId: "22275855499@chatroom",
      alias: "A05",
      label: "测试",
      close: true,
    },
  ],
  reply: "",
}

// 使用插件
bot.use(WechatyRoomInvite(options))

bot
  .on("scan", (qrcode, status) => {
    Qrterminal.generate(qrcode, { small: true })
  })
  .start()
