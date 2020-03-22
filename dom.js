window.onload = () => {
  const dropMenu = document.getElementById('drop-menu');
  const colapsedMenu = document.getElementById('nav-colapsed');
  const asideScroll = document.getElementById('aside-scroll');
  const mainLinks = document.getElementsByClassName('link-tran');
  const cover = document.getElementById('cover');

  setTimeout(() => {
    cover.classList.remove('cover-down');
  }, 1000);

  Array.from(mainLinks).forEach(link => {
    link.addEventListener('click', e => {
      cover.classList.add('cover-up');
      setTimeout(() => {
        document.body.classList.add('bumpUp');
      }, 800);
      setTimeout(() => {
        cover.classList.remove('cover-up');
        document.body.classList.remove('bumpUp');
        window.location.pathname = link.dataset.destiny
      }, 1100);
      e.preventDefault();
    });
  })

  //////////////////////
  let scroll = 0;
  let upSide = false;
  let docWidth = document.body.clientWidth;

  setInterval(() => {
    docWidth = document.body.clientWidth;
    if (upSide || (docWidth >= 830 && scroll >= asideScroll.scrollHeight/1.5)
    || (docWidth < 830 && scroll >= asideScroll.scrollWidth/1.5)) {
      scroll -= 1;
      if (docWidth < 830) {
        asideScroll.scrollTo(scroll, 0);
      } else {
        asideScroll.scrollTo(0, scroll);
      }
      if (!upSide) {
        scroll = docWidth < 830 ? (asideScroll.scrollWidth/1.5) - 1 : (asideScroll.scrollHeight/1.5) - 1;
        upSide = true;
      }
      if (scroll <= 1) {
        upSide = false;
      }
    } else {
      if (docWidth < 830) {
        asideScroll.scrollTo(scroll, 0);
      } else {
        asideScroll.scrollTo(0, scroll);
      }
      scroll += 1;
    }
  }, 1000/30);
  dropMenu.addEventListener('click', () => {
    if (colapsedMenu.classList.contains('hidden')) {
      colapsedMenu.classList.remove('hidden');
      colapsedMenu.classList.add('show');      
    } else {
      colapsedMenu.classList.remove('show');   
      colapsedMenu.classList.add('shrink');   
      setTimeout(() => {
        colapsedMenu.classList.add('hidden');    
        colapsedMenu.classList.remove('shrink');       
      }, 600);      
    }
    dropMenu.classList.toggle('pressed');
  });

  window.addEventListener('resize', () => {
    if (!colapsedMenu.classList.contains('hidden')) {
      colapsedMenu.classList.remove('show');   
      colapsedMenu.classList.add('shrink');   
      setTimeout(() => {
        colapsedMenu.classList.add('hidden');    
        colapsedMenu.classList.remove('shrink');       
      }, 600); 
    } 
  });
}
