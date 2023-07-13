const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
	secret: process.env.FAUNA_SECRET,
	domain: 'db.eu.fauna.com'
});

exports.handler = async (event, context) => {
	let uid = event.queryStringParameters.uid

	return client.query(
		q.Map(
			q.Paginate(
				q.Match(q.Index("inventory"), uid),
				{ size: 10000 }
			),
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
			body: JSON.stringify({ res: res })
		}
	})

}