class Chart {
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

  renderBarChart() {
    const maxValue = this.findMaxValue();
    const dataToBarHeight = this.data.map((item) => {
      return item * (this.maxHeight / maxValue);
    });
    for (let i = 0; i < dataToBarHeight.length; i++) {
      const barItemEl = document.createElement('div');
      barItemEl.classList.add('histogram__bar');
      barItemEl.style.height = dataToBarHeight[i] + 'px';
      this.container.appendChild(barItemEl);
    }
  }

  render() {
    switch (this.type) {
      case 'bar':
        this.renderBarChart();
        break;
    }
  }
}
