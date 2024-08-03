import axios  from "axios";

class WantBase {
  constructor() {
    // this.apiUrl = "http://apicoord.kojunseo.duckdns.org";
    this.apiUrl = "http://apicoord.kojunseo.zapto.org";
  }
}

class WantedChatCompletions extends WantBase {
  constructor(hash) {
    super();
    this.hash = hash;
  }

  async completions(messages = [], params = {}) {
    const body = {
      params: params,
      hash: this.hash,
    };
    const response = await axios.post(
      this.apiUrl+"/api", body
    );
    console.log(response);
    // const out = response.data.choices[0].message.content;
    const out = response.data.data;
    return out;
  }

  async get_keyword(keyword) {
    const body = {
      keyword: keyword
    };
    const response = await axios.post(
      this.apiUrl+"/keyword", body
    );
    const out = response.data.data;
    return out;
  }

  async get_context(keyword, index) {
    console.log(keyword, index);
    const body = {
      keyword: keyword,
      index: index
    };
    const response = await axios.post(
      this.apiUrl+"/context", body
    );
    const out = response.data.data;
    return out;
  }
  
  async get_community(index) {
    const body = {
      keyword: index
    };

    const response = await axios.post(
      this.apiUrl+"/community", body
    );
    const out = response.data;
    return out;
  }

  async get_news(index){
    const body = {
      keyword: index
    };
    const response = await axios.post(
      this.apiUrl+"/news", body
    );
    const out = response.data;
    return out;
  }

  async get_cost(index){
    const body = {
      keyword: index
    };
    const response = await axios.post(
      this.apiUrl+"/cost", body
    );
    const out = response.data.data;
    return out;
  }
}
export default WantedChatCompletions;
