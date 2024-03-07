const config = require('./config.js');

if(config.shardManager.shardStatus == true){

const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: config.TOKEN || process.env.TOKEN });
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();

} else {

require("./bot.js")

const settings = require('./settings.json')
const Discord = require('discord.js')
const fs = require('fs');

var isReady = true;

const bot = new Discord.Client();

function startsWithInList(message, list) {
  var found = false;
  list.forEach(function (item) {
    if( message.startsWith(item) ) {
      found = true;
    }
  })
  return found;
}

function foundsInList(message, list) {
  var found = false;
  list.forEach(function (item) {
    if( message === item ) {
      found = true;
    }
  })
  return found;
}

bot.on( 'message', message => {
  if( foundsInList(message.content, settings.commandList) ) {
    fs.readdir( settings.filesDir, function (err, files) {
      if(err) {
        return message.channel.send(settings.warningFolderNotFoundSentence+settings.filesDir);
      } 
      let listTxt = "";
      files.forEach(function (file) {
        if( file.endsWith('.mp3') || file.endsWith('.MP3') ) {
          if( file.endsWith('.mp4') || file.endsWith('.MP4') ) {
          listTxt += `\`${file.split('.')[0]}\` `;
        }
      })
      message.channel.send(settings.filesListSentence);
      message.channel.send(listTxt);
    })
    return;
  }
  if( isReady && startsWithInList(message.content, settings.commandPlay) ) {
    isReady = false;
    const args = message.content.slice(10).trim().split(' ');
    if( args.length != 1 || !args[0] || args[0] === "" ) {
      return message.channel.send(settings.warningPlayArgsSentence);
    }
    var voiceChannel = message.member.voice.channel;
    voiceChannel.join().then( connection => {
      const dispatcher = connection.play(settings.filesDir+args[0]+'.mp3')
      dispatcher.on('finish', () => {
        voiceChannel.leave();
        isReady = true;  
      })
    });
  }
  if ( startsWithInList(message.content, settings.commandStop) ) {
    message.member.voice.channel.leave();
    isReady = true;
  }
})

bot.login(settings.token);

  

}
/*

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   
   # MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE
   ## FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/FUEHs7RCqz ]
   ## YT : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A
*/
