import { passportAuth } from "blitz"
import db from "db"
import ArenaStrategy from "integrations/arena/strategy"
import TwitterStrategy from "integrations/twitter/strategy"

export default passportAuth(({ ctx, req, res }) => ({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  strategies: [
    {
      strategy: ArenaStrategy({ ctx }),
    },
    {
      strategy: TwitterStrategy,
    },
  ],
}))
