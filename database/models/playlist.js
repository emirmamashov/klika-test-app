const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

let schema = new Schema({
    name: { type: Schema.Types.String },
    songId: { type: Schema.Types.ObjectId, ref: 'Song' }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
schema.plugin(mongoosePaginate);
schema.plugin(mongooseAggregatePaginate);

const Model = mongoose.model('Playlist', schema); // Playlist
module.exports = (registry) => {
    registry['Playlist'] = Model;
};