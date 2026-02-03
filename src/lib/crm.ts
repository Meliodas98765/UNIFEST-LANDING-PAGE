/**
 * Zoho CRM Lead Creation Utility
 * Creates leads in Zoho CRM via API through backend proxy
 */

interface CreateLeadParams {
    firstName: string;
    lastName: string;
    phone: string;
    mobile: string;
    email: string;
    itemName: string;
    expectedVisitDate?: string;
    leadSource?: string;
    campaignName?: string;
    leadCampaignName?: string;
    adName?: string;
    utm?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    utmMedium?: string;
    utmSource?: string;
}

/**
 * Extract UTM parameters from URL
 */
export function getUTMParameters(): {
    utm?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    utmMedium?: string;
    utmSource?: string;
} {
    if (typeof window === 'undefined') {
        return {};
    }

    const urlParams = new URLSearchParams(window.location.search);
    
    return {
        utm: urlParams.get('utm') || undefined,
        utmCampaign: urlParams.get('utm_campaign') || urlParams.get('utmCampaign') || undefined,
        utmTerm: urlParams.get('utm_term') || urlParams.get('utmTerm') || undefined,
        utmContent: urlParams.get('utm_content') || urlParams.get('utmContent') || undefined,
        utmMedium: urlParams.get('utm_medium') || urlParams.get('utmMedium') || undefined,
        utmSource: urlParams.get('utm_source') || urlParams.get('utmSource') || undefined,
    };
}

/**
 * Remove empty/undefined values from object
 */
function removeEmptyValues<T extends Record<string, any>>(obj: T): Partial<T> {
    const cleaned: Partial<T> = {};
    for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined && value !== null && value !== '') {
            cleaned[key as keyof T] = value;
        }
    }
    return cleaned;
}

interface CreateLeadResponse {
    success: boolean;
    message?: string;
    leadId?: string;
}

// Backend API endpoint (proxy to avoid CORS issues)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const CREATE_LEAD_ENDPOINT = `${API_BASE_URL}/api/create-lead`;

/**
 * Creates a lead in Zoho CRM via backend proxy
 * Only sends non-empty values
 */
export async function createLeadInCRM(params: CreateLeadParams): Promise<CreateLeadResponse> {
    try {
        // Remove empty values before sending
        const cleanedParams = removeEmptyValues(params);
        
        const response = await fetch(CREATE_LEAD_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cleanedParams),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            console.error('Backend API Error:', errorData);
            return {
                success: false,
                message: errorData.message || `Failed to create lead: ${response.status} ${response.statusText}`,
            };
        }

        const data = await response.json();

        if (data.success) {
            return {
                success: true,
                message: data.message || 'Lead created successfully',
                leadId: data.leadId,
            };
        }

        return {
            success: false,
            message: data.message || 'Failed to create lead in CRM',
        };
    } catch (error) {
        console.error('Error creating lead in CRM:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'An unexpected error occurred. Please check if the backend server is running.',
        };
    }
}
