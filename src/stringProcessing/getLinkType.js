/** @module stringProcess/getLinkType */

const urlHelper = require( "./url" );

/**
 * Determines the type of link.
 *
 * @param {string} text String with anchor tag.
 * @param {string} url Url to match against.
 * @returns {string} The link type (other, external or internal).
 */

module.exports = function( text, url ) {
	const anchorUrl = urlHelper.getFromAnchorTag( text );
	const protocol = urlHelper.getProtocol( anchorUrl );

	/**
	 * A link is "Other" if:
	 * - The protocol is not null, not http or https.
	 * - The link is a relative fragment URL (starts with #).
	 */
	if( ( protocol !== null && protocol !== "http:" && protocol !== "https:" ) ||
		anchorUrl.indexOf( "#" ) === 0 ) {
		return "other";
	}
	if ( urlHelper.isInternalLink( anchorUrl, urlHelper.getHostname( url ) ) ) {
		return "internal";
	}

	return "external";
};
