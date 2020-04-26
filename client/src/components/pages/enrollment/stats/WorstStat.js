import React from 'react';

class WorstStat extends React.Component {
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
          data: [
            480.0,
            487.0,
            485.0,
            484.0,
            534.0,
            421.0,
            510.0,
            584.0,
            480.0,
            492.0,
          ],
          backgroundColor: '#ff5722',
          label: '30%-р тооцуулсан элсэгчийн тоо',
        },
        {
          data: [
            522.0,
            504.0,
            502.0,
            424.0,
            522.0,
            536.0,
            445.0,
            502.0,
            502.0,
            492.0,
          ],
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
          text: 'ЭЕШ-д Тооцуулсан элсэгчийн хамгийн оноо ,хичээлээр тус бүрээр',
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

        <div style={{ width: '55%', paddingTop: '100px' }}>
          <canvas ref="canvas1"></canvas>
        </div>
      </React.Fragment>
    );
  }
}

export default WorstStat;
