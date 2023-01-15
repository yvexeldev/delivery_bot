import { User } from '../models/user.model.js'
import { Ads } from '../models/ads.model.js'
import { bot } from '../core/bot.js'
import { Composer } from 'telegraf'
import { getLang } from '../libs/lang.js'
import { menuTasdiqlash } from '../libs/confirm.js'
import { see_elon } from '../libs/see_ads.js'
import { keyboards } from '../libs/keyboards.js'
const composer = new Composer()

composer.on('message', async (ctx) => {
  let lang = ''
  let tg_link = ''
  let phone_number = ''
  await User.findOne({ where: { user_id: `${ctx.from.id}` } }).then(async (user) => {
    if (!user) {
      await ctx.reply(`👉 "/start" `)
    } else {
      lang = user.dataValues.user_lang
      tg_link = user.dataValues.username
      phone_number = user.dataValues.phone_number
    }
  })

  let elon_state
  let selectedCategory

  const elon = await Ads.findOne({
    where: { user_id: `${ctx.from.id}` },
    order: [['createdAt', 'DESC']],
  })

  if (elon) {
    elon_state = elon.elon_state
    selectedCategory = elon.category

    if (elon_state == 'product_name') {
      if ('text' in ctx.message) {
        elon.product_name = ctx.message.text
        elon.tg_link = tg_link
        elon.phone_number = phone_number
        elon.elon_state = 'kilo'
        await elon.save()
        if (lang === 'UZB') {
          let txt = 'Miqdorini kiriting'
          await ctx.reply(txt, keyboards.inline_kg_berish)
        }
      } else {
        if (lang === 'UZB') await ctx.replyWithHTML('<b>Maxsulot nomini kiriting:</b>')
      }
    }
    if (elon_state == 'kilo') {
      if ('text' in ctx.message) {
        elon.kilo = ctx.message.text
        elon.elon_state = 'finish'
        await elon.save()
        if (lang === 'UZB') {
          await ctx.replyWithHTML("Buyurtm ma'lumotlarini kiritish yakunlandi!")
          await menuTasdiqlash(ctx)
        }
      } else {
        if (lang === 'UZB') await ctx.replyWithHTML('Miqdorini3 kiriting')
      }
    } else if (elon_state == 'erkin') {
      if ('text' in ctx.message) {
        elon.product_name = 'text'
        elon.elon_state = 'finish'
        await elon.save()
        if (lang === 'UZB') {
          await ctx.replyWithHTML("Buyurtm ma'lumotlarini kiritish yakunlandi!")
          await menuTasdiqlash(ctx)
        }
      } else if ('photo' in ctx.message) {
        const photo_link = await bot.telegram.getFileLink(ctx.message.photo[ctx.message.photo.length - 1].file_id)
        elon.product_name = 'photo'
        elon.elon_state = 'finish'
        await elon.save()
        if (lang === 'UZB') {
          await ctx.replyWithHTML("Buyurtm ma'lumotlarini kiritish yakunlandi!")
          await menuTasdiqlash(ctx)
        }
      } else if ('document' in ctx.message) {
        const doc_link = await bot.telegram.getFileLink(ctx.message.document.file_id)
        elon.product_name = 'doc'
        elon.elon_state = 'finish'
        await elon.save()
        if (lang === 'UZB') {
          await ctx.replyWithHTML("Buyurtm ma'lumotlarini kiritish yakunlandi!")
          await menuTasdiqlash(ctx)
        }
      }
    }
  }
})


composer.action(/.+/, async (ctx) => {
  const message = ctx.match[0]
  if (message.slice(0, 2) == 'ok') {
    const elon = await Ads.findOne({
      where: { id: `${message.slice(3, message.length)}` },
    })
    if (elon) {
      const lang = await getLang(String(elon.user_id))
      let msgText
      let ads = ''
      let photo_path = ''
      let doc_path = ''
      let file_name = ''
      if (lang === 'UZB') {
        msgText = `Tabriklayman! Ushbu e'lon operator tomonidan ma'qullandi! `
        if (elon.category === 'oziq-ovqat')
          ads = `<b>Oziq-Ovqat buyurtmasi berilmoqda:</b>\n\n🥞 Nomi: ${elon.product_name}\n⚖️Miqdori: ${elon.kilo}\n📲 Telegram: @${elon.tg_link}\n🙋‍♂️Telefon raqami: ${elon.phone_number}🙋🏻‍♀️`
        else if (elon.category === 'santexnika')
          ads = `<b>Santexnika buyurtmasi berilmoqda:</b>\n\n🚰 Nomi: ${elon.product_name}\n⚖️ Miqdori: ${elon.kilo}\n📲 Telegram: @${elon.tg_link}\n🙋‍♂️Telefon raqami: ${elon.phone_number}🙋🏻‍♀️`
        else if (elon.category === 'dori-darmon')
          ads = `<b>Dori-darmon buyurtmasi berilmoqda:</b>\n\n💊 Nomi : ${elon.product_name}\n⚖️ Miqdori: ${elon.kilo}\n📲 Telegram: @${elon.tg_link}\n🙋‍♂️Telefon raqami: ${elon.phone_number}🙋🏻‍♀️`
      }
      let post
      if (photo_path != '') {
        if (ads.length < 950) {
          ads += `\n\n🤖 @uchk_shop_Bot`
        }
        post = await ctx.telegram.sendPhoto(
          String(process.env.CHANEL),
          { url: photo_path },
          {
            caption: ads,
            parse_mode: 'HTML',
          },
        )
        ctx.editMessageCaption('Tasdiqlandi')
      } else if (doc_path != '') {
        if (ads.length < 950) {
          ads += `\n\n🤖 @uchk_shop_bot`
        }
        post = await ctx.telegram.sendDocument(
          String(process.env.CHANEL),
          { url: doc_path, filename: file_name },
          {
            caption: ads,
            parse_mode: 'HTML',
          },
        )
        ctx.editMessageCaption('Tasdiqlandi')
      } else {
        ads += `\n\n🤖 @uchk_shop_bot`

        post = await ctx.telegram.sendMessage(String(process.env.CHANEL), ads, {
          parse_mode: 'HTML',
        })

        ctx.editMessageText('Tasdiqlandi')
      }

      await ctx.telegram.sendMessage(`${elon.user_id}`, `${msgText} `, {
        parse_mode: 'HTML',
      })
      elon.post_id = String(post.message_id)
      await elon.save()
    }
  } else if (message.slice(0, 2) == 'no') {
    const elon = await Ads.findOne({
      where: { id: `${message.slice(3, message.length)}` },
    })

    if (elon) {
      const lang = await getLang(String(elon.user_id))
      let ads = ''
      let msgText
      let photo_path = ''
      let doc_path = ''
      let file_name = ''
      if (lang === 'UZB') {
        msgText = `Afsus! Usbu buyurtma operator tomonidan ma'qullanmadi. Ma'lumotlarni to'g'rilab qayta yuboring!`
        if (elon.category === 'oziq-ovqat')
          ads = `<b>Oziq-Ovqat buyurtmasi berilmoqda:</b>\n\n🏦 Nomi: ${elon.product_name}\n⚖️ Miqdori: ${elon.kilo}\n📲 Telegram: @${elon.tg_link}\n \n `
        else if (elon.category === 'santexnika')
          ads = `<b>Santexnika buyurtmasi berilmoqda:</b>\n\n🧑‍💻 Nomi: ${elon.product_name}\n⚖️ Miqdori: ${elon.kilo}\n📲 Telegrami: @${elon.tg_link}\n `
        else if (elon.category === 'dori-darmon')
          ads = `<b>Dori-darmon buyurtmasi berilmoqda:</b>\n\n🏦 Nomi : ${elon.product_name}\n⚖️ Miqdori: ${elon.kilo}\n📲 Telegrami: @${elon.tg_link}\n`
      }
      if (photo_path != '') {
        await ctx.telegram.sendPhoto(
          `${elon.user_id}`,
          { url: photo_path },
          {
            caption: ads,
            parse_mode: 'HTML',
          },
        )
        ctx.editMessageCaption('Inkor qilindi')
      } else if (doc_path != '') {
        await ctx.telegram.sendDocument(
          `${elon.user_id}`,
          { url: doc_path, filename: file_name },
          {
            caption: ads,
            parse_mode: 'HTML',
          },
        )
        ctx.editMessageCaption('Inkor qilindi')
      }
    }
  } else if (message.slice(0, 3) == 'del') {
    const elon = await Ads.findOne({
      where: { id: `${message.slice(4, message.length)}` },
    })
    const lang = await getLang(String(ctx?.from?.id))
    if (!elon) {
      if (lang === 'UZB') await ctx.reply(`Bu elon avval o'chirilgan`)
    } else {
      if (elon.post_id != null) {
        try {
          await ctx.telegram.deleteMessage(String(process.env.CHANEL), Number(elon.post_id))
        } catch (error) {
          console.log(error)
        }
      }

      await Ads.destroy({ where: { id: `${elon.id}` } })
      if (lang === 'UZB') await ctx.reply(`E'lon o'chirildi`)
    }
  } else if (message.slice(0, 6) == 'offset') {
    const result = message.split(' ')
    await see_elon(
      ctx,
      result[1].slice(4, result[1].length),
      result[2].slice(5, result[2].length),
      Number(result[0].slice(7, result[0].length)),
    )
  }
})

bot.use(composer.middleware())
