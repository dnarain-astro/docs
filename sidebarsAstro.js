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
      type: 'doc',
      label: 'Overview',
      id: 'overview'
    },
    {
      type: 'category',
      label: 'Get Started',
      items: [
        'install-aws',
        'install-cli',
      ],
    },
    {
      type: 'category',
      label: 'Write DAGs',
      items: [
        'airflow-api',
        'airflow-alerts',
        'kubernetespodoperator',
        'deferrable-operators',
      ],
    },
    {
      type: 'category',
      label: 'Develop Your Project',
      items: [
        'create-project',
        'develop-project',
        'deploy-code',
        'test-and-troubleshoot-locally',
      ],
    },
    {
      type: 'category',
      label: 'Configure Deployments',
      items: [
        'configure-deployment',
        'api-keys',
        'environment-variables',
        'secrets-backend',
      ],
    },
    {
      type: 'category',
      label: 'Deploy to Astro',
      items: [
        'deploy-code',
        'ci-cd',
      ],
    },
    {
      type: 'category',
      label: 'Monitor',
      items: [
        'deployment-metrics',
        'scheduler-logs',
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      items: [
        'create-cluster',
        'configure-idp',
        'manage-workspaces',
        'add-user',
        'user-permissions',
        'modify-cluster',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        {
          type: 'category',
          label: 'Release Notes',
          items: [
            'release-notes',
            'runtime-release-notes',
          ],
        },
        'known-limitations',
        'resource-reference-aws',
        'platform-variables',
        {
          type: 'category',
          label: 'Security',
          link: {type: 'doc', id: 'security'},
          items: [
            'shared-responsibility-model',
            'resilience',
            'disaster-recovery',
            'data-protection',
            'secrets-management',  ],
        },
      ],
    },
  ],
  sidebarsCLI: [
    {
      type: 'doc',
      label: 'Install CLI',
      id: 'install-cli'
    },
    {
      type: 'doc',
      label: 'Release Notes',
      id: 'cli-release-notes',
    },
    {
      type: 'category',
      label: 'auth',
      collapsed: false,
      items: [
        'cli-reference/astrocloud-auth-login',
        'cli-reference/astrocloud-auth-logout', ],

    },
    {
      type: 'doc',
      label: 'completion',
      id: 'cli-reference/astrocloud-completion',
    },
    {
      type: 'doc',
      label: 'deploy',
      id: 'cli-reference/astrocloud-deploy',
    },
    {
      type: 'category',
      label: 'deployment',
      collapsed: false,
      items: [
        'cli-reference/astrocloud-deployment-create',
        'cli-reference/astrocloud-deployment-delete',
        'cli-reference/astrocloud-deployment-list',
        'cli-reference/astrocloud-deployment-logs',
        'cli-reference/astrocloud-deployment-update', ],

    },
    {
      type: 'category',
      label: 'dev',
      collapsed: false,
      items: [
        'cli-reference/astrocloud-dev-init',
        'cli-reference/astrocloud-dev-kill',
        'cli-reference/astrocloud-dev-logs',
        'cli-reference/astrocloud-dev-parse',
        'cli-reference/astrocloud-dev-ps',
        'cli-reference/astrocloud-dev-pytest',
        'cli-reference/astrocloud-dev-run',
        'cli-reference/astrocloud-dev-start',
        'cli-reference/astrocloud-dev-stop',
        'cli-reference/astrocloud-dev-restart', ],

    },
    {
      type: 'doc',
      label: 'version',
      id: 'cli-reference/astrocloud-version',
    },
    {
      type: 'category',
      label: 'workspace',
      collapsed: false,
      items: [
        'cli-reference/astrocloud-workspace-list',
        'cli-reference/astrocloud-workspace-switch',          ],
        },
      ],
      project: [
        {
          type: 'doc',
          label: 'SDK documentation',
          id: 'placeholder'
        },
      ],
};
