---
sidebar_label: 'Data Plane Activation'
title: 'Data Plane Activation'
id: 'data-plane-activation'
description: Prepare for the activation of your data plane
---

## Overview

This document provides information about what to expect and prepare for when onboarding to Astro.

Astro is a modern data orchestration platform, powered by Apache Airflow, that enables your data team to build, run, and observe data pipelines. Astro includes a single-tenant Data Plane in your cloud and a multi-tenant Control Plane in Astronomer's cloud.

<div class="text--center">
  <img src="/img/docs/architecture-overview.png" alt="High level overview of Astro's architecture" />
</div>

### What to Expect

We’re excited for you to get started with Astro. To start, you'll need to activate your Data Plane. This is a simple process that allows you to see our modern data orchestration infrastructure in action. Once complete, you'll be able to create Deployments, run tasks, and explore our suite of data observability features.

The Data Plane activation process is guided by an engineer from Astronomer. You can expect this to take about one hour. By the end of the session, you'll have your first pipeline deployed on Astro.

### What to Bring and Know

Your Data Plane will be deployed into a clean AWS Account in accordance with [Amazon's recommendation](https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/benefits-of-using-multiple-aws-accounts.html) for account segregation. Astronomer takes complete responsibility for the operations of this account as described in the [Shared Responsibility Model](shared-responsibility-model.md).

This model helps the Astronomer team get you started quickly and provides you with cloud-grade reliability and seamless connection to all of your data services.  If you decide to not proceed with Astro, this AWS account and all infrastructure running within it can be deleted at any time.

By default, your AWS account for the Astro Data Plane has no direct access to your data services. We’ll guide you on how to make these connections securely either through a VPC peering process or direct connections.

### Pre-Flight Checklist

Before your data plane activation meeting, please ensure that you have:

[] The [Astro CLI](install-cli.md) installed for any users who will develop pipelines.
[] A clean AWS Account where you have `CreateRole` permissions.
[] A desired AWS region for your Astro Cluster selected from the list of [supported regions](resource-reference-aws.md#aws-region).
[] _If peering VPCs_, preferred subnet CIDR range identified (no smaller than a `/19` range).

### What’s Next

Once your Data Plane is activated, you’ll be able to create new Deployments, deploy DAGs via the Astro CLI, and experience the differentiated Apache Airflow experience that is powered by Astro Runtime.

Our team at Astronomer wants to help you get started with Astro as quickly as possible and let your team focus their efforts on developing, testing, and running data pipelines. We’ll keep in touch following the Data Plane activation meeting to see how you’re doing, but don’t hesitate to reach out to us via Slack or email. We're here to help.
