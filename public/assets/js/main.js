(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  // Smooth scroll to top
  on('click', '.back-to-top', function (e) {
    e.preventDefault();
    scrollto('#header');
  });

  // Mobile nav dropdowns toggle
  on('click', '.dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('dropdown-active');
    }
  }, true);

  // Close mobile navbar when clicking on a scrollto link
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault();

      let navbar = select('#navbar');
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  /**
   * Blog
   */
  document.addEventListener('DOMContentLoaded', function () {
    const postsDiv = document.getElementById('posts');
    const newPostForm = document.getElementById('newPostForm');
    const searchInput = document.getElementById('searchInput');

    // Ambil postingan dari localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Fungsi untuk menyimpan postingan ke localStorage
    function savePosts() {
      localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Fungsi untuk menampilkan postingan
    function displayPosts(filteredPosts = posts) {
      postsDiv.innerHTML = ''; // Kosongkan konten sebelumnya

      // Loop melalui setiap postingan dan tampilkan di halaman
      filteredPosts.forEach((post, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const titleElement = document.createElement('h5');
        titleElement.classList.add('card-title');
        titleElement.textContent = post.title;

        const contentElement = document.createElement('p');
        contentElement.classList.add('card-text');
        contentElement.textContent = post.content;

        const dateElement = document.createElement('p');
        dateElement.classList.add('card-text', 'text-muted');
        dateElement.textContent = new Date(post.date).toLocaleDateString('id-ID');

        const readMoreLink = document.createElement('a');
        readMoreLink.classList.add('btn', 'btn-primary');
        readMoreLink.href = 'blog.html';
        readMoreLink.target = '_blank';
        readMoreLink.textContent = 'Baca Selengkapnya';

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-warning', 'edit-btn');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editPost(index)); // Tambahkan event listener untuk edit

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'delete-btn');
        deleteButton.textContent = 'Hapus';
        deleteButton.addEventListener('click', () => deletePost(index)); // Tambahkan event listener untuk hapus

        cardBody.appendChild(titleElement);
        cardBody.appendChild(contentElement);
        cardBody.appendChild(dateElement);
        cardBody.appendChild(readMoreLink);
        cardBody.appendChild(editButton); // Tambahkan tombol edit
        cardBody.appendChild(deleteButton); // Tambahkan tombol hapus

        card.appendChild(cardBody);

        postsDiv.appendChild(card);
      });
    }

    // Fungsi untuk menambah postingan baru
    newPostForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;

      // Dapatkan tanggal saat ini
      const date = new Date().toISOString();

      // Tambahkan postingan ke array
      posts.push({ title, content, date });

      // Simpan postingan ke localStorage
      savePosts();

      // Tampilkan postingan baru
      displayPosts();

      // Reset form
      newPostForm.reset();
    });

    // Fungsi untuk menghapus postingan
    function deletePost(index) {
      if (confirm("Apakah Anda yakin ingin menghapus postingan ini?")) {
        posts.splice(index, 1); // Hapus postingan dari array

        // Simpan postingan ke localStorage
        savePosts();

        // Perbarui tampilan
        displayPosts();
      }
    }

    // Fungsi untuk mengedit postingan
    function editPost(index) {
      const editedTitle = prompt("Edit judul postingan:", posts[index].title);
      const editedContent = prompt("Edit konten postingan:", posts[index].content);

      // Jika pengguna membatalkan edit atau tidak mengubah apapun, keluar dari fungsi
      if (editedTitle === null || editedContent === null || (editedTitle === posts[index].title && editedContent === posts[index].content)) {
        return;
      }

      // Update postingan dengan data yang diedit
      posts[index].title = editedTitle;
      posts[index].content = editedContent;

      // Simpan perubahan ke localStorage
      savePosts();

      // Perbarui tampilan
      displayPosts();
    }

    // Fungsi untuk mencari postingan
    searchInput.addEventListener('input', function () {
      const searchTerm = searchInput.value.toLowerCase();

      // Filter postingan berdasarkan judul atau konten
      const filteredPosts = posts.filter(post => {
        return post.title.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm);
      });

      // Tampilkan postingan yang sesuai
      displayPosts(filteredPosts);
    });

    // Tampilkan postingan saat halaman dimuat
    displayPosts();
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()