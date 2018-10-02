
export default () => fetch(
  `${process.env.BITBUCKET_ADDR}/rest/api/latest/repos/?limit=1000`,
  { credentials: 'include', cache: 'force-cache' } // force-cache will reduce latency when opening
).then(a => a.json());
