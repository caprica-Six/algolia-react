import Head from 'next/head';
import { node } from 'prop-types';

const Layout = ({ children, title }) => {
  const description = 'E-commerce InstantSearch';

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <main>{children}</main>
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: node.isRequired,
};
