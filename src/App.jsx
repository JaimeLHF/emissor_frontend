import SidebarMenu from './SidebarMenu';
import './App.css'; // Adicione esta linha para importar o CSS do App

function App() {
  return (
    <div className="App">
      <SidebarMenu />
      <div className="content">
        <h1>Bem-vindo ao Meu App</h1>
        <p>Conteúdo principal aqui</p>
      </div>
    </div>
  );
}

export default App;
