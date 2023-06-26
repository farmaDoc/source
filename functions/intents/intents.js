const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnAE8IkPPKAA15tgIbOo0qtkCNe-ID9bTBmcbWeN",
  domain: 'db.eu.fauna.com'
});

exports.handler = async (event, context) => {
  let userId = event.queryStringParameters.createdBy
  let system = 'system';

  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('allIntents'),userId)),
      q.Lambda(x => q.Get(x))
    )
  ).then(res => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "Content-Type",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({res: res.data})
    }
  })
}
