const { kapsentcik } = require('../../../../Helpers/Schemas')
class Test extends Command {
    constructor(client) {
        super(client, {
            name: "test",
            aliases: ["test"],
            kapsent: true,
            Founder: true
        });
    }
    async run(client, message, args, embed) {
    
    }
}

module.exports = Test


