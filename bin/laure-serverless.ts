#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LaureServerlessStack } from '../lib/laure-serverless-stack';
import { LaureResourcesServerlessStack } from '../lib/laure-dashboard-resources.stack';

const app = new cdk.App();
new LaureServerlessStack(app, 'LaureServerlessStack');


const app2 = new cdk.App();
new LaureResourcesServerlessStack(app2, 'LaureResourcesServerlessStack');
