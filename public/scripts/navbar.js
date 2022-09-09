function navAgg() {
  let navEntry = $('[datanav="true"]');
  let navList = "";
  navEntry.each(function(index){
    navList += `<li> <a class="nav-link" href="#${$(this).attr('id')}">${$(this).children('h2:eq(0)').text()}</a> </li>`
  });
  return navList;
}

$(function(){
  $('#Navbar').html(`<ul class="navbar-nav"> ${navAgg()} </ul>`);
});