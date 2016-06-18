'use strict';

console.log('3d cloud.js is loaded');

var wordsArray = [
  { text: 'Front-end', size: 50 },
  { text: 'JavaScript', size: 50 },
  { text: 'AngularJS', size: 30 },
  { text: 'jQuery', size: 20 },
  { text: 'Vanila JS', size: 40 },
  { text: 'eslint', size: 20 },
  { text: 'LESS', size: 30 },
  { text: 'SCSS', size: 20 },
  { text: 'Web Audio API', size: 40 },
  { text: 'Canvas', size: 20 },
  { text: 'SVG', size: 20 },
  { text: 'Gulp', size: 30 },
  { text: 'npm', size: 30 },
  { text: 'NodeJS', size: 20 },
  { text: 'Unit testing', size: 20 },
  { text: 'TypeScript', size: 20 },
  { text: 'WebStorm', size: 50 },
  { text: 'Atom', size: 30 },
  { text: 'GIT', size: 40 },
  { text: 'SVN', size: 20 },
  { text: 'TFS', size: 20 },
  { text: 'HTML5', size: 50 },
  { text: 'ES6', size: 40 },
  { text: 'Lodash', size: 40 },
  { text: 'Photoshop', size: 30 },
  { text: 'Lightroom', size: 30 },
  { text: 'Photography', size: 30 },
  { text: 'UI UX', size: 30 },
  { text: 'Datamining', size: 20 },
  { text: 'SQL', size: 20 },
  { text: 'Matlab', size: 20 },
  { text: '3Ds Max', size: 20 },
  { text: 'Video editing', size: 20 },
  { text: 'Agile', size: 20 },
  { text: 'English', size: 20 },
  { text: 'English', size: 30 },
  { text: 'Omsk', size: 30 },
  { text: 'Singapore', size: 20 }];

var fill = d3.scale.category20c();

var layout = d3.layout.cloud()
  .size([800, 500])
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
    });
}

var textsElements = document.getElementsByTagName('text');
console.log('Data length:', wordsArray.length, 'Cloud size:', textsElements.length);
