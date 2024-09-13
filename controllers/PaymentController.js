

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);
const clientDomain = process.env.CLIENT_DOMAIN;

export const PaymentController = async (req, res) => {
    try {
        const { course } = req.body;

        // Validate course data
        if (!course || typeof course !== 'object') {
            return res.status(400).json({ error: 'Invalid course data provided' });
        }

        const { title, fee, image } = course;

        // Validate required fields
        if (!title || typeof title !== 'string') {
            return res.status(400).json({ error: 'Course title is required and must be a string' });
        }

        if (fee === undefined || typeof fee !== 'number') {
            return res.status(400).json({ error: 'Course price is required and must be a number' });
        }

        // Optional: Validate `image` field
        if (image && typeof image !== 'string') {
            return res.status(400).json({ error: 'Course image must be a string URL' });
        }

        // Create a Stripe checkout session
        const lineItem = {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: title,
                    images: [image].filter(Boolean), // Only include image if it exists
                },
                unit_amount: Math.round(fee * 100), // Convert price to cents
            },
            quantity: 1, // Default to 1
        };

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [lineItem], // Wrap the lineItem in an array
            mode: 'payment',
            success_url: `${clientDomain}/payment/success`,
            cancel_url: `${clientDomain}/payment/cancel`,
        },  {
            headers: {
              'Authorization': `Bearer ${process.env.STRIPE_PRIVATE_API_KEY}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
    );

        // Send session ID to the client
        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        // Handle error
        console.error('Error creating checkout session:', error);
        res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
};


