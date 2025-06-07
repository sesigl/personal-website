import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { subscribeToNewsletter } from './subscribeToNewsletter';
import { sendNewsletter } from './admin/sendNewsletter';
import { getNewsletterProgress } from './admin/getNewsletterProgress';

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
                campaignTitle: z.string(),
                subject: z.string(),
                previewHeadline: z.string(),
                html: z.string(),
                test: z.boolean(),
            }),
            handler: async (input) => {
                try {
                    console.log('Sending newsletter');
                    return await sendNewsletter(input.campaignTitle, input.subject, input.previewHeadline, input.html, input.test);
                } catch (error) {
                    console.error(error);
                }
            }
        }),
        
        getNewsletterProgress: defineAction({
            input: z.object({
                campaignTitle: z.string(),
            }),
            handler: async (input) => {
                try {
                    return await getNewsletterProgress(input.campaignTitle);
                } catch (error) {
                    console.error('Error getting newsletter progress:', error);
                    throw new Error('Failed to get newsletter progress');
                }
            }
        })
    }
}