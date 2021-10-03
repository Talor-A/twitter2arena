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
      consumer_key: getEnvVar("CONSUMER_KEY"),
      consumer_secret: getEnvVar("CONSUMER_SECRET"),
      callback_url: `${this.baseUrl}api/auth/twitter/callback`,
    }
  }
  get twitter() {
    return this._twitter
  }

  get isProduction() {
    return process.env.NODE_ENV === "production"
  }

  get baseUrl() {
    return this.isProduction ? "https://www.example.com/" : "http://localhost:3000/"
  }
}
export const env = new EnvironmentConfiguration()
