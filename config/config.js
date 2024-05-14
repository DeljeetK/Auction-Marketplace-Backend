const config = {
    local: {
        DB: {
            HOST: "localhost",
            PORT: "27017",
            DATABASE: "marketplace",
            UserName: "marketplace",
            Password: "Password123#@!",
        },
    },
    port: {
        PORT: "4567",
    },
    token: {
        JWT_SECRET: "qwertyuiop"
    },
    saltRounds: {
        rounds: 10
    },
    staging: {
        DB: {
            HOST: "54.201.160.69",
            PORT: "58173",
            DATABASE: "rlps",
            // DATABASE1: "AuthDB",
            UserName: "rlps",
            Password: "RJMtygb22vtGFV",
        },
    }
}

module.exports = config;