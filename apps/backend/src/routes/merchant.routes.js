const express = require('express');
const { updateBusinessInfo, uploadKYC } = require('../controllers/merchant.controller');

const router = express.Router();

// Route to update business information
router.put('/update-business-info', async (req, res) => {
    try {
        const result = await updateBusinessInfo(req.body);
        res.status(200).json({ message: 'Business information updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating business information', error: error.message });
    }
});

// Route to upload KYC documents
router.post('/upload-kyc', async (req, res) => {
    try {
        const result = await uploadKYC(req.files);
        res.status(200).json({ message: 'KYC documents uploaded successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading KYC documents', error: error.message });
    }
});

module.exports = router;