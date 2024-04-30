import Head from 'next/head';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NBA Stats App</title>
        <meta name="description" content="NBA stats app landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.hero}>{children}</main>
    
      <footer className={styles.footer}>
        <p>&copy; 2024 NBA Stats App</p>
      </footer>
    </div>
  );
};

export default Layout;
