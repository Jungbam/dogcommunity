window.onload = function () {
  getArticle();
};

function getArticle() {
  axios({
    method: 'get', //통신 방식
    url: '/v1/community', //통신할 페이지
    data: {}, //인자로 보낼 데이터
  })
    .then((response) => {
      const data = response.data;

      const accordianBox = document.getElementById('communityContainer');
      const accordion = document.createElement('div');
      accordion.className = 'accordion';
      accordion.setAttribute('id', '"accordionExample"');
      const articleArray = [...data.articles];
      articleArray.map((el) => {
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

      const maxIndex = data.maxIndex;
      let currentPage;
      const pagination = document.getElementById('page-container');
      if (!currentPage) {
        paging(maxIndex, currentPage);
      }
      pagination.addEventListener('click', function (e) {
        currentPage = e.target.innerHTML;
        paging(maxIndex, currentPage);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
function paging(totalPage, currentPage = 1) {
  const pageCount = 5;

  let last = +currentPage + 2;
  if (currentPage < 3) {
    last = 5;
  }
  if (last > totalPage) {
    last = totalPage;
  }
  let first = last - (pageCount - 1);
  const next = last + 1;
  const prev = first - 1;
  if (totalPage < 1) {
    first = last;
  }
  const pages = document.getElementById('page-container');
  pages.innerHTML = '';

  if (first > 1) {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item';
    pageItem.innerHTML = `<a class="page-link" href="v1/community?page=${prev}">prev</a>`;
    pages.appendChild(pageItem);
  }
  for (let i = first; i <= last; i++) {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item';
    pageItem.innerHTML = `<a class="page-link" href="v1/community?page=${i}">${i}</a>`;
    pages.appendChild(pageItem);
  }
  if (next > 5 && next < totalPage) {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item';
    pageItem.innerHTML = `<a class="page-link" href="v1/community?page=${next}">next</a>`;
    pages.appendChild(pageItem);
  }
}
