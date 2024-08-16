import axios from 'axios';

import dotenv from 'dotenv';


dotenv.config();

const FRESHSALES_API_URL = `${process.env.FRESHSALES_DOMAIN}/api/contacts`;
const API_KEY = process.env.FRESHSALES_API_KEY;
console.log("API_KEY: ",API_KEY)
console.log("url: ",FRESHSALES_API_URL)
type contactProp = {
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
}

export const createContactInCRM = async (contact:contactProp) => {
    console.log("calling crm to create with api key :", API_KEY);

    // Adjusted URL if necessary
    const apiUrl = "https://developer.freshsales.io/api/contacts";

    try {
        const response = await axios.post(apiUrl, {
            first_name: contact.first_name,
            last_name: contact.last_name,
            mobile_number: contact.mobile_number
        }, {
            headers: {
                Authorization: `Token token=${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error creating contact:", error);
        throw error;
    }
};



export const getContactFromCRM = async (contact_id: string) => {
    const response = await axios.get(`${FRESHSALES_API_URL}/${contact_id}`, {
        headers: { Authorization: `Token token=${API_KEY}` },
    });
    return response.data;
};

export const updateContactInCRM = async (contact_id: string, data: { email?: string; mobile_number?: string }) => {
    const response = await axios.put(`${FRESHSALES_API_URL}/${contact_id}`, data, {
        headers: { Authorization: `Token token=${API_KEY}` },
    });
    return response.data;
};

export const deleteContactInCRM = async (contact_id: string) => {
    const response = await axios.delete(`${FRESHSALES_API_URL}/${contact_id}`, {
        headers: { Authorization: `Token token=${API_KEY}` },
    });
    return response.data;
};
// Define similar functions for getContact, updateContact, deleteContact.
