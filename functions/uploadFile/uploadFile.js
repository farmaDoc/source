
exports.handler = async (event, context) => {
    console.log(event.body)
    return{
        statusCode: 200,
        body: "ok"
    }
}