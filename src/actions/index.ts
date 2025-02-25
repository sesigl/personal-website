import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { subscribeToNewsletter } from './subscribeToNewsletter';
import { sendNewsletter } from './admin/sendNewsletter';

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
    }),

    
    admin: {
        sendNewsletter: defineAction({
            input: z.object({
                subject: z.string(),
                previewHeadline: z.string(),
                html: z.string(),
                unsubscribeKeyPlaceholder: z.string(),
                test: z.boolean(),
            }),
            handler: async (input) => {
                try {
                    console.log('Sending newsletter');
                    return await sendNewsletter(input.subject, input.previewHeadline, input.html, input.unsubscribeKeyPlaceholder, input.test);
                } catch (error) {
                    console.error(error);
                }
            }
        })
    }
}