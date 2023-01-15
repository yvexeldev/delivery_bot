import { Markup, Telegraf } from 'telegraf'
import { sequelize } from './db.js'

const token = String(process.env.BOT_TOKEN)
export const bot = new Telegraf(token)

bot.help(async (ctx) => {
  await ctx.reply(`<b>Bosh sahifa!</b>`, {
    parse_mode: 'HTML',
    ...Markup.keyboard([['📣 Buyurtma berish', "🔍  Buyurtmalarni ko'rish"]])
      .oneTime()
      .resize(),
  })
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
  } catch (error) {
    console.log('DB ERROR')
    console.log(error)
  }
}

start()
bot.launch()
