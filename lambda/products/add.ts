import * as aws from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { PutItemInput } from "aws-sdk/clients/dynamodb";
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = process.env.BUCKET_NAME + "";
const TABLE_PRODUCT = process.env.PRODUCT_TABLE_NAME + "";
const BUCKET_URL = process.env.BUCKET_URL + "";

const s3 = new aws.S3();
const dynamoDb = new aws.DynamoDB.DocumentClient();

exports.handler = async function (event: any) {
    let { brand, category, name, price_pen, price_usd, base64_image } = event;
    let date = new Date().toISOString();
    let id = uuidv4();

    const base64Data = Buffer.from(
        base64_image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
    );
    // const type = base64_image.split(";")[0].split("/")[1];

    const params: PutObjectRequest = {
        Bucket: BUCKET_NAME,
        Key: `images/${id}.jpg`, // images/e68b6ea3-2042-40df-a45b-289a3608475d.jpg
        Body: base64Data,
        ContentType: `image/jpg`,
    };

    try {
        const image = await s3.upload(params).promise();

        console.log(image)

        let image_url = `${BUCKET_URL}/${params.Key}`;

        console.log(image_url)

        let createAt, updateAt = date;

        const item = saveItem(TABLE_PRODUCT, {
            brand,
            category,
            name,
            price_pen,
            price_usd,
            image_url,
            createAt,
            updateAt
        });

        console.log(item)

        return respond();
    } catch (error) {
        return respond(error, 400);
    }
};
function respond(data: any = "", statusCode = 200) {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true, // Required for cookies,
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
}

export const saveItem = (tableName: string, item: any) => {
    const params: PutItemInput = {
        TableName: tableName,
        Item: item,
    };

    return dynamoDb
        .put(params)
        .promise()
        .then(() => item);
};
