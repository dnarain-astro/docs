---
sidebar_label: 'Migrate to Astro'
title: "Migrate DAGs to Astro"
id: migrate-to-astro
---

## Overview

This guide explains how to migrate existing DAGs to Astro.

To provide a differentiated experience of Airflow, Astro projects use specific formatting and versions for DAGs and dependencies. Whether you are migrating DAGs from open source Airflow, Astornomer Software, or another commercial offering, you can follow this guide to start running your DAGs either locally or on Astro.

## Step 1: Upgrade to Airflow 2.0/2.1.1

If you have already upgraded all DAGs to Airflow 2.0+, you can skip this step.

Astro Runtime, which is Astro's Airflow runtime environment, only supports Airflow 2.1.1+. To run any existing DAGs on Airflow 1.10.15 or less, you must first upgrade to Airflow 2.0 and then upgrade to a subsequent minor release. Follow the instructions in this step to manage the 2.0 ugprade process with limited disruption to your existing project.

### a. Upgrade to Airflow 1.10.15

[Airflow 1.10.14](https://github.com/apache/airflow/releases/tag/1.10.14) was built to make the migration and testing process as easy as possible. [Airflow 1.10.15](https://github.com/apache/airflow/releases/tag/1.10.15) was subsequently released with additional bug fixes and improvements. We recommend upgrading your existing Airflow environment to at least 1.10.15 before upgrading to Airflow 2.0+.

### b. Run the Upgrade Check Script

Apache Airflow released an [Upgrade Check Script](https://airflow.apache.org/docs/apache-airflow/2.1.3/upgrade-check.html) that scans your project and detects instances of code that need to be updated for Airflow 2.0. Run this script in your existing Airflow environment to determine the scope of the changes you need to complete for your upgrade.

> **Note:** In the upgrade check output above, you can ignore the `Fernet is enabled by default` and `Check versions of PostgreSQL, MySQL, and SQLite to ease upgrade to Airflow 2.0` tests. All of these details are handled by Astro. You can also ignore the and `Users must set a kubernetes.pod_template_file value` test even if you are running the Kubernetes Executor.

The following topics explain some of the changes that you might need to complete for this upgrade.

#### Import Operators from Backport Providers

All Airflow 2.0 Operators and Extras are backwards compatible with both Airflow 1.10.14 and Airflow 1.10.15. To transition to using these providers, refer to [1.10.15 Backport Providers](https://airflow.apache.org/docs/apache-airflow/1.10.15/backport-providers.html) in Apache Airflow documentation or reference the collection of [Backport Providers in PyPi](https://pypi.org/search/?q=apache-airflow-backport-providers&o=).

#### Modify Airflow DAGs

Depending on how your DAGs are written, you'll likely need to modify your code to be 2.0-compatible. This could include:

- Changes to undefined variable handling in templates
- Changes to the KubernetesPodOperator
- Changes to the default value for `dag_run_conf_overrides_params`

For more information, refer to [Step 5: Upgrade Airflow DAGs](http://apache-airflow-docs.s3-website.eu-central-1.amazonaws.com/docs/apache-airflow/latest/upgrading-to-2.html#step-5-upgrade-airflow-dags) in Apache Airflow documentation.

## Step 2: Install the Astro CLI

The Astro CLI is the primary tool for managing, running, and deploying DAGs on Astro. The rest of this migration guide makes extensive use of the CLI. To install it, follow the steps in [Install the Astro CLI](install-cli.md).

## Step 3: Create an Astro Project

Astro uses a specific project structure that can be bundled into a Docker image and pushed to an Astro Deployment.
