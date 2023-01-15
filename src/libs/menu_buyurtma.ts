import { Markup, Context } from 'telegraf'
import { User } from '../models/user.model.js'
import { keyboards } from './keyboards.js'

export async function menu_elon_uzb(ctx: Context) {
  await ctx.reply(`"Yangi buyurtmani qo'shish" tugmasini bosing`, {
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

///////////////////////////////////////////////////////////
export async function menu_buyurtma_tel_uzb(ctx: Context) {
  const user_id = ctx.from?.id
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
}

export async function inlineMenuBuyurtmaBerish(ctx: Context, inlineElonText: string) {
  return await ctx.reply(inlineElonText, {
    parse_mode: 'HTML',
    ...keyboards['inline_menu_elon_berish'],
  })
}


export async function inlineMenuElonKurish(ctx: Context, inlineText: string) {
  return await ctx.reply(inlineText, {
    parse_mode: 'HTML',
    ...keyboards['inline_menu_elon_kurish'],
  })
}
