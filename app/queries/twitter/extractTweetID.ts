import { resolver } from "@blitzjs/core/server"
import { client } from "integrations/twitter/client"
import { z } from "zod"

export const ExtractTweet = z.object({
  text: z.string(),
})

export const extractTweetId = (text: string) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/g
  const match = regex.exec(text)
  console.log(match)
  if (match) {
    return match[3]
  }
  return null
}

export default resolver.pipe(resolver.zod(ExtractTweet), async ({ text }) => {
  const id = extractTweetId(text)
  return id
})
