import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.1.1/css/all.css"
        />
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head>
      <body className="bg-site">
        <div id={'globalLoader'} className="face">
          <div className="loader">
            <img src='/images/speac.png' width={200} height={200} alt="Logo"></img>
            <div />
          </div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
