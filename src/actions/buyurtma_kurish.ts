import { bot } from '../core/bot.js'
import { Composer, Markup } from 'telegraf'
import { getLang } from '../libs/lang.js'
import { keyboards } from '../libs/keyboards.js'
import { inlineMenuElonKurish } from '../libs/menu_buyurtma.js'
import { see_elon } from '../libs/see_ads.js'
const composer = new Composer()

composer.hears("🔍 Buyurtmalarni ko'rish", async (ctx) => {
  await ctx.reply(`<b>Bosh sahifa!</b>`, {
    parse_mode: 'HTML',
    ...Markup.keyboard([[' 📣 Buyurtma berish', "🔍 Buyurtmalarni ko'rish"]])
      .oneTime()
      .resize(),
  })
  await inlineMenuElonKurish(ctx, `<b>Buyurtmalarni ko'rish uchun kerakli bo'limni tanlang:</b>`)
})

composer.action('buyurtma1', async (ctx) => {
  const lang = await getLang(String(ctx?.from?.id))
  if (lang === 'UZB')
    await ctx.editMessageText('<b>Quyidagilardan birini tanlang</b>', {
      parse_mode: 'HTML',
      ...keyboards['inline_andoza_kurish'],
    })
  ctx.answerCbQuery()

})

composer.action('asosiy1', async (ctx) => {
  const lang = await getLang(String(ctx?.from?.id))
  if (lang === 'UZB')
    await ctx.editMessageText("<b>Buyurtmalarni ko'rish uchun kerakli bo'limni tanlang:</b>", {
      parse_mode: 'HTML',
      ...keyboards['inline_menu_elon_kurish'],
    })
  ctx.answerCbQuery()

})

composer.action('oziq-ovqat', async (ctx) => {
  await see_elon(ctx, 'oziq-ovqat', await getLang(String(ctx?.from?.id)), 0)
  ctx.answerCbQuery()

})

composer.action('dori-darmon1', async (ctx) => {
  await see_elon(ctx, 'dori-darmon', await getLang(String(ctx?.from?.id)), 0)
  ctx.answerCbQuery()

})

composer.action('santexnika1', async (ctx) => {
  await see_elon(ctx, 'santexnika', await getLang(String(ctx?.from?.id)), 0)
  ctx.answerCbQuery()

})

bot.use(composer.middleware())
