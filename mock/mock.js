
module.exports = {
  rules: [
    {
      pattern: /\/api\/index\.php\?type=more\&pageNo=1/,
      respondwith: './index.json'
    },
    {
      pattern: /\/api\/index\.php\?type=more\&pageNo=2/,
      respondwith: './index-more.json'
    },
    {
      pattern: /\/api\/livelist\.php/,
      respondwith: './xiangqing.json'
    },
    {
      pattern: /\/api\/CategoryList\.php/,
      respondwith: './CategoryList.json'
    }

  ]
};
