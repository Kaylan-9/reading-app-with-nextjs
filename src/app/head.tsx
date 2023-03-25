import * as PageHead from 'next/head';

export default function Head() {
  return (<PageHead.default>
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="robots" content="index,follow"/>
    <meta name="generator" content="Visual Studio Code"/>
    <link rel="icon" href="/favicon.ico" />
  </PageHead.default>);
}
