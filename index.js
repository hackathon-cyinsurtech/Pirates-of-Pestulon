//const { Composer, log } = require('micro-bot')
const { Composer, Stage, Scene, session, log } = require('micro-bot')
var rest = require('restler');


// const bot = new Composer()

// bot.use(log())
// bot.start(({ reply }) => reply('Hello from Insurance Marketplace!'))
// bot.command('help', ({ reply }) => reply('type /intro to introduce yourself!'))
// bot.command('about', ({ reply }) => reply('made for cy #insurtech'))
// bot.command('find', ({ reply }) => reply('3 insurance best for you in your area'))

// bot.command('intro', ({ reply }) => reply('age sex location occupation'))

// bot.command('block', ({ reply }) => {
//     //console.log(reply.message)
//     reply('save to blockchain')
// })

// bot.hears('name', ({ reply }) => {

//     reply('got name')}
//     )

// bot.on('sticker', ({ reply }) => reply('👍'))

// bot.on('text', ({ ctx }) => {
//     console.log("!!!!!!!!!!!!!!! this is on text")
//     //console.log(bot.ctx.message)    //not working
//     console.log("out !!!!!!!!!!!!!!! this is on text")

// //    reply('got text')
// })

//bot.startWebhook('/secret-path', null, 5000)



const greeter = new Scene('greeter')
greeter.enter((ctx) => ctx.reply('Hi, introduce yourself. Type "save" to complete. Type "leave" to drop.'))
greeter.leave((ctx) => ctx.reply('see you soon!'))
greeter.hears('leave', (ctx) => ctx.scene.leave())

greeter.hears('save', (ctx) => {
    console.log("need to write to blockchain here!");
    ctx.scene.leave()

})

greeter.on('text', (ctx) => {
    console.log(ctx.message.text)
    ctx.reply('got it!')

})




const stage = new Stage()
stage.register(greeter)

const bot = new Composer()


bot.use(session())
bot.use(stage.middleware())
bot.command('intro', (ctx) => {
    console.log("before enter greeter")
    ctx.scene.enter('greeter')

})



bot.command('cancel', (ctx) => {
    console.log("before leave greeter")
    ctx.scene.leave()

})

bot.command('list', (ctx) => {

    rest.get('http://localhost:3000/api/Trader').on('complete', function(result) {
    if (result instanceof Error) {
        console.log('Error:', result.message);
        this.retry(5000); // try again after 5 sec
    } else {
         console.log(result);

         console.log(typeof result);
         ctx.reply('list of Customers below: \n'+ JSON.stringify(result));

    }
});
})


bot.command('/kyc', (ctx) => {

    var jsonData = {
        "$class": "org.example.biznet.Trader",
        "tradeId": "12345",
        "firstName": "Deniska",
        "lastName": "Rediska",
        "age":55,
        "location": "Nicosia",
        "linkedAccount": "linkedin"
      };
      rest.postJson('http://localhost:3000/api/Trader', jsonData).on('complete', function(data, response) {
        // handle response
        ctx.reply('KYC sent');

      });
});






bot.command('find', ({ reply }) => reply('3 insurance best for you in your area \n http://www.cgi.com.cy  \n https://www.primeinsurance.eu \n http://www.cosmosinsurance.com.cy'))

bot.command('help', ({ reply }) => reply('type:\n /intro to introduce yourself,\n/find for the best offers\n/list to get list of users'))

bot.command('attach', ({ reply }) => reply('please attach your profiles and text "save" or "leave"'))


bot.on('sticker', ({ reply }) => reply('👍'))



module.exports = bot
