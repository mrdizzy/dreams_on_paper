var cradle = require('cradle'),
    connection = new(cradle.Connection)('https://mrdizzy.cloudant.com', 443, {
        auth: {
            username: "mrdizzy",
            password: "world1"
        },
        cache: false
    }),
    databases = {}

databases.connection = connection;
databases.dreamsonpaper = connection.database("dreamsonpaper");

module.exports = databases;
