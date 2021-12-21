module.exports.response = (statusCode, body, headers, rawContent = null) => ({
    statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        ...headers
    },
    body: rawContent ? rawContent : JSON.stringify(body)
})
