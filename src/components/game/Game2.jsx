import React, { useState } from "react";

const priorities = ["", "Urgent", "Normal", "Biasa Saja"];

const ToDoItem = ({ item }) => (
  <div className="col">
    <div className="text-center rounded" style={{ backgroundColor: "white" }}>
      <div
        className="text-white rounded-top"
        style={{
          height: "30%",
          backgroundColor:
            item.priority === "Urgent"
              ? "red"
              : item.priority === "Normal"
              ? "#238755"
              : "black",
        }}>
        <p className="p-2">{item.priority}</p>
      </div>
      <h1 className="text-black fs-4">{item.nama}</h1>
      <p className="text-black fs-6 pb-3">{item.catatan}</p>
    </div>
  </div>
);

const Game2 = () => {
  const [task, setTask] = useState({ nama: "", priority: "", catatan: "" });
  const [list, setList] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setList([...list, task]);
    setTask({ nama: "", priority: "", catatan: "" });
  };

  return (
    <>
      <h1 className="pt-3 pb-5">Simple To Do List</h1>
      <div className="px-5 text-start">
        <form onSubmit={submitHandler}>
          <div className="row py-2">
            <div className="col-md-6">
              <label htmlFor="nama" className="form-label">
                Apa Yang Ingin Dikerjakan?
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                name="nama"
                id="nama"
                className="form-control"
                placeholder="Nama To-Do List"
                required
                value={task.nama}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="priority" className="form-label">
                Pilih Priority
              </label>
              <select
                name="priority"
                id="priority"
                className="form-select"
                required
                onChange={handleInputChange}
                value={task.priority}>
                {priorities.map((priority, index) => (
                  <option key={index} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <label htmlFor="catatan" className="form-label">
                Catatan
              </label>
              <textarea
                name="catatan"
                id="catatan"
                className="form-control"
                placeholder="Isi Catatan To-Do List"
                style={{ resize: "none" }}
                required
                onChange={handleInputChange}
                value={task.catatan}></textarea>
            </div>
          </div>
          <div className="pt-3 d-flex justify-content-start">
            <button className="btn btn-primary" type="submit">
              Tambah To-Do List
            </button>
          </div>
        </form>

        <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
          {list.map((item, index) => (
            <ToDoItem key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Game2;
