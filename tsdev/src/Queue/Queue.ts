import { AbstractQueue } from "./AbstractQueue";
import { QueueErrorType } from "./Queue.interface";
import { QueueError } from "./Queue.interface";

export class Queue<T> implements AbstractQueue<T> {
    private elements: T[] = [];
    private capacity = Number.MAX_SAFE_INTEGER;
    private count: number = 0;
    enqueue(item: T): void {
        if(this.length() >= this.capacity){
            throw new QueueError(QueueErrorType.QueueMaxSizeReached, QueueErrorType.QueueMaxSizeReached);
        }
        else{
            this.elements[this.count] = item;
            this.count++;
        }
    }
    dequeue(): T | undefined {
        if(this.length() <= 0){
            return undefined;
        }
        else{
            var currentItem = this.elements[0];
            this.elements.splice(0, 1);
            this.count--;
            return currentItem;
        }
    }
    peek(): T | undefined {
        if (this.length() <= 0){
            return undefined;
        }
        return this.elements[0];
    }
    length(): number {
        return this.count;
    }
    setCapacity(capacity: number): void {
        if(capacity > Number.MAX_SAFE_INTEGER){
            throw new QueueError(QueueErrorType.QueueMaxSizeReached, QueueErrorType.QueueMaxSizeReached);
        }
        else if (capacity < 0) {
            throw new QueueError(QueueErrorType.QueueMinSizeReached, QueueErrorType.QueueMinSizeReached);
        }
        else {
            this.capacity = capacity;
        }
    }
    getCapacity(): number {
        return this.capacity;
    }



}