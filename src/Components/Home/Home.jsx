import React, { useEffect, useRef, useState } from "react";
import "./Home.css";

function Home() {
  const searchRef = useRef(null);
  const [todoInfo, setTodoInfo] = useState({
    Name: "",
    Status: "",
  });
  var [Todos, setTodos] = useState([]);
  let currentLength = Todos.length;
  const [totalLength, setTotalLength] = useState(0);

  const [query, setQuery] = useState("");

  const handleEffect = (e) => {
    document.querySelectorAll(".optionIcon").forEach((c, ind) => {
      if (String(ind) === e.target.id) {
        c.classList.add("activeOption");
        setTodoInfo({ ...todoInfo, Status: e.target.getAttribute("data") });
      } else {
        c.classList.remove("activeOption");
      }
    });
  };
  const handleTodoEffects = (e) => {
    document.querySelectorAll(".todoList").forEach((t, ind) => {
      if (String(ind) === e.target.id) {
        t.classList.toggle("activeTodo");
      } else {
        t.classList.remove("activeTodo");
      }
    });
    document.querySelectorAll(".fa-trash-can").forEach((t, ind) => {
      if (String(ind) === e.target.id) {
        t.classList.add("singleDelete");
      } else {
        t.classList.remove("singleDelete");
      }
    });
  };
  const addTodo = (e) => {
    e.preventDefault();
    setTotalLength(totalLength + 1);
    if (document.getElementById("Todo").value === "") {
      document.getElementById("Todo").focus();
    } else {
      document.querySelectorAll(".optionIcon").forEach((c, i) => {
        if (c.classList.contains("activeOption")) {
          setTodos([...Todos, todoInfo]);
          document.getElementById("Todo").value = "";
          c.classList.remove("activeOption");
        } else {
          document
            .querySelector(".defaultOption")
            .classList.add("activeOption");
          setTodoInfo({
            ...todoInfo,
            Status: document.getElementById("Default").innerHTML,
          });
        }
      });
    }
  };
  const handleDelete = (index) => {
    console.log(index);
    Todos = Todos.filter((t, i) => {
      return i !== index;
    });
    setTodos(Todos);
    currentLength -= 1;
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target === searchRef.current) {
        document.getElementById("effect").classList.add("activeSearch");
      } else {
        document.getElementById("effect").classList.remove("activeSearch");
      }
    });
  });
  useEffect(() => {
    if (Todos.length > 0) {
      document.querySelectorAll(".list").forEach((l) => {
        if (l.innerHTML === "All") {
          l.style.setProperty("--width", "50%");
          l.classList.add("listColor");
        } else {
          l.style.setProperty("--width", "0%");
          l.classList.remove("listColor");
        }
      });
    }
  }, [Todos.length]);

  return (
    <section className="home">
      <div className="part1">
        <div className="intro" data-aos="zoom-in" data-aos-duration="1000">
          <h1>T&nbsp;O&nbsp;D&nbsp;O</h1>
          <div className="arrangeIcon">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <i className="fa-solid fa-sun"></i>
        </div>
        <div className="search" data-aos="zoom-in" data-aos-duration="1000">
          <div>
            <input
              ref={searchRef}
              type="text"
              id="Todo"
              placeholder="Click to add todo..."
              onChange={(e) =>
                setTodoInfo({ ...todoInfo, Name: e.target.value })
              }
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <hr id="effect" />
          <div className="options">
            <div className="option">
              <span
                className="optionIcon defaultOption"
                id={0}
                data="Active"
                onClick={(e) => handleEffect(e)}
              ></span>
              <label id="Default">Active</label>
            </div>
            <div className="option">
              <span
                className="optionIcon"
                id={1}
                data="Pending"
                onClick={(e) => handleEffect(e)}
              ></span>
              <label>Pending</label>
            </div>
            <div className="option">
              <span
                className="optionIcon"
                id={2}
                data="Completed"
                onClick={(e) => handleEffect(e)}
              ></span>
              <label>Completed</label>
            </div>
          </div>
        </div>
      </div>
      {Todos.length > 0 ? (
        <div className="part2" data-aos="zoom-in" data-aos-duration="1000">
          {Todos.length > 0 ? (
            <ul
              onClick={(e) => {
                setQuery(e.target.innerHTML);
                document.querySelectorAll(".list").forEach((l) => {
                  if (l.innerHTML === e.target.innerHTML) {
                    l.style.setProperty("--width", "50%");
                    l.classList.add("listColor");
                  } else {
                    l.classList.remove("listColor");
                    l.style.setProperty("--width", "0%");
                  }
                });
              }}
            >
              <li className="list" id="filterDefault">
                All
              </li>
              <li className="list">Active</li>
              <li className="list">Pending</li>
              <li className="list">Completed</li>
            </ul>
          ) : (
            ""
          )}
          <div className="todosHolder">
            {Todos.filter((t) => {
              if (query === "" || query === "All") {
                return t;
              } else {
                return t.Status.includes(query);
              }
            }).map((t, i) => {
              return (
                <React.Fragment key={i}>
                  <div key={i} className="container">
                    <div>
                      <span
                        className="todoList"
                        id={i}
                        data="Active"
                        onClick={(e) => handleTodoEffects(e)}
                      ></span>
                      <label>{t.Name}</label>
                    </div>
                    <div key={i}>
                      <p>{t.Status}</p>
                      {t.Status !== "Completed" ? (
                        <span
                          className={
                            t.Status === "Active" ? "Active" : "InProgress"
                          }
                        ></span>
                      ) : (
                        <i className="fa-solid fa-check"></i>
                      )}
                    </div>

                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => handleDelete(i)}
                    ></i>
                  </div>

                  <span className="separator"></span>
                </React.Fragment>
              );
            })}
          </div>
          <div className="total">
            {totalLength} / {currentLength}
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default Home;
