const { Client } = require('cassandra-driver');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const payload = JSON.parse(event.body);


    const client = new Client({
        cloud: {
            secureConnectBundle: './secure-connect-mealorder.zip',
        },
        credentials: {
            username: `${process.env.CLIENT_ID}`,
            password: `${process.env.CLIENT_SECRET}`,
        },
    });

    await client.connect();

    // Insert the JSON object into the database
    const query = 'INSERT INTO <table_name> JSON ?;';
    const params = [JSON.stringify(payload)];
    await client.execute(query, params, { prepare: true });

    // Disconnect from the Cassandra cluster
    await client.shutdown();

    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  }, 
        body: JSON.stringify({ message: 'Successfully submitted order.' })
    };
};
