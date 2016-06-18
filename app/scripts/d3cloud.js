'use strict';

/**
 * 1. Add popups with information to specific words
 * 2. Add hierarchy of cloud levels
 * 3. Add navigation in cloud
 * 4. Keep generated SVG to navigation between cloud levels w/o SVG regenerating
 */

console.log('3d cloud.js is loaded');

let wordsArray = [
  { text: 'Front-end', size: 5 },
  { text: 'JavaScript', size: 5 },
  { text: 'AngularJS', size: 3 },
  { text: 'jQuery', size: 2 },
  { text: 'Vanila JS', size: 4 },
  { text: 'eslint', size: 2 },
  { text: 'LESS', size: 3 },
  { text: 'SCSS', size: 2 },
  { text: 'Web Audio API', size: 4 },
  { text: 'Canvas', size: 2 },
  { text: 'SVG', size: 2 },
  { text: 'Gulp', size: 3 },
  { text: 'npm', size: 3 },
  { text: 'NodeJS', size: 2 },
  { text: 'Unit testing', size: 2 },
  { text: 'TypeScript', size: 2 },
  { text: 'WebStorm', size: 5 },
  { text: 'Atom', size: 3 },
  { text: 'GIT', size: 4 },
  { text: 'SVN', size: 2 },
  { text: 'TFS', size: 2 },
  { text: 'HTML5', size: 5 },
  { text: 'ES6', size: 4 },
  { text: 'Lodash', size: 4 },
  { text: 'Photoshop', size: 3 },
  { text: 'Lightroom', size: 3 },
  { text: 'Photography', size: 3 },
  { text: 'UI UX', size: 3 },
  { text: 'Datamining', size: 2 },
  { text: 'SQL', size: 2 },
  { text: 'Matlab', size: 2 },
  { text: '3Ds Max', size: 2 },
  { text: 'Video editing', size: 2 },
  { text: 'Agile', size: 2 },
  { text: 'English', size: 2 },
  { text: 'English', size: 3 },
  { text: 'Omsk', size: 3 },
  { text: 'Singapore', size: 2 },
  { text: 'Bower', size: 3 },
  { text: 'Browserify', size: 2 }];

const svgWidth = 800;
const svgHeight = 600;

function calcWordsSize(array) {
  const svgArea = svgWidth * svgHeight;
  return array.map(function(word) {
    word.size *= svgArea / wordsArray.length / 6 *  Math.sqrt(wordsArray.length) / Math.pow(svgArea, 1 / 1.9);
    return word;
  })
}

wordsArray = calcWordsSize(wordsArray);

const fill = d3.scale.category20c();

const layout = d3.layout.cloud()
  .size([svgWidth, svgHeight])
  .words(wordsArray)
  .padding(5)
  .rotate(function() {
    return (0.5 - Math.random()) * 30;
  })
  .font('Impact')
  .fontSize(function(d) {
    return d.size;
  })
  .on('end', draw);

layout.start();

function draw(words) {
  d3.select('body').append('svg')
    .attr('width', layout.size()[0])
    .attr('height', layout.size()[1])
    .append('g')
    .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
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
    .text(function(d) {
      return d.text;
    })
    .on('mouseover', function(data) {
      console.log('Press', data.text);
    });
}

const textsElements = document.getElementsByTagName('text');
console.log('Data length:', wordsArray.length, 'Cloud size:', textsElements.length);
