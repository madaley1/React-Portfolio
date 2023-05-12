function navAgg() {
  let navEntry = $('[datanav="true"]');
  let navList = "";
  navEntry.each(function(index){
    navList += `<li> <a class="nav-link" href="#${$(this).attr('id')}">${$(this).children('h2:eq(0)').text()}</a> </li>`
  });
  return navList;
}

function reverseRows(){
  let containers = $('article');
  for(let i in containers){
    let section = $(`article:eq(${i}) section.projCard`)
    for(let i = 0; i < section.length; i++){
      if(i%2 == 0){
        $(section[i]).addClass('flex-row-reverse').removeClass('flex-row');
      }
    }
  }
}

$(function(){
  $('#Navbar').html(`<ul class="navbar-nav"> ${navAgg()} </ul>`);
  reverseRows();
});