import axios from "axios"
import { generate } from 'random-words'
import _ from 'lodash'
interface MyObject {
    translatedText: string,
}
const generateMCQ = (
    // meaning:{
    //     text:any,
    // }[],
    meaning: MyObject[],
    idx: number): string[] => {

    const correctAns: string = meaning[idx].translatedText;
    console.log(correctAns);

    const allMeaningExceptForCorrect = meaning.filter((i) => i.translatedText != correctAns)
    const incorrectOptions: string[] = _.sampleSize(allMeaningExceptForCorrect, 3).map((i) => i.translatedText)
    const mcqOptions = _.shuffle([...incorrectOptions, correctAns])
    console.log("the mcq options are");

    console.log(mcqOptions);

    return mcqOptions;
}

export const translateWords = async (params: LangType): Promise<WordType[]> => {
    const words = generate(8)
    const options = {
        method: 'POST',
        url: 'https://google-translator9.p.rapidapi.com/v2',
        headers: {
            'x-rapidapi-key': 'f86dae485dmsh579efd53b13035ap177bb3jsnf3c6321a2509',
            'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            q: words,
            source: 'en',
            target: params,
            format: 'text'
        }
    };

    try {

        const response = await axios.request(options);
        console.log(response.data);
        // console.log(words);


        // console.log(i);
        const arr: WordType[] = response.data.data.translations.map((value: any, i: any) => {
            const options: string[] = generateMCQ(response.data.data.translations, i);
            return {
                word: words[i],
                meaning: value.translatedText,
                options,

            }

        })
        // console.log(arr);

        return arr
    } catch (error) {
        console.error(error);
    }
}

export const countMatchingElements = (
    arr1: string[],
    arr2: string[]
): number => {
    if (arr1.length !== arr2.length) throw new Error("Arrays are not equal");

    let matchedCount = 0;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) matchedCount++;
    }

    return matchedCount;
};


export const fetchAudio = async (
    text: string,
    language: LangType
  ): Promise<string> => {
    const key = '399a0802a3d84fbd828b20f796216b46';
    const rapidKey = 'f86dae485dmsh579efd53b13035ap177bb3jsnf3c6321a2509';

    const encodedParams = new URLSearchParams({
      src: text,
      r: "-5",
      v:"Salim",
      c: "mp3",
      f: "8khz_8bit_mono",
      b64: "true",
    });

    if (language === "ja") encodedParams.set("hl", "ja-jp");
    else if (language === "ar") encodedParams.set("hl", "ar-sa");
    else if (language === "es") encodedParams.set("hl", "es-es");
    else if (language === "fr") encodedParams.set("hl", "fr-fr");
    else encodedParams.set("hl", "hi-in");

    const { data }: { data: string } = await axios.post(
      "https://voicerss-text-to-speech.p.rapidapi.com/",
      encodedParams,
      {
        params: { key },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": rapidKey,
          "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
        },
      }
    );

    return data;
  };



// 399a0802a3d84fbd828b20f796216b46  this is the api key
