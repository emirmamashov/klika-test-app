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

const Model = mongoose.model('Executer', schema); // Executer
module.exports = (registry) => {
    registry['Executer'] = Model;
};