import { Suspense } from "react"
import { BlitzPage, invoke, useMutation, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import Form, { FORM_ERROR } from "app/core/components/Form"
import getTweet from "app/queries/extractTweetID"
import type { ExtractTweet } from "app/queries/extractTweetID"
import LabeledTextField from "app/core/components/LabeledTextField"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="btn btn-default"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
        <div>
          <pre>
            <code>{JSON.stringify(currentUser.twitterProfile, null, 2)}</code>
          </pre>
        </div>
      </>
    )
  } else {
    return (
      <>
        <a href={"/api/auth/twitter"} className="button small">
          <strong>Log in</strong>
        </a>
      </>
    )
  }
}

const HomeContent = () => {
  const router = useRouter()

  return (
    <Form<typeof ExtractTweet>
      initialValues={{
        text: "",
      }}
      onSubmit={async (values) => {
        try {
          const result = await invoke(getTweet, {
            text: values.text,
          })
          if (result) {
            router.push("/t/" + result)
            return
          } else {
            return {
              [FORM_ERROR]: "that does not appear to be a valid tweet URL. Try again?",
            }
          }
        } catch (error) {
          return {
            [FORM_ERROR]: error.message,
          }
        }
      }}
    >
      <LabeledTextField
        name="text"
        label="Tweet URL:"
        type="text"
        placeholder="https://twitter.com/status/1234"
        style={{ minWidth: "500px" }}
      />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </Form>
  )
}
const Home: BlitzPage = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "80vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <HomeContent />
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
