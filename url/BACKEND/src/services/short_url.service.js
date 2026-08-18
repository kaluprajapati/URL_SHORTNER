import { generateNanoId } from "../utils/helper.js"
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js"

const normalizeSlug = (slug) => {
    if (!slug) return ""

    const sanitized = slug
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "")

    return sanitized
}

export const createShortUrlWithoutUser = async (url, slug = null) => {
    const customSlug = normalizeSlug(slug)
    const shortUrl = customSlug || generateNanoId(7)

    if (customSlug) {
        const exists = await getCustomShortUrl(customSlug)
        if (exists) throw new Error("This custom url already exists")
    }

    await saveShortUrl(shortUrl, url)
    return shortUrl
}

export const createShortUrlWithUser = async (url, userId, slug = null) => {
    const customSlug = normalizeSlug(slug)
    const shortUrl = customSlug || generateNanoId(7)

    if (customSlug) {
        const exists = await getCustomShortUrl(customSlug)
        if (exists) throw new Error("This custom url already exists")
    }

    await saveShortUrl(shortUrl, url, userId)
    return shortUrl
}