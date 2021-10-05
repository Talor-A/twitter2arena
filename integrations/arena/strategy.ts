import db from "db"
import { env } from "integrations/env"
import { Ctx, hash256, VerifyCallbackResult } from "blitz"
import OAuth2Strategy from "passport-oauth2"
import { ArenaUser } from "./types"

type Done = (err: Error | null, result?: VerifyCallbackResult) => void

const ArenaStrategy = ({ ctx }: { ctx: Ctx }) => {
  const strategy = new OAuth2Strategy(
    {
      authorizationURL: "https://dev.are.na/oauth/authorize",
      tokenURL: "https://dev.are.na/oauth/token",
      clientID: env.arena.appId,
      clientSecret: env.arena.secret,
      callbackURL: env.arena.callback_url,
    },
    async (accessToken: string, refreshToken: string | undefined, profile: Object, done: Done) => {
      if (!ctx.session.userId) {
        return done(new Error("No userId in session"))
      }
      console.log("profile", profile)
      console.log("accessToken", accessToken)
      console.log("refreshToken", refreshToken)

      const user = await db.user.findFirst({
        where: {
          id: ctx.session.userId,
        },
      })
      if (!user) {
        return done(new Error("No user found for current session"))
      }

      db.token.create({
        data: {
          sentTo: "",
          hashedToken: hash256(accessToken),
          type: "ARENA",
          userId: user.id,
          expiresAt: new Date(),
        },
      })

      return done(null, {
        publicData: {
          role: "USER",
          userId: user.id,
        },
      })
    }
  )
  strategy.name = "arena"

  return strategy
}

export default ArenaStrategy
