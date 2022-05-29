import { AppProps } from 'next/app'
import '../styles/index.css'
import BaseLayout from '@/components/layouts/BaseLayout'
import Router from 'next/router'
import NProgress from 'nprogress'

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <>
         <BaseLayout>
            <Component {...pageProps} />
         </BaseLayout>
      </>
   )
}

export default MyApp