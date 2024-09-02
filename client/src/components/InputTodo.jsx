import React, { Fragment, useState } from "react";
// import { getTodos } from "./DisplayTodo";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  // console.log(description)

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = {
      "description": description
    };
    try {
      const response = await fetch("https://todowithnode-nm1vnvwzh-somu-murali-mohan-reddys-projects.vercel.app/todos/insert", 
        {
          method:"POST",
          headers:{ "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      )
      // description = "";
      console.log(response)
    } catch (err) {
      console.log(err.message)
    }
  }

  function clearInput(e){
    // const inputValue = document.getElementsByClassName("from-control")[0].value;
    // console.log(inputValue)
    e.target.value = "";
  }

  return (
    <Fragment>
      <h1 className="text-center my-5">Input Todo</h1>
      <form onSubmit={onSubmitForm} action="" method="post" className="d-flex ">
        <input 
          type="text" 
          placeholder="Add todo"  className="form-control" 
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success" onClick={(e) => clearInput(e)}>Add</button>
      </form>
    </Fragment>
  )
}

export default InputTodo;