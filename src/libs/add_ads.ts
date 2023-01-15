import { Ads } from '../models/ads.model.js'
import { Context } from 'telegraf'

export async function add_elon(ctx: Context, selectedCategory: string, lang: string) {
  const userId = String(ctx?.from?.id)
  await Ads.create({
    user_id: userId,
    category: selectedCategory,
    elon_state: 'product_name',
  }).then(async (elon) => {
    if (!elon) {
      if (lang === 'UZB') await ctx.replyWithHTML("Xatolik, e'lon kiritishni qaytadan boshlang.")
        await ctx.replyWithHTML('-> /Start ')
      
    } else {
      if (lang === 'UZB') {
        let txt = 'Maxsulot nomini kiriting'
        if (selectedCategory === 'dori-darmon') txt = 'Firma yoki dori nomini nomini kiriting:'
        await ctx.reply(txt)
      }
    }
  })
}
