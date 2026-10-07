

$(() => {
  const swiper = new Swiper('.swiper', {
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 30,
    loop: true,
    effect: "coverflow",
    coverflowEffect: {
      depth: 260
    },
    autoplay: true
  })
})
