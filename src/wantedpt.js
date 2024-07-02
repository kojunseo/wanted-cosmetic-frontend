import axios  from "axios";

class WantBase {
  constructor() {

    this.apiUrl = "http://59.5.15.36:22006";
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
    const out = response.data.choices[0].message.content;
    return out;
  }

  async get_keyword(keyword) {
    const body = {
      keyword: keyword
    };
    const response = await axios.post(
      this.apiUrl+"/keyword", body
    );
    console.log(response);
    const out = response.data.data;
    return out;
  }

  async get_context(keyword, index) {
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
}
export default WantedChatCompletions;
