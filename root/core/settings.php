<?php

/**
 * Pressgang configuration
 *
 */
return array (

    /*
     * files
     *
     * Array of files to include in the theme from the '/inc' directory using the Loader class
     *
     */
    'inc' => array(
        // 'addthis',
        'admin-logo',
        // 'breadcrumb',
        'customizer',
        'emojicons',
        'filters',
        'gallery',
        'google-analytics',
        'images',
        // 'infinitepagination',
        'opengraph',
        'permalinks',
        'sitemap',
        // 'slider',
        'title',
    ),

    /*
     * widget includes
     *
     * Array of files to include in the theme from the '/widgets' directory using the Loader class
     *
     */
    'widgets' => array(
    ),

    /*
    * shortcodes includes
    *
    * Array of files to include in the theme from the '/shortcodes' directory using the Loader class
    *
    */
    'shortcodes' => array(
    ),

    /*
     * menus
     *
     * Associative array representing each Menu in the theme.
     *
     * [$key => $description]
     *
     * @var array
     */
    'menus' => array(
        'primary' => "Primary Navigation",
    ),

    /*
     * sidebars
     *
     * Array representing each widget sidebar used in the theme.
     *
     * @var array
     */
    'sidebars' => array(),

    /*
     * actions
     *
     * Array representing functions to hook on given actions
     *
     * @var array
     */
    'actions' => array(),

    /*
     * scripts
     *
     * Array of scripts on $handle => $args array where $args match wp_register_script, wit additional 'hook' param
     * for the action to enque the script on (default = wp_enqueue_scripts)
     *
    */
    'scripts' => array(
        'bootstrap' => array(
            'src' => get_template_directory_uri() . '/js/min/bootstrap.min.js',
            'deps' => array('jquery'),
            'version' => '3.2.0',
            'in_footer' => true
        ),
    ),

    /*
     * custom-post-types
     *
     * Array of custom_post_types to be registered, indexed on post_type.
     *
     * See: - https://codex.wordpress.org/Function_Reference/register_post_type
     *
     * - label (string|plural:post_type)
     * - labels (array|name)
     * - description (string|null)
     * - public (boolean|false)
     * - exclude_from_search (boolean|!public)
     * - publicly_queryable (boolean|public)
     * - show_ui (boolean|public)
     * - show_in_nav_menus (boolean|public)
     * - show_in_menu (boolean|show_ui)
     * - menu_position (integer|null)
     * - menu_icon (string|null)
     * - capability_type (string or array|post)
     * - capabilities (array|capability_type)
     * - map_meta_cap (boolean|null)
     * - hierarchical (boolean|false)
     * - supports (array|title,editor,author,thumbnail,excerpt,trackbacks,custom-fields,comments,revisions,page-attributes,post-formats)
     * - register_meta_box_cb (callback|null)
     * - taxonomies (array|null)
     * - has_archive (boolean|false)
     * - rewrite (array|bool+post_type)
     * - permalink_epmask (string,EP_PERMALINK)
     * - query_var (boolean or string|true)
     * - can_export (boolean|true)
     * - delete_with_user (boolean|false)
     * - show_in_rest (boolean|false)
     * - rest_base (string|post_type)
     * - rest_controller_class (class|WP_REST_Posts_Controller)
     */
    'custom-post-types' => array(),

   /*
    * custom-taxonomies
    *
    * Array of custom taxonomies indexed on taxonomy name.
    *
    * https://codex.wordpress.org/Function_Reference/register_taxonomy
    *
    * - label (string|plural:post_type)
    * - labels (array|name)
    * - public (boolean|false)
    * - publicly_queryable (boolean|public)
    * - show_ui (boolean|public)
    * - show_in_menu (boolean|show_ui)
    * - show_in_nav_menus (boolean|public)
    * - show_in_rest (boolean|false)
    * - rest_base (string|post_type)
    * - rest_controller_class (class|WP_REST_Posts_Controller)
    * - show_tagcloud (boolean|show_ui)
    * - show_in_quick_edit(boolean|show_ui)
    * - meta_box_cb (callback|null)
    * - show_admin_column (boolean|false)
    * - description (string|null)
    * - hierarchical (boolean|false)
    * - update_count_callback (callback|null)
    * - query_var (boolean or string|true)
    * - rewrite (array or boolean|true)
    * - capabilities (array|null)
    * - sort (boolean|null)
    *
    */
    'custom-taxonomies' => array(),

    /*
     * support
     *
     * Include theme support
     *
     * @var array
     */
    'support' => array(
        'html5',
        'post-thumbnails',
    ),

    /*
     * plugins
     *
     * Array of plugins required by the theme (displays admin warning if plugin not activated)
     *
     * Use names of the plugin sub-directory/file.
     * See http://codex.wordpress.org/Function_Reference/is_plugin_active
     *
     * Optionally array values supply the admin warning message
     *
     */
    'plugins' => array(
        'Timber',  // Timber is required for the theme templating!
    ),
);
