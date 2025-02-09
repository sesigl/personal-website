import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { subscribeToNewsletter } from './subscribeToNewsletter';

export const server = {
    subscribeToNewsletter: defineAction({
        input: z.object({
            email: z.string(),
        }),
        handler: async (input) => {
            try {
                return await subscribeToNewsletter(input.email);
            } catch (error) {
                console.error(error);

                if ((error as Error).message.includes('duplicate key')) {
                    throw new Error('Email already exists');
                } else {
                    throw new Error('Something went wrong');
                }
            }
        }
    })
}