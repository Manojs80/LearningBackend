

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);
const clientDomain = process.env.CLIENT_DOMAIN;

export const PaymentController = async (req, res) => {
    try {
        const { course } = req.body;
        console.log("payment course ",course);
        
        // Validate course data
        if (!course || typeof course !== 'object') {
            return res.status(400).json({ error: 'Invalid course data provided' });
        }

        const { title, fee, image ,_id } = course;

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
            success_url: `${clientDomain}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${clientDomain}/payment/cancel`,
            
            metadata: {
                courseTitle: title,
                CourseId: _id, // Add course title to metadata
            },
        });
        console.log('Session details:', session);
        console.log('Customer Email:', session.customer_email);
        // Send session ID to the client
        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        // Handle error
        console.error('Error creating checkout session:', error);
        res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
    }
};




export const PaymentDetails = async (req, res) => {
    const { session_id } = req.query;

    if (!session_id) {
        return res.status(400).json({ error: 'Session ID is required' });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

        // Extract details
        const paymentDetails = {
            email: session.customer_email || 'Email not available',
            courseTitle: session.metadata ? session.metadata.courseTitle : 'N/A',
            CourseId: session.metadata ? session.metadata.CourseId : 'N/A', // Use metadata for course title
            amount: paymentIntent.amount_received / 100, // Convert from cents to currency unit
        };

        res.status(200).json(paymentDetails);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



