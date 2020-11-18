import React, { Component } from "react";
import { Login, SignUp, Admin, Dashboard, NotFound } from "./pages";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "./Layout";
import { NewPost, EditPost } from "./components";
import store from "./store/index";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Layout} />
          <Route path="/dashboard" component={Layout} />

          <Route exact path="/dashboard/editPost"
            component={EditPost}
          // render={(props) => (<EditPost {...props} isAuthed={true} />
          // )} 
          />
          {/* <Switch>
            <Route path="/dashboard" component={Layout} />
            <Route path="/dashboard/newPost"
              // component={NewPost} 
              render={(props) => (<NewPost {...props} isAuthed={true} />
              )} />

            <Route exact path="/dashboard/editPost"
              component={EditPost} 
              // render={(props) => (<EditPost {...props} isAuthed={true} />
              )} />
          </Switch> */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/admin" component={Admin} />
          {/* <Route exact path="*" component={NotFound} /> */}
          <Route path="/NotFound" component={NotFound} />
          {/* <Route render={() => <Redirect to={{ pathname: "/NotFound" }} />} /> */}

          {/* <Route exact path="*" to="/dashboard/profile" component={Dashboard} /> */}

        </Router>
      </Provider>
    );
  }
}

export default App;
