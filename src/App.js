import React, { useState } from 'react';
import './App.css';
import WantedChatCompletions from './wantedpt';
import logo from './logo.png';


function App() {
  
  const search_keyword_chain = new WantedChatCompletions("f803a97aa734c16ded979d5b176389bf80b7bd2230ee5c49ef94dd6c7df8cae2");
  const document_index_search_chain = new WantedChatCompletions("1cbab7a71f89a0f4a1874c9b0c8abdc829164e44254614b856f8013d0c6d1bc5",);
  const generation_chain = new WantedChatCompletions("47df1957fb5093fc089887263481f3a4ab1551fc1ea5dcbe29ba27c8f3d30241");
  const [userQuestion, setUserQuestion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [status, setStatus] = useState('');
  
  const randomQuestion = [
    "보톡스 시술의 부작용을 알려주세요.",
    "코의 높이를 올리고 싶어요. 어떤 수술이 적합할까요?",
    "가슴이 너무 작아서 고민이에요.",
    "쌍커풀 수술의 효과가 어떻게 되나요?",
    "눈매 교정술을 하기전 주의 사항을 알려주세요.",
    "과도한 다이어트 이후, 살이 너무 쳐졌어요."
  ]
  var randomIndex1 = Math.floor(Math.random() * randomQuestion.length);
  if (randomIndex1===0){
    randomIndex1 = 1;
  }
  
  const random1 = randomQuestion[randomIndex1];
  const random2 = randomQuestion[randomIndex1-1];


  const handleSearch = async () => {
    // remove the howabout div hidden
    document.getElementById('howabout').classList.add('hidden');
    document.getElementById('howabout-title').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');


    setStatus('적절한 수술을 찾고 있습니다.');
    const keyword = await search_keyword_chain.completions([], {question: userQuestion});
    const keyword_name = await search_keyword_chain.get_keyword(keyword);
    // if keyword is fetched than change status
    const document_index = await document_index_search_chain.completions([], {question: userQuestion});
    const context = await document_index_search_chain.get_context(keyword, document_index);
    
    setStatus(`'${keyword_name}'와 관련된 수술을 찾고 있습니다. 전담 코디네이터가 의견을 작성 중입니다.`);
    const answer = await generation_chain.completions([], {"question": userQuestion, "context": context})
    document.getElementById('loading').classList.add('hidden');
    setStatus(answer);
  };
    

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleHowAboutClick = (text) => {
    setUserQuestion(text);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-slate-50 to-emerald-50'>
      <div className='w-full md:w-2/3 bg-white rounded-lg p-8 md:p-20'>
        <div className='flex'>
          <img src={logo} alt="logo" className='w-10 h-10'/>
          <h1 className='text-2xl font-bold px-2'>나만의 성형 코디네이터</h1>
        </div>
       
        <div className='flex items-center justify-center'>
          <input className='p-2 m-2 w-full rounded-md border-2 border-gray-300' type="text" value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} onKeyPress={handleKeyPress} />
          <button className='p-2 m-2 w-20 rounded-md bg-blue-500 text-white' onClick={handleSearch}>검색</button>
        </div>
        <div className='pt-5'>
          <div className='flex'>
            <div className='flex my-5 space-x-1 hidden' id='loading'>
              <div className='h-2 w-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
              <div className='h-2 w-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
              <div className='h-2 w-2 bg-emerald-600 rounded-full animate-bounce'></div>
            </div>
            <p className='px-3 font-semibold text-lg my-3'>{status}</p>
          </div>
          <p className='p-2 font-bold' id='howabout-title' >이런걸 물어보는건 어때요?</p>
          <div className='w-full' id="howabout">
            <p id="howabout1" className='px-2 bg-emerald-50 border-1 p-1 my-2 rounded-lg hover:bg-emerald-100 active:bg-emerald-200' onClick={() => handleHowAboutClick(random1)}>{random1}</p>
            <p id="howabout2" className='px-2 bg-emerald-50 border-1 p-1 my-2 rounded-lg hover:bg-emerald-100 active:bg-emerald-200' onClick={() => handleHowAboutClick(random2)}>{random2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
