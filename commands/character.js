const {queryChr} = require('../requests/chrequest');
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {truncateString} = require('../utils.js');

const data = new SlashCommandBuilder()
    .setName('character')
    .setDescription('Finds a character logged in VNDB')
    .addStringOption((option) =>
        option
        .setName('id')
        .setDescription('The character id value (eg. \'c198\'')
        .setRequired(true)
    );

async function execute(interaction) {
    const id = interaction.options.getString('id');
    const chr = await queryChr(id);

    if (!chr) {
        return await interaction.reply("Error: Could not find a character that matched! Try again?");
    } else {
        const embed = new EmbedBuilder()
            .setTitle(chr.name)
            .setURL('https://vndb.org/' + id)
            .setDescription(chr.description)
            .setImage(chr.image.url)
            .setThumbnail(chr.vns[0].image.url)
            .addFields(
                {name: 'Visual Novel', value: `[${chr.vns[0].title}](https://vndb.org/${chr.vns[0].id})`, inline: true},
                {name: 'Role', value: `${chr.vns[0].role} character`, inline: true}
            )
            .setFooter({text: 'Invading your servers since 2026...'});
        
        return await interaction.reply({embeds: [embed]});
    }
}

module.exports = {data, execute};