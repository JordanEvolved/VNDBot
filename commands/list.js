const { queryList, queryAddList, queryDeleteList } = require('../requests/listrequest.js') 
const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const { truncateString, formatDescription } = require('../utils.js');

const MAX_VALUE = 10;

const data = new SlashCommandBuilder()
    //creates the list slash command
    .setName('list')
    .setDescription('Manage a VNDB list')
    .addSubcommand((subcommand) =>
        subcommand
            .setName('view')
            .setDescription('Look up a user\'s list by their ID')
            .addStringOption((option) =>
                option
                    .setName('id')
                    .setDescription('The user id value (e.g \'u3847\')')
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                .setName('sort')
                .setDescription('Which sorting field you would like to use')
                .setRequired(true)
            )
            .addBooleanOption((option) =>
                option
                .setName('reversed')
                .setDescription('Decides whether sorting will be in normal or reversed order')
                .setRequired(true)
            )
    )
    //creates the add command
    .addSubcommand((subcommand) =>
        subcommand
            .setName('add')
            .setDescription('Add an item to the connected list')
            .addStringOption((option) =>
                option
                .setName('id')
                .setDescription('The VNDB id value (e.g \'v12\')')
                .setRequired(true)
            )
            .addIntegerOption((option) =>
                option
                .setName('vote')
                .setDescription('The score given to this visual novel (1-100)')
                .setRequired(true)
            )
            .addStringOption((option) =>
                option
                .setName('start-date')
                .setDescription('The date this visual novel was started (YYYY-MM-DD)')
                .setRequired(true)
            )
            .addStringOption((option) =>
                option
                .setName('end-date')
                .setDescription('The date this visual novel was ended (YYYY-MM-DD)')
                .setRequired(true)
            )
    )
    //creates the delete command
    .addSubcommand((subcommand) =>
        subcommand
            .setName('delete')
            .setDescription('Delete an item from the connected list')
            .addStringOption((option) =>
                option
                .setName('id')
                .setDescription('The VNDB id value (e.g \'v12\')')
                .setRequired(true)
            )
    );

async function viewList(interaction) {
    //executes the list slash command, grabs id and fetches from VNDB
    const id = interaction.options.getString('id');
    const sorting = interaction.options.getString('sort');
    const reversed = interaction.options.getBoolean('reversed');
    
    const list = await queryList(id, sorting, reversed);

    if (!list) {
        return await interaction.reply('Error: No user list found with given id!');
    } else {
        const embed = new EmbedBuilder()
            .setTitle(`${id}'s List`) //need to add a request that pulls username with id, which I will call here later
            .setURL('https://vndb.org/' + id)
            .setFooter({text: 'Invading your servers since 2026...'});

        let listContent = '';
        let vntitle;

        for (let i = 0; i < MAX_VALUE; i++) {
            vntitle = list[i].vn.title;
            vntitle = truncateString(vntitle, 30);

            listContent += `[${vntitle}](https://vndb.org/${list[i].id}) - ${list[i].labels[0].label}\nStarted: ${list[i].started} | Finished: ${list[i].finished} | Vote: ${list[i].vote / 10}\n`;
        }

        embed.setDescription(listContent);

        //returns the embed after fully built with api data
        return await interaction.reply({embeds: [embed]});
   }

}

async function addList(interaction) {
    //executes the list add slash command, uses error handling in case of failure
    const id = interaction.options.getString('id');
    const vote = interaction.options.getInteger('vote');
    const start = interaction.options.getString('start-date');
    const end = interaction.options.getString('end-date');
    
    try {
        await queryAddList(id, vote, start, end);
    } catch (error) {
        return await interaction.reply(`Failed! ${id} was not added to the list, please try again.`);
    }

    return await interaction.reply(`Success! ${id} was added to the list!`);

}

async function deleteList(interaction) {
//executes the list add slash command, uses error handling in case of failure
    const id = interaction.options.getString('id');
    
    try {
        await queryDeleteList(id);
    } catch (error) {
        return await interaction.reply(`Failed! ${id} was not deleted from the list, please try again.`);
    }

    return await interaction.reply(`Success! ${id} was deleted from the list!`);

}

async function execute(interaction) {
    //switch which decides which subcommand is called
    let subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
        case 'view':
            await viewList(interaction);
            break;

        case 'add':
            await addList(interaction);
            break;
        
        case 'delete':
            await deleteList(interaction);
            break;
    }

}

module.exports = {data, execute};