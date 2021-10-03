import invariant from "tiny-invariant"
import Twitter from "twitter-lite"
import { Status } from "twitter-d"

const CONSUMER_KEY = process.env.TWITTER_API_KEY
const CONSUMER_SECRET = process.env.TWITTER_API_SECRET

invariant(CONSUMER_KEY, "TWITTER_API_KEY is not set")
invariant(CONSUMER_SECRET, "TWITTER_API_SECRET is not set")

export const client = new Twitter({
  subdomain: "api", // "api" is the default (change for other subdomains)
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  consumer_key: CONSUMER_KEY, // from Twitter.
  consumer_secret: CONSUMER_SECRET, // from Twitter.
})

export const getTweet = async (id: string) => {
  const tweet = await client.get<
    Status & {
      _headers: Headers
    }
  >("statuses/show", { id })
  return tweet
}
