import React, {useState, useEffect} from "react";
import "./styles.css";
import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    handleListRepository();
  },[]);

  async function handleAddRepository() {
    const repository = {
      id: `${Date.now()}`,
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };
    await api.post('/repositories', repository);

    setRepositories([...repositories,repository]);
  }

  async function handleListRepository() {
    await api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }
  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository =>
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
