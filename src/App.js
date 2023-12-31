import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import Error from "./pages/Error"
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
     <BrowserRouter>
     <ScrollToTop />
     <Routes>
      <Route path ="/" element = {<HomePage />}></Route>
      <Route path ="/blog" element = {<Blog />}></Route>
      <Route path ="/blog/:slug" element = {<BlogPost />}></Route>
      <Route path ="*" element = {<Error />}></Route>
     </Routes>
     </BrowserRouter>
    </>
  );
}


