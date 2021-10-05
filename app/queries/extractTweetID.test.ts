import { getAnonymousTestSession } from "test/utils"
import getTweet, { extractTweetId } from "./extractTweetID"

describe("extractTweetId", () => {
  it("should extract tweet id from tweet url", () => {
    expect(extractTweetId("https://twitter.com/twitter/status/123456789")).toBe("123456789")
  })
})

describe("getTweet", () => {
  it("should return tweet id for a given url", async () => {
    const tweetId = await getTweet(
      {
        text: "https://twitter.com/twitter/status/123456789",
      },
      getAnonymousTestSession()
    )

    expect(tweetId).toBe("123456789")
  })
})
