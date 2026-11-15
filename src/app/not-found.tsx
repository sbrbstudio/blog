import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <div>
        <span className="not-found-code">404 / NOT FOUND</span>
        <h1>Nothing here yet.</h1>
        <p>
          This page may have moved, or perhaps it was only a thought that never
          made it to paper.
        </p>
        <Link href="/articles" className="primary-button">
          Open the website editing guide
        </Link>
      </div>
    </main>
  );
}
