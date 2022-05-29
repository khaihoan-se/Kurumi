import { AppProps } from 'next/app'
import '../styles/index.css'
import BaseLayout from '@/components/layouts/BaseLayout'
import Router from 'next/router'
import NProgress from 'nprogress'

function MyApp({ Component, pageProps }: AppProps) {
   Router.events.on('routeChangeStart', () => {
      NProgress.start();
   })

   Router.events.on('routeChangeComplete', () => {
      NProgress.done();
   })
   return (
      <>
         <BaseLayout>
            <Component {...pageProps} />
         </BaseLayout>
      </>
   )
}

export default MyApp