const Stripe = require('stripe')

exports.createIntent = async (req, res) => {
  try {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) return res.status(500).json({ error: 'Stripe not configured' })
    const stripe = Stripe(key)
    const { amount, currency = 'usd' } = req.body
    if (!amount) return res.status(400).json({ error: 'amount required' })
    const intent = await stripe.paymentIntents.create({ amount, currency })
    res.json({ clientSecret: intent.client_secret })
  } catch (e) {
    res.status(500).json({ error: 'Failed to create payment intent' })
  }
}
