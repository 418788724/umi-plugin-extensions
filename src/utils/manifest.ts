import { getCSPScript } from './csp';
import got from 'got';
import { baseDevURL } from './env';

interface IUIPageKeyMap {
  popup: {
    key: '__TO_REPLACE_POPUP__';
    output: string;
  };
  option: {
    key: '__TO_REPLACE_OPTION__';
    output: string;
  };
}

export const UIPageKeyMap: IUIPageKeyMap = {
  popup: {
    key: '__TO_REPLACE_POPUP__',
    output: '',
  },
  option: {
    key: '__TO_REPLACE_OPTION__',
    output: '',
  },
};

export const CSPKeyMap = {
  // 为替换文本准备的钩子字符串
  key: '__TO_REPLACE_INLINE_SCRIPT__',
  output: '',
};

/**
 * 从 umi 插件配置项中生成 manifest 文件
 * @param config
 */
export const generateManifestFromConfig = (
  config: extensionsPlugin.Config,
): chromeManifest.Manifest => {
  const {
    contentSecurityPolicy,
    background,
    optionsUI,
    popupUI,
    manifestVersion: manifest_version,
    minimumChromeVersion: minimum_chrome_version,
    contentScripts,
    ...manifest
  } = config;

  const { inlineScript, nonce, url } = contentSecurityPolicy;

  const content_security_policy = getCSPScript({
    inlineScript,
    nonce,
    url,
  });

  const backgroundStr =
    background && background.scripts.length > 0 ? background : undefined;

  // 处理 option 参数项
  const option = {};
  if (typeof optionsUI === 'string') {
    option['options_ui'] = { page: UIPageKeyMap.option.key };
  }
  if (typeof optionsUI === 'object') {
    option['options_ui'] = {
      page: UIPageKeyMap.option.key,
      open_in_tab: optionsUI.openInTab,
    };
  }
  // 处理 popup 的参数项
  const popup = {};
  if (typeof popupUI === 'string') {
    popup['browser_action'] = {
      default_popup: UIPageKeyMap.popup.key,
    };
  }
  if (typeof popupUI === 'object') {
    switch (popupUI.type) {
      default:
      case 'browserAction':
        popup['browser_action'] = {
          default_popup: UIPageKeyMap.popup.key,
          default_icon: popupUI.icon,
          default_title: popupUI.title,
        };
        break;
      case 'pageAction':
        popup['page_action'] = {
          default_popup: UIPageKeyMap.popup.key,
          default_icon: popupUI.icon,
          default_title: popupUI.title,
        };
    }
  }

  // 处理 content scripts
  const content_scripts: chromeManifest.ContentScript[] = contentScripts.map(
    (item) => {
      return {
        matches: item.matches!,
        run_at: item.runAt!,
        js: [],
        css: [],
      };
    },
  );
  return {
    ...manifest,
    ...option,
    ...popup,
    background: backgroundStr,
    manifest_version,
    content_security_policy,
    minimum_chrome_version,
    content_scripts: content_scripts.length > 0 ? content_scripts : undefined,
  };
};

/**
 * 专门用于 onStart 方法的
 * @param fn
 */
export const gotManifest = (fn: any) => {
  got(`${baseDevURL}/manifest.json`).then(fn).catch();
};

/**
 * 更新 manifest 中和 UI 路径相关的内容
 * @param manifest
 */
export const updateUIPath = (manifest: string): string => {
  const { option, popup } = UIPageKeyMap;

  return manifest
    .replace(option.key, option.output)
    .replace(popup.key, popup.output);
};

/**
 * 更新 background 脚本地址
 * @param manifest
 */
export const updateBackground = (manifest: chromeManifest.Manifest) => {
  const data = manifest;
  if (data.background) {
    data.background.scripts = ['background.js'];
  }
  return data;
};

/**
 * 更新热加载方法
 * @param manifest
 */
export const updateHotLoad = (manifest: chromeManifest.Manifest) => {
  const data = manifest;
  if (data.background) {
    data.background.scripts.push('hot-reload.js');
  } else {
    data.background = { persistent: true, scripts: ['hot-reload.js'] };
  }
  return data;
};

/**
 * 更新 contentScripts 脚本地址
 * @param manifest
 */
export const updateContentScripts = (manifest: chromeManifest.Manifest) => {
  const data = manifest;
  if (data.content_scripts) {
    data.content_scripts = data.content_scripts.map((item, index) => {
      item.js = [`contentScript_${index}.js`];
      item.css = [`contentScript_${index}.css`];
      return item;
    });
  }
  return data;
};

/**
 * 写入 inline script 的 hash
 */
export const updateCSP = (manifest: string) => {
  return manifest.replace(CSPKeyMap.key, CSPKeyMap.output);
};
