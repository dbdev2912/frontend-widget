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

import AdminRelations from './pages/admin/relations';

import Navbar from './widget/navbar';
import AdminDesign from './pages/admin/design';
import AdminUINav from './pages/admin/ui-nav';
import AdminUINew from './pages/admin/ui-new-clone';
import AdminUIEdit from './pages/admin/ui-edit';
import AdminAPINew from './pages/admin/api-new';
import AdminAPIEdit from './pages/admin/api-edit';
import AdminForm from './pages/admin/form';

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
                                <AdminRelations />
                            </div>
                          </React.StrictMode>
                      }/>

                      <Route exac path = '/ml-admin/pages' element={
                          <React.StrictMode>
                          <div className="app-container">
                                <Navbar />
                                <AdminDesign />
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
                      <Route exac path = '/ml-admin/api/new' element={
                          <React.StrictMode>
                              <AdminAPINew />
                          </React.StrictMode>
                      }/>

                      <Route exac path = '/ml-admin/ui/edit/:page_id' element={
                          <React.StrictMode>
                              <AdminUIEdit />
                          </React.StrictMode>
                      }/>

                      <Route exac path = '/ml-admin/api/edit/:api_id' element={
                          <React.StrictMode>
                              <AdminAPIEdit />
                          </React.StrictMode>
                      }/>

                      <Route exac path = '/ml-admin/form/:rel' element={
                          <React.StrictMode>
                              <AdminForm />
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
