<br/>
<p align="center">
  <a href="https://codestitch.app/">
    <img src="https://codestitch.app/frontend/images/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Intermediate Starter Kit (SASS)</h3>

  <p align="center">
    Introducing the Intermediate Website Kit, presented by CodeStitch. This kit includes a pre-configured Eleventy environment with Nunjucks templating, along with seamless integration of Decap CMS. This setup allows you to quickly start a project while providing your client with a blog for content management. Everything is ready to go right from the start, offering a fantastic introduction to the advantages of a Static Site Generator, complete with SASS preprocessing.
    <br/>
    <br/>
    <a href="https://github.com/CodeStitchOfficial/Intermediate-Website-Kit-LESS">LESS Starter Kit</a>
    .
    <a href="https://codestitch-intermediate.netlify.app/">View Live Result</a>
    .
    <a href="https://www.youtube.com/watch?v=0BNCYM4InT0&t">Watch Video</a>
    .
    <a href="https://codestitch.app/contact">Report Bug</a>
  </p>
</p>

## Table of Contents

-   <a href="#overview">Overview</a>
-   <a href="#prerequisites">Prerequisites</a>
    -   <a href="#must-knows">Must Knows</a>
    -   <a href="#good-to-knows">Good-to-knows</a>
-   <a href="#quick-start-guide">Quick Start Guide</a>
-   <a href="#formatting">Formatting</a>
-   <a href="#explanation-of-file-structure">Explanation of File Structure</a>
    -   <a href="#root-files">Root Files</a>
        -   <a href="#eleventyjs">.eleventy.js</a>
        -   <a href="#netlifytoml">netlify.toml</a>
        -   <a href="#packagejson-and-package-lockjson">package.json and package-lock.json</a>
    -   <a href="#nodemodules">node_modules/</a>
    -   <a href="#public">public/</a>
    -   <a href="#src">src/</a>
        -   <a href="#_data">\_data/</a>
        -   <a href="#_includes">\_includes</a>
            -   <a href="#nav-auto">Navigations \- Rendering Automatically</a>
            -   <a href="#nav-manual">Navigations \- Rendering Manually</a>
    -   <a href="#admin">admin/</a>
    -   <a href="#assets">assets/</a>
    -   <a href="#config">config/</a>
    -   <a href="#content">content/</a>
    -   <a href="#root-src-files">Root src/ Files</a>
        -   <a href="#redirects">\_redirects</a>
        -   <a href="#indexhtml">index.html</a>
        -   <a href="#robotshtml">robots.html</a>
        -   <a href="#sitemaphtml">sitemap.html</a>
-   <a href="#deployment">Deployment</a>

<a name="overview"></a>

## Overview

The Intermediate Website Kit builds off the beginner kits, mainly by including a pre-configured [Eleventy](https://www.11ty.dev) environment. This setup allows for reusable components, centralized data, and greater scalability as your clients grow. Additionally, a blog has been provided through [Decap CMS](https://decapcms.org/), enabling your clients to manage their own content. This can easily be adapted to various use cases, such as menus, job listing boards, portfolios, and more. A few additional plugins have also been included to enhance the developer experience, offering HTML/CSS minification, JS bundling/minification, and automatic sitemap generation.

An example website is also provided, with easy substitution of website sections through the use of [CodeStitch's vanilla component library](https://codestitch.app/). This kit aims to get any project off the ground as quickly as possible, with deployment achievable in as little as two minutes, including CMS hosting.

<a name="prerequisites"></a>

## Prerequisites

<a name="must-knows"></a>

### Must Knows

_Knowledge requirements before using the kit_

-   HTML/CSS
-   Beginner-level JS
-   Familiarity with working in a NodeJS-powered project (handling dependencies with npm, source vs built files, etc)
-   Familiarity with templating languages (this kit uses Nunjucks)

<a name="good-to-knows"></a>

### Good-to-knows

_Not required for light-medium kit usage, but helpful if you want to customise the kit beyond base functionality_

-   Nunjucks ([Docs found here](https://mozilla.github.io/nunjucks/))
    -   If you've never used Nunjucks before, [this excellent article by Hyunbin](https://hyunbinseo.medium.com/nunjucks-settings-for-vs-code-a0da0dc66b95) explains how to set up VSCode to best support Nunjucks, including formatting, syntax highlighting and Emmet.
-   Eleventy ([Docs found here](https://www.11ty.dev/docs/)). Key topics include:
    -   [The Data Cascade](https://www.11ty.dev/docs/data-cascade/)
    -   [Layouts](https://www.11ty.dev/docs/layouts/)
    -   [Permalinks](https://www.11ty.dev/docs/permalinks/)
    -   [Passthroughs](https://www.11ty.dev/docs/copy/)
-   Decap CMS ([Docs found here](https://decapcms.org/docs/intro/))

<a name="quick-start-guide"></a>

## Quick Start Guide

1.  At the top of this repository page, click the **Use This Template** button to create a new repository.
2.  Follow the instructions to create a new repository from the starter kit.
3.  Clone the repository locally to your computer and open it in VS Code.
4.  Run `npm install` to install all dependencies.
5.  After the installation is complete, run `npm start` to start the development server.
6.  Fill out the `./src/_data/client.js` file with the appropriate information for your client.
7.  Adjust the `:root` variables in `./src/assets/[sass or less]/root.[scss or less]`
8.  Modify the website files (use `./src`, NOT `./public`) as needed. Use the template file in `content/pages/_template.txt` to get started, or modify the existing pages.
9.  Deploy using your preferred hosting provider.

<a name="formatting"></a>

## Formatting

This template leverages Prettier to format all project files, with configuration settings located in the `.prettierrc` file. Since Prettier doesn’t natively support Nunjucks, we use the Jinja template formatter as an alternative, as recommended in this [guide](https://saneef.com/blog/format-nunjucks-files-with-prettier/).

<a name="explanation-of-file-structure"></a>

## Explaination of File Structure

This documentation will explain all the files and directories in the starter kit, from root inwards, top to bottom. By the end, you should have a full understanding of all files and directories, and be fully equipped to adapt the kit to your needs.

```
.
├── public/
├── src/
│ ├── _data/
│ │ └── client.js
│ ├── _includes/
│ │ ├── components/
│ │ └── layouts/
│ ├── admin/
│ │ └── config.yml
│ ├── assets/
│ │ ├── css/
│ │ ├── favicons/
│ │ ├── fonts/
│ │ ├── images/
│ │ ├── js/
│ │ ├── sass or less/
│ │ └── svgs/
| ├── config/
│ ├── content/
│ │ ├── blog/
│ │ └── pages/
│ ├── _redirects
│ ├── index.html
│ ├── robots.txt
├── .eleventy.js
└── netlify.toml
└── package-lock.json
└── package.json
```

<a name="root-files"></a>

### Root Files

<a name="eleventyjs"></a>

#### .eleventy.js

The heart of the kit, the `.eleventy.js` file configures the Eleventy static site generator to work as needed. Here, we're able to define settings that control how files are processed, set up filters/shortcodes to modify data at build time, define which languages are used, and set up third-party plugins to add additional functionality to the kit.

The `.eleventy.js` file is well-documented, with all necessary extra documentation provided for extra reading if desired. A full list of functionalities added via `.eleventy.js` is given below:

-   Sets up CSS and JS as template languages, allowing modification at build time by Eleventy. JS is bundled and minified by esbuild.
-   Adds the following plugins:
    -   [Eleventy Navigation](https://github.com/11ty/eleventy-navigation) - Allows the option to define navigation data within the template front matter.
    -   [Eleventy Sitemap](https://www.npmjs.com/package/@quasibit/eleventy-plugin-sitemap) - Automatically generates a sitemap from all files in `./src/content`.
    -   [Eleventy Minification](https://github.com/benjaminrancourt/eleventy-plugin-files-minifier) - Minifies HTML and CSS (only run in production - when `npm run build` is executed).
-   Passes through all assets (in `./src/assets`) without modification by Eleventy.
-   Adds date formatting filters and a year shortcode.
-   Sets some basic server options.

<a name="netlifytoml"></a>

#### netlify.toml

The kit is made to support deployment to Netlify out-of-the-box, enabled through this `netlify.toml` file. Here, some basic configuration is used to define the `public/` directory as serving the built website files, as well as adding a Google Lighthouse plugin to show Lighthouse scores in Netlify.

<a name="packagejson-and-package-lockjson"></a>

#### package.json and package-lock.json

Standard NodeJS package files, containing the dependencies needed for the project to work. The only things worth noting are the `watch:eleventy` and `build:eleventy` scripts in `package.json`. When `npm start` is used, the `watch:eleventy` script is run, which contains an environment variable (`ELEVENTY_ENV=DEV`). When `npm run build` is used, the `ELEVENTY_ENV` variable is set to `PROD`.

You may notice around the project (e.g., `./src/config/server.js` and `.eleventy.js`) that there is reference to an `isProduction` variable. This is used to control some functionality that is only run while the website is "in production". For example, when `npm run build` is used, we can assume the website is deployed to a live domain, so we can do things like minify the code. This allows comments to be shown in the dev tools while you're actively working on the site but have them removed, and the code minified, for the smallest file sizes and most efficiency when you deploy it.

You shouldn't have to worry about this, however, as all the initial setup has been done for you. It's still good to know if you wish to expand the kit to add production-only functionality.

<a name="nodemodules"></a>

### node_modules/

This directory contains the code for all the dependencies that power this kit. It comes as standard with any NodeJS-powered project, much like the `package.json` and `package-lock.json` files. You can safely ignore this directory in your day-to-day work.

<a name="public"></a>

### public/

All files that have been processed and built by Eleventy are stored here. These are the files that your users will be served and see when they visit the website. It's helpful to look into this directory to debug any issues that may appear in your project, but take care not to actively work in this directory. Any changes you make here will be overwritten the next time the project is run with what's contained in `src/`.

It's also good to understand how it works when a user goes to a domain. If a user goes to [www.example.com](http://www.example.com), the server will look for an `index.html` file at the root of the directory. If they then navigate to [www.example.com/about](http://www.example.com/about), the server will serve the `index.html` file in the /about directory. This is why you'll see a number of directories, all with "index.html" files contained within. If you're expecting a file to be present but you're getting 404 errors when navigating to the appropriate path, check to see if the correct directory/file is being written.

<a name="src"></a>

### src/

<a name="_data"></a>

#### \_data/

This directory contains data files that are accessible within any template throughout the project. Out of the box, the kit only contains a `client.js` file, which holds some information you may wish to define for a client. It's important to fill this file out with the correct information for your client, as many HTML meta tags, the sitemap, and robots.txt all use data from this file.

Consider adding the client's contact details, address, and social media information to this file. Examples have been provided in the kit. This way, you can access the client's information from a single source of truth. If a client changes their email address, you can update it in the `client.js` file and have it reflect across the website without needing to search through multiple files or use Find and Replace.

As an example, we have defined the client's email address under the `email` key. In the footer (`./src/_includes/components/footer.html`), we can use `{{ client.email }}` to access this value and output "help@codestitch.app". The format for outputting the data is `{{ [FILENAME].[KEY] }}`. If we wanted to add another file for pricing information, we could create a file (`_data/pricing.json`), then use `{{ pricing.price }}` to render the price.

In Eleventy, this is known as "Global Data". You can read more about Global Data [here](https://www.11ty.dev/docs/data-global/), with more information about how this works in the context of the Data Cascade [here](https://www.11ty.dev/docs/data-cascade/).

<a name="_includes"></a>

#### \_includes/

The `_includes` directory contains pieces of HTML code that you want to share between multiple pages. This code could be small components (a button or a loading spinner), larger sections (header, footer, or a stitch from [CodeStitch](https://codestitch.app/)), or a layout containing a reusable `<head>` element with all necessary meta tags.

By default, the kit has two sub-directories in `_includes` - one for components and one for layouts.

Components can be used on one, none, or many pages. For example, we've set up a header and a footer that we load on all pages (through `_includes/layouts/base.html`). If you want to make a change to the header or footer, you can do so within `_includes/components`, and this change will be reflected across all pages. This is done by using `{% include "components/header.html" %}`. If you want to adjust some of the data within the component (e.g., a button that has the same structure/core styles but different CTA text), you should look into using a [Nunjucks Macro](https://mozilla.github.io/nunjucks/templating#macro), which you can [import](https://mozilla.github.io/nunjucks/templating#import) where needed.

Layouts define the wider page structure. The main one used in this kit is `base.html`, which contains the document type declaration, `<head>` tag with associated `<meta>` tags (using data in `_data/client.js` and the page front matter), a `<body>` with a `<main>` tag and skip-to-content link, and calls to the header and footer. All pages use `base.html`. This has been configured to work automatically, so you shouldn't need much additional work. For the blog, we have also created a `post.html` layout (which also uses the `base.html` file, through Nunjucks' `{% extends %}`) that we use to render the blog article pages.

<a name="nav-auto"></a>

##### Navigations - Rendering Automatically

One thing you may notice in the `\_includes/header.html` file is the vast amount of Nunjucks code in the `cs-ul-wrapper` element. This is code that makes use of the `eleventyNavigation` object and keys in the frontmatter of all pages that are, by default, added to the kit. This is part of the Eleventy Navigation plugin, which allows us to create scalable navigation menus without having to constantly add new list items and dropdowns to the header whenever a new page is made. If you make a new page using the `\_template.txt` file in `content/pages`, you will be guided to add this information into the front matter, where the navigation will be remade with the new page data automatically.

If you wish to use this kit, and benefit from this way of doing navigations but want to swap out the navigation for another one in the CodeStitch template library, you can copy the `cs-ul-wrapper` `<div>` element that's found in the kit and replace the `cs-ul-wrapper` in the new stitch. As the class system is the same with all Stitches, the auto-rendering functionality, including the application of active-style classes and dropdowns (if a "dropdown" Stitch is used) will remain the same.

<a name="nav-manual"></a>

##### Navigations - Rendering Manually

Some developers may wish to continue with the "old school" way of rendering navigations and add the HTML for new navigation links to the header individually. This is fine to do too.

One issue that you may run into, however, is the addition of the `cs-active` class to the page that the user is currently on. As the same navigation element is being rendered on all pages, manually adding the `cs-active` class to one of the navigation items will cause that item to be "activated" between all pages.

To get around this, you will need to manually add some Nunjucks code to each of the navigation items to check the page the user is on and add `cs-active` if that particular page is being viewed. That code would look like this:

```
<a href="/contact" class="cs-li-link {% if page.url == '/contact/' %} cs-active {% endif %}">
    Contact
</a>
```

Note the if-check in the `class` attribute of the anchor element. Here, we're checking if `page.url` (the page we're currently on) matches the permalink of the navigation item. Make sure both leading and trailing slashes are used. If this were for the home page, we'd just check for "/", like so:

```
<a href="/" class="cs-li-link {% if page.url == '/' %} cs-active {% endif %}">
    Home
</a>
```

<a name="admin"></a>

#### admin/

The `admin/` directory sets up [Decap CMS](https://decapcms.org/) to be used within the project. It's configured as a blog that a client can access by navigating to the `/admin/` path on the deployed site, where they can create, update, and delete blog posts whenever they want. This modifies the markdown files in the source code, which will trigger a rebuild in Netlify, incorporating the new blog data. After about one minute, the client can see the new blog post on the website.

Decap CMS has been chosen due to its open-source nature, good UX/DX, and stability. Very little training is required on the client's end to get it to work - the interface is clean and operates without trouble. It works through an `index.html` file in the `admin/` directory that contains a CDN script for the CMS. This `index.html` file is processed as an Eleventy template, added to `/public/admin`, and the CMS is loaded when navigating to the `/admin` path.

The CMS is configured through a `config.yml` file, as per the Decap documentation. If you wish to use the blog as-is, you shouldn't need to make any changes here. If you want to extend the kit and modify the CMS for your own needs, we recommend referring to the Decap documentation for guidance on how to do so.

<a name="assets"></a>

#### assets/

All other non-content files are stored in `assets/`, which is set up in `.eleventy.js` to be passed through to `public/`. A brief overview of each of the folders within `assets/`, and any relevant notes, is provided below:

-   `css/` - SASS/LESS files from the `less/` or `sass/` directories are built into `css/`. From here, the CSS is processed as an Eleventy template, where we minify the code (production only), and pass it through to `public/`. **Do not** make CSS changes here - instead, use the SASS or LESS asset directory (depending on which kit you're using).
-   `favicons/` - Any favicon files can be stored here. We recommend using [this tool](https://realfavicongenerator.net/) to generate favicons for all devices.
-   `fonts/` - If you have any non-standard fonts you wish to locally host, you can put the files here. You can use [this tool](https://gwfh.mranftl.com/fonts) to download font files to be stored in `fonts/`, as well as generate the code to be put in your `root.scss` or `root.less` file.
-   `images/` - Any images can go here. No processing will occur.
-   `js/` - Put any JavaScript in this directory. It will be processed, bundled, and minified by esbuild.
-   `sass/` or `less/` - Depending on whether you're using the SASS or LESS version of the kit, you'll find your preprocessor files in one of these directories. Make your changes to styling here, not in `assets/css`
-   `svgs/` - A separate directory for SVGs. This makes it easier to bulk-compress SVGs separate from `images/` if you're using a tool like [compressor.io](https://compressor.io/).

<a name="config"></a>

#### config/

All configurations for Eleventy are held in this directory. This includes settings for plugins, extensions, filters, and shortcodes, among other things.

Unless you are confident in your Eleventy abilities, we recommend not making any changes to the files in this directory, as they have all been carefully configured to work without modification. If you are confident enough to make changes, you likely don't need a README to tell you what you're doing!

<a name="content"></a>

#### content/

Any files that are built into HTML pages are held in `content/`. This includes standalone informational pages (held in `pages/`) and the blog markdown posts, which use the `post.html` layout (that in turn uses `base.html` through [Eleventy layout chaining](https://www.11ty.dev/docs/layout-chaining/) and [Nunjucks template inheritance](https://mozilla.github.io/nunjucks/templating#block)) to form the blog posts controlled by the CMS.

You're welcome to modify any of these pages or create your own. If you wish to create your own pages, a template can be found in `pages/content/_template.txt`. Copy this file, paste it, rename it to an HTML file, and follow the structure shown in the template. This template contains some code at the top, wrapped between "---"s, which is called the front matter. This contains data specific to this page, which is used within the layout to set the `<title>` tag, `<meta>` description tag, among other things. This data will overwrite any data contained elsewhere in the [Eleventy Data Cascade](https://www.11ty.dev/docs/data-cascade/).

A copy of the default front matter can be found below:

```
---
title: 'Page title for <title> and OG tags'
description: 'Description for <meta> description and OG tags'
preloadImg: '/assets/images/imagename.format'
permalink: 'page-path/'
eleventyNavigation:
    key: Name to appear in navigation
    order: 1000
    parent: Optional - Put another page's "key" here to create a dropdown
    hideOnMobile: Optional - set to "true" to hide on devices from, and below, 1023px
    hideOnDesktop: Optional - set to "true" to hide on devices above, and including, 1024px
---
```

Under the front matter, there is some more code:

```
{% extends "layouts/base.html" %}

{% block head %}
    <!-- Any page-specific tags that belong in the <head>, such as a page-specific stylesheet -->
{% endblock %}

{% block body %}
    <!-- Page HTML goes here, without a <main> wrapper -->
{% endblock %}
```

The first line, `{% extends "layouts/base.html" %}`, denotes the layout we should use. In the case of this kit, we're using the layout in `_includes/layouts/base.html`. Any code between the `{% block head %} ... {% endblock %}` will be inserted in the `<head>` of the document. This can be useful to insert stylesheets and scripts which you only want to load on this particular page. The page HTML content can be provided within the `{% block body %} ... {% endblock %}`. This will be inserted in the `<body>` of the HTML document, within a `<main>` tag.

Blocks are a Nunjucks feature, which you can read more about [here](https://mozilla.github.io/nunjucks/templating#block).

As mentioned, blog files are held in `content/blog`, with the CMS configured to add new posts as markdown files to this directory. As we can't define things like the layout, tags, permalink, or CSS preloads in the individual markdown files, a [directory data file](https://www.11ty.dev/docs/data-template-dir/) is used in `/blog/` to define this.

A similar directory data file (`content.json`) is used in the `content/` directory to define a "sitemap" tag. This adds all pages in `content/` to the sitemap [collection](https://www.11ty.dev/docs/collections/), which renders our sitemap automatically for us.

<a name="root-src-files"></a>

#### Root src/ Files

<a name="redirects"></a>

##### \_redirects

Set up any redirect rules here. More information can be found in the [Netlify Docs](https://docs.netlify.com/routing/redirects/).

<a name="indexhtml"></a>

##### index.html

The home page. Treat it as if it were any other page in `content/pages`.

<a name="robotshtml"></a>

##### robots.html

Set up as an HTML file so we can use the domain in `_data/client.js` to automatically create a `robots.txt` file in `/public`. We do this by setting the permalink to `/robots.txt`. Unless you need to block crawlers from other pages (we've already blocked `/admin` for you), you shouldn't need to touch this file.

<a name="sitemaphtml"></a>

##### sitemap.html

Similar to `robots.html`, a `.html` file is used to generate a `sitemap.xml` file. It uses all HTML files that have a "sitemap" tag applied, which should be all pages in `content/`.

<a name="deployment"></a>

## Deployment

When you're happy with your website, you can deploy it to your hosting provider of choice. As this kit uses Netlify, we have outlined some instructions below:

1.  Sign in to or create an account with [Netlify](https://www.netlify.com/).
2.  Go to [https://app.netlify.com](https://app.netlify.com), click **Sites** on the left-hand navigation, then click **Add new site**, and choose **Import an existing project**.
3.  Choose to deploy your project with GitHub. Follow the steps to link Netlify and GitHub.
4.  Find your project in the list of repositories.
5.  Everything should be already configured, thanks to the `netlify.toml` file. Click **Deploy [PROJECT NAME]**.
6.  Check to see if your site deploys without error. The site should be live, but we still need to set up the CMS.
7.  Go to **Site Configuration > Identity**, and select **Enable Identity service**.
8.  Under **Registration preferences**, select **Open** or **Invite only**. In most cases, you want only invited users to access your CMS, but if you're just experimenting, you can leave it open for convenience.
9.  If you'd like to allow one-click login with services like Google and GitHub, check the boxes next to the services you'd like to use under **External providers**.
10. Scroll down to **Services > Git Gateway**, and click **Enable Git Gateway**. This authenticates with your Git host and generates an API access token. In this case, we're leaving the **Roles** field blank, which means any logged-in user may access the CMS. For information on changing this, check the [Netlify Identity documentation](https://www.netlify.com/docs/identity/).
11. Test the CMS by navigating to `/admin` on the deployed website
