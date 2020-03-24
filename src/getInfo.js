let array = [];
const getInfo = async page => {
  let answer = await fetch(
    `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
  );
  let result = await answer.json();
  array = array.concat(result.hits);
  return array;
};

export default getInfo;
