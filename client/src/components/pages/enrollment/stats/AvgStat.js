import React from 'react';

class FemaleStat extends React.Component {
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
            611.41545893719808,
            573.37681159420288,
            624.0,
            610.31500742942046,
            621.60526315789468,
            621.13768115942025,
            625.19612068965512,
            705.4,
            595.62441314554,
            590.65277777777783,
          ],
          backgroundColor: '#ff5722',
          label: '30%-р тооцуулсан элсэгчийн тоо',
        },
        {
          data: [
            662.45150501672242,
            614.26548672566366,
            617.51388888888891,
            630.02521525215252,
            666.5272727272727,
            681.48128342245991,
            674.15349369988542,
            735.41463414634143,
            629.73394495412845,
            623.78947368421052,
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
          text: 'ЭЕШ-д тооцуулсан элсэгчийн дундаж оноо, хичээлээр тус бүрээр',
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

export default FemaleStat;
