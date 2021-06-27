require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require("node-schedule");

// Schedule
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(5, 6)]; // Friday and Saturday
rule.hour = [new schedule.Range(9, 21)]; //10 am to 10 pm
rule.minute = 0;
rule.tz = "Asia/Manila";

// Discord
const TOKEN = process.env.TOKEN;

async function sendMessage() {
  const channel = await client.channels.cache.find(
    (channel) => channel.name === "satoorday-dramas"
  );

  try {
    channel.send(`It's Time @everyone`);
  } catch (error) {
    console.log(error);
  }
}

client.once("ready", () => {
  const job = schedule.scheduleJob(rule, function () {
    sendMessage();
  });
});

client.on("message", (message) => {
  const prefix = "!";
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "clear") {
    // Todo clear bot messages
  }
});

// Login Bot
client.login(TOKEN);
