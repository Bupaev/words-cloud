'use strict';

/**
 * 1. Add ~smart words scaling (+)
 * 2. Add popups with information to specific words (+/-)
 * 3. Add hierarchy of cloud levels (-)
 * 4. Add navigation in cloud (-)
 * 5. Keep generated SVG to navigation between cloud levels w/o SVG regenerating (-)
 */

const svgWidth = 800;
const svgHeight = 600;
const fill = d3.scale.category20c();
let svgContext;

getCloudJSON()
  .then(function(wordsArray) {
      makeCloud(calcWordsSize(wordsArray));
      addTips();

      const textsElements = document.getElementsByTagName('text');
      console.log('Data length:', wordsArray.length, 'Cloud size:', textsElements.length);
    },
    function(err) {
      console.log('Promise rejected ' + err.message);
    });

/**
 * @function getCloudJSON
 * @description
 * Download json file with cloud data
 * @returns {Promise}
 */
function getCloudJSON() {
  return new Promise(function(resolve, reject) {
    d3.json('/words-data.json',
      function(err, wordsObject) {
        if (err) {
          reject(Error('Unsuccessful downloading cloud data file: ' + err));
        } else {
          resolve(wordsObject)
        }
      });
  })
}

/**
 * @function calcWordsSize
 * @param {Array} wordsArray
 * @returns {Array}
 */
function calcWordsSize(wordsArray) {
  const svgArea = svgWidth * svgHeight;
  return wordsArray.map(function(word) {
    word.size *= svgArea / wordsArray.length / 6 * Math.sqrt(wordsArray.length) / Math.pow(svgArea, 1 / 1.9);
    return word;
  })
}

/**
 * @function makeCloud
 * @param {Array} wordsArray
 */
function makeCloud(wordsArray) {
  const layout = d3.layout.cloud()
    .size([svgWidth, svgHeight])
    .words(wordsArray)
    .padding(5)
    .rotate(function() {
      return (0.5 - Math.random()) * 15;
    })
    .font('Impact')
    .fontSize(function(d) {
      return d.size;
    })
    .on('end', drawCloud);

  layout.start();
}

/**
 * @function drawCloud
 * @param {Array} words d3 data words array
 */
function drawCloud(words) {
  svgContext = d3.select('body').append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', 'translate(' + svgWidth / 2 + ',' + svgHeight / 2 + ')')
    .selectAll('text')
    .data(words)
    .enter().append('text')
    .style('font-size', function(d) {
      return d.size + 'px';
    })
    .style('font-family', 'Impact')
    .style('fill', function(d, i) {
      return fill(i);
    })
    .attr('text-anchor', 'middle')
    .attr('transform', function(d) {
      return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
    })
    .attr('description-text', function(d) {
      return d.desc;
    })
    .attr('description-image', function(d) {
      return d.img;
    })
    .text(function(d) {
      return d.text;
    });
}

function addTips() {

  /* Initialize tooltip */
  const tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<img src=" + (d.img || 'images/js-logo.png') + "><span>" + (d.desc || 'default') + "</span>";
    });

  // Add mouse events to show/hide tooltips
  svgContext
    .filter(function(d) {
      return d.desc !== undefined;
    })
    .on('mouseover', function(d) {
      tip.attr('class', 'd3-tip animate').show(d)
    })
    .on('mouseout', function(d) {
      tip.attr('class', 'd3-tip').show(d);
      tip.hide();
    });

  // Invoke the tip in the context of visualization
  svgContext.call(tip);
}
