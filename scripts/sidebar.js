const body = document.querySelector('body');
      icon = body.querySelector('.icon');
      sidebar = body.querySelector('.sidebar');
      toggle = body.querySelector('.toggle');
      searchBtn = body.querySelector('.search-box');
      modeText = body.querySelector('.mode-text');

     toggle.addEventListener('click', () => {
        sidebar.classList.toggle('close');
     });