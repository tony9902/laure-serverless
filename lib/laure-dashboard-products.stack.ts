import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as lambda from "@aws-cdk/aws-lambda";
import { Duration } from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { LaureResourcesServerlessStack } from './laure-dashboard-resources.stack';

export class LaureDashboardProductsServerlessStack extends cdk.Stack {
    public readonly productListHandler: lambda.Function;
    public readonly productAddHandler: lambda.Function;
    public readonly productTable: dynamodb.Table;
    public readonly bucket: s3.Bucket;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const laureResources = new LaureResourcesServerlessStack(this, 'LaureResources');
        
        this.productTable =  new dynamodb.Table(this, "ProductTable", {
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
        });

        this.productListHandler = new lambda.Function(this, "productListHandler", {
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: "products/list.handler",
            code: lambda.Code.fromAsset("lambda"),
            timeout: Duration.seconds(10),
            environment: {
              PRODUCT_TABLE_NAME: this.productTable.tableName
            }
        });

        this.productAddHandler = new lambda.Function(this, "productsAddHandler", {
            runtime: lambda.Runtime.NODEJS_10_X,
            handler: "products/add.handler",
            code: lambda.Code.fromAsset("lambda"),
            timeout: Duration.seconds(10),
            environment: {
              PRODUCT_TABLE_NAME: this.productTable.tableName
            }
        });

        laureResources.bucket.grantReadWrite(this.productAddHandler)
    }
}
