import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as lambda from "@aws-cdk/aws-lambda";
import { Duration } from "@aws-cdk/core";


export class LaureServerlessStack extends cdk.Stack {
    public readonly handler: lambda.Function;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const bucket = new s3.Bucket(this, "laure-files");

        this.handler = new lambda.Function(this, "uploadFileHandler", {
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: "lambda/images/upload.handler",
            code: lambda.Code.fromAsset("lambda/images"),
            environment: {
                BUCKET_NAME: bucket.bucketName,
            },
        });

        bucket.grantReadWrite(this.handler);

        new lambda.Function(this, "productListHandler", {
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: "products/list.handler",
            code: lambda.Code.fromAsset("lambda"),
            environment: {
                FIREBASE_PROJECT_ID: require("../env.json").FIREBASE_PROJECT_ID,
                FIREBASE_PRIVATE_KEY:require("../env.json").FIREBASE_PRIVATE_KEY,
                FIREBASE_CLIENT_EMAIL: require("../env.json").FIREBASE_CLIENT_EMAIL,
            },
            timeout: (Duration.seconds(30))
        });

        new lambda.Function(this, "categoriesListHandler", {
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: "categories/list.handler",
            code: lambda.Code.fromAsset("lambda"),
            environment: {
                FIREBASE_PROJECT_ID: require("../env.json").FIREBASE_PROJECT_ID,
                FIREBASE_PRIVATE_KEY:require("../env.json").FIREBASE_PRIVATE_KEY,
                FIREBASE_CLIENT_EMAIL: require("../env.json").FIREBASE_CLIENT_EMAIL,
            },
            timeout: (Duration.seconds(30))
        });

        new lambda.Function(this, "ordersAddHandler", {
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: "orders/add.handler",
            code: lambda.Code.fromAsset("lambda"),
            environment: {
                FIREBASE_PROJECT_ID: require("../env.json").FIREBASE_PROJECT_ID,
                FIREBASE_PRIVATE_KEY:require("../env.json").FIREBASE_PRIVATE_KEY,
                FIREBASE_CLIENT_EMAIL: require("../env.json").FIREBASE_CLIENT_EMAIL,
            },
            timeout: (Duration.seconds(30))
        });


        // The code that defines your stack goes here
    }
}
