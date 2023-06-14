class Ship {
  constructor(length, position) {
    this.length = length;
    this.hits = 0;
    this.sink = false;
    this.position = position;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    if (this.hits >= this.length) {
      this.sink = true;
    } else {
      this.sink = false;
    }
  }
}

export default Ship;
