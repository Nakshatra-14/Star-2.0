import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { join } from 'path'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'


export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'hi',
            description: 'Well....',
            category: 'general',
            dm: true,
            usage: `${client.config.prefix}hi`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
       const n = [
            './assets/videos/star-hi.mp4'
        ]
        let star = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: star }, MessageType.video, {
            mimetype: Mimetype.gif,
            caption: `Helloo ${M.sender.username}, its me Star. Im am always there for your *.help* \n` }
        )
    }
}
          
