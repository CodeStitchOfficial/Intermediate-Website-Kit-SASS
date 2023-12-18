<br/>
<p align="center">
  <a href="https://codestitch.app/">
    <img src="https://codestitch.app/frontend/images/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Intermediate Starter Kit (SASS)</h3>

  <p align="center">
    Introducing the official intermediate starter kit, presented by CodeStitch. This kit includes a pre-configured Eleventy setup that utilizes Nunjucks templating, along with a seamless integration of Decap CMS, providing an easy way to manage a blog. Everything is ready to go right from the start, offering a fantastic introduction to the advantages of a Static Site Generator, complete with SASS preprocessing.
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

-   [Overview](#overview)
-   [Prerequisites](#prerequisites)
-   [File Structure](#fileStructure)
    -   [Root Files and Folders](#rootFilesAndFolders)
    -   [Source Files and Folders](#sourceFilesAndFolders)
-   [Getting Started](#gettingStarted)
-   [Expanding the Project](#expandingTheProject)
    -   [Reusing Code](#reusingCode)
    -   [Adding More Pages](#addingMorePages)
    -   [Navigation via Front Matter](#navigationViaFrontMatter)
    -   [Configuring the CMS](#configuringTheCms)
-   [Deployment](#deployment)

<a name="overview"></a>

## Overview

The intermediate starter kits build off the beginner kits, mainly by including a pre-configured <a href="https://www.11ty.dev">Eleventy</a> environment, which
allows for repeated components, centralized data and greater room to scale as your clients grow. On top of this, a blog has been provided through
<a href="https://decapcms.org/">Decap CMS</a> to allow your clients to manage their content on their own. This can easily be adapted to anything which requires
changing content, such as menus, job listing boards, portfolios and much more. A few additional plugins have also been included to improve developer experience,
providing HTML/CSS minification and automatic sitemap generation

An example website has also been provided, with easy substitution of website sections possible through the use of <a href="https://codestitch.app/">CodeStitch's
vanilla component library</a>. This kit aims to get any project off the ground in as little time as possible, with deployment being possible in as little as two
minutes - including CMS hosting.

<a name="prerequisites"></a>

## Prerequisites

Only the vanilla web technologies are _required_ before using this kit, with some familiarity with Eleventy and Templating Languages also recommended, but not essential. A lot of the leg-work for the non-vanilla technologies has been done for you. If you would like to read up on some of these things, we recommend the following resources:

1. If you've never used Nunjucks before, [this excellent article by Hyunbin](https://hyunbinseo.medium.com/nunjucks-settings-for-vs-code-a0da0dc66b95) explains how to set up VSCode to best support Nunjucks, including formatting, syntax highlighting and Emmet.
2. The [Nunjucks Documentation](https://mozilla.github.io/nunjucks/) provides a complete overview of the Nunjucks syntax - the templating language of choice for this kit. Highly recommended to make the most of this kit.
3. A more applied article about leveraging Nunjucks/Eleventy to make your code modular can be [found here](https://www.webstoemp.com/blog/modular-code-nunjucks-eleventy/), courtesy of Webstoemp.
4. The [Eleventy Documentation](https://www.11ty.dev/docs/) is also good to read up on, but not recommended for this kit, as only the simplest features of Eleventy is being used, with most of the configuration already being done for you. Providing you stick to the file structure and guidelines presented in this template, you won't actually need any Eleventy knowledge.
5. [Decap CMS' docs](https://decapcms.org/docs/intro/) can also be found should you wish to extend the CMS beyond what's in this kit

<a name="fileStructure"></a>

## File Structure

```
.
├── public/
├── src/
│   ├── _data/
│   │   └── client.json
│   ├── _includes/
│   │   ├── components/
│   │   └── layouts/
│   ├── admin/
│   │   └── config.yml
│   ├── assets/
│   │   ├── favicons/
│   │   ├── fonts/
│   │   ├── images/
│   │   ├── sass/
│   │   └── svgs/
|   ├── config/
│   ├── content/
│   │   ├── blog/
│   │   └── pages/
│   ├── _redirects
│   ├── index.html
│   ├── robots.txt
├── .eleventy.js
└── netlify.toml
```

<a name="rootFilesAndFolders"></a>

### Root Files and Folders

-   public/ - Built, ready to deploy files live here. Do not work in here, only your hosting provider needs to make use of this folder.
-   src/ - Raw, source code. The folder you work in.
-   .eleventy.js - Eleventy config file, already set up for you.
-   netlify.toml - Netlify config file for a seamless deployment.

<a name="sourceFilesAndFolders"></a>

### Source Files and Folders

-   data/ - Global data accessible across the project. Fill out client.json before you begin.
-   includes/ - For reusable code across the project. Split into page-wide layouts and smaller, intra-page components.
-   admin/ - DecapCMS' folder. Includes a config file and index.html entry point.
-   assets/ - Non-HTML files. Images, scripts and styles.
-   config/ - Configuration files for eleventy and plugins. This kit provides code minification and automatic sitemap generation, working out-of-the-box for you.
-   content/ - Pages or data to render pages from, such as the blog.
-   \_redirects - To configure redirects. Read more on <a href="https://docs.netlify.com/routing/redirects/">Netlify</a>
-   index.html - Home page
-   robots.txt - Instructions for site crawlers. Learn more, and generate your own, <a href="https://en.ryte.com/free-tools/robots-txt-generator/">here</a>
-   sitemap.html - A placeholder for the sitemap plugin to generate a sitemap for you on build

<a name="gettingStarted"></a>

## Getting Started

1. At the top right of the <a href="https://github.com/CodeStitchOfficial/Intermediate-Website-Kit-SASS">GitHub Repository</a>, click the green _Use this template_ button,
   then click _Create a new repository_.
2. Follow the instructions to create a new repository, using this repo as a template.
3. When created, clone the repository to your local machine.
4. Run `npm install` to install all dependencies.
5. Run `npm start` to start the project and spin up a development server on `localhost:8080`.

Running `npm start` will start a development server, begin SASS preprocessing and start up the CMS (accessible by visiting the `/admin` path). Beforehand, the
/public directory will be deleted, clearing out any stale files that may have been deleted in the last build.

Next, it is recommended to update `_data/client.json` with some new information about this project. Through the power of templating, the
project's `<head>` and contact information will automatically be filled out, providing a first peek into some of the benefits of SSGs. Please ensure the correct file protocol (usually "https://") is used for the client's domain

Finally, you can find all of CodeStitches `:root` variables, as well as .cs-topper, .cs-title and .cs-text, within the `root` stylesheet. Feel free to adjust these, or use our Content Flair micro-stitches, to update site-wide styles quickly.

<a name="expandingTheProject"></a>

## Expanding the Project

Aimed towards freelancers, this kit was made with scalability and flexibility in mind, suiting a range of websites and client needs. As such, it is your choice
whether you'd rather make small tweaks to the existing site, or clear all the page content and build a site all over again. Outlined below are some best
practices for when it comes to building on top of this kit:

<a name="reusingCode"></a>

### Reusing Code

The main advantage to using an SSG is it brings components, popularized by JavaScript-heavy frameworks like React or Vue, to vanilla HTML. As Nunjucks is being
used, componentization can be achieved through an <a href="https://mozilla.github.io/nunjucks/templating.html#include">include</a>, if the component is truly
static, or through a <a href="https://mozilla.github.io/nunjucks/templating.html#macro">macro</a>, if the component needs to change slightly between instances.

For example, there is a call to action at the bottom of most pages. As the text content or styles don't need to change, `{% include "components/cta.html"}` was
used. If this wasn't the case, and we wanted the CTA text to change, we'd start to think about using a macro instead.

Note that due to the `_includes` directory being specified in the return section of `.eleventy.js`, we only need to include the directory and file when using
`{% include %}`.

<a name="addingMorePages"></a>

### Adding More Pages

Thanks to Eleventy Navigation, adding new pages is as simple as following the provided template in src/content/pages/\_template.txt:

```
---
title: 'Page title for <title> and OG tags'
description: 'Description for <meta> and OG tags'
preloadImg: '/assets/images/imagename.format'
permalink: '/page-path'
eleventyNavigation:
    key: Name to appear in navigation
    parent: Delete, or put another page's key here to create a dropdown
    order: 1000
---

{% extends "layouts/base.html" %}

{% block head %}
    <!-- Any page-specific tags that belong in the <head>, such as a page-specific stylesheet -->
{% endblock %}

{% block body %}
    <!-- Page HTML goes here, without a <main> wrapper -->
{% endblock %}
```

Starting from the top, you can see some data enclosed in --- tags. This is known as the page's front matter, which provides additional data to when it comes to
rendering your pages. This includes the pages title, description and path name. If there are any images above-the-fold, specify them in `preloadImg` to gain a
slight performance boost, or just leave it empty.

<a name="navigationViaFrontMatter"></a>

### Navigation via Front Matter

The header navigation in the project is powered by the `eleventyNavigation` front matter data. If a `parent` is specified, a dropdown will be created, providing
a Navigation + Dropdown Stitch is being used. Navigations will render as outlined in `order`, smallest to largest.

> If you wish to use an alternative Navigation stitch, you are welcome to swap out the .cs-ul-wrapper div in the Stitch for the one in the Starter Kit. This
> will allow you to continue to reap the benefits of eleventyNavigation. You can find the .cs-ul-wrapper div below

```
<div class="cs-ul-wrapper">
    <ul id="cs-expanded" class="cs-ul" aria-expanded="false">
        {% set navPages = collections.all | eleventyNavigation %}
        {# Loop through all pages with a eleventyNavigation in the frontmatter #}
        {% for entry in navPages %}
            {# Define a hasChild variable to make it easier to test what links are dropdowns#}
            {% set hasChild = entry.children.length %}

            {# If this page is a dropdown, give it the appropriate classes, icons and accessibility attributes#}
            <li class="cs-li {% if hasChild %} cs-dropdown {% endif %}" {% if hasChild %} tabindex="0"{% endif %}>

                {# Similarly, if the link is active, apply the necessary classes #}
                <a href="{{ entry.url }}" class="cs-li-link {% if entry.url == page.url %} cs-active {% endif %}">
                    {{ entry.key }}
                    {% if hasChild %}
                        <img class="cs-drop-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Fdown.svg" alt="dropdown icon" width="15" height="15" decoding="async" aria-hidden="true">
                    {% endif %}
                </a>

                {# Dropdowns have another ul/li set up within the parent li. Render in the same way as a normal link #}
                {% if hasChild %}
                    <ul class="cs-drop-ul">
                        {% for child in entry.children %}
                            <li class="cs-drop-li">
                                <a href="{{ child.url }}" class="cs-li-link cs-drop-link">{{ child.key }}</a>
                            </li>
                        {% endfor %}
                    </ul>
                {% endif %}
            </li>
        {% endfor %}
    </ul>
</div>
```

> Should you wish to use your own method of rendering the navigation, you can still take advantage of applying the "active" class styles by using a smaller amount of Nunjucks code within the class attribute of the link:

```
<li class="cs-li">
  <a href="/about" class="cs-li-link {{ 'cs-active' if 'about' == page.fileSlug }}">About</a>
</li>
```

> In this case, if the page slug is "about", the .cs-active class will be applied. You're welcome to adjust the page slug value to whatever you require ("blog", "/", "services", etc)
> For dropdowns, you can use a similar philosophy on the parent dropdown's class attribute, checking to see if any of the child pages are active before applying the styles. An example of this is shown below:

```
<li class="nav-link cs-li cs-dropdown">
  <span class="cs-li-link nav-link
    {{ 'cs-active' if 'annapolis-custom-closets' == page.fileSlug }}
    {{ 'cs-active' if 'bowie-custom-closets' == page.fileSlug }}
    {{ 'cs-active' if 'severna-park-custom-closets' == page.fileSlug }}
    {{ 'cs-active' if 'odenton-custom-closets' == page.fileSlug }}
  ">
    Areas Served
    <img class="cs-drop-icon" src="/assets/images/down.svg" alt="dropdown icon" width="15" height="15" decoding="async" aria-hidden="true">
  </span>
  <ul class="cs-drop-ul">
    <li class="cs-drop-li">
      <a href="/annapolis-custom-closets" class="cs-drop-link">Annapolis</a>
    </li>
    <li class="cs-drop-li">
      <a href="/bowie-custom-closets" class="cs-drop-link">Bowie</a>
    </li>
    <li class="cs-drop-li">
      <a href="/severna-park-custom-closets" class="cs-drop-link">Severna Park</a>
    </li>
    <li class="cs-drop-li">
      <a href="/odenton-custom-closets" class="cs-drop-link">Odenton</a>
    </li>
  </ul>
</li>
```

> In the above example, we're checking to see if the active page slug matches any of the four that are listed (annapolis, bowie, severna or odenton) and applying the .cs-active style to the parent if it does.

Below the front matter is the page content, split into three sections. `{% extends "layouts/base.html" %}` is the first, which defines what page layout is being
used. Note that {% extends %} defaults to looking in the `_includes` directory, as outlined in `.eleventy.js`.

Nunjucks template inheritance has been selected over Eleventy's _layout_ front matter data. This is so we can make use of `{% block %}`'s to insert any
page-specific head tags within `{% block head %}`. For example, any page specific stylesheets or scripts can go here to prevent them from being loaded across
the whole website.

A similar block is used for the main body content. Looking into `_includes/base.html`, we can see that `{% block body %}` is wrapped in a `<main>` tag, so you
won't need to use this in the page HTML. This also allows the _Skip to Main Content_ button to work too - a nice accessibility box to check.

<a name="configuringTheCms"></a>

### Configuring the CMS

Within the `src/` directory, you'll find an `admin/` folder which contains the configuration for the blog, alongside an entry `index.html` file, which you
shouldn't need to worry about. While this project is set up to work with a blog out of the box, you are welcome to make changes to the `config.yaml` file using
<a href="https://decapcms.org/docs/add-to-your-site/#configuration">Decap CMS'</a> documentation.

Blog content lives in `/src/content/blog` in the form of markdown files, with a front matter similar to that of the pages. The blog post layout, tags and
permalinks are defined in the `blog.json` file in the same directory, while all blog-related media lives in `src/assets/images/blog`.

When `npm start` is run, a proxy server for the CMS is spun up on `localhost:8081`. That can often mean you run into errors if `localhost:8080` is already
taken, so look out for that. You can locally access the blog via navigating to the /admin path. All blog content can be easily created, updated and deleted via
this admin panel, and is the very system that your clients can use to manage their website without your involvement. Everything on the blog should be fairly
intuitive, but feel free to experiment with using this panel first. With this kit, you can add _featured_ to the comma-separated list of tags to have them show
up as so in the frontend.

Should you wish to extend the "Featured Articles" functionality to group similar pieces of content in additional ways, you are welcome to add more tags as you see fit. Post "groups" can then be accessed under the `collections` object. For example, in `_includes/components/featured-post.html`, you can see that the featured posts are rendered by looping over the `collections.featured` array, which contains all the posts with the "featured" tag. You can then use a similar way to render your own collections, by accessing the applicably named collection array as shown.

<a name="deployment"></a>

## Deployment

1. Ensure the robots.txt and \_redirects have been filled out. The sitemap will be automatically generated at build-time for you. Instructions and tools for how to do so can be found in the File Structure section
2. Navigate to your Netlify Admin Panel, click _Add new site | Import an existing project_
3. Follow the instructions to connect your GitHub repository to Netlify. Most of the site settings should be done for you, thanks to `netlify.toml`
4. Once deployed, click on _Identity_ in the top navigation, then click _Enable Identity_
5. Invite yourself, and the client, to the site
6. While in the Identity tab, click the "Settings and usage" button to open the settings options. Then, do the following:
    - Find "Registration Preferences", click "Edit Settings" and set registration from _Public_ to _Invite Only_
    - Find "Enable Providers" and add a provider. We recommend Google, so the client can login with Google in 1 click.
    - Find "Git Gateway" and enable it
