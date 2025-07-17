import './App.css';
import MainContent from './MainContent';
import { useGetData } from './services/getData';

export function App() {
      const {data, loading, error}=useGetData();


  return (
    <>
      <h1 >Parcel React App</h1>
      <p>Edit <code>src/App.tsx</code> to get started!</p>
      {!loading && data &&
      <MainContent data={data}/>
      
      }
    </>
  );
}
