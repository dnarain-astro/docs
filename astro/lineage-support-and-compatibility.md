---
sidebar_label: 'Data Lineage Support and Compatibility'
title: "Data Lineage Support and Compatibility Reference"
id: data-lineage-support-and-compatibility
description: A compatibility reference guide for Astro lineage's Airflow support.
---

## Overview

This document contains a list of Airflow operators which are supported with Astro lineage by default.

By default, all Astro Deployments gather lineage data from Airflow via the [OpenLineage Airflow integration](https://openlineage.io/integration/apache-airflow/). This integration includes full built-in support for several Airflow operators. These operators emit all available lineage data to your lineage observability dashboard without any additional configuration. Task runs that use these operators will appear as nodes in your data lineage graphs.

Supported operators collect lineage data via monitoring tools called extractors. If you’re using an operator that isn't currently supported for lineage, we recommend either creating an issue in the [OpenLineage GitHub](https://github.com/OpenLineage/OpenLineage) or writing your own custom extractor.

## Fully Supported Airflow Operators

The following operators are fully supported in Astro lineage:

- `PostgresOperator`
- `BigQueryOperator`
- `SnowflakeOperator`
- `GreatExpectationsOperator`

:::tip

The `GreatExpectationsOperator` additionally emits data quality information to the lineage UI's **Quality** tab.

:::

## Partially Supported Airflow Operators

The following operators are partially supported in Astro lineage:

- `PythonOperator`
- `BashOperator`

Partially supported operators:

- Appear in the lineage UI graph view as nodes when used in an Airflow task.
- Emit task run-based lineage data.
- Do not emit lineage data about input or output datasets.

## Other Known Limitations

Lineage on Astro is still in active development. Keep in mind the following limitations when using lineage functionality:

- Until Airflow 2.3.0 is released, supported Airflow operators will not emit lineage data about failed task runs.
- [Add more limitations here]
