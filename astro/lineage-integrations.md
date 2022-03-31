---
sidebar_label: 'Lineage Integrations'
title: "Configure Lineage for Astro and External Systems"
id: lineage-integrations
---

## Overview

This guide explains how to configure your data pipelines to emit lineage data to Astro.

To generate lineage graphs for your data pipelines, you first need to configure your data pipelines to emit lineage data. Because lineage data can be generated in all stages of your pipeline, you can configure pipeline components outside of Astro, such as dbt or Databricks, to emit lineage data whenever they're running a job. Coupled with lineage data from your DAGs, Astro generates a lineage graph that can provide context to your data before, during, and after it reaches your Deployment. 

Lineage data is generated via OpenLineage, which is an open source standard for lineage data creation and collection. Astro receives metadata about running jobs and datasets via the OpenLineage API. Each Astro Organization has an OpenLineage API key that you can specify in your external systems. Your external systems can use this API key to send lineage data back to your Control Plane.

![image](docs/onboarding/images/how-metadata-flows-astro.svg)

Generally, configuring a system to send lineage data requires:

- Installing an OpenLineage backend to emit lineage data from the system
- Specifying your organization's OpenLineage API endpoint to send lineage data back to the Astro Control Plane.

## Set Up Lineage

Use the documents included in this tab to configure lineage for various external systems that are connected to your data pipelines.

Several Airflow operators emit lineage data out of the box on Runtime. For a full list of supported operators, see Astronomer documentation. Alternatively, you can create a [custom integration](http://openlineage.io/getting-started).

### Lineage API Key

The following OpenLineage API key is unique to your organization:

```
{your lineage api key}
```

To send lineage to Astro, specify this key when configuring your external systems to emit lineage data. The docs available in this tab will automatically show this API key whenever it's required in a setup step.
