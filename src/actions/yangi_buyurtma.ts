import { Ads } from '../models/ads.model.js'
import { bot } from '../core/bot.js'
import { Composer, Markup } from 'telegraf'
import { getLang } from '../libs/lang.js'
import { add_elon } from '../libs/add_ads.js'
import { Op } from 'sequelize'

const composer = new Composer()

composer.hears('❌ Bekor qilish', async (ctx) => {
  await Ads.findOne({
    where: { user_id: `${ctx.from.id}` },
    order: [['createdAt', 'DESC']],
  }).then(async (elon) => {
    if (elon) {
      await Ads.destroy({ where: { id: `${elon.id}` } })
      await ctx.reply(`<b> Yangi buyurtmani qo'shish 👇</b>`, {
        parse_mode: 'HTML',
        ...Markup.keyboard([
          ["🆕 Yangi buyurtmani qo'shish"],
          ['Men bergan buyurtmalar'],
          ['🏠 Bosh sahifa', '💁 Buyurtma berish tartibi'],
        ])
          .oneTime()
          .resize(),
      })
    }
  })
})

composer.hears('Men bergan buyurtmalar', async (ctx) => {
  await Ads.findAll({
    where: { user_id: `${ctx.from.id}`, post_id: { [Op.not]: '' } },
    order: [['post_id', 'DESC']],
  }).then(async (elon) => {
    if (!elon || elon.length == 0) {
      await ctx.reply(`Sizda birorta ham faol buyurtma yo'q`)
    } else {
      elon.forEach(async (element) => {
        try {
          await ctx.telegram
            .copyMessage(ctx.from.id, String(process.env.CHANEL), Number(element.post_id), {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "❌ O'chirish",
                      callback_data: `del=${element.id}`,
                      // hide: false,
                    },
                  ],
                  [
                    {
                      text: '‼️ Reklama',
                      callback_data: `rek=${element.id}`,
                      // hide: false,
                    },
                  ],
                ],
              },
            })
            .then()
        } catch (error) {
          console.log('xatolik-Men bergan buyurtmalar')
        }
      })
    }
  })
  await ctx.reply(`<b>Yangi buyurtmani qo'shish </b>👇`, {
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

composer.hears('✅ Tasdiqlash', async (ctx) => {
  await Ads.findOne({
    where: { user_id: `${ctx.from.id}` },
    order: [['createdAt', 'DESC']],
  }).then(async (elon) => {
    if (elon) {
      let ads = ''
      let photo_path = ''
      let doc_path = ''
      let file_name = ''
      if (elon.category === 'oziq-ovqat')
        ads = `<b>Oziq-Ovqat buyurtmasi berilmoqda:</b>\n\n🥞 Oziq-ovqat: ${elon.product_name}\n⚖️ Miqdori: ${elon.kilo}\n📲 Telegram: @${elon.tg_link}\n`
      else if (elon.category === 'dori-darmon')
        ads = `<b>DORI-DARMON buyurtmasi berilmoqda:</b>\n\n💊 DORI: ${elon.product_name}\n⚖️ Miqdori: ${elon.kilo}\n📲 Telegram: @${elon.tg_link}\n`
      else if (elon.category === 'santexnika')
        ads = `<b>SANTENIKA buyurtmasi berilmoqda:</b>\n\n🚰 Santexnika: ${elon.product_name}\n⚖️ Miqdori: ${elon.kilo}\n📲 Telegrami: @${elon.tg_link}\n`

      if (photo_path != '')
        await ctx.telegram.sendPhoto(
          String(process.env.ADMIN),
          { url: `${photo_path}` },
          {
            caption: ads,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '✅ Tasdiqlansin',
                    callback_data: `ok=${elon.id}`,
                    // hide: false,
                  },
                  {
                    text: '❌ Inkor qilinsin',
                    callback_data: `no=${elon.id}`,
                    // hide: false,
                  },
                ],
              ],
            },
          },
        )
      else if (doc_path != '')
        await ctx.telegram.sendDocument(
          String(process.env.ADMIN),
          { url: doc_path, filename: file_name },
          {
            caption: ads,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '✅ Tasdiqlansin',
                    callback_data: `ok=${elon.id}`,
                    // hide: false,
                  },
                  {
                    text: '❌ Inkor qilinsin',
                    callback_data: `no=${elon.id}`,
                    // hide: false,
                  },
                ],
              ],
            },
          },
        )
      else
        await ctx.telegram.sendMessage(String(process.env.ADMIN), ads, {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '✅ Tasdiqlansin',
                  callback_data: `ok=${elon.id}`,
                  // hide: false,
                },
                {
                  text: '❌ Inkor qilinsin',
                  callback_data: `no=${elon.id}`,
                  // hide: false,
                },
              ],
            ],
          },
        })
    }
  })
  await ctx.reply(`Buyurtma ko'rib chiqish va tasdiqlanishi uchun operatorga yuborildi!`, {
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

composer.action('oziq-ovqat', async (ctx) => {
  add_elon(ctx, 'oziq-ovqat', await getLang(String(ctx?.from?.id)))
  ctx.answerCbQuery()

})

composer.action('dori-darmon', async (ctx) => {
  add_elon(ctx, 'dori-darmon', await getLang(String(ctx?.from?.id)))
  ctx.answerCbQuery()

})
composer.action('santexnika', async (ctx) => {
  add_elon(ctx, 'santexnika', await getLang(String(ctx?.from?.id)))
  ctx.answerCbQuery()

})

bot.use(composer.middleware())
