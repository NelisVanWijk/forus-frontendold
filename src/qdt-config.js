require('events').EventEmitter.defaultMaxListeners = 20;

let dashboardConfig = (port, distPath, source) => {
    return {
        "source": source,
        "paths": {
            "root": `../dist/${distPath}`,
            "assets_root": `../dist/${distPath}/assets`,
            "clean_paths": [
                `../dist/${distPath}`
            ]
        },
        "server": {
            "path": "/",
            "port": port
        },
        // tasks configs
        "tasks": {
            // disable tasks
            "disabled": {
                "pug": false,
                "js": false,
                "assets": false
            },
            // tasks details, ex: source, destination, minify and etc.
            "settings": {
                "pug": [{
                    "path": "/angular-index",
                    "src": ["angular-index/index.pug"],
                    "watch": ["layout/**/*.pug"],
                }, {
                    "path": "/tpl",
                    "src": ["tpl/**/*.pug"],
                    "dest": "/assets/tpl"
                }],
                "scss": [{
                    "src": "style.scss",
                    "watch": [
                        "includes/**/*.scss",
                        "layouts/**/*.scss",
                    ],
                    "path": "/",
                    "name": "style.min.css",
                    "minify": true
                }, {
                    "src": "style-nijmegen.scss",
                    "watch": [
                        "includes/**/*.scss",
                        "layouts/**/*.scss",
                    ],
                    "path": "/",
                    "name": "style-nijmegen.min.css",
                    "minify": true
                }]
            }
        }
    };
}

let dashboardMarkupConfig = (port, distPath, source) => {
    return {
        "source": source,
        "paths": {
            "root": `../dist/${distPath}`,
            "assets_root": `../dist/${distPath}/assets`,
            "clean_paths": [
                `../dist/${distPath}`
            ]
        },
        "server": {
            "path": "/",
            "port": port
        },
        // tasks configs
        "tasks": {
            // disable tasks
            "disabled": {
                "pug": false,
                "js": false,
                "assets": false
            },
            // tasks details, ex: source, destination, minify and etc.
            "settings": {
                "js": [{
                    "src": [
                        "app.markup.js",
                    ],
                    "dest": "/",
                    "name": "app.js",
                    "minify": true,
                    "sourcemap": true,
                    "browserify": true
                }]
            }
        }
    };
};

let landingConfig = (port, distPath, source) => {
    return {
        "source": source,
        "paths": {
            "root": `../dist/${distPath}`,
            "assets_root": `../dist/${distPath}/assets`,
            "clean_paths": [
                `../dist/${distPath}`
            ]
        },
        "server": {
            "path": "/",
            "port": port
        },
        // tasks configs
        "tasks": {
            // disable tasks
            "disabled": {
                "pug": false,
                "js": false,
                "assets": false
            },
            // tasks details, ex: source, destination, minify and etc.
            "settings": {
                "js": [{
                    "src": [
                        "app.landing-meapp.js",
                    ],
                    "watch": [
                        "angular-1/**/**.js",
                    ],
                    "dest": "/",
                    "name": "app.js",
                    "minify": true,
                    "sourcemap": true,
                    "browserify": true
                }],
                "pug": [{
                    "path": "/landing-meapp",
                    "src": ["landing-meapp/index.pug"],
                    "watch": ["layout/**/*.pug"],
                }, {
                    "path": "/tpl/directives",
                    "src": ["tpl/directives/**/*.pug"],
                    "dest": "/assets/tpl/directives"
                }],
                "scss": [{
                    "src": "style.scss",
                    "watch": [
                        "includes/**/*.scss",
                        "layouts/**/*.scss",
                    ],
                    "path": "/",
                    "name": "style.min.css",
                    "minify": true
                }, {
                    "src": "style-nijmegen.scss",
                    "watch": [
                        "includes/**/*.scss",
                        "layouts/**/*.scss",
                    ],
                    "path": "/",
                    "name": "style-nijmegen.min.css",
                    "minify": true
                }]
            }
        }
    };
};

let webshopConfig = (port, distPath, source) => {
    return {
        "source": source,
        "paths": {
            "root": `../dist/${distPath}`,
            "assets_root": `../dist/${distPath}/assets`,
            "clean_paths": [
                `../dist/${distPath}`
            ]
        },
        "server": {
            "path": "/",
            "port": port
        },
        // tasks configs
        "tasks": {
            // disable tasks
            "disabled": {
                "pug": false,
                "js": false,
                "assets": false
            },
            // tasks details, ex: source, destination, minify and etc.
            "settings": {
                "pug": [{
                    "path": "/webshop-panel",
                    "src": ["webshop-panel/index.pug"],
                    "watch": ["layout/**/*.pug"],
                }, {
                    "path": "/tpl",
                    "src": ["tpl/**/*.pug"],
                    "dest": "/assets/tpl"
                }]
            }
        }
    };
}

let webshopMarkupConfig = (port, distPath, source) => {
    return {
        "source": source,
        "paths": {
            "root": `../dist/${distPath}`,
            "assets_root": `../dist/${distPath}/assets`,
            "clean_paths": [
                `../dist/${distPath}`
            ]
        },
        "server": {
            "path": "/",
            "port": port
        },
        // tasks configs
        "tasks": {
            // tasks details, ex: source, destination, minify and etc.
            "settings": {
                "js": [{
                    "src": [
                        "app.markup.js",
                    ],
                    "dest": "/",
                    "name": "app.js",
                    "minify": true,
                    "sourcemap": true,
                    "browserify": true
                }]
            }
        }
    };
}

module.exports = {
    platforms: {
        "*": {
            "source": "base",
            "libs": {
                // please disable libraries you don't need
                "jquery": true,
                "bootstrap_3": false,
                "angular": true,
                "angular_2": false,
                "underscore": true,
                "underscore.string": false,
                "mdi": true
            },
            "libs_data": {},
            // overwrite this paths in your platform
            "paths": {
                "root": false,
                "assets_root": false,
                "clean_paths": false
            },
            // add here libraries from node_modules
            "assets": [{
                "from": "resources/assets/**/*",
                "to": "assets"
            }, {
                "from": "../../node_modules/nanoscroller/bin/css/*",
                "to": "assets/dist/nanoscroller/css/"
            }, {
                "from": "../../node_modules/nanoscroller/bin/javascripts/*",
                "to": "assets/dist/nanoscroller/js/"
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/angular-ui-router.min.js",
                "to": "assets/dist/uirouter/"
            }, {
                "from": "../../node_modules/@uirouter/angularjs/release/angular-ui-router.min.js.map",
                "to": "assets/dist/uirouter/"
            }, {
                "from": "../../node_modules/qrcodejs/qrcode.js",
                "to": "assets/dist/qrcodejs"
            }, {
                "from": "../../node_modules/angularjs-datepicker/dist/angular-datepicker.min.js",
                "to": "assets/dist/angular-datepicker"
            }, {
                "from": "../../node_modules/angularjs-datepicker/dist/angular-datepicker.min.css",
                "to": "assets/dist/angular-datepicker"
            }, {
                "from": "../../node_modules/papaparse/papaparse.min.js",
                "to": "assets/dist/papaparse/"
            }, {
                "from": "../../node_modules/file-saver/FileSaver.min.js",
                "to": "assets/dist/file-saver"
            }, {
                "from": "../../node_modules/angular-translate/dist/angular-translate.min.js",
                "to": "assets/dist/angular-translate"
            }, {
                "from": "../../node_modules/angular-sanitize/angular-sanitize.min.js",
                "to": "assets/dist/angular-sanitize"
            }, {
                "from": "../../node_modules/angular-cookies/angular-cookies.min.js",
                "to": "assets/dist/angular-cookies"
            }, {
                "from": "../../node_modules/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js",
                "to": "assets/dist/angular-translate-storage-cookie"
            }, {
                "from": "../../node_modules/angular-translate-storage-local/angular-translate-storage-local.min.js",
                "to": "assets/dist/angular-translate-storage-local"
            }, {
                "from": "../../node_modules/moment/min/moment-with-locales.min.js",
                "to": "assets/dist/moment"
            }, {
                "from": "../../node_modules/chart.js/dist/Chart.min.js",
                "to": "assets/dist/chart"
            }, {
                "from": "../../node_modules/progressbar.js/dist/progressbar.min.js",
                "to": "assets/dist/progressbar"
            }, {
                "from": "../../node_modules/@babel/polyfill/dist/polyfill.min.js",
                "to": "assets/dist/babel-polyfill"
            }, {
                "from": "../../node_modules/ui-cropper/compile/minified/ui-cropper.css",
                "to": "assets/dist/ui-cropper"
            }, {
                "from": "../../node_modules/ui-cropper/compile/minified/ui-cropper.js",
                "to": "assets/dist/ui-cropper"
            }],
            // browsersync configurations (ex: ip, port and path)
            "server": false,
            // tasks configs
            "tasks": {
                // disable tasks
                "disabled": {
                    "pug": false,
                    "js": false,
                    "assets": false
                },
                // tasks details, ex: source, destination, minify and etc. 
                "settings": {
                    "js": [{
                        "src": [
                            "app.js"
                        ],
                        "watch": [
                            "angular-1/**/**.js",
                        ],
                        "dest": "/",
                        "name": "app.js",
                        "minify": false,
                        "sourcemap": true,
                        "browserify": true
                    }, {
                        "src": [
                            // "raw/**/*.js"
                        ],
                        "dest": "/raw",
                        "path": "/raw",
                        "minify": true,
                        "sourcemap": false,
                        "browserify": false
                    }],
                    "scss": [{
                        "src": "style.scss",
                        "watch": [
                            "includes/**/*.scss",
                            "layouts/**/*.scss",
                        ],
                        "path": "/",
                        "name": "style.min.css",
                        "minify": true
                    }],
                    "pug": [{
                        "path": "/markup",
                        "src": ["/markup/*.pug"],
                        "watch": ["layout/**/*.pug"],
                    }]
                }
            }
        },

        // dashboard markup
        "forus-platform.markup": dashboardMarkupConfig(3000, 'forus-platform.markup', 'forus-platform'),

        // sponsor dashboard
        "forus-platform.sponsor.general": dashboardConfig(3500, 'forus-platform.sponsor.general', 'forus-platform'),
        "forus-platform.sponsor.zuidhorn": dashboardConfig(3510, 'forus-platform.sponsor.zuidhorn', 'forus-platform'),
        "forus-platform.sponsor.nijmegen": dashboardConfig(3520, 'forus-platform.sponsor.nijmegen', 'forus-platform'),

        // provider dashboard
        "forus-platform.provider.general": dashboardConfig(4000, 'forus-platform.provider.general', 'forus-platform'),
        "forus-platform.provider.zuidhorn": dashboardConfig(4010, 'forus-platform.provider.zuidhorn', 'forus-platform'),
        "forus-platform.provider.nijmegen": dashboardConfig(4020, 'forus-platform.provider.nijmegen', 'forus-platform'),

        // validator dashboard
        "forus-platform.validator": dashboardConfig(4500, 'forus-platform.validator', 'forus-platform'),

        // meapp landing
        "forus-landing-meapp.general": landingConfig(3600, 'forus-landing-meapp.general', 'forus-platform', 'general'),
        "forus-landing-meapp.zuidhorn": landingConfig(3610, 'forus-landing-meapp.zuidhorn', 'forus-platform', 'zuidhorn'),
        "forus-landing-meapp.nijmegen": landingConfig(3620, 'forus-landing-meapp.nijmegen', 'forus-platform', 'nijmegen'),

        // webshop markups
        "forus-webshop-general.markup": webshopMarkupConfig(5000, 'forus-webshop-general.markup', 'forus-webshop'),
        "forus-webshop-zuidhorn.markup": webshopMarkupConfig(5010, 'forus-webshop-zuidhorn.markup', 'forus-webshop-zuidhorn'),
        "forus-webshop-nijmegen.markup": webshopMarkupConfig(5020, 'forus-webshop-nijmegen.markup', 'forus-webshop-nijmegen'),

        // webshops
        "forus-webshop-general.panel": webshopConfig(5500, 'forus-webshop-general.panel', 'forus-webshop'),
        "forus-webshop-zuidhorn.panel": webshopConfig(5510, 'forus-webshop-zuidhorn.panel', 'forus-webshop-zuidhorn'),
        "forus-webshop-nijmegen.panel": webshopConfig(5520, 'forus-webshop-nijmegen.panel', 'forus-webshop-nijmegen'),
    }
};