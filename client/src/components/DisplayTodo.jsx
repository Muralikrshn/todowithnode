import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const DisplayTodo = () => {

  const [todos, setTodos] = useState([]);
  // console.log(todos)

  async function deleteTodo(id){
    try {
      await fetch(`http://localhost:4000/todos/delete?todo_id=${id}`,
        {
          method:"DELETE"
          // headers:{
          //   "Content-Type":"application/json"
          // }
          // body: JSON.stringify()
        }
      );

      setTodos(todos.filter(todo => todo.id !== id))
      // console.log(delres)
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getTodos(){
    const res = await fetch("http://localhost:4000/todos").then((res) => res.json())
    // console.log(res)
    setTodos(res)
    getTodos();
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <Fragment>
      {/* <h1>Display Todo</h1> */}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>Eat</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr> */}

          {
            todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td> {todo.description} </td>
                <td><EditTodo  
                  todo={todo}
                
                /></td>
                <td><button onClick={() => {
                  deleteTodo(todo.todo_id)
                }} className='btn btn-danger'>Delete</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Fragment>
  )
}

export default DisplayTodo
// export {getTodos};