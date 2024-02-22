import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { Queue } from "./Queue/Queue";
import bodyParser from "body-parser";

// class QueueModel {
//     private queue: Queue<any> = new Queue<any>();

//     addTodo(todo: string): void {
//         this.queue.push(todo);
//     }

//     removeTodo(index: number): void {
//         if (index >= 0 && index < this.todos.length) {
//             this.queue.splice(index, 1);
//         }
//     }

//     getTodos(): string[] {
//         return this.todos;
//     }
// }
class QueueModel {
    public queue: Queue<any> = new Queue<any>();
    enqueue(item: any): void {
        this.queue.enqueue(item);
    }
    dequeue(): any {
        return this.queue.dequeue();
     }
 
     peek(): any {
         return this.queue.peek();
     }
 
     length(): number {
         return this.queue.length();
     }
 
}
class QueueView {
    render(queue: Queue<any>): string {
        // const todoList = queue
        //     .map((item) => `<li>${index + 1}. ${item} <a href="/delete/${index}">Delete</a></li>`)
        //     .join('');
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Queue</title>
            </head>
            <body>
                <p>Die Queue hat ${queue.length()} Elemente.</p>
            </body>
            </html>
        `;
    }
}

class QueueController {
    private model: QueueModel;
    private view: QueueView;

    constructor(model: QueueModel, view: QueueView) {
        this.model = model;
        this.view = view;
    }

    enqueue(item: any): void {
        this.model.enqueue(item);
    }

    dequeue(): any {
       return this.model.dequeue();
    }

    peek(): any {
        return this.model.peek();
    }

    length(): number {
        return this.model.length();
    }

    getQueue(): Queue<any> {
        return this.model.queue;
    }
}




dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const view = new QueueView();
const model = new QueueModel();
const controller = new QueueController(model, view);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    const queue = controller.getQueue();
    const html = view.render(queue);
    res.send(html);
});

app.post("/enqueue", (req: Request, res: Response) => {
    const item = req.body.value;
    if (item) {
        controller.enqueue(item);
    }
    res.redirect('/');
});
app.get("/dequeue", (req: Request, res: Response) => {
        let value = controller.dequeue();

    res.redirect('/');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    next();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});