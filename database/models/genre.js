const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

let schema = new Schema({
    name: { type: Schema.Types.String }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
schema.plugin(mongoosePaginate);
schema.plugin(mongooseAggregatePaginate);

const Model = mongoose.model('Genre', schema); // Genre
module.exports = (registry) => {
    registry['Genre'] = Model;
};