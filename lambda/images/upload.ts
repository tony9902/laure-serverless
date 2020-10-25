const { DynamoDB, Lambda } = require("aws-sdk");
import * as aws from "aws-sdk";
import { ListObjectsRequest } from "aws-sdk/clients/s3";
const s3= new aws.S3(); 
const BUCKET_NAME = process.env.BUCKET_NAME + "";

exports.handler = async function (event:any) {
    console.log("request:", JSON.stringify(event, undefined, 2));

    const params: ListObjectsRequest = {
        Bucket: BUCKET_NAME,
        Prefix: "images",
    };

    try {
        const result = await s3.listObjects(params).promise()
        return result;
    } catch (error) {
        return error;
    }
};
