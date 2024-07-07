import React, { useState, useEffect } from 'react';
import './App.css';
import WantedChatCompletions from './wantedpt';
import logo from './logo.png';


function App() {
  
  const search_keyword_chain = new WantedChatCompletions("f803a97aa734c16ded979d5b176389bf80b7bd2230ee5c49ef94dd6c7df8cae2");
  const document_index_search_chain = new WantedChatCompletions("1cbab7a71f89a0f4a1874c9b0c8abdc829164e44254614b856f8013d0c6d1bc5",);
  const generation_chain = new WantedChatCompletions("47df1957fb5093fc089887263481f3a4ab1551fc1ea5dcbe29ba27c8f3d30241");
  const related_question_chain = new WantedChatCompletions("571813f290f28d1fefd3964999d91198fc79621d63e7855f8ef8993e72285209");
  const [userQuestion, setUserQuestion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [status, setStatus] = useState('');
  const [answer, setAnswer] = useState('');
  const [community, setCommunity] = useState('');
  const [random1, setRandom1] = useState('');
  const [random2, setRandom2] = useState('');
  const [related_question, setRelatedQuestion] = useState('');
  const [news, setNews] = useState('');
  const [cost, setCost] = useState('');
  


  
  var context = '';
  var keyword = '';
  var keyword_name = '';


  useEffect(() => {
    const randomQuestion = [
      "보톡스 시술의 부작용을 알려주세요.",
      "코의 높이를 올리고 싶어요. 어떤 수술이 적합할까요?",
      "가슴이 너무 작아서 고민이에요.",
      "쌍커풀 수술의 효과가 어떻게 되나요?",
      "눈매 교정술을 하기전 주의 사항을 알려주세요.",
      "과도한 다이어트 이후, 살이 너무 쳐졌어요.",
      "지방흡입의 비용은 어떻게 되나요?"
    ];
    var randomIndex1 = Math.floor(Math.random() * (randomQuestion.length-1)) + 1;
    console.log(randomIndex1)
    setRandom1(randomQuestion[randomIndex1]);
    setRandom2(randomQuestion[randomIndex1-1]);
  }, []);


  const handleSearch = async () => {
    // remove the howabout div hidden
    document.getElementById('search-button').classList.add('hidden');
    document.getElementById('search-input').classList.add('disabled');
    document.getElementById('howabout').classList.add('hidden');
    document.getElementById('howabout-title').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('loading-spinner').classList.remove('hidden');
    document.getElementById('loading-status').classList.add('px-3');
    document.getElementById('answer').classList.add('hidden');
    document.getElementById('cost-container').classList.add('hidden');


    setStatus('관련된 수술을 찾고 있습니다.');
    setAnswer('답변 준비 중 입니다.')
    keyword = await search_keyword_chain.completions([], {question: userQuestion});
    if (keyword === "33" || keyword===" "){
      // 질문이 잘못된 경우
      setStatus("해당 질문은 성형관련 질문이 아니거나, 답변할 수 없는 질문입니다. 다른 질문을 입력해주세요.");
      document.getElementById('loading-status').classList.remove('px-3');
      document.getElementById('loading-spinner').classList.add('hidden');
      document.getElementById('howabout').classList.remove('hidden');
      document.getElementById('howabout-title').classList.remove('hidden');
      document.getElementById('search-button').classList.remove('hidden');
      return;
    }
    
    const document_index = await document_index_search_chain.completions([], {question: userQuestion});
    context = await document_index_search_chain.get_context(keyword, document_index);
    setCommunity('')
    setNews('')
    setRelatedQuestion('')

    
    keyword_name = await search_keyword_chain.get_keyword(keyword);
    setStatus(`'${keyword_name}'와 관련된 정보를 수집 중 있습니다.`);
    
    const news_out = await search_keyword_chain.get_news(keyword);
    setNews(
      <div>
        <div onClick={() => window.open(news_out.links[0], '_blank')} className='hover:bg-emerald-100 active:bg-emerald-200 bg-emerald-50 p-2 rounded-lg my-2'>
          <p className='text-md font-semibold'>{news_out.titles[0]}</p>
          <p className='text-sm pt-1 font-light'>요약내용: {news_out.result[0]}</p>
        </div>
        <div onClick={() => window.open(news_out.links[1], '_blank')} className='hover:bg-emerald-100 active:bg-emerald-200 bg-emerald-50 p-2 rounded-lg my-2'>
          <p className='text-md font-semibold'>{news_out.titles[1]}</p>
          <p className='text-sm pt-1 font-light'>요약내용: {news_out.result[1]}</p>
        </div>
        <div onClick={() => window.open(news_out.links[2], '_blank')} className='hover:bg-emerald-100 active:bg-emerald-200 bg-emerald-50 p-2 rounded-lg my-2'>
          <p className='text-md font-semibold'>{news_out.titles[2]}</p>
          <p className='text-sm pt-1 font-light'>요약내용: {news_out.result[2]}</p>
        </div>   
      </div>
    )

    const community = await search_keyword_chain.get_community(keyword);
    document.getElementById('answer').classList.remove('hidden');
    setAnswer(
      <div className='flex my-3 space-x-1' id='loading-spinner'>
        <div className='h-2 w-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-2 w-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-2 w-2 bg-emerald-600 rounded-full animate-bounce'></div>
      </div>
    )
    document.getElementById('top-screen').classList.remove('md:h-screen');
    document.getElementById('top-screen').classList.add('md:py-8');
    document.getElementById('top-screen-inner').classList.remove('md:p-16');
    document.getElementById('top-screen-inner').classList.add('md:px-20');
    document.getElementById('top-screen-inner').classList.add('md:py-8');
    
    
    setCommunity(
      <div>
        <div onClick={() => window.open(community.links[0], '_blank')} className='hover:bg-emerald-100 active:bg-emerald-200 bg-emerald-50 p-2 rounded-lg my-2'>
          <p className='text-md font-semibold'>{community.titles[0]}</p>
          <p className='text-sm pt-1 font-light'>요약내용: {community.result[0]}</p>
        </div>
        <div onClick={() => window.open(community.links[1], '_blank')} className='hover:bg-emerald-100 active:bg-emerald-200 bg-emerald-50 p-2 rounded-lg my-2'>
          <p className='text-md font-semibold'>{community.titles[1]}</p>
          <p className='text-sm pt-1 font-light'>요약내용: {community.result[1]}</p>
        </div>
        <div onClick={() => window.open(community.links[2], '_blank')} className='hover:bg-emerald-100 active:bg-emerald-200 bg-emerald-50 p-2 rounded-lg my-2'>
          <p className='text-md font-semibold'>{community.titles[2]}</p>
          <p className='text-sm pt-1 font-light'>요약내용: {community.result[2]}</p>
        </div>   
      </div>
    )
    
    const coord_answer = await generation_chain.completions([], {"question": userQuestion, "context": context})
    setStatus(`코디네이터가 '${keyword_name}'에 대한 내용을 정리 중 입니다.`);

    const related_question = await related_question_chain.completions([], {"question": userQuestion, "context": context})
    
    document.getElementById('loading').classList.add('hidden');
    ScrollTop();
    var out = '';
    for (let i = 0; i < coord_answer.length; i++){
      out += coord_answer[i];
      setAnswer(out)
      await new Promise(resolve => setTimeout(resolve, 5));
    }

    if (! coord_answer.includes("만원")){
      document.getElementById('cost-container').classList.remove('hidden');
      const cost_out = await generation_chain.get_cost(keyword);
      setCost(cost_out);
    }

    const related_question_array = related_question.split('\n');
    for (let i = 0; i < related_question_array.length; i++){
      // remove the first 2 characters if it starts with number
      if (related_question_array[i][0] in ['0', '1', '2', '3']){
        related_question_array[i] = related_question_array[i].slice(2);
      }
    }
    
    setRelatedQuestion(
      <div>
        <p id="howabout1" className='px-2 bg-emerald-50 border-1 p-1 my-2 rounded-lg hover:bg-emerald-100 active:bg-emerald-200' onClick={() => handleRelatedQuestionClick(related_question_array[0])}>{related_question_array[0]}</p>
        <p id="howabout2" className='px-2 bg-emerald-50 border-1 p-1 my-2 rounded-lg hover:bg-emerald-100 active:bg-emerald-200' onClick={() => handleRelatedQuestionClick(related_question_array[1])}>{related_question_array[1]}</p>
      </div>
    )
    document.getElementById('search-button').classList.remove('hidden');
    document.getElementById('search-input').classList.remove('hidden');
  };
    

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  function ScrollTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  const handleRelatedQuestionClick = async (text) => {
    setUserQuestion(text);
    setAnswer(
      <div className='flex my-3 space-x-1' id='loading-spinner'>
        <div className='h-2 w-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-2 w-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-2 w-2 bg-emerald-600 rounded-full animate-bounce'></div>
      </div>
    )
    document.getElementById('search-button').classList.add('hidden');
    document.getElementById('search-input').classList.add('disabled');
    ScrollTop()
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('loading-spinner').classList.remove('hidden');
    document.getElementById('loading-status').classList.add('px-3');
    
    setStatus(`코디네이터가 추가 질문에 대한 답변을 준비하는 중입니다.`);
    const coord_answer = await generation_chain.completions([], {"question": text, "context": context})
    document.getElementById('loading').classList.add('hidden');
    ScrollTop();
    var out = '';
    for (let i = 0; i < coord_answer.length; i++){
      out += coord_answer[i];
      setAnswer(out)
      await new Promise(resolve => setTimeout(resolve, 5));
    }
    
    
    // setAnswer(
    //   <div className='rounded-lg bg-emerald-50 p-2'>
    //     <p className='text-lg'>{coord_answer}</p>
    //   </div>
    // )
    document.getElementById('search-button').classList.remove('hidden');
    document.getElementById('search-input').classList.remove('hidden');
  };


  const handleHowAboutClick = (text) => {
    document.getElementById('howabout').classList.remove('hidden');
    document.getElementById('howabout-title').classList.remove('hidden');
    document.getElementById('loading').classList.add('hidden');
    setUserQuestion(text);
  };

  return (
    <div className='flex flex-col items-center justify-center md:h-screen bg-gradient-to-b from-slate-50 to-emerald-50' id="top-screen">
      <div className='w-full md:w-2/3 bg-white rounded-lg p-8 md:p-20' id='top-screen-inner'>
        <div className='flex'>
          <img src={logo} alt="logo" className='w-10 h-10'/>
          <h1 className='text-2xl font-bold px-2'>나만의 성형 코디네이터</h1>
        </div>
        <div className='flex items-center justify-center'>
          <input className='p-2 m-2 w-full rounded-md border-2 border-gray-300 click:border-emerald-500' type="text" value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} onKeyPress={handleKeyPress} id="search-input" />
          <button id="search-button" className='p-2 m-2 w-20 rounded-md bg-emerald-500 text-white' onClick={handleSearch}>검색</button>
        </div>
        <div className='pt-5'>
          <div className='pt-3'>
            <div className='hidden px-2 flex' id='loading'>
              <div className='flex my-3 space-x-1' id='loading-spinner'>
                <div className='h-2 w-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-2 w-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-2 w-2 bg-emerald-600 rounded-full animate-bounce'></div>
              </div>
              <p className='font-semibold text-lg pb-2 px-3' id='loading-status'>{status}</p>
            </div>
          </div>
          <div id='answer' className='m-2 p-4 md:p-10 border-2 border-emerald-500 rounded-lg hidden'>

            <p className='font-bold text-xl md:text-2xl pb-2'>AI 코디네이터가 작성한 의견입니다.</p>
            <div className='rounded-lg bg-emerald-50 border-2 border-emerald-600 p-3'>
              <p className='text-md md:text-lg '>{answer}</p>
            </div>
            <p className='text-xs text-gray-5000 pt-2'>본 의견은 성형미용가이드북에 기반하여 인공지능을 통해 생성된 답변임으로 정확하지 않을 수 있습니다.</p>
            <div id="cost-container">
              <p className='font-bold text-lg pb-2 pt-8'>예상 수술 가격</p>
              <div className='bg-emerald-50 rounded-lg p-2'>
                <p className='text-md md:text-lg'>{cost}</p>
              </div>
              <p className='text-xs text-gray-5000'>정확한 비용은 병원의 상담을 통해 확인하는 것이 좋습니다.</p>
              
            </div>

            <p className='font-bold text-lg pb-2 pt-24'>다른 사람들의 커뮤니티의 의견을 들어볼까요?</p>
            {community}
            <p className='font-bold text-lg pb-2 pt-7'>다음과 같은 뉴스를 확인해볼 수 있어요.</p>
            {news}
            <p className='font-bold text-lg pb-2 pt-7'>다음과 같은 질문을 해볼 수 있어요.</p>
            {related_question}
          </div>

          </div>
          <p className='p-2 font-bold' id='howabout-title' >이런걸 물어보는건 어때요?</p>
          <div className='w-full' id="howabout">
            <p id="howabout1" className='px-2 bg-emerald-50 border-1 p-1 my-2 rounded-lg hover:bg-emerald-100 active:bg-emerald-200' onClick={() => handleHowAboutClick(random1)}>{random1}</p>
            <p id="howabout2" className='px-2 bg-emerald-50 border-1 p-1 my-2 rounded-lg hover:bg-emerald-100 active:bg-emerald-200' onClick={() => handleHowAboutClick(random2)}>{random2}</p>
          </div>
        </div>
      </div>
  );
}

export default App;
