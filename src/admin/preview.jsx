/** @jsx h */
/* ^ Compile JSX with Decap's own renderer instead of React.createElement */

/*
    Preview Pane Templates
    ============================================

    Edit this file to customize the preview pane for your collections.
    Documentation: https://decapcms.org/docs/customization/

    At the bottom of the file, we load the same stylesheets used on the site.
    Therefore, please keep the HTML in the preview in-sync with what's used on
    the site to ensure the previews work correctly.
*/

const { createClass, h } = window;

/* Resolve an image path to a URL. Unsaved uploads only exist as blobs. */
function assetUrl(getAsset, path) {
	if (!path || typeof path !== "string") return "";
	try {
		const asset = getAsset(path);
		return asset ? asset.toString() : "";
	} catch (error) {
		return path;
	}
}

/* Mirror of the site's postDate filter (src/config/filters/postDate.js) */
function postDate(value) {
	if (!value) return "";
	const date = value instanceof Date ? value : new Date(value);
	if (isNaN(date.getTime())) return "";
	return new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(date);
}

/* Mirrors the blog layout's markup so the preview reuses the site's CSS */
const BlogPreview = createClass({
	render: function () {
		/* Live form values, re-rendered on every keystroke */
		const data = this.props.entry.get("data").toJS();
		const cover = assetUrl(this.props.getAsset, data.image);

		return (
			<main id="main">
				<div id="single-article">
					<div className="cs-container">
						<article className="cs-article-post">
							<picture className="cs-article-image">
								<img
									src={cover}
									alt={data.imageAlt || ""}
									width="800"
									height="400"
									loading="lazy"
									decoding="async"
									aria-hidden="true"
								/>
							</picture>
							<div className="cs-article-group">
								<h1 className="cs-article-title">
									{data.title}
								</h1>
								<div className="cs-author-group">
									<picture className="cs-author-img">
										<img
											src="/assets/svgs/profile.svg"
											alt="Profile icon"
											width="32"
											height="32"
											decoding="async"
											loading="lazy"
											aria-hidden="true"
										/>
									</picture>
									<span className="cs-author-name">
										{data.author}
									</span>
									<span
										aria-hidden="true"
										className="cs-dot"
									></span>
									<span className="cs-date">
										{postDate(data.date)}
									</span>
								</div>
							</div>
							<section className="cs-article-content">
								{this.props.widgetFor("body")}
							</section>
						</article>
					</div>
				</div>
			</main>
		);
	},
});

/* Bind the template to the "blog" collection in config.yml */
CMS.registerPreviewTemplate("blog", BlogPreview);

/* The preview renders in a bare iframe, so pull in the site's stylesheets */
CMS.registerPreviewStyle("/assets/css/root.css");
CMS.registerPreviewStyle("/assets/css/blog.css");
