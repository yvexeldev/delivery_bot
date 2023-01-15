import { bot } from '../core/bot.js'
import { Composer, Markup } from 'telegraf'
import { saveLang } from '../libs/lang.js'
const composer = new Composer()

composer.hears("🇺🇿 O'zbek tili", async (ctx) => {
  await saveLang(ctx, 'UZB')
})

composer.hears('💁 Buyurtma berish tartibi', async (ctx) => {
  ctx.reply('Bu yerda buyurtma berish tartibi yoziladi!')
  await ctx.reply("<b>Yangi buyurtmani qo'shish 👇</b>", {
    parse_mode: 'HTML',
    ...Markup.keyboard([
      ["🆕 Yangi buyurtmani qo'shish"],
      ['Men bergan buyurtmalar'],
      ['🏠 Bosh sahifa', '💁 Buyurtma berish tartibi'],
    ])
      .oneTime()
      .resize(),
  })
})

composer.hears('addusertg', async (ctx) => {
  if (ctx?.from?.id == Number(process.env.ADMIN))
    try {
      await ctx.telegram.sendMessage('5064503615', 'Hello man')
    } catch (error) {
      console.log(error)
    }
})

bot.use(composer.middleware())
