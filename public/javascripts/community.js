window.onload = function () {
  getArticle();
  console.log('hi');
};

function getArticle() {
  console.log('in');
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
    })
    .catch((error) => {
      console.log(error);
    });
}
