export class Queue {
  private items: any;
  private frontIndex;
  private backIndex;

  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }
  enqueue(item: any) {
    this.items[this.backIndex] = item;
    this.backIndex++;
    return item;
  }
  dequeue() {
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex++;
    return item;
  }

  size() {
    return Object.keys(this.items).length;
  }
}
