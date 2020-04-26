import React from 'react';

class SchoolAvgGrade extends React.Component {
  constructor() {
    super();
    this.state = { ctx: {} };
  }

  componentDidMount() {
    const canvas = this.refs.canvas1;
    this.setState({
      ctx: canvas.getContext('2d'),
    });
  }

  renderLecDegrees = () => {
    var Chart = require('chart.js');

    var barChartData = {
      labels: [
        'W үнэлгээ',
        'F үнэлгээ',
        'D- үнэлгээ',
        'D үнэлгээ',
        'C- үнэлгээ',
        'C үнэлгээ',
        'B- үнэлгээ',
        'B үнэлгээ',
        'A- үнэлгээ',
        'A үнэлгээ',
      ],
      datasets: [
        {
          data: [
            4593,
            7158,
            4149,
            2695,
            5846,
            5350,
            12123,
            10091,
            14961,
            11046,
          ],
          backgroundColor: '#1289A7',
          label: 'Үнэлгээ',
        },
      ],
    };

    window.myBar = new Chart(this.state.ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        title: {
          display: true,
          text:
            '2018 оны намрын улиралд нийт оюутануудыг үнэлсэн үнэлгээ, тоогоор. ',
          fontSize: 30,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true,
        },
        legend: {
          position: 'top',
        },
      },
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.renderLecDegrees()}

        <div style={{ width: '90%', paddingTop: '100px' }}>
          <canvas ref="canvas1"></canvas>
        </div>
      </React.Fragment>
    );
  }
}

export default SchoolAvgGrade;
