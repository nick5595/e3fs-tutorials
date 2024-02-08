import { describe, beforeEach, test, expect }  from '@jest/globals';
import { IQueue, QueueError, QueueErrorType } from "./Queue.interface";
import { Queue } from "./Queue";

// Jest-Tests
describe("Queue Tests", () => {
    let emptyQueue: IQueue<number>;
    let singleElementQueue: IQueue<number>;
    let multiElementQueue: IQueue<number>;
    let alternatingQueue: IQueue<number>;
    let overCapacityQueue: IQueue<string>;
    let mixedTypeQueue: IQueue<number | string>;
    
    beforeEach(() => {
      // Leere Queue
      emptyQueue = new Queue<number>();
  
      // Queue mit einem Element
      singleElementQueue = new Queue<number>();
      singleElementQueue.enqueue(42);
  
      // Queue mit mehreren Elementen
      multiElementQueue = new Queue<number>();
      multiElementQueue.enqueue(1);
      multiElementQueue.enqueue(2);
      multiElementQueue.enqueue(3);
  
      // Queue für abwechselnde Enqueue und Dequeue
      alternatingQueue = new Queue<number>();
      alternatingQueue.enqueue(10);
      alternatingQueue.dequeue();
      alternatingQueue.enqueue(20);

      // Queue für gemischte Datentypen
      mixedTypeQueue = new Queue<number | string>();
      mixedTypeQueue.enqueue(1);
      mixedTypeQueue.enqueue("two");

      // Queue für max size Test
      overCapacityQueue = new Queue<string>();
      overCapacityQueue.setCapacity(2);
      overCapacityQueue.enqueue("Dies");
      overCapacityQueue.enqueue("ist ein ..");
    });
  
    // Testfälle für leere Queue
    test("Testfall 1: Dequeue aus einer leeren Queue", () => {
      expect(emptyQueue.dequeue()).toBeUndefined();
    });
  
    test("Testfall 2: Size einer leeren Queue", () => {
      expect(emptyQueue.length()).toBe(0);
    });
  
    // Testfälle für Queue mit einem Element
    test("Testfall 3: Enqueue eines Elements in die leere Queue", () => {
      singleElementQueue.enqueue(99);
      expect(singleElementQueue.length()).toBe(2);
    });
  
    test("Testfall 4: Dequeue aus der Queue mit einem Element", () => {
      expect(singleElementQueue.dequeue()).toBe(42);
    });
  
    test("Testfall 5: Size nach Enqueue und Dequeue in der Queue mit einem Element", () => {
      singleElementQueue.enqueue(55);
      singleElementQueue.dequeue();
      expect(singleElementQueue.length()).toBe(1);
    });
  
    // Testfälle für Queue mit mehreren Elementen
    test("Testfall 6: Enqueue mehrerer Elemente in die leere Queue", () => {
      expect(multiElementQueue.length()).toBe(3);
    });
  
    test("Testfall 7: Dequeue aus der Queue mit mehreren Elementen", () => {
      expect(multiElementQueue.dequeue()).toBe(1);
    });
  
    test("Testfall 8: Size nach mehreren Enqueue und Dequeue-Operationen in der Queue mit mehreren Elementen", () => {
      multiElementQueue.enqueue(4);
      multiElementQueue.dequeue();
      expect(multiElementQueue.length()).toBe(3);
    });
  
    // Testfälle für abwechselndes Enqueue und Dequeue
    test("Testfall 9: Abwechselndes Enqueue und Dequeue und Überprüfung der korrekten Reihenfolge", () => {
      expect(alternatingQueue.dequeue()).toBe(20);
      alternatingQueue.enqueue(30);
      expect(alternatingQueue.dequeue()).toBe(30);
    });
  
    // Testfall für Enqueue mehr Elemente als die Kapazität der Queue
    test("Testfall 10: Enqueue mehr Elemente als die maximale Kapazität der Queue und Überprüfung des Verhaltens", () => {
        expect(overCapacityQueue.getCapacity()).toBe(2);
        expect(overCapacityQueue.length()).toBe(2);
        expect(() => overCapacityQueue.enqueue("Test")).toThrow(QueueError);
        try {
            overCapacityQueue.enqueue("Test");
        } catch (e) {
            expect((e as QueueError).message).toBe(QueueErrorType.QueueMaxSizeReached);
        }
    });
  
    // Testfall für Mischung von Datentypen
    test("Testfall 11: Enqueue von verschiedenen Datentypen in die Queue und Überprüfung der korrekten Verarbeitung", () => {
      expect(mixedTypeQueue.length()).toBe(2);
      expect(mixedTypeQueue.peek()).toBe(1);
      expect(mixedTypeQueue.dequeue()).toBe(1);
      expect(mixedTypeQueue.dequeue()).toBe("two");
    });

  });