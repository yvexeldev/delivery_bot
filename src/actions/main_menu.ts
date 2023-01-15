import { bot } from '../core/bot.js'
import { Composer, Markup } from 'telegraf'
const composer = new Composer()
composer.hears('🏠 Bosh sahifa', async (ctx) => {
  await ctx.reply(`<b>Bosh sahifa!</b>`, {
    parse_mode: 'HTML',
    ...Markup.keyboard([['📣 Buyurtma berish', "🔍 Buyurtmalarni ko'rish"]])
      .oneTime()
      .resize(),
  })
})

bot.use(composer.middleware())
