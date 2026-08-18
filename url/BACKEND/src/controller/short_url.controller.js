import { getShortUrl } from "../dao/short_url.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

const buildShortUrlResponse = (shortUrl) => `${process.env.APP_URL || "http://localhost:3000/"}${shortUrl}`

export const createShortUrl = wrapAsync(async (req, res) => {
    const data = req.body || {}
    const slug = typeof data.slug === "string" ? data.slug : ""

    let shortUrl
    if (req.user) {
        shortUrl = await createShortUrlWithUser(data.url, req.user._id, slug)
    } else {
        shortUrl = await createShortUrlWithoutUser(data.url, slug)
    }

    res.status(200).json({ shortUrl: buildShortUrlResponse(shortUrl) })
})

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
    const { id } = req.params
    const url = await getShortUrl(id)
    if (!url) throw new Error("Short URL not found")

    const targetUrl = encodeURIComponent(url.full_url)
    const frontendRedirect = `${process.env.FRONTEND_URL || "http://localhost:5173"}/redirect?target=${targetUrl}`
    res.redirect(frontendRedirect)
})

export const createCustomShortUrl = wrapAsync(async (req, res) => {
    const { url, slug } = req.body
    const shortUrl = await createShortUrlWithoutUser(url, slug)
    res.status(200).json({ shortUrl: buildShortUrlResponse(shortUrl) })
})