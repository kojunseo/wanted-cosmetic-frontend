const fs = require('fs');
const path = require('path');
const glob = require('glob');

// import fs from 'fs';
// import path from 'path';
// import glob from 'glob';

class SrcReader {
    constructor(filePath) {
        this.filePath = filePath;
        this.files = glob.sync(this.filePath);
        this.dataOrder = ["광대 뼈 수술", "눈 아래 안륜근융비술( 애교수술)", "눈 아래 주름제거술", "눈 아래 지방 제거술", "눈매 교정술", "눈썹 올림술", "눈트임 수술( 내 안각, 외안 각성형술)", "들창코 교정술", "레이저 박 피술", "보툴리눔 독소 (Botox)", "보형물을 이용한 유방 확대 수술", "복부 성형술", "실을 이용한 주름 개선술 (실루엣 리프트, 매직 리프트, 골드 리프트, 회오리 리프팅, 마이다 스리프팅, 오메가 리프팅, 미라큐 리프팅 등)", "쌍꺼풀 수술", "악교정수술", "안 검하수 교정술", "얼굴 올림술( 얼굴 주름 성형술)", "위 눈꺼풀 주름 제거술", "유두 성형술", "유방 고정술( 유방 리프트, 유방하수 고정술)", "유방 제거 후 유방 재건술, 유두 유륜 재건술", "유방 축소술( 여성)", "유방 축소술( 여성형 유방증수술)", "이마 올림술", "지방 흡인술( 지방 성형술)", "지방이식, 지방주입", "코 축소술 (매부리코 교정술, 휜코 교정술, 코볼 축소술)", "코끝 성형술", "콧등 융비술", "턱끝뼈 수술", "피부 필러", "화학박피술"];
        this.data = Object.fromEntries(this.dataOrder.map(t => [t, null]));
        this.paragraphOrder = ["title", "purpose", "information", "result", "caution", "notice"];
        
        for (const file of this.files) {
            const fData = JSON.parse(fs.readFileSync(file, 'utf8'));
            this.data[fData.title] = fData;
        }
    }

    getDocument(title = null, index = null) {
        if (title) {
            return this.data[title];
        } else if (index) {
            if (typeof index === 'string') {
                if (index.includes(' ')) {
                    index = index.split(' ')[0];
                }
                index = parseInt(index.replace(/\D/g, ''));
            }
            return this.data[this.dataOrder[index - 1]];
        }
    }

    getParagraph(document, index = null, name = null) {
        if (index) {
            if (typeof index === 'string') {
                try {
                    index = index.replace(',', ' ');
                    index = index.replace(/\D /g, '');
                    index = index.split(' ').map(Number);
                } catch {
                    index = [1, 2, 3, 4, 5];
                }
            }
            return index.map(i => `# ${this.paragraphOrder[i]}\n${document[this.paragraphOrder[i]]}`).join('\n');
        } else if (name) {
            return document[name];
        }
    }

    getKeywordName(index) {
        if (index.includes(' ')) {
            index = index.split(' ')[0];
        }
        index = parseInt(index.replace(/\D/g, ''));
        return this.dataOrder[index - 1];
    }
}

// Example usage
if (require.main === module) {
    const srcReader = new SrcReader("./cos/*.json");
    const doc = srcReader.getDocument(null, "10");
    const out = srcReader.getParagraph(doc, "1 3");
    console.log(out);
}

module.exports = SrcReader;
