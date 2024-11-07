import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateOrderDto, UpdateTodoDto } from './dto/update-todo.dto';
import * as fs from 'fs';
import { json } from 'stream/consumers';

@Injectable()
export class TodoService {
  
  create(createTodoDto: CreateTodoDto) {
    // const jsonData = fs.readFileSync('./src/todo/todo.json', 'utf8');
    // let jsonArray = JSON.parse(jsonData);

    

    // let id = 1;
    // if (size > 0) {
    //   id = jsonArray[size - 1].id + 1;
    // }
    // jsonArray.push(todo);
    // fs.writeFileSync('./src/todo/todo.json', JSON.stringify(jsonArray, null, 2));
    
    // var todos:CreateTodoDto[] = [];
    // todos = this.findAll();

    // let order = 1, size = jsonArray.length;

    // if (!createTodoDto.order) {
    // if (size > 0) 
    //   order = jsonArray[size - 1].order + 1;
    // }
    // else {
    //   createTodoDto.order =+ createTodoDto.order;
    //   order = createTodoDto.order;
    //   for (let i=0; i<size; i++) {
    //     if (jsonArray[i].order >= order) {
    //       jsonArray[i].order = jsonArray[i].order + 1;
    //     }
    //   }
    // }

    const todo = {
          todo: createTodoDto.todo,
          isCompleted: createTodoDto.isCompleted ?? false,
          order: createTodoDto.order ?? 1
        }

    return todo;
  }

  findAll() {
    var todos:CreateTodoDto[] = [];
    const data = fs.readFileSync('./src/todo/todo.json', 'utf8')
    todos = JSON.parse(data);    
    todos.sort((a, b) => {return a.order - b.order}); //sort by order, ascending
    
    return todos;

    //NOTES/ATTEMPTS:
    // var todo: string = "this is a new todo";
    // var isCompleted: boolean = false;
    // var order: number = 1;
    // var obj: CreateTodoDto = {todo: todo, isCompleted: isCompleted, order: order};

    // fs.readFile('./src/todo/todo.json', 'utf8', (err, data) => {
    //   if (err) {
    //     throw err;
    //   }
    //   const lines = data.split("\n");

    //   for (let i=0; i<lines.length; i++) {
    //     var obj = JSON.parse(lines[i]);
    //     todos.push(obj);
    //   }
    // });  
  }

  findOne(id: number) {
    var todos:CreateTodoDto[] = [];
    const data = fs.readFileSync('./src/todo/todo.json', 'utf8')
    todos = JSON.parse(data);

    return todos[id-1];
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    var todos:CreateTodoDto[] = [];
    const data = fs.readFileSync('./src/todo/todo.json', 'utf8')
    todos = JSON.parse(data);

    if (updateTodoDto.todo)
    todos[id-1].todo = updateTodoDto.todo;
    if (updateTodoDto.isCompleted)
    todos[id-1].isCompleted = updateTodoDto.isCompleted;

  
    fs.writeFileSync('./src/todo/todo.json', JSON.stringify(todos, null, 2));

    return todos[id-1];
  }
  
  replace(updateTodoDto: UpdateOrderDto[]) {
    var updates:UpdateOrderDto[] = [];
    const data = fs.readFileSync('./src/todo/todo.json', 'utf8');
    var todos:CreateTodoDto[] = [];
    todos = JSON.parse(data);

    updates = updateTodoDto;
    var st = new Set(updateTodoDto);
    

    if (updates.length != st.size)
      throw new Error('Duplicate order values are not allowed');
    
    for (let i=0; i<updates.length; i++) {
        for (let j=0; j<todos.length; j++) {
          if (todos[j].id == updates[i].id) {
            todos[j].order = updates[i].order;
          }
        }
      }

    //NOTES/ATTEMPTS:
  //   updateTodoDto.order =+ updateTodoDto.order;
  //     let neworder = updateTodoDto.order;
  //     let oldorder = todos[id-1].order;
  //     if (neworder > oldorder) {
  //       for (let i=0; i<todos.length; i++) {
  //         if (todos[i].order <= neworder && todos[i].order > oldorder && todos[i].id != id) {
  //           todos[i].order = todos[i].order - 1;
  //         }
  //       }
  //       todos[id-1].order = neworder;
  //     }
  //     else if (neworder < oldorder) {
  //       for (let i=0; i<todos.length; i++) {
  //         if (todos[i].order >= neworder && todos[i].order < oldorder && todos[i].id != id) {
  //           todos[i].order = todos[i].order + 1;
  //         }
  //       }
  //       todos[id-1].order = neworder;
  // }

  // fs.writeFileSync('./src/todo/todo.json', JSON.stringify(todos, null, 2));

  return todos;
}

  remove(id: number) {
    var todos:CreateTodoDto[] = [];
    const data = fs.readFileSync('./src/todo/todo.json', 'utf8');
    todos = JSON.parse(data);

    let index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);

    fs.writeFileSync('./src/todo/todo.json', JSON.stringify(todos, null, 2));
    return `Item with id ${id} has been removed`;
  }
}
