import { APP_CONFIG } from '../config';

/**
 * Universal Sync Service to push data to Google Sheets
 * @param {string} type - 'clients', 'invoices', 'payments', etc.
 * @param {object} payload - The data object to save
 */
export const syncToSheets = async (type, payload) => {
    if (!APP_CONFIG.GOOGLE_SHEETS_URL || !APP_CONFIG.SYNC_ENABLED) {
        console.warn('Sync skipped: GOOGLE_SHEETS_URL not configured.');
        return;
    }

    try {
        // We include a timestamp for sheet logging
        const dataToSync = {
            type,
            payload: {
                ...payload,
                sync_timestamp: new Date().toISOString()
            }
        };

        // Note: Google Apps Script redirect requires 'no-cors' or specific handling 
        // if you want to read the response, but 'no-cors' is safest for "send and forget"
        await fetch(APP_CONFIG.GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSync),
        });

        console.log(`Successfully synced ${type} to Google Sheets.`);
    } catch (error) {
        console.error(`Error syncing ${type} to Google Sheets:`, error);
    }
};
