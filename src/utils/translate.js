// traducciones cno i18n
const { I18n } = require('i18n');
const path = require('path');

const i18n = new I18n({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '..', 'locales'),
    defaultLocale: 'es',
    autoReload: true,
    syncFiles: true,
    cookie: 'nodepop-locale',
});

module.exports = i18n;