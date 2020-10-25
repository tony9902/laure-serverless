import { v4 as uuidv4 } from "uuid";
import { PutObjectRequest } from 'aws-sdk/clients/s3';

let tableNews = process.env.TABLE_NEWS;

exports.handler = async function (event: any) {
    
    try {
        Generate Date Now
    let date = new Date().toISOString();

    // Set ID and default params
    body.params.newId = uuidv4();
    body.params.status = 1;
    body.params.createAt = date;
    body.params.updateAt = date;
    body.params.statusAt = date;

    // Save item to DB
    await saveItem({
      tableName: tableNews,
      item: {
        ...body.params
      }
    });
        return respond(data);
    } catch (error) {
        return respond(error);
    }

    
};
export const saveItem = ({ tableName : string, item }) => {
    const params:P = {
      TableName: tableName,
      Item: item
    };
  
    return dynamoDb
      .put(params)
      .promise()
      .then(() => item);
  };



