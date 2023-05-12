$(function ($) {
  $('#toTop').hide();
  $('#toTop').click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    setTimeout(() => {
      if($(this).css('opacity') == 1){
        $(this).fadeTo('slow', 0);
      }
    }, 1000)
  });
  let numModal = $('.projCard').length;
  for (let i = 0; i < numModal; i++) {
    let text = $(`.projCard:eq(${i}) h3:eq(0)`).text();
    $(`#modal-${i}label`).text(text);

    $(`#modal-${i} .modal-body:eq(0)`).html($(`.projCard:eq(${i}) #carousel-${i}`).prop('outerHTML'));
    $(`#modal-${i} .modal-body:eq(0) > .carousel`).attr('id', `modal-carousel-${i}`).addClass('mx-auto py-2');
    $(`#modal-carousel-${i}`).ready(function () {
      let numButton = $(`#modal-carousel-${i} button`).length;
      for (let j = 0; j < numButton; j++) {
        $(`#modal-carousel-${i} button:eq(${j})`).attr('data-bs-target', `#modal-carousel-${i}`);
      }
    });
  }

  let projCard = $('.projCard');
  for (i in projCard) {
    if (i % 2 == 0) {
      projCard.eq(i).css('text-align', 'left');
    }
  }
});

$(document).scroll(function () {
  if ($('#toTop').css('opacity') != 1 && $(':animated').length <= 0 || $('#toTop').css('display') == 'none') {
    $('#toTop').fadeTo('slow', 1);
  }
});