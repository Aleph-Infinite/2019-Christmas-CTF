const fs = require('fs');

module.exports = {
  http: {
    port: 8011,
    flagPort: 8012,
  },
  https: {
    use: false,
    port: 443,
    key: './src/ssl/private.key',
    cert: './src/ssl/certificate.crt',
  },
  db: {
    host: 'mysql',
    port: '3306',
    database: 'xmasctf',
    user: 'xmasctf',
    password: 'xmasctf4444',
  },
  jwt: {
    bruth: {
      key: '40906795',
      options: {
        issuer: 'c2w2m2',
        expiresIn: '1d',
        algorithm: 'HS256',
      }
    },
    csrf: {
      key: {
        private: fs.readFileSync('./keys/private.key'),
        public: fs.readFileSync('./keys/public.key'),
      },
      options: {
        issuer: 'c2w2m2',
        expiresIn: '1h',
        algorithm: 'RS256',
      },
    },
  },
  flag: {
    bruth: 'XMAS{bru73-f0rc3-jw7_^^7}',
    csrf: 'XMAS{ez_xs5_ch41l_m3rry_chr1stm4ssssssss}',
  },
  hashSort: 'fmni4q3uigt35iluhw4ggliu325hg354@%@#',
  password: 'y0u_c4nt_guess_adm1n_pas5wd',
}
