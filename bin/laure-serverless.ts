#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LaureServerlessStack } from '../lib/laure-serverless-stack';
import { LaureResourcesServerlessStack } from '../lib/laure-dashboard-resources.stack';
import { LaureDashboardProductsServerlessStack } from '../lib/laure-dashboard-products.stack';

const app = new cdk.App();
new LaureServerlessStack(app, 'LaureServerlessStack');


const app2 = new cdk.App();
new LaureResourcesServerlessStack(app2, 'LaureResourcesServerlessStack');

const app3 = new cdk.App();
new LaureDashboardProductsServerlessStack(app3, 'LaureDashboardProductsServerlessStack');