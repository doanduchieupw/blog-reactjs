import Typesense from 'typesense';

export const client = new Typesense.Client({
  nodes: [
    {
      host: 'zeh84tclwjo0b9inp-1.a1.typesense.net', // where xxx is the ClusterID of your Typesense Cloud cluster
      port: '443',
      protocol: 'https',
    },
  ],
  apiKey: 'veZqGPjPKUyI6LtbEegZPk2VJWW2NHZe',
  connectionTimeoutSeconds: 2,
});
// const blogsCollection = {
//   name: 'podcasts',
//   fields: [
//     { name: 'id', type: 'string' },
//     { name: 'desc', type: 'string' },
//     { name: 'image', type: 'string' },
//     { name: 'keyword', type: 'string' },
//     { name: 'slug', type: 'string' },
//     { name: 'title', type: 'string' },
//     { name: 'topic', type: 'string' },
//   ],
//   // default_sorting_field: 'id',
// };

// client.collections().create(blogsCollection);
