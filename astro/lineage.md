---
sidebar_label: 'Data Lineage'
title: "Observe Deployments Through Data Lineage"
id: lineage
---
## Overview

This guide explains how to navigate the Lineage graph and filter its data to better diagnose potential issues with your data pipelines.

The **Lineage** tab includes real-time metadata genealogy and analytics for your Deployment. This information is rendered as a graph based on your entire data pipeline infrastructure, including both your DAGs and external databases such as Snowflake.

For example, the following lineage graph illustrates the relations between parts of a restaurant order information pipeline as a series of jobs (nodes with a gear icon) and datasets (nodes with a database icon).

Relationships between your DAGs and datasets are represented by vertices, and potential errors for datasets and jobs are represented by the shape and color of a node.

![Lineage graph example](/img/docs/lineage-overview.png)

Using this visualization, it becomes clear how upstream errors can affect downstream jobs, as well as how downstream errors might have originated from upstream errors. Based on your integrations, the nodes of this graph can represent parts of your data pipeline both within and beyond your Astronomer Deployment.

Because the data lineage can map the full journey of your datasets, you can use this information to diagnose errors from the **Logs** and **Metrics** tabs. For example, if you receive an Airflow error log that a DAG failed to load data into an S3 bucket, you can go to the **Lineage** tab to see where your dataset became invalid, even if that occurred before your DAG started running.

## Navigating the Lineage Graph

In the lineage tab, Astronomer renders your data pipeline as a set of **dataset** and **job** nodes connected in a graph:

- Each job represents an individual step in your data pipeline, such as an Airflow task in your Deployment.
- Each dataset represents a data source that your tasks interact with, such as a Snowflake database.

Directed vertices connect jobs to datasets and vice versa. A single vertex will never connect two jobs or two datasets together.

You can navigate the graph by clicking and dragging your mouse across the screen. You can zoom in/out to a specific part of the graph by scrolling with your mouse wheel/ mousepad or by clicking the magnifying glass icons next on the information pane.

To learn more information about a dataset or job, you can either hover over or click its node. Hovering over a node gives you high level information about the node at a glance. Specifically you'll see:

- **Namespace**: Your Astronomer Namespace
- **Name**: Your DAG ID and task ID, formatted as `<dag-id>.<task-id>`
- **Run information (Job only)**: Metadata and status information about a job run
- **Quality checks (Dataset only)**: The status of each completed data quality check for a dataset

Clicking a node populates the information pane with detailed information about the node. For more information about how to use this view, see [Using the Information Pane](lineage.md#using-the-information-page).

### Graph Legend

Clicking on the key icon in the information pane opens the graph legend. The legend provides a visual guide to help you distinguish between:

- Job nodes and Dataset nodes.
- User-selected and unselected nodes.
- Completed, running, failed, and aborted jobs
- Completed, running, failed, and aborted dataset checks

:::info

Dataset and job statuses are based on checks of metadata attached to your data. To see the specifics of why a database check failed, you can click on the failed database node and check the **Quality** tab in the information pane. To check why a job failed, you might need to check the source of the job, such as your DAG or task.

:::

You can also customize how the graph appears in the legend via the **Cluster Mode** and and **Edge Drawing Mode** settings.

### Understanding groupings

To reduce the complexity of the graph, nodes are automatically organized into groups based on an assumed shared context between jobs and datasets.

A group is represented by a transparent grey box surrounding a subset of nodes. You can further reduce the complexity of your graph by collapsing groups using the arrow in the upper lefthand corner of this transparent box. When you collapse a group, the grouped nodes and vertices are replaced by two lists: one for datasets and one for jobs.

### Manage groupings

You can change how your graph is grouped by using the **Graph Cluster Mode** settings in the Legend:

- The ***Job Groups*** cluster mode creates groups based on relations between different jobs. This mode prioritizes visualizing the sequence, inputs, and outputs within jobs.
- The ***Dataset Groups*** cluster mode creates groups based on relations between different databases. This mode prioritizes showing which datasets share a common source or infrastructure.

Note that changing to a different graph cluster mode will change where certain nodes appear on the graph. However, all nodes and the vertices between them remain structurally the same regardless of your cluster mode.

### View Graphs from Past Runs

By default, the lineage graph shows the information based on your Deployment's most recent DAG runs. If you want to see the lineage graph for a previous DAG run, open the **Explore** page on the lefthand sidebar. This page is structured similarly to the Airflow UI's calendar view: It contains a list of your most recent task runs, as well as a calendar that shows all runs over the last year.

To view the lineage graph from a previous date, click that date in the calendar and click on any of the tasks that appear in the **Runs on [Date]** table. This will bring up the lineage graph for the selected date and focus on the specific task that you clicked.

## Using the Information Pane

Below the lineage graph is the **information pane**: a collection of information and metrics for a single selected node. When you click on a node in the graph, the information pane populates all of that nodes information.

The information pane is split into the following tabs:

- **Info**: Shows the code for a job or the schema for a dataset. Also shows the difference between job runs when you create a comparison in the **Compare** tab.
- **Inputs/Outputs**: Shows the inputs and outputs for a job or dataset. This information is equivalent to the upstream and downstream nodes in the graph view.
- **Quality (Dataset only)**: Shows the data quality checks performed on each element of a dataset. You can drill down further into these checks by expanding a listed dataset element.
- **Duration (Job only)**: Shows the duration of upstream job runs, starting with the most upstream job run and descending to the currently selected job run.
- **Compare (Job only)**: Shows other job runs of the currently selected job. Select any two job runs and go to the **Info** tab to see how the code changed between the two job runs. Use this tab to compare job runs with different statuses or run times to measure performance between code changes.

### Using the Quality Tab

The **Quality** tab appears in the information pane whenever you select a dataset node from the graph. It contains both high level charts that provide information about the entire dataset, as well as charts for each individual column of the dataset. These graphs appear only if there is underlying metadata generated by an integrated data check tool, such as Great Expectations.

![Quality tab example](/img/docs/quality-tab.png)

Use the **Quality** tab to detect looking for sudden, unexplained changes in your dataset that could indicate an upstream failure. The following topics explain each available chart in the tab.

### Rows

The Rows chart shows the total number of rows in the dataset over time. A drastic change in rows can occur naturally (for example: when a rapid increase of customer orders during the holiday season). However, it can also indicate an error in an upstream job, especially if it is sudden or unexpected.

### Bytes

The Bytes chart shows the total size of the dataset over time. A sudden increase in dataset size usually means something has changed in the definition of the data. For example, a new column might have been added to your table containing the description of an order, where before it contained only part numbers and quantities.

### Quality Metrics

The Quality Metrics chart shows the pass/fail status of quality assertions in a Great Expectations suite.
To see details on the assertions that have failed, hover over a point on the chart.

### Distinct Count (Column-level)

The Distinct Count chart shows the total number of distinct values for a given column.

A distinct count can sometimes grow unexpectedly, perhaps if a successful campaign creates a set of new `customer_id` values in an order table suddenly. However, it can also suggest an underlying problem if, for example, a `menu_item_id` field shows that thousands of new menu items have been added overnight.

### Null (Column-level)

The Null chart shows the number of rows in the dataset where a given column contains a null value.

A large number of null values can be normal, such as when most orders on your system do not include a discount. However, an increase in null values on a column representing a ubiquitous piece of data, such as `quantity`, might indicate an issue.

### Quality Metrics (Column-level)

The Quality Metrics chart shows the pass/fail status of quality assertions in a Great Expectations suite for a given column.

To see details on the assertions that have failed, hover over a given point on the chart.

### Using the Compare Tab

The **Compare** tab shows a list of past job runs for a given job. Using the compare tab, you can select pairs of job runs to see what changed in your pipelines between the two runs. The general Compare tab workflow is as follows:

1. Click a job on the graph.
2. Open the **Compare** tab to see a list of all previous job runs for the selected job. The colored bar above a job run represents both the job run’s duration and run state. Job runs with a run state of `COMPLETE` will have a blue bar, and job runs with a run state of `FAILED` will have an orange bar.

    ![Compare tab example](/img/docs/compare.png)

3. Select any two job runs from the list to enter the “Compare view” of your graph. In this view:

    - Jobs and datasets that experienced a code change between the time of your selected job runs are highlighted on the graph.
    - Jobs and datasets that stayed the same between job runs are greyed out.
    - Your selected job is shown with an anchor icon and a blue box.
    - The bottom of the graph shows information about your comparison.

    ![Graph in compare mode](/img/docs/compare-graph.png)

4. Select a job or dataset that experienced a code change.
5. Open the **Info** tab. Instead of showing a single code source, this tab now shows the code source from both of your compared job runs. Use this information to determine what code change might have been responsible for downstream errors.

    ![Info tab when comparing two code sources](/img/docs/compare-code.png)

## View Summary of Issues across Deployments

You can view all job failures and data quality issues across your DAG runs via the **Home** page in the lefthand sidebar.

![Lineage summary page](/img/docs/lineage-summary.png)

The ****Issues**** table contains links to each job or dataset that caused an issue during a DAG run. To see an issue in the context of a lineage graph, click the name of the related dataset or job in the table.

This page also contains charts that show issue frequency over the last week, sorted by the following issue types:

- All issues
- Job Execution issues
- Job Duration issues
- Data quality issues

To filter the **Issues** table based on a given issue types, click on the chart for that issue type.
