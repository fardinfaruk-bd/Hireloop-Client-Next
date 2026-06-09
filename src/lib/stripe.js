import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_ID = {
    "seeker_pro" : "price_1TgLPKQiUZAJiSqF9gv2zLZP",
    "seeker_premium": "price_1TgLxYQiUZAJiSqFLr6eqfKx",
    "recruiter_growth": "price_1TgM0RQiUZAJiSqFz4T9m2V6",
    "recruiter_enterprise": "price_1TgM1cQiUZAJiSqFHZUpfRAe"
}