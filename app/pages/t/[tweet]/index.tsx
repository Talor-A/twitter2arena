import { Suspense } from "react"
import { Head, useParam, BlitzPage, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import invariant from "tiny-invariant"
import getStatus from "app/queries/twitter/getStatus"

export const TweetPage = () => {
  const id = useParam("tweet", "string")!

  const [tweet] = useQuery(getStatus, { id })

  return (
    <>
      <Head>
        <title>Tweet {id}</title>
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
