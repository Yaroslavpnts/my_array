class MyArray {
  constructor(...args) {
    let numberOfArgs = 0;
    let number;
    let typeOfArg;

    for (let arg of args) {
      numberOfArgs += 1;
      typeOfArg = typeof arg;
      number = arg;
    }

    if (numberOfArgs === 1 && typeOfArg === 'number') {
      for (let i = 0; i < number; i += 1) {
        this[i] = undefined;
      }

      numberOfArgs = number;
    } else {
      for (let i = 0; i < numberOfArgs; i += 1) {
        this[i] = args[i];
      }
    }

    this.length = numberOfArgs;
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

    return this.length += 1;
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
    let total = 0;

    if (initialValue) {
        for ( let i = 0; i < this.length; i += 1 ) {
            total = fn(accumulator, this[i]);
            accumulator += this[i];
        }
    } else {
        for ( let i = 1; i < this.length; i += 1 ) {
            total = fn(accumulator, this[i]);
            accumulator += this[i];
        }
    }
    
    return total;
  }

  filter(fn) {

    let arr = new MyArray();

    for ( let i = 0; i < this.length; i += 1 ) {
        if(fn(this[i], i, this)) {
            arr.push(this[i]);
        }
    }

    return arr;
  }

  sort(fn) {

    let result;

    if (!fn) {
        for ( let i = 0; i < this.length; i += 1 ) {
            for ( let j = 0; j <= this.length - i - 1; j += 1 ) {
                 result = fn(this[j + 1], this[j]);
    
                 if (!result) {
                    [this[j + 1], this[j]] = [this[j], this[j + 1]] 
                 }
            }
        }
        
        return this;
    }

    for ( let i = 0; i < this.length; i += 1 ) {
        for ( let j = 0; j <= this.length - i - 1; j += 1 ) {
             result = fn(this[j + 1], this[j]);

             if (result < 0) {
                [this[j + 1], this[j]] = [this[j], this[j + 1]] 
             }
        }
    }

    return this;

  }

  static from(iterable, fn) {

    let array = new MyArray();

    if ( iterable[Symbol.iterator] ) {
        
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


let array = new MyArray(7, 6, 5, 11, 4, 23, 2, 1);

console.log(array.sort((a, b) => a - b));


let test = ['в', 'а', 'н', 'р', 'я', 'з'];

console.log(test.sort());





