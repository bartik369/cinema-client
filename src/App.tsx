import React, { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as contentConst from "../src/utils/constants/content";
import PrivateRoutes from "./routes/PrivateRoutes";
import { useVerifyTokenMutation } from "./store/authApi";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Movies from "./pages/movie/Movies";
import AddMovie from "./pages/movie/AddMovie";
import Footer from "./components/footer/Footer";
import AddActor from "./pages/actor/AddActor";
import Movie from "./pages/movie/Movie";
import Profile from "./pages/profile/Profile";
import Page404 from "./pages/404/Page404";
import Admin from "./pages/admin/Admin";
import EditMainSlider from "./pages/slider/EditMainSlider";
import style from "./App.module.css";

const App: FC = () => {
  const [verifyToken] = useVerifyTokenMutation();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    token &&
      verifyToken(token)
        .then((data) => console.log(data))
        .catch((error) => {
          return error;
        });
  }, [token]);

  return (
    <div className={style.wrapper}>
      <Header />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="*" element={<Page404 />} />
        <Route element={<PrivateRoutes allowedRoles={[contentConst.USER]} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoutes allowedRoles={[contentConst.ADMIN]} />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add-movie" element={<AddMovie />} />
          <Route path="/admin/add-actor" element={<AddActor />} />
          <Route path="/admin/edit-slider" element={<EditMainSlider />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
