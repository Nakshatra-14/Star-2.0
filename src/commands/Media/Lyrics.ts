import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import yts from 'yt-search'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'lyrics',
            description: 'Gives you lyrics with song playable on WhatsApp',
            category: 'media',
            aliases: ['ly'],
            usage: `${client.config.prefix}yts [term]`,
            dm: true,
            baseXp: 20
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('Please provide a search term')
        const term = joined.trim()
        const { videos } = await yts(term + " lyrics song")
        if (!videos || videos.length <= 0) return void M.reply(`No Matching videos found for the term *${term}*`)
        let text = `There will be Lyrics here in the future👾\nThis command is under Development`

        this.client.sendMessage(M.from, text, MessageType.extendedText, {
            quoted: M.WAMessage,
            contextInfo: {
                externalAdReply: {
                    title: `Search Term: ${term}`,
                    body: `👾 Handcrafted for you by Kaoi 👾`,
                    mediaType: 2,
                    thumbnailUrl: videos[0].thumbnail,
                    mediaUrl: videos[0].url
                }
            }
        })
    }
}