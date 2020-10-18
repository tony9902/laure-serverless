#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LaureServerlessStack } from '../lib/laure-serverless-stack';

const app = new cdk.App();
new LaureServerlessStack(app, 'LaureServerlessStack');
