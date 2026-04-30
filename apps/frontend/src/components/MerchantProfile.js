import React, { useState } from 'react';
import axios from 'axios';

const MerchantProfile = () => {
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [kycFiles, setKycFiles] = useState(null);

    const handleUpdate = async () => {
        try {
            const response = await axios.put('/api/merchant/update-business-info', { businessName, businessAddress });
            alert(response.data.message);
        } catch (error) {
            alert('Error updating business information: ' + error.message);
        }
    };

    const handleKYCUpload = async (event) => {
        const formData = new FormData();
        for (let file of event.target.files) {
            formData.append('files', file);
        }
        try {
            const response = await axios.post('/api/merchant/upload-kyc', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
            alert(response.data.message);
        } catch (error) {
            alert('Error uploading KYC documents: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Merchant Profile</h2>
            <input type='text' placeholder='Business Name' value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            <input type='text' placeholder='Business Address' value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} />
            <button onClick={handleUpdate}>Update Business Info</button>
            <input type='file' multiple onChange={handleKYCUpload} />
        </div>
    );
};

export default MerchantProfile;