var main = function() {

  const toggleTitleColor = () => {
    $('h1').toggleClass('title-pink')
  }

  $('.title-btn').on('click',toggleTitleColor)


  $('.sunset-btn').on('click', () => {
    $('.sunset-img').fadeToggle(1000)
  })
}

$(document).ready(main);