import { Router } from 'express';
import { createContactSchema, updateContactSchema } from '../zod';
import { createContactInCRM, deleteContactInCRM, getContactFromCRM, updateContactInCRM } from '../services/crmService';
import { createContactInDB, deleteContactInDB, getContactFromDB, updateContactInDB } from '../services/dbService';

enum DataStore {
    CRM = 'CRM',
    DATABASE = 'DATABASE'
}

const contactRouter = Router();

contactRouter.post('/createContact', async (req, res) => {
    const { data_store, ...contact } = req.body;
    

    const { success, error } = createContactSchema.safeParse(contact);
    if (!success) {
        return res.status(400).json({
            success: false,
            error: "Zod Validation Error",
            message: error.message
        });
    }

    try {
        let response;
        

        if (data_store.toUpperCase() === DataStore.CRM) {
            response = await createContactInCRM(contact);
        } else if (data_store.toUpperCase() === DataStore.DATABASE) {
            response = await createContactInDB(contact);
        } else {
            return res.status(404).json({
                success: false,
                message: "Invalid Data Store"
            });
        }

 
        return res.status(200).json({
            success: true,
            message: "Contact created successfully",
            data: response
        });

    } catch (error) {
    // console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error : error
        });
    }
});


contactRouter.get('/getContact', async (req, res) => {
    const { contact_id, data_store } = req.body;
    

    try {
        let response;

        if (data_store.toUpperCase() === DataStore.CRM) {
            response = await getContactFromCRM(contact_id);
        } else if (data_store.toUpperCase() === DataStore.DATABASE) {
            response = await getContactFromDB(contact_id);
        } else {
            return res.status(404).json({
                success: false,
                message: "Invalid Data Store"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact retrieved successfully",
            data: response
        });

    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

contactRouter.post('/updateContact', async (req, res) => {
    const { contact_id, data_store , ...data } = req.body;
    
   
    const { success, error } = updateContactSchema.safeParse(data);
    if (!success) {
        return res.status(400).json({
            success: false,
            error: "Zod Validation Error",
            message: error.message
        });
    }

    try {
        let response;

       
        if (data_store.toUpperCase() === DataStore.CRM) {
            response = await updateContactInCRM(contact_id , data);
        } else if (data_store.toUpperCase() === DataStore.DATABASE) {
            response = await updateContactInDB(contact_id, data);
        } else {
            return res.status(404).json({
                success: false,
                message: "Invalid Data Store"
            });
        }

        
        return res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            data: response
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

contactRouter.delete('/deleteContact', async (req, res) => {
    const { contact_id, data_store } = req.body;

    
    if (!contact_id || !data_store) {
        return res.status(400).json({
            success: false,
            message: "contact_id and data_store are required"
        });
    }

    try {
        let response;

        if (data_store.toUpperCase() === DataStore.CRM) {
            response = await deleteContactInCRM(contact_id);
        } else if (data_store.toUpperCase() === DataStore.DATABASE) {
            response = await deleteContactInDB(contact_id);
        } else {
            return res.status(404).json({
                success: false,
                message: "Invalid Data Store"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Contact deleted successfully",
            data: response
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

export default contactRouter;
