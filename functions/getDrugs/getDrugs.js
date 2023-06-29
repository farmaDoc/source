const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
  domain: 'db.eu.fauna.com'
});

exports.handler = async (event, context) => {
  let ID = event.queryStringParameters.id;

  return client.query(
    q.Get(q.Ref(q.Collection("drugs"), ID))
  ).then(res => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "Content-Type",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({remedy: res.data})
    }
  })
}