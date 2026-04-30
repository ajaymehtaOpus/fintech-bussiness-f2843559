const express = require('express');
const router = express.Router();
const merchantProfileService = require('../services/merchant-profile-management.service');

// Route to update merchant business information
router.put('/update', async (req, res) => {
    try {
        const updatedProfile = await merchantProfileService.updateBusinessInfo(req.body);
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error updating business information', error: error.message });
    }
});

// Route to upload KYC documents
router.post('/upload-kyc', async (req, res) => {
    try {
        const kycResponse = await merchantProfileService.uploadKYC(req.body);
        res.status(201).json(kycResponse);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading KYC documents', error: error.message });
    }
});

module.exports = router;