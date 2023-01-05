import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';

import './css/index.scss';

import Navbar from './widget/navbar';
import AdminPages from './pages/admin/pages';
import AdminUINav from './pages/admin/ui-nav';
import AdminUINew from './pages/admin/ui-new';
import AdminUIEdit from './pages/admin/ui-edit';

import RenderDynamicPage from './pages/renderdynamicpage';
import RenderSpecialPage from './pages/renderspecialpage';
function App() {

    return (
          <div>

              <Router>
                  <Routes>
                      <Route exac path = '/ml-admin/' element={
                          <React.StrictMode>
                            <div className="app-container">
                                <Navbar />
                                <h1>Home</h1>
                             </div>
                          </React.StrictMode>
                      }/>

                      <Route exac path = '/ml-admin/database' element={
                          <React.StrictMode>
                          <div className="app-container">
                                <Navbar />
                                <h1>Database</h1>
                                 </div>
                          </React.StrictMode>
                      }/>

                      <Route exac path = '/ml-admin/pages' element={
                          <React.StrictMode>
                          <div className="app-container">
                                <Navbar />
                                <AdminPages />
                                </div>
                          </React.StrictMode>
                      }/>

                      <Route exac path = '/ml-admin/ui/navbar' element={
                          <React.StrictMode>
                              <AdminUINav />
                          </React.StrictMode>
                      }/>

                      <Route exac path = '/ml-admin/ui/new' element={
                          <React.StrictMode>
                              <AdminUINew />
                          </React.StrictMode>
                      }/>

                      <Route exac path = '/ml-admin/ui/edit/:page_id' element={
                          <React.StrictMode>
                              <AdminUIEdit />
                          </React.StrictMode>
                      }/>
                      <Route exac path = ':dynamic_url' element={
                          <React.StrictMode>
                              <RenderDynamicPage />
                          </React.StrictMode>
                      }/>
                      <Route exac path = '/' element={
                          <React.StrictMode>
                              <RenderSpecialPage />
                          </React.StrictMode>
                      }/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
