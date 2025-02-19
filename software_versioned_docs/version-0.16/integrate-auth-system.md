---
sidebar_label: 'Integrate an Auth System'
title: 'Integrate an Auth System on Astronomer Software'
id: integrate-auth-system
description: Integrate your internal authentication server with Astronomer Software.
---

## Overview

Astronomer Software by default allows users to create an account with and authenticate using one of the 3 methods below:

- Google OAuth
- GitHub OAuth
- Local username/password

Authentication methods are entirely customizable. In addition to the 3 defaults above, we provide the option to integrate any provider that follows the [Open Id Connect (OIDC)](https://openid.net/connect/) protocol via [Implicit Flow](https://auth0.com/docs/authorization/mitigate-replay-attacks-when-using-the-implicit-flow). This includes (but is not limited to):

- [Microsoft Azure Active Directory (AD)](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)
- [Okta](https://www.okta.com)
- [Auth0](https://auth0.com/)

The doc below will walk through how to both enable local authentication and configure any OIDC provider, including step-by-step instructions for the 3 providers listed above.

## Local Auth

To let users authenticate to Astronomer with a local username and password", follow the steps below."

1. Enable Local Auth in your `config.yaml` file:
```yaml
astronomer:
  houston:
    config:
      auth:
        local:
          enabled: true
```

2. Push the configuration change to your platform as described in [Apply a Platform Configuration Change on Astronomer](apply-platform-config.md).

## General OIDC Configuration

If you'd like to integrate an OIDC provider with Astronomer Software, you can enable that configuration in the `config.yaml` file of your `astronomer` directory.

Example:

```yaml
astronomer:
  houston:
    config:
      auth:
        openidConnect:
          clockTolerance: 0 # A field that can optionally be set to adjust for clock skew on the server.
          <provider-name>:
            enabled: true
            discoveryUrl: <provider-discovery-url> # Note this must be a URL that with an https:// prefix
            clientId: <provider-client-id>
            authUrlParams: # Additional required params set on case-by-case basis
```

Replace the values above with those of the provider of your choice. If you want to configure Azure AD, Okta or Auth0 read below for specific guidelines.

## AWS Cognito

### Create a user pool in Cognito

Start by creating a user pool in Cognito. You can either review the default settings or step through them to customize.

Make sure that you create an `App client`, which is the OpenID client configuration that we will use to authenticate against. You do not need to generate a client secret, as Astronomer is a public client that uses implicit flow.

Once the pool and app client are created, head over to the `App integration` >`App client settings` tab and configure these settings:

- Select an identity provider to use (either the built-in cognito user pool or a federated identity provider).
- Set the callback URL parameter to `https://houston.BASEDOMAIN/v1/oauth/redirect/`.
- Enable `Implicit grant` in `Allowed OAuth Flows`. Leave the other settings disabled.
- Enable `email`, `openid`, and `profile` in `Allowed OAuth Scopes`.

Then switch over to the `Domain name` tab and select a unique domain name to use for your hosted Cognito components.

This should give you a minimally working user pool configuration.

### Edit your Astronomer configuration

Add the following values to your `config.yaml` file in the `astronomer/` directory:

```yaml
astronomer:
  houston:
    config:
      auth:
        openidConnect:
          cognito:
            enabled: true
            clientId: <client_id>
            discoveryUrl: https://cognito-idp.<AWS-REGION>.amazonaws.com/<COGNITO-POOL-ID>/.well-known/openid-configuration
            authUrlParams:
              response_type: token
```

Your Cognito pool ID can be found in the `General settings` tab of the Cognito portal. Your client ID is found in the `App clients` tab.

Once you've saved your `config.yaml` file with these values, push it to your platform as described in [Apply a Config Change](apply-platform-config.md).

## Azure AD

### Register the Application via `App Registrations` on Azure

To start, register the application. As you do so, make sure to specify the Redirect URI as `https://houston.BASEDOMAIN/v1/oauth/redirect/`.

Replace `BASEDOMAIN` with your own. For example, if your basedomain were `astronomer-development.com`, your registration would look like the following:

![application](/img/docs/azure-application.png)

### Enable Access and ID Tokens

From there, head over to 'Authentication' to:

- Make sure that Access Tokens and ID tokens are enabled
- Verify the Redirect URI

Example:

![authentication.png](/img/docs/azure-authentication.png)

### Enable Azure AD in your config.yaml file

Make sure the `config.yaml` file in your `astronomer` directory is updated with the proper values:

```yaml
astronomer:
  houston:
    config:
      auth:
        openidConnect:
          google:
            enabled: false
          microsoft:
            enabled: true
            clientId: <client_id>
            discoveryUrl: https://login.microsoftonline.com/<tenant-id>/v2.0/
        github:
          enabled: false
```
Then, push the configuration change to your platform as described in [Apply a Platform Configuration Change on Astronomer](apply-platform-config.md).

## Okta

To integrate Okta with Astronomer, you'll need to make configuration changes both within Okta and on Astronomer.

Follow the steps below.

### Okta Configuration

1. If you haven't already, create an [Okta account](https://www.okta.com/).

2. In your Okta account, create a new web app for Astronomer.

3. In Okta, under **General Settings** > **Application**, set `Login redirect URIs` to `https://houston.BASEDOMAIN/v1/oauth/redirect/`, where `BASEDOMAIN` is the domain where you're hosting your Software installation.

4. Under **Allowed grant types**, select `Implicit (Hybrid)`.

5. Save the `Client ID` generated for this Okta app for use in the next steps.

6. To ensure that an Okta tile appears, set `Initiate Login URI` to `https://houston.BASEDOMAIN/v1/oauth/start?provider=okta`  (_Optional_).

### Enable Okta in your config.yaml file

Add the following to your `config.yaml` file in your `astronomer` directory:

```yaml
astronomer:
  houston:
    config:
      auth:
        openidConnect:
          okta:
            enabled: true
            clientId: "<okta-client-id>"
            discoveryUrl: "https://<okta-base-domain>/.well-known/openid-configuration"
```

Then, push the configuration change to your platform as described in [Apply a Platform Configuration Change on Astronomer](apply-platform-config.md).

>> **Note:** `okta-base-domain` will be different from the basedomain of your Software installation. You can read [Okta's docs on finding your domain](https://developer.okta.com/docs/api/getting_started/finding_your_domain/) if you are unsure what this value should be.

## Auth0

### Auth0 Configuration

#### Create an Auth0 Account

You'll need an Auth0 account in order to set up connections with the identity management provider of your choice. [Sign up for an Auth0 account](https://auth0.com/signup) if you need to.

#### Create Auth0 Tenant Domain

When you log into Auht0 you'll be prompted to create a tenant domain. You can use the default or your own unique `tenant-name`. Your full tenant domain will look something like `astronomer.auth0.com`.

> **Note:** Your full tenant domain may differ if you've created it outside of the United States.

#### Create a Connection between Auth0 and your Identity Management Provider

Depending on the Identity Management Provider you'd like to use, the steps required to establish a connection will vary.

For instructions, navigate to Auth0's [connection guides](https://auth0.com/docs/identityproviders) and select the identity provider of your choice. Once your connection is established, read below.

#### Configure Auth0 Application Settings

**Enable / disable desired connections:**

* Navigate to `https://manage.auth0.com/dashboard/us/<tenant-name>/applications`.
* Under `Applications`, select `Default App`.
* Click the `Connections` tab. You should see your connection created in Step 3 listed here. Enable your new connection, and disable any connections that you won't be using.

**Edit the Default App settings:**

* Navigate to `https://manage.auth0.com/dashboard/us/<tenant-name>/applications`.
* Under `Applications`, select `Default App`.
* Click the `Settings` tab.
* Under `Allowed Callback URLs`, add `https://houston.<your-astronomer-base-domain>/v1/oauth/redirect/`.
* Under `Allowed Logout URLs`, add `https://app.<your-astronomer-base-domain>/logout`.
* Under `Allowed Origins (CORS)`, add `https://*.<your-astronomer-base-domain>`.

**Create Auth0 API:**

* Navigate to `https://manage.auth0.com/dashboard/us/<tenant-name>/apis`.
* Click `+ Create API`.
* Under `Name`, enter `astronomer-ee`.
* Under `Identifier`, enter `astronomer-ee`.
* Leave the value under `Signing Algorithm` as `RS256`.

### Enable Auth0 in your config.yaml file

Add the following to your `config.yaml` file in your `astronomer` directory:

```yaml
astronomer:
  houston:
    config:
      auth:
        openidConnect:
          auth0:
            enabled: true
            clientId: "<default-app-client-id>"
            discoveryUrl: https://<tenant-name>.auth0.com
```
Then, push the configuration change to your platform as described in [Apply a Platform Configuration Change on Astronomer](apply-platform-config.md).

> **Note:** You can find your `clientID` value at `https://manage.auth0.com/dashboard/us/<tenant-name>/applications` listed next to 'Default App'.

## Running behind an HTTPS Proxy

### Overview

Integrating an external identity provider with Astronomer requires that the platform's Houston API component is able to make outbound HTTPS requests to those identity providers in order to fetch discovery documents, sign keys, and ask for user profile information upon login/signup.

If your install is configured _without_ a direct connection to the internet you will need to configure an HTTPS proxy server for Houston.

### Configure an HTTPS Proxy Server for Houston

To configure the proxy server used we need to set the `GLOBAL_AGENT_HTTPS_PROXY` Environment Variable for the Houston deployment.

To do so, add the following to the Houston section of the `config.yaml` file in your `astronomer` directory:

```yaml
astronomer:
  houston:
    config:
      auth:
        openidConnect:
          <provider>:
            enabled: true
            clientId: ...
            discoveryUrl: ...
    env:
      - name: GLOBAL_AGENT_HTTPS_PROXY
        value: http://my-proxy:3129
```

Then, push the configuration change to your platform as described in [Apply a Platform Configuration Change on Astronomer](apply-platform-config.md).
