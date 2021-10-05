import invariant from "tiny-invariant"

interface TwitterConfig {
  consumer_key: string
  consumer_secret: string
  callback_url: string
}

const getEnvVar = (name: string): string => {
  const value = process.env[name]
  invariant(value, `Missing environment variable ${name}`)
  return value
}

export class EnvironmentConfiguration {
  private _twitter: TwitterConfig

  constructor() {
    this._twitter = {
      consumer_key: getEnvVar("TWITTER_API_KEY"),
      consumer_secret: getEnvVar("TWITTER_API_SECRET"),
      callback_url: `http://localhost:3000/api/auth/twitter/callback`,
    }
  }
  get twitter() {
    return this._twitter
  }

  get arena() {
    return {
      appId: getEnvVar("ARENA_APP_ID"),
      secret: getEnvVar("ARENA_SECRET"),
      callback_url: new URL(this.baseUrl).origin + "/api/auth/arena/callback",
    }
  }

  get isProduction() {
    return process.env.NODE_ENV === "production"
  }

  get baseUrl() {
    return this.isProduction ? "https://www.example.com/" : "https://b9a4-75-80-49-31.ngrok.io/"
  }
}
export const env = new EnvironmentConfiguration()
