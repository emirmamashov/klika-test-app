module.exports = {
    WSPORT: 3003,
    ROOT_DIR: __dirname,
    DB_URL: process.env.DB_URL || 'mongodb://localhost/klikatest',
    Models: {
        song: {
            model: 'Song',
            name: 'Песня'
        },
        executer: {
            model: 'Executer',
            name: 'Исполнитель'
        },
        genre: {
            model: 'Genre',
            name: 'Жанр'
        }
    }
}
