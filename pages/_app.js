import Link from 'next/link'
import Image from 'next/image';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <nav className="header">
      <div>
        <Link href="/">
            <a>
            <Image
            className="acCookies"
                src="/../public/AC_Graphic_TITLE_1501x440.png" alt="accept cookies"
                height={100} 
                width={800}
            >
            </Image>
            </a>
        </Link>
      </div>
    </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp
