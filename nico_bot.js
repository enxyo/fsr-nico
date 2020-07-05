const config = require('./cfg/config');

const Discord = require("discord.js");
const client = new Discord.Client();
const token = config.discord.token;

// Set the prefix
const prefix = "!";

// Rekruitment ja/nein
var status = 'ja';


client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	client.user.setPresence({ game: { name: '!help for help', type: 0 } });
});

// Welcome

client.on('guildMemberAdd', member => {
  if (status === 'ja') {
    member.guild.defaultChannel.send(`Willkommen bei der FSR, ${member}! \n\nWir rekrutieren?: >>> JA <<<\nBewerber Kontakt: <@&630478991211626547>\nHier findest du alle Informationen zur Bewerbung bei der FSR: <http://bit.ly/2qBgvUC> \nOder einfach jemanden vom <@&630478991211626547> anschreiben.`);
  }
  if (status === 'nein') {
	member.guild.defaultChannel.send(`Willkommen bei der FSR, ${member}! \n\nWir rekrutieren?: >>> NEIN <<<\nBewerber Kontakt: <@&630478991211626547>\nHier findest du alle Informationen zur Bewerbung bei der FSR: <http://bit.ly/2qBgvUC> \nOder einfach jemanden vom <@&630478991211626547> anschreiben.`);
  }
});

// Commands

client.on("message", (message) => {
	if(message.author.bot) return;
	if(message.content.indexOf(prefix) !== 0) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command  === 'nico') {
		message.reply('Hallo ich bin **N.I.C.O.**\nDein freundlicher Non Interchangeable Cyno Operator');
	}

	if (command  === 'n.i.c.o.') {
		message.reply('Hallo ich bin **N.I.C.O.**\nDein freundlicher Non Interchangeable Cyno Operator');
	}

	if (command  === 'commands') {
		message.reply('\n__Verfuegbare Befehle:__\n**!help** oder **!commands** - Diese Ausgabe\n**!info** - Informationen fuer Bewerber\n**!ts** - Teamspeak IP\n**!forum** - Link zum Forum\n**!groups** - Offene Gruppen + How2Join\n**!nico** - Unser freundlicher Cyno Operator');
	}

	if (command  === 'help') {
		message.reply('\n__Verfuegbare Befehle:__\n**!help** oder **!commands** - Diese Ausgabe\n**!info** - Informationen fuer Bewerber\n**!ts** - Teamspeak IP\n**!forum** - Link zum Forum\n**!groups** - Offene Gruppen + How2Join\n**!nico** - Unser freundlicher Cyno Operator');
	}

	if (command  === 'groups') {

		message.reply('Folgende offene Gruppen sind verfuegbar:\n\n**arma** - Hier dreht sich alles um ARMA 3\n**tts** - Tabletop Simulator, Freunde der Brettspiele\n**tanks** - World of Tanks\n**poe** - Der Weg zur Einsamkeit\n**eft** - Escape from Tarkov\n\nMit ***!join <group>*** bzw. ***!leave <group>*** koennt ihr Gruppen beitreten oder verlassen.');
	}

	if (command  === 'test') {
		//var author = message.author.id;
		//var myRole = message.guild.roles.find("name", "tabletopsimulator");
		//let role = message.guild.roles.get("368039356344303617");
		//message.reply('User ID: ' + author + 'ttts role: ' + myRole + role);

	}

// Rekruitment commands

	if (command  === 'info') {
		if (status === 'ja') {
			message.reply('\nWir rekrutieren?: >>> JA <<<\nBewerber Kontakt: <@&630478991211626547>\nHier findest du alle Informationen zur Bewerbung bei der FSR: http://bit.ly/2qBgvUC');
		}
		if (status === 'nein') {
			message.reply('\nWir rekrutieren?: >>> NEIN <<<\nBewerber Kontakt: <@&630478991211626547>\nHier findest du alle Informationen zur Bewerbung bei der FSR: http://bit.ly/2qBgvUC');
		}
	}

	if (command  === 'ts') {
		message.reply('Teamspeak IP: 85.214.142.178');
	}

	if (command  === 'forum') {
		message.reply('Unser Forum findest du hier: https://www.free-space-ranger.org/forum/');
	}

	if (command  === 'set_close') {
		status = 'nein';
		message.reply('Wir rekrutieren?: NEIN');
	}

	if (command  === 'set_open') {
		status = 'ja';
		message.reply('Wir rekrutieren?: JA');
	}

// Gruppen commands

	if (command  === 'join') {
		let member = message.member;
		let group_short = args[0];

		if (group_short === 'tts'){
			var group = "368039356344303617";
		}

		if (group_short === 'tanks'){
			var group = "314103427619880968";
		}

		if (group_short === 'arma'){
			var group = "368405104614965248";
		}
                if (group_short === 'poe'){
                        var group = "387612970252894218";
                }
                if (group_short ==='eft'){
			var group = "399970510928216075";
		}

		if(message.member.roles.has(group)) {
			message.reply('du bist bereits in der Gruppe');
		} else {
			member.addRole(group).catch(console.error);
			message.reply('du bist der Gruppe beigetreten.');
		}
	}

	if (command  === 'leave') {
		let member = message.member;
		let group_short = args[0];

		if (group_short === 'tts'){
			var group = "368039356344303617";
		}

		if (group_short === 'tanks'){
			var group = "314103427619880968";
		}

		if (group_short === 'arma'){
			var group = "368405104614965248";
		}

                if (group_short === 'poe'){
                        var group = "387612970252894218";
                }
		if (group_short === 'eft'){
			var group = "398856812809682944";
		}

		if(message.member.roles.has(group)) {
			member.removeRole(group).catch(console.error);
			message.reply('du bist aus der Gruppe ausgetreten.');
		} else {
			message.reply('du bist nicht in der Gruppe');
		}
	}

});

client.login(token);
