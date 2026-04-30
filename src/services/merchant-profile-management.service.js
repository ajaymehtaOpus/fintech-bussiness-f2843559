const db = require('../database');

// Function to update business information
const updateBusinessInfo = async (data) => {
    const { merchantId, businessName, businessAddress } = data;
    // Validate input data
    if (!merchantId || !businessName || !businessAddress) {
        throw new Error('Missing required fields');
    }
    // Update the business information in the database
    const result = await db.query('UPDATE merchants SET business_name = $1, business_address = $2 WHERE id = $3 RETURNING *', [businessName, businessAddress, merchantId]);
    return result.rows[0];
};

// Function to upload KYC documents
const uploadKYC = async (data) => {
    const { merchantId, kycDocument } = data;
    // Validate input data
    if (!merchantId || !kycDocument) {
        throw new Error('Missing required fields');
    }
    // Logic to upload KYC document (e.g., save to storage, update database)
    // For simplicity, we assume the document is saved successfully
    await db.query('UPDATE merchants SET kyc_document = $1 WHERE id = $2', [kycDocument, merchantId]);
    return { message: 'KYC document uploaded successfully' };
};

module.exports = {
    updateBusinessInfo,
    uploadKYC
};