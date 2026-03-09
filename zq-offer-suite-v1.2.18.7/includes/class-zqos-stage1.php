<?php
if (!defined('ABSPATH')) { exit; }

final class ZQOS_Stage1 {

  public static function init(){
    add_filter('query_vars', array(__CLASS__, 'query_vars'));
    add_action('template_redirect', array(__CLASS__, 'maybe_render'), 1);
  }

  public static function query_vars($vars){
    $vars[] = 'zq_erp_stage1';
    return $vars;
  }

  public static function maybe_render(){
    $flag = get_query_var('zq_erp_stage1', '');
    if ((string)$flag !== '1') return;

    if (!is_user_logged_in() || !current_user_can('manage_options')){
      self::render_forbidden();
      exit;
    }

    nocache_headers();
    header('Content-Type: text/html; charset=utf-8');

    $config = array(
      'pluginVersion' => ZQOS_VERSION,
      'apiBase' => esc_url_raw(home_url('/')),
      'apiNamespace' => '/' . ltrim(ZQOS_Rest::NS, '/'),
      'restNonce' => wp_create_nonce('wp_rest'),
      'prototypeRoute' => add_query_arg(array('zq_erp_stage1' => '1'), home_url('/')),
    );

    $cssUrl = trailingslashit(ZQOS_PLUGIN_URL) . 'assets/erp-stage1/index.css?ver=' . rawurlencode((string)ZQOS_VERSION);
    $jsUrl = trailingslashit(ZQOS_PLUGIN_URL) . 'assets/erp-stage1/app.js?ver=' . rawurlencode((string)ZQOS_VERSION);

    echo "<!doctype html>\n";
    echo "<html lang=\"pl\">\n";
    echo "<head>\n";
    echo "<meta charset=\"utf-8\">\n";
    echo "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n";
    echo "<title>System ERP - Stage 1 Prototype</title>\n";
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
    echo '<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">' . "\n";
    echo '<link rel="stylesheet" href="' . esc_url($cssUrl) . '">' . "\n";
    echo "</head>\n";
    echo "<body class=\"zgs\">\n";
    echo '<div id="zgs-app" class="zgs-app" aria-live="polite"></div>' . "\n";
    echo '<script>window.ZQOS_STAGE1=' . wp_json_encode($config) . ';</script>' . "\n";
    echo '<script type="module" src="' . esc_url($jsUrl) . '"></script>' . "\n";
    echo "</body>\n";
    echo "</html>";
    exit;
  }

  private static function render_forbidden(){
    status_header(403);
    nocache_headers();
    header('Content-Type: text/html; charset=utf-8');

    echo "<!doctype html>\n";
    echo "<html lang=\"pl\">\n";
    echo "<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>403</title></head>\n";
    echo "<body>\n";
    echo "<h1>403</h1>\n";
    echo "<p>Brak dostepu do prototypu Stage 1.</p>\n";
    echo "</body>\n";
    echo "</html>";
  }
}
