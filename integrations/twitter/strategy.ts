import { Strategy } from "passport-twitter"
import { env } from "integrations/env"
import db from "db"

// TODO: https://twitter2arena.com/privacy
// TODO: https://twitter2arena.com/terms
const TwitterStrategy = new Strategy(
  {
    consumerKey: env.twitter.consumer_key,
    consumerSecret: env.twitter.consumer_secret,
    callbackURL: env.twitter.callback_url,
    includeEmail: true,
  },
  async function (_token, _tokenSecret, profile, done) {
    const email = profile.emails && profile.emails[0]?.value

    if (!email) {
      // This can happen if you haven't enabled email access in your twitter app permissions
      return done(new Error("Twitter OAuth response doesn't have email."))
    }

    const user = await db.user.upsert({
      where: { email },
      create: {
        email,
        name: profile.displayName,
      },
      update: { email },
    })

    const publicData = {
      userId: user.id,
      roles: [user.role],
      source: "twitter",
    }
    done(undefined, { publicData })
  }
)

export default TwitterStrategy
