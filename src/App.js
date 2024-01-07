
import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from './components/LandingPage';
import SignUpFormFirst from './childComponents/signupformfirst';
import SignupformNext from './childComponents/signupformNext';
import LoginComponent from './childComponents/LoginComponent';
import { ErrorComponent } from './childComponents/CustomError';
import { SuccessComponent } from './childComponents/SuccessComponent';
import SignupFormFinal from "./childComponents/signupFormfinal";
import HomePage from './childComponents/HomePage';  
import TmpSemiCircle from './tmpcomponents/tmpsemicircle';
import TempComponent from './tmpcomponents/TempComponent';
import MenuComponent from './childComponents/MenuComponent';
import ForgotPasswordComponent from './LoginLogout/ForgotPasswordComponent';
import CreatePasswordComponent from './LoginLogout/CreatePasswordComponent';
import DisplayUsers from './tmpcomponents/DisplayUsers';
// import SelfProfile from './Profile/SelfProfile';
// import ViewPostCommentComponent from './PostCommentComponents/ViewPostCommentComponent';
// import ProfilepicSelectionComponent from './profilepiccontrols/ProfilepicSelectionComponent';
// import PostCommentContainer from './PostCommentComponents/PostCommentContainer';
import LogoComponent from './logoComponent/LogoComponent';


class App extends Component {
  render() {
    return (
      <Router basename="/">
        <Routes>
          
          {/* <Route exact path="/" element={<ProfilepicSelectionComponent/>} /> */}
                
          {/* <Route exact path="/" element={<SelfProfile/>} /> */}
          {/* <Route exact path="/postitems" element={<PostCommentContainer/>} /> */}
          {/* <Route exact path="/" element={<LogoComponent/>} /> */}
          {/* <Route exact path="/" element={<TempComponent/>} /> */}
          <Route exact path="/" element={<LandingPage/>} />
          <Route exact path="/users" element={<DisplayUsers/>} />
          <Route exact path="/signupform1" element={<SignUpFormFirst/>} />
          <Route exact path="/signupform2" element={<SignupformNext/>} />
          <Route exact path="/loginpage" element={<LoginComponent/>} />
          <Route exact path="/error" element={<ErrorComponent/>} />
          <Route exact path="/signupsuccess" element={<SuccessComponent/>} />
          <Route exact path='/signupform3' element={<SignupFormFinal/>}/>
          <Route exact path='/homepage' element={<HomePage/>}/>
          <Route exact path='/menucomponent' element={<MenuComponent/>}/>
          <Route exact path="/forgetpassword" element={<ForgotPasswordComponent/>} />        
          <Route exact path="/createpassword" element={<CreatePasswordComponent/>} />        
        </Routes>
      </Router>
    );
  }
}

export default App;
