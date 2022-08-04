import '../styles/globals.css'
import { AppShell, Header } from '@mantine/core';
import Link from 'next/link';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider>
      <ModalsProvider>
        <AppShell
        padding="md"
        header={
          <Header height={80} p="xl">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", height: '100%' }}>
              {
                <>
                  <Link href='/' >
                    <h1 className="link">BookShelf</h1>
                  </Link>
                  <Link href="favorites">
                    <svg xmlns="http://www.w3.org/2000/svg" className="link icon icon-tabler icon-tabler-heart" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fd0061" fill="#fd0061" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                    </svg>
                  </Link>
                </>
              }
            </div>
          </Header>}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
        >
          <Component {...pageProps} />
          {/* Your application here */}
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default MyApp
