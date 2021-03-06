var techs = {
        // essential
        fileProvider: require('enb/techs/file-provider'),
        fileMerge: require('enb/techs/file-merge'),

        // optimization
        borschik: require('enb-borschik/techs/borschik'),

        // css
        // postcss: require('enb-postcss/techs/enb-postcss'),
        // postcssPlugins: [
        //     require('postcss-import')(),
        //     require('postcss-each'),
        //     require('postcss-for'),
        //     require('postcss-simple-vars')(),
        //     require('postcss-calc')(),
        //     require('postcss-nested'),
        //     require('rebem-css'),
        //     require('postcss-url')({ url: 'inline' }),
        //     require('autoprefixer')(),
        //     require('postcss-reporter')()
        // ],

        // js
        // browserJs: require('enb-js/techs/browser-js'),

        // bemtree
        bemtree: require('enb-bemxjst/techs/bemtree'),

        // bemhtml
        bemhtml: require('enb-bemxjst/techs/bemhtml'),

        // markdown
        markdown: require('enb-markdown/techs/markdown'),
        markdownToHtml: require('enb-markdown/techs/markdown-to-html')
    },
    enbBemTechs = require('enb-bem-techs'),
    levels = [
        { path: 'node_modules/bem-core/common.blocks', check: false },
        { path: 'node_modules/bem-core/desktop.blocks', check: false },
        // { path: 'node_modules/bem-components/common.blocks', check: false },
        // { path: 'node_modules/bem-components/desktop.blocks', check: false },
        // { path: 'node_modules/bem-components/design/common.blocks', check: false },
        // { path: 'node_modules/bem-components/design/desktop.blocks', check: false },
        'articles',
        'common.blocks',
        'desktop.blocks'
    ];

module.exports = function(config) {
    var isProd = process.env.YENV === 'production';

    config.nodes('*.bundles/*', function(nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, { levels: levels }],
            [techs.fileProvider, { target: '?.bemdecl.js' }],
            [enbBemTechs.deps],
            [enbBemTechs.files],

            // css
            // [techs.postcss, {
            //     target: '?.css',
            //     plugins: techs.postcssPlugins
            // }],

            // bemtree
            [techs.bemtree, { sourceSuffixes: ['bemtree', 'bemtree.js'] }],

            // bemhtml
            [techs.bemhtml, { sourceSuffixes: ['bemhtml', 'bemhtml.js'] }],

            // markdown
            [techs.markdown],

            // html
            [techs.markdownToHtml, {
                requireCss: '_?.css',
                requireJs: true,
                markdownBemjsonOptions: {
                    rules: {
                        html(html) {
                            function parse(element) {
                                if (element === '<social/>') {
                                    return { block: 'ya-share2' };
                                }

                                return element;
                            }

                            if (typeof html === 'object' && html instanceof Array) {
                                html.forEach((item, i, arr) => {
                                    arr[i] = parse(item);
                                });
                            } else if (typeof html === 'string') {
                                    html = parse(html);
                            }

                            return html;
                        }
                    }
                }
            }],

            // client bemhtml
            // [enbBemTechs.depsByTechToBemdecl, {
            //     target: '?.bemhtml.bemdecl.js',
            //     sourceTech: 'js',
            //     destTech: 'bemhtml'
            // }],
            // [enbBemTechs.deps, {
            //     target: '?.bemhtml.deps.js',
            //     bemdeclFile: '?.bemhtml.bemdecl.js'
            // }],
            // [enbBemTechs.files, {
            //     depsFile: '?.bemhtml.deps.js',
            //     filesTarget: '?.bemhtml.files',
            //     dirsTarget: '?.bemhtml.dirs'
            // }],
            // [techs.bemhtml, {
            //     target: '?.browser.bemhtml.js',
            //     filesTarget: '?.bemhtml.files',
            //     sourceSuffixes: ['bemhtml', 'bemhtml.js'],
            //     engineOptions : { elemJsInstances : true }
            // }],

            // js
            // [techs.browserJs, { includeYM: true }],
            // [techs.fileMerge, {
            //     target: '?.js',
            //     sources: ['?.browser.js', '?.browser.bemhtml.js']
            // }],

            // borschik
            // [techs.borschik, { source: '?.js', target: '?.min.js', minify: isProd }],
            // [techs.borschik, { source: '?.css', target: '?.min.css', minify: isProd }]
        ]);

        nodeConfig.addTargets([ '?.html'/*, '?.min.css', '?.min.js'*/]);
    });
};
