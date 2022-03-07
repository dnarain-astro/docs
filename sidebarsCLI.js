/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation
 The sidebars can be generated from the filesystem, or explicitly defined here.
 Create as many sidebars as you want.
 */

module.exports = {
  sidebarsCLI: [
    {
      type: 'doc',
      label: 'Install CLI',
      id: 'install-cli'
    },
    {
      type: 'doc',
      label: 'Release Notes',
      id: 'CLI Release Notes'
    },
    {
      type: 'category',
      label: 'CLI Command Reference',
      link: {type: 'doc', id: 'cli-reference'},
      items: [
        'cli-reference/astrocloud-auth-login',
        'cli-reference/astrocloud-auth-logout',
        'cli-reference/astrocloud-completion',
        'cli-reference/astrocloud-deploy',
        'cli-reference/astrocloud-deployment-create',
        'cli-reference/astrocloud-deployment-delete',
        'cli-reference/astrocloud-deployment-list',
        'cli-reference/astrocloud-deployment-logs',
        'cli-reference/astrocloud-deployment-update',
        'cli-reference/astrocloud-dev-init',
        'cli-reference/astrocloud-dev-kill',
        'cli-reference/astrocloud-dev-logs',
        'cli-reference/astrocloud-dev-parse',
        'cli-reference/astrocloud-dev-ps',
        'cli-reference/astrocloud-dev-pytest',
        'cli-reference/astrocloud-dev-run',
        'cli-reference/astrocloud-dev-start',
        'cli-reference/astrocloud-dev-stop',
        'cli-reference/astrocloud-dev-restart',
        'cli-reference/astrocloud-version',
        'cli-reference/astrocloud-workspace-list',
        'cli-reference/astrocloud-workspace-switch',          ],
        },
      ],
    };
