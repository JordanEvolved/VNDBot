//Importing dependencies to be used in the /vn function
const {queryVn} = require('../requests/vnrequest.js') 
const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js');
const {truncateString} = require('../utils.js');

const data = new SlashCommandBuilder()
    //creates the vn slash command
    .setName('vn')
    .setDescription('Look up a visual novel by it\'s ID')
    .addStringOption((option) =>
        option
        .setName('id')
        .setDescription('The VNDB id value (e.g \'v12\')')
        .setRequired(true)
    );

async function execute(interaction) {
    //executes the vn slash command, grabs id and fetches from VNDB
    const id = interaction.options.getString('id');
    const vn = await queryVn(id);

   if (!vn) {
    return await interaction.reply('Error: No visual novel found with given id!');
   } else {
 
    vn.description = truncateString(vn.description, 650); //So I can add other embed values without going over

    const embed = new EmbedBuilder()
        .setTitle(vn.title)
        .setURL('https://vndb.org/' + id)
        .addFields(
            {name: 'Released', value: `${vn.released}`, inline: true},
            {name: 'Rating', value: `${vn.rating / 10}`, inline: true},
        )
        .setDescription(vn.description)
        .setImage(vn.image.url)
        .setFooter({text: 'Invading your servers since 2026...'});

    //returns the embed after fully built with api data
    return await interaction.reply({embeds: [embed]});
   }
}

module.exports = {data, execute};