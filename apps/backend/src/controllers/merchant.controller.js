const MerchantService = require('../services/merchant.service');

// Update business information
const updateBusinessInfo = async (data) => {
    // Validate data here
    return await MerchantService.updateBusinessInfo(data);
};

// Upload KYC documents
const uploadKYC = async (files) => {
    // Validate files here
    return await MerchantService.uploadKYC(files);
};

module.exports = { updateBusinessInfo, uploadKYC };