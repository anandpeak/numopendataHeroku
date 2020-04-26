import React from 'react';

class TotalEnrollments extends React.Component {
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
          data: [828, 69, 68, 673, 38, 552, 928, 15, 426, 72],
          backgroundColor: '#ff5722',
          label: '30%-р тооцуулсан элсэгчийн тоо',
        },
        {
          data: [299, 113, 72, 1626, 55, 187, 873, 41, 327, 76],
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
          text: 'ЭЕШ-д тооцуулсан нийт элсэгчийн тоо, тооцуулсан хичээлээр',
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

export default TotalEnrollments;
