function Ship(length) {
  return {
    length,
    hits: 0,
    sink: false,
    position: undefined,
    hit() {
      if (this.hits >= length) {
        this.sink = true;
      } else {
        this.hits += 1;
        if (this.hits >= length) {
          this.sink = true;
        }
      }
    },
    isSunk() {
      if (this.hits >= this.length) {
        this.sink = true;
      } else {
        this.sink = false;
      }
    },
  };
}

export default Ship;
