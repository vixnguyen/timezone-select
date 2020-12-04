const path = require('path');

const DATA_SOURCE = 'https://en.wikipedia.org/wiki/List_of_tz_database_time_zones';
const DATA_FIELDS = ['country', '', 'name', '', 'status', 'offset', '', 'link'];
const DATA_OUTPUT = './src/tz.data.js';

const Crawler = require('crawler');
const fs = require('fs');

const fetchTzData = () => {
  const dataSources = [];
  const c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
      if(error){
        console.log(error);
      } else{
        const $ = res.$;
        let $tables, $rows, $cells, $cell, $dataCell, record;
        $tables = $('.wikitable > tbody');
        $rows = $tables[0].children.filter(item => item.name === 'tr');
        for (let $row of $rows) {
          $cells = $row.children.filter(item => item.name === 'td');
          // init record for each row
          if ($cells.length) {
            record = {};
            for (let ind in $cells) {
              $cell = $cells[ind];
              if ($cell && $cell.children && DATA_FIELDS[ind]) {
                $dataCell = $cell.children.find(item => item.name === 'a') || $cell;
                record[DATA_FIELDS[ind]] = $dataCell.children[0].data.replace('\n', '');
              }
            }
            dataSources.push(record);
          }
        }
        if (dataSources.length) {
          fs.createWriteStream(DATA_OUTPUT).write(`export default TIMEZONES = ${JSON.stringify(dataSources)}`, { encoding : 'utf8'});
        }
      }
      done();
    }
  });

  // Queue just one URL, with default callback
  c.queue(DATA_SOURCE);
}

fetchTzData();

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    another: './src/tz.helper.js',
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
