const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

let schema = new Schema({
    name: { type: Schema.Types.String },
    executerId: { type: Schema.Types.ObjectId, ref: 'Executer' }, // исполнитель
    genreId: { type: Schema.Types.ObjectId, ref: 'Genre' }, // жанр
    year: { type: Number }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
schema.plugin(mongoosePaginate);
schema.plugin(mongooseAggregatePaginate);

const Model = mongoose.model('Song', schema); // Song
module.exports = (registry) => {
    registry['Song'] = Model;
};