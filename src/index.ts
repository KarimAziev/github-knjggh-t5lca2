var calculator = {
  read() {
    this.operand = +prompt('Num: 0', '0');

    this.operand2 = +prompt('Num 1: ', '0');
  },
  sum() {
    return this.operand + this.operand2;
  },
  mul() {
    return this.operand * this.operand2;
  },
};

l(calculator);

alert('hello worlds');
