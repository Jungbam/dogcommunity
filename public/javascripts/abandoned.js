window.onload = function () {
  getArticle();
};

function getArticle() {
  console.log('hi');
  axios({
    method: 'get', //통신 방식
    url: '/v1/abandoned', //통신할 페이지
    data: {}, //인자로 보낼 데이터
  })
    .then((response) => {
      const data = response.data;
      console.log(data);

      const articleArray = [...data.articles];
      const cardBox = document.getElementById('animal-list');

      articleArray.forEach((el) => {
        console.log(el);
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card';
        cardContainer.innerHTML = `
               <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${el.title}</h5>
                  <p class="card-text">연락처 : ${el.contact}</p>
                  <p class="card-text">지역 : ${el.location}</p>
                  <p class="card-text">내용 : ${el.content}</p>
                </div>
        `;
        cardBox.appendChild(cardContainer);
      });

      const pageContainer = document.getElementById('page-container');
      const maxIndex = data.maxIndex;
      console.log(maxIndex);
      for (let i = 0; i < maxIndex; i++) {
        const pageNum = i + 1;
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item';
        pageItem.innerHTML = `<a class="page-link" href="v1/abandoned?page=${pageNum}">${pageNum}</a>`;
        pageContainer.appendChild(pageItem);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
// maxIndex: 전체 인덱스 길이
// articles: [
// _id: 게시글 UUID
// title: 제목
// content: 내용
// missingDate: 발견 날짜
// contact: 연락처
// location: 발견 위치
// createdAt: 작성 시간
// ]
