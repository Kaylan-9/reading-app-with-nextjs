import * as PageHead from 'next/head';

export default function Head() {
  return (<PageHead.default>
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <link rel="icon" href="/favicon.ico" />
  </PageHead.default>);
}
