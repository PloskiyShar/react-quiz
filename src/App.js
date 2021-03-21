import { Route, Switch } from 'react-router';
import Auth from './containers/Auth/Auth';
import Quiz from './containers/Quiz/Quiz';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Layout from './HOC/Layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={QuizList} />
        <Route path="/" component={Quiz} />
      </Switch>
    </Layout>
  );
}

export default App;
