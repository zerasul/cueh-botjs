const {REST, Routes, Client, GatewayIntentBits, SlashCommandBuilder} = require('discord.js');
const {NoSubscriberBehavior, createReadStream, joinVoiceChannel,AudioPlayerStatus, createAudioPlayer, createAudioResource, generateDependencyReport  } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const {join} = require('path')


var token = process.env.DISCORD_TOKEN;
var CLIENT_ID = process.env.DISCORD_CLIENT_ID;



const commands = [
    new SlashCommandBuilder()
        .setName('cuehjoin').setDescription('Join to current Voice Channel'),
	new SlashCommandBuilder().setName('cuehballeneros').setDescription('Plays "somos balleneros" futurama song.'),
	new SlashCommandBuilder().setName('cuehstop').setDescription('Stop Current song.'),
	new SlashCommandBuilder().setName('cuehmondongo').setDescription('Plays "mondongo" Goku song'),
    new SlashCommandBuilder().setName('cuehplay').setDescription('Start Play the Url Song')
    .addStringOption(option =>
        option.setName('url').setDescription('Current Youtube video URL')),
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
connection = null;
audioPlayer = null;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
    
	if (interaction.commandName === 'cuehjoin') {
        
        if (interaction.member.voice.channel) {
            let channel = interaction.member.voice.channel;
            connection = joinVoiceChannel({
                channelId: channel.id,
	            guildId: channel.guild.id,
	            adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: false
                }
            );
            audioPlayer = createAudioPlayer();
            connection.subscribe(audioPlayer);
            interaction.reply("Conectando al canal de voz...");
           
        } else {
           interaction.reply("Necesitas conectarte a un canal de voz primero, cueh");
        }
        
	}

    if(interaction.commandName == 'cuehstop'){
        if(audioPlayer!==null){
            audioPlayer.stop();
            interaction.reply("Parando ejecucion....");
        }
    }

    if(interaction.commandName == 'cuehplay'){
        let url = interaction.options.getString('url');
        if(url == null){
            interaction.reply("Falta la URL del video...");
            return;
        }
        console.log(url);
        const stream = ytdl(url, {filter: 'audioonly'});
        const resource = createAudioResource(stream);
        audioPlayer.play(resource);
        audioPlayer.on(AudioPlayerStatus.Playing, () => {
            console.log('The audio player has started playing!');
        });
        interaction.reply("Reproduciendo Video...");
    }
    if(interaction.commandName == 'cuehmondongo'){
        playMondongo();
        interaction.reply("Mondongo");
    }
});

function play(url){
    
   
}

function playMondongo(){
    audioPlayer = createAudioPlayer({behaviors: {
		noSubscriber: NoSubscriberBehavior.Pause,
	}});
   
    const resource = createAudioResource(join('./', 'mondongo.mp3'));
    connection.subscribe(audioPlayer);
    audioPlayer.play(resource);
    audioPlayer.on(AudioPlayerStatus.Playing, () => {
        console.log('The audio player has started playing!');
    });
}

/*
client.on('interactionCreate', message => {


    if (message.content.startsWith('!cuehjoin')) {
        
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
                message.reply("Reproduciendo Video...");
                dispatcher = connection.play(ytdl(urlyt[1], { filter: "audioonly" }));
            } else {
                message.reply("Te falta la URL del video, cueh");
            }

        } else {
            message.reply("Primero conectate a un canal de voz, cueh");
        }
    }
});*/

client.login(token);