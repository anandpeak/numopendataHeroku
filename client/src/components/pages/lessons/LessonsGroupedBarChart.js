import React from 'react';
import * as d3 from 'd3';

import './LessonGBarChart.css';

class LessonsGroupedBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfGrade: [],
      gradeChartData: [
        {
          key: 'F',
          values: [
            { grpName: 'Тэнхим', grpValue: 0 },
            { grpName: 'Сургууль', grpValue: 0 },
            { grpName: 'Хичээл', grpValue: 0 },
          ],
        },
        {
          key: 'D',
          values: [
            { grpName: 'Тэнхим', grpValue: 0 },
            { grpName: 'Сургууль', grpValue: 0 },
            { grpName: 'Хичээл', grpValue: 0 },
          ],
        },
        {
          key: 'C',
          values: [
            { grpName: 'Тэнхим', grpValue: 0 },
            { grpName: 'Сургууль', grpValue: 0 },
            { grpName: 'Хичээл', grpValue: 0 },
          ],
        },
        {
          key: 'B',
          values: [
            { grpName: 'Тэнхим', grpValue: 0 },
            { grpName: 'Сургууль', grpValue: 0 },
            { grpName: 'Хичээл', grpValue: 0 },
          ],
        },
        {
          key: 'A',
          values: [
            { grpName: 'Тэнхим', grpValue: 0 },
            { grpName: 'Сургууль', grpValue: 0 },
            { grpName: 'Хичээл', grpValue: 0 },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.renderNormalDist();
  }

  async componentWillReceiveProps() {
    this.removePreviusChar();

    await this.setState(
      {
        numberOfGrade: this.props.departmentGrades,
        gradeChartData: [
          {
            key: 'F',
            values: [
              { grpName: 'Тэнхим', grpValue: 0 },
              { grpName: 'Сургууль', grpValue: 0 },
              { grpName: 'Хичээл', grpValue: 0 },
            ],
          },
          {
            key: 'D',
            values: [
              { grpName: 'Тэнхим', grpValue: 0 },
              { grpName: 'Сургууль', grpValue: 0 },
              { grpName: 'Хичээл', grpValue: 0 },
            ],
          },
          {
            key: 'C',
            values: [
              { grpName: 'Тэнхим', grpValue: 0 },
              { grpName: 'Сургууль', grpValue: 0 },
              { grpName: 'Хичээл', grpValue: 0 },
            ],
          },
          {
            key: 'B',
            values: [
              { grpName: 'Тэнхим', grpValue: 0 },
              { grpName: 'Сургууль', grpValue: 0 },
              { grpName: 'Хичээл', grpValue: 0 },
            ],
          },
          {
            key: 'A',
            values: [
              { grpName: 'Тэнхим', grpValue: 0 },
              { grpName: 'Сургууль', grpValue: 0 },
              { grpName: 'Хичээл', grpValue: 0 },
            ],
          },
        ],
      },
      () => this.renderNormalDist()
    );
  }

  removePreviusChar() {
    let chart = document.getElementsByClassName('LessonGBarChart')[0];

    while (chart.hasChildNodes()) {
      chart.removeChild(chart.lastChild);
    }
  }

  renderNormalDist = () => {
    const departGrade = this.props.departmentGrades;
    const stateData = this.state.gradeChartData;
    const schoolGrade = this.props.schoolGrades;
    const lessonGrade = this.props.lessonGrade;

    let totalGrade = 0;
    let totalLessonGrade = 0;
    let totalSchoolGrade = 0;

    const keys = Object.keys(schoolGrade);

    keys.forEach((key) => {
      totalSchoolGrade += schoolGrade[key];
    });

    lessonGrade.forEach((less) => {
      if (
        less.grade_char === 'A' ||
        less.grade_char === 'A-' ||
        less.grade_char === 'B' ||
        less.grade_char === 'B-' ||
        less.grade_char === 'C' ||
        less.grade_char === 'C-' ||
        less.grade_char === 'D' ||
        less.grade_char === 'D-' ||
        less.grade_char === 'F'
      ) {
        totalLessonGrade += parseInt(less.sum);
      }
    });

    departGrade.forEach((data) => {
      if (
        data.grade_char === 'A' ||
        data.grade_char === 'A-' ||
        data.grade_char === 'B' ||
        data.grade_char === 'B-' ||
        data.grade_char === 'C' ||
        data.grade_char === 'C-' ||
        data.grade_char === 'D' ||
        data.grade_char === 'D-' ||
        data.grade_char === 'F'
      ) {
        totalGrade += parseInt(data.sum);
      }
    });

    departGrade.forEach((data) => {
      stateData.forEach((charData) => {
        if (data.grade_char.slice(0, 1) === charData.key) {
          const temp = (parseFloat(data.sum) * 100) / totalGrade;

          charData.values[0].grpValue += temp;
        }
      });
    });

    lessonGrade.forEach((data) => {
      stateData.forEach((charData) => {
        if (data.grade_char.slice(0, 1) === charData.key) {
          const temp = (parseFloat(data.sum) * 100) / totalLessonGrade;

          charData.values[2].grpValue += temp;
        }
      });
    });

    keys.forEach((grade) => {
      stateData.forEach((charDatas) => {
        if (grade.slice(0, 1) === charDatas.key) {
          const temp = parseFloat(
            (schoolGrade[grade] * 100) / totalSchoolGrade
          );

          charDatas.values[1].grpValue += temp;
        }
      });
    });

    const groupData = stateData;

    var margin = {
        top: 20,
        right: 120,
        bottom: 60,
        left: 40,
      },
      width = 750 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var x0 = d3.scaleBand().rangeRound([0, width], 0.5).padding(0.1);

    var x1 = d3.scaleBand();
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var xAxis = d3
      .axisBottom()
      .scale(x0)
      .tickValues(groupData.map((d) => d.key));

    var yAxis = d3.axisLeft().scale(y);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3
      .select('.LessonGBarChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var tooltip = d3
      .select('.LessonGBarChart')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .text('Хувь: ');

    var categoriesNames = groupData.map(function (d) {
      return d.key;
    });

    var rateNames = groupData[0].values.map(function (d) {
      return d.grpName;
    });

    x0.domain(categoriesNames);
    x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);

    y.domain([
      0,
      d3.max(groupData, function (key) {
        return d3.max(key.values, function (d) {
          return d.grpValue;
        });
      }),
    ]);

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y axis')
      .style('opacity', '0')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .style('font-weight', 'bold')
      .text('Value');

    svg
      .select('.y')
      .transition()
      .duration(500)
      .delay(1300)
      .style('opacity', '1');

    var slice = svg
      .selectAll('.slice')
      .data(groupData)
      .enter()
      .append('g')
      .attr('class', 'g')
      .attr('transform', function (d) {
        return 'translate(' + x0(d.key) + ',0)';
      });

    slice
      .selectAll('rect')
      .data(function (d) {
        return d.values;
      })
      .enter()
      .append('rect')
      .attr('width', x1.bandwidth())
      .attr('x', function (d) {
        return x1(d.grpName);
      })
      .style('fill', function (d) {
        return color(d.grpName);
      })
      .attr('y', function (d) {
        return y(0);
      })
      .attr('height', function (d) {
        return height - y(0);
      })
      .on('mouseover', function () {
        return tooltip.style('visibility', 'visible');
      })
      .on('mousemove', function (d) {
        return tooltip
          .style('top', d3.event.pageY - 100 + 'px')
          .style('left', d3.event.pageX - 50 + 'px')
          .style('font-size', '20px')
          .style('font-family', 'bold')
          .style('background-color', 'white')
          .text('Хувь: ' + d.grpValue + '%');
      })
      .on('mouseout', function () {
        return tooltip.style('visibility', 'hidden');
      });

    slice
      .selectAll('rect')
      .transition()
      .delay(function (d) {
        return Math.random() * 1000;
      })
      .duration(1000)
      .attr('y', function (d) {
        return y(d.grpValue);
      })
      .attr('height', function (d) {
        return height - y(d.grpValue);
      });

    //Legend
    var legend = svg
      .selectAll('.legend')
      .data(
        groupData[0].values
          .map(function (d) {
            return d.grpName;
          })
          .reverse()
      )
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function (d, i) {
        return 'translate(0,' + i * 20 + ')';
      })
      .style('opacity', '0');

    //ylguulj haruulah ongo
    legend
      .append('rect')
      .attr('x', width + 90)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', function (d) {
        return color(d);
      });

    //ylguulah text
    legend
      .append('text')
      .attr('x', width + 85)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('font-size', '18px')
      .style('text-anchor', 'end')
      .text(function (d) {
        return d;
      });

    legend
      .transition()
      .duration(500)
      .delay(function (d, i) {
        return 1300 + 100 * i;
      })
      .style('opacity', '1');

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Хувь')
      .style('font-size', '15px')
      .style('font-family', 'serif');

    svg
      .append('text')
      .attr(
        'transform',
        'translate(' + width / 2 + ' ,' + (height + margin.top + 20) + ')'
      )
      .style('text-anchor', 'middle')
      .text('Үсгэн үнэлгээ')
      .style('font-size', '15px')
      .style('font-family', 'serif');
  };

  render() {
    return (
      <React.Fragment>
        <div className="lessonGPChartContainer">
          <div className="titleOfLessonGPChart">
            <h3>
              Салбар сургууль, тэнхим болон хичээлийн дүнгийн мэдээллийг
              харьцуулсан статистк график
            </h3>
            <h5>Зөвхөн A, B, C, D, F үнэлгээнүүдийг тооцсон болно.</h5>
          </div>
          <div className="LessonGBarChart"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default LessonsGroupedBarChart;
