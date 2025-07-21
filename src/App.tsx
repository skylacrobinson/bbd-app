import './App.css';
import { AppProvider } from './context/AppContext';
import MainContent from './components/MainContent';
import { useGetData } from './hooks-utils/useGetData';
import Instructions from './components/Instructions';


export function App() {
      const {data, loading, error}=useGetData();


  return (
    <>
    <AppProvider>
      <Instructions/>
      {!loading && data &&
      <MainContent/>
      
      }</AppProvider>
    </>
  );
}
