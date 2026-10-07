const {recentReleases} = require('../requests/vndbClient.js');
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

const MAX_VALUE = 10;

const data = new SlashCommandBuilder()
    .setName('recentreleases')
    .setDescription('Finds a certain amount of visual novel releases sorted by most recent')
    .addIntegerOption((option) =>
        option
        .setName('number')
        .setDescription(`The amount of visual novels you wish to see (Min: 1, Max: ${MAX_VALUE})`)
        .setMinValue(1)
        .setMaxValue(MAX_VALUE)
        .setRequired(true)
    );

async function execute(interaction) {
    const amount = interaction.options.getInteger('number');
    const releases = await recentReleases(amount);

    if (!releases) {
        return interaction.reply("Error: No releases found... That's pretty strange!");
    } else {
        const embed = new EmbedBuilder()
            .setTitle("Recent Releases")
            .setFooter({text: 'Invading your servers since 2026...'});

        let releasesList = '';

        for (let i = 0; i < releases.length; i++) {
            releasesList += `${i +1}. [${releases[i].title}](https://vndb.org/${releases[i].id}) - ${releases[i].released}\n`;
        }

        embed.setDescription(releasesList);
        return await interaction.reply({embeds: [embed]});
    }
}

module.exports = {data, execute};