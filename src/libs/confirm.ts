import { Ads } from '../models/ads.model.js'
import { Markup, Context } from 'telegraf'

export async function menuTasdiqlash(ctx: Context) {
  let ads = ''
  let photo_path = ''
  let doc_path = ''
  let file_name = ''
  await Ads.findOne({
    where: { user_id: `${ctx?.from?.id}` },
    order: [['createdAt', 'DESC']],
  }).then(async (elon) => {
    if (elon) {
      const { category, product_name, kilo, tg_link, phone_number } = elon.dataValues
      if (category === 'oziq-ovqat')
        ads = `<b>Oziq-Ovqat buyurtmasi berilmoqda:</b>\n\n🥞 Oziq-ovqat: ${elon.product_name}\n⚖️ Miqdori: ${elon.kilo}\n📲 Telegram: @${elon.tg_link}\n Telefon raqami: ${elon.phone_number}`
      else if (category === 'dori-darmon')
        ads = `<b>DORI-DARMON buyurtmasi berilmoqda:</b>\n\n💊 DORI: ${elon.product_name}\n⚖️ Miqdori: ${elon.kilo}\n📲 Telegram: @${elon.tg_link}\n Telefon raqami: ${elon.phone_number}`
      else if (category === 'santexnika')
        ads = `<b>SANTENIKA buyurtmasi berilmoqda:</b>\n\n🚰 Santexnika: ${elon.product_name}\n⚖️ Miqdori: ${elon.kilo}\n📲 Telegram: @${elon.tg_link}\n Telefon raqami: ${elon.phone_number}`
    }
  })
  if (photo_path != '') {
    return await ctx.replyWithPhoto(
      { url: `${photo_path}` },
      {
        caption: ads,
        parse_mode: 'HTML',
        ...Markup.keyboard([
          ['✅ Tasdiqlash', '❌ Bekor qilish'],
          ['🏠 Bosh sahifa', '💁 Buyurtma berish tartibi'],
        ])
          .oneTime()
          .resize(),
      },
    )
  } else if (doc_path != '') {
    return await ctx.replyWithDocument(
      { url: `${doc_path}`, filename: file_name },
      {
        caption: ads,
        parse_mode: 'HTML',
        ...Markup.keyboard([
          ['✅ Tasdiqlash', '❌ Bekor qilish'],
          ['🏠 Bosh sahifa', '💁 Buyurtma berish tartibi'],
        ])
          .oneTime()
          .resize(),
      },
    )
  } else {
    return await ctx.reply(`${ads}\n\n<b>Buyurtma ma'qul bo'lsa "Tasdiqlash" tugmasini bosing!</b>`, {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        ['✅ Tasdiqlash', '❌ Bekor qilish'],
        ['🏠 Bosh sahifa', '💁 Buyurtma berish tartibi'],
      ])
        .oneTime()
        .resize(),
    })
  }
}
