import invariant from "tiny-invariant"
import Twitter from "twitter-lite"
import { Status } from "twitter-d"
import { env } from "integrations/env"

export const client = new Twitter({
  subdomain: "api", // "api" is the default (change for other subdomains)
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  consumer_key: env.twitter.consumer_key, // from Twitter.
  consumer_secret: env.twitter.consumer_secret, // from Twitter.
})

export const getTweet = async (id: string) => {
  const tweet = await client.get<
    Status & {
      _headers: Headers
    }
  >("statuses/show", { id })
  return tweet
}
