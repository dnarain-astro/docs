---
sidebar_label: 'Data Plane Activation'
title: 'Data Plane Activation'
id: 'data-plane-activation'
description: Prepare for the activation of your data plane
---

## Overview

This document provides information about what to expect and prepare for when onboarding to Astro.

Astro is a modern data orchestration platform, powered by Apache Airflow, that enables your data team to build, run, and observe data pipelines. The architecture of Astro includes a single-tenant Data Plane in your cloud and a multi-tenant Control Plane in Astronomer’s cloud.

<div class="text--center">
  <img src="/img/docs/architecture-overview.png" alt="High level overview of Astro's architecture" />
</div>

### What to Expect

We’re excited to get you started with Astro! Activating your data plane is a simple process that allows you to see our modern data orchestration infrastructure in action.

When you meet with one of our engineers to activate your data plane, expect it to take about an hour. By the end of the session, you should have your first pipeline deployed in your own Astro environment.

### What to Bring and Know

Your data plane will be deployed into a clean, dedicated AWS Account, in accordance with [Amazon’s recommendation](https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/benefits-of-using-multiple-aws-accounts.html) for account segregation. Astronomer takes complete responsibility for the operations of this account as described in the [Shared Responsibility Model](shared-responsibility-model.md).

This model helps the Astronomer team to get you started quickly, providing cloud-grade reliability and seamless connection to all of your data services. If you decide not to proceed with Astro, this account can be fully deleted at any point.

By default, the Astronomer account has no access to your data services. We’ll guide you through how to make these connections securely, whether peering VPCs or making direct connections.

### Pre-Flight Checklist

When you arrive at your data plane activation appointment, please ensure that you have:

- [Astro CLI](install-cli.md) installed for any users who will develop pipelines.
- A clean AWS Account where you have `CreateRole` permissions.
- A desired AWS region for your Astro Cluster selected from the list of [supported regions](resource-reference-aws.md#aws-region).
- _If peering VPCs_, preferred subnet CIDR range identified (no smaller than a `/19` range).

### What’s Next

After your data plane is activated, you’ll be able to spin up new Airflow environments, deploy pipelines through the Astro CLI, and witness the ability of Astro Runtime.

Our engineers want to help you get started quickly and get back to focusing on your pipelines. We’ll reach out in a few days to see how you’re doing, but don’t hesitate to reach out in the interim via Slack or e-mail.
