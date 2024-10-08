import '@/styles/globals.css';
import { AuthContextProvider } from '@/contexts/auth-context';
export default function MyApp({ Component, pageProps }) {
  // 使用自訂在頁面層級的版面(layout)
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}
