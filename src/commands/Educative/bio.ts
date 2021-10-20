import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'
import axios from 'axios'
export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'biodata',
            description: 'get a random biodata',
            aliases: ['bio'],
            category: 'educative',
            usage: `${client.config.prefix}biodata [name]`
        })
    }
    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        
        
        
        if (!joined) return void M.reply('🔎 Provide a place name')
        const term = joined.trim()
        await axios.get(`https://api.abirhasan.wtf/bioDataGenerator?countryCode=${term}`)
        .then((response) => {
                // console.log(response);
                const text = `📌 *Generated Biodata Results*\n\n *Name :* ${response.data.Name}\n *Age :* ${response.data.Age} \n *Address :* ${response.data.Address} \n *City :* ${response.data.City} \n *Gender :* ${response.data.Gender} \n *Ethnicity:* ${response.data.Ethnicity} \n *Date Of Birth :* ${response.data.DateOfBirth} \n *Phone Number :* ${response.data.CompanyPhone} \n *Email :* ${response.data.CompanyEmail} \n *Credit Card Number :* ${response.data.CreditCardNumber} \n *Credit Card Expiry Date :* ${response.data.CreditCardExpiry} \n *Credit Card CVV :* ${response.data.CreditCardCVV2} \n *Credit Card Type :* ${response.data.CreditCardType} `
                M.reply(text);
            })
            .catch(err => {
                M.reply(`Sorry, couldn't find country *${term}* \n 📝 *Note:* Capital Letters do not work here. \n Error: ${err}`)
            }
            )
    };
}
