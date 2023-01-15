import { User } from '../models/user.model.js'
import { bot } from '../core/bot.js'
import { Composer, Markup } from 'telegraf'
import { inlineMenuBuyurtmaBerish, menu_buyurtma_tel_uzb, menu_elon_uzb } from '../libs/menu_buyurtma.js'
import { getLang } from '../libs/lang.js'
import { keyboards } from '../libs/keyboards.js'

const composer = new Composer()

composer.hears('📣 Buyurtma berish', async (ctx) => {
  const user_id = ctx.from.id
  await User.findOne({ where: { user_id: `${user_id}` } }).then(async (user) => {
    if (!user) {
      await ctx.reply(`Botga "/start" tugmasi orqali qayta kiring`)
    } else {
      if (user.dataValues.phone_number == '' || user.dataValues.phone_number == null) {
        await ctx.reply(`Iltimos, <b>"Telefon raqamni yuborish📲"</b> tugmasini bosing! 👇`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([[Markup.button.contactRequest('📱 Telefon raqamni yuborish'), '🏠 Bosh sahifa']])
            .oneTime()
            .resize(),
        })
      } else {
        menu_buyurtma_tel_uzb(ctx)
      }
    }
  })
})
//////////////////////////////////////////////
composer.hears('Joylashuvingizni jonatish📍', async (ctx) => {
  const user_id = ctx.from.id
  await User.findOne({ where: { user_id: `${user_id}` } }).then(async (user) => {
    if (!user) {
      await ctx.reply(`Botga "/start" tugmasi orqali qayta kiring`)
    } else {
      if (user.dataValues.location == '' || user.dataValues.location == null) {
        await ctx.reply(`Iltimos, <b>"Joylashuvingizni yuborish📍"</b> tugmasini bosing! 👇`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([[Markup.button.locationRequest('Joylashuvingizni yuborish📍'), '🏠 Bosh sahifa']])
            .oneTime()
            .resize(),
        })
      } else {
        menu_elon_uzb(ctx)
      }
    }
  })
})
/////////////////////////////////////////////
composer.hears("🆕 Yangi buyurtmani qo'shish", async (ctx) => {
  await User.findOne({ where: { user_id: `${ctx.from.id}` } }).then(async (user) => {
    if (user) {
      await user.update({ last_state: 'finish' })
    }
  })
  await inlineMenuBuyurtmaBerish(ctx, `<b>Yangi buyurtma qo'shish uchun quyidagilardan birini tanlang:</b>`)
})

composer.action('buyurtma', async (ctx) => {
  const lang = await getLang(String(ctx?.from?.id))
  if (lang === 'UZB')
    await ctx.editMessageText('<b>Kerakli bolimni tanlang:</b>', {
      parse_mode: 'HTML',
      ...keyboards['inline_andoza'],
    })
  ctx.answerCbQuery()
})

composer.action('kilogramm', async (ctx) => {
  const lang = await getLang(String(ctx?.from?.id))
  if (lang === 'UZB') await ctx.reply('Kilogramni kiriting')
  await User.findOne({ where: { user_id: `${ctx.from?.id}` } }).then(async (user) => {
    if (user) {
      await user.update({ last_state: 'finish' })
    }
  })
  ctx.answerCbQuery()
})

composer.action('gramm', async (ctx) => {
  const lang = await getLang(String(ctx?.from?.id))
  if (lang === 'UZB') await ctx.reply('Grammni kiriting')
  await User.findOne({ where: { user_id: `${ctx.from?.id}` } }).then(async (user) => {
    if (user) {
      await user.update({ last_state: 'finish' })
    }
  })

  ctx.answerCbQuery()
})

composer.action('dona', async (ctx) => {
  const lang = await getLang(String(ctx?.from?.id))
  if (lang === 'UZB') await ctx.reply('Donani kiriting')
  await User.findOne({ where: { user_id: `${ctx.from?.id}` } }).then(async (user) => {
    if (user) {
      await user.update({ last_state: 'finish' })
    }
  })
  ctx.answerCbQuery()
})

composer.action('summa', async (ctx) => {
  const lang = await getLang(String(ctx?.from?.id))
  if (lang === 'UZB') await ctx.reply('Summani kiriting')
  await User.findOne({ where: { user_id: `${ctx.from?.id}` } }).then(async (user) => {
    if (user) {
      await user.update({ last_state: 'finish' })
    }
  })
  ctx.answerCbQuery()
})

bot.use(composer.middleware())
