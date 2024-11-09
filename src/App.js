import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import EditorProfile from "./components/EditorProfile";
import CreateAccountEditor from "./pages/createAccountEditor";
import CreateAccountYoutuber from "./pages/CreateAccountYoutuber";
import DashboardYoutuber from "./pages/DashboardYoutuber";
import MyProjectsYoutuber from "./pages/myProjectsYoutuber";
import { useContext } from "react";
import { AppContext } from './context/AppContext.js'
import Youtuberprofiles from "./pages/youtuberprofiles.js";
import MyProjectsEditor from "./pages/MyProjectsEditor.js";
import ProjectEditorPage from "./components/ProjectEditorPage.js";
import About from "./pages/About.js";
import VideoUploadForm from "./components/UploadVideo.jsx";
import axios from 'axios'
import ProjectDescription from "./pages/projectdescription.js";
import AllProjects from "./pages/allprojects.js";
import VideoPlayerBasic from "./pages/mediaplayer.js";
import VideoPlayerBasicEd from "./pages/mediaplayered.js";
axios.defaults.withCredentials = true

const App = () => {
  const { fetchuserinfo } = useContext(AppContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // const page = searchParams.get("page") || 1;

    if (location.pathname.includes('editor') && !location.pathname.includes('id') ) {
      const type = 'editor';
      //youtuber ke home pe sare editors ka profile
      fetchuserinfo(type);
    }
    if (location.pathname.includes('youtuber') && !location.pathname.includes('id') ) {
      const type = 'youtuber';
      //editors  ke home pe sare youtubers ka profile
      fetchuserinfo(type);
    }
    if (location.pathname.includes('editor') && location.pathname.includes('id')) {
      const id = location.pathname.split('=')[1]; // Extract 'id' from the URL
      const type='editor'
      // youtuber ke home pe sare editors ka profile
      fetchuserinfo(type,id);
    }
   

    // else if (location.pathname.includes("categories")) {
    //   const category = location.pathname.split("/").slice(-1)[0].replace("-", " ");
    //   fetchuserinfo(Number(page), null, category);
    // } else {
    //   fetchuserinfo(Number(page));
    // }
  }, [location.pathname], [location.search]);

  return (

    <div>

      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col" >


        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>  </Route>
          <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>  </Route>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>  </Route>
          <Route path="/createAccountEditor" element={<CreateAccountEditor isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>  </Route>
          <Route path="/createAccountYoutuber" element={<CreateAccountYoutuber isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>  </Route>
          <Route path="/addprojectyoutuber" element={<DashboardYoutuber isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>  </Route>
          <Route path="/myprojectsyoutuber" element={<MyProjectsYoutuber />}>  </Route>
          <Route path="/myprojectseditor" element={<MyProjectsEditor />}>  </Route>
          <Route path="/youtuberprofiles" element={<Youtuberprofiles />}>  </Route>
          <Route path="/myprojectseditor/:id" element={<ProjectEditorPage />}>  </Route>
          <Route path="/projects/:id" element={<ProjectDescription />} />
          <Route path="/allprojects" element={<AllProjects/>}/>
          <Route path="/about" element={<About />}>  </Route>
          <Route path="/media/:videoUrl" element={<VideoPlayerBasic/>}/>
          <Route path="/mediaed/:videoUrl" element={<VideoPlayerBasicEd/>}/>


          <Route path="/editorprofile/:id" element={<EditorProfile />}>  </Route>
          <Route path="/editorprofiles" element={<Dashboard />}>  </Route>



        </Routes>



      </div>


    </div>


  )

}

export default App;
