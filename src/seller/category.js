import { useState, useEffect } from "react";

const Category = () => {
  const [catname, setCatname] = useState("");
  const [message, setMessage] = useState("");
  const [Categorylist, setCatlist] = useState([]);

  // Function to save a category
  const Save = () => {
    const newCat = { category: catname };
    const url = "http://localhost:3000/categoryapi";

    fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newCat),
    })
      .then((response) => response.json())
      .then((catinfo) => {
        setMessage(catname + " added successfully!");
        setCatname("");
        getCategory(); // Reload the list
      });
  };

  // Function to get the list of categories
  const getCategory = () => {
    const url = "http://localhost:3000/categoryapi";

    fetch(url)
      .then((response) => response.json())
      .then((catArray) => {
        setCatlist(catArray);
      });
  };

  // Function to delete a category
  const delcat = (id) => {
    const url = `http://localhost:3000/categoryapi/${id}`;

    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((info) => {
        setMessage("Category deleted successfully!");
        getCategory(); // Reload the list
      });
  };

  // Load categories on component mount
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <h3 className="text-center">Manage Category</h3>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              value={catname}
              onChange={(e) => setCatname(e.target.value)}
            />
            <button className="btn btn-primary" onClick={Save}>
              {" "}
              Save Category{" "}
            </button>
          </div>

          <h3 className="mt-5 text-center text-primary">Categories List</h3>
          <p className="text-center">{message}</p>
          <table
            align="center"
            cellPadding={20}
            className="table table-bordered"
          >
            <thead classname="thead-dark">
              <tr align="center">
                <th>ID</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Categorylist.map((Cat, index) => (
                <tr key={index} align="center">
                  <td>{Cat.id}</td>
                  <td>{Cat.category}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => delcat(Cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default Category;

