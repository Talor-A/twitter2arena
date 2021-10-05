import { Document, Html, DocumentHead, Main, BlitzScript /*DocumentContext*/ } from "blitz"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body className="terminal">
          <Main />
          <style jsx global>{`
            body {
              min-height: 100vh;
            }
            #__next {
              height: 100vh;
            }
          `}</style>
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
