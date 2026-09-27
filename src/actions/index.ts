import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { subscribeToNewsletter } from './subscribeToNewsletter';
import { sendNewsletter } from './admin/sendNewsletter';
import { getNewsletterProgress } from './admin/getNewsletterProgress';

/**
 * Reports whether the error, or any error in its cause chain, is a PostgreSQL
 * unique violation (SQLSTATE 23505) such as a duplicate email. Drizzle wraps
 * driver errors from 0.45 onwards, so a plain error.message check is not enough.
 */
function isDuplicateKeyError(error: unknown): boolean {
    let current: unknown = error;

    while (current instanceof Error) {
        if ((current as { code?: string }).code === '23505') {
            return true;
        }

        if (current.message.includes('duplicate key')) {
            return true;
        }

        current = current.cause;
    }

    return false;
}

export const server = {
    subscribeToNewsletter: defineAction({
        input: z.object({
            email: z.string(),
        }),
        handler: async (input) => {
            try {
                await subscribeToNewsletter(input.email);

                // Actions must return serializable data. The domain Contact is a
                // class instance (non-POJO) and fails devalue serialization, so
                // return a plain object instead.
                return { success: true };
            } catch (error) {
                console.error(error);

                if (isDuplicateKeyError(error)) {
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