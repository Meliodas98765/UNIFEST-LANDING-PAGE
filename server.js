/**
 * Backend server to proxy Zoho CRM API calls
 * This avoids CORS issues by making API calls from the server
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Zoho CRM API configuration
const ZOHO_API_KEY = '1003.04c1f11491a1a6864d436ce7eb27ba76.949b62ff6eff97771f568eb01c6d3652';
const ZOHO_API_URL = 'https://www.zohoapis.in/crm/v7/functions/create_social_leads_api1/actions/execute';

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Create lead endpoint
app.post('/api/create-lead', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            mobile,
            email,
            itemName,
            expectedVisitDate,
            leadSource = 'TeleCHAMP',
            campaignName = 'LANDING PAGE PAY',
            leadCampaignName = 'LANDING PAGE PAY',
            adName = 'LANDING PAGE PAY',
            utm = 'LANDING PAGE PAY',
            utmCampaign = 'LANDING PAGE PAY',
            utmTerm = 'LANDING PAGE PAY',
            utmContent = 'LANDING PAGE PAY',
            utmMedium = 'fb',
            utmSource = 'FB',
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !phone || !email || !itemName) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: firstName, lastName, phone, email, itemName',
            });
        }

        // Format expected visit date (default to 7 days from now if not provided)
        const visitDate = expectedVisitDate ||
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        // Build query parameters - only include non-empty values
        // Note: itemName value is sent to productName field in CRM
        const queryParams = new URLSearchParams({
            auth_type: 'apikey',
            zapikey: ZOHO_API_KEY,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            mobile: mobile || phone,
            email: email,
            productName: itemName, // Send itemName value to productName field
            expected_visit_date: visitDate,
        });

        // Add optional fields only if they have values
        if (leadSource) queryParams.append('leadSource', leadSource);
        if (campaignName) queryParams.append('campaignName', campaignName);
        if (leadCampaignName) queryParams.append('leadCampaignName', leadCampaignName);
        if (adName) queryParams.append('adName', adName);
        if (utm) queryParams.append('utm', utm);
        if (utmCampaign) queryParams.append('utm_campaign', utmCampaign);
        if (utmTerm) queryParams.append('utm_term', utmTerm);
        if (utmContent) queryParams.append('utm_content', utmContent);
        if (utmMedium) queryParams.append('utm_medium', utmMedium);
        if (utmSource) queryParams.append('utm_source', utmSource);

        const url = `${ZOHO_API_URL}?${queryParams.toString()}`;

        // Make request to Zoho CRM API
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseText = await response.text();
        let responseData;

        try {
            responseData = JSON.parse(responseText);
        } catch (e) {
            // If response is not JSON, return the text
            responseData = { message: responseText };
        }

        if (!response.ok) {
            console.error('Zoho CRM API Error:', response.status, responseData);
            return res.status(response.status).json({
                success: false,
                message: `Failed to create lead: ${response.status} ${response.statusText}`,
                error: responseData,
            });
        }

        // Check if the response indicates success
        if (responseData.status === 'success' || responseData.code === 'SUCCESS' || response.ok) {
            return res.json({
                success: true,
                message: 'Lead created successfully',
                leadId: responseData.data?.id || responseData.details?.id,
                data: responseData,
            });
        }

        return res.status(400).json({
            success: false,
            message: responseData.message || 'Failed to create lead in CRM',
            data: responseData,
        });
    } catch (error) {
        console.error('Error creating lead in CRM:', error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📡 Zoho CRM proxy endpoint: http://localhost:${PORT}/api/create-lead`);
});
