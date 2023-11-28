import { Route, Routes } from "react-router-dom"
import CreateBook from "./pages/CreateBook"
import EditBook from "./pages/EditBook"
import Home from "./pages/Home"
import ShowBook from "./pages/ShowBook"
import DeleteBook from "./pages/DeleteBook"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
      </Routes>
    </>
  )
}

export default App
