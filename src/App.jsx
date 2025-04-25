import React from "react";
import Header from "./components/Header";
import NewTodo from "./components/NewTodo";
import TodoContextProvider from "./TodoContext";
import ThemeWrapper from "./components/ThemeWrapper";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <TodoContextProvider>
      <ThemeWrapper>
        <header>
          <Header />
          <NewTodo />
        </header>
        <main>
          <TodoList />
        </main>
      </ThemeWrapper>
    </TodoContextProvider>
  );
};

export default App;
