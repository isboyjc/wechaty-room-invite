# wechaty-room-invite

[![Wechaty Plugin Contrib](https://img.shields.io/badge/Wechaty%20Plugin-wechaty--room--invite-brightgreen.svg)](https://github.com/isboyjc/wechaty-room-invite) [![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://github.com/Wechaty/wechaty)

Invite user to rooms by keyword

通过关键字邀请用户进入房间

## 开始

### 简介

你可以向机器人发送某些关键字，机器人会通过这些关键字邀请你进入对应的房间，当然，可以是多个房间

### 安装

```txt
npm install wechaty-room-invite

or

yarn add wechaty-room-invite
```

### 使用

```js
const WechatyRoomInvite = require("wechaty-room-invite")

bot.use(WechatyRoomInvite(options))
```

如上所示

使用插件只要按需传入配置对象 `options` 即可

| Options 参数属性 | 类型          | 简介                                                                                                                                                                                                                                                                                                                                        |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyword          | String\|Array | 触发邀请该用户的关键字，只有一个可以使用字符串类型，多个关键字使用数组类型                                                                                                                                                                                                                                                                  |
| roomList         | Array         | 机器人管理的群聊列表，该项为必填项，数组对象中具体配置请看下面示例                                                                                                                                                                                                                                                                          |
| reply            | String        | roomList 数组长度大于 1 时，视为管理多个群聊，那么 keyword 触发后会回复用户当前管理的群聊列表数据供用户选择进入某一个群，这个群聊数据列表为一段由 roomList 配置生成的话，roomList 数组长度等于 1 时，keyword 触发将会直接拉起群邀请，那么此字段也无用，reply 字段不是必选项，管理多个群聊时，建议直接使用默认文字，默认流程可看最后示例图片 |

我们来看 `roomList` 数组的配置示例

```js
roomList: [
  {
    // 群聊名字，管理多个群聊时用户可通过群聊名字选择某个群聊
    name: "微信机器人",
    // 群聊id
    roomId: "22275855499@chatroom",
    // 群聊别名，建议简短，管理多个群聊时用户可通过别名选择某个群聊，叫它[编号]可能更好
    alias: "A05",
    // 标签，用于在管理多个群聊时给各个群聊做一个简单的标识，方便用户选择
    label: "新群",
    // 是否关闭进入，如果为true，则触发该群时，会提示该群不可进入
    close: true,
  },
  ...
]
```

### 示例

```js
const { Wechaty } = require("wechaty")
const { PuppetPadplus } = require("wechaty-puppet-padplus")
const Qrterminal = require("qrcode-terminal")
// 插件 WechatyRoomInvite
const WechatyRoomInvite = require("wechaty-room-invite")

// 初始化 bot
const bot = new Wechaty({
  puppet: new PuppetPadplus({
    // 机器人padplus协议token
    token: PUPPET_PADPLUS_TOKEN,
  }),
  // 机器人名字
  name: ROBOT_NAME,
})

// 插件参数配置
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
```

### 最后

扫描二维码，加圈子微信，可进交流群哦，效果如下图，赶快来试试吧

下图为多个群聊管理，只有 `roomList` 数组长度为 1 时，不会显示 `reply` ，将会直接拉起群邀请

<img src="https://gitee.com/IsboyJC/PictureBed/raw/master/other/asdakshdajshdas1.jpeg" width="200" height="200" alt="图片名称" align=left />

<div style="left">
<img src="https://gitee.com/IsboyJC/PictureBed/raw/master/other/image-20200614182527276.png" width="200" height="420"  alt="图片名称" align=left />
</div>
