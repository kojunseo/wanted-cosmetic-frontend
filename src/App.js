import React, { useState } from 'react';
import './App.css';
import WantedChatCompletions from './wantedpt';
// import SrcReader from './jsonReader';


function App() {
  
  const search_keyword_chain = new WantedChatCompletions("f803a97aa734c16ded979d5b176389bf80b7bd2230ee5c49ef94dd6c7df8cae2");
  const document_index_search_chain = new WantedChatCompletions("1cbab7a71f89a0f4a1874c9b0c8abdc829164e44254614b856f8013d0c6d1bc5",);
  const generation_chain = new WantedChatCompletions("47df1957fb5093fc089887263481f3a4ab1551fc1ea5dcbe29ba27c8f3d30241");
  const [userQuestion, setUserQuestion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [status, setStatus] = useState('');
  // const [answer, setAnswer] = useState('');

  const handleSearch = async () => {
    setIsSearching(true);
    setStatus('적절한 수술을 찾고 있습니다.');
    const keyword = await search_keyword_chain.completions([], {question: userQuestion});
    const keyword_name = await search_keyword_chain.get_keyword(keyword);
    // if keyword is fetched than change status
    setStatus(`'${keyword_name}'와 관련된 수술을 찾고 있습니다.`);
    const document_index = await document_index_search_chain.completions([], {question: userQuestion});
    const context = await document_index_search_chain.get_context(keyword, document_index);
    
    setStatus(`관련 내용을 찾았습니다. 코디네이터가 의견 생성 중입니다.`);
    const answer = await generation_chain.completions([], {"question": userQuestion, "context": context})
    setStatus(answer);
    // after getting the document index, get the document from the srcs
  };


  return (
    <div>
      <h1>성형 수술 상담</h1>
      <input type="text" value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} />
      <button onClick={handleSearch}>검색</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
