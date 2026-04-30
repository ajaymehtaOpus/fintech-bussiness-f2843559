const db = require('../database');

// Update business information in the database
const updateBusinessInfo = async (data) => {
    const { merchantId, businessName, businessAddress } = data;
    const query = 'UPDATE merchants SET business_name = $1, business_address = $2 WHERE id = $3 RETURNING *';
    const values = [businessName, businessAddress, merchantId];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Upload KYC documents
const uploadKYC = async (files) => {
    // Logic to handle file upload and save to database
    // This is a placeholder for actual implementation
    return { message: 'KYC documents processed', files: files }; 
};

module.exports = { updateBusinessInfo, uploadKYC };