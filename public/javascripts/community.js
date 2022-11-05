window.onload = function () {
  getArticle();
};

function getArticle() {
  axios({
    method: 'get', //통신 방식
    url: '/articles/community', //통신할 페이지
    data: {}, //인자로 보낼 데이터
  })
    .then((response) => {
      const accordianBox = document.getElementById('communityContainer');
      const accordion = document.createElement('div');
      accordion.className = 'accordion';
      accordion.setAttribute('id', '"accordionExample"');
      const data = response.data;
      const articleArray = [...data.articles];
      articleArray.map((el) => {
        console.log(el);
        const article = document.createElement('div');

        const target = '#collapse' + el._id;
        const targeted = 'collapse' + el._id;
        article.className = 'accordion-item';
        article.innerHTML = `  
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target= ${target}
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
             ${el.title}
            </button>
          </h2>
          <div
            id= ${targeted}
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              ${el.content}
            </div>
          </div>
        </div>`;
        accordion.appendChild(article);
      });
      accordianBox.appendChild(accordion);

      const pageContainer = document.getElementById('page-container');
      const maxIndex = data.maxIndex;
      console.log(maxIndex);
      for (let i = 0; i < maxIndex; i++) {
        const pageNum = i + 1;
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item';
        pageItem.innerHTML = `<a class="page-link" href="board/community?page=${pageNum}">${pageNum}</a>`;
        pageContainer.appendChild(pageItem);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
