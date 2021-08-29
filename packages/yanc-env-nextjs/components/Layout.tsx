import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { LocaleList } from "./LocaleList";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        |{" "}
        <Link href="/about">
          <a>About</a>
        </Link>{" "}
        |{" "}
        <Link href="/users">
          <a>Users List</a>
        </Link>{" "}
        |
        <Link href="/api/users">
          <a>Users API</a>
        </Link>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I&apos;m here to stay (Footer)</span>
      <span>
        <LocaleList />
      </span>
    </footer>
  </div>
);

export default Layout;
