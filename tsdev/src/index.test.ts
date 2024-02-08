import { test, expect, describe, beforeEach } from '@jest/globals'
import { Queue } from './Queue/Queue'
import { QueueError, QueueErrorType } from './Queue/Queue.interface';

describe('Testfall Queue', () => {
    test("Test MultiElements", () => {
        let queue = new Queue<string>();
        queue.enqueue("Hello");
        queue.enqueue("World");
        expect(queue.length()).toBe(2);
    });
    test("Test QinQ", () => {
        let queue = new Queue<Queue<string>>();
        let innerQueue = new Queue<string>();
        innerQueue.enqueue("Test");
        queue.enqueue(innerQueue);
        expect(queue.dequeue()?.dequeue()).toBe("Test");
    });
    test("Test Null", () => {
        let queue = new Queue<null>();
        queue.enqueue(null);
        expect(queue.dequeue()).toBeNull();
    });
    test("Test Overflow", () => {
        let queue = new Queue<string>();
        queue.setCapacity(3);
        queue.enqueue("Hello");
        queue.enqueue("World");
        queue.enqueue("!");
        expect(() => queue.enqueue("!!!!!")).toThrowError(QueueError);
    });
    test("Test NegativeSize", () => {
        let queue = new Queue<string>();
        expect(() => queue.setCapacity(-1)).toThrowError(QueueError);
    });
    test("Test mixedType", () => {
        let queue = new Queue<string | number>();
        queue.enqueue("bla");
        queue.enqueue(1);
        expect(queue.dequeue()).toBe("bla");
        expect(queue.dequeue()).toBe(1);
    });
    test("Test removeFromEmptyQ", ()=> {
        let queue = new Queue<string>();
        expect(queue.dequeue()).toBeUndefined();
    });
});