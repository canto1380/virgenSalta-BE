import { Router } from 'express'
import axios from 'axios'

const router = Router()

/**
 * @swagger
 * /youtube-rss/{channelId}:
 *   get:
 *     summary: Get YouTube RSS feed for a channel (proxy to avoid CORS)
 *     tags: [YouTube]
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         schema:
 *           type: string
 *         description: YouTube channel ID
 *     responses:
 *       200:
 *         description: YouTube RSS XML data
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 *       500:
 *         description: Server error
 */
router.get('/youtube-rss/:channelId', async (req, res) => {
  try {
    const { channelId } = req.params
    const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    
    const response = await axios.get(RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSS-Proxy/1.0)'
      }
    })
    
    // Set appropriate headers
    res.set({
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
    })
    
    res.send(response.data)
  } catch (error) {
    console.error('YouTube RSS proxy error:', error.message)
    res.status(500).json({ 
      error: 'Failed to fetch YouTube RSS feed',
      message: error.message 
    })
  }
})

export default router
