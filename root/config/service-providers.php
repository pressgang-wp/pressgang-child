<?php

/**
 * Service Providers
 *
 * Note: this file replaces the parent theme's list, so the PressGang
 * defaults are re-declared alongside the theme's opt-ins.
 *
 * TemplateRoutingServiceProvider enables convention-based template routing:
 * requests resolve to controllers by naming convention (no template stub
 * files) and page templates are registered file-lessly in
 * config/page-templates.php. See https://docs.pressgang.dev/
 *
 * @var array
 */
return [
	// PressGang defaults
	\PressGang\ServiceProviders\TimberServiceProvider::class,
	\PressGang\ServiceProviders\SeoServiceProvider::class,

	// Convention-based template routing
	\PressGang\ServiceProviders\TemplateRoutingServiceProvider::class,
];
