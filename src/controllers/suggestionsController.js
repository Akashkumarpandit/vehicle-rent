const OpenAI = require('openai')

exports.suggest = async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    const { lat, lng, month, interests } = req.query
    if (!apiKey) {
      return res.json({ suggestions: [
        'Scenic coastal drive with EV charging stops',
        'Visit local museum and eco-park',
        'Hike a nearby trail and picnic at a lake'
      ] })
    }
    const client = new OpenAI({ apiKey })
    const interestsText = Array.isArray(interests) ? interests.join(', ') : interests
    const prompt = `Suggest 3 travel destinations near (${lat},${lng}) for month=${month}. Consider weather and interests: ${interestsText}. Keep each suggestion under 120 chars.`
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a concise travel assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    })
    const text = completion.choices?.[0]?.message?.content || ''
    const suggestions = text.split('\n').filter(Boolean).slice(0, 5)
    res.json({ suggestions })
  } catch (e) {
    res.status(500).json({ error: 'Failed to generate suggestions' })
  }
}
