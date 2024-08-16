import connection from "../db";


export const createContactInDB = async (contact: any) => {
    const [result] = await connection.execute(
        'INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)',
        [contact.first_name, contact.last_name, contact.email, contact.mobile_number]
    );
    const contactId = (result as any).insertId;

    return {
        id: contactId,
        ...contact
    };
};

export const getContactFromDB = async (contact_id: string) => {
    const [rows] = await connection.execute(
        'SELECT * FROM contacts WHERE id = ?',
        [contact_id]
    );
    const contact = (rows as any)[0];
    return contact;
};

export const updateContactInDB = async (contact_id: string, data: { email?: string; mobile_number?: string }) => {
    const { email, mobile_number } = data;

    // Construct the SQL query dynamically based on which fields are provided
    let query = 'UPDATE contacts SET';
    const params: any[] = [];

    if (email) {
        query += ' email = ?,';
        params.push(email);
    }

    if (mobile_number) {
        query += ' mobile_number = ?,';
        params.push(mobile_number);
    }

    // Remove trailing comma and add WHERE clause
    query = query.slice(0, -1) + ' WHERE id = ?';
    params.push(contact_id);

    const [result] = await connection.execute(query, params);

    // Fetch and return the updated contact
    const [rows] = await connection.execute(
        'SELECT * FROM contacts WHERE id = ?',
        [contact_id]
    );
    const contact = (rows as any)[0]; // Assuming the result is an array
    return contact;
};

export const deleteContactInDB = async (contact_id: string) => {
    const [result] = await connection.execute(
        'DELETE FROM contacts WHERE id = ?',
        [contact_id]
    );
    return result;
};

// Define similar functions for getContact, updateContact, deleteContact.

