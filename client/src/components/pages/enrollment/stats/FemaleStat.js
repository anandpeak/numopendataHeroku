import React from 'react';

class AvgStat extends React.Component {
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
        'Англи хэл',
        'Биологи',
        'Газар зүй',
        'Математик',
        'Монгол улсын түүх',
        'Монгол хэл',
        'Нийгмийн тухай мэдлэг',
        'Орос хэл',
        'Физик',
        'Хими',
      ],
      datasets: [
        {
          data: [532, 47, 22, 381, 21, 454, 664, 10, 132, 59],
          backgroundColor: '#ff5722',
          label: '30%-р тооцуулсан элсэгчийн тоо',
        },
        {
          data: [183, 85, 29, 913, 24, 174, 688, 33, 134, 59],
          backgroundColor: '#ffd3b6',
          label: '70%-р тооцуулсан элсэгчийн тоо',
        },
      ],
    };

    window.myBar = new Chart(this.state.ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        title: {
          display: true,
          text: 'ЭЕШ-д Тооцуулсан эмэгтэй элсэгчийн тоо, тооцуулсан хичээлээр',
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

        <div style={{ width: '75%', paddingTop: '100px' }}>
          <canvas ref="canvas1"></canvas>
        </div>
      </React.Fragment>
    );
  }
}

export default AvgStat;
