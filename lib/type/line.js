/**
 * Created by mauricio on 3/29/15.
 */
var d3 = window.d3;

var Const = require('../constants');
var dataBuilder = require('../data');

module.exports = function (options) {
  function plotLine(selection) {
    var index = options.index;
    var xScale = options.owner.xScale();
    var yScale = options.owner.yScale();
    var interpolation = options.interpolation || 'cardinal';

    selection.each(function (data) {
      var finalData = dataBuilder.eval(data);
      //if (options.closed) {
      //  finalData.unshift([data.range[0], 0]);
      //  finalData.push([data.range[1], 0]);
      //}

      var path = d3.select(this).append('path')
        .datum(finalData)
        .attr('class', 'line line-' + index);

      var d;
      if (options.closed) {
        path.attr('fill', d3.hsl(Const.COLORS[index].toString()).brighter(1.1));
        d = d3.svg.area()
          .x(function (d) { return xScale(d[0]); })
          .y0(yScale(0))
          .y1(function (d) { return yScale(d[1]); });
      } else {
        path.attr('fill', 'none');
        d = d3.svg.line()
          .interpolate(interpolation)
          .x(function (d) { return xScale(d[0]); })
          .y(function (d) { return yScale(d[1]); });
      }

      path
        .attr('opacity', 0.5)
        .attr('stroke', Const.COLORS[index])
        .attr('d', d);
    });
  }

  return plotLine;
};