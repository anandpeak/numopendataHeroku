//https://www.youtube.com/watch?v=L5GXOdt2uOc

import React from 'react';
import * as d3 from 'd3';
import './GradePieChart.css';

import {
  select,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format,
} from 'd3';

class GradePieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numberOfGrade: [] };
  }

  componentDidMount() {
    this.drawChart();
  }

  async componentWillReceiveProps() {
    this.removePreviusChar();
    await this.setState({ numberOfGrade: this.props.numberOfDegree }, () =>
      this.drawChart()
    );
  }

  removePreviusChar() {
    let chart = document.getElementsByClassName('svgGrade')[0];

    while (chart.hasChildNodes()) {
      chart.removeChild(chart.lastChild);
    }
  }

  drawChart = async () => {
    await this.setState({ numberOfGrade: this.props.numberOfGrade });

    const titleText = 'Үсгэн үнэлгээ ';
    const xAxisLabelText = 'Тоон мэдээллээр';

    const svg = select('.svgGrade');

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const render = (data) => {
      const xValue = (d) => d['sum'];
      const yValue = (d) => d.grade_char;
      const margin = { top: 50, right: 20, bottom: 77, left: 50 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth]);

      const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const xAxisTickFormat = (number) =>
        format('.3s')(number).replace('G', 'B');

      const xAxis = axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight);

      g.append('g')
        .call(axisLeft(yScale))
        .selectAll('.domain, .tick line')
        .remove();

      const xAxisG = g
        .append('g')
        .call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);

      xAxisG.select('.domain').remove();

      xAxisG
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', 65)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabelText)
        .style('font-size', '25px');

      g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', (d) => yScale(yValue(d)))
        .attr('width', (d) => xScale(xValue(d)))
        .attr('height', yScale.bandwidth())
        .style('fill', d3.color('steelblue'));

      g.append('text').attr('class', 'title').attr('y', -10).text(titleText);
    };

    const data = this.state.numberOfGrade;

    data.forEach((d) => {
      d.sum = +d.sum;
    });

    render(data);
  };
  render() {
    return (
      <React.Fragment>
        <div className="gradeChartContainer">
          <div className="titleOfGrade">
            Тэнхимд харьяалагдах нийт хичээлүүд дээр оюутануудыг үнэлсэн байдал.
            (2018 оны Намрын улирал)
          </div>
          <div className="gradePie"></div>
          <svg className="svgGrade" width="1000" height="600"></svg>
        </div>
      </React.Fragment>
    );
  }
}

export default GradePieChart;
