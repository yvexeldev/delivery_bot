import { Markup } from 'telegraf'

export const keyboards = {
  inline_menu_elon_berish: Markup.inlineKeyboard([[Markup.button.callback('BUYURTMA TURLARI👈🏻', 'buyurtma')]]),

  inline_menu_elon_kurish: Markup.inlineKeyboard([[Markup.button.callback('BUYURTMA BERGANLAR👈🏻', 'buyurtma1')]]),

  inline_andoza: Markup.inlineKeyboard([
    [Markup.button.callback('👈🏻OZIQ-OVQAT BUYURTMASI', 'oziq-ovqat')],
    [Markup.button.callback('👈🏻DORI-DARMON  BUYURTMASI', 'dori-darmon')],
    [Markup.button.callback('👈🏻SANTEXNIKA VOSITALARI  BUYURTMASI', 'santexnika')],
  ]),
  inline_andoza_kurish: Markup.inlineKeyboard([
    [Markup.button.callback('OZIQ-OVQAT QIDIRAYOTGANLAR', 'oziq-ovqat')],
    [Markup.button.callback('DORI-DARMON QIDIRAYOTGANLAR', 'dori-darmon1')],
    [Markup.button.callback('SANTEXNIKA QIDIRAYOTGANLAR', 'santexnika1')],
  ]),


  inline_kg_berish: Markup.inlineKeyboard([
    [Markup.button.callback('Kilogramm', 'kilogramm')],
    [Markup.button.callback('Gramm', 'gramm')],
    [Markup.button.callback('Dona', 'dona')],
    [Markup.button.callback('Summa', 'summa')],
  ]),
}
