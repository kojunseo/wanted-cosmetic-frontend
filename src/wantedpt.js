import axios  from "axios";

class WantBase {
  constructor() {
    const dotenv = require('dotenv');
    const path = require('path');
    
    dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
    
    const project = process.env.WANTED_PROJECT;
    const apiKey = process.env.WANTED_API_KEY;
    this.header = {
      project: project,
      apiKey: apiKey,
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    this.apiUrl = "http://localhost:9000";
    this.messages = [];
    this.params = {};
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
