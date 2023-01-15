import { User } from '../models/user.model.js'
import { bot } from '../core/bot.js'
import { Composer } from 'telegraf'
import { getLang } from '../libs/lang.js'
import { menu_buyurtma_tel_uzb, menu_elon_uzb } from '../libs/menu_buyurtma.js'

const composer = new Composer()

composer.on('contact', async (ctx) => {
  const contact = ctx.message.contact.phone_number
  const lang = await getLang(String(ctx.from.id))

  if (lang === 'UZB') {
    if (ctx.message.contact.user_id !== ctx.from.id) {
      await ctx.reply("O'zingizni telefon raqamingizni kiriting", {
        parse_mode: 'HTML',
      })
    } else {
      const user_id = ctx.from.id
      const user = await User.findOne({ where: { user_id: `${user_id}` } })
      if (!user) {
        await ctx.reply(`👉 /start`)
      } else {
        await user.update({ phone_number: contact })
        menu_buyurtma_tel_uzb(ctx)
      }
    }
  }
})

///////////////////////////////////////////
composer.on('location', async (ctx) => {
  const location = ctx.message.location
  const lang = await getLang(String(ctx.from.id))
  if (lang === 'UZB') {
    if (!ctx.message.location) {
      await ctx.reply("O'zingizni joylashuvingizni kiriting📍", {
        parse_mode: 'HTML',
      })
    } else {
      const user_id = ctx.from.id
      const user = await User.findOne({ where: { user_id: `${user_id}` } })
      if (!user) {
        await ctx.reply(`👉 /start`)
      } else {
        await user.update({ locationn: `${location.latitude}|${location.longitude}` })
        menu_elon_uzb(ctx)
      }
    }
  }
})

/////////////////////////////////////////////
bot.use(composer.middleware())
