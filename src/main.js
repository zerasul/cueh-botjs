const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');

const client = new Discord.Client();
var token = process.env.DISCORD_TOKEN;
connection = null;
dispatcher = null;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {


    if (message.content.startsWith('!cuehjoin')) {
        if (message.member.voice.channel) {
            message.member.voice.channel.join().then(conn => {
                connection = conn;
                message.reply("Conectando al canal de voz...");
            });
        } else {
            message.reply("Necesitas conectarte a un canal de voz primero, cueh");
        }
    }
    if (message.content.startsWith("!cuehballeneros")) {

        message.reply("Reproduciendo Balleneros (Ahora si jorge...)");

        if (connection != null) {
            dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=6bQ3lZRMI6c', { filter: "audioonly" }));
            dispatcher.on('finish', () => {
                dispatcher.destroy();
                dispatcher = null;
            });
        } else {
            message.reply("Primero conectate a un canal de voz, cueh");
        }
    }
    if (message.content.startsWith("!cuehstop")) {
        if (dispatcher != null) {
            dispatcher.pause();
            dispatcher.destroy();
            message.reply("Parando ejecucion....");
            dispatcher = null;
        }
    }

    if (message.content.startsWith("!cuehplay")) {

        if (connection != null) {
            urlyt = message.content.split(" ");
            if (urlyt.length > 1) {
                dispatcher = connection.play(ytdl(urlyt[1], { filter: "audioonly" }));
            } else {
                message.reply("Te falta la URL del video, cueh");
            }

        } else {
            message.reply("Primero conectate a un canal de voz, cueh");
        }
    }
});

client.login(token);