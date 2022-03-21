---
sidebar_label: 'Migrate to Astro'
title: "Migrate DAGs to Astro"
id: migrate-to-astro
---

## Overview

This guide explains how to migrate existing DAGs to Astro.

To provide a differentiated experience of Airflow, Astro projects use specific formatting and versions for DAGs and dependencies. Whether you are migrating DAGs from open source Airflow, Astornomer Software, or another commercial offering, you can follow this guide to start running your DAGs either locally or on Astro.

## Step 1: Upgrade to Airflow 2.1.1

If you have already upgraded all of your DAGs to Airflow 2.1.1+, you can skip this step.

Astro Runtime, which is Astro's Airflow runtime environment, only supports Airflow 2.1.1+. To run any existing DAGs on Airflow 1.10.15 or less, you must first upgrade to at least Airflow 2.1 and then upgrade to a subsequent minor release. For a full guide on upgrading from Airflow 1.10.x to 2.0+, see the [Apache Airflow documentation](https://airflow.apache.org/docs/apache-airflow/stable/upgrading-from-1-10/index.html).

:::info

In the output of Apache Airflow's [upgrade check script](https://airflow.apache.org/docs/apache-airflow/stable/upgrading-from-1-10/index.html#step-3-run-the-upgrade-check-scripts), you can ignore `Fernet is enabled by default` and `Check versions of PostgreSQL, MySQL, and SQLite to ease upgrade to Airflow 2.0 tests`. All of these details are handled automatically in Astro. You can also ignore the `Users must set a kubernetes.pod_template_file value` test even if you are running the Kubernetes Executor.

:::

### Why Airflow 2.0+?

Airflow 2.0+ was built to be fast, reliable, and scalable. Most notably, Airflow 2.0+ includes:

- [Refactored Airflow Scheduler](https://airflow.apache.org/docs/apache-airflow/stable/scheduler.html#running-more-than-one-scheduler) for enhanced performance and high-availability.
- [Full REST API](https://airflow.apache.org/docs/apache-airflow/stable/stable-rest-api-ref.html) that enables more opportunities for automation.
- [TaskFlow API](https://airflow.apache.org/docs/apache-airflow/stable/concepts.html#taskflow-api) for a simpler way to pass information between tasks.
- [Independent Providers](https://github.com/apache/airflow/tree/master/airflow/providers) for improved usability and a more agile release cadence.
- Simplified KubernetesExecutor for flexibility in configuration.
- [UI/UX Improvements](https://github.com/apache/airflow/pull/11195) including a new Airflow UI and auto-refresh button in the **Graph** view.

Airflow 2.1.0 was a follow-up release to Airflow 2.0. If you're not running on Airflow 2.0+ yet, we recommend upgrading from Airflow 1.10.15 to Airflow 2.1 directly. For more information on the release, refer to the [Apache Airflow Changelog](https://airflow.apache.org/docs/apache-airflow/2.1.0/changelog.html) and the [Astronomer Certified Changelog](https://github.com/astronomer/ap-airflow/blob/master/2.1.0/CHANGELOG.md).

## Step 2: Install the Astro CLI

The Astro CLI is the primary tool for managing, running, and deploying DAGs on Astro. To install it, follow the steps in [Install the Astro CLI](install-cli.md).

## Step 3: Migrate Project Code to a New Astro Project

Astro uses a specific project structure that can be bundled into a Docker image and pushed to an Astro Deployment. To migrate your existing code to a locally hosted Astro project:

1. Follow the steps in [Create a Project](create-project.md) to create a new Astro project.
2. Migrate your existing code to the following locations in your new project:

    - DAG files: move to `dags`
    - Python-level dependencies: list dependencies in `requirements.txt`
    - OS-level dependencies: list dependencies in `packages.txt`
    - Custom or community Airflow plugins: move to `plugins`
    - Any other project files: move to `include`

## Step 4: Test Your New Project Locally

Because migrating to Astro can result in changes to your project code, especially if you upgraded from Airflow 1.10.x, we recommend testing your new project in a local Airflow environment using the Astro CLI. For more information about how to test and troubleshoot using the Astro CLI, see [Test and Troubleshoot Locally](test-and-troubleshoot-locally.md).

:::tip

To test your code in as close to a production environment as possible, you can configure environment variables, Airflow Connections, and Airflow Variables directly in your Astro project for local use only. For more information, see [Configure `airflow_settings.yaml`](develop-project.md#configure-airflow_settingsyaml-local-development-only) and [Set Environment Variables via `.env`](develop-project.md#set-environment-variables-via-env-local-development-only).

:::

## Step 4: Deploy to Astro

Once you confirm that your project works as expected in a local environment, you can push your project to a Deployment on Astro. For more information, see [Deploy Code](deploy-code.md).

## Step 5: Create Deployment-Level Configurations

Depending on the function and context of your existing project, you might need to configure additional Astro settings to fully migrate your project to a production Astro Deployment. Read the following docs to learn more about how to configure your project on Astro:

- [Environment Variables](environment-variables.md)
- [Configure a Secrets Backend](secrets-backend.md)
- [Deployment API Keys](api-keys.md)
- [Deploy via CI/CD](ci-cd.md)
