import { SessionProvider } from 'next-auth/react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { memoize } from 'lodash';
import 'tailwindcss/tailwind.css';
import '@/styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

// https://github.com/facebookexperimental/Recoil/issues/733
// ignore in-browser next/js recoil warnings until its fixed.
const mutedConsole = memoize((console) => ({
  ...console,
  warn: (...args) =>
    args[0].includes('Duplicate atom key') ? null : console.warn(...args),
}));

global.console = mutedConsole(global.console);

export default MyApp;
