const menuToggle = document.getElementById("menu-toggle");
const navbar = document.querySelector(".navbar");
const btn = document.querySelector(".btn-saiba-mais");
const backToTop = document.getElementById("backToTop");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");

});

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

btn.addEventListener("click", function (e) {
  e.preventDefault();

  const target = document.querySelector("#sobre");
  const targetPosition = target.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 2000;

  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // função de suavização (ease)
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


const cards = document.querySelectorAll(".projeto-card");

let atual = 0;
let intervalo;

function mostrarProjeto(index) {
  if (!cards.length) return;

  atual = (index + cards.length) % cards.length;

  cards.forEach((card, i) => {
    card.classList.toggle("ativo", i === atual);
  });
}

function trocarProjeto() {
  mostrarProjeto(atual + 1);
}

function iniciarCarrossel() {
  clearInterval(intervalo);

  if (window.innerWidth <= 600) {
    mostrarProjeto(0);
    intervalo = setInterval(trocarProjeto, 3000);
  } else {
    cards.forEach((card) => {
      card.classList.remove("ativo");
      card.style.display = "block";
    });
  }
}

iniciarCarrossel();

window.addEventListener("resize", iniciarCarrossel);

const projetos = document.querySelector('.projeto-caixa');
const esquerda = document.querySelector('.seta-esquerda');
const direita = document.querySelector('.seta-direita');

direita.addEventListener('click', () => {
  if (window.innerWidth <= 600) {
    mostrarProjeto(atual + 1);
    return;
  }

  projetos.scrollBy({
    left: projetos.clientWidth * 0.85,
    behavior: 'smooth'
  });
});

esquerda.addEventListener('click', () => {
  if (window.innerWidth <= 600) {
    mostrarProjeto(atual - 1);
    return;
  }

  projetos.scrollBy({
    left: -projetos.clientWidth * 0.85,
    behavior: 'smooth'
  });
});


