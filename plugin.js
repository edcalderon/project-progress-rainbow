// Host-side setup: header button + menu entry both open the iframe full view.
// Keep this file tiny — all rendering lives in index.html.
(function () {
  try {
    PluginAPI.registerHeaderButton({
      label: 'Project Progress',
      icon: 'insights',
      onClick: () => PluginAPI.showIndexHtmlAsView()
    });
  } catch (e) {
    console.warn('[project-progress-rainbow] header btn failed', e);
  }
  try {
    // Settings button on the plugin card opens the plugin view.
    // The actual options form is rendered by the app from config-schema.json
    // and read back via PluginAPI.getConfig().
    PluginAPI.registerConfigHandler(() => PluginAPI.showIndexHtmlAsView());
  } catch (e) {
    console.warn('[project-progress-rainbow] config handler failed', e);
  }
  if (PluginAPI.onReady) {
    PluginAPI.onReady(async () => {
      try {
        const cfg = await PluginAPI.loadSyncedData('prefs');
        if (cfg) console.log('[project-progress-rainbow] prefs loaded');
      } catch {}
    });
  }
  if (PluginAPI.onUnload) {
    PluginAPI.onUnload(() => {
      // host cleans header/menu automatically; nothing persistent here
    });
  }
})();
