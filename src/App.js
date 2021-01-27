import { useState, useEffect, useMemo, useRef } from "react";
import Box from "components/Box";
import { getReactIssues } from "services";
import './App.scss';


const blockName = 'app-wrapper';

function App() {
  const inputRef = useRef(null)
  const [state, setState] = useState({
    searchValue: '',
    loading: true,
    data: [],
    selected: -1,
  });

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const data = await getReactIssues();
      if(mounted) {
        inputRef.current.focus();
        setState(prevState => ({
          ...prevState,
          data,
          loading: false,
        }));
      }
    }

    getData();
      return () => {
        mounted = false;
      }
    
  }, []);

  const filteredData = useMemo(() => {
    return state.data.filter(({ title }) => {
      return title.toUpperCase().includes(state.searchValue.toUpperCase());
    });
  }, [state.searchValue, state.data]);

  const handleChange = e => {
    setState(prevState => ({
      ...prevState,
      searchValue: e.target.value,
      selected: -1,
    }))
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" && state.selected !== 0) {
      setState(prevState => ({
        ...prevState,
        selected: prevState.selected - 1,
      }));
    }
    if (e.key === "ArrowDown" && state.selected !== filteredData.length - 1) {
      setState(prevState => ({
        ...prevState,
        selected: prevState.selected + 1,
      }));
    }
  };

  

  return (
    <div className={blockName}>
      <input
        data-testid="input"
        value={state.searchValue} 
        onChange={handleChange} 
        type="text" 
        className={`${blockName}__input`}
        placeholder="Seach an issue"
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      {state.loading && <p>Loading data...</p>}
      <div className={`${blockName}__issues-container`} data-testid="issues-container"> 
        {filteredData.map(({ id, ...rest }, index) => (
          <Box key={id} issue={rest} isSelected={index === state.selected} />
        ))}
      </div>
    </div>
  );
}

export default App;
