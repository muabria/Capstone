import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginForm from "./components/AuthorizationForms/LoginForm";
import RegisterForm from "./components/AuthorizationForms/RegisterForm";
import UserDashboard from "./components/Dashboards/UserDashboard";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import CommentForm from "./components/PostWithComments/CommentForm";
import AllPosts from "./components/Posts/AllPosts";
import PostsWithComments from "./components/PostWithComments/PostsWithComments";
import AddNewPost from "./components/Posts/AddNewPost";
import NavBar from "./components/NavBar";
import CategoryPage from "./components/Categories/CategoryPage";

const AppContents = () => {

  const token = useSelector((state) => state.auth.token)

  return (
    <div className='gradient_background'>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/account" element={<UserDashboard />} />
          <Route path="/admin_dashboard" element={<AdminDashboard/>} />
          <Route path="/commentform" element={<CommentForm />} />
          <Route path="/equipment/:id/review" element={<PostsWithComments />} />
          <Route path="/new_review" element={<AddNewPost />} />
          <Route path="/posts" element={<AllPosts/>} />
          <Route path="/category/:id" element={<CategoryPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default AppContents;

//for Windows, run server:dev & dev concurrently in different terminals