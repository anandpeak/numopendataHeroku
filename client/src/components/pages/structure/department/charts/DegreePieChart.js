//https://www.youtube.com/watch?v=L5GXOdt2uOc

import React from 'react';
import * as d3 from 'd3';
import './PieChart.css';

class DegreePieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numberOfDegree: [] };
  }

  componentDidMount() {
    this.drawChart();
  }

  async componentWillReceiveProps() {
    this.removePreviusChar();
    await this.setState({ numberOfDegree: this.props.numberOfDegree }, () =>
      this.drawChart()
    );
  }

  removePreviusChar() {
    let chart = document.getElementsByClassName('degreePie')[0];

    while (chart.hasChildNodes()) {
      chart.removeChild(chart.lastChild);
    }
  }

  drawChart = async () => {
    await this.setState({ numberOfDegree: this.props.numberOfDegree });

    const width = 800;
    const height = 500;

    const colors = d3.scaleOrdinal(d3.schemePaired);

    const svg = d3
      .select('.degreePie')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', 'white')
      .attr('transform', 'translate(50,10)');

    const details = this.state.numberOfDegree;

    const data = d3.pie().value((d) => {
      return d.count;
    })(details);

    const segments = d3
      .arc()
      .innerRadius(0)
      .outerRadius(200)
      .padAngle(0.05)
      .padRadius(50);

    const sections = svg
      .append('g')
      .attr('transform', 'translate(250,250)')
      .selectAll('path')
      .data(data);

    sections
      .enter()
      .append('path')
      .attr('d', segments)
      .attr('fill', (d) => {
        return colors(d.data.count);
      });

    const content = d3.select('g').selectAll('text').data(data);

    content
      .enter()
      .append('text')
      .classed('inside', true)
      .each(function (d) {
        if (d.data.count !== 0) {
          const center = segments.centroid(d);
          d3.select(this)
            .attr('x', center[0])
            .attr('y', center[1])
            .text(d.data.count);
        }
      });

    const legends = svg
      .append('g')
      .attr('transform', 'translate(550, 50)')
      .selectAll('.legends')
      .data(data);

    const legend = legends
      .enter()
      .append('g')
      .classed('legends', 'true')
      .attr('transform', function (d, i) {
        return 'translate(0,' + (i + 1) * 30 + ')';
      });

    legend
      .append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', function (d) {
        return colors(d.data.count);
      });

    legend
      .append('text')
      .classed('label', true)
      .text(function (d) {
        return d.data.education;
      })
      .attr('fill', function (d) {
        return colors(d.data.count);
      })
      .attr('x', 30)
      .attr('y', 20)
      .style('fill', 'black');
  };
  render() {
    return (
      <React.Fragment>
        <div className="degreeChartTitle">
          Багш, ажилчидын зэрэг цолны мэдээллийг графикаар харуулав.{' '}
        </div>
        <div className="degreePie"></div>
      </React.Fragment>
    );
  }
}

export default DegreePieChart;
