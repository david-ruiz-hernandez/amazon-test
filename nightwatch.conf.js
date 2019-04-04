
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

module.exports = {
  custom_commands_path: "",
  custom_assertions_path: "",
  page_objects_path: 'pages',
  globals_path: "",

  test_settings: {
    default: {
      webdriver: {
        start_process: true,
        port: 4444
      },
      desiredCapabilities: {
        browserName: 'chrome',
        ensureCleanSession: true,
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions : {
          args : ['--disable-web-security', 'no-sandbox']
        }
      },
      globals: {
        waitForConditionTimeout: 30000 // sometimes internet is slow so wait.
      },
      screenshots: {
        enabled: true,
        on_error: true,
        on_failure: true,
        path: './screenshots'
      }
    },
    chrome: {
      webdriver: {
        server_path: chromedriver.path,
        cli_args: ['--port=4444']
      },
      silent: true,
      desiredCapabilities: {
        browserName: "chrome",
        ensureCleanSession: true,
        javascriptEnabled: true, // turn off to test progressive enhancement
        chromeOptions : {
          args : ['--disable-web-security', 'no-sandbox', '-incognito']
        }
      }
    }, 
    firefox: {
      webdriver: {
        server_path: geckodriver.path,
        cli_args: ['--port', '4444', '--log', 'debug']
      },
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        marionette: true
      }
    }
  }
}