import { Scenes, session, Telegraf } from 'telegraf';
import { writeToNotionScenes } from '@/telegramCommands/writeToNotionScenes/handleWriteRequest.js';
import { handleExportFromNotionDB } from '@/telegramCommands/exportFromNotionScenes/handleExportRequest.js';

export function telegram() {
  //* write to notion scenes
  const {
    getPartnerScene,
    getTypeScene,
    getCodeScene,
    getDateSene,
    getDescriptionScene,
    getClientScene,
    getCountScene,
    GetDurationScene,
    getPagesScene,
    getEmplyeeScene,
    getManualPriceScene,
    getLinkScene,
    runNotionWriteFunctionScene,
  } = {
    getCodeScene: new Scenes.BaseScene<Scenes.SceneContext>('getCode'),
    getPartnerScene: new Scenes.BaseScene<Scenes.SceneContext>('getPartner'),
    getDateSene: new Scenes.BaseScene<Scenes.SceneContext>('getDate'),
    getDescriptionScene: new Scenes.BaseScene<Scenes.SceneContext>('getDescription'),
    getClientScene: new Scenes.BaseScene<Scenes.SceneContext>('getClient'),
    getCountScene: new Scenes.BaseScene<Scenes.SceneContext>('getCount'),
    GetDurationScene: new Scenes.BaseScene<Scenes.SceneContext>('GetDuration'),
    getPagesScene: new Scenes.BaseScene<Scenes.SceneContext>('getPages'),
    getEmplyeeScene: new Scenes.BaseScene<Scenes.SceneContext>('getEmplyee'),
    getManualPriceScene: new Scenes.BaseScene<Scenes.SceneContext>('getManualPrice'),
    getTypeScene: new Scenes.BaseScene<Scenes.SceneContext>('getType'),
    getLinkScene: new Scenes.BaseScene<Scenes.SceneContext>('getLink'),
    runNotionWriteFunctionScene: new Scenes.BaseScene<Scenes.SceneContext>('runNotionWriteFunctionScene'),
  };
  //* Export data from Notion scenes
  const {
    getFilterPropertyNameScene,
    getPartnerNameScene,
    getClientNameScene,
    getEmployeeNameScene,
    getTypeNameScene,
    checkForDateFilter,
    getDateType,
    getDateString,
    tryRunExportFunction,
  } = {
    getFilterPropertyNameScene: new Scenes.BaseScene<Scenes.SceneContext>('getFilterPropertyNameScene'),
    getPartnerNameScene: new Scenes.BaseScene<Scenes.SceneContext>('getPartnerNameScene'),
    getClientNameScene: new Scenes.BaseScene<Scenes.SceneContext>('getClientNameScene'),
    getEmployeeNameScene: new Scenes.BaseScene<Scenes.SceneContext>('getEmployeeNameScene'),
    getTypeNameScene: new Scenes.BaseScene<Scenes.SceneContext>('getTypeNameScene'),
    checkForDateFilter: new Scenes.BaseScene<Scenes.SceneContext>('checkForDateFilter'),
    getDateString: new Scenes.BaseScene<Scenes.SceneContext>('getDateString'),
    getDateType: new Scenes.BaseScene<Scenes.SceneContext>('getDateType'),
    tryRunExportFunction: new Scenes.BaseScene<Scenes.SceneContext>('tryRunExportFunction'),
  };
  writeToNotionScenes(
    getPartnerScene,
    getCodeScene,
    getTypeScene,
    getDateSene,
    getDescriptionScene,
    getClientScene,
    getCountScene,
    GetDurationScene,
    getPagesScene,
    getEmplyeeScene,
    getManualPriceScene,
    getLinkScene,
    runNotionWriteFunctionScene
  );
  handleExportFromNotionDB(
    getFilterPropertyNameScene,
    getPartnerNameScene,
    getClientNameScene,
    getEmployeeNameScene,
    getTypeNameScene,
    checkForDateFilter,
    getDateString,
    getDateType,
    tryRunExportFunction
  );
  const bot = new Telegraf<Scenes.SceneContext>(process.env.telegramBotToken);
  const stage = new Scenes.Stage<Scenes.SceneContext>(
    [
      // write to notion scenes
      getPartnerScene,
      getTypeScene,
      getCodeScene,
      getDateSene,
      getDescriptionScene,
      getClientScene,
      getCountScene,
      GetDurationScene,
      getPagesScene,
      getEmplyeeScene,
      getManualPriceScene,
      runNotionWriteFunctionScene,
      getLinkScene,
      // Export data from Notion scenes
      getFilterPropertyNameScene,
      getPartnerNameScene,
      getClientNameScene,
      getEmployeeNameScene,
      getTypeNameScene,
      checkForDateFilter,
      getDateString,
      getDateType,
      tryRunExportFunction,
    ],
    {
      ttl: 100,
    }
  );

  bot.use(session());
  bot.use(stage.middleware());
  bot.start(async ctx => {
    await ctx.reply('Welcome!');
  });
  bot.command('w', ctx => ctx.scene.enter('getPartner'));
  bot.command('a', ctx => ctx.scene.enter('getFilterPropertyNameScene'));
  // bot.command('commands', async ctx => {
  //   const isAuthCheck = await authCheck(ctx);
  //   if (!isAuthCheck) return;
  //   await ctx.reply('choose a command', {
  //     reply_markup: {
  //       inline_keyboard: [
  //         [{ text: 'Export data from Notion', callback_data: 'export' }],
  //         [{ text: 'Write to Notion', callback_data: 'NotionBillReg' }],
  //       ],
  //     },
  //   });
  // });

  // bot.action('NotionBillReg', async ctx => {
  //   await writeNotionBill(ctx, bot);
  // });

  // bot.command('test', ctx => {
  //   ctx.reply('\\ # shit normal', {
  //     parse_mode: 'Markdown',
  //   });
  // });

  // bot.action('export', async ctx => {
  //   await ctx.deleteMessage();
  //   await ctx.reply('Choose the filter type you want to export.', {
  //     reply_markup: {
  //       inline_keyboard: [
  //         [
  //           { text: 'by date', callback_data: 'dateFilter' },
  //           { text: 'by client', callback_data: 'clientFilter' },
  //         ],
  //         [
  //           { text: 'by partner', callback_data: 'partnerFilter' },
  //           { text: 'by employee', callback_data: 'employeeFilter' },
  //         ],
  //       ],
  //     },
  //   });
  //   await NotionExportLogic(bot);
  // });
  // bot.use(authCheck);

  // bot.on(message('text'), ctx => {
  //   checkForRequests(ctx.message);
  // });
  bot.launch();

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}
