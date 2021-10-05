import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <div className="layout">
        <Head>
          <title>{title || "twitter2arena"}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="container">{children}</div>
        <hr />
        <footer className="container">
          <p>
            made with <span style={{ color: "tomato" }}>{"<3"}</span> by @talor_a
          </p>
        </footer>
      </div>
    </>
  )
}
const NavLayout = ({ title, children }: LayoutProps) => {
  return (
    <Layout title={title}>
      <div className="terminal-nav">
        <header className="terminal-logo">
          <div className="logo terminal-prompt">
            <a href="https://terminalcss.xyz" className="no-style">
              Twitter2Are.na
            </a>
          </div>
        </header>
        <nav className="terminal-menu">
          <ul>
            <li>
              <a href="https://terminalcss.xyz" className="menu-item active">
                <span>Light</span>
              </a>
            </li>
            <li>
              <a href="https://terminalcss.xyz/dark/" className="menu-item">
                <span>Dark</span>
              </a>
            </li>
            <li>
              <a href="https://terminalcss.xyz/sans-serif/" className="menu-item">
                <span>Sans</span>
              </a>
            </li>
            <li>
              <a href="https://terminalcss.xyz/sans-serif-dark/" className="menu-item">
                <span>Sans Dark</span>
              </a>
            </li>
            <li style={{ height: 28 }}>
              <span></span>
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </Layout>
  )
}

export default NavLayout
