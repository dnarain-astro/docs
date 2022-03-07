/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation
 The sidebars can be generated from the filesystem, or explicitly defined here.
 Create as many sidebars as you want.
 */

module.exports = {
  cloud: [
    {
      type: 'category',
      label: 'Develop',
      items: [
        'create-project',
        'develop-project',
        'deploy-code',
        'airflow-api',
        'airflow-alerts',
        'kubernetespodoperator',
        'deferrable-operators',
        'test-and-troubleshoot-locally',
      ],
    },
    {
      type: 'category',
      label: 'Astronomer Runtime',
      items: [
        'upgrade-runtime',
        'runtime-version-lifecycle-policy',
        'runtime-release-notes',
      ],
    },
  ],
};
