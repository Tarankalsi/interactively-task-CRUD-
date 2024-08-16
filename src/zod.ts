import zod from 'zod';

export const createContactSchema = zod.object({
    first_name: zod.string(),
    last_name: zod.string(),
    email: zod.string().email(),
    mobile_number: zod.string()
});

export const updateContactSchema = zod.object({
    email : zod.string().email().optional(),
    mobile_number: zod.string().optional()
}
)