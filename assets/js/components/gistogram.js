class Chart {
  scaleRows = 4;
  constructor(params) {
    this.data = params.data;
    this.type = params.type;
    this.container = params.container;
    this.maxHeight = params.container.clientHeight;
  }
  findMaxValue() {
    return this.data.reduce((prev, curr) => {
      if (prev > curr) return prev;
      return curr;
    }, 0);
  }

  getBarChartEl() {
    const maxValue = this.findMaxValue();
    const dataToBarHeight = this.data.map((item) => {
      return item * (this.maxHeight / maxValue);
    });
    const barChartEl = document.createElement('div');
    barChartEl.classList.add('histogram__chart');

    for (let i = 0; i < dataToBarHeight.length; i++) {
      const barItemEl = document.createElement('div');
      barItemEl.classList.add('histogram__bar');
      barItemEl.style.height = dataToBarHeight[i] + 'px';
      barChartEl.appendChild(barItemEl);
    }
    return barChartEl;
  }

  getScaleNumbersEl(maxValue) {
    const scaleEl = document.createElement('div');
    scaleEl.classList.add('histogram__scale');
    for (let i = 0; i < this.scaleRows; i++) {
      const scaleNumEl = document.createElement('div');
      scaleNumEl.classList.add('histogram__row-number');
      scaleNumEl.textContent = Math.round((maxValue + 25) / (i + 1));
      scaleEl.appendChild(scaleNumEl);
    }
    return scaleEl;
  }

  getChartGridEl() {
    const chartGridEl = document.createElement('div');
    chartGridEl.classList.add('histogram__grid');
    for (let i = 0; i < this.scaleRows; i++) {
      const gridRowEl = document.createElement('div');
      gridRowEl.classList.add('histogram__row');
      chartGridEl.appendChild(gridRowEl);
    }
    return chartGridEl;
  }

  render() {
    switch (this.type) {
      case 'bar':
        const scaleEl = this.getScaleNumbersEl(this.findMaxValue());
        const gridChartEl = this.getChartGridEl();
        const chartEl = this.getBarChartEl();
        chartEl.appendChild(gridChartEl);

        this.container.appendChild(scaleEl);
        this.container.appendChild(chartEl);
        break;
    }
  }
}
