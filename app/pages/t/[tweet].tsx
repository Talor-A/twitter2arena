import { Suspense } from "react"
import { Head, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { getTweet } from "app/core/twitter/client"
import { useQuery } from "react-query"
import invariant from "tiny-invariant"

export const TweetPage = () => {
  const tId = useParam("tweet", "string")

  invariant(tId, "tweet is required")
  const { data } = useQuery(["tweet", tId], () => getTweet(tId), {
    suspense: true,
  })

  const tweet = data!

  return (
    <>
      <Head>
        <title>Tweet {tId}</title>
      </Head>

      <div>
        <h1>T {tweet.id}</h1>
        <pre>{JSON.stringify(tweet, null, 2)}</pre>
      </div>
    </>
  )
}

const ShowTweetPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TweetPage />
      </Suspense>
    </div>
  )
}

ShowTweetPage.authenticate = true
ShowTweetPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTweetPage
