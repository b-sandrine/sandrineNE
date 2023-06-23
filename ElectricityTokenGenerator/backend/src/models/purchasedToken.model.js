// models/purchasedToken.js
const mongoose = require('mongoose');

const purchasedTokenSchema = new mongoose.Schema({
  meterNumber: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6,
  },
  token: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 8,
  },
  tokenStatus: {
    type: String,
    enum: ['USED', 'NEW', 'EXPIRED'],
    default: 'NEW',
  },
  tokenValueDays: {
    type: Number,
    required: true,
    min: 1,
    max: 365 * 5, // Maximum 5 years
  },
  purchasedDate: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const PurchasedToken = mongoose.model('purchased_tokens', purchasedTokenSchema);

module.exports =  PurchasedToken;
