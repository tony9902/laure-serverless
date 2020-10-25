import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as lambda from "@aws-cdk/aws-lambda";
import { Duration } from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class LaureResourcesServerlessStack extends cdk.Stack {
    public readonly bucket: s3.Bucket;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.bucket = new s3.Bucket(this, "laure-files");
    }
}
