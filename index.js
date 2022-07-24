const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config()
app.get('/', (req, res) => res.send(client.commands.filter(a => a.description)));

app.listen(port, () => console.log(`[Website Iniciado] | https://localhost:${port}`));

// [ - CONSTANTES ]
const Discord = require("discord.js");
require("discord-inline-reply");
const client = new Discord.Client();
const fs = require("fs");
require("discord-buttons")(client);
require("./replies.js");

// [ - CLIENT ASSETS ]

client.commands = new Discord.Collection();
client.db = require("./database");
client.cor = "#69cf65";
client.games = "https://animesonlinegames.com/";
client.orion = "https://animesorionvip.com/";
client.hd = "https://myanimelist.vip/";
client.goyabu = "https://goyabu.vip/";
client.ok = "https://i.imgur.com/01u54sR.png";
client.warn = "https://i.imgur.com/8gktqyJ.png";
client.err = "https://i.imgur.com/NGy07fZ.png";
client.catToken = process.env.catToken;

// [ - EVENTO MESSAGE ]

process.on("uncaughtException", e => {
	console.log(`-> Exceção não capturada: ${e.toString()}`);
});

process.on("unhandledRejection", (r, p) => {
	console.log(`-> Rejeição não tratada: ${r.stack || r}`);
});

// [ - HANDLER ]

const folders = fs.readdirSync("./comandos");
const events = fs.readdirSync("./eventos").filter(file => file.endsWith(".js"));
for (const folder of folders) {
	const commands = fs
		.readdirSync(`./comandos/${folder}`)
		.filter(file => file.endsWith(".js"));
	for (const file of commands) {
		const command = require(`./comandos/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

for (const file of events) {
	const event = require(`./eventos/${file}`);
	if (event.type == "ready") {
		client.on(event.type, () => event.run(client));
	} else if (event.type == "guildMemberUpdate") {
		client.on(event.type, (oldMember, newMember) =>
			event.run(oldMember, newMember, client)
		);
	} else if (event.type == "messageDelete") {
		client.on(event.type, messageDelete => event.run(messageDelete, client));
	} else if (event.type == "messageUpdate") {
		client.on(event.type, (OldMessage, NewMessage) =>
			event.run(OldMessage, NewMessage, client)
		);
	} else {
		client.on(event.type, message => event.run(message, client));
	}
}

// [ - EVENTO READY / PRESENCE DO BOT ]

client.on("ready", async () => {
	client.user.setActivity(`Moderar`, {
		type: 5
	});
});

// [ - CALENDÁRIO ]

/*async function getAnimeCalendarFromMyAnimeList() {
	const response = await axios.get(client.games + 'calendario', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0' } });

	const $ = cheerio.load(response.data);

	const calendary = [];

	const days = [];

	$('ul#calen-nav').each((_index, elem) => {
		$(elem)
			.find('li > a')
			.each((_index, elem) => {
				const day = $(elem).text();

				days.push(day);
			});
	});

	$('div.calen-content').each((index, elem) => {
		const animes = [];

		$(elem)
			.find('section.animeItem')
			.each((_index, elem) => {
				const anime = {};

				anime.name = $(elem).find('a > div.tituloAnime').text();

				anime.link = $(elem).find('a').attr('href');

				animes.push(anime);
			});

		calendary.push({ day: days[index], animes });
	});

	return calendary;
}

async function calendario() {
	const doc = await client.db.Guilds.findOne({ _id: "531574473644703744" });
	const data = await getAnimeCalendarFromMyAnimeList();

	var strdias = moment().format("dddd");
	var resultdias = strdias
		.replace("segunda-feira", "Segunda-Feira")
		.replace("terça-feira", "Terça-Feira")
		.replace("quarta-feira", "Quarta-Feira")
		.replace("quinta-feira", "Quinta-Feira")
		.replace("sexta-feira", "Sexta-Feira")
		.replace("sábado", "Sábado")
		.replace("domingo", "Domingo");

	const datamapeada = data.filter(r => r.day === resultdias).map(r => r.animes.map(anime => { return `🟢 **[${anime.name}](${anime.link})**`; }))[0];

	if (doc.diadocalendario.includes(resultdias)) return;
	else {

		let calendarioEmbed = new Discord.MessageEmbed()
			.setAuthor("» Calendário de " + strdias, "https://i.imgur.com/hddD6xc.png")
			.setDescription(datamapeada)
			.setColor(client.cor)
			.setTimestamp()
		client.channels.cache.get("874292080535547945").send(calendarioEmbed);
		doc.diadocalendario = resultdias;
		doc.save();
	}
}*/

client
	.login(process.env.token)
	.then(() => console.log(`[Bot Iniciado] | Animes Online Games`));