const { Client } = require('@googlemaps/google-maps-services-js')

const client = new Client({})

exports.distance = async (req, res) => {
  try {
    const key = process.env.GOOGLE_MAPS_API_KEY
    if (!key) return res.status(500).json({ error: 'Google Maps not configured' })
    const { orig, dest } = req.query
    if (!orig || !dest) return res.status(400).json({ error: 'orig and dest required' })
    const [origLat, origLng] = orig.split(',').map(Number)
    const [destLat, destLng] = dest.split(',').map(Number)

    const resp = await client.distancematrix({
      params: {
        key,
        origins: [{ lat: origLat, lng: origLng }],
        destinations: [{ lat: destLat, lng: destLng }],
        units: 'metric'
      }
    })
    const row = resp.data.rows?.[0]
    const element = row?.elements?.[0]
    res.json({
      distanceText: element?.distance?.text,
      durationText: element?.duration?.text,
      distanceMeters: element?.distance?.value,
      durationSeconds: element?.duration?.value
    })
  } catch (e) {
    res.status(500).json({ error: 'Failed to compute distance' })
  }
}
