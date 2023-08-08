const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
	secret: process.env.FAUNA_SECRET,
	domain: 'db.eu.fauna.com'
});

exports.handler = async (event, context) => {
    let farma = event.queryStringParameters.farma
    let int = event.queryStringParameters.int
    let now = new Date()

    const updateQuery = q.Let(
        {
          docRef: q.Ref(q.Collection("drugs"), farma),
          document: q.Get(q.Var("docRef")),
          myArray: q.Select(["data", "reqs"], q.Var("document")),
        },
        q.If(
          q.IsArray(q.Var("myArray")),
          q.Update(q.Var("docRef"), {
            data: {
              my_array: q.Append(q.Var("myArray"), [{
                ts: now,
                intent: int
            }]),
            },
          }),
          q.Update(q.Var("docRef"), {
            data: {
              reqs: [{
                ts: now,
                intent: int
            }],
            },
          })
        )
      );
    
    return client.query(updateQuery).then(res => {
        return{
            statusCode: 200,
            headers: {
				'Access-Control-Allow-Origin': "*",
				'Access-Control-Allow-Headers': "Content-Type",
				'Content-Type': 'application/json'
			},
            body: "Success"
        }
    })
}