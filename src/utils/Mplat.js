/* 
* 国创移动应用能力平台js封装
*/

let Mplat = {}

Mplat = {
  /**
    * 初始化
    */
  init: function (callback){
    connectWebViewJavascriptBridge(function(bridge) {
      bridge.init(function(message, responseCallback) {
        var data = {
          'Javascript Responds': 'Wee!'
        };
        alert(message);
        responseCallback(data);
      });
      if (callback) {
        callback();
      }
    })
  },

  /**
   * 获取用户信息方法
   * @param {Object} options : param(参数) callback（回调函数，返回data ）
   */
  getUserInfos: function(callback) {
    window.WebViewJavascriptBridge.callHandler(
      'getUserInfos', {
        "params": "获取用户数据"
      },
      function(responseData) {
        if(callback != null)
          callback(responseData)
      }
    );
  },

  /**
   * 扫码
   * @param {Object} options : param(参数) callback（回调函数，返回data ）
   */
  scanGetCode: function(options) {
    var params = options.params;
    var str = "";
    if(params != null) {
      str = typeof(params) == "object" ? JSON.stringify(params) : params + str;
    }
    window.WebViewJavascriptBridge.callHandler(
      'scanGetCode', {
        'params': str
      },
      function(responseData) {
        if(options.callback)
          options.callback(responseData);
      }
    );
  },

}

function connectWebViewJavascriptBridge(callback) {
  if(window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function() {
        callback(WebViewJavascriptBridge)
      },
      false
    );
  }
}

export default Mplat
