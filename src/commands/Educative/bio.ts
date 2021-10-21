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
        
        
        
        if (!joined) return void M.reply('🔎 Provide a place name here are the code \n\n "Argentina":"ar","Armenia":"am","Australia":"au","Austria":"at","Bangladesh":"bd","Belgium":"be","Bosnia and Herzegovina":"ba","Brazil":"br","Bulgaria":"bg","Canada":"ca","China":"cn","Croatia":"hr","Cyprus":"cy","Czech Republic":"cz","Denmark":"dk","Egypt":"eg","Estonia":"ee","Finland":"fi","France":"fr","Georgia":"ge","Germany":"de","Great Britain":"gb","Greece":"gr","Hong Kong":"hk","Hungary":"hk","Iceland":"is","India":"in","Indonesia":"id","Iran":"ir","Israil":"il","Italia":"it","Japan":"jp","Jordan":"jo","Kazakhstan":"kz","Latvia":"lv","Lithuania":"lt","Malaysia":"my","Mexico":"mx","Moldova":"md","Mongolia":"mn","Montenegro":"me","Nepal":"np","Netherlands":"nl","New Zeland":"nz","Nigeria":"ng","Norway":"no","Peru":"pe","Philippines":"ph","Poland":"pl","Portugal":"pt","Romania":"ro","Russia":"ru","Saudi Arabia":"sa","Serbia":"rs","Singapore":"sg","Slovakia":"sk","Slovenia":"si","South Africa":"za","South Korea":"kr","Spain":"es","Sweden":"se","Switzerland":"ch","Taiwan":"tw","Thailand":"th","Turkey":"tr","USA":"us","Uganda":"ug","Ukraine":"ua","Venezuela":"ve","Vietnam":"vn" ')
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
