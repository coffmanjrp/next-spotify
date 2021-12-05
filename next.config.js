const intercept = require('intercept-stdout');

module.exports = {
  reactStrictMode: true,
};

// https://github.com/facebookexperimental/Recoil/issues/733
// safely ignore recoil stdout warning messages
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return '';
  }
  return text;
}

// Intercept in dev and prod
intercept(interceptStdout);
