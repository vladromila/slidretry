let albums = document.querySelectorAll('.album');

class Slid {
  constructor({ album, children }) {
    this.album = album;
    this.children = children;
    this.startX = 0;
    this.carousel = {};
    this.elementIndex = 0;
    this.dragStart=this.dragStart.bind(this);
    this.drag = this.drag.bind(this);
    this.dragEnd=this.dragEnd.bind(this);
  }

  dragStart(e) {
    this.startX = e.clientX;
  }
  drag(e) {
    this.carousel.style.transform= `translate3d(${-this.elementIndex * this.album.clientWidth - (this.startX - e.clientX)}px,0,0)`;
  }
  dragEnd() {
    this.carousel.style.transform = `translate3d(${-(++this.elementIndex * this.album.clientWidth)}px,0,0)`;
  }


  setUp() {
    let carousel = document.createElement("div");
    carousel.classList = "carousel is-set";

    let arr = Array.prototype.slice.call(this.children);
    arr.forEach(el => {
      let carouselElement = document.createElement("div");
      carouselElement.className = "container carousel-element";
      carouselElement.appendChild(el);
      carousel.appendChild(carouselElement);
    })
    this.album.appendChild(carousel);
    this.carousel = carousel;

    carousel.ondragstart = this.dragStart;
    carousel.ondrag = this.drag;
    carousel.ondragend = this.dragEnd;

    let leftArrow = document.createElement("div");
    leftArrow.classList.add("left-arrow");
    let rightArrow = document.createElement("div");
    rightArrow.classList.add("right-arrow");
    this.album.appendChild(leftArrow);
    this.album.appendChild(rightArrow);
  }
}

albums.forEach(alb => {
  let s = new Slid({ album: alb, children: alb.children });
  s.setUp();
})
