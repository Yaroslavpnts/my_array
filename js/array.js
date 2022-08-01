class MyArray {
  constructor(firstP, ...args) {
    let numberOfArgs = 0;

    for (let arg of args) {
      numberOfArgs += 1;
    }

    if (numberOfArgs === 0 && typeof firstP === 'number') {
      numberOfArgs = firstP;

      for (let i = 0; i < numberOfArgs; i += 1) {
        this[i] = undefined;
      }
    } else {
      this[0] = firstP;

      for (let i = 1; i <= numberOfArgs; i += 1) {
        this[i] = args[i - 1];
      }
    }

    this.length = numberOfArgs + 1;
  }

  push(item) {
    this[this.length] = item;
    this.length += 1;
  }

  pop() {
    let item = this[this.length - 1];
    delete this[this.length - 1];
    this.length -= 1;

    return item;
  }

  shift() {
    let item = this[0];
    delete this[0];

    for (let i = 0; i < this.length - 1; i += 1) {
      this[i] = this[i + 1];
    }

    this.pop();

    return item;
  }

  unshift(item) {
    for (let i = this.length - 1; i >= 0; i -= 1) {
      this[i + 1] = this[i];

      if (i === 0) {
        this[i] = item;
      }
    }

    return (this.length += 1);
  }

  forEach(fn) {
    for (let i = 0; i < this.length; i += 1) {
      fn(this[i], i, this);
    }
  }

  map(fn) {
    let arr = new MyArray();
    let item;

    for (let i = 0; i < this.length; i += 1) {
      item = fn(this[i], i, this);
      arr.push(item);
    }

    return arr;
  }

  reduce(fn, initialValue) {
    let accumulator = initialValue ? initialValue : this[0];

    if (initialValue) {
      for (let i = 0; i < this.length; i += 1) {
        accumulator = fn(accumulator, this[i]);
      }
    } else {
      for (let i = 1; i < this.length; i += 1) {
        accumulator = fn(accumulator, this[i]);
      }
    }

    return accumulator;
  }

  filter(fn) {
    let arr = new MyArray();

    for (let i = 0; i < this.length; i += 1) {
      if (fn(this[i], i, this)) {
        arr.push(this[i]);
      }
    }

    return arr;
  }

  sort(fn) {
    let result;

    if (!fn) {
      for (let i = 0; i < this.length; i += 1) {
        for (let j = 0; j <= this.length - i - 1; j += 1) {
          result = fn(this[j + 1], this[j]);

          if (!result) {
            [this[j + 1], this[j]] = [this[j], this[j + 1]];
          }
        }
      }

      return this;
    }

    for (let i = 0; i < this.length; i += 1) {
      for (let j = 0; j <= this.length - i - 1; j += 1) {
        result = fn(this[j + 1], this[j]);

        if (result < 0) {
          [this[j + 1], this[j]] = [this[j], this[j + 1]];
        }
      }
    }

    return this;
  }

  static from(iterable, fn) {
    let array = new MyArray();

    if (iterable[Symbol.iterator]) {
      for (let i of iterable) {
        array.push(i);
      }
    }

    if (fn) {
      array = array.map(fn);
    }

    return array;
  }
}

let array = new MyArray(7, 6, 5);

// console.log(array.sort((a, b) => a - b));

// let test = ['в', 'а', 'н', 'р', 'я', 'з'];
